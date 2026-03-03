// src/app/sitemap.ts
// Sitemap automático de Next.js 14

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://generador-musica-v2.vercel.app'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Blog posts (agregar dinámicamente cuando existan)
    // Ejemplo:
    // {
    //   url: `${baseUrl}/blog/como-crear-jingle-profesional`,
    //   lastModified: new Date('2026-03-10'),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    
    // Programmatic SEO pages (géneros)
    {
      url: `${baseUrl}/jingle-de-cumbia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-reggaeton`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-pop`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-folklore`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-trap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jingle-de-cuarteto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
