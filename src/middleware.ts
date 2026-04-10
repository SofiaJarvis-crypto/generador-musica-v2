// src/middleware.ts
// Asigna la variante del A/B test del H1 en el Edge, antes del Server Render.
// De esta forma Googlebot recibe el HTML ya con el H1 definitivo, sin mutación client-side.

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VARIANTS = ['control', 'variantA', 'variantB'] as const
type Variant = typeof VARIANTS[number]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Solo aplicar el A/B test en la homepage
  if (request.nextUrl.pathname !== '/') return response

  // Si ya tiene variante asignada, no la cambiamos (estabilidad entre visitas)
  const existingVariant = request.cookies.get('headline_variant')?.value
  if (existingVariant && (VARIANTS as readonly string[]).includes(existingVariant)) {
    return response
  }

  // Obtener o generar user_id para asignación consistente por hash
  const userId = request.cookies.get('user_id')?.value ?? crypto.randomUUID()
  const hash = hashString(`headline_v1-${userId}`)
  const variant: Variant = VARIANTS[hash % VARIANTS.length]

  const cookieOpts = {
    maxAge: 60 * 60 * 24 * 30, // 30 días
    httpOnly: false,            // Debe ser legible desde JS para el tracking
    sameSite: 'lax' as const,
    path: '/',
  }

  response.cookies.set('headline_variant', variant, cookieOpts)

  if (!request.cookies.get('user_id')?.value) {
    response.cookies.set('user_id', userId, cookieOpts)
  }

  return response
}

export const config = {
  // Evitar correr en rutas de assets estáticos, API, y Next internals
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|svg|ico|webp|mp3)).*)'],
}
