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
      return NextResponse.json({ error: 'Missing params' }, { status: 400 })
    }

    const sunoRes = await fetch(`${SUNO_API_BASE}/api/v1/generate/record-info?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const sunoData = await sunoRes.json()
    if (sunoData.code !== 200 || !sunoData.data) {
      return NextResponse.json({ status: 'pending', error: sunoData.msg })
    }

    const { status, response } = sunoData.data
    const sunoDataArray = response?.sunoData || []

    if (status === 'SUCCESS' && sunoDataArray.length >= 2) {
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

      await supabase.from('generations').update(updateData).eq('id', generationId)

      return NextResponse.json({
        status: 'complete',
        song_a_stream_url: songA.streamAudioUrl,
        song_b_stream_url: songB.streamAudioUrl,
      })
    }

    if (status === 'GENERATE_AUDIO_FAILED' || status === 'CREATE_TASK_FAILED') {
      const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!)
      await supabase.from('generations').update({ suno_status: 'error', error_message: `Error: ${status}` }).eq('id', generationId)
      return NextResponse.json({ status: 'error', error: status })
    }

    return NextResponse.json({ status: status || 'pending' })
  } catch (err) {
    console.error('Poll error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
