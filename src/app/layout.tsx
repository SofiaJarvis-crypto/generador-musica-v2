// src/app/layout.tsx - SEO Enhanced
// Incluye: GA4 + Meta Pixel + Schema Markup + SEO completo

import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import { FB_PIXEL_ID } from '@/lib/meta-pixel'

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-RGN3X2NSZR'

// Schema Markup
const schemaMarkup = {
  '@context': 'https://schema.org',
  '@graph': [
    // SoftwareApplication Schema
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://generador-musica-v2.vercel.app/#software',
      name: 'Generador de Música para Marcas',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '8900',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2027-12-31',
        url: 'https://generador-musica-v2.vercel.app',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '2113',
        bestRating: '5',
        worstRating: '1',
      },
      description: 'Creá jingles profesionales para tu negocio con IA en 2 minutos. $8,900 pago único. Escuchás gratis, sin registro.',
      url: 'https://generador-musica-v2.vercel.app',
      image: 'https://generador-musica-v2.vercel.app/og-image.jpg',
      author: {
        '@type': 'Organization',
        name: 'Generador de Música',
      },
    },
    // LocalBusiness Schema
    {
      '@type': 'LocalBusiness',
      '@id': 'https://generador-musica-v2.vercel.app/#business',
      name: 'Generador de Música para Marcas',
      image: 'https://generador-musica-v2.vercel.app/logo.png',
      url: 'https://generador-musica-v2.vercel.app',
      priceRange: '$8,900',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AR',
        addressLocality: 'Argentina',
      },
      description: 'Generador de jingles con IA para negocios locales',
    },
  ],
}

export const metadata: Metadata = {
  // Basic metadata
  title: 'Generador de Jingles con IA | Música para Tu Marca en 2 Minutos',
  description: 'Creá jingles profesionales para tu negocio con IA. $8,900 pago único. Escuchás gratis, sin registro. 2,113 negocios ya tienen su canción. Licencia comercial incluida.',
  
  keywords: [
    'generador de jingles',
    'crear jingle',
    'música para negocio',
    'jingle con IA',
    'generador de música',
    'jingle publicitario',
    'música para marca',
    'crear canción negocio',
    'jingle argentina',
    'música para emprendimiento',
  ],
  
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
    url: 'https://generador-musica-v2.vercel.app',
    siteName: 'Generador de Música para Marcas',
    title: 'Generador de Jingles con IA para Tu Negocio',
    description: 'Jingles profesionales en 2 minutos. $8,900 pago único. Escuchás gratis sin registro. 2,113 negocios ya tienen su canción.',
    images: [
      {
        url: 'https://generador-musica-v2.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Generador de Jingles con IA - Música para Tu Marca',
        type: 'image/jpeg',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Jingles con IA | Música en 2 Minutos',
    description: 'Jingles profesionales para tu negocio. $8,900 pago único. Escuchás gratis.',
    images: ['https://generador-musica-v2.vercel.app/og-image.jpg'],
    creator: '@generadormusica', // Reemplazar con tu handle real
  },
  
  // Canonical
  alternates: {
    canonical: 'https://generador-musica-v2.vercel.app',
    languages: {
      'es-AR': 'https://generador-musica-v2.vercel.app',
    },
  },
  
  // Verification (agregar después de Google Search Console setup)
  verification: {
    google: 'pendiente-agregar-codigo', // Reemplazar con código real
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
    <html lang="es">
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
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
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        
        {/* Schema Markup (JSON-LD) */}
        <Script
          id="schema-markup"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup),
          }}
        />
      </head>
      <body>
        <div className="page-wrap">
          {children}
        </div>
      </body>
    </html>
  )
}
