'use client'
// src/app/page.tsx  — Pantalla 1: Formulario

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'

const GENRES = [
  { id: 'Pop', emoji: '🎹', label: 'Pop' },
  { id: 'Cumbia', emoji: '🎸', label: 'Cumbia' },
  { id: 'Folklore', emoji: '🪗', label: 'Folklore' },
  { id: 'Trap AR', emoji: '🔥', label: 'Trap AR' },
  { id: 'Reggaetón', emoji: '💃', label: 'Reggaetón' },
  { id: 'Cuarteto', emoji: '🎷', label: 'Cuarteto' },
]

const MOODS = ['Alegre 🌟', 'Emotivo 💛', 'Energético ⚡', 'Divertido 😄', 'Premium ✨']

export default function HomePage() {
  const router = useRouter()

  const [brandName, setBrandName] = useState('')
  const [brandDescription, setBrandDescription] = useState('')
  const [brandLocation, setBrandLocation] = useState('')
  const [genre, setGenre] = useState('Pop')
  const [moods, setMoods] = useState<string[]>(['Alegre 🌟'])
  const [duration, setDuration] = useState<15 | 30>(30)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleMood = (m: string) => {
    setMoods(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  const handleSubmit = async () => {
    if (!brandName.trim()) { setError('Ingresá el nombre de tu marca'); return }
    if (moods.length === 0) { setError('Elegí al menos un tono'); return }
    setError('')
    setLoading(true)

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
          brandDescription: brandDescription.trim(),
          brandLocation: brandLocation.trim(),
          genre,
          moods,
          durationSeconds: duration,
          sessionToken,
        }),
      })

      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Error al generar'); return }

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
      <div className="form-screen">
        <h1 className="form-headline">
          Creá la <em>canción</em><br />de tu marca
        </h1>
        <p className="form-subline">
          Escuchás gratis. Solo pagás cuando querés descargar. Sin registro, sin vueltas.
        </p>

        {error && <div className="error-box">{error}</div>}

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
          <label className="form-label">¿Qué hacés o vendés?</label>
          <div className="input-row">
            <input
              className="input-field"
              placeholder="Ej: Tortas artesanales"
              value={brandDescription}
              onChange={e => setBrandDescription(e.target.value)}
            />
            <input
              className="input-field"
              placeholder="Ej: Palermo, CABA"
              value={brandLocation}
              onChange={e => setBrandLocation(e.target.value)}
            />
          </div>
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

        <div className="form-section">
          <label className="form-label">¿Qué sensación querés transmitir?</label>
          <div className="mood-row">
            {MOODS.map(m => (
              <button
                key={m}
                className={`mood-pill${moods.includes(m) ? ' sel' : ''}`}
                onClick={() => toggleMood(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Duración</label>
          <div className="dur-row">
            {([15, 30] as const).map(d => (
              <div
                key={d}
                className={`dur-pill${duration === d ? ' sel' : ''}`}
                onClick={() => setDuration(d)}
              >
                <div className="dur-pill-name">{d} seg</div>
                <div className="dur-pill-desc">{d === 15 ? 'Stories / Reels' : 'Redes / Radio'}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="generate-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? '⏳ Iniciando…' : '🎵 Generar mi canción gratis'}
        </button>
        <p className="generate-btn-note">
          Escuchás la canción completa <strong>sin pagar nada</strong>. Solo pagás si la querés descargar.
        </p>
      </div>
    </>
  )
}
