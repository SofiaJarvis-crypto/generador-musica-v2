import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle para Almacén o Despensa con IA | Cancionesia Argentina',
  description: 'Creá una canción para tu almacén, despensa o minimercado en 2 minutos con IA. El jingle que conecta con tu barrio. Escuchás gratis, pagás en pesos con Mercado Pago.',
  keywords: 'jingle para almacén, canción para almacén, jingle despensa, publicidad almacén argentino, canción minimercado, jingle barrio argentina',
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-para-almacen',
  },
  openGraph: {
    title: 'Jingle para Almacén con IA | Cancionesia',
    description: 'La canción del almacén de tu barrio, creada con IA en 2 minutos. Pagás en pesos.',
    url: 'https://cancionesia.com.ar/jingle-para-almacen',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué estilo musical funciona mejor para un almacén?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La cumbia y el cuarteto son los géneros más efectivos para almacenes y despensas argentinas. Transmiten calidez, barrio e identidad popular. El folklore también funciona muy bien en el interior del país, generando arraigo local.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué menciono en el jingle de mi almacén?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El nombre del almacén, el barrio o calle donde estás, y los productos o servicios que más te diferencian: variedad, precios bajos, atención personal, delivery propio, fiado, horario extendido. Cuanto más cercano al cliente, más efectivo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar el jingle en mi WhatsApp de negocio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El estado de WhatsApp Business es uno de los mejores canales para un almacén porque todos tus clientes habituales ya te tienen guardado. Poner el jingle como estado es publicidad directa sin costo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta hacer el jingle de mi almacén?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generar y escuchar es completamente gratis, sin registro ni tarjeta. Descargar con licencia comercial cuesta $8.900 ARS pago único con Mercado Pago.',
      },
    },
  ],
}

export default function JingleParaAlmacen() {
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
          Jingle para tu Almacén<br />
          <span className="landing-gradient">el sonido de tu barrio</span>
        </h1>

        <p className="landing-lead">
          El almacén de barrio tiene historia, confianza y comunidad.<br />
          Dale una canción que lo represente. Creado con IA en 2 minutos. Pagás en pesos.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🛒 Crear el Jingle de mi Almacén
          </Link>
          <div className="landing-trust-badge">
            ✅ Escuchás gratis • Sin tarjeta de crédito
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
        <h2 className="landing-h2">El almacén de barrio y la identidad sonora</h2>
        <p className="landing-text">
          El almacén argentino es mucho más que un comercio: es el lugar donde se conocen los vecinos, donde hay atención personal y donde el nombre del dueño es sinónimo de confianza. Esa identidad es un activo enorme que la mayoría de los almacenes nunca capitaliza en su publicidad.
        </p>
        <p className="landing-text">
          Un jingle que nombre tu almacén, tu barrio y lo que te hace especial convierte esa confianza en recordación. La próxima vez que alguien necesite algo, piensa primero en el almacén que tiene nombre y canción propia.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Lo que podés destacar en tu canción</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🏘️</div>
            <h3 className="landing-step-title">Identidad de barrio</h3>
            <p className="landing-step-text">
              "El almacén de [barrio/calle]", "tu almacén de siempre", "acá en [ciudad]". La pertenencia local es tu mayor diferenciador frente a los supermercados.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🤝</div>
            <h3 className="landing-step-title">Atención y confianza</h3>
            <p className="landing-step-text">
              Atención personalizada, años en el barrio, nombre del dueño. Estos valores son imposibles de imitar para una cadena grande y generan fidelidad real.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🚚</div>
            <h3 className="landing-step-title">Servicios diferenciales</h3>
            <p className="landing-step-text">
              Delivery propio, horario extendido, whatsapp para pedidos, fiado, variedad de productos. Si tenés algo que la competencia no tiene, tu canción lo comunica.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Géneros que resuenan en el almacén argentino</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🪘</div>
            <h3 className="landing-step-title">Cumbia</h3>
            <p className="landing-step-text">
              El género más popular de Argentina. Alegre, bailable y reconocible por todo el barrio. Funciona perfecto para almacenes en zonas populares y del conurbano.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎷</div>
            <h3 className="landing-step-title">Cuarteto</h3>
            <p className="landing-step-text">
              Si estás en Córdoba o el interior, el cuarteto conecta directamente con la identidad regional. La música más festiva del país para el comercio más querido del barrio.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎸</div>
            <h3 className="landing-step-title">Folklore</h3>
            <p className="landing-step-text">
              Para almacenes del interior del país, el folklore transmite arraigo, tradición y autenticidad. Una apuesta a la identidad que diferencia de cualquier cadena.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá el jingle de tu almacén en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos sobre tu almacén</h3>
            <p className="landing-step-text">
              Nombre, barrio o ciudad, qué ofrecés y lo que te hace diferente de la competencia.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              Cumbia, Cuarteto, Folklore o Pop — el que mejor represente a tu barrio y tus clientes.
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
        <h2 className="landing-h2">Dale voz a tu almacén de barrio.</h2>
        <p className="landing-text">
          En 2 minutos tenés el jingle listo para WhatsApp, redes sociales y radio local.
        </p>
        <Link href="/" className="landing-cta-primary">
          🛒 Crear el Jingle de mi Almacén Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué estilo musical funciona mejor para un almacén?</summary>
            <div className="landing-faq-answer">
              La cumbia y el cuarteto son los más efectivos. Transmiten calidez y barrio. El folklore funciona muy bien en el interior del país.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué menciono en el jingle de mi almacén?</summary>
            <div className="landing-faq-answer">
              El nombre, el barrio o calle, y lo que te diferencia: variedad, precios, delivery, atención personal, horario extendido. Cuanto más cercano al cliente, más efectivo.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usar el jingle en mi WhatsApp de negocio?</summary>
            <div className="landing-faq-answer">
              Sí. El estado de WhatsApp Business es uno de los mejores canales para un almacén porque todos tus clientes habituales ya te tienen guardado.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto cuesta?</summary>
            <div className="landing-faq-answer">
              Generar y escuchar es gratis. Descargar cuesta $8.900 ARS pago único con Mercado Pago, sin tarjeta internacional.
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
            <Link href="/jingle-para-ferreteria" className="landing-footer-link">Jingle para Ferretería</Link>
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
