// src/lib/analytics.ts
// Google Analytics 4 event tracking helpers

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

/**
 * Send a custom event to Google Analytics
 * Safe to call even if gtag is not loaded (won't crash)
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

/**
 * Track when user starts generating a song
 */
export function trackGenerationStarted(data: {
  brandName: string
  genre: string
  moods?: string[]
  duration?: number
}) {
  trackEvent('generation_started', {
    brand_name: data.brandName,
    genre: data.genre,
    moods: data.moods?.join(', '),
    duration_seconds: data.duration,
  })
}

/**
 * Track when song is ready to listen
 */
export function trackSongReady(data: {
  generationId: string
  brandName: string
  genre: string
}) {
  trackEvent('song_ready', {
    generation_id: data.generationId,
    brand_name: data.brandName,
    genre: data.genre,
  })
}

/**
 * Track when user clicks "Pagar" (begin checkout)
 * This is a GA4 recommended event
 */
export function trackBeginCheckout(data: {
  generationId: string
  brandName: string
  value: number
}) {
  trackEvent('begin_checkout', {
    currency: 'ARS',
    value: data.value,
    items: [
      {
        item_id: data.generationId,
        item_name: `Jingle - ${data.brandName}`,
        price: data.value,
        quantity: 1,
      },
    ],
  })
}

/**
 * Track successful purchase (CONVERSION EVENT)
 * This is the main conversion we want to optimize
 */
export function trackPurchase(data: {
  transactionId: string
  generationId: string
  brandName: string
  value: number
  payerEmail?: string
}) {
  trackEvent('purchase', {
    transaction_id: data.transactionId,
    currency: 'ARS',
    value: data.value,
    items: [
      {
        item_id: data.generationId,
        item_name: `Jingle - ${data.brandName}`,
        price: data.value,
        quantity: 1,
      },
    ],
  })
}

/**
 * Track when user downloads the MP3
 */
export function trackDownloadComplete(data: {
  generationId: string
  brandName: string
}) {
  trackEvent('download_complete', {
    generation_id: data.generationId,
    brand_name: data.brandName,
  })
}

/**
 * Track payment failure
 */
export function trackPaymentFailed(data: {
  generationId: string
  reason?: string
}) {
  trackEvent('payment_failed', {
    generation_id: data.generationId,
    reason: data.reason || 'unknown',
  })
}
