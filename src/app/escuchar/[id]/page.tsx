'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Nav from '@/components/Nav'
import WaveformPlayer from '@/components/WaveformPlayer'
import { trackAddToCart, trackInitiateCheckout } from '@/lib/meta-pixel'

// src/app/escuchar/[id]/page.tsx — Pantalla 3: Player + Pago

export const dynamic = 'force-dynamic'

const MAX_REGENS = parseInt(process.env.NEXT_PUBLIC_MAX_REGENS || '3')
const PRECIO_ARS = parseInt(process.env.NEXT_PUBLIC_PRECIO_ARS || '8900')

function formatPrice(n: number) {
  return '$' + n.toLocaleString('es-AR')
}

export default function EscucharPage() {
  const router = useRouter()
  const params = useParams()
  const generationId = params.id as string

  const [generation, setGeneration] = useState<any>(null)
  const [selectedSong, setSelectedSong] = useState<'a' | 'b'>('a')
  const [loadingPay, setLoadingPay] = useState(false)
  const [loadingRegen, setLoadingRegen] = useState(false)
  const [error, setError] = useState('')
  const [regenError, setRegenError] = useState('')

  // Poll status in case suno_status is still stream_ready (audioUrl not yet ready)
  useEffect(() => {
    if (!generationId) return
    const fetchGen = async () => {
      const res = await fetch(`/api/status/${generationId}`)
      if (res.ok) {
        const data = await res.json()
        setGeneration(data)
        
        // Track AddToCart when song is ready (first time only)
        if (data.song_a_stream_url) {
          trackAddToCart({
            generationId: generationId,
            brandName: data.brand_name,
            value: PRECIO_ARS,
          })
        }
      }
    }
    fetchGen()
    // Keep polling every 5s until complete (to get audioUrl for download)
    const iv = setInterval(async () => {
      const res = await fetch(`/api/status/${generationId}`)
      if (res.ok) {
        const data = await res.json()
        setGeneration(data)
        if (data.suno_status === 'complete') clearInterval(iv)
      }
    }, 5000)
    return () => clearInterval(iv)
  }, [generationId])

  const currentStreamUrl = selectedSong === 'a'
    ? generation?.song_a_stream_url
    : generation?.song_b_stream_url

  const handlePay = async () => {
    setError('')
    setLoadingPay(true)
    
    // Track InitiateCheckout
    trackInitiateCheckout({
      generationId: generationId,
      brandName: generation?.brand_name,
      value: PRECIO_ARS,
    })
    
    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ generationId, selectedSong }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Error al iniciar el pago'); return }
      // Redirect to Mercado Pago checkout
      window.location.href = data.checkoutUrl
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoadingPay(false)
    }
  }

  const handleRegen = async () => {
    if (!generation) return
    if (generation.regen_count >= MAX_REGENS) return
    setRegenError('')
    setLoadingRegen(true)
    try {
      const sessionToken = sessionStorage.getItem('session_token') || ''
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: generation.brand_name,
          brandDescription: '',
          brandLocation: '',
          genre: generation.genre,
          moods: generation.moods,
          durationSeconds: generation.duration_seconds,
          sessionToken,
          generationId,  // signals regen
        }),
      })
      const data = await res.json()
      if (!res.ok) { setRegenError(data.error || 'Error al regenerar'); return }
      router.push(`/generando/${generationId}`)
    } catch {
      setRegenError('Error de conexión.')
    } finally {
      setLoadingRegen(false)
    }
  }

  if (!generation) {
    return (
      <>
        <Nav step={3} />
        <div className="generating-screen">
          <div className="gen-visual"><div className="gen-icon">🎵</div></div>
          <h2 className="gen-title">Cargando tu canción…</h2>
        </div>
      </>
    )
  }

  const regenLeft = MAX_REGENS - (generation.regen_count || 0)
  const hasBothSongs = generation.song_b_stream_url

  return (
    <>
      <Nav step={3} />
      <div className="player-screen">
        <div className="player-eyebrow">
          <div className="player-eyebrow-badge">
            <span className="pulse" /> Tu canción está lista
          </div>
        </div>

        <h2 className="player-headline">
          {generation.brand_name}<br />
          — Jingle {generation.genre}
        </h2>
        <p className="player-meta">
          {generation.genre} · {generation.moods?.join(', ')} · {generation.duration_seconds} segundos
        </p>

        {/* Song selector — only show if we have both */}
        {hasBothSongs && (
          <div className="song-tabs">
            {(['a', 'b'] as const).map(s => (
              <div
                key={s}
                className={`song-tab${selectedSong === s ? ' active' : ''}`}
                onClick={() => setSelectedSong(s)}
              >
                <div className="song-tab-label">Versión {s.toUpperCase()}</div>
                <div className="song-tab-name">
                  {s === 'a' ? '🎵 Opción principal' : '🎶 Opción alternativa'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Player */}
        {currentStreamUrl ? (
          <WaveformPlayer
            key={`${generationId}-${selectedSong}`}
            streamUrl={currentStreamUrl}
            duration={generation.duration_seconds}
            brandName={generation.brand_name}
            genre={generation.genre}
          />
        ) : (
          <div className="preparing-box">
            <div className="gen-icon">🎵</div>
            <p>El audio se está preparando, ya casi está…</p>
          </div>
        )}

        {/* Regen */}
        <p className="regen-link">
          ¿No te convence?{' '}
          <button
            onClick={handleRegen}
            disabled={loadingRegen || regenLeft <= 0}
          >
            {loadingRegen
              ? 'Regenerando…'
              : regenLeft > 0
              ? `Generar otra versión gratis (quedan ${regenLeft})`
              : 'Sin regeneraciones disponibles'}
          </button>
        </p>
        {regenError && <div className="error-box" style={{ marginBottom: 16 }}>{regenError}</div>}

        {/* Pay box */}
        <div className="pay-box">
          <div className="pay-top">
            <div className="pay-left">
              <div className="pay-label">¿Te gustó? Descargala limpia</div>
              <div className="pay-includes">
                <div className="pay-item"><span className="pay-item-check">✓</span> MP3 en alta calidad</div>
                <div className="pay-item"><span className="pay-item-check">✓</span> Sin marca de agua</div>
                <div className="pay-item"><span className="pay-item-check">✓</span> Licencia comercial incluida</div>
              </div>
            </div>
            <div className="pay-right">
              <div className="pay-price">{formatPrice(PRECIO_ARS)}</div>
              <div className="pay-note">Pago único · Descarga inmediata</div>
            </div>
          </div>

          {error && <div className="error-box" style={{ marginTop: 12, marginBottom: 0 }}>{error}</div>}

          <button
            className="mp-btn"
            onClick={handlePay}
            disabled={loadingPay || !currentStreamUrl}
          >
            <span className="mp-logo">MP</span>
            {loadingPay ? 'Iniciando pago…' : 'Pagar con Mercado Pago'}
          </button>

          <div className="pay-security">
            🔒 Pago 100% seguro · Descarga inmediata después del pago
          </div>
        </div>
      </div>
    </>
  )
}
