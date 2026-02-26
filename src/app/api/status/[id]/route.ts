// src/app/api/status/[id]/route.ts
// GET — El frontend hace polling cada 3 segundos para saber el estado
// Devuelve solo lo necesario para el UI (no URLs de audio limpias sin pagar)

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('generations')
      .select(`
        id,
        suno_status,
        brand_name,
        genre,
        duration_seconds,
        moods,
        song_a_stream_url,
        song_a_image_url,
        song_a_lyrics,
        song_b_stream_url,
        song_b_image_url,
        song_b_lyrics,
        selected_song,
        regen_count,
        error_message
      `)
      .eq('id', params.id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    }

    // IMPORTANTE: nunca devolver audioUrl (MP3 limpio) sin pago confirmado
    // solo devolvemos streamAudioUrl para el player con watermark
    return NextResponse.json(data)

  } catch (err) {
    console.error('[/api/status] Error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
