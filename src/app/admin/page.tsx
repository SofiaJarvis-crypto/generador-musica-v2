'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─── Types ───────────────────────────────────────────────────────────────────

interface AgentLog {
  id: string
  created_at: string
  agent_name: string
  action: string
  success: boolean
  duration_ms: number
  error_message?: string
  output?: Record<string, unknown>
}

interface AgentReport {
  id: string
  created_at: string
  agent_name: string
  report_type: string
  summary: string
  data?: Record<string, unknown>
  week_start: string
}

interface ProductSuggestion {
  id: string
  created_at: string
  agent_name: string
  category: string
  priority: string
  title: string
  description: string
  status: string
}

interface CreativeAsset {
  id: string
  created_at: string
  asset_type: string
  provider: string
  url?: string
  format?: string
  use_case?: string
  status: string
  prompt?: string
}

interface BusinessMetrics {
  gens_7d: number
  pays_7d: number
  conv_rate: string
  revenue_7d: number
  nps_score: number | null
  email_captures: number
}

// ─── Config ──────────────────────────────────────────────────────────────────

const AGENT_COLORS: Record<string, string> = {
  orchestrator: '#6366f1',
  'meta-ads': '#1877F2',
  qa: '#10b981',
  seo: '#f59e0b',
  email: '#ec4899',
  nps: '#8b5cf6',
  creative: '#06b6d4',
  referrals: '#84cc16',
  pricing: '#f97316',
  competitor: '#6b7280',
  analyst: '#14b8a6',
  copywriter: '#a855f7',
  optimizer: '#ef4444',
}

const SUPABASE_FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('supabase.co', 'supabase.co/functions/v1') || ''

// ─── Dashboard ───────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [logs, setLogs] = useState<AgentLog[]>([])
  const [reports, setReports] = useState<AgentReport[]>([])
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([])
  const [creatives, setCreatives] = useState<CreativeAsset[]>([])
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'reports' | 'suggestions' | 'creatives'>('overview')
  const [runningAgent, setRunningAgent] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchData = useCallback(async () => {
    const [logsRes, reportsRes, suggestionsRes, creativesRes] = await Promise.all([
      supabase.from('agent_logs').select('*').order('created_at', { ascending: false }).limit(100),
      supabase.from('agent_reports').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('product_suggestions').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('creative_assets').select('*').order('created_at', { ascending: false }).limit(24),
    ])

    if (logsRes.data) setLogs(logsRes.data as AgentLog[])
    if (reportsRes.data) setReports(reportsRes.data as AgentReport[])
    if (suggestionsRes.data) setSuggestions(suggestionsRes.data as ProductSuggestion[])
    if (creativesRes.data) setCreatives(creativesRes.data as CreativeAsset[])

    // Métricas del negocio
    const since7d = new Date(Date.now() - 7 * 86400000).toISOString()
    const [gensRes, paysRes, capturesRes, npsRes] = await Promise.all([
      supabase.from('generations').select('id', { count: 'exact', head: true }).gte('created_at', since7d),
      supabase.from('payments').select('amount_ars').eq('mp_status', 'approved').gte('created_at', since7d),
      supabase.from('email_captures').select('id', { count: 'exact', head: true }),
      supabase.from('nps_responses').select('score').not('score', 'is', null).gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString()),
    ])

    const totalGens = gensRes.count || 0
    const totalPays = paysRes.data?.length || 0
    const revenue = (paysRes.data || []).reduce((s, p) => s + Number(p.amount_ars), 0)
    const scores = (npsRes.data || []).map(r => r.score as number)
    const npsScore = scores.length > 0
      ? Math.round(((scores.filter(s => s >= 9).length - scores.filter(s => s <= 6).length) / scores.length) * 100)
      : null

    setMetrics({
      gens_7d: totalGens,
      pays_7d: totalPays,
      conv_rate: totalGens > 0 ? (totalPays / totalGens * 100).toFixed(1) : '0',
      revenue_7d: revenue,
      nps_score: npsScore,
      email_captures: capturesRes.count || 0,
    })

    setLastRefresh(new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // auto-refresh cada 60s
    return () => clearInterval(interval)
  }, [fetchData])

  async function triggerAgent(slug: string) {
    setRunningAgent(slug)
    try {
      const res = await fetch(`/api/agents/trigger?agent=${slug}`)
      await res.json()
      setTimeout(fetchData, 3000)
    } catch (e) {
      console.error(e)
    }
    setRunningAgent(null)
  }

  async function markSuggestionReviewed(id: string) {
    await supabase.from('product_suggestions').update({ status: 'reviewed', reviewed_at: new Date().toISOString() }).eq('id', id)
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: 'reviewed' } : s))
  }

  const agentStatus = Object.fromEntries(
    Object.keys(AGENT_COLORS).map(name => {
      const agentLogs = logs.filter(l => l.agent_name === name)
      const lastLog = agentLogs[0]
      return [name, {
        last_run: lastLog?.created_at,
        success: lastLog?.success,
        total_runs: agentLogs.length,
      }]
    })
  )

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f0f1a', color: '#fff', fontFamily: 'DM Sans, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
          <p>Cargando sistema de agentes...</p>
        </div>
      </div>
    )
  }

  const pendingSuggestions = suggestions.filter(s => s.status === 'pending')
  const highPriority = pendingSuggestions.filter(s => s.priority === 'high')

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', color: '#fff', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #1e1e3a', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🤖</span>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Sistema de Agentes IA</h1>
            <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>Última actualización: {lastRefresh.toLocaleTimeString('es-AR')}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {highPriority.length > 0 && (
            <span style={{ background: '#ef4444', color: '#fff', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
              🚨 {highPriority.length} alerta{highPriority.length > 1 ? 's' : ''}
            </span>
          )}
          <button
            onClick={fetchData}
            style={{ background: '#1e1e3a', border: '1px solid #2e2e5a', color: '#fff', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
          >
            ↻ Actualizar
          </button>
          <button
            onClick={() => triggerAgent('agent-orchestrator?mode=daily')}
            disabled={!!runningAgent}
            style={{ background: '#6366f1', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, opacity: runningAgent ? 0.6 : 1 }}
          >
            {runningAgent === 'agent-orchestrator?mode=daily' ? '⏳ Corriendo...' : '▶ Correr todos'}
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, padding: '20px 24px' }}>
        {[
          { label: 'Generaciones 7d', value: metrics?.gens_7d || 0, icon: '🎵', color: '#6366f1' },
          { label: 'Ventas 7d', value: metrics?.pays_7d || 0, icon: '💰', color: '#10b981' },
          { label: 'Conversión', value: `${metrics?.conv_rate || 0}%`, icon: '📈', color: '#f59e0b' },
          { label: 'Revenue 7d', value: `$${(metrics?.revenue_7d || 0).toLocaleString()}`, icon: '💵', color: '#ec4899' },
          { label: 'NPS Score', value: metrics?.nps_score !== null ? metrics.nps_score : 'N/A', icon: '⭐', color: '#8b5cf6' },
          { label: 'Email Captures', value: metrics?.email_captures || 0, icon: '📧', color: '#06b6d4' },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: '#1a1a2e', borderRadius: 12, padding: '16px', border: `1px solid ${kpi.color}22` }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{kpi.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, padding: '0 24px', borderBottom: '1px solid #1e1e3a' }}>
        {(['overview', 'logs', 'reports', 'suggestions', 'creatives'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none', border: 'none', color: activeTab === tab ? '#6366f1' : '#6b7280',
              padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: activeTab === tab ? 600 : 400,
              borderBottom: activeTab === tab ? '2px solid #6366f1' : '2px solid transparent',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'overview' ? '🗺 Mapa' : tab === 'logs' ? '📋 Logs' : tab === 'reports' ? '📊 Reportes' : tab === 'suggestions' ? `💡 Sugerencias ${pendingSuggestions.length > 0 ? `(${pendingSuggestions.length})` : ''}` : '🎨 Creativos'}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px' }}>

        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ margin: '0 0 20px', fontSize: 16, color: '#9ca3af' }}>Estado de los 13 agentes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {Object.entries(AGENT_COLORS).map(([name, color]) => {
                const status = agentStatus[name]
                const lastRun = status?.last_run ? new Date(status.last_run) : null
                const hoursAgo = lastRun ? Math.round((Date.now() - lastRun.getTime()) / 3600000) : null
                const isHealthy = status?.success !== false
                const isStale = hoursAgo !== null && hoursAgo > 168 // >7 días
                const slug = `agent-${name}`

                return (
                  <div key={name} style={{ background: '#1a1a2e', borderRadius: 12, padding: 16, border: `1px solid ${isStale ? '#ef444433' : color + '33'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: isStale ? '#6b7280' : isHealthy ? '#10b981' : '#ef4444' }} />
                        <span style={{ fontWeight: 600, fontSize: 13, color }}>{name}</span>
                      </div>
                      <button
                        onClick={() => triggerAgent(slug)}
                        disabled={runningAgent === slug}
                        style={{ background: `${color}22`, border: `1px solid ${color}44`, color, padding: '3px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 11, opacity: runningAgent === slug ? 0.5 : 1 }}
                      >
                        {runningAgent === slug ? '⏳' : '▶'}
                      </button>
                    </div>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>
                      {lastRun ? (
                        <>Última vez: {hoursAgo! < 24 ? `hace ${hoursAgo}h` : lastRun.toLocaleDateString('es-AR')}</>
                      ) : 'Sin ejecuciones aún'}
                    </div>
                    <div style={{ fontSize: 11, color: '#4b5563', marginTop: 2 }}>
                      {status?.total_runs || 0} ejecuciones totales
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Últimas sugerencias de alta prioridad */}
            {highPriority.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <h2 style={{ margin: '0 0 16px', fontSize: 16, color: '#ef4444' }}>🚨 Acciones urgentes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {highPriority.slice(0, 5).map(s => (
                    <div key={s.id} style={{ background: '#1a1a2e', borderRadius: 10, padding: 16, border: '1px solid #ef444433', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                          <span style={{ background: AGENT_COLORS[s.agent_name] + '22', color: AGENT_COLORS[s.agent_name], padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{s.agent_name}</span>
                          <span style={{ background: '#ef44441a', color: '#ef4444', padding: '2px 8px', borderRadius: 20, fontSize: 11 }}>alta prioridad</span>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{s.title}</div>
                        <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>{s.description.slice(0, 200)}{s.description.length > 200 ? '...' : ''}</div>
                      </div>
                      <button onClick={() => markSuggestionReviewed(s.id)} style={{ background: '#10b981', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap', marginLeft: 12 }}>
                        ✓ Revisado
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: LOGS */}
        {activeTab === 'logs' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {logs.map(log => (
                <div key={log.id} style={{ background: '#1a1a2e', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${log.success ? '#1e1e3a' : '#ef444433'}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: log.success ? '#10b981' : '#ef4444', flexShrink: 0 }} />
                  <span style={{ color: AGENT_COLORS[log.agent_name] || '#9ca3af', fontWeight: 600, fontSize: 12, minWidth: 100 }}>{log.agent_name}</span>
                  <span style={{ color: '#d1d5db', fontSize: 12, flex: 1 }}>{log.action}</span>
                  <span style={{ color: '#6b7280', fontSize: 11, minWidth: 80, textAlign: 'right' }}>{log.duration_ms}ms</span>
                  <span style={{ color: '#4b5563', fontSize: 11, minWidth: 140, textAlign: 'right' }}>
                    {new Date(log.created_at).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {log.error_message && <span style={{ color: '#ef4444', fontSize: 11 }} title={log.error_message}>⚠</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: REPORTS */}
        {activeTab === 'reports' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reports.map(report => (
              <div key={report.id} style={{ background: '#1a1a2e', borderRadius: 12, padding: 18, border: '1px solid #1e1e3a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ background: (AGENT_COLORS[report.agent_name] || '#6b7280') + '22', color: AGENT_COLORS[report.agent_name] || '#9ca3af', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{report.agent_name}</span>
                  <span style={{ color: '#6b7280', fontSize: 11 }}>{report.report_type}</span>
                  <span style={{ marginLeft: 'auto', color: '#4b5563', fontSize: 11 }}>{new Date(report.created_at).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#d1d5db', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{report.summary}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB: SUGGESTIONS */}
        {activeTab === 'suggestions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {suggestions.map(s => (
              <div key={s.id} style={{ background: '#1a1a2e', borderRadius: 12, padding: 16, border: `1px solid ${s.status === 'reviewed' ? '#1e1e3a' : s.priority === 'high' ? '#ef444433' : '#1e1e3a'}`, opacity: s.status === 'reviewed' ? 0.5 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ background: (AGENT_COLORS[s.agent_name] || '#6b7280') + '22', color: AGENT_COLORS[s.agent_name] || '#9ca3af', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{s.agent_name}</span>
                      <span style={{ background: '#1e1e3a', color: '#9ca3af', padding: '2px 8px', borderRadius: 20, fontSize: 11 }}>{s.category}</span>
                      <span style={{ background: s.priority === 'high' ? '#ef44441a' : s.priority === 'medium' ? '#f59e0b1a' : '#10b9811a', color: s.priority === 'high' ? '#ef4444' : s.priority === 'medium' ? '#f59e0b' : '#10b981', padding: '2px 8px', borderRadius: 20, fontSize: 11 }}>{s.priority}</span>
                      {s.status === 'reviewed' && <span style={{ color: '#10b981', fontSize: 11 }}>✓ revisado</span>}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{s.description.slice(0, 400)}{s.description.length > 400 ? '...' : ''}</div>
                  </div>
                  {s.status === 'pending' && (
                    <button onClick={() => markSuggestionReviewed(s.id)} style={{ background: '#1e1e3a', border: '1px solid #2e2e5a', color: '#9ca3af', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12, marginLeft: 12, whiteSpace: 'nowrap' }}>
                      ✓ Marcar revisado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: CREATIVES */}
        {activeTab === 'creatives' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {creatives.map(asset => (
                <div key={asset.id} style={{ background: '#1a1a2e', borderRadius: 12, overflow: 'hidden', border: '1px solid #1e1e3a' }}>
                  {asset.url && asset.url.startsWith('http') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset.url} alt={asset.prompt || 'Creative'} style={{ width: '100%', aspectRatio: asset.format === '9:16' ? '9/16' : asset.format === '16:9' ? '16/9' : '1/1', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ aspectRatio: '1/1', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
                      {asset.asset_type === 'image' ? '🖼' : asset.asset_type === 'video' ? '🎬' : '🎙'}
                    </div>
                  )}
                  <div style={{ padding: 12 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                      <span style={{ background: '#1e1e3a', color: '#9ca3af', padding: '2px 6px', borderRadius: 6, fontSize: 10 }}>{asset.provider}</span>
                      <span style={{ background: '#1e1e3a', color: '#9ca3af', padding: '2px 6px', borderRadius: 6, fontSize: 10 }}>{asset.format || asset.use_case}</span>
                      <span style={{ background: asset.status === 'generated' ? '#10b9811a' : '#f59e0b1a', color: asset.status === 'generated' ? '#10b981' : '#f59e0b', padding: '2px 6px', borderRadius: 6, fontSize: 10 }}>{asset.status}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>{asset.prompt?.slice(0, 80)}{asset.prompt && asset.prompt.length > 80 ? '...' : ''}</p>
                  </div>
                </div>
              ))}
              {creatives.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 48, color: '#4b5563' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎨</div>
                  <p>Todavía no hay creativos generados. Corré el agente-creative para comenzar.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
