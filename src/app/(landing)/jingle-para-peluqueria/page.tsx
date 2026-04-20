import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jingle para Peluquería con IA | Cancionesia Argentina',
  description: 'Creá una canción para tu peluquería o barbería en 2 minutos con IA. Estilo, personalidad y el mensaje justo para tu local. Escuchás gratis, pagás en pesos con Mercado Pago.',
  keywords: 'jingle para peluquería, canción para peluquería, publicidad peluquería argentina, jingle barbería, música para peluquería, canción peluquería argentina',
  alternates: {
    canonical: 'https://cancionesia.com.ar/jingle-para-peluqueria',
  },
  openGraph: {
    title: 'Jingle para Peluquería con IA | Cancionesia',
    description: 'La canción de tu peluquería, creada con IA en 2 minutos. Sin conocimientos musicales. Pagás en pesos.',
    url: 'https://cancionesia.com.ar/jingle-para-peluqueria',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué estilo musical funciona mejor para una peluquería?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depende del perfil de tu local. Para peluquerías tradicionales y de barrio, la cumbia o el pop son opciones seguras: son alegres, familiares y reconocibles. Para barberías urbanas o locales modernos, el trap o el reggaetón funcionan mejor porque proyectan estilo y tendencia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué debería decir el jingle de mi peluquería?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lo más efectivo es nombrar el local, comunicar el servicio principal y agregar un diferenciador. Por ejemplo: el barrio donde estás, los años de experiencia, el tipo de cortes que hacés, o el ambiente familiar. Cuanto más específico, más memorable.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar la canción en mis Reels e Instagram Stories?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. La licencia comercial que recibís al descargar te permite usar la canción en Instagram, TikTok, YouTube, WhatsApp y cualquier plataforma digital, sin restricciones ni riesgo de copyright.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta hacer el jingle de mi peluquería?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generar y escuchar las 2 versiones es completamente gratis. Si querés descargar la canción en alta calidad con licencia comercial, el costo es de $8.900 ARS pago único, sin suscripción. Pagás con Mercado Pago.',
      },
    },
  ],
}

export default function JingleParaPeluqueria() {
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
          Jingle para tu Peluquería<br />
          <span className="landing-gradient">hecho con IA en 2 minutos</span>
        </h1>

        <p className="landing-lead">
          Tu local merece una canción que lo represente.<br />
          Nombre, estilo y mensaje a medida. Sin músicos. Sin estudio. Pagás en pesos.
        </p>

        <div className="landing-cta-group">
          <Link href="/" className="landing-cta-primary">
            ✂️ Crear el Jingle de mi Peluquería
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
        <h2 className="landing-h2">Por qué tu peluquería necesita una canción</h2>
        <p className="landing-text">
          En Argentina hay más de 60.000 peluquerías y barberías. La mayoría tiene un cartel, una cuenta de Instagram y un número de WhatsApp. Muy pocas tienen una canción propia.
        </p>
        <p className="landing-text">
          Una canción hace que tu local se diferencie instantáneamente. Cuando la ponés en tus Reels, en el estado de WhatsApp o la dejás sonar en el local, la gente la recuerda. Y cuando recuerdan la canción, recuerdan el nombre de tu peluquería.
        </p>
        <p className="landing-text">
          No necesitás el presupuesto de una marca grande. Con Cancionesia creás una canción profesional por una fracción del costo de una sesión en estudio.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Estilos que funcionan para peluquerías y barberías</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">🎤</div>
            <h3 className="landing-step-title">Reggaetón o Trap</h3>
            <p className="landing-step-text">
              Ideal para barberías urbanas, locales de tendencia y target joven. Proyecta estilo, actitud y modernidad. Perfecto para contenido de TikTok e Instagram Reels.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🪘</div>
            <h3 className="landing-step-title">Cumbia o Pop</h3>
            <p className="landing-step-text">
              Para peluquerías de barrio y locales familiares. Son géneros alegres, reconocibles y accesibles para todo rango etario. Funcionan muy bien en WhatsApp y para clientela establecida.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">🎹</div>
            <h3 className="landing-step-title">Pop Comercial</h3>
            <p className="landing-step-text">
              Versátil para cualquier tipo de peluquería. Suena profesional y moderno sin alienar a nadie. Buena opción si querés algo que funcione tanto en redes como en radio local.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Qué incluir en el jingle de tu peluquería</h2>
        <p className="landing-text">
          Los mejores jingles de peluquerías tienen estos elementos:
        </p>
        <ul className="landing-list">
          <li><strong>El nombre del local</strong> — mencionarlo al menos 2 veces para que quede grabado.</li>
          <li><strong>El barrio o la ciudad</strong> — "en Villa Crespo", "acá en Córdoba", "en el centro de Rosario". Genera pertenencia.</li>
          <li><strong>El servicio principal</strong> — corte, color, barba, alisado, lo que te diferencia.</li>
          <li><strong>Un diferenciador real</strong> — el ambiente familiar, los años de experiencia, las últimas tendencias.</li>
          <li><strong>Cómo contactarte</strong> — WhatsApp o Instagram si el jingle va a redes.</li>
        </ul>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Cómo usarlo en tu negocio</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">📱</div>
            <h3 className="landing-step-title">Instagram y TikTok</h3>
            <p className="landing-step-text">
              Subilo como Reel o TikTok con fotos o videos de tu trabajo. La canción hace que el contenido dure más en la mente del espectador que una imagen estática.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">💬</div>
            <h3 className="landing-step-title">Estado de WhatsApp</h3>
            <p className="landing-step-text">
              El estado de WhatsApp Business con tu jingle es publicidad gratuita a todos tus contactos. Muchos locales lo usan para promociones semanales.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">📻</div>
            <h3 className="landing-step-title">Radio Local</h3>
            <p className="landing-step-text">
              Si tu local está en una ciudad del interior, una pauta en radio FM local con tu jingle llega directo a tu zona. La canción está lista para emitirse sin edición adicional.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Creá el jingle de tu peluquería en 3 pasos</h2>
        <div className="landing-steps">
          <div className="landing-step">
            <div className="landing-step-number">1</div>
            <h3 className="landing-step-title">Contanos sobre tu local</h3>
            <p className="landing-step-text">
              Nombre de tu peluquería, barrio, servicios que ofrecés y el mensaje que querés transmitir.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">2</div>
            <h3 className="landing-step-title">Elegí el estilo musical</h3>
            <p className="landing-step-text">
              Cumbia, Reggaetón, Pop, Trap — el que mejor represente la personalidad de tu local.
            </p>
          </div>
          <div className="landing-step">
            <div className="landing-step-number">3</div>
            <h3 className="landing-step-title">Escuchás y descargás</h3>
            <p className="landing-step-text">
              En 2 minutos tenés 2 versiones únicas. Descargás con licencia comercial por $8.900 ARS con Mercado Pago.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta-section">
        <h2 className="landing-h2">Tu peluquería merece una canción propia.</h2>
        <p className="landing-text">
          En 2 minutos tenés dos versiones únicas, listas para redes, WhatsApp y radio.
        </p>
        <Link href="/" className="landing-cta-primary">
          ✂️ Crear el Jingle de mi Peluquería Ahora
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="landing-h2">Preguntas frecuentes</h2>
        <div className="landing-faq">
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué estilo musical funciona mejor para una peluquería?</summary>
            <div className="landing-faq-answer">
              Depende del perfil de tu local. Para peluquerías de barrio, la cumbia o el pop son opciones seguras. Para barberías urbanas o locales modernos, el trap o el reggaetón proyectan mejor el estilo y la tendencia.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Qué debería decir el jingle de mi peluquería?</summary>
            <div className="landing-faq-answer">
              Nombrá el local, el barrio o ciudad, el servicio principal y algún diferenciador. Cuanto más específico, más memorable. La IA te ayuda a armar la letra si no sabés por dónde empezar.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Puedo usarlo en mis Reels e Instagram Stories?</summary>
            <div className="landing-faq-answer">
              Sí. La licencia comercial te permite usarlo en Instagram, TikTok, YouTube, WhatsApp y cualquier plataforma, sin riesgo de copyright.
            </div>
          </details>
          <details className="landing-faq-item">
            <summary className="landing-faq-question">¿Cuánto cuesta?</summary>
            <div className="landing-faq-answer">
              Generar y escuchar es gratis. Descargar con licencia comercial cuesta $8.900 ARS pago único, sin suscripción. Pagás con Mercado Pago, sin tarjeta internacional.
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
            <Link href="/jingle-para-ferreteria" className="landing-footer-link">Jingle para Ferretería</Link>
            <Link href="/jingle-para-almacen" className="landing-footer-link">Jingle para Almacén</Link>
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
