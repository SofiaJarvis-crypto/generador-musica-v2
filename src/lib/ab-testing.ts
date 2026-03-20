// src/lib/ab-testing.ts
// A/B Testing Framework for SUNO Generator

export type ABTest = 
  | 'headline_v1'          // Homepage headline test
  | 'paywall_v1'           // Paywall copy test
  | 'preview_duration'     // Preview duration optimization
  | 'price_positioning'    // Price context/anchor test
  | 'cta_copy'             // CTA button copy test

export type Variant = 'control' | 'variantA' | 'variantB' | 'variantC'

/**
 * Get consistent variant for a user based on their ID
 * Uses hash-based assignment for stable results
 */
export function getVariant(test: ABTest, userId: string): Variant {
  const variants = getVariantsForTest(test)
  const hash = hashString(`${test}-${userId}`)
  return variants[hash % variants.length]
}

/**
 * Get available variants for each test
 */
function getVariantsForTest(test: ABTest): Variant[] {
  switch (test) {
    case 'headline_v1':
    case 'paywall_v1':
    case 'preview_duration':
    case 'price_positioning':
      return ['control', 'variantA', 'variantB']
    case 'cta_copy':
      return ['control', 'variantA', 'variantB', 'variantC']
    default:
      return ['control']
  }
}

/**
 * Simple hash function for consistent variant assignment
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Track A/B test exposure (call when variant is shown)
 */
export function trackABTestView(test: ABTest, variant: Variant) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_view', {
      test_name: test,
      variant: variant,
    })
  }
}

/**
 * Get or create user ID from sessionStorage
 */
export function getUserId(): string {
  if (typeof window === 'undefined') return 'server-side'
  
  let userId = sessionStorage.getItem('user_id')
  if (!userId) {
    userId = crypto.randomUUID()
    sessionStorage.setItem('user_id', userId)
  }
  return userId
}

/**
 * Content variants for each test
 */

export const HEADLINE_VARIANTS = {
  control: "Jingles profesionales con IA en 2 minutos",
  variantA: "La canción perfecta para tu marca, en menos de 3 minutos",
  variantB: "Conseguí el jingle de tu marca sin músicos ni estudio",
}

export const PAYWALL_HEADLINE_VARIANTS = {
  control: "Descargá la canción completa",
  variantA: "Desbloqueá la canción completa - Solo $8,900",
  variantB: "Conseguí el archivo completo en HD",
}

export const PAYWALL_FEATURES_VARIANTS = {
  control: [
    "MP3 320 kbps (máxima calidad)",
    "Canción completa",
    "Licencia comercial (usala donde quieras)",
  ],
  variantA: [
    "MP3 listo para usar (320 kbps)",
    "Canción completa",
    "Licencia comercial incluida",
  ],
  variantB: [
    "MP3 320 kbps (máxima calidad)",
    "Canción completa sin cortes",
    "Usala en radio, redes, o donde quieras",
  ],
}

export const PRICE_NOTE_VARIANTS = {
  control: "Pago único · Descarga inmediata",
  variantA: "Menos que 1 hora de estudio de grabación",
  variantB: "(pago único, tuya para siempre)",
}

export const CTA_VARIANTS = {
  control: "🎵 Crear mis 2 versiones ahora",
  variantA: "🎵 Generar mi jingle gratis",
  variantB: "🎵 Probar gratis (2 min)",
  variantC: "🎵 Crear mi canción ahora",
}

export const PREVIEW_DURATION_VARIANTS = {
  control: { duration: 15, startTime: 15, endTime: 30 },
  variantA: { duration: 10, startTime: 15, endTime: 25 },
  variantB: { duration: 20, startTime: 10, endTime: 30 },
}
