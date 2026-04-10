import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Canción para mi Negocio con IA | En 2 Minutos | Cancionesia',
  description: 'Creá una canción personalizada para tu negocio, local o emprendimiento con inteligencia artificial. Sin conocimientos musicales. Escuchás gratis, sin registro.',
  keywords: 'canción para mi negocio, cancion para negocio, hacer canción para negocio, cancion para mi local, cancion para emprendimiento, música para mi negocio',
  openGraph: {
    title: 'Canción para mi Negocio con IA | Cancionesia',
    description: 'Creá una canción para tu negocio con IA en 2 minutos. Escuchás gratis, sin registro.',
    url: '/cancion-para-mi-negocio',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/cancion-para-mi-negocio',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo crear una canción para mi negocio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con Cancionesia es muy simple: escribís el nombre de tu negocio y lo que querés comunicar, elegís el estilo musical que más te guste, y la IA crea una canción original con letra y música en menos de 2 minutos. Sin conocimientos musicales, sin registro previo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Para qué sirve tener una canción para mi negocio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una canción propia hace que tu negocio sea más memorable. La gente recuerda mucho mejor los mensajes que escucha en forma musical. Podés usarla en tu local, en tus redes sociales, en publicidad de radio, en videos de Instagram y TikTok, y en cualquier comunicación de tu marca.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta hacer una canción para mi negocio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Escuchar la canción generada es completamente gratis. Si querés descargarla en alta calidad con licencia comercial para usarla en publicidad, el costo es de $8,900 ARS pago único. Mucho más barato que contratar un estudio o un músico profesional.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La canción tendrá el nombre de mi negocio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La IA genera la letra incluyendo el nombre de tu negocio, lo que ofrecés, y el mensaje que querés transmitir. Cada canción es 100% personalizada y única.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usarla en mis publicidades?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Con la descarga obtenés licencia comercial completa para usar la canción en radio, televisión local, redes sociales, videos de YouTube, y cualquier otro medio publicitario.',
      },
    },
  ],
}

export default function CancionParaMiNegocio() {
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
          Crear mi Canción Gratis
        </Link>
      </nav>

      <header className="landing-hero">
        <h1 className="landing-h1">
          Una Canción para<br />
          <span className="landing-gradient">tu Negocio</span>
        </h1>

        <p className="landing-lead">
          Que tu local, emprendimiento o marca tenga su propia canción.<br />
          La IA la crea en 2 minutos. La escuchás gratis. Sin conocimientos musicales.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🎵 Crear la Canción de mi Negocio
          </Link>
          <div className="landing-trust-badge">
            ✅ Gratis para escuchar • Sin tarjeta • Sin registro
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">2,100+</div>
            <div className="landing-stat-label">Negocios con su canción</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">2 min</div>
            <div className="landing-stat-label">Tiempo de creación</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">$8,900</div>
            <div className="landing-stat-label">Pago único para descargar</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">¿Por qué tu negocio necesita una canción?</h2>
        <p className="landing-text">
          La gente recuerda el 10% de lo que lee, el 20% de lo que ve, pero el <strong>60% de lo que escucha combinado con emoción</strong>. Una canción propia hace que tu negocio se grabe en la memoria de tus clientes de una manera que ningún cartel ni folleto puede lograr.
        </p>
        <p className="landing-text">
          No importa si tenés una verdulería, una peluquería, un taller mecánico o una tienda online: una canción le da personalidad a tu marca, genera confianza y hace que la gente te recomiende. Los clientes que escuchan tu canción se convierten en embajadores que la tararean sin darse cuenta.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">¿Para qué tipo de negocio funciona?</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🏪</div>
            <h3 className="landing-step-title">Comercios y Locales</h3>
            <p className="landing-step-text">
              Almacenes, ferreterías, peluquerías, farmacias, tiendas de ropa. Una canción en el local hace que los clientes se queden más tiempo y vuelvan.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🚀</div>
            <h3 className="landing-step-title">Emprendimientos y Startups</h3>
            <p className="landing-step-text">
              Si estás arrancando y no tenés presupuesto para agencias, una canción propia te diferencia de la competencia desde el primer día.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🍕</div>
            <h3 className="landing-step-title">Gastronomía y Delivery</h3>
            <p className="landing-step-text">
              Restaurantes, pizzerías, hamburgueserías, cafés, deliveries. Una canción pegadiza hace que el cliente te recuerde cuando tiene hambre.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Así se crea la canción de tu negocio</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos sobre tu negocio</h3>
            <p className="landing-step-text">
              Nombre del negocio, qué vendés o qué servicio ofrecés, y qué querés que la gente sienta cuando escuche tu canción.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              Pop, Cumbia, Folklore, Reggaetón, Rock y más. Elegí el que mejor representa a tu negocio y a tus clientes.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Escuchá gratis, descargá si te gusta</h3>
            <p className="landing-step-text">
              La IA genera 2 versiones únicas en 2 minutos. Escuchás sin pagar nada. Si te gusta, descargás con licencia comercial por $8,900 ARS.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Tu negocio merece tener su canción</h2>
        <p className="landing-text">
          2,100+ negocios argentinos ya tienen la suya. En 2 minutos, el tuyo también puede tenerla.
        </p>
        <Link href="/" className="landing-cta-primary">
          🎵 Crear la Canción de mi Negocio Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cómo crear una canción para mi negocio?</summary>
            <div className="landing-faq-answer">
              Con Cancionesia es muy simple: escribís el nombre de tu negocio y lo que querés comunicar, elegís el estilo musical que más te guste, y la IA crea una canción original con letra y música en menos de 2 minutos. Sin conocimientos musicales, sin registro previo.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Para qué sirve tener una canción para mi negocio?</summary>
            <div className="landing-faq-answer">
              Una canción propia hace que tu negocio sea más memorable. Podés usarla en tu local, en tus redes sociales, en publicidad de radio, en videos de Instagram y TikTok, y en cualquier comunicación de tu marca.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto cuesta hacer una canción para mi negocio?</summary>
            <div className="landing-faq-answer">
              Escuchar la canción generada es completamente gratis. Si querés descargarla con licencia comercial, el costo es de $8,900 ARS pago único. Mucho más barato que contratar un estudio o un músico profesional.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿La canción tendrá el nombre de mi negocio?</summary>
            <div className="landing-faq-answer">
              Sí. La IA genera la letra incluyendo el nombre de tu negocio, lo que ofrecés y el mensaje que querés transmitir. Cada canción es 100% personalizada y única.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usarla en mis publicidades?</summary>
            <div className="landing-faq-answer">
              Sí. Con la descarga obtenés licencia comercial completa para usar la canción en radio, televisión local, redes sociales, videos de YouTube y cualquier otro medio publicitario.
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
            <Link href="/cancion-para-mi-marca" className="landing-footer-link">Canción para mi Marca</Link>
            <Link href="/cancion-para-redes-sociales" className="landing-footer-link">Canción para Redes Sociales</Link>
            <Link href="/cancion-con-inteligencia-artificial" className="landing-footer-link">Canción con IA</Link>
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
