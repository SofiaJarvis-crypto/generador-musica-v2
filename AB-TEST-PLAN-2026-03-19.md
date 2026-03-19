# 🧪 A/B Testing Plan - SUNO Generator

**Fecha:** 2026-03-19  
**Analyst:** Jarvis (OpenClaw + ab-test-setup skill)  
**Product:** https://generador-musica-v2.vercel.app

---

## 📊 CONTEXTO ACTUAL

### Métricas Baseline (estimadas):

| Métrica | Valor Actual | Fuente |
|---------|--------------|--------|
| **Tráfico mensual** | ~1,500 generaciones | Observado en SunoAPI logs |
| **Form completion rate** | ~90% | Muy alta (form es simple) |
| **Preview play rate** | ~95% | Usuario ya invirtió tiempo |
| **Preview → Pago click** | ~10%? | **NECESITAMOS MEDIR** |
| **Pago → Completion** | ~50%? | **NECESITAMOS MEDIR** |
| **Conversión total** | **~5%** | Estimado (75 pagos/mes) |

### Herramientas disponibles:

- ✅ **Next.js** (server-side rendering)
- ✅ **Google Analytics 4** (eventos configurados)
- ✅ **Vercel Analytics** (disponible)
- ❌ **PostHog** (NO instalado - recomendado)
- ❌ **Optimizely** (NO instalado - caro)

---

## 🎯 TESTS PRIORIZADOS (Top 5)

### Test #1: Homepage Headline (PRIORIDAD 1)
**Hipótesis:**
```
Porque el headline actual ("Creá la canción de tu marca") no comunica
QUÉ es el producto ni el beneficio principal, creemos que un headline
más específico y con tiempo ("Jingles profesionales con IA en 2 minutos")
aumentará la tasa de inicio de generación en 15%+ para nuevos visitantes.

Mediremos: Click en botón "Crear mis 2 versiones ahora"
```

#### Variantes:

**Control (actual):**
```
"Jingles profesionales con IA en 2 minutos"
```

**Variante A:**
```
"La canción perfecta para tu marca, en menos de 3 minutos"
```

**Variante B:**
```
"Conseguí el jingle de tu marca sin músicos ni estudio
Generado por IA, listo en 2 minutos"
```

#### Configuración del test:

| Parámetro | Valor |
|-----------|-------|
| **Tipo** | A/B/C (3 variantes) |
| **Split** | 33% / 33% / 34% |
| **Ubicación** | Homepage - Hero section |
| **Primary metric** | Form submit rate (generaciones iniciadas) |
| **Secondary** | Tiempo en página, scroll depth |
| **Guardrail** | Bounce rate (no debe aumentar >10%) |
| **Sample size** | 2,100 visitantes (700/variante) |
| **Duración estimada** | 2 semanas (con 1,500/mes = ~350/semana) |
| **MDE** | 15% lift (baseline 85% → 97.75%) |
| **Confianza** | 95% |

#### Implementación:

```typescript
// src/app/page.tsx

const HEADLINES = {
  control: "Jingles profesionales con IA en 2 minutos",
  variantA: "La canción perfecta para tu marca, en menos de 3 minutos",
  variantB: "Conseguí el jingle de tu marca sin músicos ni estudio"
}

const getVariant = () => {
  // Assign variant based on cookie/session
  let variant = getCookie('ab_test_headline')
  if (!variant) {
    variant = ['control', 'variantA', 'variantB'][Math.floor(Math.random() * 3)]
    setCookie('ab_test_headline', variant, 30) // 30 days
  }
  return variant
}

// Track variant exposure
useEffect(() => {
  const variant = getVariant()
  trackEvent('ab_test_view', { test: 'headline_v1', variant })
}, [])

// Render
<h1>{HEADLINES[variant]}</h1>
```

---

### Test #2: Paywall Headline (PRIORIDAD 1)
**Hipótesis:**
```
Porque el headline del paywall ("Descargá la canción completa") es
funcional pero no refuerza el valor ni la urgencia, creemos que un
headline más específico con el formato/duración aumentará la tasa de
click en "Pagar" en 20%+ para usuarios que escucharon el preview.

Mediremos: Click en botón "Pagar con Mercado Pago"
```

#### Variantes:

**Control (actual):**
```
"Descargá la canción completa"
Features:
- MP3 320 kbps (máxima calidad)
- 30 seg completos (vs 15 seg preview)
- Licencia comercial (usala donde quieras)
```

**Variante A:**
```
"Desbloqueá la canción completa - Solo $8,900"
Features:
- MP3 listo para usar (320 kbps)
- Los 30 segundos completos
- Licencia comercial incluida
```

**Variante B:**
```
"Conseguí el archivo completo en HD
Pago único $8,900 - Tuya para siempre"
Features:
- MP3 320 kbps (máxima calidad)
- 30 segundos sin cortes
- Usala en radio, redes, o donde quieras
```

#### Configuración del test:

| Parámetro | Valor |
|-----------|-------|
| **Tipo** | A/B/C (3 variantes) |
| **Split** | 33% / 33% / 34% |
| **Ubicación** | Página /escuchar/[id] - Pay box |
| **Primary metric** | Click-through rate en botón MP |
| **Secondary** | Tiempo en paywall, regeneraciones post-preview |
| **Guardrail** | Completion rate (no debe bajar) |
| **Sample size** | 900 usuarios (300/variante) |
| **Duración estimada** | 10 días (con ~90 usuarios/día en paywall) |
| **MDE** | 20% lift (baseline 10% → 12%) |
| **Confianza** | 95% |

---

### Test #3: Preview Duration (PRIORIDAD 2)
**Hipótesis:**
```
Porque actualmente mostramos 15 segundos de preview (segundo 15-30),
creemos que probar duraciones más cortas (10 seg) o más largas (20 seg)
nos ayudará a optimizar el balance entre "suficiente para enganchar" y
"no revelar demasiado". Esperamos que 15 seg sea el sweet spot, pero
validamos con data.

Mediremos: Conversión final (preview → pago completado)
```

#### Variantes:

| Variante | Preview | Rango | Justificación |
|----------|---------|-------|---------------|
| **Control** | 15 seg | Seg 15-30 | Estado actual |
| **Variante A** | 10 seg | Seg 15-25 | Más urgencia, menos revelado |
| **Variante B** | 20 seg | Seg 10-30 | Más contexto, mayor confianza |

#### Configuración del test:

| Parámetro | Valor |
|-----------|-------|
| **Tipo** | A/B/C (3 variantes) |
| **Split** | 33% / 33% / 34% |
| **Ubicación** | Player component |
| **Primary metric** | Conversión final (generación → pago completo) |
| **Secondary** | Preview completion rate, time to purchase |
| **Guardrail** | Regeneration rate (no debe aumentar >20%) |
| **Sample size** | 1,500 generaciones (500/variante) |
| **Duración estimada** | 4 semanas |
| **MDE** | 30% lift (baseline 5% → 6.5%) |
| **Confianza** | 95% |

**⚠️ Nota:** Este test requiere más tiempo porque medimos conversión final (no solo clicks).

---

### Test #4: Precio Positioning (PRIORIDAD 2)
**Hipótesis:**
```
Porque el precio $8,900 puede parecer alto sin contexto, creemos que
agregar un anchor ("menos que 1 hora de estudio") o enfatizar "pago
único" reducirá la fricción de precio y aumentará conversión en 15%+.

Mediremos: Click en botón "Pagar con Mercado Pago"
```

#### Variantes:

**Control (actual):**
```
Precio: $8.900
Nota: "Pago único · Descarga inmediata"
```

**Variante A (Anchor):**
```
Precio: $8.900
Nota: "Menos que 1 hora de estudio de grabación"
```

**Variante B (Value emphasis):**
```
Precio: $8.900 (pago único, tuya para siempre)
Nota: "Descarga inmediata · Sin cuotas"
```

#### Configuración del test:

| Parámetro | Valor |
|-----------|-------|
| **Tipo** | A/B/C (3 variantes) |
| **Split** | 33% / 33% / 34% |
| **Ubicación** | Pay-box - pricing section |
| **Primary metric** | Click-through rate en botón MP |
| **Secondary** | Time on paywall, scroll behavior |
| **Guardrail** | Refund rate (no debe aumentar) |
| **Sample size** | 900 usuarios (300/variante) |
| **Duración estimada** | 10 días |
| **MDE** | 15% lift |
| **Confianza** | 95% |

---

### Test #5: CTA Copy en Homepage (PRIORIDAD 3)
**Hipótesis:**
```
Porque el CTA actual ("Crear mis 2 versiones ahora") enfatiza cantidad
pero no urgencia, creemos que probar variaciones con beneficio más claro
aumentará el click rate en 10%+.

Mediremos: Click en botón principal
```

#### Variantes:

**Control (actual):**
```
"🎵 Crear mis 2 versiones ahora"
```

**Variante A:**
```
"🎵 Generar mi jingle gratis"
```

**Variante B:**
```
"🎵 Probar gratis (2 min)"
```

**Variante C:**
```
"🎵 Crear mi canción ahora"
```

#### Configuración del test:

| Parámetro | Valor |
|-----------|-------|
| **Tipo** | A/B/C/D (4 variantes) |
| **Split** | 25% / 25% / 25% / 25% |
| **Ubicación** | Homepage - CTA button |
| **Primary metric** | Click rate en botón |
| **Secondary** | Form completion rate |
| **Guardrail** | Quality of leads (completion vs abandon) |
| **Sample size** | 2,800 visitantes (700/variante) |
| **Duración estimada** | 2.5 semanas |
| **MDE** | 10% lift |
| **Confianza** | 95% |

---

## 🛠️ IMPLEMENTACIÓN TÉCNICA

### Opción 1: Server-Side (Next.js) ⭐ RECOMENDADO

**Ventajas:**
- No flicker
- SEO-friendly
- Control total

**Implementación:**

```typescript
// lib/ab-testing.ts

export type ABTest = 'headline_v1' | 'paywall_v1' | 'preview_duration' | 'price_positioning' | 'cta_copy'
export type Variant = 'control' | 'variantA' | 'variantB' | 'variantC'

export function getVariant(test: ABTest, userId: string): Variant {
  // Hash user ID to get consistent variant
  const hash = hashString(`${test}-${userId}`)
  const variants: Variant[] = ['control', 'variantA', 'variantB']
  return variants[hash % variants.length]
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// Track variant exposure
export function trackABTest(test: ABTest, variant: Variant) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_view', {
      test_name: test,
      variant: variant,
    })
  }
}
```

**Uso:**

```typescript
// src/app/page.tsx

import { getVariant, trackABTest } from '@/lib/ab-testing'
import { cookies } from 'next/headers'

export default function HomePage() {
  // Get or create user ID
  const cookieStore = cookies()
  let userId = cookieStore.get('user_id')?.value
  if (!userId) {
    userId = crypto.randomUUID()
    // Set cookie (need to do this in middleware or client-side)
  }

  // Get variant
  const headlineVariant = getVariant('headline_v1', userId)

  // Track exposure (client-side)
  useEffect(() => {
    trackABTest('headline_v1', headlineVariant)
  }, [headlineVariant])

  // Render
  const HEADLINES = {
    control: "Jingles profesionales con IA en 2 minutos",
    variantA: "La canción perfecta para tu marca, en menos de 3 minutos",
    variantB: "Conseguí el jingle de tu marca sin músicos ni estudio"
  }

  return <h1>{HEADLINES[headlineVariant]}</h1>
}
```

### Opción 2: PostHog (Third-party) 💰

**Ventajas:**
- Dashboard visual
- No code changes para nuevos tests
- Feature flags incluidos

**Costo:** ~$0 primeros 1M eventos/mes (gratis para tu volumen)

**Setup:**

```bash
npm install posthog-js posthog-node
```

```typescript
// lib/posthog.ts

import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init('YOUR_PROJECT_API_KEY', {
    api_host: 'https://app.posthog.com',
  })
}

export default posthog
```

**Uso:**

```typescript
// src/app/page.tsx

import posthog from '@/lib/posthog'

const headline = posthog.getFeatureFlag('headline_test') === 'variant_a'
  ? "Variante A"
  : "Control"
```

---

## 📈 TRACKING & ANALYTICS

### Eventos de GA4 necesarios:

```typescript
// lib/google-analytics.ts

// Nuevo: Track AB test exposure
export function trackABTestView(testName: string, variant: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_view', {
      test_name: testName,
      variant: variant,
    })
  }
}

// Eventos existentes a complementar con variant
export function trackGenerationStarted(generationId: string, variant?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generation_started', {
      generation_id: generationId,
      ab_test_variant: variant, // 🆕 Agregar variant
    })
  }
}

export function trackPaymentInitiated(generationId: string, variant?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      generation_id: generationId,
      ab_test_variant: variant, // 🆕 Agregar variant
    })
  }
}
```

### Queries de análisis (BigQuery / GA4):

```sql
-- Conversión por variante (Test #1: Headline)

SELECT
  ab_test_variant,
  COUNT(DISTINCT user_pseudo_id) as users,
  COUNTIF(event_name = 'generation_started') as generations,
  SAFE_DIVIDE(
    COUNTIF(event_name = 'generation_started'),
    COUNT(DISTINCT user_pseudo_id)
  ) * 100 as conversion_rate
FROM
  `analytics.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20260319' AND '20260402'
  AND event_name IN ('ab_test_view', 'generation_started')
GROUP BY
  ab_test_variant
ORDER BY
  conversion_rate DESC;
```

---

## 📋 TEST DOCUMENTATION TEMPLATE

### Template para cada test:

```markdown
## [Test Name] - [Test ID]

**Dates:** YYYY-MM-DD to YYYY-MM-DD  
**Status:** Planning | Running | Complete  
**Result:** Winner / No difference / Inconclusive

### Hypothesis
[Insert hypothesis using framework]

### Variants
**Control:** [Description + screenshot]
**Variant A:** [Description + screenshot]
**Variant B:** [Description + screenshot]

### Configuration
- Traffic split: X/Y/Z
- Sample size: N per variant
- Primary metric: [metric]
- MDE: X%

### Results
| Variant | Sample | Conversion | Lift | P-value | Significant? |
|---------|--------|------------|------|---------|--------------|
| Control | N | X% | - | - | - |
| Variant A | N | Y% | +Z% | 0.XX | Yes/No |

### Decision
[Implement / Keep control / Run longer / Redesign test]

### Learnings
[What we learned, implications for future tests]
```

---

## 🗓️ ROADMAP (Próximos 3 meses)

### Mes 1 (Marzo):
- ✅ **Semana 1:** CRO quick wins (ya hecho)
- 🎯 **Semana 2:** Setup de AB testing framework
- 🧪 **Semana 3-4:** Test #1 (Headline) corriendo

### Mes 2 (Abril):
- 🧪 **Semana 1-2:** Test #2 (Paywall) corriendo
- 📊 **Semana 3:** Análisis y ganadores implementados
- 🧪 **Semana 4:** Test #3 (Preview duration) inicio

### Mes 3 (Mayo):
- 🧪 **Semana 1-3:** Test #3 (Preview) corriendo
- 🧪 **Semana 4:** Tests #4 y #5 (Precio + CTA)
- 📈 **Fin de mes:** Review completo, winners implementados

---

## 💰 ROI PROYECTADO

### Baseline (actual):
- Conversión: 5%
- Generaciones: 1,500/mes
- Pagos: 75/mes
- Revenue: $667,500 ARS/mes

### Con tests exitosos (conservador: +20% conversión):
- Conversión: 6%
- Generaciones: 1,500/mes
- Pagos: 90/mes
- Revenue: $801,000 ARS/mes
- **Delta: +$133,500 ARS/mes** (~$150 USD/mes)

### Con tests exitosos (optimista: +40% conversión):
- Conversión: 7%
- Generaciones: 1,500/mes
- Pagos: 105/mes
- Revenue: $934,500 ARS/mes
- **Delta: +$267,000 ARS/mes** (~$300 USD/mes)

**Inversión:** 20-30 horas de dev/análisis (~$0 costo marginal)

---

## ⚠️ RIESGOS Y MITIGACIÓN

### Riesgo 1: Tráfico insuficiente
**Problema:** Tests tardan >1 mes  
**Mitigación:**
- Probar cambios más bold (MDE más alto)
- Reducir número de variantes (A/B en vez de A/B/C)
- Paciencia - no cancelar tests prematuramente

### Riesgo 2: Resultados inconclusive
**Problema:** No hay winner claro  
**Mitigación:**
- Pre-calcular sample size
- Esperar tiempo completo
- Documentar learnings igual

### Riesgo 3: Bugs en variantes
**Problema:** Variante rompe algo  
**Mitigación:**
- QA exhaustivo pre-launch
- Monitor de errores por variante
- Kill switch para pausar test

---

## 🚀 NEXT STEPS (Accionables)

### Esta semana:
1. ✅ Implementar función `getVariant()` en `lib/ab-testing.ts`
2. ✅ Agregar tracking de variantes a GA4
3. ✅ Test #1 (Headline) - implementar variantes
4. ✅ QA de variantes en staging
5. 🚀 Launch Test #1 (Headline)

### Próxima semana:
6. 📊 Monitor Test #1 (verificar tracking funciona)
7. 🧪 Preparar Test #2 (Paywall variants)
8. 📈 Setup de dashboards en GA4

---

**¿Arrancamos con el setup del framework ahora?** 🎯

