'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Nav from '@/components/Nav'
import WaveformPlayer from '@/components/WaveformPlayer'
// import ReferralShare from '@/components/ReferralShare' // HIDDEN: Referral system temporarily disabled
import { trackAddToCart as trackAddToCartFB, trackInitiateCheckout as trackInitiateCheckoutFB } from '@/lib/meta-pixel'
import { trackAddToCart as trackAddToCartGA, trackInitiateCheckout as trackInitiateCheckoutGA, trackRegeneration } from '@/lib/google-analytics'

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
        
        // ✅ FIX: Track AddToCart SOLO UNA VEZ por generationId (deduplicado)
        const trackKey = `tracked_cart_${generationId}`
        if (data.song_a_stream_url && !localStorage.getItem(trackKey)) {
          trackAddToCartFB({
            generationId: generationId,
            brandName: data.brand_name,
            value: PRECIO_ARS,
          })
          trackAddToCartGA({
            generationId: generationId,
            brandName: data.brand_name,
            value: PRECIO_ARS,
          })
          localStorage.setItem(trackKey, 'true')
          console.log('[GA4] add_to_cart tracked (deduped)')
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

  // 🆕 Siempre usar stream_url - el player limita la reproducción si no está unlocked
  const isUnlocked = generation?.is_unlocked === true
  
  const currentStreamUrl = selectedSong === 'a'
    ? generation?.song_a_stream_url
    : generation?.song_b_stream_url

  const handlePay = async () => {
    setError('')
    setLoadingPay(true)
    
    // ✅ FIX: Track InitiateCheckout SOLO UNA VEZ (deduplica múltiples clicks)
    const checkoutKey = `tracked_checkout_${generationId}`
    if (!localStorage.getItem(checkoutKey)) {
      trackInitiateCheckoutFB({
        generationId: generationId,
        brandName: generation?.brand_name,
        value: PRECIO_ARS,
      })
      trackInitiateCheckoutGA({
        generationId: generationId,
        brandName: generation?.brand_name,
        value: PRECIO_ARS,
      })
      localStorage.setItem(checkoutKey, 'true')
      console.log('[GA4] begin_checkout tracked (deduped)')
    }
    
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
    
    // Track regeneration
    trackRegeneration(generationId, (generation.regen_count || 0) + 1)
    
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
            <div className="song-tabs-header">
              <strong>Elegí tu versión favorita:</strong> Generamos 2 opciones para vos
            </div>
            {(['a', 'b'] as const).map(s => (
              <div
                key={s}
                className={`song-tab${selectedSong === s ? ' active' : ''}`}
                onClick={() => setSelectedSong(s)}
              >
                <div className="song-tab-label">OPCIÓN {s.toUpperCase()}</div>
                <div className="song-tab-name">
                  {s === 'a' ? '🎵 Primera versión' : '🎶 Segunda versión'}
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
            isPreview={!isUnlocked}
          />
        ) : (
          <div className="preparing-box">
            <div className="gen-icon">🎵</div>
            <p>El audio se está preparando, ya casi está…</p>
          </div>
        )}

        {/* Pay box */}
        <div className="pay-box">
          <div className="price-urgency-badge">
            ⚠️ Precio de lanzamiento - Sube a $12,900 el 1 de Abril
          </div>
          <div className="pay-top">
            <div className="pay-left">
              <div className="pay-label">Descargá la canción completa</div>
              <div className="pay-includes">
                <div className="pay-item"><span className="pay-item-check">✓</span> MP3 320 kbps (máxima calidad)</div>
                <div className="pay-item"><span className="pay-item-check">✓</span> Canción completa</div>
                <div className="pay-item"><span className="pay-item-check">✓</span> Licencia comercial (usala donde quieras)</div>
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
            disabled={loadingPay || generation?.suno_status !== 'complete'}
          >
            {!loadingPay && <img src="/mp-logo.svg" alt="Mercado Pago" className="mp-logo-img" style={{ height: 24, marginRight: 8 }} />}
            {loadingPay ? 'Iniciando pago…' : 'Pagar con Mercado Pago'}
          </button>

          <div className="pay-security">
            🔒 Pago 100% seguro · Descarga inmediata después del pago
          </div>
        </div>

        {/* Referral Share - HIDDEN */}
        {/* <ReferralShare generationId={generationId} /> */}

        {/* Regen (movido debajo del pay-box) */}
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
      </div>
    </>
  )
}
