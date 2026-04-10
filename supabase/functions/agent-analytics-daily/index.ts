import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

// Edge Function para el Agente 8: Analytics & BI
// Ejecutado diariamente por un cron, recopila datos y guarda un insight usando OpenAI si está habilitado

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Calcular estadísticas del día anterior (o el día actual)
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() - 1)
    const dateString = targetDate.toISOString().split('T')[0]

    // Promos (Leads)
    const { count: generationsCount } = await supabaseClient
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${dateString}T00:00:00.000Z`)
      .lt('created_at', `${dateString}T23:59:59.999Z`)

    // Pagos completados (Conversiones)
    const { data: payments } = await supabaseClient
      .from('payments')
      .select('amount_ars')
      .eq('mp_status', 'approved')
      .gte('created_at', `${dateString}T00:00:00.000Z`)
      .lt('created_at', `${dateString}T23:59:59.999Z`)

    const totalRevenue = payments?.reduce((acc, curr) => acc + Number(curr.amount_ars), 0) || 0
    const conversionsCount = payments?.length || 0

    // Llamada opcional a OpenAI (Cerebro del agente)
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    let aiInsight = 'OpenAI API Key no disponible en el entorno.'

    if (OPENAI_API_KEY) {
      const prompt = `Analiza estas métricas diarias de un generador de jingles musicales impulsado por IA. Dame un insight corto y accionable:
- Leads generados: ${generationsCount}
- Ventas completadas: ${conversionsCount}
- Ingresos: ${totalRevenue} ARS`

      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Eres un analista de datos de Growth para aplicaciones B2B B2C SaaS.' },
            { role: 'user', content: prompt }
          ]
        })
      })

      if (openAiRes.ok) {
        const json = await openAiRes.json()
        aiInsight = json.choices[0].message.content
      } else {
        console.error('OpenAI Error:', openAiRes.status, await openAiRes.text())
        aiInsight = 'Error consultando a OpenAI.'
      }
    }

    // Guardar la decisión/acción en la BD
    await supabaseClient.from('agent_decisions').insert({
      agent_name: 'agente_8_analytics',
      action_type: 'daily_report',
      details: {
        date: dateString,
        generations: generationsCount,
        conversions: conversionsCount,
        revenue: totalRevenue,
        insight: aiInsight
      }
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Reporte generado y guardado.',
        date: dateString, 
        generations: generationsCount, 
        conversions: conversionsCount, 
        revenue: totalRevenue 
      }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (err: any) {
    console.error('Edge function error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})
