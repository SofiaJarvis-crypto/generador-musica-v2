# 🎯 Plan de Acción: Fix Conversión & Tracking

**CTO:** Jarvis  
**Cliente:** Señor Miki  
**Prioridad:** 🔴 CRÍTICA  
**Fecha:** 2026-03-24

---

## 📊 Situación

**Problema:** Generador tiene tráfico pero no convierte, analytics mal etiquetado, crashes frecuentes.

**Impacto:** Volando a ciegas. No sabemos:
- ¿Cuántas visitas tenemos realmente?
- ¿Dónde se caen los usuarios?
- ¿Cuántas compras reales hay?
- ¿Por qué crashea?

---

## ✅ Lo que YA está hecho (verificado en código)

1. ✅ Purchase tracking movido a cliente (`/descarga/page.tsx`)
2. ✅ Deduplicación con localStorage implementada
3. ✅ Eventos GA4 correctamente estructurados:
   - `view_item` (homepage)
   - `generate_lead` (form)
   - `add_to_cart` (canción lista)
   - `begin_checkout` (click pagar)
   - `purchase` (pago completado)
4. ✅ Google Ads + Meta Pixel configurados
5. ✅ Error handling en endpoints

---

## 🔍 Diagnóstico: 3 Escenarios Posibles

### Escenario A: Tracking NO funciona (más probable)
**Síntomas:**
- Compra realizada pero evento `purchase` no aparece en GA4
- "user_engagement" mencionado (es evento automático GA4, no nuestro)

**Causas potenciales:**
1. gtag.js bloqueado (ad-blocker, firewall corporativo)
2. localStorage no disponible (modo incógnito)
3. Script cargado después del evento
4. GA4 filtrando eventos como spam/bot

**Solución:** DEBUG-TRACKING.md (tests en DevTools)

---

### Escenario B: Conversión realmente baja (posible)
**Síntomas:**
- Gente genera canciones pero no paga
- Preview de 25s insuficiente
- Precio percibido como alto

**Causas potenciales:**
1. Preview muy corto → No convence
2. $8900 sin contexto → Parece caro
3. MercadoPago redirect → Fricción
4. Calidad canción → No cumple expectativas

**Solución:** Análisis de funnel + CRO tests

---

### Escenario C: Crashes técnicos (verificar)
**Síntomas:**
- "Crashea seguido"
- Usuario abandona antes de completar

**Causas potenciales:**
1. Supabase timeout en `/api/download`
2. React re-render loop en `/descarga`
3. localStorage quota exceeded
4. MercadoPago SDK error

**Solución:** Error boundaries + Sentry + logs

---

## 📋 Plan de 3 Fases

### FASE 1: DIAGNÓSTICO (HOY — 3h)
**Objetivo:** Identificar causa raíz

#### Acción 1.1: Test Manual Completo (Miki)
```
1. Hacer compra de prueba en producción
2. Ejecutar DEBUG-TRACKING.md en DevTools
3. Enviar screenshots:
   - Console logs
   - Network tab (filtro "gtag")
   - Errores en rojo
   - URL final de /descarga
```

#### Acción 1.2: Revisar GA4 Real-Time (Miki)
```
1. Ir a https://analytics.google.com/
2. Property: G-RGN3X2NSZR
3. Real-Time → Events
4. Buscar eventos de las últimas 30min:
   - view_item
   - generate_lead
   - add_to_cart
   - begin_checkout
   - purchase ← ESTE ES CRÍTICO
5. Screenshot de cada uno
```

#### Acción 1.3: Reproducir Crashes (Jarvis)
```
1. Flow completo en local:
   - Homepage → Form → Generation → Preview → Pagar → Descarga
2. DevTools → Console abierto
3. Buscar:
   - Errores no manejados
   - Warnings de React
   - Network requests fallidos
   - Memory leaks
```

**Output esperado:**
- ✅ Identificar si es problema de tracking, conversión o crashes
- ✅ Screenshot de error específico (si hay)
- ✅ Datos de GA4 para análisis

---

### FASE 2: FIX RÁPIDO (MAÑANA — 4h)
**Objetivo:** Resolver problema crítico identificado

#### Si es Tracking:
```typescript
// 1. Agregar debug mode agresivo
// src/app/descarga/page.tsx

useEffect(() => {
  // ... código existente ...
  
  if (!alreadyTracked) {
    console.log('🔍 [DEBUG] Disparando purchase:', {
      generationId,
      brandName: data.brandName,
      value: PRECIO_ARS,
      transactionId: token,
      gtagAvailable: typeof window.gtag === 'function',
      timestamp: new Date().toISOString(),
    })
    
    // Verificar gtag antes de llamar
    if (typeof window.gtag !== 'function') {
      console.error('❌ gtag NO disponible, evento NO enviado')
      // Fallback: enviar a servidor para logging
      fetch('/api/track-fallback', {
        method: 'POST',
        body: JSON.stringify({ event: 'purchase', data: {...} })
      })
    } else {
      trackPurchaseFB({...})
      trackPurchaseGA({...})
      console.log('✅ [DEBUG] Eventos enviados')
    }
  }
}, [...])

// 2. Agregar endpoint fallback
// src/app/api/track-fallback/route.ts
export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('[TRACK FALLBACK]', body)
  
  // Guardar en DB para análisis
  await supabaseAdmin
    .from('tracking_fallback')
    .insert({ event: body.event, data: body.data, timestamp: new Date() })
  
  return NextResponse.json({ ok: true })
}
```

#### Si es Conversión:
```typescript
// 1. Aumentar preview a 45s (de 25s)
// src/app/escuchar/[id]/page.tsx
const PREVIEW_DURATION = 45 // antes: 25

// 2. Agregar "Money-back guarantee" visual
// src/app/escuchar/[id]/page.tsx
<div className="guarantee-badge">
  💯 100% Garantizado<br/>
  <small>Te devolvemos la plata si no te gusta</small>
</div>

// 3. Mostrar social proof cerca del botón pagar
<div className="social-proof-inline">
  🎵 <strong>87 personas</strong> compraron hoy
</div>
```

#### Si es Crashes:
```typescript
// 1. Agregar Error Boundary
// src/app/descarga/error.tsx
'use client'
export default function Error({ error, reset }) {
  console.error('[ERROR BOUNDARY]', error)
  return (
    <div className="error-screen">
      <h2>😕 Algo salió mal</h2>
      <button onClick={reset}>Intentar de nuevo</button>
    </div>
  )
}

// 2. Agregar try-catch en fetch
// src/app/descarga/page.tsx
try {
  const res = await fetch(`/api/download?token=${token}&check=1`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  // ...
} catch (err) {
  console.error('[DESCARGA ERROR]', err)
  setStatus('error')
  setErrorMsg('Error de conexión. Recargá la página.')
}
```

**Output esperado:**
- ✅ Problema crítico resuelto
- ✅ Tracking funcionando al 100%
- ✅ O conversión mejorada significativamente
- ✅ O crashes eliminados

---

### FASE 3: MONITOREO & OPTIMIZACIÓN (SEMANA)
**Objetivo:** Visibilidad completa + mejora continua

#### 3.1 Implementar Dashboard de Métricas
```markdown
Crear: memory/dashboards/funnel.json

{
  "date": "2026-03-24",
  "metrics": {
    "visits": 1234,
    "form_submitted": 890,
    "songs_generated": 785,
    "previews_played": 650,
    "checkouts_started": 120,
    "purchases_completed": 45
  },
  "conversion_rates": {
    "visit_to_form": "72.1%",
    "form_to_song": "88.2%",
    "song_to_preview": "82.8%",
    "preview_to_checkout": "18.5%", // ← BOTTLENECK
    "checkout_to_purchase": "37.5%"
  },
  "bottleneck": "preview_to_checkout",
  "action": "Optimizar CTA / Preview más largo / Agregar testimonios"
}
```

#### 3.2 Tests A/B Estructurados
```markdown
Test #1: Preview Duration
- Control: 25s
- Variant A: 45s
- Variant B: 60s (full song)
- Métrica: % checkout_click
- Winner: El que tenga mayor conversión preview→checkout

Test #2: Precio
- Control: $8900
- Variant A: $6900 (descuento)
- Variant B: $9999 (premium)
- Métrica: % purchase_complete
- Winner: El que tenga mayor revenue/visitor

Test #3: CTA Copy
- Control: "Descargar por $8900"
- Variant A: "Conseguir mi jingle ahora"
- Variant B: "Usar en mi negocio ($8900)"
- Métrica: % click_rate
```

#### 3.3 Alertas Automáticas
```typescript
// Cron job diario: Verificar métricas
{
  "schedule": { "kind": "cron", "expr": "0 9 * * *", "tz": "America/Buenos_Aires" },
  "payload": {
    "kind": "agentTurn",
    "message": "Analizar funnel de ayer. Si conversión <30%, alertar con propuesta de fix."
  },
  "delivery": { "mode": "announce", "to": "Miki" }
}
```

**Output esperado:**
- ✅ Dashboard actualizado diariamente
- ✅ Tests A/B corriendo en paralelo
- ✅ Alertas automáticas si conversión baja
- ✅ Optimización continua basada en datos

---

## 🎯 Métricas de Éxito

### Semana 1 (Post-Fix)
- [ ] Tracking al 100% (todos los eventos registrados)
- [ ] 0 crashes reportados
- [ ] Conversión baseline establecida (X% de visits → purchases)

### Semana 2-3 (Optimización)
- [ ] Conversión +20% vs baseline
- [ ] AOV (Average Order Value) estable o +10%
- [ ] Tasa de recompra o referrals tracking activo

### Mes 1 (Escala)
- [ ] ROI positivo en ads (ROAS >1.5)
- [ ] Dashboard automatizado
- [ ] 3+ tests A/B completados con winners implementados

---

## 💬 Próximo Mensaje (Señor Miki)

**Necesito de vos:**

1. ✅ **Hacer compra de prueba** (producción)
   - Abrir DevTools ANTES de llegar a `/descarga`
   - Ejecutar scripts de DEBUG-TRACKING.md
   - Enviarme screenshots

2. ✅ **Acceso a GA4**
   - URL: https://analytics.google.com/
   - Property: `generador-musica-v2.vercel.app`
   - Permisos: Viewer (mínimo) o Admin (ideal)

3. ✅ **Definir prioridad**
   - ¿Cuánto tráfico estamos recibiendo HOY?
   - ¿Cuántas compras esperabas vs cuántas ves?
   - ¿Los crashes son frecuentes o esporádicos?

**Yo hago (sin aprobación):**
- ✅ Review completo del código
- ✅ Test local del flow
- ✅ Implementar fixes de Fase 2 (después de diagnóstico)
- ✅ Preparar dashboard

---

## 📞 Contacto

**Updates:** Por este chat cada 3-6h  
**Urgencias:** Mencionar "CRÍTICO" en mensaje  
**Demo:** Cuando Fase 2 esté lista

---

**Status:** 🟡 ESPERANDO INPUT  
**Next Action:** Miki ejecuta DEBUG-TRACKING.md + envía screenshots  
**ETA:** 24-48h para resolución completa

---

_Jarvis | CTO HandOver | 2026-03-24_
