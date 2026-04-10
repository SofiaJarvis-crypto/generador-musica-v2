import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle de Reggaetón para tu Marca | Creá con IA | Cancionesia',
  description: 'Creá un jingle de reggaetón para tu marca con inteligencia artificial. Ideal para negocios jóvenes, ropa, tecnología y servicios digitales. Escuchás gratis.',
  keywords: 'jingle de reggaeton, reggaeton para publicidad, jingle reggaeton marca, música reggaeton publicidad, jingle urbano argentina',
  openGraph: {
    title: 'Jingle de Reggaetón para tu Marca | Cancionesia',
    description: 'Creá un jingle de reggaetón con IA en 2 minutos. Conectá con el público joven. Gratis y sin registro.',
    url: '/jingle-de-reggaeton',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-de-reggaeton',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿El reggaetón funciona para publicidad de negocios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutamente. El reggaetón es uno de los géneros más escuchados en Argentina y Latinoamérica. Su ritmo energético y repetitivo hace que los mensajes publicitarios se graben fácilmente en la memoria, especialmente en el público de 16 a 35 años.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué marcas usan reggaetón en su publicidad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Marcas de ropa urbana, zapatillas, bebidas energéticas, apps de delivery, servicios financieros jóvenes, gimnasios, y cualquier negocio que quiera proyectar una imagen moderna, dinámica y conectada con la cultura pop actual.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El jingle tendrá letra personalizada con el nombre de mi marca?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La IA genera letra original con el nombre de tu marca, tu mensaje clave y el estilo de reggaetón que elijas. Cada jingle es único y personalizado para tu negocio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar el jingle en TikTok e Instagram?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, con la descarga obtenés licencia comercial completa para redes sociales, stories, reels, TikTok, YouTube Ads, Spotify Ads y cualquier plataforma digital.',
      },
    },
  ],
}

export default function JingleDeReggaeton() {
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
          Jingle de Reggaetón<br />
          <span className="landing-gradient">para tu Marca</span>
        </h1>

        <p className="landing-lead">
          El sonido que domina las playlists, ahora en el jingle de tu negocio.<br />
          Crealo con IA en 2 minutos. Conectá con el público joven. Sin registro.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            💃 Crear mi Jingle de Reggaetón
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
        <h2 className="landing-h2">¿Por qué elegir reggaetón para tu jingle?</h2>
        <p className="landing-text">
          El <strong>reggaetón</strong> es hoy el género más escuchado en Argentina y toda Latinoamérica. Su patrón rítmico —el famoso <em>dembow</em>— es hipnótico y repetitivo por naturaleza, lo que lo convierte en el vehículo ideal para mensajes publicitarios que quieran quedarse grabados en la mente del consumidor.
        </p>
        <p className="landing-text">
          Si tu público tiene entre 16 y 40 años, el reggaetón habla su idioma. No es solo música: es una señal de que tu marca está actualizada, conectada y en sintonía con la cultura del momento.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Marcas que funcionan con reggaetón</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">👟</div>
            <h3 className="landing-step-title">Moda y Estilo Urbano</h3>
            <p className="landing-step-text">
              Tiendas de ropa, zapatillas, accesorios. El reggaetón comunica actitud, tendencia y pertenencia a la cultura urbana.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">📱</div>
            <h3 className="landing-step-title">Tecnología y Apps</h3>
            <p className="landing-step-text">
              Apps, servicios digitales, e-commerce. Un jingle de reggaetón posiciona tu marca como moderna e innovadora.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🍔</div>
            <h3 className="landing-step-title">Gastronomía y Delivery</h3>
            <p className="landing-step-text">
              Restaurantes, hamburgueserías, heladerías, cafés. El ritmo del reggaetón da energía y apetito al mismo tiempo.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá tu jingle en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Describí tu marca</h3>
            <p className="landing-step-text">
              Nombre, rubro y mensaje principal. La IA lo convierte en letra original de reggaetón.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí Reggaetón</h3>
            <p className="landing-step-text">
              Seleccioná el estilo en el generador. Podés ajustar la energía (suave, media o alta).
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Escuchá gratis, descargá cuando quieras</h3>
            <p className="landing-step-text">
              Obtenés 2 versiones únicas. Descargá con licencia comercial por $8,900 ARS pago único.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Tu marca, al ritmo del reggaetón</h2>
        <p className="landing-text">
          En 2 minutos tenés el jingle de reggaetón de tu negocio. Gratis para escuchar.
        </p>
        <Link href="/" className="landing-cta-primary">
          💃 Crear mi Jingle de Reggaetón Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿El reggaetón funciona para publicidad de negocios?</summary>
            <div className="landing-faq-answer">
              Absolutamente. El reggaetón es uno de los géneros más escuchados en Argentina. Su ritmo energético y repetitivo hace que los mensajes publicitarios se graben fácilmente en la memoria, especialmente en el público de 16 a 35 años.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué marcas usan reggaetón en su publicidad?</summary>
            <div className="landing-faq-answer">
              Marcas de ropa urbana, zapatillas, bebidas energéticas, apps de delivery, servicios financieros jóvenes, gimnasios, y cualquier negocio que quiera proyectar una imagen moderna y conectada con la cultura pop actual.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿El jingle tendrá letra personalizada con el nombre de mi marca?</summary>
            <div className="landing-faq-answer">
              Sí. La IA genera letra original con el nombre de tu marca, tu mensaje clave y el estilo de reggaetón que elijas. Cada jingle es único y personalizado para tu negocio.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usar el jingle en TikTok e Instagram?</summary>
            <div className="landing-faq-answer">
              Sí, con la descarga obtenés licencia comercial completa para redes sociales, stories, reels, TikTok, YouTube Ads, Spotify Ads y cualquier plataforma digital.
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
            <Link href="/jingle-de-cumbia" className="landing-footer-link">Jingle de Cumbia</Link>
            <Link href="/jingle-de-pop" className="landing-footer-link">Jingle de Pop</Link>
            <Link href="/jingle-de-trap" className="landing-footer-link">Jingle de Trap</Link>
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
