'use client'
// src/app/pago-fallido/page.tsx

import { useSearchParams, useRouter } from 'next/navigation'
import Nav from '@/components/Nav'

export default function PagoFallidoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const generationId = searchParams.get('generationId')

  return (
    <>
      <Nav />
      <div className="success-screen">
        <div className="success-icon">😕</div>
        <h2 className="success-title">El pago no se completó</h2>
        <p className="success-sub">
          No se realizó ningún cargo. Podés volver a intentarlo cuando quieras.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
          {generationId && (
            <button
              className="generate-btn"
              onClick={() => router.push(`/escuchar/${generationId}`)}
            >
              ← Volver a escuchar mi canción
            </button>
          )}
          <button
            className="share-btn"
            style={{ maxWidth: '100%' }}
            onClick={() => router.push('/')}
          >
            Crear una nueva canción
          </button>
        </div>
      </div>
    </>
  )
}
