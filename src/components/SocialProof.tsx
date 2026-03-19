'use client'

import { useEffect, useState } from 'react'

const PROOF_MESSAGES = [
  { icon: '🎵', text: 'Juan de Palermo generó su jingle', time: '2 min' },
  { icon: '🎸', text: 'María de Córdoba descargó su canción', time: '5 min' },
  { icon: '🎹', text: 'Carlos de Rosario creó 2 versiones', time: '8 min' },
  { icon: '🎷', text: 'Ana de Mendoza generó un jingle Rock', time: '12 min' },
  { icon: '🪘', text: 'Diego de La Plata hizo una Cumbia', time: '15 min' },
  { icon: '🎺', text: 'Laura de Tucumán generó su canción', time: '18 min' },
  { icon: '🎶', text: 'Pablo de Salta descargó su jingle', time: '22 min' },
]

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Show first notification after 3 seconds
    const initialTimer = setTimeout(() => {
      setShow(true)
    }, 3000)

    // Rotate notifications every 8 seconds
    const interval = setInterval(() => {
      setShow(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PROOF_MESSAGES.length)
        setShow(true)
      }, 300)
    }, 8000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const current = PROOF_MESSAGES[currentIndex]

  return (
    <div className={`social-proof${show ? ' show' : ''}`}>
      <div className="social-proof-icon">{current.icon}</div>
      <div className="social-proof-content">
        <div className="social-proof-text">{current.text}</div>
        <div className="social-proof-time">Hace {current.time}</div>
      </div>
      <div className="social-proof-indicator">🔴</div>
    </div>
  )
}
