import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle para Radio FM Argentina con IA | Cancionesia',
  description: 'Creá una cuña radial o jingle para tu publicidad en radio FM con IA. Formato profesional de 15 a 30 segundos, listo para emitir. Pagás en pesos con Mercado Pago.',
  keywords: 'jingle para radio fm argentina, cuña radial argentina, jingle publicidad radio, jingle radio local argentina, canción publicitaria radio am fm',
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-para-radio-fm',
  },
  openGraph: {
    title: 'Jingle para Radio FM Argentina con IA | Cancionesia',
    description: 'Cuña radial profesional creada con IA en 2 minutos. Lista para emitir en radio AM y FM. Pagás en pesos.',
    url: 'https://cancionesia.com.ar/jingle-para-radio-fm',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿El jingle generado es apto para emitir en radio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El archivo descargable es MP3 a 320 kbps, el estándar de calidad aceptado por todas las radios argentinas. La licencia comercial incluida te permite emitirlo en radios AM y FM sin restricciones ni pago de royalties.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué duración tienen los jingles generados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los jingles generados tienen entre 30 y 60 segundos, que es el formato estándar de cuña radial. Si necesitás una versión más corta (15 segundos), podés editar el archivo descargado con cualquier software de audio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar el jingle en radio sin pagar derechos de autor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Al descargar tu jingle de Cancionesia recibís una licencia comercial completa que te permite emitirlo en cualquier radio sin pagar derechos de autor adicionales. La canción es tuya.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué información necesito para crear el jingle radial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El nombre de tu negocio o marca, qué ofrecés, dónde estás (ciudad o barrio), y cómo puede contactarte el oyente (teléfono, WhatsApp o dirección). Con esos datos la IA genera una cuña completa y profesional.',
      },
    },
  ],
}

export default function JingleParaRadioFm() {
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
          Jingle para Radio FM<br />
          <span className="landing-gradient">creado con IA en 2 minutos</span>
        </h1>

        <p className="landing-lead">
          Tu cuña radial profesional, lista para emitir en radio local argentina.<br />
          Sin estudio de grabación. Sin músicos. Pagás en pesos.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            📻 Crear mi Jingle para Radio
          </Link>
          <div className="landing-trust-badge">
            ✅ MP3 320kbps listo para radio • Pagás en pesos
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">320 kbps</div>
            <div className="landing-stat-label">Calidad de emisión</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">30–60 seg</div>
            <div className="landing-stat-label">Formato cuña radial</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">$8.900</div>
            <div className="landing-stat-label">ARS pago único</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">La radio local sigue siendo el medio más potente en el interior</h2>
        <p className="landing-text">
          En Argentina, la radio FM local tiene un poder que las redes sociales no pueden replicar: llega a toda la comunidad al mismo tiempo, con bajo costo de pauta y alta credibilidad. El problema histórico era el costo de producción de una cuña: contratar locutores, músicos, estudio de grabación y producción podía costar entre $50.000 y $150.000 ARS.
        </p>
        <p className="landing-text">
          Cancionesia resuelve ese problema. Con IA generás una cuña radial completa —con música, letra y voz— en 2 minutos, por $8.900 ARS. Descargás el archivo y lo llevás directo a la radio.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Qué necesita una buena cuña radial</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🎯</div>
            <h3 className="landing-step-title">Un mensaje claro</h3>
            <p className="landing-step-text">
              El oyente de radio no puede pausar ni releer. El mensaje tiene que ser simple: nombre del negocio, qué ofrecés, cómo contactarte. Sin más.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎵</div>
            <h3 className="landing-step-title">Música pegadiza</h3>
            <p className="landing-step-text">
              La música hace que la cuña se diferencie entre las demás. Un jingle con melodía propia genera recordación incluso cuando el oyente no está prestando toda la atención.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">📞</div>
            <h3 className="landing-step-title">Call to action</h3>
            <p className="landing-step-text">
              La cuña tiene que terminar con una acción concreta: "llamanos", "escribinos por WhatsApp", "visitanos en [dirección]". El oyente necesita saber qué hacer después de escucharla.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Géneros que funcionan en radio argentina</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🪘</div>
            <h3 className="landing-step-title">Cumbia</h3>
            <p className="landing-step-text">
              Alta recordación, familiaridad inmediata. Funciona para comercios populares, tiendas de ropa, locales de comida y cualquier negocio que quiera conectar con la audiencia masiva.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎷</div>
            <h3 className="landing-step-title">Cuarteto</h3>
            <p className="landing-step-text">
              El rey de las radios cordobesas. Si tu negocio está en Córdoba o el interior, el cuarteto garantiza que la cuña se escuche y se recuerde.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎸</div>
            <h3 className="landing-step-title">Folklore</h3>
            <p className="landing-step-text">
              Arraigo local, tradición y autenticidad. Ideal para negocios del interior que quieren comunicar identidad regional y confianza.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá tu cuña radial en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Completá los datos del negocio</h3>
            <p className="landing-step-text">
              Nombre, qué ofrecés, ciudad o barrio, teléfono o WhatsApp de contacto. La IA usa esos datos para escribir la letra de la cuña.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el género musical</h3>
            <p className="landing-step-text">
              El estilo que mejor conecta con la audiencia de la radio local donde pautás.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Descargás y llevás a la radio</h3>
            <p className="landing-step-text">
              MP3 320 kbps, listo para entregar al operador técnico de la radio sin ningún procesamiento adicional.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Tu cuña radial, lista para el aire.</h2>
        <p className="landing-text">
          En 2 minutos tenés el jingle profesional listo para emitir en cualquier radio argentina.
        </p>
        <Link href="/" className="landing-cta-primary">
          📻 Crear mi Jingle para Radio Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿El jingle generado es apto para emitir en radio?</summary>
            <div className="landing-faq-answer">
              Sí. MP3 a 320 kbps, el estándar de calidad de las radios argentinas. La licencia comercial incluida te permite emitirlo en AM y FM sin pagar royalties.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué duración tienen los jingles?</summary>
            <div className="landing-faq-answer">
              Entre 30 y 60 segundos, el formato estándar de cuña radial. Para versiones más cortas podés editar el archivo con cualquier software de audio.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usar el jingle en radio sin pagar derechos de autor?</summary>
            <div className="landing-faq-answer">
              Sí. La licencia comercial incluida te permite emitirlo en cualquier radio sin pagar derechos adicionales.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué información necesito para crear el jingle?</summary>
            <div className="landing-faq-answer">
              Nombre del negocio, qué ofrecés, ciudad o barrio, y cómo contactarte. Con esos datos la IA genera una cuña completa.
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
            <h4 className="landing-footer-title">Más recursos</h4>
            <Link href="/jingle-de-cuarteto" className="landing-footer-link">Jingle de Cuarteto</Link>
            <Link href="/jingle-de-folklore" className="landing-footer-link">Jingle de Folklore</Link>
            <Link href="/jingle-de-cumbia" className="landing-footer-link">Jingle de Cumbia</Link>
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
