import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest, { params }: { params: { taskId: string } }) {
  try {
    const taskId = params.taskId
    const SUNO_API_BASE = process.env.SUNO_API_BASE_URL || 'https://api.sunoapi.org'
    const SUNO_API_KEY = process.env.SUNO_API_KEY
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPA@¡SE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

    const res = await fetch(`${SUNO_API_BASE}/api/v1/generate/record-info?taskId=${taskId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${SUNO_API_KEY}`, 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
