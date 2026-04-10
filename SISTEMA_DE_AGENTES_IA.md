# Sistema de Agentes IA — Generador de Jingles para Marcas
### Arquitectura de mejora autónoma y continua

---

## Visión General

El objetivo es construir un ecosistema de agentes de inteligencia artificial que operen en paralelo y de forma autónoma, cubriendo cada etapa del ciclo de vida del producto: desde que alguien descubre el sitio por primera vez hasta que descarga su jingle y lo recomienda. Cada agente tiene acceso a datos reales del negocio (GA4, Meta Ads API, Supabase, Suno) y toma decisiones o ejecuta cambios sin intervención manual.

El stack actual del proyecto (Next.js 14 + Supabase + Vercel + Meta Pixel + GA4 + Mercado Pago) es una base excelente para instrumentar este sistema. Todo lo que se describe a continuación puede construirse sobre lo que ya existe.

---

## Mapa del Funnel Actual y sus Puntos de Intervención

```
[TRÁFICO] → [LANDING] → [FORMULARIO] → [GENERANDO] → [ESCUCHAR] → [PAGO] → [DESCARGA] → [POST-COMPRA]
    ↑             ↑            ↑               ↑             ↑           ↑          ↑             ↑
 Agente 1      Agente 3     Agente 3        Agente 7     Agente 3    Agente 3   Agente 8      Agente 9
 Agente 2      Agente 4     Agente 5        Agente 8     Agente 5    Agente 6   Agente 10     Agente 11
 Agente 12     Agente 13                                 Agente 6
```

---

## Los 13 Agentes del Sistema

---

### AGENTE 1 — SEO & Contenido Orgánico

**Rol:** Dominar el tráfico orgánico en Google Argentina para todas las keywords relacionadas con jingles, música para marcas y producción musical.

**Lo que hace de forma autónoma:**

Monitorea semanalmente el ranking de las keywords objetivo en Google.ar usando la Search Console API y herramientas como Semrush o Ahrefs API. Cuando detecta que una keyword con volumen significativo no tiene una landing page dedicada, genera el contenido completo (título, meta description, H1/H2, cuerpo del artículo, FAQ, schema markup) y crea un nuevo archivo de página dentro del proyecto.

Analiza la intención de búsqueda de términos como "jingle para redes sociales", "canción para empresa", "música corporativa argentina", "cómo hacer un jingle para Instagram", y construye páginas específicas para cada una. El proyecto ya tiene 3 landing pages; con este agente podría llegar a 50+ en 3 meses.

Audita mensualmente las páginas existentes: identifica cuáles tienen CTR bajo en Search Console (buen ranking pero pocos clics) y actualiza el title/description. Identifica cuáles tienen bounce rate alto y refuerza el contenido above the fold.

También se encarga del link building: detecta blogs, directorios de herramientas digitales y foros de marketing argentinos donde se puede mencionar el proyecto, y genera los textos de outreach.

**Datos que consume:** Google Search Console API, GA4, Supabase (qué géneros musicales generan más conversiones para priorizar keywords).

**Output:** Nuevas páginas `.tsx` listas para desplegar, reportes de ranking semanales, sugerencias de link building, actualizaciones de metadata.

---

### AGENTE 2 — Google Ads & SEM

**Rol:** Capturar demanda existente en Google con campañas pagadas altamente optimizadas.

**Lo que hace de forma autónoma:**

Gestiona campañas de búsqueda en Google Ads orientadas a keywords de alta intención como "generador de jingles", "crear jingle online", "música para mi empresa". Conecta con la API de Google Ads para leer el performance diario de cada keyword, grupo de anuncios y anuncio.

Pausa keywords con CPC alto y conversión baja. Escala el presupuesto en keywords donde el CPA está por debajo del objetivo (dado que el ticket es $8.900 ARS, el CPA objetivo se puede definir como un porcentaje de ese valor). Añade keywords negativas automáticamente cuando detecta búsquedas irrelevantes en el informe de términos de búsqueda.

Genera variantes de anuncios de texto basadas en los resultados de los A/B tests del sitio. Si la variante B del headline del sitio ("Conseguí el jingle de tu marca sin músicos ni estudio") está ganando, ese mismo mensaje se replica en los anuncios de Google.

También gestiona campañas de Display y YouTube con audiencias de retargeting: impacta a usuarios que llegaron al paso de escuchar pero no pagaron.

**Datos que consume:** Google Ads API, GA4 (conversiones), Supabase (pagos completados para calcular ROAS real).

**Output:** Ajustes de pujas y presupuestos, nuevas keywords, keywords negativas, textos de anuncios, reportes de ROAS diario.

---

### AGENTE 3 — Meta Ads Optimizer

**Rol:** Maximizar el retorno de la pauta en Meta (Facebook + Instagram) con optimización continua de audiencias, creativos y presupuestos.

**Lo que hace de forma autónoma:**

Lee el performance de cada campaña, ad set y anuncio vía Meta Ads API (Pixel ID: 956333963474211). Calcula el costo por evento en cada etapa: costo por Lead (formulario enviado), costo por AddToCart (jingle listo para escuchar), costo por InitiateCheckout, costo por Purchase.

Cuando detecta que un anuncio tiene CPM alto y CTR bajo (el creativo no llama la atención), lo pausa y lo reemplaza con uno nuevo generado por el Agente 4. Cuando detecta que un ad set tiene frecuencia superior a 3.5 (la audiencia se está saturando), reduce el presupuesto o amplía la audiencia.

Gestiona las audiencias de forma dinámica: crea y actualiza Custom Audiences con los usuarios que completaron cada etapa del funnel (visitaron `/escuchar/` pero no compraron = audiencia de retargeting de mayor valor). Crea Lookalike Audiences a partir de los compradores reales para escalar.

Detecta el mejor horario de publicación según el día y la hora en que se dan más conversiones (dato de Supabase cruzado con los eventos de Meta) y ajusta el scheduling de los anuncios automáticamente.

También gestiona el presupuesto total: si el ROAS está por encima del objetivo, escala automáticamente el gasto diario. Si cae, reduce y notifica.

**Datos que consume:** Meta Ads API, Meta Pixel events, Supabase (pagos reales para calcular ROAS), GA4.

**Output:** Ajustes de campañas en tiempo real, creación de audiencias, reportes de performance, alertas de anomalías.

---

### AGENTE 4 — Generador de Creativos (Imágenes y Videos)

**Rol:** Producir un flujo constante de creativos publicitarios frescos para Meta, Google y contenido orgánico, sin intervención humana.

**Lo que hace de forma autónoma:**

**Para imágenes de ads:** Usa modelos de generación de imágenes (DALL-E 3, Midjourney API, Stable Diffusion vía Replicate) para crear visuales que representen el concepto de "tu marca con una canción propia". Los inputs que usa para generar los prompts son: los géneros musicales más convertidores del mes (datos de Supabase), los copies ganadores de los A/B tests del sitio, y las características de las audiencias que más convierten en Meta.

Genera variaciones sistemáticas: mismo concepto con 3 estilos visuales diferentes, 3 formatos (cuadrado 1:1 para feed, vertical 9:16 para Stories/Reels, horizontal 16:9 para YouTube), y múltiples copys. Esto permite testear de forma exhaustiva qué combinación visual+copy+formato genera mejor CPA.

**Para videos:** Usa herramientas como Runway ML, Pika Labs o HeyGen para crear:
- Videos cortos (15-30 segundos) para Reels e Instagram Stories mostrando el proceso: "Ingresás el nombre de tu marca → en 2 minutos tenés este jingle" con un jingle real de ejemplo.
- Videos de testimonios simulados con avatares digitales leyendo las reseñas reales que ya tiene el sitio.
- Videos de "before/after": marca sin jingle vs. marca con jingle.
- Demos de los 12 géneros musicales disponibles para mostrar la variedad.

**Para contenido orgánico:** Genera imágenes para posts de Instagram y LinkedIn explicando el valor del jingle para una marca, con los colores y tipografías del proyecto.

**Datos que consume:** Supabase (géneros más populares y que más convierten), Meta Ads API (qué formatos tienen mejor CTR), resultados de A/B tests.

**Output:** Librería de creativos listos para subir a Meta Ads, posts de redes sociales, videos para Reels/TikTok.

---

### AGENTE 5 — CRO (Optimización de Conversión)

**Rol:** Aumentar sistemáticamente la tasa de conversión en cada etapa del funnel analizando datos de comportamiento y ejecutando experimentos.

**Lo que hace de forma autónoma:**

Lee el funnel completo en GA4 y calcula las tasas de conversión entre cada etapa:
- Homepage → Formulario enviado
- Formulario enviado → Generación completada
- Generación completada → Escuchar (llegaron a `/escuchar/`)
- Escuchar → Pago iniciado (clic en "Pagar")
- Pago iniciado → Pago completado
- Pago completado → Descarga

Identifica la etapa con mayor drop-off y prioriza los experimentos ahí. Por ejemplo, si el 60% de los usuarios que llegan a `/escuchar/` no inician el pago, el agente diseña tests para esa pantalla: cambiar el precio visual, añadir garantía, modificar el CTA, mostrar casos de uso reales.

Gestiona el sistema de A/B tests ya existente en el proyecto (`/src/lib/ab-testing.ts`) para proponer y rotar nuevas variantes de forma autónoma. Analiza los resultados con significancia estadística (mínimo 100 conversiones por variante) y "promociona" la variante ganadora a control.

También analiza los datos del Exit Intent Popup: qué porcentaje de usuarios que ven el popup terminan convirtiendo, y optimiza el copy y el timing.

Detecta patrones de dispositivo: si los usuarios de mobile tienen conversión 40% menor que desktop, propone optimizaciones específicas para mobile.

**Datos que consume:** GA4 (funnel reports, event tracking), Supabase (tasa de conversión real por variante), datos del A/B testing framework.

**Output:** Reporte semanal de CRO con hipótesis priorizadas, nuevas configuraciones de A/B tests, ganadores estadísticamente significativos implementados.

---

### AGENTE 6 — Pricing Intelligence

**Rol:** Encontrar el precio óptimo que maximiza el ingreso total (no solo la tasa de conversión).

**Lo que hace de forma autónoma:**

Actualmente el precio es fijo en $8.900 ARS. Este agente diseña y ejecuta experimentos de precios usando el A/B testing framework existente. Prueba estrategias como:
- Precio ancla: mostrar un "precio original" tachado ($15.000 ARS) con precio especial ($8.900 ARS).
- Urgencia: descuento por tiempo limitado para usuarios que estuvieron en el sitio más de 3 minutos sin comprar.
- Bundling: opción de comprar solo el jingle ($8.900) vs. pack con 3 variantes de género ($15.000).
- Precio diferencial por género: los géneros "premium" (orquesta, jazz) con precio ligeramente mayor.

Monitorea cómo fluctúa el tipo de cambio ARS/USD y evalúa si el precio sigue siendo competitivo internacionalmente (el sitio podría expandirse a otros mercados latinoamericanos).

Calcula el ingreso por visitante (Revenue per Visitor = conversión × precio promedio) para cada variante de precio y determina el óptimo.

**Datos que consume:** Supabase (pagos completados con timestamp, precio pagado), GA4 (visitantes únicos por variante), datos económicos externos (inflación ARS).

**Output:** Recomendaciones de pricing implementadas como variantes de A/B test, análisis de elasticidad de demanda, reporte mensual de Revenue per Visitor.

---

### AGENTE 7 — QA Automatizado

**Rol:** Garantizar que el producto funcione correctamente las 24 horas, detectando errores antes de que impacten en los ingresos.

**Lo que hace de forma autónoma:**

Ejecuta un flujo de prueba de extremo a extremo cada 30 minutos: envía el formulario con un nombre de marca de prueba, espera la generación, verifica que el audio se pueda reproducir, y confirma que el flujo de pago se inicia correctamente. Si cualquier paso falla, envía una alerta inmediata vía email o Slack.

Monitorea los tiempos de respuesta de la Suno API: si los tiempos de generación superan un umbral (por ejemplo, más de 4 minutos), alerta porque eso impacta la experiencia de usuario en la pantalla `/generando/[id]`.

Revisa los logs de Supabase para detectar patrones anómalos: si en la última hora hay un 30% más de generaciones que terminan en estado de error vs. la semana anterior, algo está roto.

Monitorea las webhooks de Mercado Pago: verifica que los pagos completados actualicen correctamente el campo `is_unlocked` en la tabla `generations`. Un fallo en este webhook significa usuarios que pagaron pero no pueden descargar.

Prueba los 12 géneros musicales disponibles en rotación para asegurar que todos generan correctamente con Suno.

**Datos que consume:** Supabase (logs de generaciones y pagos), Suno API (tiempos de respuesta), Mercado Pago webhooks.

**Output:** Alertas en tiempo real, reporte diario de uptime y errores, dashboard de salud del sistema.

---

### AGENTE 8 — Analytics & Business Intelligence

**Rol:** Consolidar todos los datos del negocio en un reporte inteligente que identifica oportunidades y problemas de forma proactiva.

**Lo que hace de forma autónoma:**

Genera un reporte diario automático que incluye: visitas, leads, conversiones, ingresos del día vs. día anterior y vs. semana anterior. Cuando detecta caídas significativas (más de 20% en conversiones respecto al promedio de los últimos 7 días), activa una alerta de "anomalía" y busca la causa en los datos disponibles (¿cayó el tráfico? ¿bajó la tasa de conversión en algún paso específico? ¿hay problemas técnicos en QA?).

Construye un modelo de cohortes: agrupa a los usuarios que generaron en la misma semana y hace seguimiento de su comportamiento. ¿Cuántos de los que generaron hace 2 semanas volvieron a generar? ¿Cuántos compraron en el segundo intento?

Analiza qué géneros musicales tienen mayor tasa de conversión (no solo de generación) para informar las decisiones del Agente de SEO y el de Creativos.

Calcula el LTV potencial: si el sistema de referidos se activa y los usuarios que vinieron por referido tienen mejor conversión, ese dato impacta directamente en cuánto se puede invertir en adquisición.

Produce un reporte semanal ejecutivo en PDF con los KPIs más importantes, tendencias y las 3 acciones prioritarias para la semana siguiente.

**Datos que consume:** GA4 API, Supabase (todas las tablas), Meta Ads API, Google Ads API.

**Output:** Reporte diario automático (email), dashboard en tiempo real, alertas de anomalías, reporte semanal ejecutivo.

---

### AGENTE 9 — Email Marketing & Nurturing

**Rol:** Capturar emails en múltiples puntos del funnel y ejecutar secuencias de nurturing automatizadas que recuperen usuarios no convertidos.

**Lo que hace de forma autónoma:**

El sitio actual no captura emails antes del pago, lo que significa que si un usuario genera un jingle y no compra, se pierde para siempre. Este agente diseña y gestiona la captura de emails en momentos estratégicos:

En la pantalla `/generando/[id]` (mientras espera): "¿Querés que te enviemos el link de tu jingle por email para escucharlo después?" — opción simple con mínima fricción.

En el Exit Intent Popup: en lugar de solo mostrar un CTA, también ofrece "enviarte el link de tu jingle gratis".

En `/escuchar/[id]` para usuarios que no compran después de 2 minutos: muestra un aviso no intrusivo "¿Querés guardar tu jingle para decidir después? Te lo mandamos gratis".

Con esos emails capturados, ejecuta secuencias automáticas:
- **Secuencia de abandono (24h después):** "Tu jingle para [NombreMarca] te está esperando — solo tiene este sonidito de marca de agua. Por $8.900 ARS es tuyo en descarga de alta calidad."
- **Secuencia de urgencia (72h después):** "Los jingles se guardan por 7 días. El tuyo vence el [fecha]."
- **Secuencia educativa:** Serie de 3 emails con casos de uso reales de jingles en redes sociales argentinas, para audiencias que todavía no ven el valor.
- **Secuencia post-compra:** Email de confirmación + tips de cómo usar el jingle en Instagram, TikTok, WhatsApp Business, spots de radio.

**Datos que consume:** Supabase (generaciones sin compra, emails capturados), Resend API (ya integrado en el proyecto).

**Output:** Nuevas secuencias de email configuradas en Resend, reportes de open rate y conversión, emails de abandono enviados automáticamente.

---

### AGENTE 10 — Activación del Sistema de Referidos

**Rol:** Activar y optimizar el sistema de referidos que ya existe en el código pero está deshabilitado, convirtiéndolo en un canal de adquisición orgánica.

**Lo que hace de forma autónoma:**

El proyecto ya tiene la infraestructura completa de referidos (tablas en Supabase, tracking de clicks, dashboard). El agente se encarga de activarla de forma inteligente:

Determina el momento óptimo para mostrar el referral: no en el momento del pago (demasiado fricción), sino inmediatamente después de la descarga exitosa, cuando el usuario está en su punto más alto de satisfacción.

Optimiza el incentivo: actualmente el código tiene $1.000 ARS por conversión referida. El agente testea diferentes incentivos (crédito en ARS, descuento porcentual en próxima compra, generación extra gratuita) y mide cuál genera más shares activos.

Genera mensajes de WhatsApp pre-escritos y personalizados con el nombre de la marca del usuario para facilitar el sharing. Dado que Argentina tiene altísima penetración de WhatsApp, este canal es prioritario.

Monitorea la calidad del tráfico referido: compara la tasa de conversión de usuarios referidos vs. usuarios orgánicos. Si los referidos convierten mejor, recomienda aumentar el incentivo y darle más visibilidad al programa.

**Datos que consume:** Supabase (tabla referrals, referral_clicks, payments), GA4 (conversiones por fuente).

**Output:** Sistema de referidos activo y optimizado, análisis de performance del canal, incentivos testeados.

---

### AGENTE 11 — Social Media & Contenido Orgánico

**Rol:** Construir presencia orgánica en Instagram, TikTok y LinkedIn con contenido relevante publicado de forma consistente.

**Lo que hace de forma autónoma:**

Genera un calendario de contenido semanal con 5-7 piezas por plataforma. Los formatos que produce:

**Instagram/TikTok Reels:**
- "Cómo generé el jingle de mi panadería en 2 minutos" (video screen recording del proceso)
- Jingles de marcas inventadas pero reconocibles ("¿Qué sonaría si La Serenísima tuviera un jingle cumbia?")
- Before/After: marca genérica vs. marca con jingle
- Encuesta interactiva: "¿Cuál te gusta más, versión A o versión B?" con dos jingles del mismo brief

**LinkedIn:**
- Posts educativos sobre el valor del audio branding para PyMEs
- Casos de uso: cómo usar un jingle en campañas de WhatsApp Business
- Estadísticas sobre la efectividad del audio en publicidad digital

**Instagram Stories:**
- Demos rápidas de los 12 géneros disponibles
- Testimonios en formato texto animado
- CTA directo a generar gratis

Usa los jingles reales generados en la plataforma (con permiso implícito al usar el servicio) como contenido orgánico demo.

**Datos que consume:** Supabase (géneros más populares, jingles generados como ejemplos), creativos del Agente 4.

**Output:** Calendario de contenido semanal, posts programados en Meta Business Suite, videos listos para publicar en TikTok.

---

### AGENTE 12 — Inteligencia Competitiva

**Rol:** Monitorear el ecosistema competitivo y detectar oportunidades antes que la competencia.

**Lo que hace de forma autónoma:**

Monitorea semanalmente a los competidores directos (otros generadores de jingles/música con IA, estudios de producción online, plataformas como Soundraw, Mubert, Beatoven) y reporta cambios en sus precios, features, posicionamiento SEO y estrategia de ads.

Detecta cuando un competidor empieza a rankear para keywords que hoy son territorio del proyecto. Alerta cuando un competidor lanza una nueva funcionalidad relevante que podría ser un differentiator para replicar o superar.

Monitorea la Biblioteca de Anuncios de Meta para rastrear qué creativos están usando los competidores y cuáles llevan más tiempo activos (señal de que están funcionando). Estos insights alimentan al Agente 4 para inspirar nuevos creativos.

Identifica oportunidades en mercados latinoamericanos adyacentes: México, Colombia, Chile tienen mercados similares y el proyecto podría expandirse con páginas localizadas.

**Datos que consume:** Web scraping de competidores, Meta Ad Library API, Google Search API, Semrush/Ahrefs API.

**Output:** Reporte semanal de inteligencia competitiva, alertas inmediatas ante movimientos importantes, oportunidades de diferenciación.

---

### AGENTE 13 — NPS & Calidad

**Rol:** Medir la satisfacción de los usuarios que compraron y usar ese feedback para mejorar el producto y el marketing.

**Lo que hace de forma autónoma:**

Envía un email de NPS automatizado 48 horas después de cada compra: "¿Qué tan probable es que recomiendes este servicio a otro emprendedor?" (escala 1-10) + campo abierto opcional.

Clasifica automáticamente las respuestas: Promotores (9-10), Pasivos (7-8), Detractores (1-6). Para los Detractores, notifica inmediatamente para que se les pueda dar soporte personalizado.

Extrae los temas más frecuentes en las respuestas abiertas usando procesamiento de lenguaje natural: si muchos usuarios mencionan "la espera es larga", eso le informa al Agente de QA que el tiempo de generación es un problema. Si mencionan "me gustaría poder elegir el tempo", eso va al backlog de producto.

Alimenta el componente `SocialProof.tsx` con testimonios reales y actualizados (actualmente usa testimonios fijos en el código) para que la prueba social sea dinámica y auténtica.

Calcula el NPS score mensual y lo incluye en el reporte del Agente 8.

**Datos que consume:** Resend (emails de NPS enviados/abiertos), Supabase (pagos completados con email), respuestas de formulario NPS.

**Output:** NPS score actualizado mensualmente, testimonios reales para el sitio, insights de producto priorizados, alertas para detractores.

---

## Arquitectura Técnica del Sistema

### Stack recomendado para los agentes

Todos los agentes se pueden implementar como **Supabase Edge Functions** (serverless, ya en el stack) que se disparan por:
- **Cron schedules** (diario, semanal, cada 30 minutos según el caso)
- **Webhooks** (eventos de GA4, Meta, Suno, Mercado Pago ya existentes)
- **Triggers de base de datos** en Supabase (ej: cuando se inserta un pago completado → trigger al Agente 13 para enviar NPS)

El cerebro de cada agente es una llamada a la **OpenAI API** (ya en el stack) con acceso a herramientas específicas (función calling) para cada dominio.

### Tabla de nuevas tablas necesarias en Supabase

| Tabla nueva | Propósito | Agente |
|---|---|---|
| `ab_test_results` | Resultados de cada variante con significancia estadística | Agente 5 |
| `email_captures` | Emails capturados antes del pago | Agente 9 |
| `email_sequences` | Estado de cada usuario en sus secuencias | Agente 9 |
| `nps_responses` | Respuestas de encuestas NPS | Agente 13 |
| `competitor_data` | Datos rastreados de competidores | Agente 12 |
| `agent_decisions` | Log de todas las decisiones tomadas por agentes | Todos |
| `creative_assets` | Librería de creativos generados | Agente 4 |
| `content_calendar` | Calendario de contenido programado | Agente 11 |

### APIs externas a integrar (nuevas)

| API | Para qué | Costo estimado |
|---|---|---|
| Meta Ads API | Leer y modificar campañas en tiempo real | Gratis (requiere app aprobada) |
| Google Ads API | Gestionar campañas de búsqueda | Gratis (requiere Developer Token) |
| Google Search Console API | Monitorear rankings SEO | Gratis |
| Replicate (Stable Diffusion) | Generar imágenes de creativos | ~$0.003/imagen |
| Runway ML o Pika Labs | Generar videos cortos | ~$0.05/segundo de video |
| Semrush API | Monitorear keywords y competidores | $50-100/mes |
| SendGrid o Resend (ya integrado) | Secuencias de email complejas | Resend ya en stack |

---

## Priorización por Impacto y Esfuerzo

### Tier 1 — Implementar primero (alto impacto, bajo esfuerzo)

1. **Agente 8 - Analytics & BI:** El proyecto ya tiene GA4 y Supabase bien instrumentados. Conectar esos datos en un dashboard y reporte automático es la base para todo lo demás.
2. **Agente 7 - QA Automatizado:** Crítico para no perder ingresos por errores silenciosos. El proyecto ya tiene todos los endpoints; solo hay que testearlos periódicamente.
3. **Agente 13 - NPS & Calidad:** Resend ya está integrado. Enviar un email de NPS 48h post-compra es simple y genera datos de altísimo valor.
4. **Agente 9 - Email Marketing:** La captura de emails es la mayor oportunidad no aprovechada del funnel actual.

### Tier 2 — Segunda oleada (alto impacto, esfuerzo medio)

5. **Agente 5 - CRO:** El A/B testing framework ya existe, solo hay que añadir el análisis estadístico automatizado y la generación de nuevas hipótesis.
6. **Agente 10 - Referidos:** La infraestructura existe y está oculta. Activarla y optimizar el incentivo puede generar un canal de adquisición de costo casi cero.
7. **Agente 3 - Meta Ads Optimizer:** Si hay presupuesto activo en Meta, automatizar la optimización puede mejorar el ROAS en 30-50%.

### Tier 3 — Tercera oleada (alto impacto, mayor esfuerzo)

8. **Agente 1 - SEO:** Requiere integración con Search Console y un sistema de generación de contenido. Resultados en 2-4 meses.
9. **Agente 4 - Generador de Creativos:** Requiere integración con APIs de generación de imágenes y video.
10. **Agente 11 - Social Media:** Requiere workflow de publicación automática en Meta Business Suite y TikTok.

### Tier 4 — Cuarta oleada (estratégico, largo plazo)

11. **Agente 2 - Google Ads**
12. **Agente 6 - Pricing Intelligence**
13. **Agente 12 - Inteligencia Competitiva**

---

## Estimación de Impacto en el Negocio

| Agente | Métrica impactada | Mejora estimada |
|---|---|---|
| CRO + A/B Tests | Conversión escuchar→pago | +15-30% |
| Email Marketing (abandono) | Recuperación de leads | +10-20% ingresos |
| Meta Ads Optimizer | ROAS de pauta | +25-40% |
| Referidos activados | Nuevo canal orgánico | +10-15% volumen |
| QA Automatizado | Pérdida de ingresos por errores | -90% |
| SEO + Contenido | Tráfico orgánico | +200-400% en 6 meses |
| NPS + Social Proof | Tasa de conversión landing | +5-15% |

---

## Próximos Pasos Concretos

Para arrancar, las tres acciones de mayor retorno inmediato son:

**1. Implementar el Agente 8 (Analytics)** — Conectar GA4 + Supabase en un dashboard que se actualice diariamente. Esto da visibilidad completa sobre qué está pasando en cada etapa del funnel y habilita todas las decisiones posteriores.

**2. Activar captura de email en `/generando/[id]`** — Mientras el usuario espera los 2-3 minutos de generación, tiene tiempo y disposición para dejar su email. Esta captura sola puede recuperar el 15-25% de los usuarios que no compran en el momento.

**3. Activar el sistema de referidos post-descarga** — Ya está construido. Solo necesita un punto de activación en la pantalla `/descarga` y un incentivo calibrado. Puede empezar a generar adquisición orgánica en días.

---

*Documento generado el 26 de marzo de 2026*
*Basado en análisis completo del codebase de generador-musica-v2*
