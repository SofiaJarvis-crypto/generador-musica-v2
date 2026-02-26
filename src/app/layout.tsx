// src/app/layout.tsx
import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Generador de Música para Marcas',
  description: 'Creá el jingle de tu marca con IA. Escuchás gratis, solo pagás si la querés descargar.',
  openGraph: {
    title: 'Generador de Música para Marcas',
    description: 'Jingles personalizados para tu negocio en minutos.',
    locale: 'es_AR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="page-wrap">
          {children}
        </div>
      </body>
    </html>
  )
}
