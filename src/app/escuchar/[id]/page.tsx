'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Nav from '@/components/Nav'
import WaveformPlayer from '@/components/WaveformPlayer'
import { trackAddToCart as trackAddToCartFB, trackInitiateCheckout as trackInitiateCheckoutFB } from '@/lib/meta-pixel'
import { trackAddToCart as trackAddToCartGA, trackInitiateCheckout as trackInitiateCheckoutGA, trackRegeneration } from '@/lib/google-analytics'
import { trackPreviewLoaded, trackPaymentStarted, trackRegenRequested } from '@/lib/posthog'

const PRECIO_ORIGINAL_ARS = 12900

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
  const [emailInput, setEmailInput] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)

  const [couponInput, setCouponInput] = useState('')
  const [couponApplied, setCouponApplied] = useState<{ type: string; value: number } | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [showCouponField, setShowCouponField] = useState(false)

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
          trackPreviewLoaded(generationId, data.brand_name, data.genre)
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

  // Mostrar email capture después de 45s si no pagó
  useEffect(() => {
    if (emailSaved) return
    const t = setTimeout(() => setShowEmailCapture(true), 45000)
    return () => clearTimeout(t)
  }, [emailSaved])

  const handleEmailCapture = async (e: FormEvent) => {
    e.preventDefault()
    if (!emailInput || !emailInput.includes('@')) return
    setEmailLoading(true)
    try {
      await fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, generationId }),
      })
      setEmailSaved(true)
      setShowEmailCapture(false)
    } catch {
      // silencioso
    } finally {
      setEmailLoading(false)
    }
  }

  const handleCouponValidate = async (e: FormEvent) => {
    e.preventDefault()
    if (!couponInput.trim()) return
    setCouponError('')
    setCouponLoading(true)
    try {
      const res = await fetch('/api/coupon/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput }),
      })
      const data = await res.json()
      if (!res.ok) { setCouponError(data.error || 'Cupón inválido'); return }
      setCouponApplied({ type: data.discountType, value: data.discountValue })
      setCouponError('')
    } catch {
      setCouponError('Error al validar el cupón.')
    } finally {
      setCouponLoading(false)
    }
  }

  const discountedPrice = (() => {
    if (!couponApplied) return PRECIO_ARS
    if (couponApplied.type === 'free') return 0
    if (couponApplied.type === 'percent') return Math.max(PRECIO_ARS - Math.round(PRECIO_ARS * couponApplied.value / 100), 1)
    if (couponApplied.type === 'fixed') return Math.max(PRECIO_ARS - couponApplied.value, 1)
    return PRECIO_ARS
  })()

  // 🆕 Siempre usar stream_url - el player limita la reproducción si no está unlocked
  const isUnlocked = generation?.is_unlocked === true
  
  const currentStreamUrl = selectedSong === 'a'
    ? generation?.song_a_stream_url
    : generation?.song_b_stream_url

  const handlePay = async () => {
    setError('')
    setLoadingPay(true)

    // Cupón gratis: canjear directamente sin pasar por MP
    if (couponApplied?.type === 'free') {
      try {
        const res = await fetch('/api/coupon/redeem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: couponInput, generationId, selectedSong }),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.error || 'Error al canjear el cupón'); return }
        window.location.href = `/descarga?token=${data.downloadToken}`
      } catch {
        setError('Error de conexión. Intentá de nuevo.')
      } finally {
        setLoadingPay(false)
      }
      return
    }

    // ✅ FIX: Track InitiateCheckout SOLO UNA VEZ (deduplica múltiples clicks)
    const checkoutKey = `tracked_checkout_${generationId}`
    if (!localStorage.getItem(checkoutKey)) {
      trackInitiateCheckoutFB({
        generationId: generationId,
        brandName: generation?.brand_name,
        value: discountedPrice,
      })
      trackInitiateCheckoutGA({
        generationId: generationId,
        brandName: generation?.brand_name,
        value: discountedPrice,
      })
      localStorage.setItem(checkoutKey, 'true')
      console.log('[GA4] begin_checkout tracked (deduped)')
      trackPaymentStarted(generationId, discountedPrice, !!couponApplied)
    }

    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ generationId, selectedSong, couponCode: couponApplied ? couponInput : undefined }),
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
    trackRegenRequested(generationId, (generation.regen_count || 0) + 1)
    
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

        {/* Email capture — aparece a los 45s */}
        {showEmailCapture && !isUnlocked && !emailSaved && (
          <div className="email-capture-banner">
            <div className="email-capture-icon">📩</div>
            <div className="email-capture-text">
              <strong>¿Querés guardarlo para después?</strong>
              <span>Te mandamos el link de tu jingle por email para que lo tengas a mano.</span>
            </div>
            <form onSubmit={handleEmailCapture} className="email-capture-form">
              <input
                type="email"
                placeholder="tu@email.com"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                required
              />
              <button type="submit" disabled={emailLoading}>
                {emailLoading ? '…' : 'Guardar'}
              </button>
            </form>
            <button className="email-capture-dismiss" onClick={() => setShowEmailCapture(false)}>✕</button>
          </div>
        )}

        {/* Pay box */}
        <div className="pay-box">
          <div className="price-urgency-badge">
            ⚡ Precio de lanzamiento — quedan pocas semanas
          </div>
          <div className="pay-top">
            <div className="pay-left">
              <div className="pay-label">Descargá la canción completa</div>
              <div className="pay-includes">
                <div className="pay-item"><span className="pay-item-check">✓</span> MP3 320 kbps (máxima calidad)</div>
                <div className="pay-item"><span className="pay-item-check">✓</span> Canción completa sin watermark</div>
                <div className="pay-item"><span className="pay-item-check">✓</span> Licencia comercial (Instagram, TikTok, radio)</div>
                <div className="pay-item"><span className="pay-item-check">✓</span> Tuya para siempre</div>
              </div>
            </div>
            <div className="pay-right">
              <div className="pay-price-original">{formatPrice(PRECIO_ORIGINAL_ARS)}</div>
              {couponApplied && couponApplied.type !== 'free' && (
                <div className="pay-price-original" style={{ color: 'var(--amber)', textDecoration: 'line-through' }}>
                  {formatPrice(PRECIO_ARS)}
                </div>
              )}
              <div className="pay-price">
                {couponApplied?.type === 'free' ? '¡GRATIS!' : formatPrice(discountedPrice)}
              </div>
              <div className="pay-note">Pago único · Sin suscripción</div>
            </div>
          </div>

          {/* Campo de cupón */}
          {!isUnlocked && (
            <div style={{ marginTop: 12 }}>
              {!showCouponField && !couponApplied && (
                <button
                  style={{ background: 'none', border: 'none', color: 'var(--amber)', cursor: 'pointer', fontSize: 13, padding: 0, textDecoration: 'underline' }}
                  onClick={() => setShowCouponField(true)}
                >
                  ¿Tenés un cupón de descuento?
                </button>
              )}
              {(showCouponField || couponApplied) && (
                <form onSubmit={handleCouponValidate} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 4 }}>
                  <input
                    type="text"
                    placeholder="CÓDIGO"
                    value={couponInput}
                    onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponApplied(null); setCouponError('') }}
                    disabled={!!couponApplied}
                    style={{ flex: 1, minWidth: 120, padding: '6px 10px', borderRadius: 6, border: '1px solid #444', background: '#1a1a1a', color: '#fff', fontSize: 13, letterSpacing: 1 }}
                  />
                  {!couponApplied ? (
                    <button
                      type="submit"
                      disabled={couponLoading || !couponInput.trim()}
                      style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid var(--amber)', background: 'transparent', color: 'var(--amber)', cursor: 'pointer', fontSize: 13 }}
                    >
                      {couponLoading ? '…' : 'Aplicar'}
                    </button>
                  ) : (
                    <span style={{ color: '#4caf50', fontSize: 13 }}>
                      ✅ {couponApplied.type === 'free' ? 'Acceso gratis aplicado' : `Descuento aplicado`}
                    </span>
                  )}
                </form>
              )}
              {couponError && <p style={{ color: '#e53935', fontSize: 12, margin: '4px 0 0' }}>{couponError}</p>}
            </div>
          )}

          {error && <div className="error-box" style={{ marginTop: 12, marginBottom: 0 }}>{error}</div>}

          <button
            className="mp-btn"
            onClick={handlePay}
            disabled={loadingPay || generation?.suno_status !== 'complete'}
          >
            {!loadingPay && couponApplied?.type !== 'free' && (
              <img src="/mp-logo.svg" alt="Mercado Pago" className="mp-logo-img" style={{ height: 24, marginRight: 8 }} />
            )}
            {loadingPay
              ? 'Procesando…'
              : couponApplied?.type === 'free'
              ? '🎉 Obtener mi jingle gratis'
              : 'Pagar con Mercado Pago'}
          </button>

          <div className="pay-security">
            🔒 Pago 100% seguro · Descarga inmediata después del pago
          </div>
        </div>

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
