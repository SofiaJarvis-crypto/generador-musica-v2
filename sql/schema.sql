-- ============================================================
-- GENERADOR DE MÚSICA PARA MARCAS — Schema Supabase/PostgreSQL
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ────────────────────────────────────────
-- TABLA: generations
-- Una fila por request al formulario
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.generations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Datos del formulario
  brand_name        TEXT NOT NULL,
  brand_description TEXT,
  brand_location    TEXT,
  genre             TEXT NOT NULL,
  moods             TEXT[] NOT NULL DEFAULT '{}',
  duration_seconds  INT NOT NULL CHECK (duration_seconds IN (15, 30)),

  -- Suno task
  suno_task_id      TEXT,
  suno_status       TEXT NOT NULL DEFAULT 'pending',
  -- pending | generating | stream_ready | complete | error

  -- Las 2 canciones que devuelve Suno
  song_a_id         TEXT,
  song_a_stream_url TEXT,   -- disponible en 30-40s (para preview con watermark)
  song_a_audio_url  TEXT,   -- disponible en 2-3min (MP3 limpio post-pago)
  song_a_image_url  TEXT,
  song_a_lyrics     TEXT,

  song_b_id         TEXT,
  song_b_stream_url TEXT,
  song_b_audio_url  TEXT,
  song_b_image_url  TEXT,
  song_b_lyrics     TEXT,

  -- Canción elegida por el usuario (a o b)
  selected_song     TEXT CHECK (selected_song IN ('a', 'b')),

  -- Control de regeneraciones gratuitas
  regen_count       INT NOT NULL DEFAULT 0,
  ip_address        TEXT,
  session_token     TEXT,

  -- Error info
  error_message     TEXT
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_generations_suno_task_id ON public.generations(suno_task_id);
CREATE INDEX IF NOT EXISTS idx_generations_session_token ON public.generations(session_token);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON public.generations(created_at DESC);

-- ────────────────────────────────────────
-- TABLA: payments
-- Una fila por pago completado
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payments (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  generation_id    UUID NOT NULL REFERENCES public.generations(id) ON DELETE RESTRICT,
  selected_song    TEXT NOT NULL CHECK (selected_song IN ('a', 'b')),

  -- Mercado Pago
  mp_preference_id TEXT,                    -- ID de preferencia creada
  mp_payment_id    TEXT UNIQUE,             -- ID de pago confirmado
  mp_status        TEXT NOT NULL DEFAULT 'pending',
  -- pending | approved | rejected | cancelled

  amount_ars       NUMERIC(10, 2) NOT NULL,
  payer_email      TEXT,                    -- email que devuelve MP

  -- Token seguro para habilitar la descarga
  download_token   TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  token_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '48 hours'),

  -- Tracking de descarga
  downloaded_at    TIMESTAMPTZ,
  download_count   INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_payments_generation_id ON public.payments(generation_id);
CREATE INDEX IF NOT EXISTS idx_payments_mp_payment_id ON public.payments(mp_payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_download_token ON public.payments(download_token);

-- ────────────────────────────────────────
-- RLS (Row Level Security)
-- El backend usa service_role_key → acceso total
-- El frontend usa anon_key → solo lectura de su propia data
-- ────────────────────────────────────────
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Política: el service role (backend) puede hacer todo
CREATE POLICY "service_role_full_access_generations"
  ON public.generations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_role_full_access_payments"
  ON public.payments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Política: anon puede leer generations por session_token (para el frontend)
CREATE POLICY "anon_read_own_generation"
  ON public.generations
  FOR SELECT
  TO anon
  USING (true);  -- el filtro real lo hacemos en el backend por session_token

-- ────────────────────────────────────────
-- FUNCIÓN: limpiar registros viejos (opcional, ejecutar como cron)
-- Suno borra los archivos a los 15 días de todos modos
-- ────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.cleanup_old_generations()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.generations
  WHERE created_at < NOW() - INTERVAL '15 days'
    AND id NOT IN (SELECT generation_id FROM public.payments WHERE mp_status = 'approved');
END;
$$;
