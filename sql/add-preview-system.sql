-- ============================================================
-- MIGRATION: Paywall System (Preview en cliente)
-- Fecha: 2026-03-19
-- Objetivo: Agregar sistema de unlock para audio completo
-- ============================================================

-- Nueva columna para tracking de unlock (pago)
ALTER TABLE public.generations 
ADD COLUMN IF NOT EXISTS is_unlocked BOOLEAN DEFAULT FALSE;

-- Índice para búsquedas de generaciones desbloqueadas
CREATE INDEX IF NOT EXISTS idx_generations_unlocked ON public.generations(is_unlocked);

-- Comentario para documentación
COMMENT ON COLUMN public.generations.is_unlocked IS 'TRUE si el usuario pagó y desbloqueó el audio completo';
