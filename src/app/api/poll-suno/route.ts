// src/app/api/poll-suno/route.ts
// POST - Consulta a sunoapi.org por el status y actualiza Supabase si está completo

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUNO_API_BASE = process.env.SUNO_API_BASE_URL || 'https://api.sunoapi.org'
const SUNO_API_KEY = process.env.SUNO_API_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(req: NextRequest) {
  try {
    const { taskId, generationId } = await req.json()

    if (!taskId || !generationId || !SUNO_API_KEY) {
      return NextResponse.json({ error: 'Missing taskId/generationId' }, { status: 400 })
    }

    console.log(`[POLL_SUNO] Checking taskId=${taskId} generationId=${generationId}`)

    // Consultar sunoapi.org
    const sunoRes = await fetch(`${SUNO_API_BASE}/api/v1/generate/record-info?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const sunoData = await sunoRes.json()

    if (sunoData.code !== 200 || !sunoData.data) {
      console.log(`[POLL_SUNO] SUnO API error: ${sunoData.msg}`)
      return NextResponse.json({ status: 'pending', error: sunoData.msg })
    }

    const { status, response } = sunoData.data
    const sunoDataArray = response?.sunoData || []

    console.log(`[POLL_SUNO] Status=${status}, Songs=${sunoDataArray.length}`)

    // Si está completo y tiene canciones
    if (status === 'SUCCESS' && sunoDataArray.length >= 2) {
      console.log(`[POLL_SUNO] ✅ Complete! Updating DB...`)

      const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!)

      const songA = sunoDataArray[0]
      const songB = sunoDataArray[1]

      const updateData = {
        suno_status: 'complete',
        song_a_id: songA.id,
        song_a_stream_url: songA.streamAudioUrl,
        song_a_audio_url: songA.audioUrl,
        song_a_image_url: songA.imageUrl || null,
        song_a_lyrics: songA.prompt || null,
        song_b_id: songB.id,
        song_b_stream_url: songB.streamAudioUrl,
        song_b_audio_url: songB.audioUrl,
        song_b_image_url: songB.imageUrl || null,
        song_b_lyrics: songB.prompt || null,
      }

      const { error: updateErr } = await supabase
        .from('generations')
        .update(updateData)
        .eq('id', generationId)

      if (updateErr) {
        console.error(`[POLL_SUNO] DB update error: ${updateErr.message}`)
      } else {
        console.log(`[POLL_SUNO] � DB updated`)
      }

      return NextResponse.json({
        status: 'complete',
        song_a_stream_url: songA.streamAudioUrl,
        song_b_stream_url: songB.streamAudioUrl,
      })
    }

    // Si hay error
    if (status === 'GENERATE_AUDIO_FAILED' || status === 'CREATE_TASK_FAILED') {
      console.log(`[POLL_SUNO] ❌ Task failed`)

      const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!)
      await supabase
        .from('generations')
        .update({ suno_status: 'error', error_message: `SUNO error: ${status}` })
        .eq('id', generationId)

      return NextResponse.json({ status: 'error', error: status })
    }

    // Sigue generando
    return NextResponse.json({ status: status || 'pending' })
  } catch (err) {
    console.error(`[POLL_SUNO] Exception: ${err}`)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
