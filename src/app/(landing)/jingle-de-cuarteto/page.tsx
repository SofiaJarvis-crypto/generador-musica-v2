import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle de Cuarteto para tu Negocio | Creá con IA | Cancionesia',
  description: 'Creá un jingle de cuarteto cordobés para tu negocio con inteligencia artificial. El ritmo de Córdoba para tu publicidad. Escuchás gratis, sin registro.',
  keywords: 'jingle de cuarteto, cuarteto para publicidad, jingle cuarteto cordobes, música cuarteto publicidad, jingle cuarteto negocio córdoba',
  openGraph: {
    title: 'Jingle de Cuarteto para tu Negocio | Cancionesia',
    description: 'Creá un jingle de cuarteto cordobés con IA en 2 minutos. El ritmo de Córdoba en tu publicidad. Gratis y sin registro.',
    url: '/jingle-de-cuarteto',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-de-cuarteto',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es el cuarteto y por qué funciona en publicidad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El cuarteto es un género musical nacido en Córdoba, Argentina, caracterizado por su ritmo festivo, enérgico y bailable. En la publicidad funciona porque genera inmediata alegría y familiaridad en el público cordobés y del interior del país, creando una conexión emocional muy fuerte con la identidad regional.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Solo sirve para negocios de Córdoba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Principalmente, sí: el cuarteto tiene su audiencia natural en Córdoba y las provincias vecinas. Pero también puede funcionar a nivel nacional para marcas que quieran proyectar una imagen festiva, popular y argentina, similar al efecto del folklore o la cumbia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de negocios funcionan mejor con cuarteto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Almacenes, supermercados, tiendas de ropa, organizadores de eventos, salones de fiestas, locales de comida, ferreterías y cualquier negocio popular en Córdoba que quiera conectar con su comunidad local.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usarlo en radio cordobesa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La licencia comercial incluida en la descarga te permite emitirlo en radios AM y FM de Córdoba y del interior, además de en redes sociales, publicidad digital y cualquier otro medio.',
      },
    },
  ],
}

export default function JingleDeCuarteto() {
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
          Jingle de Cuarteto<br />
          <span className="landing-gradient">para tu Negocio en Córdoba</span>
        </h1>

        <p className="landing-lead">
          El ritmo más festivo de Argentina, en el jingle de tu marca.<br />
          Crealo con IA en 2 minutos. Sin conocimientos musicales. Sin registro.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🎷 Crear mi Jingle de Cuarteto
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
        <h2 className="landing-h2">El cuarteto: el corazón sonoro de Córdoba</h2>
        <p className="landing-text">
          El <strong>cuarteto cordobés</strong> es más que un género musical: es la identidad sonora de toda una provincia. Desde La Mona Jiménez hasta Rodrigo, el cuarteto tiene una energía festiva, popular y contagiosa que pocos géneros pueden igualar.
        </p>
        <p className="landing-text">
          Para un negocio en Córdoba o el interior argentino, usar el cuarteto en la publicidad es una apuesta directa a la conexión emocional. El ritmo genera alegría instantánea, familiaridad y recordación. Tu cliente no solo escucha el jingle: lo siente.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Negocios que brillan con cuarteto</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🎉</div>
            <h3 className="landing-step-title">Eventos y Fiestas</h3>
            <p className="landing-step-text">
              Salones de eventos, empresas de catering, organizadores de fiestas populares. El cuarteto es sinónimo de fiesta en Córdoba.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🛍️</div>
            <h3 className="landing-step-title">Comercios Populares</h3>
            <p className="landing-step-text">
              Almacenes, tiendas de ropa, ferreterías y locales de barrio. El cuarteto conecta con la identidad del vecino cordobés.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">📻</div>
            <h3 className="landing-step-title">Radio y Medios Locales</h3>
            <p className="landing-step-text">
              Un jingle de cuarteto en radio FM cordobesa tiene recordación garantizada. El ritmo hace que el oyente preste atención.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá tu jingle de cuarteto en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos de tu negocio</h3>
            <p className="landing-step-text">
              Nombre, ubicación (ciudad/barrio de Córdoba), qué ofrecés y el mensaje que querés transmitir.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí Cuarteto</h3>
            <p className="landing-step-text">
              Seleccioná "Cuarteto" en el generador. La IA crea el ritmo y la letra para tu marca.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Escuchá y descargá</h3>
            <p className="landing-step-text">
              Obtenés 2 versiones únicas. Descargás con licencia comercial por $8,900 ARS pago único.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Córdoba tiene un ritmo. Que sea el de tu negocio.</h2>
        <p className="landing-text">
          En 2 minutos tenés tu jingle de cuarteto profesional, listo para radio y redes.
        </p>
        <Link href="/" className="landing-cta-primary">
          🎷 Crear mi Jingle de Cuarteto Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué es el cuarteto y por qué funciona en publicidad?</summary>
            <div className="landing-faq-answer">
              El cuarteto es un género musical nacido en Córdoba, Argentina, caracterizado por su ritmo festivo, enérgico y bailable. En la publicidad funciona porque genera inmediata alegría y familiaridad en el público cordobés, creando una conexión emocional muy fuerte con la identidad regional.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Solo sirve para negocios de Córdoba?</summary>
            <div className="landing-faq-answer">
              Principalmente, sí: el cuarteto tiene su audiencia natural en Córdoba y las provincias vecinas. Pero también puede funcionar a nivel nacional para marcas que quieran proyectar una imagen festiva, popular y argentina.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué tipo de negocios funcionan mejor con cuarteto?</summary>
            <div className="landing-faq-answer">
              Almacenes, supermercados, tiendas de ropa, organizadores de eventos, salones de fiestas, locales de comida, ferreterías y cualquier negocio popular en Córdoba que quiera conectar con su comunidad local.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usarlo en radio cordobesa?</summary>
            <div className="landing-faq-answer">
              Sí. La licencia comercial incluida en la descarga te permite emitirlo en radios AM y FM de Córdoba y del interior, además de en redes sociales, publicidad digital y cualquier otro medio.
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
            <Link href="/jingle-de-folklore" className="landing-footer-link">Jingle de Folklore</Link>
            <Link href="/jingle-de-cumbia" className="landing-footer-link">Jingle de Cumbia</Link>
            <Link href="/jingle-de-pop" className="landing-footer-link">Jingle de Pop</Link>
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
