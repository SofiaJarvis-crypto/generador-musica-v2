import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const agent = req.nextUrl.searchParams.get('agent')
  if (!agent) {
    return NextResponse.json({ error: 'agent param required' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const functionsUrl = `${supabaseUrl}/functions/v1/${agent}`

  try {
    const res = await fetch(functionsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()
    return NextResponse.json({ success: res.ok, agent, result })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({ success: false, agent, error: err.message }, { status: 500 })
  }
}
