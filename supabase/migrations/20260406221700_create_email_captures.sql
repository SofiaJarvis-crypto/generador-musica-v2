-- 20260406221700_create_email_captures.sql
-- Crear tabla email_captures para registrar prospectos antes de la compra

CREATE TABLE IF NOT EXISTS public.email_captures (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email         TEXT NOT NULL,
  generation_id UUID NOT NULL REFERENCES public.generations(id) ON DELETE CASCADE,
  source        TEXT NOT NULL DEFAULT 'unknown',
  
  -- Restringir duplicados por si el usuario inserta varias veces el mismo email
  UNIQUE(email, generation_id)
);

CREATE INDEX IF NOT EXISTS idx_email_captures_generation_id ON public.email_captures(generation_id);

ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_full_access_email_captures"
  ON public.email_captures
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
