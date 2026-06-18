import React from 'react'

const LANES = [
  'Shanghai→Rotterdam',
  'China→US West Coast',
  'Singapore→Dubai',
  'India→Europe',
  'Asia→ANZ'
]

export default function LaneSelector({ selectedLane, onLaneChange }) {
  return (
    <div className="mb-6">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Trade Lane
      </label>
      <select
        value={selectedLane}
        onChange={e => onLaneChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm
          text-slate-800 shadow-sm focus:outline-none focus:ring-2 cursor-pointer
          appearance-none"
        style={{ '--tw-ring-color': '#185FA5' }}
      >
        {LANES.map(lane => (
          <option key={lane} value={lane}>{lane}</option>
        ))}
      </select>
    </div>
  )
}
