'use client'
// src/components/WaveformPlayer.tsx
import { useEffect, useRef, useState, useCallback } from 'react'

const WAVE_HEIGHTS = [20,35,55,70,45,80,60,90,75,50,85,95,70,55,40,60,75,85,65,50,90,80,55,70,45,60,75,50,35,25,45,60,70,80,55,75,85,65,50,40,60,75,50,35,55,70,80,60,45,30,50,65,75,55,40,60,70,85,65,50,40,30,20,35,50,65,75,55,40,60,70,80,55,45,35,50,65,75,60,45]

// Audio component with optional preview mode (25 sec from second 5-30)
function AudioPlayer({ src, isPlaying, onTimeUpdate, onEnded, isPreview, onPlayError, seekRequest }: {
  src: string
  isPlaying: boolean
  onTimeUpdate: (t: number, d: number) => void
  onEnded: () => void
  isPreview: boolean
  onPlayError: () => void
  seekRequest: { ratio: number; id: number } | null
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [previewStarted, setPreviewStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTime = () => {
      const currentTime = audio.currentTime
      const duration = audio.duration || 0

      if (isPreview) {
        if (!previewStarted && isPlaying && currentTime < 5) {
          audio.currentTime = 5
          setPreviewStarted(true)
        }
        if (currentTime >= 30) {
          audio.pause()
          audio.currentTime = 5
          onEnded()
          return
        }
      }

      onTimeUpdate(isPreview ? currentTime - 5 : currentTime, isPreview ? 25 : duration)
    }

    const handleEnd = () => {
      if (isPreview) {
        audio.currentTime = 5
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

  // Play/pause — expone error en vez de silenciarlo
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      if (isPreview && audio.currentTime < 5) {
        audio.currentTime = 5
        setPreviewStarted(true)
      }
      audio.play().catch(() => { onPlayError() })
    } else {
      audio.pause()
    }
  }, [isPlaying, isPreview, onPlayError])

  // Bloquear seek en preview mode
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isPreview) return

    const handleSeeking = () => {
      const currentTime = audio.currentTime
      if (currentTime < 5) {
        audio.currentTime = 5
      } else if (currentTime > 30) {
        audio.currentTime = 30
      }
    }

    audio.addEventListener('seeking', handleSeeking)
    return () => audio.removeEventListener('seeking', handleSeeking)
  }, [isPreview])

  // Seek en modo completo (desde click en waveform)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !seekRequest || isPreview) return
    const duration = audio.duration
    if (!duration || isNaN(duration)) return
    audio.currentTime = seekRequest.ratio * duration
  }, [seekRequest, isPreview])

  // preload="auto" en vez de "metadata" — crítico para que play funcione en mobile
  return <audio ref={audioRef} src={src} preload="auto" crossOrigin="anonymous" />
}

interface WaveformPlayerProps {
  streamUrl: string
  duration: number
  brandName: string
  genre: string
  isPreview?: boolean
}

export default function WaveformPlayer({ streamUrl, duration, brandName, genre, isPreview = false }: WaveformPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(duration)
  const [playError, setPlayError] = useState(false)
  const [seekRequest, setSeekRequest] = useState<{ ratio: number; id: number } | null>(null)

  const handleTimeUpdate = useCallback((t: number, d: number) => {
    setCurrentTime(t)
    if (d && !isNaN(d)) setAudioDuration(d)
  }, [])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    setCurrentTime(0)
  }, [])

  const handlePlayError = useCallback(() => {
    setIsPlaying(false)
    setPlayError(true)
  }, [])

  const togglePlay = useCallback(() => {
    setPlayError(false)
    setIsPlaying(p => !p)
  }, [])

  // Click en waveform: play/pause en preview, seek+play en modo completo
  const handleWaveformClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setPlayError(false)
    if (isPreview) {
      setIsPlaying(p => !p)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setSeekRequest(prev => ({ ratio, id: (prev?.id ?? 0) + 1 }))
    setIsPlaying(true)
  }, [isPreview])

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
            Canción {genre} · {isPreview ? '25 seg preview' : `${duration} seg`}
          </div>
          {isPreview && <div className="watermark-badge">🔒 Preview de 25 segundos</div>}
        </div>
      </div>

      {/* Waveform — ahora clickeable para play/pause o seek */}
      <div className="waveform-wrap">
        <div
          className="waveform"
          onClick={handleWaveformClick}
          role="button"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
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
        <button
          className="ctrl-play"
          onClick={togglePlay}
          style={{ touchAction: 'manipulation' }}
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div className="ctrl-info">
          {playError ? (
            <div className="ctrl-playing" style={{ color: 'var(--orange)' }}>
              Tocá ▶ para activar el audio
            </div>
          ) : (
            <div className="ctrl-playing" id="playing-status">
              {isPlaying ? 'Reproduciendo… 🎶' : 'Presioná play para escuchar'}
            </div>
          )}
          <div className="ctrl-tip">
            {isPreview ? 'Preview de 25 segundos (seg 5-30)' : 'Podés escuchar toda la canción'}
          </div>
        </div>
      </div>

      <AudioPlayer
        src={streamUrl}
        isPlaying={isPlaying}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        isPreview={isPreview}
        onPlayError={handlePlayError}
        seekRequest={seekRequest}
      />
    </div>
  )
}
