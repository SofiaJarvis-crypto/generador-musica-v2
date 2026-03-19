'use client'

import { useEffect, useState } from 'react'

interface ExitIntentPopupProps {
  onClose: () => void
  onGenerate: () => void
}

export default function ExitIntentPopup({ onClose, onGenerate }: ExitIntentPopupProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Animate in after mount
    const timer = setTimeout(() => setShow(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300) // Wait for animation
  }

  const handleGenerate = () => {
    setShow(false)
    setTimeout(onGenerate, 300)
  }

  return (
    <div className={`exit-popup-overlay${show ? ' show' : ''}`} onClick={handleClose}>
      <div className={`exit-popup${show ? ' show' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="exit-popup-close" onClick={handleClose}>✕</button>
        
        <div className="exit-popup-icon">🎁</div>
        
        <h2 className="exit-popup-title">¡Esperá!</h2>
        
        <p className="exit-popup-text">
          Generá tu jingle <strong>GRATIS</strong> ahora mismo.<br />
          No pedimos email ni tarjeta.
        </p>

        <div className="exit-popup-features">
          <div className="exit-popup-feature">✅ 2 versiones únicas</div>
          <div className="exit-popup-feature">✅ Generación instantánea</div>
          <div className="exit-popup-feature">✅ Sin compromiso</div>
        </div>

        <button className="exit-popup-cta" onClick={handleGenerate}>
          🎵 Generar mi jingle gratis
        </button>

        <button className="exit-popup-dismiss" onClick={handleClose}>
          No, gracias
        </button>
      </div>
    </div>
  )
}
