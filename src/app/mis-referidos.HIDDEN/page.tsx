'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface ReferralStats {
  code: string
  total_clicks: number
  total_conversions: number
  total_earned_ars: number
  conversion_rate: number
  created_at: string
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!code) {
      setError('Falta el código de referido. Ingresá desde tu link único.')
      setLoading(false)
      return
    }

    fetchStats()
  }, [code])

  const fetchStats = async () => {
    try {
      const res = await fetch(`/api/referrals/stats?code=${code}`)
      const data = await res.json()

      if (res.ok) {
        setStats(data.stats)
      } else {
        setError(data.error || 'Error al cargar estadísticas')
      }
    } catch (err) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="referral-dashboard">
        <div className="referral-dashboard-loading">Cargando tu dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="referral-dashboard">
        <div className="referral-dashboard-error">
          <div className="error-icon">❌</div>
          <h2>{error}</h2>
          <Link href="/" className="cta-btn">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  if (!stats) return null

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}?ref=${stats.code}`

  return (
    <div className="referral-dashboard">
      <header className="referral-dashboard-header">
        <h1 className="referral-dashboard-title">
          🎁 Tu Dashboard de Referidos
        </h1>
        <p className="referral-dashboard-subtitle">
          Compartí tu link y ganá $1,000 ARS por cada venta
        </p>
      </header>

      <div className="referral-stats-grid">
        <div className="referral-stat-card">
          <div className="referral-stat-icon">👀</div>
          <div className="referral-stat-value">{stats.total_clicks}</div>
          <div className="referral-stat-label">Clics totales</div>
        </div>

        <div className="referral-stat-card highlight">
          <div className="referral-stat-icon">🎵</div>
          <div className="referral-stat-value">{stats.total_conversions}</div>
          <div className="referral-stat-label">Ventas generadas</div>
        </div>

        <div className="referral-stat-card success">
          <div className="referral-stat-icon">💰</div>
          <div className="referral-stat-value">${stats.total_earned_ars.toLocaleString('es-AR')}</div>
          <div className="referral-stat-label">Total ganado</div>
        </div>

        <div className="referral-stat-card">
          <div className="referral-stat-icon">📊</div>
          <div className="referral-stat-value">{stats.conversion_rate.toFixed(1)}%</div>
          <div className="referral-stat-label">Tasa de conversión</div>
        </div>
      </div>

      <div className="referral-share-section">
        <h2 className="referral-section-title">Tu link de referido</h2>
        
        <div className="referral-code-display">
          <div className="referral-code-big">{stats.code}</div>
        </div>

        <div className="referral-url-display">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="referral-url-input-big"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            className="referral-copy-btn-big"
          >
            📋 Copiar link
          </button>
        </div>

        <div className="referral-social-share">
          <button
            onClick={() => {
              const text = `¡Mirá este generador de jingles con IA! 🎵\n\nCreé un jingle profesional para mi marca en 30 segundos, completamente gratis.\n\n${shareUrl}`
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
            }}
            className="referral-share-btn whatsapp"
          >
            📱 Compartir en WhatsApp
          </button>

          <button
            onClick={() => {
              const text = `Acabo de crear un jingle profesional con IA en 30 segundos 🎵\n\nProbalo gratis:`
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
                '_blank'
              )
            }}
            className="referral-share-btn twitter"
          >
            🐦 Compartir en Twitter
          </button>

          <button
            onClick={() => {
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                '_blank'
              )
            }}
            className="referral-share-btn facebook"
          >
            📘 Compartir en Facebook
          </button>
        </div>
      </div>

      <div className="referral-tips">
        <h2 className="referral-section-title">💡 Tips para ganar más</h2>
        
        <div className="referral-tips-list">
          <div className="referral-tip">
            <div className="referral-tip-icon">✅</div>
            <div className="referral-tip-content">
              <h3>Compartí en grupos de WhatsApp</h3>
              <p>Grupos de emprendedores, marketing, o negocios locales son ideales.</p>
            </div>
          </div>

          <div className="referral-tip">
            <div className="referral-tip-icon">✅</div>
            <div className="referral-tip-content">
              <h3>Publicá en redes sociales</h3>
              <p>Mostrá tu jingle en historias de Instagram, TikTok, y etiquetá amigos.</p>
            </div>
          </div>

          <div className="referral-tip">
            <div className="referral-tip-icon">✅</div>
            <div className="referral-tip-content">
              <h3>Enviá emails personalizados</h3>
              <p>Contactá a conocidos con negocios que puedan beneficiarse.</p>
            </div>
          </div>

          <div className="referral-tip">
            <div className="referral-tip-icon">✅</div>
            <div className="referral-tip-content">
              <h3>Participá en comunidades</h3>
              <p>Reddit, Facebook Groups, Discord de emprendedores.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="referral-footer-cta">
        <Link href="/" className="cta-btn-big">
          🎵 Crear otro jingle
        </Link>
      </div>
    </div>
  )
}

export default function MisReferidosPage() {
  return (
    <Suspense fallback={
      <div className="referral-dashboard">
        <div className="referral-dashboard-loading">Cargando tu dashboard...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
