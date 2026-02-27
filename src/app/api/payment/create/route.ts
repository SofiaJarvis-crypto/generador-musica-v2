// src/app/api/payment/create/route.ts
// POST — El usuario hace click en "Pagar con Mercado Pago"
// Crea una preferencia de pago y devuelve la URL de checkout

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

let mp: any = null

const APP_URL   = process.env.NEXT_PUBLIC_APP_URL!
const PRECIO    = parseFloat(process.env.PRECIO_ARS || '8900')

export async function POST(req: NextRequest) {
  try {
    // Lazy-load mercadopago to avoid build hang
    if (!mp) {
      const { default: MercadoPagoConfig } = await import('mercadopago')
      mp = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN!,
      })
    }

    const { generationId, selectedSong } = await req.json()

    if (!generationId || !['a', 'b'].includes(selectedSong)) {
      return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
    }

    // ── Verificar que la generación existe y está completa ──
    const { data: generation, error: genError } = await supabaseAdmin
      .from('generations')
      .select('id, brand_name, suno_status, song_a_audio_url, song_b_audio_url')
      .eq('id', generationId)
      .single()

    if (genError || !generation) {
      return NextResponse.json({ error: 'Generación no encontrada' }, { status: 404 })
    }

    // Permitir pago si el audio stream está listo (aunque el MP3 final aún no)
    if (!['stream_ready', 'complete'].includes(generation.suno_status)) {
      return NextResponse.json({ error: 'La canción todavía no está lista' }, { status: 409 })
    }

    // ── Crear registro de pago en Supabase (pending) ───────
    const { data: payment, error: payError } = await supabaseAdmin
      .from('payments')
      .insert({
        generation_id: generationId,
        selected_song: selectedSong,
        amount_ars:    PRECIO,
        mp_status:     'pending',
      })
      .select('id, download_token')
      .single()

    if (payError || !payment) throw payError

    // ── Crear preferencia en Mercado Pago ──────────────────
    const prefData = {
      items: [
        {
          id:           generationId,
          title:        `Jingle MP3 — ${generation.brand_name}`,
          description:  `Canción personalizada para tu marca (opción ${selectedSong.toUpperCase()})`,
          quantity:     1,
          currency_id:  'ARS',
          unit_price:   PRECIO,
        },
      ],
      back_urls: {
        success: `${APP_URL}/descarga?token=${payment.download_token}`,
        failure: `${APP_URL}/pago-fallido?generationId=${generationId}`,
        pending: `${APP_URL}/pago-pendiente?generationId=${generationId}`,
      },
      auto_return:      'approved',
      notification_url: `${APP_URL}/api/webhooks/mercadopago`,
      metadata: {
        payment_id:    payment.id,
        generation_id: generationId,
        selected_song: selectedSong,
      },
      payment_methods: {
        installments: 1,
      },
    }

    const prefResponse = await mp.preference.create({ body: prefData })

    if (!prefResponse.id) {
      throw new Error('Mercado Pago no devolvió ID de preferencia')
    }

    // ── Guardar preference ID ──────────────────────────────
    await supabaseAdmin
      .from('payments')
      .update({ mp_preference_id: prefResponse.id })
      .eq('id', payment.id)

    return NextResponse.json({
      preferenceId:  prefResponse.id,
      checkoutUrl:   prefResponse.init_point,          // URL de checkout completo
      sandboxUrl:    prefResponse.sandbox_init_point,  // URL de sandbox para testing
    })

  } catch (err) {
    console.error('[/api/payment/create] Error:', err)
    return NextResponse.json({ error: 'Error al crear el pago' }, { status: 500 })
  }
}
