'use client'
// src/components/Nav.tsx
import { useRouter } from 'next/navigation'

interface NavProps {
  step?: 1 | 2 | 3 | 4
}

const STEPS = [
  { n: 1, label: 'Tu marca' },
  { n: 2, label: 'Generando' },
  { n: 3, label: 'Escuchá' },
  { n: 4, label: 'Descargá' },
]

function scrollTo(id: string, focusInput?: boolean) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  if (focusInput) {
    const input = el.querySelector('input, textarea') as HTMLElement | null
    setTimeout(() => input?.focus(), 400)
  }
}

export default function Nav({ step }: NavProps) {
  const router = useRouter()

  return (
    <>
      <nav className="nav">
        <div className="logo" onClick={() => router.push('/')}>
          Generador de<br /><span>Música</span> para <em>Marcas</em>
        </div>
        <div className="nav-right">
          <span className="nav-link" onClick={() => scrollTo('demo-section')}>Ver ejemplos</span>
          <span
            className="nav-link"
            style={{ color: 'var(--amber)', fontWeight: 500 }}
            onClick={() => scrollTo('paso1', true)}
          >
            Es gratis probar →
          </span>
        </div>
      </nav>

      {step && (
        <div className="steps-bar">
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center' }}>
              <div className={`step-item ${step === s.n ? 'active' : step > s.n ? 'done' : ''}`}>
                <div className="step-num">
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className="step-label">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`step-line ${step > s.n ? 'done' : ''}`} />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
