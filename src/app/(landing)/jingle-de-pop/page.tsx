import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle de Pop para tu Negocio | Creá con IA | Cancionesia',
  description: 'Creá un jingle de pop para tu negocio con inteligencia artificial. El género más versátil para cualquier tipo de marca. Escuchás gratis, sin registro.',
  keywords: 'jingle de pop, jingle pop argentina, música pop publicidad, crear jingle pop, jingle pop negocio',
  openGraph: {
    title: 'Jingle de Pop para tu Negocio | Cancionesia',
    description: 'Creá un jingle de pop con IA en 2 minutos. El género más versátil para tu marca. Gratis y sin registro.',
    url: '/jingle-de-pop',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-de-pop',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Por qué el pop es el mejor género para jingles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El pop está diseñado para ser accesible y memorable para la mayor cantidad de personas posible. Sus estructuras de verso-estribillo, melodías simples y ganchos repetitivos lo convierten en el género perfecto para jingles que deben ser recordados por audiencias amplias y diversas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El pop funciona para todo tipo de negocios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El pop es el género más versátil. Funciona para farmacias, peluquerías, inmobiliarias, restaurantes, tiendas, servicios profesionales, educación, salud, y prácticamente cualquier rubro. Si no sabés qué género elegir, el pop es la opción más segura.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo pedir un estilo de pop específico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Podés orientar el jingle hacia pop romántico, pop animado, pop infantil, pop corporativo, o pop moderno. Al describir tu marca, incluí el tono que querés: alegre, cálido, profesional, juvenil, etc.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es diferente al jingle que haría un compositor humano?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La IA genera composiciones originales en segundos. Un compositor humano puede tardar días y cobrar entre $30,000 y $150,000 ARS. Con Cancionesia, el resultado es profesional, personalizado y listo en 2 minutos por $8,900 ARS.',
      },
    },
  ],
}

export default function JingleDePop() {
  return (
    <div className="landing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="landing-nav">
        <Link href="/" className="landing-logo">
          🎵 Cancionesia
        </Link>
        <Link href="/" className="landing-nav-cta">
          Generar Gratis
        </Link>
      </nav>

      <header className="landing-hero">
        <h1 className="landing-h1">
          Jingle de Pop<br />
          <span className="landing-gradient">para tu Negocio</span>
        </h1>

        <p className="landing-lead">
          El género más versátil y memorable para cualquier tipo de marca.<br />
          Crealo con IA en 2 minutos. Sin conocimientos musicales. Sin registro.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🎹 Crear mi Jingle de Pop
          </Link>
          <div className="landing-trust-badge">
            ✅ Escuchás gratis • Sin tarjeta de crédito
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">2,100+</div>
            <div className="landing-stat-label">Jingles creados</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">2 min</div>
            <div className="landing-stat-label">Tiempo promedio</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">$8,900</div>
            <div className="landing-stat-label">Pago único</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">El pop: el lenguaje universal de la publicidad</h2>
        <p className="landing-text">
          No es casualidad que los jingles más famosos del mundo —Coca-Cola, McDonald&apos;s, HSBC— estén escritos en pop. El <strong>pop</strong> está diseñado desde su origen para ser accesible, memorable y agradable para la mayor cantidad de personas posible.
        </p>
        <p className="landing-text">
          Sus características —melodías pegadizas, estribillos que se repiten, ritmos simples y positivos— son exactamente lo que necesita un jingle efectivo. Si querés que tu marca quede grabada en la mente de tu audiencia, el pop es tu mejor aliado.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">¿Cuándo elegir un jingle de pop?</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🏥</div>
            <h3 className="landing-step-title">Salud y Bienestar</h3>
            <p className="landing-step-text">
              Farmacias, clínicas, nutricionistas, gimnasios. El pop transmite energía positiva y confianza sin agresividad.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🏠</div>
            <h3 className="landing-step-title">Hogar y Servicios</h3>
            <p className="landing-step-text">
              Inmobiliarias, constructoras, decoración. El pop comunica calidez y profesionalismo al mismo tiempo.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">📚</div>
            <h3 className="landing-step-title">Educación y Cultura</h3>
            <p className="landing-step-text">
              Colegios, academias, cursos. El pop atrae a familias y transmite valores de aprendizaje y crecimiento.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Cómo crear tu jingle de pop</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Describí tu negocio</h3>
            <p className="landing-step-text">
              Nombre, qué ofrecés, y qué emoción querés generar. ¿Alegría? ¿Confianza? ¿Energía?
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Seleccioná Pop</h3>
            <p className="landing-step-text">
              Elegí "Pop" en nuestro generador. La IA crea letra y música original para tu marca.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Recibís 2 versiones únicas</h3>
            <p className="landing-step-text">
              Escuchás ambas gratis y elegís la que más represente a tu marca. Descargás con licencia comercial.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">¿Listo para tu jingle de pop?</h2>
        <p className="landing-text">
          Miles de negocios ya tienen su canción. En 2 minutos, el tuyo también.
        </p>
        <Link href="/" className="landing-cta-primary">
          🎹 Crear mi Jingle de Pop Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Por qué el pop es el mejor género para jingles?</summary>
            <div className="landing-faq-answer">
              El pop está diseñado para ser accesible y memorable para la mayor cantidad de personas posible. Sus estructuras de verso-estribillo, melodías simples y ganchos repetitivos lo convierten en el género perfecto para jingles que deben ser recordados por audiencias amplias y diversas.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿El pop funciona para todo tipo de negocios?</summary>
            <div className="landing-faq-answer">
              Sí. El pop es el género más versátil. Funciona para farmacias, peluquerías, inmobiliarias, restaurantes, tiendas, servicios profesionales, educación, salud, y prácticamente cualquier rubro. Si no sabés qué género elegir, el pop es la opción más segura.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo pedir un estilo de pop específico?</summary>
            <div className="landing-faq-answer">
              Sí. Podés orientar el jingle hacia pop romántico, pop animado, pop infantil, pop corporativo o pop moderno. Al describir tu marca, incluí el tono que querés: alegre, cálido, profesional, juvenil, etc.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Es diferente al jingle que haría un compositor humano?</summary>
            <div className="landing-faq-answer">
              La IA genera composiciones originales en segundos. Un compositor humano puede tardar días y cobrar entre $30,000 y $150,000 ARS. Con Cancionesia, el resultado es profesional, personalizado y listo en 2 minutos por $8,900 ARS.
            </div>
          </details>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-brand">
            <div className="landing-logo">🎵 Cancionesia</div>
            <p className="landing-footer-text">
              Jingles profesionales con IA.<br />
              Hecho en Argentina 🇦🇷
            </p>
          </div>
          <div className="landing-footer-links">
            <h4 className="landing-footer-title">Más géneros</h4>
            <Link href="/jingle-de-cumbia" className="landing-footer-link">Jingle de Cumbia</Link>
            <Link href="/jingle-de-reggaeton" className="landing-footer-link">Jingle de Reggaetón</Link>
            <Link href="/jingle-de-folklore" className="landing-footer-link">Jingle de Folklore</Link>
            <Link href="/generador-jingles-gratis" className="landing-footer-link">Generador Gratis</Link>
          </div>
        </div>
        <div className="landing-footer-bottom">
          © 2025 Cancionesia. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
