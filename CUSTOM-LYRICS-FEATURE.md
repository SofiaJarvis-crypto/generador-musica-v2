# 🎵 Custom Lyrics Feature - Implementación

**Fecha:** 2026-03-19  
**Status:** ✅ LIVE  
**Impacto:** Democratiza personalización, diferenciador único

---

## 🎯 CONCEPTO

En vez de hacer "letra personalizada" un add-on premium caro, lo hacemos **accesible para todos** con un botón mágico de IA para quienes no quieren escribir.

### Diferenciador clave:
> "Otros generadores te dan letra automática. Nosotros te dejamos escribir la tuya, o mejorarla con IA."

---

## 💡 CASOS DE USO

### Caso 1: Usuario escribe desde cero
```
Usuario sabe exactamente qué quiere:
"Empanadas de Doña Rosa, receta familiar desde 1985,
 las mejores de Palermo, masa casera y relleno único"

→ Genera con esa letra directa
→ Suno crea canción con ese texto
```

### Caso 2: Usuario no sabe qué escribir
```
Usuario deja el campo vacío o clickea "✨ Generar con IA"

→ Backend usa OpenAI (gpt-4o-mini) para crear letra
→ Basado en: nombre marca + género + mood
→ Pre-llena el textarea
→ Usuario puede editar antes de generar
```

### Caso 3: Usuario escribe algo básico + clickea botón
```
Usuario escribió: "Empanadas de Palermo"

→ Backend mejora/expande con IA:
  "Las mejores empanadas de Palermo,
   Receta casera, sabor tradicional,
   Empanadas de Doña Rosa, únicas en la ciudad"

→ Usuario edita y ajusta
→ Genera con versión final
```

---

## 🛠️ IMPLEMENTACIÓN TÉCNICA

### Frontend (`src/app/page.tsx`):

```typescript
// Nuevo estado
const [customLyrics, setCustomLyrics] = useState('')
const [loadingLyrics, setLoadingLyrics] = useState(false)

// Handler para generar/mejorar letra
const handleGenerateLyrics = async () => {
  const res = await fetch('/api/generate-lyrics', {
    method: 'POST',
    body: JSON.stringify({
      brandName,
      genre,
      moods,
      userInput: customLyrics.trim(),
    }),
  })
  const data = await res.json()
  setCustomLyrics(data.lyrics)
}

// UI
<textarea
  value={customLyrics}
  onChange={(e) => setCustomLyrics(e.target.value)}
  placeholder="Escribí la letra o dejanos ayudarte con IA"
  maxLength={500}
/>

<button onClick={handleGenerateLyrics}>
  {customLyrics ? '✨ Mejorar con IA' : '✨ Generar con IA'}
</button>
```

### Backend (`src/app/api/generate-lyrics/route.ts`):

```typescript
// Usa OpenAI (gpt-4o-mini) para generar/mejorar
const prompt = userInput 
  ? `Mejorá esta idea: "${userInput}" ...`
  : `Escribí letra para: ${brandName} ...`

const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini', // Barato: ~$0.15 por 1M tokens
  messages: [
    { role: 'system', content: 'Copywriter experto en jingles' },
    { role: 'user', content: prompt }
  ],
  max_tokens: 200,
  temperature: 0.9, // Creatividad alta
})

return { lyrics: response.choices[0].message.content }
```

### Suno Integration (`src/app/api/generate/route.ts`):

```typescript
// Detectar si hay custom lyrics
const prompt = body.customLyrics?.trim() || buildSunoPrompt(body)
const isCustomMode = !!body.customLyrics?.trim()

// Enviar a Suno
await fetch(`${SUNO_API_BASE}/api/v1/generate`, {
  body: JSON.stringify({
    customMode: isCustomMode, // 🆕 true si usuario escribió
    prompt,                    // 🆕 letra custom o auto
    ...
  })
})
```

---

## 🎨 UX/UI

### Formulario actualizado:

```
ANTES:
- ¿Qué hacés o vendés? [Input]
- Ubicación [Input]

DESPUÉS:
- ¿Sobre qué es tu canción? [Textarea]
- [✨ Generar con IA] [Contador: 0/500]
- 💡 Podés editar el texto antes de generar
```

### Copy del botón (dinámico):

```
Estado vacío: "✨ Generar con IA"
Con texto:    "✨ Mejorar con IA"
Cargando:     "⏳ Generando..."
```

### Hints contextuales:

```
Label: "¿Sobre qué es tu canción?"
Sublabel: "Escribí la letra o dejanos ayudarte con IA"

Placeholder:
"Ej: Las mejores empanadas de Palermo, receta familiar
desde 1985, sabor único y auténtico..."

Post-generación:
"💡 Podés editar el texto antes de generar tu canción"
```

---

## 💰 MODELO DE PRICING

### ACTUAL (todo gratis):
```
- Preview de 15 seg: GRATIS
- Letra IA o custom: GRATIS
- Pago solo al descargar: $8,900
```

**Pro:** Súper accesible, diferenciador único  
**Con:** Dejamos dinero en mesa si usuarios abusan

### FUTURO (posible tiering):

```
BÁSICO: $8,900
- 2 versiones
- Letra automática
- Preview 15 seg

PREMIUM: $13,800
- 2 versiones
- Letra 100% custom
- Preview completo
- Regeneraciones ilimitadas
```

**Por ahora:** Mantenemos todo gratis para validar demanda

---

## 📊 COSTOS DE OPERACIÓN

### OpenAI (gpt-4o-mini):
```
Precio: $0.15 por 1M tokens input
       $0.60 por 1M tokens output

Por generación de letra:
- Input: ~150 tokens ($0.000023)
- Output: ~150 tokens ($0.000090)
- Total: ~$0.00011 por generación

Con 1,500 generaciones/mes:
- Costo OpenAI: ~$0.17 USD/mes
```

**Conclusión:** NEGLIGIBLE. El costo es prácticamente cero.

### SunoAPI (custom mode):
```
Mismo precio que modo automático
No hay costo adicional por usar customMode: true
```

---

## 🎯 DIFERENCIADORES vs COMPETENCIA

### Competidores (Murf, Soundraw, Boomy):
- ❌ Letra automática solamente
- ❌ Si querés custom → upgrade caro
- ❌ No hay "botón mágico" para mejorar

### Nosotros:
- ✅ Letra custom gratis para todos
- ✅ Botón de IA para ayudar (no forzar)
- ✅ Editable antes de generar
- ✅ Sin upgrades ocultos

**Mensaje:** "Total control + ayuda cuando la necesites"

---

## 📈 MÉTRICAS A TRACKEAR

### KPIs nuevos:

1. **Custom lyrics usage rate**
   - % de generaciones con customLyrics
   - Meta: 40-60%

2. **AI button click rate**
   - % que usa "✨ Generar/Mejorar con IA"
   - Meta: 70-80% (de los que no escriben desde cero)

3. **Edit after AI rate**
   - % que edita después de generar con IA
   - Meta: 50-60% (significa que el AI no es perfecto, pero ayuda)

4. **Conversión con custom vs auto**
   - ¿Custom lyrics convierte mejor?
   - Hipótesis: SÍ (más personalizado = más valor)

### Tracking (GA4):

```typescript
// Trackear cuando usuario usa custom lyrics
trackEvent('custom_lyrics_used', {
  source: 'user_wrote' | 'ai_generated' | 'ai_improved',
  lyrics_length: customLyrics.length,
})

// Trackear cuando usa botón AI
trackEvent('ai_lyrics_clicked', {
  had_text: customLyrics.length > 0,
})
```

---

## 🧪 A/B TESTS FUTUROS

### Test 1: Precio de custom lyrics
```
Control: Gratis
Variant A: +$2,900 (premium)
Variant B: +$4,900 (premium)

Hipótesis: Gratis maximiza conversión total, pero podemos
monetizar después con "regeneraciones ilimitadas"
```

### Test 2: Copy del botón
```
Control: "✨ Generar con IA"
Variant A: "✨ Escribir por mí"
Variant B: "✨ Ayuda de IA"

Hipótesis: "Escribir por mí" es más claro para no-técnicos
```

### Test 3: Position del feature
```
Control: Campo obligatorio (actual)
Variant: Toggle opcional "¿Querés escribir tu letra?"

Hipótesis: Obligatorio asusta a algunos, opcional reduce fricción
```

---

## 🚀 NEXT ITERATIONS

### Corto plazo (1-2 semanas):
1. 📊 Monitorear custom lyrics usage rate
2. 🔍 Revisar quality de letras generadas (feedback)
3. 🎨 Agregar ejemplos de "buenas letras" (tooltip)

### Mediano plazo (1 mes):
4. ✨ Mejorar prompt de OpenAI (más pegadizo, más argentino)
5. 📝 Agregar "templates" (estructura de jingles famosos)
6. 🎯 A/B test: gratis vs premium

### Largo plazo (3 meses):
7. 🎵 "Letra perfecta" service: humano revisa y mejora (+$X)
8. 📚 Biblioteca de letras exitosas (inspiración)
9. 🤝 Integraciones (importar letra desde ChatGPT, etc.)

---

## ✅ CHECKLIST DE LAUNCH

- [x] Endpoint `/api/generate-lyrics` (OpenAI)
- [x] UI actualizada (textarea + botón mágico)
- [x] Integration con SunoAPI (customMode)
- [x] Estilos responsive
- [x] Build exitoso
- [x] Deploy a production

### Post-launch (monitoring):
- [ ] Verificar costos de OpenAI (primeros 100 usos)
- [ ] Revisar quality de letras generadas
- [ ] Recolectar feedback de usuarios
- [ ] Trackear métricas de uso

---

## 🎓 LEARNINGS ESPERADOS

### Hipótesis a validar:

1. **Custom lyrics aumenta conversión**
   - Más personalizado = más valor percibido
   - Usuarios pagan más por "su" canción

2. **Botón mágico reduce fricción**
   - Usuarios que no saben escribir → usan IA
   - Vs competidores: más accesible

3. **Gratis es mejor estrategia (por ahora)**
   - Diferenciador fuerte vs competencia
   - Monetizar después con otros add-ons

---

**Feature LIVE:** https://generador-musica-v2.vercel.app 🎵✨

