# Fix: Purchase Tracking en GA4 — Implementación Completada

**Fecha:** 2026-03-18  
**Commit:** 39e1982  
**Status:** ✅ Implementado y pusheado a main

---

## 🔴 Problema Detectado

**Síntomas:**
- 3 eventos `begin_checkout` registrados en GA4
- 0 eventos `purchase` registrados
- $0 en ingresos totales
- `purchase` está configurado como conversion event en GA4

**Root Cause:**
```javascript
// ❌ ANTES: En src/app/api/webhooks/mercadopago/route.ts
trackPurchase({  // Llamada server-side (webhook)
  transactionId: mpPaymentId,
  generationId,
  value: 8900,
})
```

**Por qué no funciona:**
- `trackPurchase()` usa `gtag('event', 'purchase', {...})`
- `gtag` es una función del navegador (global window)
- En server-side (webhook), no hay acceso a `window`
- GA4 silenciosamente ignora el evento

---

## ✅ Solución Implementada

### 1️⃣ Eliminar tracking del webhook (servidor)

**Archivo:** `src/app/api/webhooks/mercadopago/route.ts`

```javascript
// ✅ DESPUÉS:
// Eliminar: import { trackPurchase } from '@/lib/analytics'
// Eliminar: trackPurchase({...})

// Agregar comentario:
// 📌 NOTE: Purchase tracking happens CLIENT-SIDE in /descarga/page.tsx
// (GA4 requires gtag.js in the browser, not server-side)
```

El webhook **solo** actualiza el estado de la base de datos. El tracking ocurre en el cliente.

---

### 2️⃣ Mejorar deduplicación en cliente (`/descarga`)

**Archivo:** `src/app/descarga/page.tsx`

```javascript
// ✅ ANTES: Solo useRef (pierde estado si page reload o sesión reinicia)
if (!purchaseTrackedRef.current) {
  trackPurchaseFB({...})
  trackPurchaseGA({...})
  purchaseTrackedRef.current = true
}

// ✅ DESPUÉS: useRef + localStorage (duplicación imposible)
const generationId = data.generationId || 'unknown'
const purchaseKey = `tracked_purchase_${generationId}`
const alreadyTracked = purchaseTrackedRef.current || localStorage.getItem(purchaseKey)

if (!alreadyTracked) {
  console.log('[Purchase Tracking] Disparando eventos...')
  trackPurchaseFB({...})
  trackPurchaseGA({...})
  purchaseTrackedRef.current = true
  localStorage.setItem(purchaseKey, 'true')
  console.log('[Purchase Tracking] ✅ Eventos disparados')
}
```

**Beneficios:**
- ✅ Deduplicación robusta incluso si usuario recarga
- ✅ Logs para debuggear
- ✅ Por-`generationId` (si usuario descarga múltiples)

---

## 📊 Flujo Corregido

```
1. Usuario completa pago en MercadoPago
   ↓
2. MP webhook notifica a /api/webhooks/mercadopago
   → Actualiza DB: mp_status = 'approved'
   → No dispara tracking (ya no)
   ↓
3. Usuario es redirigido a /descarga?token=XXX
   ↓
4. Frontend verifica token → fetch /api/download?check=1
   → Status 200 = pago aprobado ✅
   ↓
5. Al cargar /descarga, trackPurchaseGA() se dispara
   → gtag('event', 'purchase', {...})
   → Registrado en GA4 ✅
   ↓
6. localStorage previene duplicados
   → Incluso si usuario recarga 10 veces = 1 evento
```

---

## 🧪 Cómo Testear

### Test 1: Verificar evento en GA4

1. Abre DevTools → Pestaña **Network**
2. Abre la página de descarga (`/descarga?token=...`)
3. Busca request a `www.googletagmanager.com`
4. En el payload, busca `"event":"purchase"`
5. **Esperado:** ✅ Debe estar presente

### Test 2: Deduplicación

1. En DevTools → Console, escribe:
   ```javascript
   localStorage.clear()
   location.reload()
   // Esperar a que se dispare el evento
   location.reload() // Recargar nuevamente
   ```
2. **Esperado:** Logs muestran:
   ```
   [Purchase Tracking] Disparando eventos...
   [Purchase Tracking] ✅ Eventos disparados
   
   [Purchase Tracking] ℹ️  Ya fue registrado, evitando duplicado
   ```

### Test 3: GA4 Real Data

1. Esperar ~24h para que los datos se procesen en GA4
2. Ir a GA4 → **Conversions** → Verificar evento `purchase`
3. Debería mostrar:
   - Conversions: 1+
   - Revenue: $8900+

---

## 📋 Archivos Modificados

| Archivo | Cambios |
|---------|---------|
| `src/app/api/webhooks/mercadopago/route.ts` | -5 líneas (eliminar import + call) |
| `src/app/descarga/page.tsx` | +20 líneas (mejorar deduplicación) |

---

## ⚠️ Notas Importantes

### 1. No hay cambios en GA4 config
- El evento `purchase` ya está registrado como conversion
- No requiere cambios en la propiedad GA4

### 2. Meta Pixel sigue siendo llamado
- `trackPurchaseFB()` se dispara desde cliente (correcto)
- Meta Pixel no tiene el mismo problema que GA4

### 3. Transacciones futuras
- Todos los nuevos pagos registrarán `purchase` correctamente
- Datos históricos (antes del fix) seguirán siendo $0

---

## 🚀 Próximos Pasos (Opcionales)

1. **Monitorear:** Esperar 24h, verificar que `purchase` aparece en GA4
2. **Optimizar:** Agregar eventos adicionales:
   - `view_promotion` (cuando promocionan la canción)
   - `add_to_wishlist` (si agregan feature de favoritos)
3. **Analizar:** Una vez con datos reales:
   - AOV actual
   - Tasa conversión real
   - Buyer personas por industria

---

**Commit:** `39e1982`  
**Branch:** `main`  
**Pushed:** ✅ 2026-03-18 11:58

