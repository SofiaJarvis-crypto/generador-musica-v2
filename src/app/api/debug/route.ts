export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

export async function GET() {
  const vars = {
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    'SUPABASE_SERVICE_ROLE_KEY_LENGTH': process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
    'SUPABASE_SERVICE_ROLE_KEY_START': process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + '...' || 'NOT SET',
    'SUNO_API_KEY': process.env.SUNO_API_KEY ? '✓' : '✗',
    'NEXT_PUBLIC_APP_URL': process.env.NEXT_PUBLIC_APP_URL || 'NOT SET',
  }

  // Test de conexión a Supabase
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/generations?select=count`,
      {
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    vars['Supabase_REST_TEST'] = response.status === 200 ? '✓ OK' : `✗ ${response.status}`
    vars['Supabase_Response'] = JSON.stringify(data).substring(0, 100)
  } catch (err) {
    vars['Supabase_REST_TEST'] = `✗ ${err instanceof Error ? err.message : 'Unknown error'}`
  }

  return NextResponse.json(vars)
}
