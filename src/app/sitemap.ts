// src/app/sitemap.ts
// Sitemap automático de Next.js 14

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cancionesia.com.ar'

  // Fecha de la última actualización significativa de contenido
  const lastContentUpdate = new Date('2026-04-20')

  return [
    {
      url: baseUrl,
      lastModified: lastContentUpdate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // SEO Landing Pages
    {
      url: `${baseUrl}/generador-jingles-gratis`,
      lastModified: lastContentUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/como-crear-jingle-para-marca`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ejemplos-jingles-marcas-argentinas`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Landing pages "canción" (público general)
    {
      url: `${baseUrl}/cancion-para-mi-negocio`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cancion-para-mi-marca`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cancion-para-redes-sociales`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cancion-con-inteligencia-artificial`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Programmatic SEO pages (géneros)
    {
      url: `${baseUrl}/jingle-de-cumbia`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-reggaeton`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-pop`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-folklore`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-trap`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-cuarteto`,
      lastModified: lastContentUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
