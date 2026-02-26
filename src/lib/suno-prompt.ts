// src/lib/suno-prompt.ts
// Construye el prompt para Suno basado en los datos del formulario
// customMode: false → Suno genera letra automáticamente a partir del prompt

import { GenerateFormData } from '@/types'

// Mapeo de géneros del formulario → tags en inglés para Suno
const GENRE_TAGS: Record<string, string> = {
  'Pop':       'upbeat pop, catchy, radio-friendly',
  'Cumbia':    'cumbia, latin rhythm, festive, accordion',
  'Folklore':  'argentine folklore, chacarera, acoustic, traditional',
  'Trap AR':   'trap latino, urban, 808 bass, modern',
  'Reggaetón': 'reggaeton, latin urban, perreo, dancehall',
  'Cuarteto':  'cuarteto cordobes, cumbia villera, festive, brass',
}

const MOOD_TAGS: Record<string, string> = {
  'Alegre 🌟':    'happy, cheerful, bright',
  'Emotivo 💛':   'emotional, heartfelt, warm',
  'Energético ⚡': 'energetic, powerful, driving',
  'Divertido 😄': 'fun, playful, quirky',
  'Premium ✨':   'sophisticated, premium, polished',
}

export function buildSunoPrompt(data: GenerateFormData): string {
  const genreTags = GENRE_TAGS[data.genre] || data.genre.toLowerCase()
  const moodTags = data.moods
    .map(m => MOOD_TAGS[m] || m.toLowerCase())
    .join(', ')

  const locationPart = data.brandLocation
    ? ` based in ${data.brandLocation}`
    : ''

  const descriptionPart = data.brandDescription
    ? `, a ${data.brandDescription}`
    : ''

  // Non-custom mode: prompt = idea general, Suno genera la letra
  // Máx 500 caracteres en non-custom mode
  const prompt = [
    `Commercial jingle for "${data.brandName}"${descriptionPart}${locationPart}.`,
    `Style: ${genreTags}.`,
    `Mood: ${moodTags}.`,
    `Duration: ${data.durationSeconds} seconds.`,
    `The jingle must mention the brand name "${data.brandName}" clearly.`,
    `Sing in Spanish (Argentine accent). Short, memorable, commercial.`,
  ].join(' ')

  // Truncar a 500 caracteres por seguridad (límite non-custom mode)
  return prompt.slice(0, 490)
}
