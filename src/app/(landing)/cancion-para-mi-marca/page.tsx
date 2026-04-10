import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Canción para mi Marca con IA | Cancionesia',
  description: 'Creá una canción original para tu marca con inteligencia artificial. Letra personalizada, música profesional, licencia comercial. Escuchás gratis en 2 minutos.',
  keywords: 'canción para mi marca, cancion para marca, hacer canción para marca, música para mi marca, canción personalizada para marca, canción publicitaria para marca',
  openGraph: {
    title: 'Canción para mi Marca con IA | Cancionesia',
    description: 'Creá una canción original para tu marca con IA en 2 minutos. Letra personalizada y licencia comercial incluida.',
    url: '/cancion-para-mi-marca',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/cancion-para-mi-marca',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué diferencia hay entre una canción para mi marca y un jingle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En la práctica, es lo mismo: una pieza musical corta diseñada para representar a tu marca. La diferencia está en el enfoque: una "canción para la marca" puede ser más larga (30-60 segundos), tener más desarrollo narrativo y funcionar tanto como jingle publicitario como como canción completa para redes sociales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo sabe la IA qué canción hacer para mi marca?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vos le contás: el nombre de tu marca, qué ofrecés, quién es tu cliente ideal, y el estilo musical que preferís. Con esa información, la IA genera letra y música 100% original y personalizada para representar exactamente lo que es tu marca.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La canción puede reflejar los valores de mi marca?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Cuanto más detallada sea tu descripción —valores, tono de comunicación, tipo de cliente, emoción que querés generar— más alineada estará la canción con la identidad de tu marca. Podés pedir un tono alegre, profesional, emotivo, enérgico, etc.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Tengo los derechos exclusivos de la canción?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Al descargar, obtenés licencia comercial para usar la canción en todos tus medios de comunicación. Cada canción generada es única, por lo que no hay dos marcas con la misma canción.',
      },
    },
  ],
}

export default function CancionParaMiMarca() {
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
          Una Canción Original<br />
          <span className="landing-gradient">para tu Marca</span>
        </h1>

        <p className="landing-lead">
          Letra personalizada. Música profesional. La identidad sonora de tu marca.<br />
          Creada por IA en 2 minutos. Escuchás gratis. Sin registro.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🎵 Crear la Canción de mi Marca
          </Link>
          <div className="landing-trust-badge">
            ✅ Gratis para escuchar • Licencia comercial incluida al descargar
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">2,100+</div>
            <div className="landing-stat-label">Marcas con su canción</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">2 min</div>
            <div className="landing-stat-label">Tiempo de creación</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">12</div>
            <div className="landing-stat-label">Estilos musicales</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">La identidad sonora de tu marca</h2>
        <p className="landing-text">
          Las marcas más reconocidas del mundo tienen algo en común: un sonido propio. No es casualidad. La <strong>identidad sonora</strong> —la música y los sonidos que representan a una marca— es tan importante como el logo o los colores corporativos. El cerebro procesa los sonidos de manera emocional y directa, generando asociaciones que duran años.
        </p>
        <p className="landing-text">
          Hasta hace poco, tener una canción para tu marca era caro y complicado: necesitabas contratar un compositor, un estudio de grabación, cantantes y pagar derechos. Hoy, con Cancionesia, cualquier marca puede tener su canción original en 2 minutos y por una fracción del costo.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">¿Qué hace una buena canción para una marca?</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">💡</div>
            <h3 className="landing-step-title">Refleja la personalidad de la marca</h3>
            <p className="landing-step-text">
              El estilo musical, el tono de la letra y el ritmo tienen que estar alineados con quién sos como marca. Una marca joven y dinámica no suena igual que una marca tradicional y de confianza.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎯</div>
            <h3 className="landing-step-title">Habla al cliente ideal</h3>
            <p className="landing-step-text">
              La canción perfecta conecta emocionalmente con las personas a las que le querés vender. La IA adapta la música y la letra al perfil de tu audiencia.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🔁</div>
            <h3 className="landing-step-title">Es memorable y repetible</h3>
            <p className="landing-step-text">
              Un buen gancho musical hace que la gente tararee tu canción sin darse cuenta, manteniendo tu marca presente en su mente todo el tiempo.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Cómo crear la canción de tu marca</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Describí tu marca</h3>
            <p className="landing-step-text">
              Nombre, rubro, valores, tono de comunicación y qué emoción querés generar. Cuanto más detallado, mejor resultado.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              12 géneros disponibles: Pop, Rock, Cumbia, Folklore, Reggaetón, Trap y más. El que mejor represente a tu marca.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Escuchá 2 versiones únicas</h3>
            <p className="landing-step-text">
              Completamente gratis. Descargás la que más te guste con licencia comercial incluida por $8,900 ARS.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Tu marca tiene historia. Que también tenga su canción.</h2>
        <p className="landing-text">
          En 2 minutos, tu marca tiene su identidad sonora. Gratis para escuchar.
        </p>
        <Link href="/" className="landing-cta-primary">
          🎵 Crear la Canción de mi Marca Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué diferencia hay entre una canción para mi marca y un jingle?</summary>
            <div className="landing-faq-answer">
              En la práctica, es lo mismo: una pieza musical corta diseñada para representar a tu marca. La diferencia está en el enfoque: una canción para la marca puede ser más larga, tener más desarrollo narrativo y funcionar tanto como jingle publicitario como canción completa para redes sociales.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cómo sabe la IA qué canción hacer para mi marca?</summary>
            <div className="landing-faq-answer">
              Vos le contás: el nombre de tu marca, qué ofrecés, quién es tu cliente ideal y el estilo musical que preferís. Con esa información, la IA genera letra y música 100% original y personalizada.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿La canción puede reflejar los valores de mi marca?</summary>
            <div className="landing-faq-answer">
              Sí. Cuanto más detallada sea tu descripción —valores, tono, tipo de cliente, emoción que querés generar— más alineada estará la canción con la identidad de tu marca.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Tengo los derechos exclusivos de la canción?</summary>
            <div className="landing-faq-answer">
              Sí. Al descargar, obtenés licencia comercial para usar la canción en todos tus medios. Cada canción generada es única, por lo que no hay dos marcas con la misma canción.
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
            <Link href="/cancion-para-mi-negocio" className="landing-footer-link">Canción para mi Negocio</Link>
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
