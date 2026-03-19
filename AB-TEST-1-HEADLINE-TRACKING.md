# 🧪 Test #1: Homepage Headline Variants

**Status:** 🟢 LIVE  
**Start Date:** 2026-03-19  
**Expected End:** 2026-04-02 (2 semanas)

---

## 📋 HYPOTHESIS

```
Porque el headline actual ("Creá la canción de tu marca") no comunica
QUÉ es el producto ni el beneficio principal, creemos que un headline
más específico y con tiempo aumentará la tasa de inicio de generación
en 15%+ para nuevos visitantes.

Mediremos: Click en botón "Crear mis 2 versiones ahora"
```

---

## 🎯 VARIANTS

### Control (33%)
```
"Jingles profesionales con IA
en 2 minutos"
```

### Variant A (33%)
```
"La canción perfecta para tu marca,
en menos de 3 minutos"
```

### Variant B (34%)
```
"Conseguí el jingle de tu marca
sin músicos ni estudio"
```

---

## 📊 CONFIGURATION

| Parameter | Value |
|-----------|-------|
| **Traffic Split** | 33% / 33% / 34% |
| **Sample Size** | 2,100 visitors (700/variant) |
| **Duration** | ~2 weeks (with 1,500 visitors/mo) |
| **Primary Metric** | Form submit rate (generation started) |
| **Secondary Metrics** | Time on page, scroll depth |
| **Guardrail** | Bounce rate (no debe aumentar >10%) |
| **MDE** | 15% lift (baseline 85% → 97.75%) |
| **Confidence** | 95% |

---

## 📈 TRACKING

### Google Analytics 4 Events:

1. **`ab_test_view`** - Fired when variant is shown
   - `test_name`: 'headline_v1'
   - `variant`: 'control' | 'variantA' | 'variantB'

2. **`generation_started`** - Primary conversion event
   - `generation_id`: UUID
   - `ab_test_variant`: variant shown

### How to Check Results in GA4:

```
Explorar > Crear exploración personalizada

Dimensiones:
- ab_test_variant (custom parameter)

Métricas:
- Usuarios
- Eventos (ab_test_view)
- Eventos (generation_started)
- Tasa de conversión

Segmento:
- Fecha: últimos 14 días
```

---

## 🎲 VARIANT ASSIGNMENT

**Method:** Hash-based (consistent per user)

**Implementation:**
```typescript
// lib/ab-testing.ts
const userId = getUserId() // From sessionStorage
const variant = getVariant('headline_v1', userId) // Hash-based
```

**User sees same variant on:**
- ✅ Page refresh
- ✅ Return visit (same session)
- ✅ Different pages (same session)

**User sees new variant on:**
- ❌ New session (after sessionStorage clear)
- ❌ Different device

---

## ✅ PRE-LAUNCH CHECKLIST

- [x] Hypothesis documented
- [x] Primary metric defined
- [x] Sample size calculated
- [x] Variants implemented
- [x] Tracking verified (GA4 events)
- [x] QA completed (build successful)
- [x] Deployed to production

---

## 📅 MONITORING SCHEDULE

### Daily (primeros 3 días):
- ✅ Verificar que tracking funciona
- ✅ Verificar distribución de tráfico (33/33/34%)
- ✅ Monitor de errores por variante
- ✅ Bounce rate por variante

### Weekly:
- 📊 Peek at results (sin tomar decisiones)
- 📊 Verificar sample size progress
- 📊 Documentar external factors

### After 2 weeks:
- 🎯 Análisis final
- 🎯 Call winner / inconclusive
- 🎯 Document learnings
- 🎯 Implement winner or iterate

---

## 🚨 STOP CONDITIONS

Pausar el test si:
- ❌ Una variante tiene error rate >5%
- ❌ Bounce rate aumenta >20% en alguna variante
- ❌ Form completion rate cae >30% en alguna variante

**How to pause:**
```bash
# Revert to control
git revert 422d57e
git push origin main
```

---

## 📊 RESULTS (Live tracking)

### Week 1 (2026-03-19 → 2026-03-26)

| Variant | Visitors | Generations | Conv. Rate | Lift | Significant? |
|---------|----------|-------------|------------|------|--------------|
| Control | - | - | -% | - | - |
| Variant A | - | - | -% | -% | - |
| Variant B | - | - | -% | -% | - |

**Status:** Collecting data...

### Week 2 (2026-03-26 → 2026-04-02)

| Variant | Visitors | Generations | Conv. Rate | Lift | Significant? |
|---------|----------|-------------|------------|------|--------------|
| Control | - | - | -% | - | - |
| Variant A | - | - | -% | -% | - |
| Variant B | - | - | -% | -% | - |

**Status:** TBD

---

## 🎯 FINAL DECISION

**Date:** TBD  
**Winner:** TBD  
**Confidence:** TBD  
**Implementation:** TBD

---

## 📝 LEARNINGS

_To be filled after test completes_

### What worked:
- TBD

### What didn't:
- TBD

### Implications for future tests:
- TBD

### Segments to explore:
- Mobile vs Desktop
- Direct vs Organic
- New vs Returning

---

## 🔄 NEXT STEPS

1. ⏳ Wait 2 weeks for sample size
2. 📊 Analyze results in GA4
3. 🎯 Call winner or run longer
4. ✅ Implement winning variant
5. 🧪 Move to Test #2 (Paywall)

---

**Questions? Check `AB-TEST-PLAN-2026-03-19.md` for full methodology**

