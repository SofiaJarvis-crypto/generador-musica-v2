// src/app/layout.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import { FB_PIXEL_ID } from '@/lib/meta-pixel'

export const metadata: Metadata = {
  title: 'Generador de Música para Marcas',
  description: 'Creá el jingle de tu marca con IA. Escuchás gratis, solo pagás si la querés descargar.',
  openGraph: {
    title: 'Generador de Música para Marcas',
    description: 'Jingles personalizados para tu negocio en minutos.',
    locale: 'es_AR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
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
      </head>
      <body>
        <div className="page-wrap">
          {children}
        </div>
      </body>
    </html>
  )
}
