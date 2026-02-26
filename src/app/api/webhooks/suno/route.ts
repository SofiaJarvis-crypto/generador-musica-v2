// src/app/api/webhooks/suno/route.ts
// POST — Suno nos llama aquí cuando la música está lista
// Tiene 3 etapas: text → first → complete
// Nosotros actualizamos Supabase en cada etapa

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const generationId = req.nextUrl.searchParams.get('generationId')
    if (!generationId) {
      return NextResponse.json({ error: 'generationId requerido' }, { status: 400 })
    }

    const body = await req.json()
    console.log('[Suno Webhook] Received:', JSON.stringify(body, null, 2))

    // La estructura del callback de Suno según su documentación:
    // { taskId, status, response: { sunoData: [ { id, audioUrl, streamAudioUrl, imageUrl, prompt, title, tags, duration }, ... ] } }
    const { status, response } = body
    const sunoData = response?.sunoData || []

    // ── Etapa: text (letra generada, audio aún no disponible) ──
    if (status === 'TEXT_SUCCESS') {
      // Nada que actualizar todavía, solo loguear
      return NextResponse.json({ ok: true })
    }

    // ── Etapa: first (primer track listo → streamAudioUrl disponible) ──
    if (status === 'FIRST_SUCCESS' && sunoData.length > 0) {
      const songA = sunoData[0]
      const songB = sunoData[1] || null

      await supabaseAdmin
        .from('generations')
        .update({
          suno_status:       'stream_ready',
          song_a_id:         songA.id,
          song_a_stream_url: songA.streamAudioUrl,
          song_a_image_url:  songA.imageUrl || null,
          song_a_lyrics:     songA.prompt || null,
          // Si ya llegó el segundo también lo guardamos
          ...(songB && {
            song_b_id:         songB.id,
            song_b_stream_url: songB.streamAudioUrl,
            song_b_image_url:  songB.imageUrl || null,
            song_b_lyrics:     songB.prompt || null,
          }),
        })
        .eq('id', generationId)

      return NextResponse.json({ ok: true })
    }

    // ── Etapa: complete (ambos tracks listos con audioUrl descargable) ──
    if (status === 'SUCCESS' && sunoData.length >= 2) {
      const songA = sunoData[0]
      const songB = sunoData[1]

      await supabaseAdmin
        .from('generations')
        .update({
          suno_status:       'complete',
          song_a_id:         songA.id,
          song_a_stream_url: songA.streamAudioUrl,
          song_a_audio_url:  songA.audioUrl,      // MP3 limpio — solo se entrega post-pago
          song_a_image_url:  songA.imageUrl || null,
          song_a_lyrics:     songA.prompt || null,
          song_b_id:         songB.id,
          song_b_stream_url: songB.streamAudioUrl,
          song_b_audio_url:  songB.audioUrl,
          song_b_image_url:  songB.imageUrl || null,
          song_b_lyrics:     songB.prompt || null,
        })
        .eq('id', generationId)

      return NextResponse.json({ ok: true })
    }

    // ── Error de Suno ──────────────────────────────────────
    if (['CREATE_TASK_FAILED', 'GENERATE_AUDIO_FAILED', 'SENSITIVE_WORD_ERROR'].includes(status)) {
      await supabaseAdmin
        .from('generations')
        .update({
          suno_status:   'error',
          error_message: `Suno error: ${status}`,
        })
        .eq('id', generationId)
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[Suno Webhook] Error:', err)
    // Devolver 200 igualmente para que Suno no reintente
    return NextResponse.json({ ok: true })
  }
}
