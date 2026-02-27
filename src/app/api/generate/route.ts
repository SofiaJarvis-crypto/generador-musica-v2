export const dynamic = 'force-dynamic'

// src/app/api/generate/route.ts
// POST — El usuario envía el formulario
// 1. Crea registro en Supabase
// 2. Llama a Suno API
// 3. Guarda taskId y devuelve el generationId al frontend

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { buildSunoPrompt } from '@/lib/suno-prompt'
import { headers } from 'next/headers'

const SUNO_API_BASE = process.env.SUNO_API_BASE_URL!
const SUNO_API_KEY  = process.env.SUNO_API_KEY!
const APP_URL       = process.env.NEXT_PUBLIC_APP_URL!
const MAX_REGENS    = parseInt(process.env.MAX_REGENS || '3')

export async function POST(req: NextRequest) {
  try {
    console.log('[/api/generate] Request received')
    
    const body: {
      brandName: string
      brandDescription?: string
      brandLocation?: string
      genre: string
      moods: string[]
      durationSeconds: 15 | 30
      sessionToken?: string
      generationId?: string
    } = await req.json()
    
    console.log('[/api/generate] Body parsed:', { brandName: body.brandName, genre: body.genre })

    // ── Validación básica ──────────────────────────────────
    if (!body.brandName?.trim()) {
      return NextResponse.json({ error: 'El nombre de la marca es requerido' }, { status: 400 })
    }
    if (!body.genre) {
      return NextResponse.json({ error: 'Seleccioná un género musical' }, { status: 400 })
    }
    if (![15, 30].includes(body.durationSeconds)) {
      return NextResponse.json({ error: 'Duración inválida' }, { status: 400 })
    }

    // ── IP para rate limiting ──────────────────────────────
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim()
              || headersList.get('x-real-ip')
              || 'unknown'

    // ── ¿Es una regeneración? ──────────────────────────────
    const isRegen = !!body.generationId
    if (isRegen) {
      // Verificar que no excedió el límite de regeneraciones
      const { data: existing } = await supabaseAdmin
        .from('generations')
        .select('regen_count, session_token')
        .eq('id', body.generationId)
        .single()

      if (!existing) {
        return NextResponse.json({ error: 'Generación no encontrada' }, { status: 404 })
      }
      if (existing.regen_count >= MAX_REGENS) {
        return NextResponse.json(
          { error: `Llegaste al límite de ${MAX_REGENS} regeneraciones gratuitas` },
          { status: 429 }
        )
      }
    }

    // ── Construir el prompt para Suno ──────────────────────
    const prompt = buildSunoPrompt(body)

    // ── Crear registro en Supabase ─────────────────────────
    const sessionToken = body.sessionToken || crypto.randomUUID()
    console.log('[/api/generate] Creating DB record...')

    const generationData = {
      brand_name:        body.brandName.trim(),
      brand_description: body.brandDescription?.trim() || null,
      brand_location:    body.brandLocation?.trim() || null,
      genre:             body.genre,
      moods:             body.moods || [],
      duration_seconds:  body.durationSeconds,
      suno_status:       'generating',
      ip_address:        ip,
      session_token:     sessionToken,
    }

    let generationId: string

    if (isRegen) {
      // Actualizar registro existente para la regeneración
      const { data, error } = await supabaseAdmin
        .from('generations')
        .update({
          ...generationData,
          suno_task_id:      null,
          suno_status:       'generating',
          song_a_id:         null,
          song_a_stream_url: null,
          song_a_audio_url:  null,
          song_a_lyrics:     null,
          song_b_id:         null,
          song_b_stream_url: null,
          song_b_audio_url:  null,
          song_b_lyrics:     null,
          selected_song:     null,
          error_message:     null,
        })
        .eq('id', body.generationId)
        .select('id, regen_count')
        .single()

      if (error) throw error

      // Incrementar regen_count manualmente
      await supabaseAdmin
        .from('generations')
        .update({ regen_count: (data.regen_count || 0) + 1 })
        .eq('id', body.generationId)

      generationId = body.generationId!
    } else {
      // Crear nuevo registro
      const { data, error } = await supabaseAdmin
        .from('generations')
        .insert({ ...generationData, regen_count: 0 })
        .select('id')
        .single()

      if (error) throw error
      generationId = data.id
    }

    console.log('[/api/generate] DB record created, generationId:', generationId)

    // ── Llamar a Suno API ──────────────────────────────────
    console.log('[/api/generate] Calling Suno API...')
    const sunoResponse = await fetch(`${SUNO_API_BASE}/api/v1/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customMode:  false,
        instrumental: false,
        model:       'V4_5',
        prompt,
        callBackUrl: `${APP_URL}/api/webhooks/suno?generationId=${generationId}`,
      }),
    })

    const sunoData = await sunoResponse.json()

    if (sunoData.code !== 200 || !sunoData.data?.taskId) {
      // Marcar como error en la DB
      await supabaseAdmin
        .from('generations')
        .update({ suno_status: 'error', error_message: sunoData.msg || 'Error de Suno API' })
        .eq('id', generationId)

      return NextResponse.json(
        { error: `Error al generar música: ${sunoData.msg}` },
        { status: 502 }
      )
    }

    // ── Guardar taskId de Suno ─────────────────────────────
    await supabaseAdmin
      .from('generations')
      .update({ suno_task_id: sunoData.data.taskId })
      .eq('id', generationId)

    return NextResponse.json({
      generationId,
      sessionToken,
      taskId: sunoData.data.taskId,
    })

  } catch (err) {
    const errMessage = err instanceof Error ? err.message : String(err)
    console.error('[/api/generate] ERROR:', errMessage)
    console.error('[/api/generate] Full error:', err)
    return NextResponse.json({ error: `Error interno: ${errMessage}` }, { status: 500 })
  }
}
