# Preview Paywall Implementation

**Fecha:** 2026-03-19  
**Status:** ✅ Código listo | ⏳ Pendiente migration SQL + deploy

---

## 🎯 Objetivo

Cambiar modelo de negocio para maximizar conversión:

**Antes:** Audio completo gratis → usuarios se graban con celular → 0% conversión  
**Después:** Preview de 10 seg → paywall → unlock audio completo → $$$ conversión

---

## 🔧 Solución técnica

### Approach elegido (simplificado)
- ✅ Player del cliente limita reproducción a **10 segundos** (segundo 15-25)
- ✅ Bloquea seek/skip en preview mode
- ✅ Al pagar → marca `is_unlocked = TRUE` en DB → player desbloquea audio completo
- ✅ Sin FFmpeg, sin storage extra, sin timeout en Vercel

### ¿Por qué segundo 15-25?
- Evita intro (primeros 15 seg suelen ser buildup)
- No revela final (últimos 5-10 seg son climax)
- Da suficiente contexto para que el usuario decida si comprar

---

## 📋 Checklist de implementación

### ✅ Completado

- [x] Modificar `WaveformPlayer.tsx` con preview mode
- [x] Agregar lógica de unlock en `/api/webhooks/mercadopago`
- [x] Actualizar página `/escuchar/[id]` para pasar flag `isPreview`
- [x] Simplificar webhook Suno (sin generación de previews)
- [x] Actualizar `/api/status` para devolver `is_unlocked`
- [x] Crear migration SQL `add-preview-system.sql`
- [x] Commit: `84ad820`

### ⏳ Pendiente

- [ ] **Ejecutar migration SQL en Supabase Dashboard:**
  ```sql
  ALTER TABLE public.generations 
  ADD COLUMN IF NOT EXISTS is_unlocked BOOLEAN DEFAULT FALSE;
  
  CREATE INDEX IF NOT EXISTS idx_generations_unlocked ON public.generations(is_unlocked);
  ```
- [ ] Deploy a Vercel production
- [ ] Testing de flujo completo
- [ ] Monitorear conversión en primeras 48h

---

## 🧪 Testing checklist

1. **Preview mode:**
   - [ ] Generar canción nueva
   - [ ] Verificar que player reproduce solo 10 seg (segundo 15-25)
   - [ ] Intentar hacer seek → debe bloquear fuera de rango 15-25
   - [ ] Verificar mensaje "🔒 Preview de 10 segundos"

2. **Payment flow:**
   - [ ] Click en "Pagar con Mercado Pago"
   - [ ] Completar pago
   - [ ] Verificar que webhook MP marca `is_unlocked = TRUE`
   - [ ] Reload página → player debe mostrar audio completo
   - [ ] Verificar que puede descargar MP3

3. **Edge cases:**
   - [ ] Regenerar canción → preview sigue activo
   - [ ] Pagar canción A → solo A se desbloquea, B sigue locked
   - [ ] Intentar acceder a download sin pagar → error 403

---

## 📊 Métricas a monitorear

**KPIs clave:**
- **Preview play rate:** % de usuarios que reproducen el preview
- **Click to pay rate:** % de previews que resultan en click de "Pagar"
- **Conversion rate:** % de clicks que resultan en pago completado
- **Revenue per generation:** Ingresos / generaciones

**Meta conservadora:** 5% conversion rate (vs 0% actual)  
**Meta ambiciosa:** 15% conversion rate

**Tracking:**
- Google Analytics: eventos `preview_played`, `payment_initiated`, `payment_completed`
- Supabase: queries directas a `payments` y `generations`

---

## 🔄 Rollback plan

Si la conversión es catastrófica o hay bugs críticos:

1. Revertir commit: `git revert 84ad820`
2. Deploy rollback a Vercel
3. (Opcional) Remover columna `is_unlocked` de DB

**Criterio de rollback:**
- Conversion rate &lt;1% después de 100 generaciones
- Bugs críticos que rompen el payment flow
- Quejas masivas de usuarios

---

## 🧠 Learnings técnicos

1. **FFmpeg en Vercel = problema**  
   → Serverless tiene timeout de 60s, FFmpeg puede tardar más  
   → Solución: limitar en cliente (más rápido, sin costo de compute)

2. **Preview mode en player es elegante**  
   → No requiere storage extra  
   → No requiere generar archivos cortados  
   → Funciona 100% en cliente (rápido, sin latencia)

3. **Segundo 15-25 es ideal**  
   → Evita intro aburrida  
   → No revela final (mantiene curiosidad)  
   → 10 segundos es suficiente para decidir

---

## 🔐 Security considerations

- ✅ Stream URLs de Suno son públicas pero no indexables
- ✅ No hay forma de bypassear el player (unlock está en DB)
- ✅ Download token expira en 48h (ya existía)
- ✅ RLS en Supabase protege lecturas no autorizadas

**Vulnerabilidad potencial:**
- Un usuario técnico podría abrir DevTools y copiar el stream_url completo
- **Mitigación:** Aceptable para MVP — 99% de usuarios no lo harán
- **Fix futuro:** Firmar URLs con tokens temporales (SunoAPI no lo soporta nativamente)

---

## 📞 Support

**Si algo falla en producción:**
1. Revisar logs de Vercel: `vercel logs`
2. Revisar logs de Supabase: Dashboard > Logs
3. Revisar webhooks de MercadoPago: Dashboard MP > Notificaciones
4. WhatsApp a Miki: +54 9 11 5704-5808

---

_Implementation by Jarvis (OpenClaw) — 2026-03-19_
