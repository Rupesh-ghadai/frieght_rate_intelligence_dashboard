import React from 'react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts'
import { formatDate } from '../lib/dataUtils'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const rate = payload.find(p => p.dataKey === 'rate')
  const ma = payload.find(p => p.dataKey === 'ma30')
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm min-w-[140px]">
      <p className="font-semibold text-slate-700 mb-2">{formatDate(label)}</p>
      {rate && (
        <p className="text-xs" style={{ color: '#185FA5' }}>
          Rate: <span className="font-semibold">${rate.value?.toLocaleString()}</span>
        </p>
      )}
      {ma && (
        <p className="text-xs text-amber-600">
          30d Avg: <span className="font-semibold">${ma.value?.toLocaleString()}</span>
        </p>
      )}
    </div>
  )
}

function legendFormatter(value) {
  return value === 'rate' ? 'Freight Rate' : '30d Moving Avg'
}

export default function FreightChart({ chartData }) {
  // Show a tick every 15 days
  const ticks = chartData
    .filter((_, i) => i % 15 === 0)
    .map(d => d.date)

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={chartData} margin={{ top: 8, right: 20, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis
          dataKey="date"
          ticks={ticks}
          tickFormatter={formatDate}
          tick={{ fontSize: 11, fill: '#64748B' }}
          axisLine={{ stroke: '#E2E8F0' }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={v => `$${(v / 1000).toFixed(1)}k`}
          tick={{ fontSize: 11, fill: '#64748B' }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={legendFormatter} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="#185FA5"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="ma30"
          stroke="#F59E0B"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          connectNulls
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
