'use client'

import { useEffect, useState } from 'react'

interface ReferralShareProps {
  generationId: string
}

export default function ReferralShare({ generationId }: ReferralShareProps) {
  const [referralCode, setReferralCode] = useState<string>('')
  const [shareUrl, setShareUrl] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateReferralCode()
  }, [generationId])

  const generateReferralCode = async () => {
    try {
      const res = await fetch('/api/referrals/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ generationId }),
      })

      if (res.ok) {
        const data = await res.json()
        setReferralCode(data.code)
        setShareUrl(data.shareUrl)
      }
    } catch (error) {
      console.error('Failed to generate referral code:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const shareWhatsApp = () => {
    const text = `¡Mirá este generador de jingles con IA! 🎵\n\nCreé un jingle profesional para mi marca en 30 segundos, completamente gratis.\n\n${shareUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const shareTwitter = () => {
    const text = `Acabo de crear un jingle profesional con IA en 30 segundos 🎵\n\nProbalo gratis:`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    )
  }

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    )
  }

  if (loading) {
    return (
      <div className="referral-share">
        <div className="referral-loading">Generando tu link de referido...</div>
      </div>
    )
  }

  return (
    <div className="referral-share">
      <div className="referral-header">
        <div className="referral-icon">🎁</div>
        <div className="referral-title">Compartí y ganá</div>
      </div>

      <p className="referral-description">
        Por cada amigo que compre con tu link, ganás <strong>$1,000 ARS</strong> de crédito.
      </p>

      <div className="referral-code-box">
        <div className="referral-code-label">Tu código:</div>
        <div className="referral-code">{referralCode}</div>
      </div>

      <div className="referral-url-box">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="referral-url-input"
        />
        <button
          onClick={copyToClipboard}
          className="referral-copy-btn"
        >
          {copied ? '✓ Copiado' : '📋 Copiar'}
        </button>
      </div>

      <div className="referral-social">
        <button onClick={shareWhatsApp} className="referral-social-btn whatsapp">
          <span className="referral-social-icon">📱</span>
          WhatsApp
        </button>
        <button onClick={shareTwitter} className="referral-social-btn twitter">
          <span className="referral-social-icon">🐦</span>
          Twitter
        </button>
        <button onClick={shareFacebook} className="referral-social-btn facebook">
          <span className="referral-social-icon">📘</span>
          Facebook
        </button>
      </div>

      <div className="referral-footer">
        💡 <strong>Tip:</strong> Compartí tu jingle en historias y etiquetá amigos
      </div>

      <a 
        href={`/mis-referidos?code=${referralCode}`}
        className="referral-dashboard-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        📊 Ver mi dashboard completo →
      </a>
    </div>
  )
}
