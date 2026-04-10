import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle de Trap para tu Marca | Creá con IA | Cancionesia',
  description: 'Creá un jingle de trap para tu marca con inteligencia artificial. Ideal para marcas urbanas, streetwear, tecnología y marcas que apuntan a la Generación Z.',
  keywords: 'jingle de trap, trap para publicidad, jingle trap argentina, música trap publicidad, jingle urbano trap',
  openGraph: {
    title: 'Jingle de Trap para tu Marca | Cancionesia',
    description: 'Creá un jingle de trap con IA en 2 minutos. Conectá con la Generación Z. Gratis y sin registro.',
    url: '/jingle-de-trap',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-de-trap',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿El trap funciona para publicidad de negocios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, especialmente para marcas que apuntan a la Generación Z (16–25 años). El trap es el sonido dominante en plataformas como TikTok y YouTube en Argentina. Un jingle de trap comunica autenticidad, actitud y frescura.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de marcas usan trap en su publicidad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ropa urbana y streetwear, zapatillas, bebidas energéticas, marcas de gaming y esports, apps, servicios digitales, barbershops, tattoo studios, y cualquier negocio que quiera comunicar actitud urbana y modernidad.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es adecuado para publicitar en TikTok?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutamente. El trap es el género nativo de TikTok. Un jingle de trap se integra naturalmente con el contenido de la plataforma y tiene más chances de convertirse en tendencia que géneros más tradicionales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La letra tendrá el nombre de mi marca?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La IA genera letra de trap original con el nombre de tu marca, mencionando lo que ofrecés y en el estilo que describís. Podés pedirlo más agresivo, más suave, con flow rápido o más melódico.',
      },
    },
  ],
}

export default function JingleDeTrap() {
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
          Jingle de Trap<br />
          <span className="landing-gradient">para tu Marca</span>
        </h1>

        <p className="landing-lead">
          El sonido de la Generación Z, ahora en el jingle de tu negocio.<br />
          Crealo con IA en 2 minutos. Sin registro. Escuchás gratis.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🔥 Crear mi Jingle de Trap
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
        <h2 className="landing-h2">El trap como voz de una generación</h2>
        <p className="landing-text">
          El <strong>trap argentino</strong> —con artistas como Duki, Bizarrap, Khea y Wos— se convirtió en la banda de sonido de una generación. Su mezcla de beats oscuros, hi-hats acelerados y flow crudo lo hace inconfundible y magnéticamente atractivo para el público joven.
        </p>
        <p className="landing-text">
          Para una marca que quiere hablarle a los menores de 30 años con autenticidad, el trap no es solo una opción musical: es una declaración de principios. Dice que tu marca conoce la cultura, que no teme ser diferente y que habla el mismo idioma que su audiencia.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Marcas que encajan con el trap</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🧢</div>
            <h3 className="landing-step-title">Streetwear y Moda Urbana</h3>
            <p className="landing-step-text">
              Ropa, gorras, zapatillas, accesorios. El trap es el soundtrack natural de la cultura urbana.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎮</div>
            <h3 className="landing-step-title">Gaming y Esports</h3>
            <p className="landing-step-text">
              Marcas de gaming, torneos, streamers, periféricos. El trap conecta con la comunidad gamer argentina.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">💈</div>
            <h3 className="landing-step-title">Barberías y Tattoo Studios</h3>
            <p className="landing-step-text">
              El trap define la identidad cultural de estos espacios. Un jingle de trap les da voz propia en redes.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Cómo crear tu jingle de trap</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Describí tu estética</h3>
            <p className="landing-step-text">
              Nombre de marca, actitud, público. ¿Agresivo, oscuro, melódico, relajado? Contanos el vibe.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí Trap AR</h3>
            <p className="landing-step-text">
              Seleccioná "Trap AR" en el generador para un sonido con identidad argentina.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Recibís 2 versiones únicas</h3>
            <p className="landing-step-text">
              Escuchás gratis. Descargás con licencia comercial por $8,900 ARS pago único.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Tu marca, con el flow del trap</h2>
        <p className="landing-text">
          En 2 minutos, tu marca tiene el jingle de trap que la define.
        </p>
        <Link href="/" className="landing-cta-primary">
          🔥 Crear mi Jingle de Trap Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿El trap funciona para publicidad de negocios?</summary>
            <div className="landing-faq-answer">
              Sí, especialmente para marcas que apuntan a la Generación Z (16–25 años). El trap es el sonido dominante en plataformas como TikTok y YouTube en Argentina. Un jingle de trap comunica autenticidad, actitud y frescura.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué tipo de marcas usan trap en su publicidad?</summary>
            <div className="landing-faq-answer">
              Ropa urbana y streetwear, zapatillas, bebidas energéticas, marcas de gaming y esports, apps, servicios digitales, barbershops, tattoo studios, y cualquier negocio que quiera comunicar actitud urbana y modernidad.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Es adecuado para publicitar en TikTok?</summary>
            <div className="landing-faq-answer">
              Absolutamente. El trap es el género nativo de TikTok. Un jingle de trap se integra naturalmente con el contenido de la plataforma y tiene más chances de convertirse en tendencia que géneros más tradicionales.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿La letra tendrá el nombre de mi marca?</summary>
            <div className="landing-faq-answer">
              Sí. La IA genera letra de trap original con el nombre de tu marca, mencionando lo que ofrecés y en el estilo que describís. Podés pedirlo más agresivo, más suave, con flow rápido o más melódico.
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
            <Link href="/jingle-de-reggaeton" className="landing-footer-link">Jingle de Reggaetón</Link>
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
