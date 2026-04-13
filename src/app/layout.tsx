// src/app/layout.tsx - SEO Enhanced
// Incluye: GA4 + Google Ads + Meta Pixel + Schema Markup + SEO completo

import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import '../styles/popups.css'
import { FB_PIXEL_ID } from '@/lib/meta-pixel'
import { PostHogProvider } from '@/lib/posthog'

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-RGN3X2NSZR'

// Microsoft Clarity Project ID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

// Google Ads Conversion ID
const GOOGLE_ADS_ID = 'AW-18023245806'

// Schema Markup
const schemaMarkup = {
  '@context': 'https://schema.org',
  '@graph': [
    // SoftwareApplication Schema
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://cancionesia.com.ar/#software',
      name: 'Generador de Música para Marcas',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '8900',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2027-12-31',
        url: 'https://cancionesia.com.ar',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '2113',
        bestRating: '5',
        worstRating: '1',
      },
      description: 'Creá jingles profesionales para tu negocio con IA en 2 minutos. $8,900 pago único. Escuchás gratis, sin registro.',
      url: 'https://cancionesia.com.ar',
      image: 'https://cancionesia.com.ar/opengraph-image',
      author: {
        '@type': 'Organization',
        name: 'Cancionesia',
      },
    },
    // Organization Schema
    {
      '@type': 'Organization',
      '@id': 'https://cancionesia.com.ar/#organization',
      name: 'Cancionesia',
      url: 'https://cancionesia.com.ar',
      logo: 'https://cancionesia.com.ar/logo.png',
      description: 'Generador de jingles y canciones con IA para marcas y negocios argentinos.',
      sameAs: [],
    },
  ],
}

export const metadata: Metadata = {
  // Basic metadata
  title: 'Cancionesia | Creá la Canción de tu Marca con IA en 2 Minutos',
  description: 'Creá la canción de tu negocio o marca con IA en 2 minutos. Jingles profesionales, $8,900 pago único. Escuchás gratis sin registro. 2,100+ negocios ya tienen su canción.',
  
  authors: [{ name: 'Generador de Música para Marcas' }],
  creator: 'Generador de Música',
  publisher: 'Generador de Música',
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://cancionesia.com.ar',
    siteName: 'Generador de Música para Marcas',
    title: 'Cancionesia – Creá la Canción de tu Negocio o Marca con IA',
    description: 'Jingles profesionales en 2 minutos. $8,900 pago único. Escuchás gratis sin registro. 2,113 negocios ya tienen su canción.',
    images: [
      {
        url: 'https://cancionesia.com.ar/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Cancionesia – Jingles con IA para tu marca',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Cancionesia | Canción para tu Marca con IA en 2 Minutos',
    description: 'Creá la canción de tu negocio o marca con IA. $8,900 pago único. Escuchás gratis.',
    images: ['https://cancionesia.com.ar/opengraph-image'],
  },
  
  // Canonical
  alternates: {
    canonical: 'https://cancionesia.com.ar',
    languages: {
      'es-AR': 'https://cancionesia.com.ar',
    },
  },
  
  // Additional metadata
  category: 'Music Software',
  applicationName: 'Generador de Música para Marcas',
  appleWebApp: {
    capable: true,
    title: 'Generador de Música',
    statusBarStyle: 'default',
  },
  
  // Favicon
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Schema Markup (JSON-LD) — inline para que Googlebot lo lea en el HTML inicial */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>
        <PostHogProvider>
        <div className="page-wrap">
          {children}
        </div>

        {/* Google tag (gtag.js) - Google Ads + GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1" alt="" />` }} />

        </PostHogProvider>

        {/* Microsoft Clarity — heatmaps + session recordings */}
        {CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_ID}");
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
