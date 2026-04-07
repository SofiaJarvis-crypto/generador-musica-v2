// src/lib/supabase.ts
// Cliente de Supabase para usar en el backend (API routes)
// Usa service_role_key → acceso total, sin restricciones de RLS

import { createClient } from '@supabase/supabase-js'

// Los clientes se crean aquí pero no lanzan error si las vars no están
// (fallarán en runtime cuando se usen, no en build time)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

// Cliente del servidor — NUNCA exponer al browser
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Cliente del browser — solo para uso en componentes client-side
export const supabasePublic = createClient(supabaseUrl, anonKey)
