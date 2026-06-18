import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Realistic multi-waypoint shipping routes per trade lane
const LANE_CONFIG = {
  'Shanghai→Rotterdam': {
    origin:      { name: 'Shanghai',  coords: [121.47, 31.23] },
    destination: { name: 'Rotterdam', coords: [4.46, 51.92]   },
    routes: [
      {
        label: 'Via Suez Canal',
        color: '#185FA5',
        dash: false,
        waypoints: [
          [121.47, 31.23], [119, 24], [110, 12], [103, 4],
          [83, 7], [65, 10], [50, 12], [45, 12],
          [43, 13], [38, 22], [33, 30], [32.5, 31],
          [25, 34], [10, 37], [-5, 36], [-2, 48], [4.46, 51.92],
        ],
      },
      {
        label: 'Via Cape of Good Hope',
        color: '#F59E0B',
        dash: true,
        waypoints: [
          [121.47, 31.23], [110, 10], [103, 3],
          [85, -5], [65, -20], [35, -35], [18.5, -34.4],
          [0, -28], [-12, 0], [-18, 20], [-12, 38],
          [-5, 48], [4.46, 51.92],
        ],
      },
    ],
  },

  'China→US West Coast': {
    origin:      { name: 'Shanghai',    coords: [121.47, 31.23]  },
    destination: { name: 'Los Angeles', coords: [-118.26, 33.75] },
    routes: [
      {
        label: 'Trans-Pacific (Direct)',
        color: '#185FA5',
        dash: false,
        waypoints: [
          [121.47, 31.23], [138, 35], [155, 40],
          [175, 43], [-165, 42], [-145, 38], [-118.26, 33.75],
        ],
      },
      {
        label: 'Via Hawaii',
        color: '#F59E0B',
        dash: true,
        waypoints: [
          [121.47, 31.23], [140, 28], [158, 24],
          [-157.8, 21.3], [-140, 28], [-125, 32], [-118.26, 33.75],
        ],
      },
    ],
  },

  'Singapore→Dubai': {
    origin:      { name: 'Singapore', coords: [103.82, 1.29]  },
    destination: { name: 'Dubai',     coords: [55.11, 24.97]  },
    routes: [
      {
        label: 'Via Arabian Sea',
        color: '#185FA5',
        dash: false,
        waypoints: [
          [103.82, 1.29], [96, 4], [83, 7],
          [68, 12], [58, 22], [56.5, 24], [55.11, 24.97],
        ],
      },
      {
        label: 'Via Colombo',
        color: '#F59E0B',
        dash: true,
        waypoints: [
          [103.82, 1.29], [95, -2], [87, 2],
          [80.0, 6.93], [72, 10], [60, 14],
          [57, 22], [56, 24.5], [55.11, 24.97],
        ],
      },
    ],
  },

  'India→Europe': {
    origin:      { name: 'Mumbai',  coords: [72.85, 18.96] },
    destination: { name: 'Hamburg', coords: [9.99,  53.55]  },
    routes: [
      {
        label: 'Via Suez Canal',
        color: '#185FA5',
        dash: false,
        waypoints: [
          [72.85, 18.96], [60, 13], [50, 12], [45, 12],
          [43, 13], [40, 20], [35, 26], [33, 30], [28, 34],
          [15, 37], [2, 43], [0, 48], [9.99, 53.55],
        ],
      },
      {
        label: 'Via Cape of Good Hope',
        color: '#F59E0B',
        dash: true,
        waypoints: [
          [72.85, 18.96], [65, 5], [52, -14],
          [35, -28], [18.5, -34.4], [5, -25],
          [-8, 0], [-12, 20], [-8, 40],
          [0, 48], [9.99, 53.55],
        ],
      },
    ],
  },

  'Asia→ANZ': {
    origin:      { name: 'Singapore', coords: [103.82, 1.29]   },
    destination: { name: 'Melbourne', coords: [144.96, -37.82] },
    routes: [
      {
        label: 'Via Java Sea',
        color: '#185FA5',
        dash: false,
        waypoints: [
          [103.82, 1.29], [108, -5], [112, -8],
          [116, -12], [122, -18], [128, -22],
          [134, -28], [138, -33], [144.96, -37.82],
        ],
      },
      {
        label: 'Via Torres Strait',
        color: '#F59E0B',
        dash: true,
        waypoints: [
          [103.82, 1.29], [113, -2], [122, -5],
          [132, -10], [140, -13], [142, -17],
          [147, -25], [150, -33], [147, -37], [144.96, -37.82],
        ],
      },
    ],
  },
}

export default function TradeRouteMap({ selectedLane }) {
  const config = LANE_CONFIG[selectedLane]
  if (!config) return null

  const { origin, destination, routes } = config

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-5 pt-5 pb-3 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Shipping Route Map</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {origin.name} → {destination.name} · {routes.length} routes shown
          </p>
        </div>
        <div className="flex gap-3">
          {routes.map((r, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              {r.dash
                ? <span className="inline-block w-6 border-t-2 border-dashed" style={{ borderColor: r.color }} />
                : <span className="inline-block w-6 border-t-2" style={{ borderColor: r.color }} />
              }
              {r.label}
            </span>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="relative" style={{ background: '#DBEAFE' }}>
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 153, center: [15, 15] }}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EFF6FF"
                  stroke="#BFDBFE"
                  strokeWidth={0.4}
                  style={{ outline: 'none' }}
                />
              ))
            }
          </Geographies>

          {/* Route lines */}
          {routes.map((route, ri) =>
            route.waypoints.slice(0, -1).map((wp, wi) => (
              <Line
                key={`r${ri}-s${wi}`}
                from={wp}
                to={route.waypoints[wi + 1]}
                stroke={route.color}
                strokeWidth={ri === 0 ? 2 : 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={route.dash ? '6 4' : undefined}
                strokeOpacity={0.85}
              />
            ))
          )}

          {/* Origin port marker */}
          <Marker coordinates={origin.coords}>
            <circle r={5} fill="#185FA5" stroke="white" strokeWidth={2} />
            <circle r={9} fill="#185FA5" fillOpacity={0.15} />
            <text
              textAnchor="middle"
              y={-13}
              style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, fill: '#1E293B' }}
            >
              {origin.name}
            </text>
          </Marker>

          {/* Destination port marker */}
          <Marker coordinates={destination.coords}>
            <circle r={5} fill="#F59E0B" stroke="white" strokeWidth={2} />
            <circle r={9} fill="#F59E0B" fillOpacity={0.15} />
            <text
              textAnchor="middle"
              y={-13}
              style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, fill: '#1E293B' }}
            >
              {destination.name}
            </text>
          </Marker>
        </ComposableMap>

        {/* Origin / Destination key */}
        <div className="absolute bottom-3 left-3 flex gap-3 text-xs bg-white/80 backdrop-blur-sm
          rounded-lg px-3 py-1.5 border border-slate-200 shadow-sm">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#185FA5' }} />
            {origin.name} (Origin)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
            {destination.name} (Destination)
          </span>
        </div>
      </div>
    </div>
  )
}
