// src/app/api/download/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    const isCheck = req.nextUrl.searchParams.get('check') === '1'

    if (!token) {
      return NextResponse.json({ error: 'Token requerido' }, { status: 400 })
    }

    const { data: payment, error } = await supabaseAdmin
      .from('payments')
      .select(`
        id, mp_status, token_expires_at, download_count, selected_song,
        generations ( brand_name, song_a_audio_url, song_b_audio_url, suno_status )
      `)
      .eq('download_token', token)
      .single()

    if (error || !payment) {
      return NextResponse.json({ error: 'Token inválido o no encontrado' }, { status: 404 })
    }

    if (payment.mp_status !== 'approved') {
      return NextResponse.json({ error: 'El pago aún no fue aprobado. Esperá unos segundos.' }, { status: 403 })
    }

    if (new Date(payment.token_expires_at) < new Date()) {
      return NextResponse.json({ error: 'El link de descarga expiró. Contactanos por soporte.' }, { status: 410 })
    }

    const generation = payment.generations as any
    const audioUrl = payment.selected_song === 'a'
      ? generation?.song_a_audio_url
      : generation?.song_b_audio_url

    // Check mode — just validate, return metadata, don't stream
    if (isCheck) {
      if (!audioUrl) return NextResponse.json({ preparing: true }, { status: 202 })
      return NextResponse.json({ ready: true, brandName: generation?.brand_name || '' })
    }

    // Actual download
    if (!audioUrl) {
      return NextResponse.json({ preparing: true, message: 'Tu MP3 se está preparando, intentá en unos segundos.' }, { status: 202 })
    }

    await supabaseAdmin
      .from('payments')
      .update({ downloaded_at: new Date().toISOString(), download_count: (payment.download_count || 0) + 1 })
      .eq('id', payment.id)

    const brandSlug = (generation?.brand_name || 'marca')
      .toLowerCase().replace(/[^a-z0-9]/gi, '_').slice(0, 30)

    const audioRes = await fetch(audioUrl)
    if (!audioRes.ok) {
      return NextResponse.json({ error: 'No se pudo obtener el archivo de audio.' }, { status: 502 })
    }

    const audioBuffer = await audioRes.arrayBuffer()
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `attachment; filename="${brandSlug}_jingle.mp3"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('[/api/download] Error:', err)
    return NextResponse.json({ error: 'Error al procesar la descarga' }, { status: 500 })
  }
}
