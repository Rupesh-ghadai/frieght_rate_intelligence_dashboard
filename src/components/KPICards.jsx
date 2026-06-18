import React from 'react'
import { formatRate, formatPct } from '../lib/dataUtils'

const TREND_CONFIG = {
  up:   { arrow: '↑', colorClass: 'text-green-600', label: 'Rising'  },
  down: { arrow: '↓', colorClass: 'text-red-500',   label: 'Falling' },
  flat: { arrow: '→', colorClass: 'text-slate-500',  label: 'Stable'  }
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-3 last:mb-0">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{title}</p>
      {children}
    </div>
  )
}

export default function KPICards({ kpis }) {
  if (!kpis) return null
  const { currentRate, change30d, trend } = kpis
  const trendCfg = TREND_CONFIG[trend] ?? TREND_CONFIG.flat
  const changePositive = change30d >= 0

  return (
    <div>
      <Card title="Current Rate">
        <p className="text-2xl font-bold leading-none" style={{ color: '#185FA5' }}>
          {formatRate(currentRate)}
        </p>
        <p className="text-xs text-slate-400 mt-1">per TEU</p>
      </Card>

      <Card title="30-Day Change">
        <p className={`text-xl font-bold leading-none ${changePositive ? 'text-green-600' : 'text-red-500'}`}>
          {formatPct(change30d)}
        </p>
        <p className="text-xs text-slate-400 mt-1">vs 30 days ago</p>
      </Card>

      <Card title="7-Day Trend">
        <div className="flex items-center gap-2">
          <span className={`text-3xl leading-none ${trendCfg.colorClass}`}>{trendCfg.arrow}</span>
          <span className={`text-sm font-semibold ${trendCfg.colorClass}`}>{trendCfg.label}</span>
        </div>
      </Card>
    </div>
  )
}
