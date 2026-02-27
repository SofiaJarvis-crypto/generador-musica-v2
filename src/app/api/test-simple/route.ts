export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

export async function POST() {
  try {
    return NextResponse.json({
      status: 'ok',
      message: 'API is responding correctly',
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
