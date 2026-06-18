import React from 'react'
import { formatRate, formatPct } from '../lib/dataUtils'

export default function ExportButton({ lane, kpis, analysis }) {
  async function handleExport() {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    const margin = 20
    let y = margin

    // Header bar
    doc.setFillColor(24, 95, 165)
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(15)
    doc.setFont('helvetica', 'bold')
    doc.text('Freight Rate Intelligence Report', margin, 19)
    y = 42
    doc.setTextColor(30, 41, 59)

    function addText(text, size = 11, bold = false, indent = 0) {
      doc.setFontSize(size)
      doc.setFont('helvetica', bold ? 'bold' : 'normal')
      const lines = doc.splitTextToSize(text, 170 - indent)
      doc.text(lines, margin + indent, y)
      y += lines.length * (size * 0.42 + 1) + 2
    }

    function divider() {
      doc.setDrawColor(226, 232, 240)
      doc.line(margin, y, 190, y)
      y += 6
    }

    addText(`Trade Lane: ${lane}`, 12, true)
    addText(`Generated: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}`, 9)
    y += 2
    divider()

    addText('Key Performance Indicators', 11, true)
    addText(`Current Rate: ${formatRate(kpis.currentRate)} / TEU`)
    addText(`30-Day Change: ${formatPct(kpis.change30d)}`)
    const trendLabel = kpis.trend === 'up' ? 'Rising' : kpis.trend === 'down' ? 'Falling' : 'Stable'
    addText(`7-Day Trend: ${trendLabel}`)
    if (kpis.isAnomaly) {
      addText('Anomaly Detected: Current rate is >15% above the 30-day moving average')
    }
    y += 2
    divider()

    addText('AI Market Analysis', 11, true)
    addText(`Risk Level: ${analysis.risk_level}`)
    y += 1
    addText('Summary', 10, true)
    addText(analysis.summary)
    y += 1
    addText('Key Drivers', 10, true)
    analysis.key_drivers.forEach(d => addText(`• ${d}`, 11, false, 4))
    y += 1
    addText('Outlook', 10, true)
    addText(analysis.outlook)

    doc.save('freight-analysis.pdf')
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white
        px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50
        transition-colors focus:outline-none focus:ring-2"
      style={{ '--tw-ring-color': '#185FA5' }}
    >
      <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
      Export PDF
    </button>
  )
}
