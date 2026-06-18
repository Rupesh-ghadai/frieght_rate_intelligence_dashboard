export function computeMovingAverage(data, windowSize = 30) {
  return data.map((entry, i) => {
    const start = Math.max(0, i - windowSize + 1)
    const slice = data.slice(start, i + 1)
    const avg = slice.reduce((sum, d) => sum + d.rate, 0) / slice.length
    return {
      date: entry.date,
      rate: entry.rate,
      ma30: Math.round(avg)
    }
  })
}

export function computeKPIs(chartData) {
  const last = chartData[chartData.length - 1]
  const prev30 = chartData[Math.max(0, chartData.length - 31)]
  const currentRate = last.rate
  const change30d = ((currentRate - prev30.rate) / prev30.rate) * 100

  // Linear slope of last 7 points to determine trend direction
  const last7 = chartData.slice(-7)
  const n = last7.length
  const xMean = (n - 1) / 2
  const yMean = last7.reduce((s, d) => s + d.rate, 0) / n
  const num = last7.reduce((s, d, i) => s + (i - xMean) * (d.rate - yMean), 0)
  const den = last7.reduce((s, _, i) => s + Math.pow(i - xMean, 2), 0)
  const slope = den !== 0 ? num / den : 0
  const trend = slope > 5 ? 'up' : slope < -5 ? 'down' : 'flat'

  const isAnomaly = last.ma30 != null && currentRate > last.ma30 * 1.15

  return { currentRate, change30d, trend, isAnomaly }
}

export function formatDate(isoStr) {
  const d = new Date(isoStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function formatRate(n) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

export function formatPct(n) {
  const sign = n >= 0 ? '+' : ''
  return sign + n.toFixed(1) + '%'
}
