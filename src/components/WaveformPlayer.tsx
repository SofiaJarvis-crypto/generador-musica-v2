'use client'
// src/components/WaveformPlayer.tsx
import { useEffect, useRef, useState, useCallback } from 'react'

const WAVE_HEIGHTS = [20,35,55,70,45,80,60,90,75,50,85,95,70,55,40,60,75,85,65,50,90,80,55,70,45,60,75,50,35,25,45,60,70,80,55,75,85,65,50,40,60,75,50,35,55,70,80,60,45,30,50,65,75,55,40,60,70,85,65,50,40,30,20,35,50,65,75,55,40,60,70,80,55,45,35,50,65,75,60,45]

// Adds a beep watermark to the audio stream via Web Audio API
function WatermarkedAudio({ src, isPlaying, onTimeUpdate, onEnded }: {
  src: string
  isPlaying: boolean
  onTimeUpdate: (t: number, d: number) => void
  onEnded: () => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const beepRef = useRef<NodeJS.Timeout | null>(null)

  const playBeep = useCallback(() => {
    if (!ctxRef.current) return
    const ctx = ctxRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTime = () => onTimeUpdate(audio.currentTime, audio.duration || 0)
    const handleEnd = () => { onEnded(); if (beepRef.current) clearInterval(beepRef.current) }
    audio.addEventListener('timeupdate', handleTime)
    audio.addEventListener('ended', handleEnd)
    return () => { audio.removeEventListener('timeupdate', handleTime); audio.removeEventListener('ended', handleEnd) }
  }, [onTimeUpdate, onEnded])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      if (!ctxRef.current) ctxRef.current = new AudioContext()
      if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
      audio.play().catch(() => {})
      // Beep every 15 seconds as watermark
      beepRef.current = setInterval(playBeep, 15000)
      playBeep() // first beep on play
    } else {
      audio.pause()
      if (beepRef.current) clearInterval(beepRef.current)
    }
    return () => { if (beepRef.current) clearInterval(beepRef.current) }
  }, [isPlaying, playBeep])

  return <audio ref={audioRef} src={src} preload="metadata" crossOrigin="anonymous" />
}

interface WaveformPlayerProps {
  streamUrl: string
  duration: number
  brandName: string
  genre: string
}

export default function WaveformPlayer({ streamUrl, duration, brandName, genre }: WaveformPlayerProps) {
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
          <div className="player-track-meta">Jingle {genre} · {duration} seg</div>
          <div className="watermark-badge">🔊 Vista previa con marca de agua</div>
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
          <div className="ctrl-tip">Podés escuchar todas las veces que quieras</div>
        </div>
      </div>

      <div className="watermark-info">
        <div style={{ fontSize: 18, flexShrink: 0 }}>🔔</div>
        <div className="watermark-info-text">
          Estás escuchando la <strong>versión gratuita con marca de agua</strong>. El tono periódico desaparece en la versión descargable.
        </div>
      </div>

      <WatermarkedAudio
        src={streamUrl}
        isPlaying={isPlaying}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  )
}
