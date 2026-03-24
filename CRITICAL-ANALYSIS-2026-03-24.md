# 🚨 ANÁLISIS CRÍTICO: Pérdida de Conversión & Crashes

**Fecha:** 2026-03-24 12:24 ART  
**Responsable:** Jarvis (CTO)  
**Prioridad:** 🔴 CRÍTICA — Sistema generando tráfico sin convertir

---

## 🎯 Situación Actual

### Síntomas Reportados
1. ❌ **Analytics mal etiquetado** — No sabemos dónde perdemos usuarios
2. ❌ **Crashea frecuentemente** — Sospecha de evento `user_engagement`
3. ❌ **No estamos convirtiendo** — Gente usa el generador pero no paga
4. ❌ **Compra realizada NO registrada** — Test manual no mostró evento de éxito

### Datos Confirmados
- **Tracking implementado:** ✅ Sí (según PURCHASE-TRACKING-FIX.md)
- **GA4 ID:** `G-RGN3X2NSZR`
- **Google Ads ID:** `AW-18023245806`
- **Meta Pixel:** Activo
- **Último fix tracking:** 2026-03-18 (commit `34d4912`)

---

## 🔍 Diagnóstico Técnico

### 1. Estado del Tracking (Según Código Actual)

**✅ IMPLEMENTADO CORRECTAMENTE:**
- Purchase tracking movido a cliente (`/descarga`)
- Deduplicación con `localStorage` + `useRef`
- Eventos clave: `view_item`, `generate_lead`, `add_to_cart`, `begin_checkout`, `purchase`

**❓ VERIFICAR:**
- ¿`user_engagement` está causando crashes? → **NO ENCONTRADO EN CÓDIGO**
- ¿Evento `purchase` se está disparando realmente?
- ¿GA4 está recibiendo los eventos?

### 2. Posibles Causas de "No Conversión"

#### A. Problema de Tracking (no vemos conversiones que SÍ existen)
```
Hipótesis: Las compras ocurren pero GA4 no las registra
Evidencia: Usuario dice "hice una compra y no veo el éxito"
Impacto: Estamos volando a ciegas
```

#### B. Problema de Funnel (conversiones realmente bajas)
```
Hipótesis: Hay fricción que mata la conversión
Posibles puntos de fuga:
  1. Preview de 25s insuficiente
  2. Precio ($8900) percibido como alto
  3. Checkout de MercadoPago con fricción
  4. Canción generada no cumple expectativas
```

#### C. Problema Técnico (crashes = pérdida de usuarios)
```
Hipótesis: App crashea antes de completar pago
Evidencia: "crashea seguido"
Impacto: Usuario intenta pagar → crash → abandona
```

---

## 📊 Plan de Acción Inmediato

### FASE 1: DIAGNÓSTICO (HOY — 2h)

#### 1.1 Verificar GA4 Real-Time
```bash
# Necesito acceso a GA4 para ver:
# - ¿Eventos están llegando?
# - ¿Purchase event presente?
# - ¿Dónde está el dropoff mayor?
```

**Acción:** Pedí credenciales GA4 o acceso directo.

#### 1.2 Revisar Crashes en Browser DevTools
```javascript
// Checkpoint: Reproducir flujo completo
// 1. Generar canción
// 2. Escuchar preview
// 3. Click pagar
// 4. Completar checkout
// 5. Llegar a /descarga

// Buscar:
// - Errores de console
// - Network requests fallidos
// - localStorage issues
```

**Acción:** Test manual con DevTools abierto.

#### 1.3 Verificar `user_engagement` 
```bash
# Buscar en código dónde se dispara
grep -r "user_engagement" generador-musica-v2/src
```

**Resultado:** ❌ NO ENCONTRADO en el código fuente.  
**Conclusión:** `user_engagement` es un **evento automático de GA4** (no nuestro).

**Posible causa del "crash":**
- GA4 dispara `user_engagement` cada 10 segundos de actividad
- Si hay error en gtag.js o blocker, puede fallar silenciosamente
- **NO causa crashes reales**, solo eventos perdidos

---

### FASE 2: FIX TRACKING (HOY — 3h)

#### 2.1 Agregar Logs de Debug
```typescript
// src/app/descarga/page.tsx
console.log('[TRACKING DEBUG] Purchase event disparado:', {
  generationId,
  transactionId: token,
  value: PRECIO_ARS,
  timestamp: new Date().toISOString(),
})

// Verificar que gtag existe
if (typeof window !== 'undefined' && window.gtag) {
  console.log('[TRACKING DEBUG] gtag disponible ✅')
} else {
  console.error('[TRACKING DEBUG] gtag NO disponible ❌')
}
```

#### 2.2 Agregar Event ID para Deduplicación GA4
```typescript
// src/lib/google-analytics.ts
export const trackPurchase = (data: {...}) => {
  const eventId = `purchase_${data.generationId}_${Date.now()}`
  
  gtag('event', 'purchase', {
    transaction_id: data.transactionId || data.generationId,
    currency: 'ARS',
    value: data.value,
    event_id: eventId, // ✅ GA4 deduplication
    items: [...]
  })
  
  console.log('[GA4] Purchase tracked:', eventId)
}
```

#### 2.3 Configurar GA4 Enhanced Measurement
**En GA4 Admin:**
- ✅ Activar `scroll` tracking
- ✅ Activar `click` tracking  
- ✅ Activar `video engagement` (para player)
- ❌ Desactivar `user_engagement` si genera ruido

---

### FASE 3: ANÁLISIS DE FUNNEL (MAÑANA — 4h)

#### 3.1 Implementar Funnel Tracking Detallado
```typescript
// Agregar eventos intermedios para ver dónde se cae:

// En /escuchar/[id] (player page)
trackEvent('audio_played', { generationId, progress: 0 })
trackEvent('audio_25_percent', { generationId })
trackEvent('audio_50_percent', { generationId })
trackEvent('audio_complete', { generationId })

// En botón de pago
trackEvent('pay_button_click', { generationId, attempt: 1 })

// En MercadoPago redirect
trackEvent('checkout_redirect', { generationId, provider: 'mercadopago' })
```

#### 3.2 Crear Dashboard de Conversión
```
Métricas clave a trackear:
- Visitas homepage → Formulario completado (Paso 1)
- Formulario → Canción generada (Paso 2)
- Canción generada → Preview escuchado >50% (Paso 3)
- Preview → Click pagar (Paso 4)
- Click pagar → Checkout iniciado (Paso 5)
- Checkout → Pago completado (Paso 6)
```

---

### FASE 4: OPTIMIZACIÓN CRO (PRÓXIMA SEMANA)

Después de tener datos confiables, atacar puntos de fuga:

1. **Si dropoff en Paso 3 (Preview):**
   - Aumentar preview a 45s (de 25s actual)
   - Agregar visualizador de waveform más atractivo
   - Mostrar "Lo que estás por obtener" antes del pago

2. **Si dropoff en Paso 4 (Precio):**
   - Test A/B de precio ($8900 vs $6900 vs $9999)
   - Agregar money-back guarantee
   - Mostrar "X personas compraron hoy"

3. **Si dropoff en Paso 5 (Checkout):**
   - Investigar fricción en MercadoPago
   - Agregar más métodos de pago (transferencia, etc.)
   - Simplificar campos requeridos

4. **Si crashes en navegador:**
   - Revisar dependencias (Supabase, MercadoPago SDK)
   - Implementar error boundaries en React
   - Agregar Sentry para crash reporting

---

## 🎯 Próximos Pasos Inmediatos

### Ahora mismo (Señor Miki, necesito de vos):

1. **Acceso a GA4:**
   - URL: https://analytics.google.com/
   - Property: `generador-musica-v2.vercel.app`
   - Necesito: Ver Real-Time + Conversions + Events

2. **Test de compra:**
   - Hacer una compra de prueba
   - Compartir:
     - URL final de descarga (`/descarga?token=XXX`)
     - Screenshot de DevTools → Console
     - Screenshot de DevTools → Network tab (filtrar "gtag")

3. **Definir prioridad:**
   - ¿Qué es más urgente: Fix tracking o Fix crashes?
   - ¿Cuánto tráfico estamos recibiendo hoy?

### Yo hago (sin necesidad de aprobación):

1. ✅ Revisar código fuente completo para crashes
2. ✅ Implementar logs de debug en tracking
3. ✅ Test manual del flujo completo
4. ✅ Preparar dashboard de métricas

---

## 📌 Notas Críticas

### Sobre "user_engagement"
- **NO es nuestro evento** — Es automático de GA4
- **NO causa crashes** — Solo indica actividad del usuario
- **NO requiere fix** — Es normal verlo en GA4

### Sobre "no veo el éxito"
- Evento `purchase` se dispara en cliente (`/descarga/page.tsx`)
- Requiere:
  1. Token válido en URL
  2. Pago aprobado en backend
  3. gtag.js cargado correctamente
  4. localStorage disponible (no modo incógnito)

### Sobre crashes
- Necesito reproducir el problema
- Posibles causas:
  - Error en Supabase fetch
  - MercadoPago SDK timeout
  - localStorage quota exceeded
  - React re-render loop

---

## 🚀 Objetivo Final

**Tener visibilidad completa del funnel:**
```
Homepage → Form → Generation → Preview → Checkout → Purchase
  100%     X%       Y%          Z%         W%         V%
```

**Meta:** Identificar el cuello de botella y optimizarlo.

---

**Status:** 🟡 ESPERANDO INPUT — Necesito acceso GA4 + test de compra  
**ETA Fix Tracking:** 3-4 horas  
**ETA Análisis Completo:** 1-2 días

---

_Jarvis | CTO HandOver_
