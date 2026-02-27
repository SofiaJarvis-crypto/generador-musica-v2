export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('generations')
      .select('id')
      .limit(1)

    if (error) {
      return NextResponse.json({
        status: 'error',
        error: error.message,
        hint: error.hint,
        code: error.code,
      }, { status: 400 })
    }

    return NextResponse.json({
      status: 'ok',
      rows: data?.length || 0,
      message: 'Supabase client working correctly',
    })
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 })
  }
}
