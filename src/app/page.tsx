'use client'
// src/app/page.tsx  — Pantalla 1: Formulario

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import { trackViewContent as trackViewContentFB, trackLead as trackLeadFB, trackGenerationStarted as trackGenerationStartedFB } from '@/lib/meta-pixel'
import { trackViewContent as trackViewContentGA, trackLead as trackLeadGA, trackGenerationStarted as trackGenerationStartedGA } from '@/lib/google-analytics'
import { getUserId, getVariant, trackABTestView, HEADLINE_VARIANTS, generateUUID } from '@/lib/ab-testing'

const GENRES = [
  { id: 'Pop', emoji: '🎹', label: 'Pop' },
  { id: 'Rock', emoji: '🎸', label: 'Rock' },
  { id: 'Cumbia', emoji: '🪘', label: 'Cumbia' },
  { id: 'Folklore', emoji: '🪗', label: 'Folklore' },
  { id: 'Trap AR', emoji: '🔥', label: 'Trap AR' },
  { id: 'Reggaetón', emoji: '💃', label: 'Reggaetón' },
  { id: 'Cuarteto', emoji: '🎷', label: 'Cuarteto' },
  { id: 'Tango', emoji: '🎻', label: 'Tango' },
  { id: 'Electrónica', emoji: '🎧', label: 'Electrónica' },
  { id: 'Jazz', emoji: '🎺', label: 'Jazz' },
  { id: 'Funk', emoji: '🕺', label: 'Funk' },
  { id: 'Salsa', emoji: '🎶', label: 'Salsa' },
]

export default function HomePage() {
  const router = useRouter()

  const [brandName, setBrandName] = useState('')
  const [customLyrics, setCustomLyrics] = useState('')
  const [genre, setGenre] = useState('Pop')
  const [loading, setLoading] = useState(false)
  const [loadingLyrics, setLoadingLyrics] = useState(false)
  const [error, setError] = useState('')
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // A/B Test: Get headline variant
  const [headlineVariant, setHeadlineVariant] = useState<keyof typeof HEADLINE_VARIANTS>('control')

  // Track ViewContent when page loads + A/B test variant
  useEffect(() => {
    trackViewContentFB('Music Generator Homepage')
    trackViewContentGA('Music Generator Homepage')

    setMounted(true)

    // Get user ID and variant for A/B test
    const userId = getUserId()
    const variant = getVariant('headline_v1', userId)
    setHeadlineVariant(variant as keyof typeof HEADLINE_VARIANTS)

    // Track A/B test exposure
    trackABTestView('headline_v1', variant)
  }, [])

  // Detect mobile for sticky button
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track referral clicks
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const refCode = urlParams.get('ref')
    
    if (refCode) {
      // Store in localStorage for later use
      localStorage.setItem('referral_code', refCode)
      
      // Track the click
      fetch('/api/referrals/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: refCode }),
      }).catch(err => console.error('Failed to track referral:', err))
    }
  }, [])

  // Exit-intent detection
  useEffect(() => {
    const exitIntentShown = sessionStorage.getItem('exit_intent_shown')
    if (exitIntentShown) return // Only show once per session

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !brandName.trim()) {
        setShowExitPopup(true)
        sessionStorage.setItem('exit_intent_shown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [brandName])

  const handleGenerateLyrics = async () => {
    if (!brandName.trim()) {
      setError('Ingresá el nombre de tu marca primero')
      return
    }
    
    setLoadingLyrics(true)
    setError('')
    
    try {
      const res = await fetch('/api/generate-lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: brandName.trim(),
          genre,
          userInput: customLyrics.trim(),
        }),
      })
      
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Error al generar letra')
        return
      }
      
      setCustomLyrics(data.lyrics)
    } catch {
      setError('Error de conexión')
    } finally {
      setLoadingLyrics(false)
    }
  }

  const handleSubmit = async () => {
    if (!brandName.trim()) { 
      setError('Ingresá el nombre de tu marca')
      return 
    }
    
    setError('')
    setLoading(true)

    // Track Lead (form completed)
    trackLeadFB({ brand_name: brandName.trim() })
    trackLeadGA({ brand_name: brandName.trim() })

    try {
      // Get or create session token
      let sessionToken = sessionStorage.getItem('session_token')
      if (!sessionToken) {
        sessionToken = generateUUID()
        sessionStorage.setItem('session_token', sessionToken)
      }

      // Get referral code if exists
      const referrerCode = localStorage.getItem('referral_code') || undefined

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: brandName.trim(),
          customLyrics: customLyrics.trim() || undefined,
          genre,
          sessionToken,
          referrerCode,
        }),
      })

      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Error al generar'); return }

      // Track GenerationStarted (custom event) with A/B test variant
      trackGenerationStartedFB(data.generationId)
      trackGenerationStartedGA(data.generationId, headlineVariant)

      // Store session token returned by server
      sessionStorage.setItem('session_token', data.sessionToken)
      router.push(`/generando/${data.generationId}`)
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav step={1} />
      
      {showExitPopup && (
        <ExitIntentPopup
          onClose={() => setShowExitPopup(false)}
          onGenerate={() => {
            setShowExitPopup(false)
            // Scroll to form
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}
      
      <div className="form-screen">
        <h1 className="form-headline" suppressHydrationWarning>
          {mounted && headlineVariant === 'variantB' ? (
            <>
              Conseguí el jingle de tu marca<br />
              sin <em>músicos ni estudio</em>
            </>
          ) : mounted && headlineVariant === 'variantA' ? (
            <>
              La canción perfecta para tu marca,<br />
              en menos de <em>3 minutos</em>
            </>
          ) : (
            <>
              Jingles profesionales con IA<br />en <em>2 minutos</em>
            </>
          )}
        </h1>
        <div className="demo-section">
          <div className="demo-inline">
            <span className="demo-inline-label">🎧 Ejemplo</span>
            <div className="demo-inline-meta">
              <span className="demo-card-brand">Dinax</span>
              <span className="demo-card-genre">Tecnología</span>
            </div>
            <audio controls className="demo-player demo-player-inline">
              <source src="/demos/dinax-cuarteto.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>

        <h2 className="form-section-title">Hacé tu canción ahora!</h2>

        {error && <div className="error-box">{error}</div>}

        <div className="form-section form-section-wizard">
          <label className="form-label">¿Cómo se llama tu marca?</label>
          <input
            className="input-field"
            placeholder="Ej: Las Flores de Luli"
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
            maxLength={80}
          />
        </div>

        <div className="form-section">
          <label className="form-label">
            ¿Qué querés que diga tu canción?
            <span className="form-label-hint">Este texto será la LETRA de tu jingle. Escribí al menos 50 caracteres o usá IA.</span>
          </label>
          <textarea
            className="lyrics-field"
            placeholder="Ej: En Las Flores de Luli encontrás las mejores empanadas de Palermo, hechas con receta familiar desde 1985. Sabor único y auténtico que te va a encantar. Vení a probar!"
            value={customLyrics}
            onChange={e => setCustomLyrics(e.target.value)}
            rows={5}
            maxLength={500}
          />
          <div className="lyrics-actions">
            <button
              type="button"
              className="magic-btn"
              onClick={handleGenerateLyrics}
              disabled={loadingLyrics || !brandName.trim()}
            >
              {loadingLyrics ? (
                <>⏳ Generando...</>
              ) : customLyrics.trim() ? (
                <>✨ Mejorar con IA</>
              ) : (
                <>✨ Generar letra con IA</>
              )}
            </button>
            <div className="lyrics-counter">
              {customLyrics.length}/500 {customLyrics.length > 0 && customLyrics.length < 50 && '⚠️'}
            </div>
          </div>
          {customLyrics && customLyrics.length < 50 && (
            <div className="lyrics-info">
              💡 Texto corto detectado. Lo vamos a expandir automáticamente con IA para que tu canción suene mejor.
            </div>
          )}
          {customLyrics && customLyrics.length >= 50 && (
            <div className="lyrics-hint">
              ✅ Perfecto! Esta será la letra de tu canción
            </div>
          )}
        </div>

        <div className="form-section">
          <label className="form-label">¿En qué estilo querés sonar?</label>
          <div className="genre-grid">
            {GENRES.map(g => (
              <div
                key={g.id}
                className={`genre-card${genre === g.id ? ' sel' : ''}`}
                onClick={() => setGenre(g.id)}
              >
                <span className="genre-emoji">{g.emoji}</span>
                <div className="genre-name">{g.label}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={isMobile ? 'generate-btn generate-btn-sticky' : 'generate-btn'}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '⏳ Iniciando…' : '🎵 Crear mis 2 versiones ahora'}
        </button>
        {!isMobile && (
          <p className="generate-btn-note">
            Gratis. Escuchás 25 seg de cada versión. Solo pagás si querés descargar.
          </p>
        )}
      </div>
    </>
  )
}
