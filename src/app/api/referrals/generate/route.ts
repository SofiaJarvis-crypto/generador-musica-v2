// POST /api/referrals/generate
// Create a referral code for a generation

import { NextResponse } from 'next/server'
import { createReferralCode } from '@/lib/referrals'

export async function POST(request: Request) {
  try {
    const { generationId, email } = await request.json()

    if (!generationId) {
      return NextResponse.json(
        { error: 'Missing generationId' },
        { status: 400 }
      )
    }

    const code = await createReferralCode(generationId, email)

    return NextResponse.json({
      success: true,
      code,
      shareUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://jinglegenerator.com'}?ref=${code}`,
    })
  } catch (error) {
    console.error('Error generating referral code:', error)
    return NextResponse.json(
      { error: 'Failed to generate referral code' },
      { status: 500 }
    )
  }
}
