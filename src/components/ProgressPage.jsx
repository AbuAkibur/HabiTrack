import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Check, X } from 'lucide-react'
import { useHabitsContext } from '../context/HabitsContext'
import { getColor } from '../utils/colors'

export default function ProgressPage() {
  const { habits, getWeeklyData } = useHabitsContext()
  const [period, setPeriod] = useState('This Month')

  const goalsData = habits.map(h => {
    const days = getWeeklyData(h)
    const completed = days.filter(d => d.completed).length
    const pct = Math.round((completed / 7) * 100)
    const achieved = pct === 100
    return { ...h, completed, total: 7, pct, achieved }
  })

  const achievedCount = goalsData.filter(g => g.achieved).length
  const totalCount = goalsData.length
  const overallPct = totalCount === 0 ? 0 : Math.round((achievedCount / totalCount) * 100)

  const r = 80, circ = 2 * Math.PI * r

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-nunito pb-24">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-gray-900 dark:text-white mb-1">Progress</motion.h1>

        {/* Progress Report header */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-bold text-gray-700 dark:text-gray-300">Progress Report</span>
          <button className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm">
            {period} <ChevronDown size={14} />
          </button>
        </div>

        {/* Goals card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-gray-900 dark:text-white">Your Goals</h2>
            <span className="text-brand-500 font-bold text-sm">See all</span>
          </div>

          {/* Donut */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
                <circle cx="100" cy="100" r={r} fill="none" stroke="#f3f4f6" strokeWidth="18" className="dark:stroke-gray-700" />
                <motion.circle cx="100" cy="100" r={r} fill="none" stroke="#f97316" strokeWidth="18" strokeLinecap="round"
                  strokeDasharray={circ}
                  initial={{ strokeDashoffset: circ }}
                  animate={{ strokeDashoffset: circ * (1 - overallPct / 100) }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-brand-500">{overallPct}%</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-1 mb-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-500">
              <Check size={14} className="text-brand-500" />
              {achievedCount} Habits goal has achieved
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
              <X size={14} /> {totalCount - achievedCount} Habits goal hasn't achieved
            </div>
          </div>

          {/* Goals list */}
          <div className="space-y-3">
            {goalsData.length === 0 && (
              <p className="text-center text-gray-400 font-semibold py-4">No habits yet. Add some from Home!</p>
            )}
            {goalsData.map((g, i) => {
              const color = getColor(g.color)
              return (
                <motion.div key={g.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-3">
                  {/* Circle pct */}
                  <div className="relative w-12 h-12 shrink-0">
                    <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
                      <circle cx="24" cy="24" r="19" fill="none" strokeWidth="4" stroke="#f3f4f6" className="dark:stroke-gray-700" />
                      <motion.circle cx="24" cy="24" r="19" fill="none" strokeWidth="4"
                        stroke={g.achieved ? '#22c55e' : '#9ca3af'}
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 19}
                        initial={{ strokeDashoffset: 2 * Math.PI * 19 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 19 * (1 - g.pct / 100) }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-black text-gray-700 dark:text-gray-200">{g.pct}%</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-gray-800 dark:text-gray-100 truncate">{g.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        g.achieved ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'text-gray-400'
                      }`}>
                        {g.achieved ? 'Achieved' : 'Unachieved'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">{g.completed} from {g.total} days target</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {goalsData.length > 3 && (
            <button className="mt-4 w-full text-center text-brand-500 font-bold text-sm">See All</button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
