export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

export async function GET() {
  const vars: Record<string, any> = {
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓' : '✗',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓' : '✗',
    'SUPABASE_SERVICE_ROLE_KEY': process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓' : '✗',
    'SUNO_API_KEY': process.env.SUNO_API_KEY ? '✓' : '✗',
    'SUNO_API_BASE_URL': process.env.SUNO_API_BASE_URL ? '✓' : '✗',
    'MP_ACCESS_TOKEN': process.env.MP_ACCESS_TOKEN ? '✓' : '✗',
    'NEXT_PUBLIC_APP_URL': process.env.NEXT_PUBLIC_APP_URL || 'NOT SET',
  }

  return NextResponse.json(vars)
}
