import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle de Cumbia para tu Negocio | Creá tu Jingle con IA | Cancionesia',
  description: 'Creá un jingle de cumbia para tu negocio con inteligencia artificial. Ideal para almacenes, tiendas y negocios populares. Escuchás gratis, sin registro.',
  keywords: 'jingle de cumbia, cumbia para publicidad, jingle cumbia negocio, música cumbia publicidad, jingle cumbia argentina',
  openGraph: {
    title: 'Jingle de Cumbia para tu Negocio | Cancionesia',
    description: 'Creá un jingle de cumbia con IA en 2 minutos. Perfecto para conectar con tu público. Gratis y sin registro.',
    url: '/jingle-de-cumbia',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-de-cumbia',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Por qué elegir cumbia para el jingle de mi negocio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La cumbia es el ritmo más popular de Argentina. Genera inmediata identificación con el público masivo, es pegadiza y fácil de recordar. Un jingle de cumbia conecta emocionalmente con millones de personas en todo el país.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de negocios funcionan mejor con jingles de cumbia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Almacenes, supermercados, ferreterías, tiendas de ropa, locales de comida, servicios de delivery, muebles, electrodomésticos y cualquier negocio que quiera conectar con el público popular y masivo de Argentina.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usarlo en radio y redes sociales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Al descargar el jingle, obtenés licencia comercial completa para usarlo en radio FM, Instagram, TikTok, Facebook, publicidad en Google, televisión local y cualquier otro medio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta crear un jingle de cumbia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Podés escuchar el jingle generado completamente gratis. La descarga en alta calidad con licencia comercial tiene un costo único de $8,900 ARS, muy por debajo de los $50,000–$200,000 que cobra un estudio tradicional.',
      },
    },
  ],
}

export default function JingleDeCumbia() {
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
          Jingle de Cumbia<br />
          <span className="landing-gradient">para tu Negocio</span>
        </h1>

        <p className="landing-lead">
          El ritmo más popular de Argentina, ahora en el jingle de tu marca.<br />
          Crealo con IA en 2 minutos. Sin conocimientos musicales. Sin registro.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🪘 Crear mi Jingle de Cumbia
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
        <h2 className="landing-h2">¿Por qué un jingle de cumbia?</h2>
        <p className="landing-text">
          La <strong>cumbia</strong> es el género musical más escuchado en Argentina. Su ritmo pegadizo y su energía festiva hacen que los jingles de cumbia sean increíblemente efectivos: se quedan en la cabeza, generan buena onda y conectan de inmediato con millones de personas.
        </p>
        <p className="landing-text">
          Marcas como supermercados regionales, distribuidoras de alimentos, y locales de barrio llevan décadas usando la cumbia en su publicidad por una razón simple: <strong>funciona</strong>. El ritmo familiar baja las defensas del oyente y hace que el mensaje llegue más fácil.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Negocios que brillan con jingles de cumbia</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🛒</div>
            <h3 className="landing-step-title">Almacenes y Supermercados</h3>
            <p className="landing-step-text">
              Ofertas del día, precios especiales y promociones semanales. La cumbia le da urgencia y alegría a cada anuncio.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">👗</div>
            <h3 className="landing-step-title">Tiendas de Ropa y Calzado</h3>
            <p className="landing-step-text">
              Liquidaciones, temporada nueva, descuentos. Un jingle de cumbia hace que tu clientela entre bailando.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🚚</div>
            <h3 className="landing-step-title">Delivery y Servicios</h3>
            <p className="landing-step-text">
              Deliveries, mudanzas, plomería, electricidad. La cumbia genera confianza y familiaridad en el barrio.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">¿Cómo crear tu jingle de cumbia?</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos tu marca</h3>
            <p className="landing-step-text">
              Nombre del negocio, qué vendés, y el mensaje que querés transmitir.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Seleccioná Cumbia</h3>
            <p className="landing-step-text">
              Elegí el estilo "Cumbia" en nuestro generador. También podés probar Cumbia Villera o Cumbia Pop.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Escuchá y descargá</h3>
            <p className="landing-step-text">
              La IA genera 2 versiones únicas. Escuchás gratis y descargás la que más te guste con licencia comercial.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">¿Listo para tu jingle de cumbia?</h2>
        <p className="landing-text">
          En 2 minutos tenés el jingle de cumbia de tu negocio. Gratis para escuchar.
        </p>
        <Link href="/" className="landing-cta-primary">
          🪘 Crear mi Jingle de Cumbia Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Por qué elegir cumbia para el jingle de mi negocio?</summary>
            <div className="landing-faq-answer">
              La cumbia es el ritmo más popular de Argentina. Genera inmediata identificación con el público masivo, es pegadiza y fácil de recordar. Un jingle de cumbia conecta emocionalmente con millones de personas en todo el país.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué tipo de negocios funcionan mejor con jingles de cumbia?</summary>
            <div className="landing-faq-answer">
              Almacenes, supermercados, ferreterías, tiendas de ropa, locales de comida, servicios de delivery, muebles, electrodomésticos y cualquier negocio que quiera conectar con el público popular y masivo de Argentina.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usarlo en radio y redes sociales?</summary>
            <div className="landing-faq-answer">
              Sí. Al descargar el jingle, obtenés licencia comercial completa para usarlo en radio FM, Instagram, TikTok, Facebook, publicidad en Google, televisión local y cualquier otro medio.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto cuesta crear un jingle de cumbia?</summary>
            <div className="landing-faq-answer">
              Podés escuchar el jingle generado completamente gratis. La descarga en alta calidad con licencia comercial tiene un costo único de $8,900 ARS, muy por debajo de los $50,000–$200,000 que cobra un estudio tradicional.
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
            <Link href="/jingle-de-pop" className="landing-footer-link">Jingle de Pop</Link>
            <Link href="/jingle-de-folklore" className="landing-footer-link">Jingle de Folklore</Link>
            <Link href="/jingle-de-cuarteto" className="landing-footer-link">Jingle de Cuarteto</Link>
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
