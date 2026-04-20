import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Generador de Jingles en Pesos | Pagá con Mercado Pago | Cancionesia',
  description: 'El único generador de jingles con IA que te deja pagar en pesos argentinos con Mercado Pago. Sin tarjeta internacional, sin USD, sin suscripción. Hecho en Argentina.',
  keywords: 'generador jingles pesos argentinos, jingle mercado pago, jingle pagar en pesos, generador canciones argentina, jingle sin tarjeta internacional, canción para marca en pesos',
  alternates: {
    canonical: 'https://cancionesia.com.ar/generador-jingles-pesos-mercadopago',
  },
  openGraph: {
    title: 'Generador de Jingles en Pesos | Pagá con Mercado Pago',
    description: 'El único generador de jingles con IA donde pagás en pesos con Mercado Pago. Sin tarjeta internacional. Hecho en Argentina.',
    url: 'https://cancionesia.com.ar/generador-jingles-pesos-mercadopago',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Puedo pagar con Mercado Pago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Cancionesia es el único generador de jingles con IA que acepta Mercado Pago. Podés pagar con saldo de tu cuenta de Mercado Pago, tarjeta de débito o crédito argentina, o cualquier medio de pago disponible en la plataforma.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta en pesos argentinos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La descarga con licencia comercial tiene un costo de $8.900 ARS pago único. No hay suscripción mensual ni cargos recurrentes. Generar y escuchar las versiones es completamente gratis.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué los otros generadores de jingles no aceptan pesos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Suno, TopMediai y los demás generadores de IA son plataformas estadounidenses o asiáticas que solo aceptan pagos en dólares con tarjeta internacional. Esto deja fuera a la mayoría de los emprendedores argentinos que no tienen tarjeta con habilitación internacional o que prefieren no pagar en USD.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El precio incluye el IVA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El precio de $8.900 ARS es el precio final. No hay costos adicionales ni sorpresas al momento de pagar.',
      },
    },
  ],
}

export default function GeneradorJinglesPesosMercadopago() {
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
          Generador de Jingles en Pesos<br />
          <span className="landing-gradient">Pagá con Mercado Pago</span>
        </h1>

        <p className="landing-lead">
          El único generador de jingles con IA para emprendedores argentinos.<br />
          Sin tarjeta internacional. Sin dólares. Sin suscripción. Hecho en Argentina.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🎵 Crear mi Jingle en Pesos
          </Link>
          <div className="landing-trust-badge">
            ✅ Gratis para escuchar • $8.900 ARS pago único
          </div>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <div className="landing-stat-value">$8.900</div>
            <div className="landing-stat-label">ARS pago único</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">Mercado Pago</div>
            <div className="landing-stat-label">Medio de pago</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-value">2 min</div>
            <div className="landing-stat-label">Para tener tu jingle</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">Por qué los otros generadores de jingles no sirven para Argentina</h2>
        <p className="landing-text">
          Suno, TopMediai, Musely y todas las herramientas de generación de jingles con IA del mercado tienen algo en común: solo aceptan pagos en dólares con tarjeta internacional. Para un emprendedor argentino que quiere una canción para su negocio, eso significa dólares que no tiene, una tarjeta que no está habilitada, o precios que no cierran con la economía local.
        </p>
        <p className="landing-text">
          Cancionesia es la única opción construida para Argentina. Pagás en pesos, con Mercado Pago, como cualquier otra compra que hacés online todos los días. Sin fricciones, sin conversión de moneda, sin cargo internacional.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Comparativa: Cancionesia vs. alternativas internacionales</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🇦🇷</div>
            <h3 className="landing-step-title">Cancionesia</h3>
            <p className="landing-step-text">
              $8.900 ARS pago único. Pago con Mercado Pago. Generación gratis. Licencia comercial incluida. Soporte en español. Géneros argentinos (cumbia, cuarteto, folklore). Hecho en Argentina.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🇺🇸</div>
            <h3 className="landing-step-title">Suno / TopMediai / Musely</h3>
            <p className="landing-step-text">
              USD 8–27/mes (suscripción obligatoria). Solo tarjeta internacional. Interfaz en inglés. Sin géneros argentinos específicos. Sin soporte local. Facturación automática que puede ser difícil de cancelar.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Cómo funciona el pago</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Generás y escuchás gratis</h3>
            <p className="landing-step-text">
              Completás el formulario con los datos de tu marca y escuchás las 2 versiones generadas por la IA. Sin registrarte, sin tarjeta, sin ningún compromiso.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegís la versión que más te gusta</h3>
            <p className="landing-step-text">
              Comparás las 2 versiones y elegís la que mejor representa a tu marca. Si ninguna te convence, podés volver a generar tantas veces como quieras.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Pagás $8.900 ARS con Mercado Pago</h3>
            <p className="landing-step-text">
              Un solo pago de $8.900 ARS con Mercado Pago. Podés usar saldo en cuenta, tarjeta de débito o crédito argentina. Descargás la canción con licencia comercial incluida.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Qué incluye la descarga</h2>
        <ul className="landing-list">
          <li><strong>Archivo MP3 a 320 kbps</strong> — calidad de producción profesional, listo para cualquier plataforma.</li>
          <li><strong>Licencia comercial completa</strong> — usá la canción en Instagram, TikTok, YouTube, radio, TV, publicidad digital y cualquier otro medio.</li>
          <li><strong>Sin royalties ni pagos posteriores</strong> — pagás una vez y la canción es tuya para siempre.</li>
          <li><strong>Sin restricciones de uso</strong> — no hay límite de reproducciones, plataformas ni territorios.</li>
        </ul>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">El jingle de tu negocio, al precio de Argentina.</h2>
        <p className="landing-text">
          Generá gratis, pagá en pesos. Sin dólares, sin tarjeta internacional, sin complicaciones.
        </p>
        <Link href="/" className="landing-cta-primary">
          🎵 Crear mi Jingle en Pesos Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo pagar con Mercado Pago?</summary>
            <div className="landing-faq-answer">
              Sí. Es el único medio de pago disponible. Podés usar saldo en tu cuenta de Mercado Pago, tarjeta de débito o crédito argentina.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto cuesta en pesos?</summary>
            <div className="landing-faq-answer">
              $8.900 ARS pago único. No hay suscripción ni cargos recurrentes. Generar y escuchar es gratis.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Por qué los otros generadores no aceptan pesos?</summary>
            <div className="landing-faq-answer">
              Suno, TopMediai y similares son plataformas extranjeras que solo operan en USD con tarjeta internacional. Cancionesia fue construido específicamente para el mercado argentino.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿El precio incluye el IVA?</summary>
            <div className="landing-faq-answer">
              El precio de $8.900 ARS es el precio final, sin costos adicionales.
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
            <h4 className="landing-footer-title">Jingles por negocio</h4>
            <Link href="/jingle-para-peluqueria" className="landing-footer-link">Para Peluquería</Link>
            <Link href="/jingle-para-ferreteria" className="landing-footer-link">Para Ferretería</Link>
            <Link href="/jingle-para-restaurant" className="landing-footer-link">Para Restaurante</Link>
            <Link href="/jingle-para-emprendimiento" className="landing-footer-link">Para Emprendimiento</Link>
          </div>
        </div>
        <div className="landing-footer-bottom">
          © 2025 Cancionesia. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
