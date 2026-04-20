import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Canción para mis Redes Sociales con IA | Cancionesia Argentina',
  description: 'Creá una canción original para tus Reels, TikToks y Stories en 2 minutos con IA. Sin copyright. Sin royalties. Audio propio para tu marca en redes. Pagás en pesos.',
  keywords: 'canción para redes sociales, música para reels argentina, jingle para instagram, canción para tiktok, audio original para redes, música para stories, canción para marca redes sociales',
  alternates: {
    canonical: 'https://cancionesia.com.ar/cancion-para-mis-redes',
  },
  openGraph: {
    title: 'Canción para mis Redes Sociales con IA | Cancionesia',
    description: 'Audio original para tus Reels, TikToks y Stories. Sin copyright. Creado con IA en 2 minutos. Pagás en pesos.',
    url: 'https://cancionesia.com.ar/cancion-para-mis-redes',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿La canción tiene problemas de copyright en Instagram o TikTok?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A diferencia de la música de biblioteca o las canciones populares, el audio generado por Cancionesia es tuyo. No tenés riesgo de que Instagram o TikTok bajen tu video por copyright, porque la canción no pertenece a ningún sello discográfico.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar la misma canción en todas mis redes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La licencia comercial incluida te permite usar la canción en Instagram, TikTok, YouTube, Facebook, WhatsApp, Twitter/X y cualquier otra plataforma, sin restricciones ni pagos adicionales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué ventaja tiene tener audio propio vs. usar música de trending?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La música trending dura semanas y la usan miles de cuentas al mismo tiempo. Tu canción propia es para siempre, es exclusiva de tu marca y refuerza tu identidad cada vez que aparece. Además, el nombre de tu negocio está en la letra, algo que ninguna canción de trending puede hacer.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generar y escuchar es completamente gratis. Descargar con licencia comercial cuesta $8.900 ARS pago único con Mercado Pago.',
      },
    },
  ],
}

export default function CancionParaMisRedes() {
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
          Canción Original para<br />
          <span className="landing-gradient">tus Reels, TikToks y Stories</span>
        </h1>

        <p className="landing-lead">
          Audio propio para tu marca en redes. Sin copyright, sin royalties, sin competir con trending songs.<br />
          Creado con IA en 2 minutos. Pagás en pesos.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🎬 Crear Canción para mis Redes
          </Link>
          <div className="landing-trust-badge">
            ✅ Sin copyright • Sin registro
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">2 min</div>
            <div className="landing-stat-label">Tiempo promedio</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">0 royalties</div>
            <div className="landing-stat-label">Sin pagos adicionales</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">$8.900</div>
            <div className="landing-stat-label">ARS pago único</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">El problema con la música trending en tus redes</h2>
        <p className="landing-text">
          Usar música trending en tus Reels y TikToks tiene dos problemas grandes: primero, la misma canción la están usando miles de cuentas a la vez, así que tu contenido no se diferencia en nada. Segundo, en cualquier momento Instagram o TikTok pueden silenciar o bajar tu video por problemas de copyright.
        </p>
        <p className="landing-text">
          Una canción propia resuelve ambos problemas. No hay otra cuenta que la tenga. No hay riesgo de copyright. Y además, el nombre de tu marca está en la letra, algo que ninguna canción de trending puede hacer.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Cómo usarla en cada plataforma</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">📸</div>
            <h3 className="landing-step-title">Instagram Reels y Stories</h3>
            <p className="landing-step-text">
              Subí tu Reel con la canción propia y usala también en Stories con stickers de producto o servicios. El audio consistente en todas tus publicaciones construye reconocimiento de marca.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎵</div>
            <h3 className="landing-step-title">TikTok</h3>
            <p className="landing-step-text">
              Subí la canción como audio original a TikTok. Si tu contenido es bueno, el audio tuyo puede volverse trending dentro de tu nicho y generar que otras cuentas lo usen, amplificando el alcance de tu marca.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">▶️</div>
            <h3 className="landing-step-title">YouTube Shorts</h3>
            <p className="landing-step-text">
              YouTube es especialmente estricto con el copyright. Tener audio propio elimina el riesgo de monetización bloqueada y es un activo que se valoriza con el tiempo en el canal.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Qué hace a una buena canción para redes</h2>
        <ul className="landing-list">
          <li><strong>Intro que engancha en los primeros 3 segundos</strong> — las redes penalizan el contenido que no retiene. La canción tiene que empezar fuerte.</li>
          <li><strong>El nombre de tu marca en la letra</strong> — diferencia tu contenido de cualquier competidor que use la misma canción trending.</li>
          <li><strong>Energía acorde al género de contenido</strong> — una tienda de ropa elige pop o reggaetón; una panadería artesanal elige folk o bossa nova.</li>
          <li><strong>Duración flexible</strong> — usá los primeros 15 segundos para Stories, la versión completa para Reels largos.</li>
        </ul>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá la canción de tus redes en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos sobre tu marca</h3>
            <p className="landing-step-text">
              Nombre, qué ofrecés, a quién le vendés y la personalidad de tu marca en redes.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              El que mejor encaje con el contenido que publicás: Pop, Reggaetón, Trap, Cumbia o el que elijas.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Escuchás y descargás</h3>
            <p className="landing-step-text">
              En 2 minutos tenés 2 versiones. Descargás con licencia comercial por $8.900 ARS con Mercado Pago.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Dejá de usar la misma canción que todos los demás.</h2>
        <p className="landing-text">
          En 2 minutos tenés audio original para tu marca, listo para subir a todas tus redes.
        </p>
        <Link href="/" className="landing-cta-primary">
          🎬 Crear mi Canción para Redes Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿La canción tiene problemas de copyright en Instagram o TikTok?</summary>
            <div className="landing-faq-answer">
              No. Es tu canción, generada por IA para tu marca. No pertenece a ningún sello discográfico, así que no hay riesgo de que bajen tu video por copyright.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usar la misma canción en todas mis redes?</summary>
            <div className="landing-faq-answer">
              Sí. La licencia comercial te permite usarla en Instagram, TikTok, YouTube, WhatsApp y cualquier otra plataforma sin restricciones.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué ventaja tiene vs. usar música trending?</summary>
            <div className="landing-faq-answer">
              La trending la usan miles al mismo tiempo. Tu canción es exclusiva, el nombre de tu marca está en la letra, y no desaparece cuando el trend pasa.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto cuesta?</summary>
            <div className="landing-faq-answer">
              Escuchar es gratis. Descargar cuesta $8.900 ARS pago único con Mercado Pago. Sin suscripción.
            </div>
          </details>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-brand">
            <div className="landing-logo">🎵 Cancionesia</div>
            <p className="landing-footer-text">
              Canciones profesionales con IA.<br />
              Hecho en Argentina 🇦🇷
            </p>
          </div>
          <div className="landing-footer-links">
            <h4 className="landing-footer-title">También te puede interesar</h4>
            <Link href="/jingle-para-emprendimiento" className="landing-footer-link">Jingle para Emprendimiento</Link>
            <Link href="/hacer-cancion-con-ia" className="landing-footer-link">Hacer Canción con IA</Link>
            <Link href="/cancion-para-redes-sociales" className="landing-footer-link">Canción para Redes Sociales</Link>
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
