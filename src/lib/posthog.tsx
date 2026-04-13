'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

export { usePostHog }

const POSTHOG_KEY  = process.env.NEXT_PUBLIC_POSTHOG_KEY  || ''
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
    })
  }, [])

  if (!POSTHOG_KEY) return <>{children}</>
  return <PHProvider client={posthog}>{children}</PHProvider>
}

// ── Funnel events — call these throughout the app ──────────────────────────

export function trackFormSubmitted(brandName: string, genre: string) {
  posthog.capture('form_submitted', { brand_name: brandName, genre })
}

export function trackPreviewLoaded(generationId: string, brandName: string, genre: string) {
  posthog.capture('preview_loaded', { generation_id: generationId, brand_name: brandName, genre })
}

export function trackPreviewPlayed(generationId: string, song: 'a' | 'b') {
  posthog.capture('preview_played', { generation_id: generationId, song_version: song })
}

export function trackPaymentStarted(generationId: string, price: number, hasCoupon: boolean) {
  posthog.capture('payment_started', { generation_id: generationId, price_ars: price, has_coupon: hasCoupon })
}

export function trackPaymentComplete(generationId: string, price: number) {
  posthog.capture('payment_complete', { generation_id: generationId, price_ars: price })
}

export function trackRegenRequested(generationId: string, regenNumber: number) {
  posthog.capture('regen_requested', { generation_id: generationId, regen_number: regenNumber })
}
