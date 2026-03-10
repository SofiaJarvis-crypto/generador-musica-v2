// src/lib/suno-prompt.ts
// Construye el prompt para Suno basado en los datos del formulario
// customMode: false → Suno genera letra automáticamente a partir del prompt

import { GenerateFormData } from '@/types'

// Mapeo de géneros del formulario → tags en inglés para Suno (mejorados)
const GENRE_TAGS: Record<string, string> = {
  'Pop':       'upbeat pop, catchy melody, radio-friendly, commercial appeal, memorable hook',
  'Cumbia':    'cumbia argentina, latin rhythm, accordion, festive, danceable, traditional percussion, radio-ready',
  'Folklore':  'argentine folklore, chacarera, acoustic guitar, traditional, authentic, bombo legüero, charango',
  'Trap AR':   'trap latino argentino, urban, 808 bass, modern, hi-hat rolls, contemporary, street',
  'Reggaetón': 'reggaeton latino, dembow rhythm, perreo, dancehall influence, commercial, party vibe',
  'Cuarteto':  'cuarteto cordobés, cumbia argentina, festive brass, accordion, energetic, party anthem',
}

// Mapeo de moods → tags descriptivos en inglés (expandidos)
const MOOD_TAGS: Record<string, string> = {
  'Alegre 🌟':    'happy, joyful, cheerful, bright, optimistic, feel-good',
  'Emotivo 💛':   'emotional, heartfelt, warm, touching, sincere, authentic',
  'Energético ⚡': 'energetic, powerful, driving, dynamic, high-energy, uplifting',
  'Divertido 😄': 'fun, playful, quirky, lighthearted, amusing, entertaining',
  'Premium ✨':   'sophisticated, premium, polished, elegant, professional, refined',
}

export function buildSunoPrompt(data: GenerateFormData): string {
  const genreTags = GENRE_TAGS[data.genre] || data.genre.toLowerCase()
  const moodTags = data.moods
    .map(m => MOOD_TAGS[m] || m.toLowerCase())
    .join(', ')

  // Construir contexto de marca
  const brandContext = data.brandDescription
    ? `, a ${data.brandDescription}`
    : ''
  
  const locationContext = data.brandLocation
    ? ` from ${data.brandLocation}`
    : ''

  // Prompt estructurado para mejor resultado
  const prompt = [
    `Professional commercial jingle for "${data.brandName}"${brandContext}${locationContext}.`,
    `Music style: ${genreTags}.`,
    `Emotional tone: ${moodTags}.`,
    `Target duration: ${data.durationSeconds} seconds.`,
    `The brand name "${data.brandName}" must be mentioned clearly and memorably in the lyrics.`,
    `Sing in Spanish with clear Argentine pronunciation.`,
    `Make it catchy, memorable, and radio-ready. Perfect for advertising and brand recognition.`,
  ].join(' ')

  // Truncar a 490 caracteres por seguridad (límite non-custom mode)
  return prompt.slice(0, 490)
}
