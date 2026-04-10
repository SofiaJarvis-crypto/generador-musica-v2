// src/app/page.tsx — Server Component
// El middleware (Edge) asigna la variante del A/B test vía cookie estable (30 días).
// HomeForm (Client Component) la lee de document.cookie tras el mount.
// SeoSections se renderiza como RSC estático: hidratación confiable sin conflictos de estado.

import HomeForm from '@/components/HomeForm'
import SeoSections from '@/components/SeoSections'

export default function HomePage() {
  return (
    <>
      <HomeForm />
      <SeoSections />
    </>
  )
}
