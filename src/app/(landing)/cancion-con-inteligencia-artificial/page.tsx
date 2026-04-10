import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Crear Canción con Inteligencia Artificial | Cancionesia',
  description: 'Creá una canción con inteligencia artificial en 2 minutos. Letra y música originales generadas por IA para tu negocio o marca. Sin conocimientos musicales. Gratis.',
  keywords: 'cancion con inteligencia artificial, crear canción con ia, hacer canción con inteligencia artificial, música con ia, canción ia argentina, generador de canciones ia',
  openGraph: {
    title: 'Crear Canción con Inteligencia Artificial | Cancionesia',
    description: 'Creá una canción con IA en 2 minutos. Letra y música originales para tu negocio. Sin conocimientos musicales. Gratis para escuchar.',
    url: '/cancion-con-inteligencia-artificial',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/cancion-con-inteligencia-artificial',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo funciona la inteligencia artificial para crear canciones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La IA analiza la descripción de tu marca, el estilo musical que elegiste, y genera simultáneamente la letra (con rimas, verso y estribillo) y la música (melodía, arreglos, instrumentos, ritmo) en menos de 2 minutos. Es el resultado de entrenar modelos con millones de canciones para aprender los patrones musicales de cada género.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La canción generada por IA es de buena calidad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La calidad del audio es profesional (192kbps MP3 o superior). La letra tiene coherencia, rimas y estructura musical correcta. Más de 2,100 negocios argentinos ya usan canciones creadas con nuestra IA en su publicidad y redes sociales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La canción generada por IA tiene derechos de autor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Al descargar, obtenés una licencia comercial que te permite usar la canción libremente en tus publicidades, redes sociales y cualquier medio. La canción es generada originalmente para vos y no tiene restricciones de uso comercial.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tan diferente es cada canción generada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cada generación produce canciones únicas. Incluso si dos personas describen negocios similares, la IA genera composiciones completamente diferentes. Además, para cada pedido se generan 2 versiones distintas para que elijas la que más te guste.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito saber de música para usar la IA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Solo necesitás saber qué es tu negocio y qué querés comunicar. La IA se encarga de toda la parte musical: composición, arreglos, letra, melodía y producción.',
      },
    },
  ],
}

export default function CancionConInteligenciaArtificial() {
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
          Crear una Canción con<br />
          <span className="landing-gradient">Inteligencia Artificial</span>
        </h1>

        <p className="landing-lead">
          Letra y música originales generadas por IA en 2 minutos.<br />
          Para tu negocio, tu marca o tus redes. Sin conocimientos musicales. Gratis.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🤖 Crear mi Canción con IA
          </Link>
          <div className="landing-trust-badge">
            ✅ Gratis para escuchar • 2,100+ canciones creadas
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">2,100+</div>
            <div className="landing-stat-label">Canciones generadas</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">2 min</div>
            <div className="landing-stat-label">Tiempo promedio</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">12</div>
            <div className="landing-stat-label">Géneros disponibles</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">La IA que compone canciones para tu marca</h2>
        <p className="landing-text">
          Durante décadas, crear una canción original requería músicos, compositores, estudios de grabación, cantantes y semanas de trabajo. El costo mínimo era de $50,000 ARS, y muchas veces superaba los $200,000. Eso dejaba fuera a la mayoría de los negocios y emprendedores.
        </p>
        <p className="landing-text">
          La <strong>inteligencia artificial</strong> cambió todo eso. Hoy, un modelo de IA entrenado con millones de canciones puede generar en 2 minutos una canción original con letra personalizada, melodía, arreglos y voz —todo adaptado a tu negocio y al estilo musical que elegís.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">¿Qué hace la IA exactamente?</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">✍️</div>
            <h3 className="landing-step-title">Escribe la letra</h3>
            <p className="landing-step-text">
              Genera un texto con rimas, estructura de verso y estribillo, y el mensaje que describiste. El nombre de tu negocio aparece en la canción.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎼</div>
            <h3 className="landing-step-title">Compone la música</h3>
            <p className="landing-step-text">
              Crea melodía, armonía, ritmo e instrumentación en el género musical que elegiste. Cada canción es una composición original, nunca una copia.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎤</div>
            <h3 className="landing-step-title">Produce el audio</h3>
            <p className="landing-step-text">
              Combina todo en un audio de alta calidad con voz, instrumentos y producción profesional lista para usar.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Cómo crear tu canción con IA</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Describí tu negocio o marca</h3>
            <p className="landing-step-text">
              Nombre, rubro, mensaje y estilo. La IA usa esa información como base para toda la composición.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el género musical</h3>
            <p className="landing-step-text">
              Pop, Cumbia, Reggaetón, Folklore, Trap, Rock y más. La IA adapta la canción al estilo elegido.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Escuchá gratis, descargá si te gusta</h3>
            <p className="landing-step-text">
              La IA genera 2 versiones en minutos. Escuchás sin cargo. Descargás con licencia comercial por $8,900 ARS.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">La IA que trabaja para tu negocio</h2>
        <p className="landing-text">
          En 2 minutos, la inteligencia artificial crea la canción de tu marca. Gratis para escuchar.
        </p>
        <Link href="/" className="landing-cta-primary">
          🤖 Crear mi Canción con IA Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cómo funciona la inteligencia artificial para crear canciones?</summary>
            <div className="landing-faq-answer">
              La IA analiza la descripción de tu marca y el estilo musical elegido, y genera simultáneamente la letra (con rimas, verso y estribillo) y la música (melodía, arreglos, instrumentos, ritmo) en menos de 2 minutos.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿La canción generada por IA es de buena calidad?</summary>
            <div className="landing-faq-answer">
              Sí. La calidad del audio es profesional. La letra tiene coherencia, rimas y estructura musical correcta. Más de 2,100 negocios argentinos ya usan canciones creadas con nuestra IA en su publicidad y redes sociales.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿La canción generada por IA tiene derechos de autor?</summary>
            <div className="landing-faq-answer">
              Al descargar, obtenés una licencia comercial que te permite usar la canción libremente en tus publicidades, redes sociales y cualquier medio sin restricciones.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué tan diferente es cada canción generada?</summary>
            <div className="landing-faq-answer">
              Cada generación produce canciones únicas. Incluso si dos personas describen negocios similares, la IA genera composiciones completamente diferentes. Para cada pedido se generan 2 versiones distintas para que elijas la que más te guste.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Necesito saber de música para usar la IA?</summary>
            <div className="landing-faq-answer">
              No. Solo necesitás saber qué es tu negocio y qué querés comunicar. La IA se encarga de toda la parte musical: composición, arreglos, letra, melodía y producción.
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
            <Link href="/cancion-para-mi-marca" className="landing-footer-link">Canción para mi Marca</Link>
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
