import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle para tu Emprendimiento con IA | Cancionesia Argentina',
  description: 'Creá una canción para tu emprendimiento o marca personal en 2 minutos con IA. Dale identidad sonora a tu negocio desde el primer día. Escuchás gratis, pagás en pesos.',
  keywords: 'jingle para emprendimiento, canción para emprendimiento, jingle marca personal, canción emprendedor argentino, jingle para mi negocio, música para emprendimiento',
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-para-emprendimiento',
  },
  openGraph: {
    title: 'Jingle para tu Emprendimiento con IA | Cancionesia',
    description: 'La canción de tu emprendimiento, creada con IA en 2 minutos. Identidad sonora desde el día uno. Pagás en pesos.',
    url: 'https://cancionesia.com.ar/jingle-para-emprendimiento',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Para qué tipo de emprendimientos sirve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para cualquier tipo de emprendimiento: tiendas online, servicios profesionales, marcas de indumentaria, negocios de comida, servicios de belleza, tecnología, turismo, educación y más. Si tenés una marca, necesitás una canción.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Vale la pena tener una canción siendo un emprendimiento pequeño?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Especialmente siendo pequeño. Las grandes marcas tienen millones para publicidad. Tu ventaja como emprendimiento es la autenticidad y la conexión directa con tu comunidad. Una canción propia transmite exactamente eso: que sos un negocio real, con identidad, no un producto genérico.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar la canción en mis publicidades de Instagram y TikTok?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La licencia comercial incluida te permite usarla en cualquier plataforma de publicidad digital: Instagram Ads, TikTok Ads, Facebook Ads, YouTube, WhatsApp y cualquier otro medio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generar y escuchar las versiones es completamente gratis. Si encontrás una que te representa, la descargás por $8.900 ARS pago único con Mercado Pago. Sin suscripción ni costos recurrentes.',
      },
    },
  ],
}

export default function JingleParaEmprendimiento() {
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
          Jingle para tu Emprendimiento<br />
          <span className="landing-gradient">identidad sonora desde el día uno</span>
        </h1>

        <p className="landing-lead">
          Tu emprendimiento tiene historia, propósito y personalidad.<br />
          Ahora puede tener su propia canción. Creada con IA en 2 minutos. Pagás en pesos.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🚀 Crear el Jingle de mi Emprendimiento
          </Link>
          <div className="landing-trust-badge">
            ✅ Escuchás gratis • Sin registro
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">2 min</div>
            <div className="landing-stat-label">Tiempo promedio</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">2 versiones</div>
            <div className="landing-stat-label">Para elegir la mejor</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">$8.900</div>
            <div className="landing-stat-label">Pago único en pesos</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">Por qué un emprendimiento necesita una canción propia</h2>
        <p className="landing-text">
          En Argentina hay millones de emprendedores. La mayoría compite por atención en las mismas redes, con los mismos formatos, publicando fotos de productos que se ven igual a los de la competencia. Una canción propia rompe ese patrón.
        </p>
        <p className="landing-text">
          Cuando alguien escucha la canción de tu emprendimiento, entiende inmediatamente quién sos, qué ofrecés y qué te hace diferente. No hay texto que transmita eso con la misma velocidad y potencia emocional que la música.
        </p>
        <p className="landing-text">
          Antes, una canción profesional estaba reservada para marcas con presupuesto de agencia. Hoy, con Cancionesia, cualquier emprendedor argentino puede tenerla por $8.900 ARS.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Para qué tipo de emprendimiento funciona</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">👗</div>
            <h3 className="landing-step-title">Tiendas Online e Indumentaria</h3>
            <p className="landing-step-text">
              Emprendimientos de ropa, accesorios, calzado y moda. La canción va en los Reels de producto, en los Stories y en los ads para ampliar alcance.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🍰</div>
            <h3 className="landing-step-title">Comida y Pastelería</h3>
            <p className="landing-step-text">
              Emprendimientos gastronómicos, repostería, catering, delivery casero. Una canción convierte una foto de torta en contenido de marca con identidad.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">💼</div>
            <h3 className="landing-step-title">Servicios y Profesionales</h3>
            <p className="landing-step-text">
              Consultoras, coaches, diseñadores, fotógrafos, entrenadores. La canción comunica la esencia de tu servicio antes de que el cliente lea tu propuesta.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Cómo usar la canción en tu estrategia de contenido</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">📱</div>
            <h3 className="landing-step-title">Reels y TikTok</h3>
            <p className="landing-step-text">
              Usá la canción como fondo musical de tus videos de producto, detrás de escena o lanzamientos. El algoritmo premia el contenido original con audio propio.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">💬</div>
            <h3 className="landing-step-title">WhatsApp Business</h3>
            <p className="landing-step-text">
              El estado de WhatsApp con tu jingle llega a toda tu base de clientes actuales. Es publicidad gratuita para las personas que ya confían en vos.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎯</div>
            <h3 className="landing-step-title">Publicidad Paga</h3>
            <p className="landing-step-text">
              Los ads con audio original tienen mejor performance que los que usan música de biblioteca. Tu canción se convierte en un activo de marketing reutilizable en todas tus campañas.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá el jingle de tu emprendimiento en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos sobre tu emprendimiento</h3>
            <p className="landing-step-text">
              Nombre, qué ofrecés, a quién le vendés y cuál es tu propuesta de valor. La IA genera la letra en segundos.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              El género que mejor refleje la personalidad de tu marca: Pop, Cumbia, Reggaetón, Trap, Folklore y más.
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
        <h2 className="landing-h2">Tu emprendimiento merece sonar diferente.</h2>
        <p className="landing-text">
          En 2 minutos tenés la canción de tu marca, lista para redes, ads y WhatsApp.
        </p>
        <Link href="/" className="landing-cta-primary">
          🚀 Crear el Jingle de mi Emprendimiento Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Para qué tipo de emprendimientos sirve?</summary>
            <div className="landing-faq-answer">
              Para cualquier tipo: tiendas online, servicios, gastronomía, moda, educación, turismo y más. Si tenés una marca, necesitás una canción.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Vale la pena siendo un emprendimiento pequeño?</summary>
            <div className="landing-faq-answer">
              Especialmente siendo pequeño. La autenticidad y la conexión directa son tu ventaja. Una canción propia transmite que sos un negocio real con identidad.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usarla en mis publicidades de Instagram y TikTok?</summary>
            <div className="landing-faq-answer">
              Sí. La licencia comercial te permite usarla en cualquier plataforma de publicidad digital sin restricciones.
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
            <Link href="/cancion-para-mis-redes" className="landing-footer-link">Canción para mis Redes</Link>
            <Link href="/hacer-cancion-con-ia" className="landing-footer-link">Hacer Canción con IA</Link>
            <Link href="/generador-jingles-pesos-mercadopago" className="landing-footer-link">Pagar en Pesos</Link>
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
