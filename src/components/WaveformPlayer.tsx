'use client'
// src/components/WaveformPlayer.tsx
import { useEffect, useRef, useState, useCallback } from 'react'

const WAVE_HEIGHTS = [20,35,55,70,45,80,60,90,75,50,85,95,70,55,40,60,75,85,65,50,90,80,55,70,45,60,75,50,35,25,45,60,70,80,55,75,85,65,50,40,60,75,50,35,55,70,80,60,45,30,50,65,75,55,40,60,70,85,65,50,40,30,20,35,50,65,75,55,40,60,70,80,55,45,35,50,65,75,60,45]

// Audio component with optional preview mode (10 sec from second 15-25)
function AudioPlayer({ src, isPlaying, onTimeUpdate, onEnded, isPreview }: {
  src: string
  isPlaying: boolean
  onTimeUpdate: (t: number, d: number) => void
  onEnded: () => void
  isPreview: boolean
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [previewStarted, setPreviewStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTime = () => {
      const currentTime = audio.currentTime
      const duration = audio.duration || 0

      // Si es preview y estamos en segundo 15-25, permitir reproducción
      if (isPreview) {
        // Al cargar, saltar al segundo 15
        if (!previewStarted && isPlaying && currentTime < 15) {
          audio.currentTime = 15
          setPreviewStarted(true)
        }
        
        // Si pasó del segundo 30, detener y resetear (15 seg preview)
        if (currentTime >= 30) {
          audio.pause()
          audio.currentTime = 15
          onEnded()
          return
        }
      }

      onTimeUpdate(isPreview ? currentTime - 15 : currentTime, isPreview ? 15 : duration)
    }

    const handleEnd = () => {
      if (isPreview) {
        audio.currentTime = 15
      }
      onEnded()
    }

    audio.addEventListener('timeupdate', handleTime)
    audio.addEventListener('ended', handleEnd)
    
    return () => { 
      audio.removeEventListener('timeupdate', handleTime)
      audio.removeEventListener('ended', handleEnd)
    }
  }, [onTimeUpdate, onEnded, isPreview, isPlaying, previewStarted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    
    if (isPlaying) {
      // Si es preview y no empezó, saltar al segundo 15
      if (isPreview && audio.currentTime < 15) {
        audio.currentTime = 15
        setPreviewStarted(true)
      }
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [isPlaying, isPreview])

  // Bloquear seek en preview mode
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isPreview) return

    const handleSeeking = () => {
      const currentTime = audio.currentTime
      // Forzar rango 15-30 segundos (15 seg preview)
      if (currentTime < 15) {
        audio.currentTime = 15
      } else if (currentTime > 30) {
        audio.currentTime = 30
      }
    }

    audio.addEventListener('seeking', handleSeeking)
    return () => audio.removeEventListener('seeking', handleSeeking)
  }, [isPreview])

  return <audio ref={audioRef} src={src} preload="metadata" crossOrigin="anonymous" />
}

interface WaveformPlayerProps {
  streamUrl: string
  duration: number
  brandName: string
  genre: string
  isPreview?: boolean // 🆕 Si es true, limitar a 10 seg (segundo 15-25)
}

export default function WaveformPlayer({ streamUrl, duration, brandName, genre, isPreview = false }: WaveformPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(duration)

  const handleTimeUpdate = useCallback((t: number, d: number) => {
    setCurrentTime(t)
    if (d && !isNaN(d)) setAudioDuration(d)
  }, [])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    setCurrentTime(0)
  }, [])

  const progress = audioDuration > 0 ? currentTime / audioDuration : 0
  const playedBars = Math.floor(WAVE_HEIGHTS.length * progress)

  const fmt = (s: number) => {
    const secs = Math.floor(s)
    return `0:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="player-card">
      <div className="player-top">
        <div className="player-thumb">🎵</div>
        <div className="player-info">
          <div className="player-track-name">{brandName}</div>
          <div className="player-track-meta">
            Jingle {genre} · {isPreview ? '15 seg preview' : `${duration} seg`}
          </div>
          {isPreview && <div className="watermark-badge">🔒 Preview de 15 segundos</div>}
        </div>
      </div>

      <div className="waveform-wrap">
        <div className="waveform">
          {WAVE_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className={`wave-bar${i < playedBars ? ' played' : ''}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="waveform-time">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(audioDuration)}</span>
        </div>
      </div>

      <div className="player-controls">
        <button className="ctrl-play" onClick={() => setIsPlaying(p => !p)}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div className="ctrl-info">
          <div className="ctrl-playing" id="playing-status">
            {isPlaying ? 'Reproduciendo… 🎶' : 'Presioná play para escuchar'}
          </div>
          <div className="ctrl-tip">
            {isPreview ? 'Preview de 15 segundos (seg 15-30)' : 'Podés escuchar toda la canción'}
          </div>
        </div>
      </div>

      {isPreview && (
        <div className="watermark-info">
          <div style={{ fontSize: 18, flexShrink: 0 }}>🔒</div>
          <div className="watermark-info-text">
            Estás escuchando un <strong>preview de 15 segundos</strong>. Pagá para desbloquear la canción entera y descargarla.
          </div>
        </div>
      )}

      <AudioPlayer
        src={streamUrl}
        isPlaying={isPlaying}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        isPreview={isPreview}
      />
    </div>
  )
}
