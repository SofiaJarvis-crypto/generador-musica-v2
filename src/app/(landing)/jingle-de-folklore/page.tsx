import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle de Folklore para tu Negocio | Creá con IA | Cancionesia',
  description: 'Creá un jingle de folklore argentino para tu negocio con inteligencia artificial. Ideal para turismo, gastronomía regional y marcas con identidad argentina. Gratis.',
  keywords: 'jingle de folklore, jingle folclore argentino, folklore para publicidad, jingle folklore negocio, música folclórica publicidad',
  openGraph: {
    title: 'Jingle de Folklore Argentino para tu Negocio | Cancionesia',
    description: 'Creá un jingle de folklore con IA en 2 minutos. La identidad argentina en el jingle de tu marca. Gratis y sin registro.',
    url: '/jingle-de-folklore',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-de-folklore',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿El folklore sirve para la publicidad de negocios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, especialmente para marcas con identidad argentina, regional o que quieren transmitir valores de tradición, autenticidad y arraigo. El folklore genera un vínculo emocional muy fuerte con el público de las provincias y con argentinos que valoran la cultura nacional.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipos de negocios funcionan mejor con jingles de folklore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agencias de turismo, bodegas y vinos, productos regionales, restaurantes de comida típica, artesanías, hoteles boutique, organismos públicos, cooperativas agropecuarias, y cualquier marca que quiera destacar su identidad argentina.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo elegir entre distintos estilos de folklore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Al describir tu marca podés mencionar el estilo que preferís: zamba, chacarera, chamamé, vidala, cueca. La IA adapta la composición al ritmo folklórico que mejor represente tu negocio y tu región.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El jingle sonaría auténtico o genérico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La IA está entrenada con música folklórica argentina y genera composiciones con las características musicales propias del género: guitarra criolla, ritmos de chacarera o zamba, y letras con vocabulario regional. Cada jingle es único y personalizado para tu marca.',
      },
    },
  ],
}

export default function JingleDefolklore() {
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
          Jingle de Folklore<br />
          <span className="landing-gradient">Argentino para tu Marca</span>
        </h1>

        <p className="landing-lead">
          La identidad argentina más profunda, en el jingle de tu negocio.<br />
          Chacarera, zamba, chamamé. Crealo con IA en 2 minutos. Sin registro.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🪗 Crear mi Jingle de Folklore
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
        <h2 className="landing-h2">El folklore como herramienta de marketing</h2>
        <p className="landing-text">
          El <strong>folklore argentino</strong> no es solo música: es identidad, pertenencia y emoción. Cuando una marca elige el folklore para su jingle, comunica algo que va más allá de la publicidad: dice que valora sus raíces, que conoce a su gente y que forma parte de una historia compartida.
        </p>
        <p className="landing-text">
          Desde las bodegas de Mendoza hasta las estancias de Salta, desde cooperativas del Litoral hasta restaurantes porteños especializados en comida regional: el folklore le habla directamente al corazón del consumidor argentino.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Negocios que brillan con folklore</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🍷</div>
            <h3 className="landing-step-title">Bodegas y Productos Regionales</h3>
            <p className="landing-step-text">
              Vinos, aceites de oliva, quesos artesanales, dulces regionales. El folklore refuerza la autenticidad del origen y el proceso artesanal.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🏕️</div>
            <h3 className="landing-step-title">Turismo y Hospitalidad</h3>
            <p className="landing-step-text">
              Agencias de viajes, hostels, estancias, circuitos culturales. La música folklórica evoca paisajes y experiencias únicas.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🌾</div>
            <h3 className="landing-step-title">Agro y Campo</h3>
            <p className="landing-step-text">
              Cooperativas, semilleros, veterinarias rurales, agroservicios. El folklore conecta con los valores del trabajo en la tierra.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá tu jingle folklórico en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos tu historia</h3>
            <p className="landing-step-text">
              Nombre, provincia, qué vendés y qué valores querés transmitir. El contexto regional ayuda a la IA.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí Folklore</h3>
            <p className="landing-step-text">
              Seleccioná "Folklore" en el generador. Podés mencionar el estilo específico en la descripción.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Escuchá y elegí</h3>
            <p className="landing-step-text">
              Recibís 2 versiones únicas. Descargás con licencia comercial completa por $8,900 ARS pago único.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">La Argentina en el jingle de tu negocio</h2>
        <p className="landing-text">
          En 2 minutos tenés un jingle folklórico profesional para tu marca.
        </p>
        <Link href="/" className="landing-cta-primary">
          🪗 Crear mi Jingle de Folklore Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿El folklore sirve para la publicidad de negocios?</summary>
            <div className="landing-faq-answer">
              Sí, especialmente para marcas con identidad argentina, regional o que quieren transmitir valores de tradición, autenticidad y arraigo. El folklore genera un vínculo emocional muy fuerte con el público de las provincias y con argentinos que valoran la cultura nacional.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué tipos de negocios funcionan mejor con jingles de folklore?</summary>
            <div className="landing-faq-answer">
              Agencias de turismo, bodegas y vinos, productos regionales, restaurantes de comida típica, artesanías, hoteles boutique, organismos públicos, cooperativas agropecuarias, y cualquier marca que quiera destacar su identidad argentina.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo elegir entre distintos estilos de folklore?</summary>
            <div className="landing-faq-answer">
              Sí. Al describir tu marca podés mencionar el estilo que preferís: zamba, chacarera, chamamé, vidala, cueca. La IA adapta la composición al ritmo folklórico que mejor represente tu negocio y tu región.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿El jingle sonaría auténtico o genérico?</summary>
            <div className="landing-faq-answer">
              La IA genera composiciones con las características musicales propias del género: guitarra criolla, ritmos de chacarera o zamba, y letras con vocabulario regional. Cada jingle es único y personalizado para tu marca.
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
            <Link href="/jingle-de-cuarteto" className="landing-footer-link">Jingle de Cuarteto</Link>
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
