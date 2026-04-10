// POST /api/referrals/track
// Track when a referral link is clicked

import { NextResponse } from 'next/server'
import { trackReferralClick, validateReferralCode } from '@/lib/referrals'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Missing referral code' },
        { status: 400 }
      )
    }

    // Validate code exists
    const isValid = await validateReferralCode(code)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      )
    }

    // Get IP and user agent
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'

    await trackReferralClick(code, ip, userAgent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking referral click:', error)
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    )
  }
}
