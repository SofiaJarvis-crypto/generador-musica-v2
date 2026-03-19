export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Graceful fallback si no hay API key
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export async function POST(req: NextRequest) {
  try {
    const { brandName, genre, userInput } = await req.json()

    if (!brandName) {
      return NextResponse.json({ error: 'Nombre de marca requerido' }, { status: 400 })
    }

    // Si no hay OpenAI API key, devolver fallback simple
    if (!openai) {
      const fallbackLyrics = userInput?.trim() 
        ? `${userInput} - ${brandName}, tu mejor elección!`
        : `${brandName}, la mejor opción en ${genre}. ¡Eleginos!`
      
      return NextResponse.json({ 
        lyrics: fallbackLyrics,
        fallback: true 
      })
    }

    // Determinar si es generación desde cero o mejora de texto existente
    const isImprovement = userInput && userInput.trim().length > 0

    const prompt = isImprovement
      ? `Mejorá y expandí esta idea para una letra de jingle publicitario:

"${userInput}"

Contexto:
- Marca: ${brandName}
- Género musical: ${genre}

Instrucciones:
- Hacela pegadiza y memorable
- Máximo 60 palabras
- Mencioná la marca al menos una vez
- Usá lenguaje simple y directo
- Que rime si es posible
- Enfocate en el beneficio para el cliente

Devolvé SOLO la letra, sin explicaciones.`
      : `Escribí una letra pegadiza para un jingle publicitario:

Marca: ${brandName}
Género: ${genre}

Instrucciones:
- Máximo 60 palabras
- Mencioná la marca
- Pegadiza y memorable
- Lenguaje simple
- Que rime si es posible
- Enfocate en beneficios

Devolvé SOLO la letra, sin explicaciones.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Sos un copywriter experto en jingles publicitarios argentinos. Escribís letras pegadizas, simples y memorables.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 200,
      temperature: 0.9,
    })

    const lyrics = response.choices[0].message.content?.trim() || ''

    return NextResponse.json({ lyrics })
  } catch (error) {
    console.error('[Generate Lyrics] Error:', error)
    return NextResponse.json(
      { error: 'Error al generar la letra' },
      { status: 500 }
    )
  }
}
