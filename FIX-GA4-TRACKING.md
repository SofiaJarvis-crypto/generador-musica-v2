# Fix GA4 Tracking — Diagnosis & Solution

**Problema reportado:** SunoAPI muestra 1000% más generaciones que GA4

---

## 🔍 Problemas Identificados

### 1. **AddToCart se dispara SIEMPRE** (duplicados masivos)
**Archivo:** `src/app/escuchar/[id]/page.tsx` líneas 52-62

```typescript
// ❌ PROBLEMA: Se dispara cada vez que carga la página
useEffect(() => {
  const fetchGen = async () => {
    const res = await fetch(`/api/status/${generationId}`)
    if (res.ok) {
      const data = await res.json()
      setGeneration(data)
      
      // 🚨 Esto se ejecuta SIEMPRE, incluso si ya se disparó antes
      if (data.song_a_stream_url) {
        trackAddToCartFB(...)
        trackAddToCartGA(...)
      }
    }
  }
  fetchGen()
  // ...
}, [generationId])
```

**Impacto:** Si usuario recarga 10 veces = 10 eventos `add_to_cart`

---

### 2. **generation_started se dispara antes de confirmar** (puede no llegar)
**Archivo:** `src/app/page.tsx` líneas 67-69

```typescript
// ❌ PROBLEMA: Se dispara ANTES de que Suno confirme
trackGenerationStartedFB(data.generationId)
trackGenerationStartedGA(data.generationId)

// Si Suno falla después, el evento ya se envió
// Si usuario cierra el browser, no llega
```

**Impacto:** Eventos enviados aunque generación falle después.

---

### 3. **Purchase event server-side** (GA4 no lo recibe)
**Archivo:** `src/app/api/webhooks/mercadopago/route.ts` líneas 71-76

```typescript
// ❌ PROBLEMA: trackPurchase desde server (webhook)
// GA4 necesita client-side (browser con gtag.js)
trackPurchase({
  transactionId: mpPaymentId,
  generationId,
  ...
})
```

**Impacto:** Compras NO se registran en GA4.

---

### 4. **Sin deduplicación** (eventos repetidos)

No hay `event_id` ni localStorage para evitar duplicados.

---

## ✅ Solución Completa

### Fix 1: Deduplica `add_to_cart` con localStorage

**File:** `src/app/escuchar/[id]/page.tsx`

```typescript
useEffect(() => {
  if (!generationId) return
  
  const fetchGen = async () => {
    const res = await fetch(`/api/status/${generationId}`)
    if (res.ok) {
      const data = await res.json()
      setGeneration(data)
      
      // ✅ Solo dispara UNA VEZ por generationId
      const trackKey = `tracked_cart_${generationId}`
      if (data.song_a_stream_url && !localStorage.getItem(trackKey)) {
        trackAddToCartFB({
          generationId: generationId,
          brandName: data.brand_name,
          value: PRECIO_ARS,
        })
        trackAddToCartGA({
          generationId: generationId,
          brandName: data.brand_name,
          value: PRECIO_ARS,
        })
        localStorage.setItem(trackKey, 'true')
      }
    }
  }
  fetchGen()
  // ...
}, [generationId])
```

---

### Fix 2: Mueve `generation_started` al webhook de Suno

**Eliminar de:** `src/app/page.tsx` (líneas 67-69)

**Agregar a:** `src/app/api/webhooks/suno/route.ts`

```typescript
// Cuando callbackType === 'complete' (línea 48)
if (callbackType === 'complete' && songs.length >= 2) {
  // ... existing update code ...
  
  // ✅ Disparar generation_started SOLO cuando Suno confirma
  // Client-side: Agregar evento al frontend via server push o fetch
  // Server-side alternativa: Guardar flag en DB para que frontend lo detecte
  
  // Opción A (simple): Guardar en DB que debe dispararse
  await supabaseAdmin
    .from('generations')
    .update({ 
      should_track_generation: true  // Nueva columna
    })
    .eq('id', generationId)
}
```

**Frontend detecta y dispara:**

```typescript
// src/app/escuchar/[id]/page.tsx
useEffect(() => {
  const fetchGen = async () => {
    const data = await res.json()
    setGeneration(data)
    
    // ✅ Disparar generation_started si el flag está
    const genTrackKey = `tracked_gen_${generationId}`
    if (data.should_track_generation && !localStorage.getItem(genTrackKey)) {
      trackGenerationStartedFB(generationId)
      trackGenerationStartedGA(generationId)
      localStorage.setItem(genTrackKey, 'true')
      
      // Limpiar flag en DB (opcional)
      await fetch(`/api/clear-track-flag/${generationId}`)
    }
  }
  // ...
}, [generationId])
```

---

### Fix 3: Mueve `purchase` a página de descarga (client-side)

**Eliminar de:** `src/app/api/webhooks/mercadopago/route.ts` (líneas 71-76)

**Agregar a:** `src/app/descarga/page.tsx`

```typescript
useEffect(() => {
  const checkPayment = async () => {
    const res = await fetch(`/api/download?token=${token}&check=1`)
    if (res.ok) {
      const data = await res.json()
      if (data.ready) {
        setPaid(true)
        
        // ✅ Disparar purchase UNA VEZ (client-side)
        const purchaseKey = `tracked_purchase_${data.generationId}`
        if (!localStorage.getItem(purchaseKey)) {
          trackPurchaseFB({
            generationId: data.generationId,
            brandName: data.brandName,
            value: data.amount || 8900,
            transactionId: data.mpPaymentId,
          })
          trackPurchaseGA({
            generationId: data.generationId,
            brandName: data.brandName,
            value: data.amount || 8900,
            transactionId: data.mpPaymentId,
          })
          localStorage.setItem(purchaseKey, 'true')
        }
      }
    }
  }
  checkPayment()
}, [token])
```

---

### Fix 4: Deduplica `begin_checkout` también

**File:** `src/app/escuchar/[id]/page.tsx`

```typescript
const handlePay = async () => {
  setError('')
  setLoadingPay(true)
  
  // ✅ Deduplica (por si usuario clickea varias veces)
  const checkoutKey = `tracked_checkout_${generationId}`
  if (!localStorage.getItem(checkoutKey)) {
    trackInitiateCheckoutFB({...})
    trackInitiateCheckoutGA({...})
    localStorage.setItem(checkoutKey, 'true')
  }
  
  // ... resto del código
}
```

---

## 📊 Tracking Flow (Corregido)

```
1. Homepage load
   → view_item (1x por session, OK)

2. Form submit
   → generate_lead (1x por form, OK)
   → [NO enviar generation_started aún]

3. Suno webhook confirms
   → [Server] Marca should_track_generation=true en DB

4. Usuario llega a /escuchar
   → [Frontend] Lee should_track_generation
   → generation_started (1x por generation, deduplicado)
   → add_to_cart (1x por generation, deduplicado)

5. Usuario click "Pagar"
   → begin_checkout (1x por click, deduplicado)

6. Usuario completa pago
   → [Webhook MP] Actualiza DB mp_status=approved

7. Usuario llega a /descarga
   → [Frontend] Verifica pago aprobado
   → purchase (1x por compra, deduplicado)
```

---

## 🔧 Migration SQL

Agregar columna para tracking:

```sql
ALTER TABLE generations 
ADD COLUMN should_track_generation BOOLEAN DEFAULT FALSE;
```

---

## 🧪 Testing Checklist

- [ ] Load homepage → 1 `view_item`
- [ ] Submit form → 1 `generate_lead`
- [ ] Song ready → 1 `generation_started` + 1 `add_to_cart`
- [ ] Reload /escuchar 5x → NO duplicados
- [ ] Click pagar → 1 `begin_checkout`
- [ ] Complete pago → 1 `purchase`
- [ ] Reload /descarga 5x → NO duplicados

---

## 📝 Implementation Order

1. Fix 4 (begin_checkout) — Más simple
2. Fix 1 (add_to_cart) — Impacto mayor
3. Fix 3 (purchase) — Crítico para revenue
4. Fix 2 (generation_started) — Requiere DB migration

**ETA:** 2-3 horas implementation + 1 day testing

---

_Created: 2026-03-17 by Jarvis_
