# generador-musica-v2

Generador de jingles con IA para marcas argentinas. Next.js 14 App Router + Supabase + Mercado Pago + Suno API.

## Stack
- **Framework:** Next.js 14 (App Router, Server Components)
- **DB:** Supabase (PostgreSQL)
- **Pagos:** Mercado Pago (checkout pro)
- **Generación:** Suno API (música) + Claude API (letras)
- **Deploy:** Vercel
- **Analytics:** Google Analytics + Meta Pixel
- **Styling:** Tailwind CSS + CSS modules en `src/styles/`

## Estructura clave

```
src/
  app/
    page.tsx                        # Home (Server Component)
    layout.tsx                      # Root layout
    (landing)/                      # SEO landings por género/uso
    api/
      generate/route.ts             # Crea orden en Supabase, inicia generación gratuita
      generate-lyrics/route.ts      # Genera letra con Claude
      payment/create/route.ts       # Crea preferencia de pago en MP
      webhooks/mercadopago/route.ts # Recibe pago aprobado → desbloquea descarga
      webhooks/suno/route.ts        # Recibe audio terminado de Suno
      status/[id]/route.ts          # Polling de estado de generación
      download/route.ts             # Genera URL firmada de descarga
    generando/[id]/page.tsx         # Página de espera (polling)
    escuchar/[id]/page.tsx          # Player de preview (watermark)
    descarga/page.tsx               # Página post-pago
  components/
    HomeForm.tsx                    # Formulario principal (Client Component)
    WaveformPlayer.tsx              # Player de audio
    ExitIntentPopup.tsx             # Popup de salida
    SeoSections.tsx                 # Secciones SEO reutilizables
  lib/
    supabase.ts                     # Cliente Supabase
    suno-prompt.ts                  # Construcción de prompts para Suno
    ab-testing.ts                   # Lógica A/B testing
    analytics.ts                    # Eventos GA + Meta Pixel
  middleware.ts                     # A/B testing por cookie
```

## Flujo de pago
1. Usuario llena formulario → `POST /api/generate` → crea registro en Supabase con `status: 'pending'`
2. Suno genera audio → webhook `/api/webhooks/suno` → actualiza `status: 'ready'`
3. Usuario escucha preview en `/escuchar/[id]` (con watermark)
4. Usuario paga → MP redirige → webhook `/api/webhooks/mercadopago` → actualiza `paid: true`
5. Usuario descarga en `/descarga`

## Supabase
- Tabla principal: `generations` (id, status, paid, audio_url, lyrics, prompt, email, created_at)
- Variables de entorno en `.env.local` (nunca commitear)

## Variables de entorno requeridas
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`SUNO_API_KEY`, `MP_ACCESS_TOKEN`, `NEXT_PUBLIC_MP_PUBLIC_KEY`,
`ANTHROPIC_API_KEY`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`
