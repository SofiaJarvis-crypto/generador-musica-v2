# INSTRUCCIONES DE IMPLEMENTACIÓN — Generador de Música para Marcas
## Para ser ejecutadas por una IA (Claude Haiku, GPT, etc.)

---

## QUÉ ES ESTE PROYECTO

Una webapp donde emprendedores argentinos ingresan datos de su marca y obtienen un jingle generado por IA.
- **Escuchar es gratis** (con beep de watermark cada 15 segundos)
- **Descargar el MP3 limpio cuesta $8.900 ARS** (pago único vía Mercado Pago)
- Sin registro de usuarios. Sin login.

**Stack:** Next.js 14 (App Router) + Supabase (PostgreSQL) + Suno API + Mercado Pago + Vercel

---

## ARCHIVOS EN ESTE ZIP

```
PROMPT.md                          ← este archivo
.env.example                       ← variables de entorno requeridas
next.config.js                     ← configuración de Next.js
package.json                       ← dependencias
tsconfig.json                      ← configuración TypeScript
sql/schema.sql                     ← esquema completo de la base de datos

src/
  styles/globals.css               ← TODO el CSS (diseño oscuro amber/orange)
  types/index.ts                   ← tipos TypeScript
  lib/supabase.ts                  ← clientes de Supabase
  lib/suno-prompt.ts               ← constructor del prompt para Suno API

  app/
    layout.tsx                     ← layout raíz, importa globals.css
    page.tsx                       ← Pantalla 1: Formulario
    generando/[id]/page.tsx        ← Pantalla 2: Loading + polling
    escuchar/[id]/page.tsx         ← Pantalla 3: Player + botón de pago
    descarga/page.tsx              ← Pantalla 4: Post-pago, descarga del MP3
    pago-fallido/page.tsx          ← Página de error de pago

    api/
      generate/route.ts            ← POST: recibe formulario, llama Suno
      status/[id]/route.ts         ← GET: polling del frontend
      payment/create/route.ts      ← POST: crea preferencia Mercado Pago
      download/route.ts            ← GET: descarga protegida por token
      webhooks/
        suno/route.ts              ← POST: Suno notifica cuando el audio está listo
        mercadopago/route.ts       ← POST: MP notifica cuando el pago fue aprobado

  components/
    Nav.tsx                        ← Navbar + indicador de pasos (steps)
    WaveformPlayer.tsx             ← Player de audio con watermark via Web Audio API
```

---

## PASO 1 — CREAR EL PROYECTO NEXT.JS

Ejecutar en la terminal, en el directorio donde querés crear el proyecto:

```bash
npx create-next-app@14 generador-musica-marcas \
  --typescript \
  --app \
  --no-tailwind \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint

cd generador-musica-marcas
```

**IMPORTANTE:** Responder `No` a todo. No usar Tailwind. No usar ESLint en este paso.

---

## PASO 2 — INSTALAR DEPENDENCIAS

```bash
npm install @supabase/supabase-js mercadopago
```

Verificar que `package.json` tenga estas dependencias (además de next, react, react-dom):
- `@supabase/supabase-js`: `^2.45.0`
- `mercadopago`: `^2.0.6`

---

## PASO 3 — COPIAR ARCHIVOS DEL ZIP

### 3a. Borrar archivos que crea Next.js por defecto que NO necesitamos

Borrar estos archivos si existen:
- `src/app/globals.css` ← lo reemplazamos con `src/styles/globals.css`
- `src/app/page.module.css`
- El contenido de `src/app/page.tsx` (lo vamos a reemplazar)
- El contenido de `src/app/layout.tsx` (lo vamos a reemplazar)

### 3b. Copiar TODOS los archivos del ZIP manteniendo la estructura exacta

Copiar archivo por archivo respetando la ruta. La estructura final debe ser:

```
generador-musica-marcas/
├── .env.example
├── .env.local          ← crear este (ver Paso 4)
├── next.config.js
├── package.json
├── tsconfig.json
├── sql/
│   └── schema.sql
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── generando/
    │   │   └── [id]/
    │   │       └── page.tsx
    │   ├── escuchar/
    │   │   └── [id]/
    │   │       └── page.tsx
    │   ├── descarga/
    │   │   └── page.tsx
    │   ├── pago-fallido/
    │   │   └── page.tsx
    │   └── api/
    │       ├── generate/
    │       │   └── route.ts
    │       ├── status/
    │       │   └── [id]/
    │       │       └── route.ts
    │       ├── payment/
    │       │   └── create/
    │       │       └── route.ts
    │       ├── download/
    │       │   └── route.ts
    │       └── webhooks/
    │           ├── suno/
    │           │   └── route.ts
    │           └── mercadopago/
    │               └── route.ts
    ├── components/
    │   ├── Nav.tsx
    │   └── WaveformPlayer.tsx
    ├── lib/
    │   ├── supabase.ts
    │   └── suno-prompt.ts
    ├── styles/
    │   └── globals.css
    └── types/
        └── index.ts
```

### 3c. Reemplazar next.config.js

El archivo `next.config.js` de este ZIP debe reemplazar al que crea Next.js.

---

## PASO 4 — CONFIGURAR VARIABLES DE ENTORNO

Crear el archivo `.env.local` en la raíz del proyecto con este contenido,
reemplazando los valores de ejemplo con las credenciales reales:

```env
# ── Supabase ──────────────────────────────────────────────────────────────
# Obtener en: supabase.com → tu proyecto → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXXXXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ── Suno API ───────────────────────────────────────────────────────────────
# Obtener en: sunoapi.org → Dashboard → API Keys
SUNO_API_KEY=tu_api_key_aqui
SUNO_API_BASE_URL=https://api.sunoapi.org

# ── Mercado Pago ───────────────────────────────────────────────────────────
# Obtener en: mercadopago.com.ar → Tus integraciones → Credenciales de prueba
MP_ACCESS_TOKEN=TEST-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX
NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# ── App ────────────────────────────────────────────────────────────────────
# En local usar http://localhost:3000
# En producción usar https://tu-dominio.vercel.app (sin slash final)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ── Configuración del negocio ──────────────────────────────────────────────
PRECIO_ARS=8900
MAX_REGENS=3
```

**NOTAS CRÍTICAS sobre las variables:**
- `SUPABASE_SERVICE_ROLE_KEY` es secreta — solo se usa en el servidor, nunca en el browser
- `NEXT_PUBLIC_APP_URL` debe ser la URL pública donde corre la app (sin slash al final)
- Para producción, `MP_ACCESS_TOKEN` debe ser el token de producción (no TEST-)

---

## PASO 5 — CONFIGURAR SUPABASE

### 5a. Ejecutar el schema SQL

1. Ir a [supabase.com](https://supabase.com)
2. Abrir el proyecto de Supabase
3. Ir a **SQL Editor** (ícono de base de datos en el sidebar izquierdo)
4. Hacer click en **New query**
5. Copiar y pegar el contenido completo de `sql/schema.sql`
6. Hacer click en **Run** (o Ctrl+Enter)

Esto crea:
- Tabla `generations` — almacena cada solicitud de jingle
- Tabla `payments` — almacena cada intento/confirmación de pago
- Los índices necesarios
- Las políticas de Row Level Security (RLS)

### 5b. Verificar que las tablas se crearon

En Supabase → **Table Editor**, verificar que existen:
- `generations` con las columnas: id, created_at, brand_name, brand_description, brand_location, genre, moods, duration_seconds, suno_task_id, suno_status, song_a_id, song_a_stream_url, song_a_audio_url, song_a_image_url, song_a_lyrics, song_b_id, song_b_stream_url, song_b_audio_url, song_b_image_url, song_b_lyrics, selected_song, regen_count, ip_address, session_token, error_message
- `payments` con las columnas: id, created_at, generation_id, selected_song, mp_preference_id, mp_payment_id, mp_status, amount_ars, payer_email, download_token, token_expires_at, downloaded_at, download_count

---

## PASO 6 — CORRER EN LOCAL

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

Si hay errores de TypeScript al iniciar, verificar que:
1. El archivo `src/styles/globals.css` existe y es el del ZIP
2. El `src/app/layout.tsx` importa desde `'../styles/globals.css'` (no desde `'./globals.css'`)
3. Todas las rutas de las carpetas con `[id]` tienen los corchetes exactos en el nombre de la carpeta

---

## PASO 7 — TESTING DEL FLUJO COMPLETO EN LOCAL

Los webhooks necesitan URL pública. Instalar ngrok:

```bash
# En una terminal nueva (dejar npm run dev corriendo en otra)
npx ngrok http 3000
```

Ngrok mostrará una URL como `https://abc123.ngrok-free.app`.
Actualizar `.env.local`:
```env
NEXT_PUBLIC_APP_URL=https://abc123.ngrok-free.app
```
Reiniciar `npm run dev`.

### Tarjetas de prueba de Mercado Pago (sandbox)

Para testear pagos usar estas tarjetas de prueba:

| Resultado | Número de tarjeta | CVV | Vencimiento |
|-----------|-------------------|-----|-------------|
| ✅ Aprobado | `5031 7557 3453 0604` | `123` | `11/25` |
| ❌ Rechazado | `4000 0000 0000 0002` | `123` | `11/25` |

Nombre en tarjeta: cualquier nombre
DNI: cualquier número

---

## PASO 8 — DEPLOY EN VERCEL

### 8a. Subir a GitHub

```bash
git init
git add .
git commit -m "initial commit"
```

Crear repositorio en GitHub (privado) y hacer push.

### 8b. Conectar con Vercel

Ir a [vercel.com](https://vercel.com) → **Add New Project** → importar desde GitHub.

O por CLI:
```bash
npm i -g vercel
vercel login
vercel
```

### 8c. Configurar variables de entorno en Vercel

En **Vercel Dashboard → Project → Settings → Environment Variables**,
agregar TODAS las variables de `.env.example` con valores de producción:

| Variable | Valor para producción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | igual que local |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | igual que local |
| `SUPABASE_SERVICE_ROLE_KEY` | igual que local |
| `SUNO_API_KEY` | igual que local |
| `SUNO_API_BASE_URL` | `https://api.sunoapi.org` |
| `MP_ACCESS_TOKEN` | **token de PRODUCCIÓN** (no TEST-) |
| `NEXT_PUBLIC_MP_PUBLIC_KEY` | **clave pública de PRODUCCIÓN** |
| `NEXT_PUBLIC_APP_URL` | `https://tu-app.vercel.app` |
| `PRECIO_ARS` | `8900` (o el precio que definas) |
| `MAX_REGENS` | `3` |

### 8d. Redeploy

```bash
vercel --prod
```

---

## CÓMO FUNCIONA EL SISTEMA (referencia)

### Flujo completo de datos

```
PANTALLA 1 (/)
  Usuario llena formulario → click "Generar mi canción gratis"
  → POST /api/generate
      → Crea fila en tabla "generations" (suno_status: 'generating')
      → Llama POST https://api.sunoapi.org/api/v1/generate con el prompt
      → Guarda el taskId devuelto por Suno
      → Devuelve { generationId, sessionToken }
  → Frontend guarda sessionToken en sessionStorage
  → Frontend redirige a /generando/[generationId]

PANTALLA 2 (/generando/[id])
  Frontend hace polling cada 3 segundos a GET /api/status/[id]
  Mientras tanto Suno procesa la canción y llama al webhook

  SUNO → POST /api/webhooks/suno?generationId=XXX
    Si status === 'FIRST_SUCCESS':
      → Actualiza generation: suno_status='stream_ready', song_a_stream_url=..., song_b_stream_url=...
    Si status === 'SUCCESS':
      → Actualiza generation: suno_status='complete', song_a_audio_url=..., song_b_audio_url=...
    Si error:
      → Actualiza generation: suno_status='error'

  Cuando el polling detecta suno_status === 'stream_ready' o 'complete':
    → Frontend redirige a /escuchar/[id]

PANTALLA 3 (/escuchar/[id])
  Frontend carga los datos via GET /api/status/[id]
  Muestra WaveformPlayer con song_a_stream_url (audio con beep watermark cada 15s)
  Si hay song_b_stream_url → muestra tabs para elegir versión A o B

  Usuario click "Pagar con Mercado Pago"
  → POST /api/payment/create { generationId, selectedSong }
      → Crea fila en tabla "payments" (mp_status: 'pending')
        con download_token generado automáticamente (UUID hex de 32 bytes)
      → Crea preferencia en Mercado Pago con:
          - back_urls.success = APP_URL/descarga?token={download_token}
          - back_urls.failure = APP_URL/pago-fallido?generationId={generationId}
          - notification_url = APP_URL/api/webhooks/mercadopago
          - metadata = { payment_id, generation_id, selected_song }
      → Devuelve { checkoutUrl, preferenceId }
  → Frontend redirige al checkoutUrl de Mercado Pago

  Usuario paga en Mercado Pago

  MERCADO PAGO → POST /api/webhooks/mercadopago
    → Recibe notificación tipo 'payment'
    → Consulta el pago a la API de MP para verificarlo
    → Si status === 'approved':
        → Actualiza payments: mp_status='approved', mp_payment_id=..., payer_email=...
        → Actualiza generations: selected_song=...
    → Siempre devuelve HTTP 200 (para que MP no reintente)

  Mercado Pago redirige a /descarga?token={download_token}

PANTALLA 4 (/descarga?token=XXX)
  → GET /api/download?token=XXX&check=1
      → Busca el payment por download_token
      → Verifica mp_status === 'approved'
      → Si audioUrl está listo: devuelve { ready: true, brandName }
      → Si audioUrl no está: devuelve HTTP 202 { preparing: true }

  Usuario click "Descargar MP3"
  → GET /api/download?token=XXX
      → Valida token y pago
      → Hace fetch del audioUrl de Suno
      → Devuelve el MP3 con header: Content-Disposition: attachment; filename="marca_jingle.mp3"
```

### Por qué el audio stream (con watermark) y el audioUrl (sin watermark) son distintos

- `streamAudioUrl`: disponible en ~30-40 segundos. Se usa para que el usuario escuche gratis.
  El watermark (beep) se agrega en el browser via Web Audio API en `WaveformPlayer.tsx`.
  No se modifica el archivo de Suno.

- `audioUrl`: disponible en ~2-3 minutos. Es el MP3 limpio final.
  Solo se entrega después del pago. Nunca se expone en la API de status.

---

## ERRORES FRECUENTES Y CÓMO RESOLVERLOS

### "Cannot find module '@/components/Nav'"
→ Verificar que `tsconfig.json` tiene `"paths": { "@/*": ["./src/*"] }`
→ Verificar que la carpeta existe en `src/components/Nav.tsx` (no en `app/components/`)

### "Error: Missing NEXT_PUBLIC_SUPABASE_URL"
→ El archivo `.env.local` no existe o no tiene la variable
→ Reiniciar `npm run dev` después de crear/editar `.env.local`

### "TypeError: Cannot read properties of undefined (reading 'generations')"
→ La query de Supabase con join (`generations ( ... )`) devuelve null
→ Verificar que el `generation_id` en la tabla payments corresponde a un registro en generations

### "violates row-level security policy"
→ Estás usando el anon key donde deberías usar service_role_key
→ Verificar que `supabaseAdmin` usa `SUPABASE_SERVICE_ROLE_KEY`

### El webhook de Suno nunca llega
→ `NEXT_PUBLIC_APP_URL` no es una URL pública accesible desde internet
→ En local, usar ngrok (ver Paso 7)
→ Verificar en los logs de Vercel (Functions → Logs)

### "Pago aprobado" pero no puede descargar
→ El webhook de MP puede tardar hasta 30 segundos
→ La página de descarga tiene botón "Verificar si está listo" para reintentar
→ Revisar logs de Vercel para el endpoint `/api/webhooks/mercadopago`

### El audio no se reproduce en Safari (iOS)
→ Safari requiere gesto del usuario para reproducir audio
→ El botón de play ya maneja esto. Si sigue fallando, verificar CORS en los headers de Suno

### "Module not found: Can't resolve 'mercadopago'"
→ Ejecutar `npm install mercadopago` dentro del directorio del proyecto

---

## PERSONALIZACIÓN

### Cambiar el precio

En `.env.local` y en Vercel:
```env
PRECIO_ARS=12900
```

### Cambiar el límite de regeneraciones gratuitas

```env
MAX_REGENS=2
```

### Cambiar el email de soporte

En `src/app/descarga/page.tsx`, buscar y reemplazar `soporte@tudominio.com`.

### Agregar un nuevo género musical

1. En `src/app/page.tsx`, agregar al array `GENRES`:
   ```ts
   { id: 'Rock Nacional', emoji: '🎸', label: 'Rock Nacional' }
   ```

2. En `src/lib/suno-prompt.ts`, agregar al objeto `GENRE_TAGS`:
   ```ts
   'Rock Nacional': 'argentine rock, electric guitar, passionate, powerful',
   ```

### Cambiar el modelo de Suno

En `src/app/api/generate/route.ts`, buscar `model: 'V4_5'` y cambiar por:
- `'V5'` → más calidad, más rápido
- `'V4_5ALL'` → mejor estructura de canción  
- `'V4_5PLUS'` → tonos más ricos

---

## CHECKLIST DE VERIFICACIÓN FINAL

Antes de poner en producción, verificar que:

- [ ] `sql/schema.sql` fue ejecutado en Supabase y las tablas existen
- [ ] Todas las variables de entorno están configuradas en Vercel
- [ ] `NEXT_PUBLIC_APP_URL` apunta a la URL de producción (sin slash final)
- [ ] `MP_ACCESS_TOKEN` es el token de **producción** (no empieza con `TEST-`)
- [ ] El webhook de Suno funciona: hacer un test en producción y revisar logs
- [ ] El webhook de MP funciona: hacer un pago de prueba y verificar que `mp_status` se actualiza a `approved`
- [ ] El botón de descarga entrega el MP3 con nombre correcto
- [ ] El botón de compartir por WhatsApp abre WhatsApp Web con el texto correcto
- [ ] En mobile (iOS Safari + Android Chrome) el audio se reproduce correctamente
