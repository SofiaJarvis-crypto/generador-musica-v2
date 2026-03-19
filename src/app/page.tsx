'use client'
// src/app/page.tsx  — Pantalla 1: Formulario

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import SocialProof from '@/components/SocialProof'
import { trackViewContent as trackViewContentFB, trackLead as trackLeadFB, trackGenerationStarted as trackGenerationStartedFB } from '@/lib/meta-pixel'
import { trackViewContent as trackViewContentGA, trackLead as trackLeadGA, trackGenerationStarted as trackGenerationStartedGA } from '@/lib/google-analytics'
import { getUserId, getVariant, trackABTestView, HEADLINE_VARIANTS } from '@/lib/ab-testing'

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

  // A/B Test: Get headline variant
  const [headlineVariant, setHeadlineVariant] = useState<keyof typeof HEADLINE_VARIANTS>('control')

  // Track ViewContent when page loads + A/B test variant
  useEffect(() => {
    trackViewContentFB('Music Generator Homepage')
    trackViewContentGA('Music Generator Homepage')

    // Get user ID and variant for A/B test
    const userId = getUserId()
    const variant = getVariant('headline_v1', userId)
    setHeadlineVariant(variant as keyof typeof HEADLINE_VARIANTS)
    
    // Track A/B test exposure
    trackABTestView('headline_v1', variant)
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
    if (!brandName.trim()) { setError('Ingresá el nombre de tu marca'); return }
    setError('')
    setLoading(true)

    // Track Lead (form completed)
    trackLeadFB({ brand_name: brandName.trim() })
    trackLeadGA({ brand_name: brandName.trim() })

    try {
      // Get or create session token
      let sessionToken = sessionStorage.getItem('session_token')
      if (!sessionToken) {
        sessionToken = crypto.randomUUID()
        sessionStorage.setItem('session_token', sessionToken)
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: brandName.trim(),
          customLyrics: customLyrics.trim() || undefined,
          genre,
          sessionToken,
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
      
      <SocialProof />
      
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
        <h1 className="form-headline">
          {headlineVariant === 'variantB' ? (
            <>
              Conseguí el jingle de tu marca<br />
              sin <em>músicos ni estudio</em>
            </>
          ) : headlineVariant === 'variantA' ? (
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
        <p className="form-subline">
          Probá gratis: Generamos 2 versiones y escuchás un preview de 15 seg.<br />
          ¿Te gusta? Descargala entera por $8.900 (pago único)
        </p>

        <div className="trust-signals-compact">
          ✅ +500 jingles generados · ✅ Sin derechos de autor · ✅ Marcas argentinas
        </div>

        <div className="demo-section">
          <div className="demo-header">🎧 Escuchá ejemplos:</div>
          <div className="demo-grid">
            <div className="demo-card">
              <div className="demo-label">🎸 Garbarino</div>
              <audio controls className="demo-player">
                <source src="/demos/garbarino-rock.mp3" type="audio/mpeg" />
              </audio>
            </div>
            <div className="demo-card">
              <div className="demo-label">🎷 Dinax</div>
              <audio controls className="demo-player">
                <source src="/demos/dinax-cuarteto.mp3" type="audio/mpeg" />
              </audio>
            </div>
          </div>
        </div>

        {error && <div className="error-box">{error}</div>}

        <h2 className="form-section-title">Hacé tu canción ahora!</h2>

        <div className="form-section">
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
            ¿Sobre qué es tu canción?
            <span className="form-label-hint">Escribí la letra o dejanos ayudarte con IA</span>
          </label>
          <textarea
            className="lyrics-field"
            placeholder="Ej: Las mejores empanadas de Palermo, receta familiar desde 1985, sabor único y auténtico..."
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
                <>✨ Generar con IA</>
              )}
            </button>
            <div className="lyrics-counter">
              {customLyrics.length}/500
            </div>
          </div>
          {customLyrics && (
            <div className="lyrics-hint">
              💡 Podés editar el texto antes de generar tu canción
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
          className="generate-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '⏳ Iniciando…' : '🎵 Crear mis 2 versiones ahora'}
        </button>
        <p className="generate-btn-note">
          Gratis. Escuchás 15 seg de cada versión. Solo pagás si querés descargar.
        </p>
      </div>
    </>
  )
}
