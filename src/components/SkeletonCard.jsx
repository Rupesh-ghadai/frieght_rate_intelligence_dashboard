import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-slate-200 rounded w-40" />
        <div className="h-6 bg-slate-200 rounded-full w-20" />
      </div>
      <div className="mb-4">
        <div className="h-3 bg-slate-200 rounded w-16 mb-2" />
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-5/6" />
        </div>
      </div>
      <div className="mb-4">
        <div className="h-3 bg-slate-200 rounded w-20 mb-2" />
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-4/5" />
          <div className="h-3 bg-slate-200 rounded w-11/12" />
        </div>
      </div>
      <div>
        <div className="h-3 bg-slate-200 rounded w-14 mb-2" />
        <div className="h-3 bg-slate-200 rounded w-3/4" />
      </div>
    </div>
  )
}
