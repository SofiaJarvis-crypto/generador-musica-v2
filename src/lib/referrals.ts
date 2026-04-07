// Referral system utilities
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export interface ReferralStats {
  code: string
  generation_id: string
  email?: string
  created_at: string
  total_clicks: number
  total_conversions: number
  total_earned_ars: number
  conversion_rate: number
}

/**
 * Generate a unique referral code
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Avoid confusing chars (0, O, I, 1)
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

/**
 * Create a new referral code for a generation
 */
export async function createReferralCode(generationId: string, email?: string): Promise<string> {
  let code = generateReferralCode()
  let attempts = 0
  const maxAttempts = 5

  // Ensure uniqueness
  while (attempts < maxAttempts) {
    const { data: existing } = await getSupabase()
      .from('referrals')
      .select('code')
      .eq('code', code)
      .single()

    if (!existing) break
    
    code = generateReferralCode()
    attempts++
  }

  if (attempts === maxAttempts) {
    throw new Error('Failed to generate unique referral code')
  }

  const { data, error } = await getSupabase()
    .from('referrals')
    .insert({
      code,
      generation_id: generationId,
      email,
    })
    .select()
    .single()

  if (error) throw error
  return code
}

/**
 * Track referral click
 */
export async function trackReferralClick(
  referralCode: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  // Increment click counter using RPC function
  const { error: updateError } = await getSupabase().rpc('increment_referral_clicks', {
    ref_code: referralCode
  })

  if (updateError) {
    console.error('Failed to update referral clicks:', updateError)
  }

  // Log detailed click
  const { error: insertError } = await getSupabase()
    .from('referral_clicks')
    .insert({
      referral_code: referralCode,
      ip_address: ipAddress,
      user_agent: userAgent,
    })

  if (insertError) {
    console.error('Failed to log referral click:', insertError)
  }
}

/**
 * Get referral stats by code
 */
export async function getReferralStats(code: string): Promise<ReferralStats | null> {
  const { data, error } = await getSupabase()
    .from('referral_dashboard')
    .select('*')
    .eq('code', code)
    .single()

  if (error) {
    console.error('Failed to fetch referral stats:', error)
    return null
  }

  return data as ReferralStats
}

/**
 * Get referral stats by generation ID
 */
export async function getReferralStatsByGeneration(generationId: string): Promise<ReferralStats | null> {
  const { data, error } = await getSupabase()
    .from('referral_dashboard')
    .select('*')
    .eq('generation_id', generationId)
    .single()

  if (error) {
    console.error('Failed to fetch referral stats:', error)
    return null
  }

  return data as ReferralStats
}

/**
 * Validate referral code exists
 */
export async function validateReferralCode(code: string): Promise<boolean> {
  const { data } = await getSupabase()
    .from('referrals')
    .select('code')
    .eq('code', code)
    .single()

  return !!data
}

/**
 * Get all referrals for leaderboard
 */
export async function getReferralLeaderboard(limit: number = 10): Promise<ReferralStats[]> {
  const { data, error } = await getSupabase()
    .from('referral_dashboard')
    .select('*')
    .order('total_earned_ars', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Failed to fetch leaderboard:', error)
    return []
  }

  return data as ReferralStats[]
}
