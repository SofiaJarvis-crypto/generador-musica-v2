import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Cancionesia – Jingles con IA para tu marca'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a4e 50%, #24243e 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.12)',
          }}
        />

        {/* Music note icon */}
        <div style={{ fontSize: 80, marginBottom: 24, display: 'flex' }}>🎵</div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-2px',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          Cancionesia
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(196, 181, 253, 0.9)',
            marginBottom: 40,
            display: 'flex',
          }}
        >
          Jingles con IA para tu marca
        </div>

        {/* Separator */}
        <div
          style={{
            width: 80,
            height: 4,
            borderRadius: 4,
            background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
            marginBottom: 40,
            display: 'flex',
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', display: 'flex' }}>2 min</span>
            <span style={{ fontSize: 18, color: 'rgba(196, 181, 253, 0.7)', display: 'flex' }}>de creación</span>
          </div>
          <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.2)', display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', display: 'flex' }}>2,100+</span>
            <span style={{ fontSize: 18, color: 'rgba(196, 181, 253, 0.7)', display: 'flex' }}>marcas</span>
          </div>
          <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.2)', display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', display: 'flex' }}>Gratis</span>
            <span style={{ fontSize: 18, color: 'rgba(196, 181, 253, 0.7)', display: 'flex' }}>para escuchar</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
