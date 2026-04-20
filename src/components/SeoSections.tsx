// src/components/SeoSections.tsx — Server Component
// Contenido SEO estático: Cómo funciona + Beneficios + FAQs
// Al ser un Server Component, React lo incluye en el payload RSC,
// garantizando hidratación estable independiente del ciclo de HomeForm.

import Link from 'next/link'

const GENRES = [
  { href: '/jingle-de-cumbia',    emoji: '🪘', label: 'Cumbia',    desc: 'El ritmo más popular de Argentina' },
  { href: '/jingle-de-pop',       emoji: '🎹', label: 'Pop',       desc: 'El género más versátil para cualquier marca' },
  { href: '/jingle-de-folklore',  emoji: '🎸', label: 'Folklore',  desc: 'Identidad argentina, conexión regional' },
  { href: '/jingle-de-reggaeton', emoji: '🎤', label: 'Reggaetón', desc: 'Para marcas juveniles y dinámicas' },
  { href: '/jingle-de-cuarteto',  emoji: '🎷', label: 'Cuarteto',  desc: 'El ritmo del interior del país' },
  { href: '/jingle-de-trap',      emoji: '🎧', label: 'Trap',      desc: 'Moderno y urbano para marcas de tendencia' },
]

const BUSINESS_TYPES = [
  { href: '/jingle-para-peluqueria',   emoji: '✂️', label: 'Peluquería',   desc: 'Para peluquerías y barberías' },
  { href: '/jingle-para-ferreteria',   emoji: '🔧', label: 'Ferretería',   desc: 'Para ferreterías y corralones' },
  { href: '/jingle-para-almacen',      emoji: '🛒', label: 'Almacén',      desc: 'Para almacenes y despensas' },
  { href: '/jingle-para-restaurant',   emoji: '🍖', label: 'Restaurante',  desc: 'Para parrillas, pizzerías y delivery' },
  { href: '/jingle-para-emprendimiento', emoji: '🚀', label: 'Emprendimiento', desc: 'Para cualquier tipo de emprendimiento' },
  { href: '/jingle-para-radio-fm',     emoji: '📻', label: 'Radio FM',     desc: 'Cuñas listas para emitir en radio' },
]

export default function SeoSections() {
  return (
    <div className="seo-sections-wrap">
      <section className="seo-section" aria-label="Géneros disponibles">
        <h2 className="seo-section-title">Elegí el género ideal para tu marca</h2>
        <ul className="seo-genres-grid">
          {GENRES.map(({ href, emoji, label, desc }) => (
            <li key={href}>
              <Link href={href} className="seo-genre-card">
                <span className="seo-genre-emoji">{emoji}</span>
                <strong className="seo-genre-label">{label}</strong>
                <span className="seo-genre-desc">{desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="seo-section" aria-label="Jingles por tipo de negocio">
        <h2 className="seo-section-title">Jingles para cada tipo de negocio</h2>
        <ul className="seo-genres-grid">
          {BUSINESS_TYPES.map(({ href, emoji, label, desc }) => (
            <li key={href}>
              <Link href={href} className="seo-genre-card">
                <span className="seo-genre-emoji">{emoji}</span>
                <strong className="seo-genre-label">{label}</strong>
                <span className="seo-genre-desc">{desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="seo-section" aria-label="Cómo funciona Cancionesia">
        <h2 className="seo-section-title">¿Cómo funciona el generador de canciones con IA?</h2>
        <ol className="seo-steps">
          <li className="seo-step">
            <span className="seo-step-num">1</span>
            <div>
              <strong>Ingresá el nombre de tu marca y la letra</strong>
              <p>Escribí lo que querés que diga tu canción, o dejá que la IA genere la letra por vos en segundos.</p>
            </div>
          </li>
          <li className="seo-step">
            <span className="seo-step-num">2</span>
            <div>
              <strong>Elegí el estilo musical</strong>
              <p>Cumbia, Pop, Reggaetón, Folklore, Trap y más. La IA adapta la música al género que mejor represente a tu negocio.</p>
            </div>
          </li>
          <li className="seo-step">
            <span className="seo-step-num">3</span>
            <div>
              <strong>Escuchás las 2 versiones gratis</strong>
              <p>En menos de 2 minutos tenés dos versiones distintas para comparar. Solo pagás si querés descargar la que más te guste.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="seo-section" aria-label="Beneficios del marketing auditivo para marcas">
        <h2 className="seo-section-title">Por qué tu marca necesita una canción propia</h2>
        <ul className="seo-benefits">
          <li>
            <strong>Recordación hasta 9 veces mayor</strong> — El cerebro procesa la música de forma emocional. Una marca con canción se recuerda mucho más que una sin música.
          </li>
          <li>
            <strong>Diferenciación instantánea</strong> — En un feed de redes sociales saturado, una canción hace que tu contenido se distinga a los 3 segundos.
          </li>
          <li>
            <strong>Consistencia de marca en todos los canales</strong> — Usá la misma canción en Instagram, TikTok, WhatsApp y radio local para construir una identidad sonora reconocible.
          </li>
          <li>
            <strong>Sin costos de estudio ni músicos</strong> — Una canción profesional grabada en estudio puede costar entre $50,000 y $300,000 ARS. Con Cancionesia lo obtenés desde $8,900 en minutos.
          </li>
        </ul>
      </section>

      <section className="seo-section" aria-label="Preguntas frecuentes sobre el generador de canciones con IA">
        <h2 className="seo-section-title">Preguntas frecuentes</h2>
        <dl className="seo-faq">
          <div className="seo-faq-item" itemScope itemType="https://schema.org/Question">
            <dt itemProp="name">¿Necesito conocimientos musicales para usar Cancionesia?</dt>
            <dd itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <span itemProp="text">No. Solo necesitás escribir el nombre de tu marca y una descripción de tu negocio. La IA se encarga de componer la música, armonías y producción completa automáticamente.</span>
            </dd>
          </div>
          <div className="seo-faq-item" itemScope itemType="https://schema.org/Question">
            <dt itemProp="name">¿Puedo usar la canción en publicidad y redes sociales?</dt>
            <dd itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <span itemProp="text">Sí. Al descargar tu canción obtenés una licencia comercial que te permite usarla en Instagram, TikTok, YouTube, radio local, y cualquier otro medio publicitario sin restricciones.</span>
            </dd>
          </div>
          <div className="seo-faq-item" itemScope itemType="https://schema.org/Question">
            <dt itemProp="name">¿Cuánto tarda en generarse mi canción?</dt>
            <dd itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <span itemProp="text">Entre 1 y 3 minutos. La IA genera dos versiones distintas de tu canción en paralelo para que puedas comparar y elegir la que más te guste.</span>
            </dd>
          </div>
          <div className="seo-faq-item" itemScope itemType="https://schema.org/Question">
            <dt itemProp="name">¿Qué pasa si no me gusta el resultado?</dt>
            <dd itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <span itemProp="text">Podés generar tantas versiones como quieras de forma gratuita. Solo pagás cuando encontrás una canción que realmente te convenza y querés descargarla en calidad completa.</span>
            </dd>
          </div>
          <div className="seo-faq-item" itemScope itemType="https://schema.org/Question">
            <dt itemProp="name">¿En qué formatos puedo descargar la canción?</dt>
            <dd itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <span itemProp="text">El archivo descargable es MP3 a 320 kbps, el estándar de calidad de producción profesional, listo para usar en cualquier plataforma o software de edición de video.</span>
            </dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
