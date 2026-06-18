import React, { useState, useEffect, useCallback } from 'react'
import freightRates from './data/freightRates.json'
import { computeMovingAverage, computeKPIs } from './lib/dataUtils'
import { getFreightAnalysis } from './lib/claudeClient'
import LaneSelector from './components/LaneSelector'
import KPICards from './components/KPICards'
import AnomalyBadge from './components/AnomalyBadge'
import FreightChart from './components/FreightChart'
import SkeletonCard from './components/SkeletonCard'
import AIAnalysis from './components/AIAnalysis'
import ExportButton from './components/ExportButton'
import TradeRouteMap from './components/TradeRouteMap'

const LANES = Object.keys(freightRates)

export default function App() {
  const [selectedLane, setSelectedLane] = useState(LANES[0])
  const [chartData, setChartData] = useState([])
  const [kpis, setKpis] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const raw = freightRates[selectedLane]
    const data = computeMovingAverage(raw)
    setChartData(data)
    setKpis(computeKPIs(data))
    setAnalysis(null)
    setError(null)
  }, [selectedLane])

  const handleGetAnalysis = useCallback(async () => {
    setLoading(true)
    setError(null)
    setAnalysis(null)
    try {
      const result = await getFreightAnalysis(selectedLane)
      setAnalysis(result)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [selectedLane])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: '#185FA5' }} className="shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight">
              Freight Rate Intelligence Dashboard
            </h1>
            <p className="text-xs leading-none mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Global Trade Lane Analytics · Powered by Claude AI
            </p>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <LaneSelector selectedLane={selectedLane} onLaneChange={setSelectedLane} />
              <KPICards kpis={kpis} />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-5">

            {/* Chart card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">{selectedLane}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    90-day rate history with 30-day moving average overlay
                  </p>
                </div>
                <AnomalyBadge show={kpis?.isAnomaly} />
              </div>
              <FreightChart chartData={chartData} />
            </div>

            {/* Route map */}
            <TradeRouteMap selectedLane={selectedLane} />

            {/* AI Analysis card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">AI Market Intelligence</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time analysis via Claude with web search
                  </p>
                </div>
                {analysis && kpis && (
                  <ExportButton lane={selectedLane} kpis={kpis} analysis={analysis} />
                )}
              </div>

              {/* Idle state */}
              {!loading && !analysis && !error && (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: '#185FA510' }}>
                    <svg className="h-6 w-6" style={{ color: '#185FA5' }} fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500 mb-5 max-w-xs">
                    Get AI-powered freight market analysis with live web search for{' '}
                    <span className="font-medium text-slate-700">{selectedLane}</span>
                  </p>
                  <button
                    onClick={handleGetAnalysis}
                    className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white
                      shadow-sm hover:opacity-90 active:opacity-80 transition-opacity
                      focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ backgroundColor: '#185FA5', '--tw-ring-color': '#185FA5' }}
                  >
                    Get AI Analysis
                  </button>
                </div>
              )}

              {/* Loading skeleton */}
              {loading && <SkeletonCard />}

              {/* Error state */}
              {error && !loading && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-700">Analysis failed</p>
                  <p className="mt-1 text-xs text-red-500 break-words">{error}</p>
                  <button
                    onClick={handleGetAnalysis}
                    className="mt-3 text-xs font-semibold text-red-700 underline hover:no-underline"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Analysis result */}
              {analysis && !loading && <AIAnalysis analysis={analysis} />}
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}
