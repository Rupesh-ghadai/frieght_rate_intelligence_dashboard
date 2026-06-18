import React from 'react'

const RISK_STYLES = {
  Low:    'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-amber-100 text-amber-800 border-amber-200',
  High:   'bg-red-100 text-red-800 border-red-200'
}

export default function AIAnalysis({ analysis }) {
  if (!analysis) return null
  const { summary, key_drivers, risk_level, outlook } = analysis
  const riskStyle = RISK_STYLES[risk_level] ?? RISK_STYLES.Medium

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${riskStyle}`}>
          {risk_level} Risk
        </span>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Summary</p>
        <p className="text-sm text-slate-700 leading-relaxed">{summary}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Key Drivers</p>
        <ul className="space-y-1.5">
          {key_drivers.map((driver, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-0.5 font-bold flex-shrink-0" style={{ color: '#185FA5' }}>•</span>
              <span>{driver}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Outlook</p>
        <p className="text-sm italic text-slate-600 leading-relaxed">{outlook}</p>
      </div>
    </div>
  )
}
