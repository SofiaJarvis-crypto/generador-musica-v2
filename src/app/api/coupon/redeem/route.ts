export const dynamic = 'force-dynamic'

// POST — Canjea un cupón "free" y devuelve el download_token sin pasar por MP
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { code, generationId, selectedSong } = await req.json()

    if (!code || !generationId || !['a', 'b'].includes(selectedSong)) {
      return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
    }

    // Validar cupón
    const { data: coupon, error: couponError } = await supabaseAdmin
      .from('coupons')
      .select('id, discount_type, max_uses, uses_count, is_active')
      .eq('code', code.toUpperCase().trim())
      .single()

    if (couponError || !coupon || !coupon.is_active) {
      return NextResponse.json({ error: 'Cupón inválido' }, { status: 404 })
    }

    if (coupon.max_uses !== null && coupon.uses_count >= coupon.max_uses) {
      return NextResponse.json({ error: 'Ese cupón ya agotó sus usos' }, { status: 410 })
    }

    if (coupon.discount_type !== 'free') {
      return NextResponse.json({ error: 'Este endpoint es solo para cupones gratuitos' }, { status: 400 })
    }

    // Verificar que la generación existe
    const { data: generation } = await supabaseAdmin
      .from('generations')
      .select('id, suno_status')
      .eq('id', generationId)
      .single()

    if (!generation || !['stream_ready', 'complete'].includes(generation.suno_status)) {
      return NextResponse.json({ error: 'Generación no encontrada o no lista' }, { status: 404 })
    }

    // Crear payment con amount=0 y status=approved
    const { data: payment, error: payError } = await supabaseAdmin
      .from('payments')
      .insert({
        generation_id: generationId,
        selected_song: selectedSong,
        amount_ars: 0,
        discount_amount_ars: 0,
        mp_status: 'approved',
        coupon_code: code.toUpperCase().trim(),
      })
      .select('id, download_token')
      .single()

    if (payError || !payment) {
      throw payError
    }

    // Marcar generación como unlocked
    await supabaseAdmin
      .from('generations')
      .update({ is_unlocked: true })
      .eq('id', generationId)

    // Incrementar uses_count del cupón
    await supabaseAdmin
      .from('coupons')
      .update({ uses_count: coupon.uses_count + 1 })
      .eq('id', coupon.id)

    console.log(`[Coupon Redeem] FREE coupon ${code} → generation ${generationId}`)

    return NextResponse.json({ downloadToken: payment.download_token })

  } catch (err) {
    console.error('[Coupon Redeem] Error:', err)
    return NextResponse.json({ error: 'Error al canjear el cupón' }, { status: 500 })
  }
}
