# 📅 CHANGELOG - 19 Marzo 2025

## 🎯 RESUMEN EJECUTIVO

**3 features implementadas en 1 día:**
1. **Tier 1 CRO** - Quick wins para aumentar conversión
2. **Tier 3 SEO** - 3 landing pages optimizadas para tráfico orgánico
3. **Tier 3 Referrals** - Sistema viral completo con tracking y dashboard

**Deploy:** Automático via Vercel  
**DB Migration:** Manual en Supabase (ejecutada)

---

## ✅ TIER 1 - QUICK WINS CRO

### 1. Exit-Intent Popup
**Archivo:** `src/components/ExitIntentPopup.tsx`

**Qué hace:**
- Detecta cuando el usuario mueve el mouse para cerrar el tab
- Muestra popup con oferta: "Generá tu jingle GRATIS ahora"
- Solo aparece 1 vez por sesión (sessionStorage)
- CTA: lleva al formulario principal

**Trigger:** `mouseleave` del documento cuando `clientY <= 0`

**Copy:**
```
¡Esperá!
Generá tu jingle GRATIS ahora mismo.
No pedimos email ni tarjeta.

✅ 2 versiones únicas
✅ Generación instantánea
✅ Sin compromiso
```

---

### 2. Badge de Escasez en Precio
**Archivo:** `src/app/escuchar/[id]/page.tsx`

**Qué hace:**
- Badge naranja con animación pulse-glow
- Aparece arriba del pay-box
- Mensaje: "⚠️ Precio de lanzamiento - Sube a $12,900 el 1 de Abril"

**Psicología:** Urgencia temporal + anclaje de precio

**Estilos:** `.price-urgency-badge` en `globals.css`

---

### 3. Social Proof Dinámico
**Archivo:** `src/components/SocialProof.tsx`

**Qué hace:**
- Notificaciones flotantes (bottom-left)
- Rota cada 8 segundos entre 7 mensajes
- Ejemplos: "Juan de Palermo generó su jingle hace 2 min"
- Aparece después de 3 segundos de carga

**NO menciona dinero** - solo acciones (generó, descargó, creó)

**Ubicación:** Homepage (debajo de Nav)

---

## 🔍 TIER 3 - SEO LANDING PAGES

### Estructura
```
src/app/(landing)/
├── layout.tsx              # Metadata compartida
├── generador-jingles-gratis/
│   └── page.tsx           # Keyword principal (800/mes)
├── como-crear-jingle-para-marca/
│   └── page.tsx           # Educational (500/mes)
└── ejemplos-jingles-marcas-argentinas/
    └── page.tsx           # Showcase (300/mes)
```

### 1. /generador-jingles-gratis
**Objetivo:** Conversión directa

**Secciones:**
- Hero con stats (2,000+ jingles creados, 30 seg tiempo promedio)
- ¿Qué es un generador de jingles?
- ¿Cómo funciona? (3 pasos)
- Estilos musicales disponibles (10 géneros)
- CTA: "Generar mi Jingle Gratis"
- FAQ (5 preguntas)

**SEO:**
- Title: "Generador de Jingles Gratis con IA | Jingle Generator"
- Meta: optimizada para "generador jingles gratis"
- Keywords: generador de jingles gratis, crear jingle con ia, jingle para marca

---

### 2. /como-crear-jingle-para-marca
**Objetivo:** Educational long-tail

**Secciones:**
- Guía completa paso a paso
- 3 métodos (estudio, freelancer, IA)
- Comparación de costos y tiempos
- Características de un jingle efectivo (checklist)
- Ejemplos argentinos (La Continental, Ariel, Renault)
- FAQ

**Valor:** 8 min de lectura, contenido profundo

---

### 3. /ejemplos-jingles-marcas-argentinas
**Objetivo:** Inspiración + social proof

**Secciones:**
- 20 jingles famosos argentinos
- Análisis de por qué funcionan
- Jingles clásicos vs modernos
- 4 lecciones de los mejores jingles
- Tips para crear el tuyo

**Engagement:** Nostalgia + aprendizaje

---

### Estilos Compartidos
**Archivo:** `src/styles/globals.css` (sección `LANDING PAGES STYLES`)

**Componentes:**
- `.landing-hero` - Header principal
- `.landing-steps` - Pasos numerados con círculos
- `.landing-faq` - Accordion colapsable
- `.landing-jingle-list` - Cards de ejemplos
- Responsive mobile-first

---

### Sitemap Actualizado
**Archivo:** `src/app/sitemap.ts`

Agregadas 3 URLs:
```javascript
{ url: '/generador-jingles-gratis', priority: 0.9 }
{ url: '/como-crear-jingle-para-marca', priority: 0.8 }
{ url: '/ejemplos-jingles-marcas-argentinas', priority: 0.8 }
```

---

## 🎁 TIER 3 - SISTEMA DE REFERRALS

### Arquitectura

```
┌─────────────────────────────────────────────┐
│ FLUJO COMPLETO                              │
├─────────────────────────────────────────────┤
│ 1. Usuario genera jingle                    │
│ 2. Sistema auto-crea referral code (8 chars)│
│ 3. Widget en /escuchar/[id] muestra link   │
│ 4. Usuario comparte → tracking de clics    │
│ 5. Amigo genera y paga → +$1000 ARS        │
│ 6. Dashboard /mis-referidos muestra stats  │
└─────────────────────────────────────────────┘
```

---

### Base de Datos (Supabase)

**Tablas creadas:**

#### `referrals`
```sql
- id (UUID)
- code (TEXT, unique) - Ej: "AB12CD34"
- generation_id (UUID) - FK a generations
- email (TEXT, nullable)
- created_at (timestamp)
- total_clicks (integer)
- total_conversions (integer)
- total_earned_ars (integer)
```

#### `referral_clicks`
```sql
- id (UUID)
- referral_code (TEXT) - FK a referrals
- clicked_at (timestamp)
- ip_address (TEXT)
- user_agent (TEXT)
- converted (boolean)
- payment_id (UUID, nullable)
```

#### `generations` - columnas agregadas
```sql
- referrer_code (TEXT) - código que trajo esta generación
- referred_by (UUID) - ID del referrer
```

---

### Funciones PostgreSQL

**1. `increment_referral_clicks(ref_code TEXT)`**
- Incrementa contador de clics atómicamente
- Llamada via `supabase.rpc()` desde frontend

**2. `update_referral_stats()` (trigger)**
- Se ejecuta cuando `is_unlocked` cambia de `false` → `true`
- Actualiza conversiones y ganancias
- Marca el click más reciente como convertido

**3. View `referral_dashboard`**
- JOIN entre `referrals` y `referral_clicks`
- Calcula tasa de conversión
- Agrega unique_clicks y confirmed_conversions

---

### Backend (API Routes)

#### POST `/api/referrals/generate`
**Input:**
```json
{
  "generationId": "uuid",
  "email": "opcional@example.com"
}
```

**Output:**
```json
{
  "success": true,
  "code": "AB12CD34",
  "shareUrl": "https://jinglegenerator.com?ref=AB12CD34"
}
```

**Archivo:** `src/app/api/referrals/generate/route.ts`

---

#### POST `/api/referrals/track`
**Input:**
```json
{
  "code": "AB12CD34"
}
```

**Qué hace:**
- Incrementa `total_clicks` en tabla `referrals`
- Guarda click en `referral_clicks` (IP, user-agent)
- Valida que el código existe

**Archivo:** `src/app/api/referrals/track/route.ts`

---

#### GET `/api/referrals/stats?code=AB12CD34`
**Output:**
```json
{
  "success": true,
  "stats": {
    "code": "AB12CD34",
    "total_clicks": 15,
    "total_conversions": 3,
    "total_earned_ars": 3000,
    "conversion_rate": 20.00
  }
}
```

**Archivo:** `src/app/api/referrals/stats/route.ts`

---

### Frontend

#### Componente: `ReferralShare`
**Ubicación:** `src/components/ReferralShare.tsx`  
**Props:** `{ generationId: string }`

**Qué muestra:**
- 🎁 Header "Compartí y ganá"
- Código de referido (grande, monospace)
- Input + botón copiar link
- 3 botones sociales (WhatsApp, Twitter, Facebook)
- Link a dashboard completo

**Integración:** Insertado en `/escuchar/[id]` después del pay-box

---

#### Página: `/mis-referidos`
**Archivo:** `src/app/mis-referidos/page.tsx`  
**Params:** `?code=AB12CD34` (obligatorio)

**Secciones:**
1. **Stats grid (4 cards):**
   - 👀 Clics totales
   - 🎵 Ventas generadas
   - 💰 Total ganado (ARS)
   - 📊 Tasa de conversión (%)

2. **Share section:**
   - Código grande destacado
   - Input + botón copiar
   - 3 botones sociales

3. **Tips section (4 consejos):**
   - Compartir en grupos WhatsApp
   - Publicar en redes sociales
   - Enviar emails personalizados
   - Participar en comunidades

**Dynamic:** `force-dynamic` + Suspense boundary para `useSearchParams()`

---

### Tracking Flow

#### Homepage (`src/app/page.tsx`)
```javascript
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const refCode = urlParams.get('ref')
  
  if (refCode) {
    localStorage.setItem('referral_code', refCode)
    
    fetch('/api/referrals/track', {
      method: 'POST',
      body: JSON.stringify({ code: refCode })
    })
  }
}, [])
```

#### Generate API (`src/app/api/generate/route.ts`)
```javascript
const referrerCode = localStorage.getItem('referral_code') || undefined

fetch('/api/generate', {
  body: JSON.stringify({
    brandName,
    genre,
    referrerCode  // ← guardado en DB
  })
})
```

---

### Estilos
**Archivo:** `src/styles/globals.css`

**Secciones agregadas:**
- `REFERRAL SHARE COMPONENT` (widget en escuchar)
- `REFERRAL DASHBOARD` (página mis-referidos)

**Highlights:**
- Cards con hover effects
- Gradient backgrounds
- Botones sociales con colores brand
- Responsive mobile (grid → column)

---

## 🗄️ CÓMO ADMINISTRAR REFERRALS

### Opción 1: Visual (Supabase Table Editor)

**Ver todos los referrals:**
1. Supabase → Table Editor
2. Click tabla `referrals`
3. Ordenar por `total_earned_ars` DESC

**Ver clicks individuales:**
1. Table Editor → tabla `referral_clicks`
2. Filtrar por `referral_code` o `converted = true`

**Ver generaciones con referral:**
1. Table Editor → tabla `generations`
2. Filtrar `referrer_code IS NOT NULL`

---

### Opción 2: Queries SQL

**TOP 10 referidores:**
```sql
SELECT 
  code,
  total_clicks,
  total_conversions,
  total_earned_ars,
  ROUND((total_conversions::float / NULLIF(total_clicks, 0)::float) * 100, 2) as conversion_rate
FROM referrals
ORDER BY total_earned_ars DESC
LIMIT 10;
```

**Total owed (cuánto hay que pagar):**
```sql
SELECT 
  COUNT(*) as total_referrers,
  SUM(total_conversions) as total_sales,
  SUM(total_earned_ars) as total_owed_ars
FROM referrals;
```

**Referrals de hoy:**
```sql
SELECT 
  r.code,
  r.total_clicks,
  r.total_conversions,
  r.created_at
FROM referrals r
WHERE DATE(r.created_at) = CURRENT_DATE
ORDER BY r.created_at DESC;
```

**Detectar posible fraude (mismo IP, múltiples conversiones):**
```sql
SELECT 
  rc.ip_address,
  COUNT(*) as total_clicks,
  COUNT(CASE WHEN rc.converted THEN 1 END) as conversions
FROM referral_clicks rc
GROUP BY rc.ip_address
HAVING COUNT(CASE WHEN rc.converted THEN 1 END) > 1
ORDER BY conversions DESC;
```

---

## 🚀 DEPLOYMENT

### Automático (Vercel)
- Push a `main` → auto-deploy
- Build exitoso confirmado
- URLs live:
  - https://jinglegenerator.com
  - https://jinglegenerator.com/generador-jingles-gratis
  - https://jinglegenerator.com/como-crear-jingle-para-marca
  - https://jinglegenerator.com/ejemplos-jingles-marcas-argentinas
  - https://jinglegenerator.com/mis-referidos?code=XXXXX

### Manual (Supabase)
- SQL migration ejecutada (19/03/2025 19:49)
- Tablas creadas: `referrals`, `referral_clicks`
- Funciones: `increment_referral_clicks`, `update_referral_stats`
- View: `referral_dashboard`
- Trigger: `trigger_update_referral_stats` on `generations.is_unlocked`

---

## 🧪 TESTING CHECKLIST

### Exit-Intent Popup
- [ ] Ir a homepage
- [ ] Mover mouse hacia arriba (fuera del viewport)
- [ ] Debe aparecer popup "¡Esperá!"
- [ ] Click "Generar mi jingle gratis" → scroll to form
- [ ] Recargar página → NO debe aparecer de nuevo (sessionStorage)

### Social Proof
- [ ] Ir a homepage
- [ ] Esperar 3 segundos
- [ ] Debe aparecer notificación bottom-left
- [ ] Cada 8 segundos cambia el mensaje
- [ ] 7 mensajes rotando (ciudades argentinas)

### Landing Pages
- [ ] https://jinglegenerator.com/generador-jingles-gratis → carga OK
- [ ] https://jinglegenerator.com/como-crear-jingle-para-marca → carga OK
- [ ] https://jinglegenerator.com/ejemplos-jingles-marcas-argentinas → carga OK
- [ ] Mobile responsive (breakpoint 768px)
- [ ] Footer links funcionan

### Referral System
- [ ] Generar jingle → ir a `/escuchar/[id]`
- [ ] Debe aparecer widget "Compartí y ganá"
- [ ] Click "Copiar link" → clipboard OK
- [ ] Abrir ventana privada → pegar link con `?ref=XXXXX`
- [ ] Generar nuevo jingle (como referido)
- [ ] Volver a dashboard `/mis-referidos?code=XXXXX`
- [ ] Debe mostrar 1 clic (total_clicks)
- [ ] Pagar jingle referido → conversión se trackea
- [ ] Dashboard muestra 1 conversión + $1,000 ganado

---

## 📊 MÉTRICAS ESPERADAS

### Tier 1 CRO
- **Exit-intent popup:** +5-10% recuperación abandonos
- **Badge escasez:** +3-7% conversión pago
- **Social proof:** +2-5% engagement homepage

### Tier 3 SEO
- **Tráfico orgánico:** +300-500% en 2-3 meses
- **Keywords objetivo:** 1,600 búsquedas/mes combinadas
- **Long-tail:** miles de variaciones

### Tier 3 Referrals
- **Viral coefficient:** objetivo 0.3-0.5 (30-50% comparten)
- **Conversión referida:** objetivo 2-5% (clicks → sales)
- **CAC reducción:** -40-60% (vs paid ads)

---

## 🐛 TROUBLESHOOTING

### Referral code no se genera
**Síntoma:** Widget en `/escuchar/[id]` dice "Generando tu link..."  
**Check:**
1. Supabase SQL Editor → `SELECT * FROM referrals LIMIT 5;`
2. Si vacío → llamar API manualmente:
   ```bash
   curl -X POST https://jinglegenerator.com/api/referrals/generate \
     -H "Content-Type: application/json" \
     -d '{"generationId": "UUID_REAL"}'
   ```
3. Verificar logs Vercel Functions

### Clics no se trackean
**Síntoma:** Dashboard muestra 0 clics  
**Check:**
1. Abrir DevTools → Network tab
2. Visitar URL con `?ref=CODE`
3. Buscar request a `/api/referrals/track`
4. Si falla → revisar `SUPABASE_SERVICE_ROLE_KEY` en Vercel env vars

### Conversiones no suman
**Síntoma:** Usuario pagó pero dashboard no incrementa  
**Check:**
1. Supabase → Table Editor → `generations`
2. Buscar por `id` del pago
3. Verificar `is_unlocked = true` AND `referrer_code = 'XXXXX'`
4. Si ambos OK → revisar trigger:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'trigger_update_referral_stats';
   ```

---

## 📁 ARCHIVOS MODIFICADOS/CREADOS

### Nuevos (15 archivos)
```
src/components/ExitIntentPopup.tsx
src/components/SocialProof.tsx
src/components/ReferralShare.tsx
src/app/(landing)/layout.tsx
src/app/(landing)/generador-jingles-gratis/page.tsx
src/app/(landing)/como-crear-jingle-para-marca/page.tsx
src/app/(landing)/ejemplos-jingles-marcas-argentinas/page.tsx
src/app/mis-referidos/page.tsx
src/app/api/referrals/generate/route.ts
src/app/api/referrals/track/route.ts
src/app/api/referrals/stats/route.ts
src/lib/referrals.ts
supabase/migrations/20250319_referrals.sql
```

### Modificados (4 archivos)
```
src/app/page.tsx                    # Exit-intent, tracking referral
src/app/escuchar/[id]/page.tsx      # ReferralShare widget, price urgency
src/app/api/generate/route.ts       # Guardar referrer_code
src/app/sitemap.ts                  # Agregar 3 landing pages
```

### Estilos (1 archivo masivo)
```
src/styles/globals.css              # +800 líneas nuevas
```

---

## 🔜 PRÓXIMOS PASOS (NO IMPLEMENTADOS)

### Tier 2: Lifecycle Optimization
- Email sequences (onboarding, abandoned cart)
- Push notifications via Web Push API
- In-app messaging

### Tier 3: B2B API
- REST API con rate limiting
- Dashboard de agencias
- Webhooks
- Swagger docs

### Tier 4: Advanced Analytics
- Cohort analysis
- Funnel visualization
- A/B test framework expansion

---

## 🎯 KPIs A MONITOREAR

### Semanales
- [ ] Conversiones totales (escuchar → pago)
- [ ] Exit-intent popup conversion rate
- [ ] Referral share rate (cuántos comparten)
- [ ] Organic traffic (SEO landing pages)

### Mensuales
- [ ] Total referral earnings owed
- [ ] Top 10 referidores
- [ ] Landing pages rankings (Search Console)
- [ ] Social proof engagement

---

## 📞 SOPORTE

**Si algo rompe:**
1. Revisar logs Vercel: https://vercel.com/dashboard
2. Revisar logs Supabase: SQL Editor → Recent Queries
3. Rollback: `git revert HEAD` + push

**Contacto Jarvis:**
- Slack workspace
- OpenClaw chat
- GitHub issues

---

**Documentado:** 19 Marzo 2025  
**Versión:** 0.2.0  
**Commits:** 3 (Tier1 CRO, SEO Landings, Referrals)  
**Status:** ✅ Live en producción
