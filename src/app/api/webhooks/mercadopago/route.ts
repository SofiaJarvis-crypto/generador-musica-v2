export const dynamic = 'force-dynamic'

// src/app/api/webhooks/mercadopago/route.ts
// POST — Mercado Pago nos notifica cuando un pago cambia de estado
// Este endpoint es el más crítico: habilita la descarga cuando el pago está aprobado

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

let mp: any = null

export async function POST(req: NextRequest) {
  try {
    // Lazy-load mercadopago to avoid build hang
    if (!mp) {
      const { default: MercadoPagoConfig } = await import('mercadopago')
      mp = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN!,
      })
    }

    const body = await req.json()
    console.log('[MP Webhook] Received:', JSON.stringify(body, null, 2))

    // MP envía distintos tipos de notificaciones
    // Solo nos interesan las de tipo "payment"
    if (body.type !== 'payment' || !body.data?.id) {
      return NextResponse.json({ ok: true })
    }

    const mpPaymentId = String(body.data.id)

    // ── Consultar el pago directamente a MP para verificar ─
    const mpPayment = await mp.payment.get({ id: mpPaymentId })

    if (!mpPayment || !mpPayment.status) {
      return NextResponse.json({ error: 'Pago no encontrado en MP' }, { status: 404 })
    }

    const { status, metadata, payer } = mpPayment

    // metadata que pusimos al crear la preferencia
    const paymentId    = metadata?.payment_id
    const generationId = metadata?.generation_id
    const selectedSong = metadata?.selected_song

    if (!paymentId || !generationId) {
      console.error('[MP Webhook] Missing metadata in payment:', mpPaymentId)
      return NextResponse.json({ ok: true })
    }

    // ── Actualizar tabla payments ──────────────────────────
    await supabaseAdmin
      .from('payments')
      .update({
        mp_payment_id: mpPaymentId,
        mp_status:     status,                          // approved | rejected | etc.
        payer_email:   payer?.email || null,
      })
      .eq('id', paymentId)

    // ── Si el pago fue aprobado, actualizar la generación ──
    if (status === 'approved') {
      await supabaseAdmin
        .from('generations')
        .update({ selected_song: selectedSong || null })
        .eq('id', generationId)

      // El download_token ya fue creado cuando se hizo la preferencia.
      // La ruta /descarga?token=XXX ya puede funcionar.
      console.log(`[MP Webhook] Pago aprobado para generation ${generationId}`)
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[MP Webhook] Error:', err)
    // Devolver 200 para que MP no reintente indefinidamente
    return NextResponse.json({ ok: true })
  }
}
