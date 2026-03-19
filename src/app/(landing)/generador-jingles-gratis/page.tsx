import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Generador de Jingles Gratis con IA | Jingle Generator',
  description: 'Creá jingles profesionales para tu marca en minutos con inteligencia artificial. Gratis, sin registro. Elegí tu estilo musical y generá 2 versiones únicas.',
  keywords: 'generador de jingles gratis, crear jingle con ia, jingle para marca, música publicitaria, jingle gratis argentina',
  openGraph: {
    title: 'Generador de Jingles Gratis con IA',
    description: 'Creá jingles profesionales para tu marca en minutos con IA. Gratis y sin registro.',
    url: '/generador-jingles-gratis',
  },
}

export default function GeneradorJinglesGratis() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <Link href="/" className="landing-logo">
          🎵 Jingle Generator
        </Link>
        <Link href="/" className="landing-nav-cta">
          Generar Gratis
        </Link>
      </nav>

      <header className="landing-hero">
        <h1 className="landing-h1">
          Generador de Jingles Gratis<br />
          <span className="landing-gradient">con Inteligencia Artificial</span>
        </h1>
        
        <p className="landing-lead">
          Creá jingles profesionales para tu marca en minutos.<br />
          Sin conocimientos musicales. Sin registro. 100% gratis.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🎵 Generar mi Jingle Gratis
          </Link>
          <div className="landing-trust-badge">
            ✅ Sin tarjeta • 2 versiones únicas
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">2,000+</div>
            <div className="landing-stat-label">Jingles creados</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">30 seg</div>
            <div className="landing-stat-label">Tiempo promedio</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">10+</div>
            <div className="landing-stat-label">Estilos musicales</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">¿Qué es un generador de jingles?</h2>
        <p className="landing-text">
          Un <strong>generador de jingles</strong> es una herramienta que utiliza inteligencia artificial para crear música publicitaria personalizada. A diferencia de contratar un estudio de grabación (que puede costar desde $50,000 hasta $200,000 ARS), nuestro generador crea jingles profesionales en minutos por una fracción del costo.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">¿Cómo funciona?</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos sobre tu marca</h3>
            <p className="landing-step-text">
              Nombre de tu marca, tipo de negocio, y qué querés comunicar.
            </p>
          </div>
          
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              Pop, Rock, Cumbia, Reggaeton, Jazz, Electrónica y más.
            </p>
          </div>
          
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Generá y descargá</h3>
            <p className="landing-step-text">
              En 30 segundos tenés 2 versiones únicas. Escuchá y elegí tu favorita.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Estilos musicales disponibles</h2>
        <div className="landing-genres">
          <div className="landing-genre">🎸 Rock</div>
          <div className="landing-genre">🎹 Pop</div>
          <div className="landing-genre">🪘 Cumbia</div>
          <div className="landing-genre">🎺 Reggaeton</div>
          <div className="landing-genre">🎷 Jazz</div>
          <div className="landing-genre">🎵 Blues</div>
          <div className="landing-genre">⚡ Electrónica</div>
          <div className="landing-genre">🎻 Country</div>
          <div className="landing-genre">🥁 Trap</div>
          <div className="landing-genre">🎶 Hip Hop</div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">¿Listo para crear tu jingle?</h2>
        <p className="landing-text">
          Usá nuestro generador ahora. Es gratis y no necesitás registrarte.
        </p>
        <Link href="/" className="landing-cta-primary">
          🎵 Generar mi Jingle Gratis
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Es realmente gratis?</summary>
            <div className="landing-faq-answer">
              Sí. Podés generar 2 versiones únicas de tu jingle completamente gratis. No pedimos tarjeta de crédito ni registro. Si querés descargar la canción completa en alta calidad, tiene un costo único de $8,900 ARS.
            </div>
          </details>

          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto tarda en generar un jingle?</summary>
            <div className="landing-faq-answer">
              El proceso completo toma entre 30 segundos y 2 minutos. La IA compone la música, escribe la letra y genera el audio en tiempo real.
            </div>
          </details>

          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usar el jingle comercialmente?</summary>
            <div className="landing-faq-answer">
              Sí. Una vez que descargás el jingle, tenés todos los derechos de uso comercial. Podés usarlo en tu publicidad, redes sociales, radio, TV, y cualquier otro medio.
            </div>
          </details>

          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué diferencia hay entre las 2 versiones?</summary>
            <div className="landing-faq-answer">
              Cada versión tiene una composición musical diferente, melodía única, y estructura distinta. Así podés elegir la que mejor represente tu marca.
            </div>
          </details>

          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Necesito conocimientos musicales?</summary>
            <div className="landing-faq-answer">
              No. El generador hace todo el trabajo creativo. Solo necesitás contarnos sobre tu marca y elegir el estilo musical que más te guste.
            </div>
          </details>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-brand">
            <div className="landing-logo">🎵 Jingle Generator</div>
            <p className="landing-footer-text">
              Jingles profesionales con IA.<br />
              Hecho en Argentina 🇦🇷
            </p>
          </div>
          
          <div className="landing-footer-links">
            <h4 className="landing-footer-title">Recursos</h4>
            <Link href="/como-crear-jingle-para-marca" className="landing-footer-link">
              Cómo crear un jingle
            </Link>
            <Link href="/ejemplos-jingles-marcas-argentinas" className="landing-footer-link">
              Ejemplos de jingles
            </Link>
          </div>
        </div>
        
        <div className="landing-footer-bottom">
          © 2025 Jingle Generator. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
