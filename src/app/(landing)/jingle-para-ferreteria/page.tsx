import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle para Ferretería con IA | Cancionesia Argentina',
  description: 'Creá una canción para tu ferretería en 2 minutos con IA. El jingle que representa tu local, tu barrio y tus productos. Escuchás gratis, pagás en pesos con Mercado Pago.',
  keywords: 'jingle para ferretería, canción para ferretería, publicidad ferretería argentina, jingle ferretería, música publicidad ferretería',
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-para-ferreteria',
  },
  openGraph: {
    title: 'Jingle para Ferretería con IA | Cancionesia',
    description: 'La canción de tu ferretería, creada con IA en 2 minutos. Sin conocimientos musicales. Pagás en pesos.',
    url: 'https://cancionesia.com.ar/jingle-para-ferreteria',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué estilo musical funciona mejor para una ferretería?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La cumbia, el cuarteto y el pop son los géneros más efectivos para ferreterías. Son familares, alegres y conectan bien con el cliente del barrio. Para ferreterías más industriales o de construcción, el rock o el pop más enérgico pueden proyectar solidez y confianza.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué debería decir el jingle de mi ferretería?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lo más efectivo es mencionar el nombre del local, el barrio o zona donde estás, y los rubros o servicios principales: herramientas, plomería, electricidad, construcción, pintura. Si tenés precios bajos o atención personalizada, mencionalo también.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar el jingle en radio local?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La licencia comercial incluida en la descarga te permite emitir el jingle en radios AM y FM, además de redes sociales, WhatsApp y publicidad digital.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generar y escuchar las 2 versiones es gratis, sin registro. Descargar con licencia comercial cuesta $8.900 ARS pago único. Pagás con Mercado Pago, sin tarjeta internacional.',
      },
    },
  ],
}

export default function JingleParaFerreteria() {
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
          Jingle para tu Ferretería<br />
          <span className="landing-gradient">creado con IA en 2 minutos</span>
        </h1>

        <p className="landing-lead">
          El jingle del local de confianza de tu barrio.<br />
          Tu nombre, tus productos, tu identidad. Listo para radio, WhatsApp y redes.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🔧 Crear el Jingle de mi Ferretería
          </Link>
          <div className="landing-trust-badge">
            ✅ Escuchás gratis • Pagás en pesos
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
        <h2 className="landing-h2">La ferretería de barrio merece ser recordada</h2>
        <p className="landing-text">
          La ferretería es uno de los comercios más importantes del barrio argentino. El problema es que muchas se parecen entre sí en nombre y propuesta. Un jingle cambia eso: cuando alguien necesita pintura, clavos o herramientas, piensa primero en el local que recuerda.
        </p>
        <p className="landing-text">
          Un jingle en radio local o en el estado de WhatsApp de tu negocio es el recordatorio semanal que hace que el cliente elija tu ferretería y no la de la vuelta.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Rubros que podés destacar en tu canción</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🔨</div>
            <h3 className="landing-step-title">Herramientas y Construcción</h3>
            <p className="landing-step-text">
              Herramientas manuales, eléctricas, materiales de construcción. Si tenés variedad o precios competitivos, la canción lo comunica de forma memorable.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🪣</div>
            <h3 className="landing-step-title">Pinturas y Terminaciones</h3>
            <p className="landing-step-text">
              Pinturas, revestimientos, adhesivos y selladores. Ideal para ferreterías que se especializan en el rubro de la pintura o tienen local amplio con muestra de colores.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">⚡</div>
            <h3 className="landing-step-title">Plomería y Electricidad</h3>
            <p className="landing-step-text">
              Caños, accesorios, material eléctrico. Si el foco de tu local es el mantenimiento del hogar, la canción puede posicionarte como el experto del barrio.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Dónde usar el jingle de tu ferretería</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">📻</div>
            <h3 className="landing-step-title">Radio FM Local</h3>
            <p className="landing-step-text">
              Una cuña radial de 30 segundos en la radio de tu ciudad o barrio llega directo a la gente que pasa por tu puerta. Tu jingle está listo para emitirse sin producción adicional.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">💬</div>
            <h3 className="landing-step-title">WhatsApp Business</h3>
            <p className="landing-step-text">
              Poné la canción como estado de WhatsApp. Todos tus contactos la escuchan automáticamente. Es publicidad gratis para clientes que ya te conocen.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">📺</div>
            <h3 className="landing-step-title">Pantalla en el Local</h3>
            <p className="landing-step-text">
              Si tenés una pantalla o altavoces en el local, usar tu propio jingle genera una experiencia de marca memorable que la gente no espera encontrar en una ferretería.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá el jingle de tu ferretería en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos sobre tu local</h3>
            <p className="landing-step-text">
              Nombre de la ferretería, barrio o ciudad, rubros principales y mensaje que querés comunicar.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              Cumbia, Cuarteto, Pop — el género que mejor conecte con tus clientes del barrio.
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
        <h2 className="landing-h2">Que tu ferretería sea la que todos recuerdan.</h2>
        <p className="landing-text">
          En 2 minutos tenés el jingle listo para radio, WhatsApp y redes sociales.
        </p>
        <Link href="/" className="landing-cta-primary">
          🔧 Crear el Jingle de mi Ferretería Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué estilo musical funciona mejor para una ferretería?</summary>
            <div className="landing-faq-answer">
              La cumbia, el cuarteto y el pop son los géneros más efectivos para ferreterías. Son familiares y conectan bien con el cliente del barrio. Para ferreterías más industriales, el rock o pop enérgico pueden proyectar solidez.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué debería decir el jingle de mi ferretería?</summary>
            <div className="landing-faq-answer">
              El nombre del local, el barrio o zona, y los rubros principales. Si tenés precios bajos o atención personalizada, mencionalo también. Cuanto más específico, más efectivo.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usar el jingle en radio local?</summary>
            <div className="landing-faq-answer">
              Sí. La licencia comercial incluida en la descarga te permite emitirlo en radios AM y FM, además de redes sociales y WhatsApp.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto cuesta?</summary>
            <div className="landing-faq-answer">
              Escuchar es gratis, sin registro. Descargar cuesta $8.900 ARS pago único con Mercado Pago, sin tarjeta internacional ni suscripción.
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
            <h4 className="landing-footer-title">Más jingles para negocios</h4>
            <Link href="/jingle-para-peluqueria" className="landing-footer-link">Jingle para Peluquería</Link>
            <Link href="/jingle-para-almacen" className="landing-footer-link">Jingle para Almacén</Link>
            <Link href="/jingle-para-restaurant" className="landing-footer-link">Jingle para Restaurante</Link>
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
