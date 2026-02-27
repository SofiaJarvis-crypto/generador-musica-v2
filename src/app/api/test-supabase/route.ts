export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test 1: Check env vars
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    const result: Record<string, any> = {
      'URL_present': !!url,
      'KEY_present': !!key,
      'KEY_length': key?.length || 0,
      'KEY_starts_with': key?.substring(0, 30) + '...',
    }

    if (!url || !key) {
      return NextResponse.json({
        error: 'Missing env vars',
        ...result,
      }, { status: 500 })
    }

    // Test 2: Try direct REST call (bypass supabase-js library)
    const restResponse = await fetch(
      `${url}/rest/v1/generations?select=id.count()`,
      {
        method: 'GET',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const restText = await restResponse.text()
    result['REST_status'] = restResponse.status
    result['REST_headers'] = Object.fromEntries(restResponse.headers.entries())
    result['REST_body'] = restText.substring(0, 200)

    // Test 3: Try with supabase-js library
    const { createClient } = await import('@supabase/supabase-js')
    
    const client = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data, error } = await client.from('generations').select('id').limit(1)
    
    result['SUPABASE_JS_error'] = error ? error.message : null
    result['SUPABASE_JS_data'] = data ? `Success: ${data.length} rows` : null

    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 })
  }
}
