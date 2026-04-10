import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Canción para Redes Sociales | Instagram, TikTok y YouTube | Cancionesia',
  description: 'Creá una canción original para tus redes sociales con IA. Perfecta para Instagram Reels, TikTok, YouTube y Stories. Licencia comercial incluida. Gratis para escuchar.',
  keywords: 'canción para redes sociales, cancion para instagram, cancion para tiktok, música para redes sociales, cancion para mis redes, música para contenido, canción para reels',
  openGraph: {
    title: 'Canción para Redes Sociales | Cancionesia',
    description: 'Creá una canción original para Instagram, TikTok y YouTube con IA. Licencia comercial incluida. Gratis para escuchar.',
    url: '/cancion-para-redes-sociales',
  },
  alternates: {
    canonical: 'https://cancionesia.com.ar/cancion-para-redes-sociales',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Puedo usar la canción en Instagram Reels sin que me la bloqueen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Al descargar la canción obtenés una licencia comercial sobre una composición original generada por IA. Al ser una obra original (no una canción de artista famoso), no va a ser detectada por los sistemas de copyright de Instagram, TikTok ni YouTube.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es diferente a usar música de fondo normal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Muy diferente. Una canción con el nombre de tu marca y tu mensaje específico es mucho más poderosa que música de fondo genérica. Hace que tu contenido sea único, reconocible, y que la gente asocie instantáneamente la música con tu negocio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué duración tiene la canción? ¿Sirve para Reels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las canciones generadas tienen entre 30 segundos y 2 minutos de duración, lo que las hace perfectas para Reels de Instagram (máx. 90 seg), TikToks, YouTube Shorts y cualquier formato de video corto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usarla en publicidad paga de Instagram o TikTok?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La licencia comercial incluida te permite usar la canción en publicidad paga: Meta Ads (Facebook e Instagram), TikTok Ads, YouTube Ads, Google Ads con video, y cualquier otra plataforma de publicidad digital.',
      },
    },
  ],
}

export default function CancionParaRedesSociales() {
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
          Una Canción para<br />
          <span className="landing-gradient">tus Redes Sociales</span>
        </h1>

        <p className="landing-lead">
          Tu marca suena diferente en Instagram, TikTok y YouTube.<br />
          Canción original con tu nombre. Sin copyright. Sin registro. Gratis para escuchar.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            🎵 Crear mi Canción para Redes
          </Link>
          <div className="landing-trust-badge">
            ✅ Sin problemas de copyright • Licencia comercial incluida
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
            <div className="landing-stat-value">$8,900</div>
            <div className="landing-stat-label">Pago único para descargar</div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <h2 className="landing-h2">El problema con la música en redes sociales</h2>
        <p className="landing-text">
          Si alguna vez subiste un video a Instagram o TikTok con música y te lo silenciaron o bloquearon, sabés de lo que hablamos. Los algoritmos de copyright son agresivos: detectan cualquier canción famosa y eliminan el audio de tu contenido automáticamente.
        </p>
        <p className="landing-text">
          La solución es tener tu <strong>propia canción original</strong>. Una canción creada específicamente para tu marca que además de evitar problemas de copyright, te diferencia de toda la competencia que usa la misma música de fondo genérica.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Perfecta para cada plataforma</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">📸</div>
            <h3 className="landing-step-title">Instagram Reels y Stories</h3>
            <p className="landing-step-text">
              Duración perfecta para Reels (hasta 90 seg). Sin riesgo de bloqueo por copyright. Tu marca suena única en cada publicación.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎵</div>
            <h3 className="landing-step-title">TikTok</h3>
            <p className="landing-step-text">
              El algoritmo de TikTok premia el contenido con audio original. Tu canción puede volverse viral y llevar tu marca a miles de personas.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">▶️</div>
            <h3 className="landing-step-title">YouTube y YouTube Shorts</h3>
            <p className="landing-step-text">
              Sin reclamaciones de monetización. Usá tu canción en intros, fondos de video y publicidad en YouTube sin restricciones.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá tu canción para redes en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Describí tu marca y contenido</h3>
            <p className="landing-step-text">
              Nombre, rubro, y el tipo de contenido que hacés en redes. ¿Mostras productos? ¿Tutoriales? ¿Humor? ¿Inspiración?
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo que pegue con tu audiencia</h3>
            <p className="landing-step-text">
              Pop o Trap para Gen Z, Reggaetón para lifestyle, Cumbia para negocios populares, Pop suave para familias.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Descargá y empezá a publicar</h3>
            <p className="landing-step-text">
              Escuchás gratis. Descargás con licencia comercial por $8,900 ARS. Lista para subir a cualquier red.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Tu contenido merece su propia música</h2>
        <p className="landing-text">
          Dejá de usar música genérica. Creá la canción que va a sonar en todas tus redes.
        </p>
        <Link href="/" className="landing-cta-primary">
          🎵 Crear mi Canción para Redes Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usar la canción en Instagram Reels sin que me la bloqueen?</summary>
            <div className="landing-faq-answer">
              Sí. Al descargar la canción obtenés una licencia comercial sobre una composición original generada por IA. Al ser una obra original, no va a ser detectada por los sistemas de copyright de Instagram, TikTok ni YouTube.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Es diferente a usar música de fondo normal?</summary>
            <div className="landing-faq-answer">
              Muy diferente. Una canción con el nombre de tu marca y tu mensaje específico es mucho más poderosa que música de fondo genérica. Hace que tu contenido sea único, reconocible y que la gente asocie instantáneamente la música con tu negocio.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué duración tiene la canción? ¿Sirve para Reels?</summary>
            <div className="landing-faq-answer">
              Las canciones generadas tienen entre 30 segundos y 2 minutos de duración, lo que las hace perfectas para Reels de Instagram, TikToks, YouTube Shorts y cualquier formato de video corto.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usarla en publicidad paga de Instagram o TikTok?</summary>
            <div className="landing-faq-answer">
              Sí. La licencia comercial incluida te permite usar la canción en publicidad paga: Meta Ads, TikTok Ads, YouTube Ads, Google Ads con video y cualquier otra plataforma de publicidad digital.
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
