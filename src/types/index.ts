// src/types/index.ts

export type SunoStatus =
  | 'pending'
  | 'generating'
  | 'stream_ready'   // streamAudioUrl disponible → mostrar player con watermark
  | 'complete'       // audioUrl disponible → listo para descargar post-pago
  | 'error'

export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'

export type SelectedSong = 'a' | 'b'

export interface Generation {
  id: string
  created_at: string
  brand_name: string
  brand_description: string | null
  brand_location: string | null
  genre: string
  moods: string[]
  duration_seconds: 15 | 30
  suno_task_id: string | null
  suno_status: SunoStatus
  song_a_id: string | null
  song_a_stream_url: string | null
  song_a_audio_url: string | null
  song_a_image_url: string | null
  song_a_lyrics: string | null
  song_b_id: string | null
  song_b_stream_url: string | null
  song_b_audio_url: string | null
  song_b_image_url: string | null
  song_b_lyrics: string | null
  selected_song: SelectedSong | null
  regen_count: number
  error_message: string | null
}

export interface Payment {
  id: string
  created_at: string
  generation_id: string
  selected_song: SelectedSong
  mp_preference_id: string | null
  mp_payment_id: string | null
  mp_status: PaymentStatus
  amount_ars: number
  payer_email: string | null
  download_token: string
  token_expires_at: string
  downloaded_at: string | null
  download_count: number
}

// Payload del formulario del usuario
export interface GenerateFormData {
  brandName: string
  brandDescription?: string | null
  brandLocation?: string | null
  genre: string
  moods: string[]
  durationSeconds: 15 | 30
}

// Lo que construimos para enviar a Suno
export interface SunoGeneratePayload {
  customMode: false
  instrumental: false
  model: 'V4_5'
  prompt: string
  callBackUrl: string
}
