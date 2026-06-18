import React from 'react'

export default function AnomalyBadge({ show }) {
  if (!show) return null
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1
      text-xs font-semibold text-amber-800 border border-amber-200 shadow-sm whitespace-nowrap">
      ⚠ Rate anomaly: &gt;15% above 30d avg
    </span>
  )
}
