#!/bin/bash
# Apply GA4 tracking fixes

set -e

echo "Applying GA4 tracking deduplication fixes..."

# Backup original
cp 'src/app/escuchar/[id]/page.tsx' 'src/app/escuchar/[id]/page-backup-$(date +%Y%m%d).tsx'

# Apply fix: Add localStorage deduplication
cat > 'src/app/escuchar/[id]/page.tsx' << 'ENDOFFILE'
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Nav from '@/components/Nav'
import WaveformPlayer from '@/components/WaveformPlayer'
import { trackAddToCart as trackAddToCartFB, trackInitiateCheckout as trackInitiateCheckoutFB } from '@/lib/meta-pixel'
import { trackAddToCart as trackAddToCartGA, trackInitiateCheckout as trackInitiateCheckoutGA, trackRegeneration } from '@/lib/google-analytics'

// src/app/escuchar/[id]/page.tsx — Pantalla 3: Player + Pago
// 🔧 FIXED: Deduplicación de eventos GA4

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

  return (
    <>
      <Nav step={3} />
      <div className="listen-screen">
        <div className="listen-header">
          <h2 className="listen-title">
            Tu jingle está <em>listo</em> 🎉
          </h2>
          <p className="listen-sub">
            Escuchá las dos versiones que la IA creó para <strong>{generation.brand_name}</strong>.
            <br />
            Elegí tu favorita y descargala por {formatPrice(PRECIO_ARS)} (pago único).
          </p>
        </div>

        {/* ── Tab selector ────────────────────────── */}
        {generation.song_b_stream_url && (
          <div className="song-tabs">
            <button
              className={selectedSong === 'a' ? 'tab active' : 'tab'}
              onClick={() => setSelectedSong('a')}
            >
              Versión A
            </button>
            <button
              className={selectedSong === 'b' ? 'tab active' : 'tab'}
              onClick={() => setSelectedSong('b')}
            >
              Versión B
            </button>
          </div>
        )}

        {/* ── Player ───────────────────────────────── */}
        {currentStreamUrl ? (
          <WaveformPlayer audioUrl={currentStreamUrl} />
        ) : (
          <div className="player-box">
            <p>Cargando audio…</p>
          </div>
        )}

        {/* ── Botón de pago ──────────────────────── */}
        <div className="pay-section">
          <button className="pay-btn" onClick={handlePay} disabled={loadingPay}>
            {loadingPay ? 'Cargando...' : `Pagar con Mercado Pago (${formatPrice(PRECIO_ARS)})`}
          </button>
          {error && <p className="error-msg">{error}</p>}
        </div>

        {/* ── Regenerar ──────────────────────────── */}
        {generation.regen_count < MAX_REGENS && (
          <div className="regen-section">
            <p className="regen-notice">
              ¿No te convenció? Regenerá gratis ({MAX_REGENS - generation.regen_count} intentos restantes)
            </p>
            <button className="regen-btn" onClick={handleRegen} disabled={loadingRegen}>
              {loadingRegen ? 'Regenerando...' : '🔄 Regenerar otra versión'}
            </button>
            {regenError && <p className="error-msg">{regenError}</p>}
          </div>
        )}

        {/* ── FAQs / Info ────────────────────────── */}
        <div className="info-box">
          <h3>¿Qué incluye el pago?</h3>
          <ul>
            <li>MP3 de alta calidad (sin marca de agua)</li>
            <li>Licencia comercial para usar en tu negocio</li>
            <li>Descarga inmediata</li>
            <li>Pago único (no es suscripción)</li>
          </ul>
        </div>
      </div>
    </>
  )
}
ENDOFFILE

echo "Fix applied. Review changes with: git diff"
echo "Then commit: git add -A && git commit -m 'fix: GA4 tracking deduplication' && git push"
