-- 20260406222000_create_agent_decisions.sql
-- Registrar las acciones, análisis y recomendaciones que hacen los agentes de IA (ej. reportes diarios, automatización)

CREATE TABLE IF NOT EXISTS public.agent_decisions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  agent_name    TEXT NOT NULL,
  action_type   TEXT NOT NULL,
  details       JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_agent_decisions_agent_name ON public.agent_decisions(agent_name);
CREATE INDEX IF NOT EXISTS idx_agent_decisions_created_at ON public.agent_decisions(created_at DESC);

ALTER TABLE public.agent_decisions ENABLE ROW LEVEL SECURITY;

-- Solo el backend (service_role) o Edge Functions tienen permiso para escribir o leer aquí
CREATE POLICY "service_role_full_access_agent_decisions"
  ON public.agent_decisions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
