// GET /api/referrals/stats?code=XXXXX
// Get referral statistics

import { NextResponse } from 'next/server'
import { getReferralStats } from '@/lib/referrals'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json(
        { error: 'Missing referral code' },
        { status: 400 }
      )
    }

    const stats = await getReferralStats(code)

    if (!stats) {
      return NextResponse.json(
        { error: 'Referral code not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error('Error fetching referral stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
