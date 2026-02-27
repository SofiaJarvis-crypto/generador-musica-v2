'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Nav from '@/components/Nav'

// src/app/descarga/page.tsx — Pantalla 4: Descarga post-pago

export const dynamic = 'force-dynamic'

export default function DescargaPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'ready' | 'preparing' | 'error'>('loading')
  const [brandName, setBrandName] = useState('tu marca')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!token) { setStatus('error'); setErrorMsg('Token de descarga inválido.'); return }

    // Validate token by calling our download endpoint (HEAD-like check)
    fetch(`/api/download?token=${token}&check=1`)
      .then(async res => {
        const data = await res.json()
        if (res.status === 202) {
          setStatus('preparing')
        } else if (!res.ok) {
          setStatus('error')
          setErrorMsg(data.error || 'Error al validar el pago.')
        } else {
          setStatus('ready')
          if (data.brandName) setBrandName(data.brandName)
        }
      })
      .catch(() => { setStatus('error'); setErrorMsg('Error de conexión.') })
  }, [token])

  const handleDownload = () => {
    window.location.href = `/api/download?token=${token}`
  }

  const brandSlug = brandName.toLowerCase().replace(/[^a-z0-9]/gi, '_').slice(0, 30)

  const shareIG = () => {
    // Instagram doesn't have a direct share URL for audio; copy link instead
    navigator.clipboard?.writeText(window.location.href)
    alert('Link copiado. Podés compartirlo en tus stories como link.')
  }

  const shareWA = () => {
    const text = encodeURIComponent(`🎵 ¡Mi marca ya tiene su canción! Escuchá el jingle de ${brandName}`)
    window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(window.location.href)}`)
  }

  return (
    <>
      <Nav step={4} />
      <div className="success-screen">
        {status === 'loading' && (
          <>
            <div className="gen-visual" style={{ margin: '0 auto 32px' }}><div className="gen-icon">⏳</div></div>
            <h2 className="gen-title">Verificando tu pago…</h2>
          </>
        )}

        {status === 'preparing' && (
          <>
            <div className="success-icon">🎵</div>
            <h2 className="success-title">Pago confirmado</h2>
            <p className="success-sub">Tu MP3 se está preparando, ya casi está listo.</p>
            <div className="preparing-box">
              <div className="gen-icon spin" style={{ display: 'inline-block' }}>⚙️</div>
              <p>El archivo se finaliza en unos segundos. Recargá la página si tarda más de 1 minuto.</p>
            </div>
            <button className="generate-btn" onClick={() => window.location.reload()}>
              🔄 Verificar si está listo
            </button>
          </>
        )}

        {status === 'ready' && (
          <>
            <div className="success-icon">🎉</div>
            <h2 className="success-title">¡Listo para usar!</h2>
            <p className="success-sub">
              Tu canción está lista. Usala en redes, publicidades y donde quieras.
            </p>

            <div className="success-files">
              <div className="file-item">
                <span className="file-icon">🎵</span>
                {brandSlug}_jingle.mp3
                <span className="file-badge">MP3</span>
              </div>
            </div>

            <button className="download-btn" onClick={handleDownload}>
              ⬇ Descargar MP3
            </button>

            <div className="share-row">
              <button className="share-btn" onClick={shareIG}>📲 Compartir en IG</button>
              <button className="share-btn" onClick={shareWA}>💬 Enviar por WhatsApp</button>
            </div>

            <p style={{ marginTop: 32, fontSize: 13, color: 'var(--text-dim)', fontWeight: 300, lineHeight: 1.6 }}>
              ¿Necesitás otra versión?<br />
              <span
                style={{ color: 'var(--amber)', cursor: 'pointer' }}
                onClick={() => router.push('/')}
              >
                Crear nueva canción →
              </span>
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="success-icon">😕</div>
            <h2 className="success-title">Algo salió mal</h2>
            <p className="success-sub">{errorMsg}</p>
            <div className="error-box">{errorMsg}</div>
            <button className="generate-btn" onClick={() => router.push('/')}>
              ← Volver al inicio
            </button>
            <p style={{ marginTop: 20, fontSize: 13, color: 'var(--text-dim)' }}>
              Si ya pagaste y hay un problema, contactanos a{' '}
              <a href="mailto:soporte@tudominio.com" style={{ color: 'var(--amber)' }}>
                soporte@tudominio.com
              </a>
            </p>
          </>
        )}
      </div>
    </>
  )
}
