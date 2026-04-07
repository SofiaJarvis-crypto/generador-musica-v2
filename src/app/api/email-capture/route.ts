export const dynamic = 'force-dynamic'

// src/app/api/email-capture/route.ts
// POST — Guarda el email de un usuario que generó pero no pagó

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, generationId, source: rawSource } = await req.json()
    const source = rawSource || 'escuchar_page'

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    if (!generationId) {
      return NextResponse.json({ error: 'generationId requerido' }, { status: 400 })
    }

    // Verificar que la generación existe y no está pagada
    const { data: generation } = await supabaseAdmin
      .from('generations')
      .select('id, brand_name, is_unlocked')
      .eq('id', generationId)
      .single()

    if (!generation) {
      return NextResponse.json({ error: 'Generación no encontrada' }, { status: 404 })
    }

    // Guardar email (upsert para evitar duplicados)
    const { error } = await supabaseAdmin
      .from('email_captures')
      .upsert({
        email: email.toLowerCase().trim(),
        generation_id: generationId,
        source,
      }, {
        onConflict: 'email,generation_id',
        ignoreDuplicates: true,
      })

    if (error) throw error

    console.log(`[Email Capture] ${email} → generation ${generationId}`)
    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[Email Capture] Error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
