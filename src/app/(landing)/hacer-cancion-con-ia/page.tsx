import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hacer Canción con IA para mi Marca | Cancionesia Argentina',
  description: 'Aprendé cómo hacer una canción con inteligencia artificial para tu marca o negocio. Guía completa + generador online gratis. Sin conocimientos musicales. Pagás en pesos.',
  keywords: 'hacer canción con ia, crear canción inteligencia artificial, cómo hacer un jingle con ia, canción con ia para mi marca, crear música con ia argentina, generador canciones ia',
  alternates: {
    canonical: 'https://cancionesia.com.ar/hacer-cancion-con-ia',
  },
  openGraph: {
    title: 'Hacer Canción con IA para mi Marca | Cancionesia',
    description: 'Guía completa + herramienta online para crear canciones con IA para tu marca. Sin conocimientos musicales. Pagás en pesos.',
    url: 'https://cancionesia.com.ar/hacer-cancion-con-ia',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Necesito conocimientos musicales para hacer una canción con IA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La IA se encarga de toda la parte técnica: composición musical, armonías, producción y letra. Solo necesitás describir tu marca y elegir el estilo musical. No hace falta saber leer música, tocar ningún instrumento ni conocer términos técnicos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo lleva hacer una canción con IA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entre 1 y 3 minutos desde que completás el formulario hasta que tenés las primeras versiones para escuchar. Es significativamente más rápido que cualquier método de producción musical tradicional.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La canción generada con IA tiene derechos de autor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Al descargar tu canción de Cancionesia recibís una licencia comercial completa que te permite usarla en publicidad, redes sociales, radio y cualquier otro medio sin pagar royalties. La canción es tuya.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es mejor hacer la canción con IA o contratar un músico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depende del objetivo. Para publicidad en redes, radio local y marketing digital, la IA ofrece velocidad, costo y personalización que un músico no puede igualar. Para producciones de alta gama con instrumentos en vivo o interpretación artística compleja, un músico sigue siendo la mejor opción.',
      },
    },
  ],
}

export default function HacerCancionConIa() {
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
          Cómo Hacer una Canción<br />
          <span className="landing-gradient">con Inteligencia Artificial</span>
        </h1>

        <p className="landing-lead">
          Guía completa para crear la canción de tu marca con IA.<br />
          Sin conocimientos musicales. En 2 minutos. Pagás en pesos.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🎵 Crear mi Canción con IA
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
            <div className="landing-stat-value">0 conocimientos</div>
            <div className="landing-stat-label">Musicales necesarios</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">$8.900</div>
            <div className="landing-stat-label">ARS pago único</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">¿Qué es hacer una canción con IA?</h2>
        <p className="landing-text">
          La inteligencia artificial para música funciona de forma similar a como ChatGPT genera texto: le describís lo que querés y la IA lo crea. En este caso, le describís tu marca, tu negocio y el estilo musical, y la IA compone la música, escribe la letra y genera el audio completo.
        </p>
        <p className="landing-text">
          El resultado es una canción profesional con melodía, armonías, instrumentos, voz y letra personalizada con el nombre y mensaje de tu marca. Todo en minutos, sin estudio, sin músicos, sin ningún conocimiento técnico de tu parte.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Paso a paso: cómo hacer tu canción con IA</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Describí tu marca</h3>
            <p className="landing-step-text">
              Completá el formulario con el nombre de tu negocio, qué ofrecés, a quién le vendés y el mensaje que querés transmitir. Cuanto más detalle, mejor resultado. Podés escribir "ferretería familiar en Lomas de Zamora" o "tienda de ropa juvenil para chicas de 15 a 25 años".
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              Seleccioná el género que mejor represente la personalidad de tu marca: Cumbia, Pop, Folklore, Reggaetón, Trap, y más. Si no sabés cuál elegir, pensá en la música que escuchan tus clientes.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">La IA genera la letra (opcional)</h3>
            <p className="landing-step-text">
              Si querés, la IA escribe la letra completa de la canción en base a los datos que cargaste. También podés escribir tu propia letra si tenés algo específico en mente.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">4</div>
            <h3 className="landing-step-title">Escuchás las versiones</h3>
            <p className="landing-step-text">
              En 1–3 minutos la IA genera 2 versiones distintas de tu canción. Las escuchás en el reproductor sin descargar ni pagar nada.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">5</div>
            <h3 className="landing-step-title">Descargás la que más te gusta</h3>
            <p className="landing-step-text">
              Si alguna versión te representa, la descargás por $8.900 ARS con Mercado Pago. Si ninguna te convence, podés volver a generar gratis cuantas veces quieras.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Canción con IA vs. producción musical tradicional</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🤖</div>
            <h3 className="landing-step-title">Con IA (Cancionesia)</h3>
            <p className="landing-step-text">
              2 minutos de espera. $8.900 ARS pago único. Sin reuniones, sin briefings, sin idas y vueltas. Versiones ilimitadas gratis hasta encontrar la ideal. Licencia comercial inmediata.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎸</div>
            <h3 className="landing-step-title">Con músico o estudio</h3>
            <p className="landing-step-text">
              1–3 semanas de producción. $50.000–$300.000 ARS según el estudio. Múltiples reuniones de briefing. Revisiones con costo adicional. Derechos que pueden ser compartidos.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Para qué usarla una vez que la tenés</h2>
        <ul className="landing-list">
          <li><strong>Redes sociales:</strong> Reels de Instagram, TikToks, YouTube Shorts, Stories.</li>
          <li><strong>Publicidad digital:</strong> Instagram Ads, TikTok Ads, Facebook Ads con audio original.</li>
          <li><strong>WhatsApp Business:</strong> Estado semanal con tu canción como publicidad directa a clientes.</li>
          <li><strong>Radio local:</strong> Cuña radial lista para emitir en AM y FM argentinas.</li>
          <li><strong>Local o punto de venta:</strong> Música propia en el ambiente de tu negocio.</li>
          <li><strong>Presentaciones y eventos:</strong> Jingle de entrada, cortina musical, identidad en ferias y exposiciones.</li>
        </ul>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Listo para hacer tu primera canción con IA.</h2>
        <p className="landing-text">
          No necesitás saber música. No necesitás una tarjeta internacional. Solo el nombre de tu marca y dos minutos.
        </p>
        <Link href="/" className="landing-cta-primary">
          🎵 Crear mi Canción con IA Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Necesito conocimientos musicales?</summary>
            <div className="landing-faq-answer">
              No. La IA se encarga de composición, armonías y producción. Solo describís tu marca y elegís el estilo.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto tiempo lleva?</summary>
            <div className="landing-faq-answer">
              Entre 1 y 3 minutos desde que completás el formulario hasta tener las versiones para escuchar.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿La canción con IA tiene derechos de autor?</summary>
            <div className="landing-faq-answer">
              Al descargar recibís licencia comercial completa. Podés usarla en publicidad, redes y radio sin pagar royalties.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Es mejor IA o contratar un músico?</summary>
            <div className="landing-faq-answer">
              Para publicidad en redes y radio local, la IA es más rápida, barata y flexible. Para producciones artísticas de alta gama, un músico puede aportar más matiz.
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
            <h4 className="landing-footer-title">Recursos relacionados</h4>
            <Link href="/jingle-para-emprendimiento" className="landing-footer-link">Jingle para Emprendimiento</Link>
            <Link href="/cancion-para-mis-redes" className="landing-footer-link">Canción para mis Redes</Link>
            <Link href="/como-crear-jingle-para-marca" className="landing-footer-link">Guía: Crear Jingle para Marca</Link>
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
