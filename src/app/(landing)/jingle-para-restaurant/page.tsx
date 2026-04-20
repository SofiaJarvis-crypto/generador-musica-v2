import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle para Restaurante, Parrilla o Delivery con IA | Cancionesia',
  description: 'Creá una canción para tu restaurante, parrilla, pizzería o negocio de delivery en 2 minutos con IA. Escuchás gratis, pagás en pesos con Mercado Pago.',
  keywords: 'jingle para restaurante, canción para restaurante, jingle parrilla argentina, publicidad restaurante, jingle delivery argentina, canción pizzería',
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-para-restaurant',
  },
  openGraph: {
    title: 'Jingle para Restaurante con IA | Cancionesia',
    description: 'La canción de tu restaurante, parrilla o delivery. Creada con IA en 2 minutos. Pagás en pesos.',
    url: 'https://cancionesia.com.ar/jingle-para-restaurant',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué estilo musical funciona mejor para un restaurante?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depende del tipo de local. Para una parrilla familiar, el folklore o el rock nacional transmiten identidad argentina. Para un restaurante moderno o de cocina fusión, el pop o la electrónica proyectan sofisticación. Para pizzerías populares y locales de delivery, la cumbia o el reggaetón funcionan muy bien.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué debería decir el jingle de mi restaurante?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El nombre del local, el tipo de cocina o el plato estrella, el barrio o zona, y un diferenciador: ambiente familiar, ingredientes frescos, delivery rápido, precio justo. Cuanto más apetitosa y evocadora sea la canción, más efectiva.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar el jingle para pautar en redes sociales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La licencia comercial te permite usar la canción en Instagram Ads, Facebook Ads, TikTok, YouTube y cualquier plataforma de publicidad digital sin restricciones.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generar y escuchar las 2 versiones es completamente gratis. Descargar con licencia comercial cuesta $8.900 ARS pago único con Mercado Pago, sin tarjeta internacional.',
      },
    },
  ],
}

export default function JingleParaRestaurant() {
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
          Jingle para tu Restaurante<br />
          <span className="landing-gradient">o Negocio de Comida</span>
        </h1>

        <p className="landing-lead">
          Para parrillas, pizzerías, delivery y restaurantes argentinos.<br />
          Creá una canción que haga salivar antes de que llegue el pedido.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🍖 Crear el Jingle de mi Restaurante
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
        <h2 className="landing-h2">La comida entra primero por los oídos</h2>
        <p className="landing-text">
          En el mundo del delivery y las redes sociales, la batalla por el cliente se gana antes de que llegue el pedido. Los restaurantes y negocios de comida que tienen una canción propia generan recordación mucho mayor que los que solo muestran fotos de platos.
        </p>
        <p className="landing-text">
          Pensá en lo que hace un jingle bien hecho: mientras suena en el Reel, el cliente ya está eligiendo qué pedir. Tu nombre, tu plato estrella y tu diferenciador quedan grabados sin esfuerzo. Eso es lo que separa a un negocio de comida memorable de uno genérico.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Para qué tipo de negocio de comida funciona</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🔥</div>
            <h3 className="landing-step-title">Parrillas y Asadores</h3>
            <p className="landing-step-text">
              El asado es identidad argentina. Una canción con folklore o rock nacional para tu parrilla transmite autenticidad, sabor y tradición. Ideal para pautar antes del fin de semana.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🍕</div>
            <h3 className="landing-step-title">Pizzerías y Delivery</h3>
            <p className="landing-step-text">
              Cumbia o pop enérgico para negocios de delivery rápido y pizzerías populares. La energía del género tiene que acompañar la velocidad del pedido.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🍽️</div>
            <h3 className="landing-step-title">Restaurantes y Bares</h3>
            <p className="landing-step-text">
              Pop, bossa nova o chill para restaurantes con ambiente. La canción no solo publicita: también forma parte de la experiencia del local.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Dónde usar el jingle de tu negocio de comida</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">📱</div>
            <h3 className="landing-step-title">Reels e Instagram Ads</h3>
            <p className="landing-step-text">
              Combiná el jingle con video de tus platos o de la cocina. Un Reel con música propia se distingue inmediatamente del contenido genérico y genera más engagement.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🛵</div>
            <h3 className="landing-step-title">Notificación de Delivery</h3>
            <p className="landing-step-text">
              Si tenés app propia o comunicás por WhatsApp, el jingle como audio de confirmación del pedido es un detalle que el cliente recuerda y comenta.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">📻</div>
            <h3 className="landing-step-title">Radio Local</h3>
            <p className="landing-step-text">
              Para restaurantes y parrillas en ciudades del interior, una pauta en radio el viernes a la tarde con el jingle llega directo a la gente que está pensando en qué comer el fin de semana.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá el jingle de tu restaurante en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos sobre tu negocio</h3>
            <p className="landing-step-text">
              Nombre del local, tipo de comida, barrio o ciudad, y qué lo hace especial.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              Folklore, Cumbia, Pop, Rock — el que mejor combine con la personalidad de tu negocio.
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
        <h2 className="landing-h2">Que hablen de tu comida antes de probarla.</h2>
        <p className="landing-text">
          En 2 minutos tenés el jingle de tu restaurante, parrilla o delivery listo para redes y radio.
        </p>
        <Link href="/" className="landing-cta-primary">
          🍖 Crear el Jingle de mi Restaurante Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué estilo musical funciona mejor para un restaurante?</summary>
            <div className="landing-faq-answer">
              Depende del tipo de local. Para parrillas, el folklore o el rock nacional. Para pizzerías y delivery, la cumbia o el pop enérgico. Para restaurantes con ambiente, algo más chill o bossa nova.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué debería decir el jingle de mi restaurante?</summary>
            <div className="landing-faq-answer">
              El nombre del local, el tipo de cocina o plato estrella, el barrio, y un diferenciador como ambiente familiar, delivery rápido o ingredientes frescos.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usar el jingle para pautar en redes sociales?</summary>
            <div className="landing-faq-answer">
              Sí. La licencia comercial te permite usarlo en Instagram Ads, Facebook Ads, TikTok, YouTube y cualquier plataforma sin restricciones.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto cuesta?</summary>
            <div className="landing-faq-answer">
              Escuchar es gratis. Descargar cuesta $8.900 ARS pago único con Mercado Pago, sin tarjeta internacional.
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
            <Link href="/jingle-para-almacen" className="landing-footer-link">Jingle para Almacén</Link>
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
