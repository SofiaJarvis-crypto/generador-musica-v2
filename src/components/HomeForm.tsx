'use client'
// src/components/HomeForm.tsx — Formulario interactivo de la homepage
// Recibe headlineVariant desde el Server Component (vía cookie asignada en middleware),
// por lo que el H1 se renderiza con el valor correcto desde el servidor.

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import { trackViewContent as trackViewContentFB, trackLead as trackLeadFB, trackGenerationStarted as trackGenerationStartedFB } from '@/lib/meta-pixel'
import { trackViewContent as trackViewContentGA, trackLead as trackLeadGA, trackGenerationStarted as trackGenerationStartedGA } from '@/lib/google-analytics'
import { trackABTestView, HEADLINE_VARIANTS, generateUUID, type Variant } from '@/lib/ab-testing'
import { trackFormSubmitted } from '@/lib/posthog'

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

function readVariantCookie(): Variant {
  if (typeof document === 'undefined') return 'control'
  const match = document.cookie.match(/(?:^|;\s*)headline_variant=([^;]+)/)
  const val = match?.[1]
  if (val === 'variantA' || val === 'variantB') return val
  return 'control'
}

export default function HomeForm() {
  const router = useRouter()

  const [headlineVariant, setHeadlineVariant] = useState<Variant>('control')
  const [brandName, setBrandName] = useState('')
  const [customLyrics, setCustomLyrics] = useState('')
  const [genre, setGenre] = useState('Pop')
  const [loading, setLoading] = useState(false)
  const [loadingLyrics, setLoadingLyrics] = useState(false)
  const [error, setError] = useState('')
  const [showExitPopup, setShowExitPopup] = useState(false)

  const paso1Ref = useRef<HTMLDivElement>(null)

  // Capturar UTMs de la URL y guardarlos en sessionStorage para preservar atribución post-MP
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utms: Record<string, string> = {}
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const val = params.get(key)
      if (val) utms[key] = val
    }
    if (Object.keys(utms).length > 0) {
      sessionStorage.setItem('utm_params', JSON.stringify(utms))
    }
  }, [])

  // Track ViewContent + leer variante A/B desde cookie asignada por middleware
  useEffect(() => {
    trackViewContentFB('Music Generator Homepage')
    trackViewContentGA('Music Generator Homepage')
    const variant = readVariantCookie()
    setHeadlineVariant(variant)
    trackABTestView('headline_v1', variant)
  }, [])

  // Track referral clicks
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const refCode = urlParams.get('ref')

    if (refCode) {
      localStorage.setItem('referral_code', refCode)
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
    if (exitIntentShown) return

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

    trackLeadFB({ brand_name: brandName.trim() })
    trackLeadGA({ brand_name: brandName.trim() })
    trackFormSubmitted(brandName.trim(), genre)

    try {
      let sessionToken = sessionStorage.getItem('session_token')
      if (!sessionToken) {
        sessionToken = generateUUID()
        sessionStorage.setItem('session_token', sessionToken)
      }

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

      trackGenerationStartedFB(data.generationId)
      trackGenerationStartedGA(data.generationId, headlineVariant)

      sessionStorage.setItem('session_token', data.sessionToken)
      router.push(`/generando/${data.generationId}`)
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Scroll a Paso 1 + animación flash si el campo de marca está vacío
  const scrollToPaso1AndFlash = useCallback(() => {
    const el = paso1Ref.current
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // Quitar la clase primero para que se pueda re-disparar si ya estaba
    el.classList.remove('flash')
    void el.offsetWidth // reflow para reiniciar animación
    el.classList.add('flash')
    el.addEventListener('animationend', () => el.classList.remove('flash'), { once: true })
    // Foco en el input del paso 1
    const input = el.querySelector('input')
    setTimeout(() => input?.focus(), 400)
  }, [])

  // Handler del CTA principal: scroll+flash si paso 1 vacío, submit si está completo
  const handleCTAClick = useCallback(() => {
    if (!brandName.trim()) {
      scrollToPaso1AndFlash()
      return
    }
    handleSubmit()
  }, [brandName, scrollToPaso1AndFlash]) // eslint-disable-line react-hooks/exhaustive-deps

  // Renderizar el H1 según la variante asignada en el servidor (sin parpadeo)
  const renderHeadline = () => {
    if (headlineVariant === 'variantB') {
      return (
        <>
          Conseguí la canción de tu marca<br />
          sin <em>músicos ni estudio</em>
        </>
      )
    }
    if (headlineVariant === 'variantA') {
      return (
        <>
          La canción perfecta para tu marca,<br />
          en menos de <em>3 minutos</em>
        </>
      )
    }
    return (
      <>
        Canciones profesionales con IA<br />en <em>2 minutos</em>
      </>
    )
  }

  return (
    <>
      <Nav step={1} />

      {showExitPopup && (
        <ExitIntentPopup
          onClose={() => setShowExitPopup(false)}
          onGenerate={() => {
            setShowExitPopup(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}

      <div className="form-screen">
        <h1 className="form-headline" suppressHydrationWarning>
          {renderHeadline()}
        </h1>
        <div id="demo-section" className="demo-section">
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

        <h2
          className="form-section-title"
          onClick={scrollToPaso1AndFlash}
          role="button"
          aria-label="Empezar a crear mi canción"
        >
          Hacé tu canción ahora!
        </h2>

        {error && (
          <div className="error-box error-box-dismissable">
            <span>{error}</span>
            <button className="error-box-close" onClick={() => setError('')} aria-label="Cerrar error">✕</button>
          </div>
        )}

        <span className="paso-label">Paso 1</span>
        <div id="paso1" className="form-section form-section-wizard" ref={paso1Ref}>
          <label className="form-label">¿Cómo se llama tu marca?</label>
          <input
            className="input-field"
            placeholder="Ej: Las Flores de Luli"
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
            maxLength={80}
          />
        </div>

        <span className="paso-label">Paso 2</span>
        <div className="form-section">
          <label className="form-label">
            ¿Qué querés que diga tu canción?
            <span className="form-label-hint">Este texto será la LETRA de tu canción. Escribí al menos 50 caracteres o usá IA.</span>
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
            <div className="magic-btn-wrap">
              <button
                type="button"
                className="magic-btn"
                onClick={!brandName.trim() ? scrollToPaso1AndFlash : handleGenerateLyrics}
                disabled={loadingLyrics}
                data-disabled-hint={!brandName.trim() ? 'Primero ingresá el nombre de tu marca' : undefined}
              >
                {loadingLyrics ? (
                  <>⏳ Generando...</>
                ) : customLyrics.trim() ? (
                  <>✨ Mejorar con IA</>
                ) : (
                  <>✨ Generar letra con IA</>
                )}
              </button>
              {!brandName.trim() && <span className="magic-btn-hint">← ingresá tu marca primero</span>}
            </div>
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

        <p className="generate-btn-note">
          Gratis · Escuchás 25 seg de cada versión · Solo pagás si querés descargar
        </p>

        <button
          className="generate-btn generate-btn-sticky"
          onClick={handleCTAClick}
          disabled={loading}
        >
          {loading ? '⏳ Iniciando…' : '🎵 Crear mis 2 versiones ahora'}
        </button>

      </div>
    </>
  )
}
