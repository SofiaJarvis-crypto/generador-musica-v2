'use client'

import { useEffect, useState, useRef, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Nav from '@/components/Nav'

// src/app/generando/[id]/page.tsx — Pantalla 2: Loading con polling

export const dynamic = 'force-dynamic'

const GEN_STEPS = [
  { id: 'analyze', label: 'Analizando tu marca' },
  { id: 'lyrics',  label: 'Escribiendo la letra' },
  { id: 'compose', label: 'Componiendo la melodía' },
  { id: 'master',  label: 'Masterizando el audio' },
]

type StepState = 'pending' | 'active' | 'done'

export default function GenerandoPage() {
  const router = useRouter()
  const params = useParams()
  const generationId = params.id as string

  const [stepStates, setStepStates] = useState<StepState[]>(['done', 'active', 'pending', 'pending'])
  const [progress, setProgress] = useState(10)
  const [error, setError] = useState('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  // Animate the UI steps independently of actual API status
  useEffect(() => {
    const timers = [
      setTimeout(() => setStepStates(['done', 'done', 'active', 'pending']), 8000),
      setTimeout(() => setStepStates(['done', 'done', 'done', 'active']), 20000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Mostrar form de email a los 8 segundos
  useEffect(() => {
    if (emailSaved) return
    const t = setTimeout(() => setShowEmailForm(true), 8000)
    return () => clearTimeout(t)
  }, [emailSaved])

  const handleEmailCapture = async (e: FormEvent) => {
    e.preventDefault()
    if (!emailInput || !emailInput.includes('@')) return
    setEmailLoading(true)
    try {
      const res = await fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, generationId, source: 'generando_page' }),
      })
      if (res.ok) setEmailSaved(true)
    } catch {
      // silencioso
    } finally {
      setEmailLoading(false)
    }
  }

  // Progress bar animation
  useEffect(() => {
    animIntervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 90) return 90
        return p + (90 - p) * 0.04
      })
    }, 1000)
    return () => { if (animIntervalRef.current) clearInterval(animIntervalRef.current) }
  }, [])

  // Poll our own API every 3 seconds
  useEffect(() => {
    if (!generationId) return

    const poll = async () => {
      try {
        const res = await fetch(`/api/status/${generationId}`)
        if (!res.ok) return

        const data = await res.json()

        if (data.suno_status === 'stream_ready' || data.suno_status === 'complete') {
          setProgress(100)
          setStepStates(['done', 'done', 'done', 'done'])
          if (intervalRef.current) clearInterval(intervalRef.current)
          if (animIntervalRef.current) clearInterval(animIntervalRef.current)
          // Small delay for the "100%" to show
          setTimeout(() => router.push(`/escuchar/${generationId}`), 600)
        } else if (data.suno_status === 'error') {
          setError(data.error_message || 'Hubo un error al generar la canción. Intentá de nuevo.')
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      } catch {
        // Network error — keep polling
      }
    }

    poll() // immediate first check
    intervalRef.current = setInterval(poll, 3000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [generationId, router])

  return (
    <>
      <Nav step={2} />
      <div className="generating-screen">
        <div className="gen-visual">
          <div className="gen-icon">🎵</div>
        </div>

        <h2 className="gen-title">Componiendo tu canción…</h2>
        <p className="gen-sub">
          La IA está trabajando en tu canción personalizada.<br />
          Tarda entre 30 segundos y 2 minutos.
        </p>

        {error ? (
          <>
            <div className="error-box">{error}</div>
            <button
              className="generate-btn"
              style={{ maxWidth: 320, margin: '0 auto' }}
              onClick={() => router.push('/')}
            >
              ← Volver a intentar
            </button>
          </>
        ) : (
          <>
            <div className="gen-steps">
              {GEN_STEPS.map((step, i) => {
                const state = stepStates[i]
                return (
                  <div key={step.id} className={`gen-step ${state}`}>
                    <span className="gen-step-icon">
                      {state === 'done' ? '✅' : state === 'active' ? <span className="spin">⚙️</span> : '⏳'}
                    </span>
                    {step.label}
                    {state === 'done' && <span style={{ marginLeft: 'auto', color: 'var(--amber)', fontSize: 12 }}>✓</span>}
                  </div>
                )
              })}
            </div>

            <div className="gen-progress">
              <div
                className="gen-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Email capture mientras espera */}
            {showEmailForm && !emailSaved && (
              <div className="email-capture-banner" style={{ marginTop: 28 }}>
                <div className="email-capture-icon">📩</div>
                <div className="email-capture-text">
                  <strong>¿Querés que te mandemos la canción?</strong>
                  <span>Dejá tu email y te la enviamos en cuanto esté lista.</span>
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
                    {emailLoading ? '…' : 'Avisame'}
                  </button>
                </form>
                <button className="email-capture-dismiss" onClick={() => setShowEmailForm(false)}>✕</button>
              </div>
            )}

            {emailSaved && (
              <p style={{ textAlign: 'center', color: 'var(--amber)', marginTop: 20, fontSize: 14 }}>
                ✅ ¡Listo! Te avisamos cuando esté lista.
              </p>
            )}
          </>
        )}
      </div>
    </>
  )
}
