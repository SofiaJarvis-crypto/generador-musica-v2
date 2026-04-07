export const dynamic = 'force-dynamic'

// POST — Valida un cupón y devuelve el tipo y el descuento
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Código requerido' }, { status: 400 })
    }

    const { data: coupon, error } = await supabaseAdmin
      .from('coupons')
      .select('id, code, discount_type, discount_value, max_uses, uses_count, is_active')
      .eq('code', code.toUpperCase().trim())
      .single()

    if (error || !coupon) {
      return NextResponse.json({ error: 'Cupón inválido' }, { status: 404 })
    }

    if (!coupon.is_active) {
      return NextResponse.json({ error: 'Ese cupón ya no está activo' }, { status: 410 })
    }

    if (coupon.max_uses !== null && coupon.uses_count >= coupon.max_uses) {
      return NextResponse.json({ error: 'Ese cupón ya agotó sus usos' }, { status: 410 })
    }

    return NextResponse.json({
      valid: true,
      discountType: coupon.discount_type,
      discountValue: coupon.discount_value,
    })

  } catch (err) {
    console.error('[Coupon Validate] Error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
