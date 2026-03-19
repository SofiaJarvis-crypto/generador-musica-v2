export const dynamic = 'force-dynamic'

// src/app/api/webhooks/mercadopago/route.ts
// POST — Mercado Pago nos notifica cuando un pago cambia de estado
// Este endpoint es el más crítico: habilita la descarga cuando el pago está aprobado

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

let mp: any = null
const resend = new Resend(process.env.RESEND_API_KEY!)

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
    const { data: payment } = await supabaseAdmin
      .from('payments')
      .update({
        mp_payment_id: mpPaymentId,
        mp_status:     status,
        payer_email:   payer?.email || null,
      })
      .eq('id', paymentId)
      .select('download_token, generation_id')
      .single()

    // ── Si el pago fue aprobado, actualizar la generación ──
    if (status === 'approved' && payment) {
      await supabaseAdmin
        .from('generations')
        .update({ 
          selected_song: selectedSong || null,
          is_unlocked: true // 🆕 Desbloquear audio completo
        })
        .eq('id', generationId)

      // ── Obtener brand_name para personalizar el email ──
      const { data: generation } = await supabaseAdmin
        .from('generations')
        .select('brand_name')
        .eq('id', generationId)
        .single()

      const brandName = generation?.brand_name || 'tu marca'
      const downloadToken = payment.download_token
      const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/descarga?token=${downloadToken}`

      // ── Enviar email con link de descarga ──
      if (payer?.email && downloadToken) {
        try {
          await resend.emails.send({
            from: 'Generador de Música <onboarding@resend.dev>',
            to: payer.email,
            subject: `🎵 Tu canción de ${brandName} está lista`,
            html: `
              <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <h1 style="color: #FF9500; font-size: 28px; margin-bottom: 16px;">🎉 ¡Pago confirmado!</h1>
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  Tu canción personalizada para <strong>${brandName}</strong> está lista para descargar.
                </p>
                <div style="margin: 32px 0;">
                  <a href="${downloadUrl}" 
                     style="display: inline-block; background: #FF9500; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    ⬇ Descargar mi canción
                  </a>
                </div>
                <p style="font-size: 14px; color: #666; line-height: 1.6;">
                  Este link es válido por 48 horas. Si tenés algún problema, respondé este email.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
                <p style="font-size: 12px; color: #999;">
                  Generador de Música para Marcas · HandOver
                </p>
              </div>
            `,
          })
          console.log(`[MP Webhook] Email enviado a ${payer.email}`)
        } catch (emailErr) {
          console.error('[MP Webhook] Error enviando email:', emailErr)
          // No fallar el webhook si el email falla
        }
      }

      console.log(`[MP Webhook] Pago aprobado para generation ${generationId}`)
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[MP Webhook] Error:', err)
    // Devolver 200 para que MP no reintente indefinidamente
    return NextResponse.json({ ok: true })
  }
}
