import { motion } from 'framer-motion'
import { useHabitsContext } from '../context/HabitsContext'

const messages = [
  "Let's crush it today! 💪",
  "Every habit counts. Keep going! 🚀",
  "Consistency is your superpower! ⚡",
  "Small steps, big results! 🌟",
  "You've got this! Stay the course! 🎯",
]

export default function MotivationBanner() {
  const { todayStats, habits } = useHabitsContext()
  const pct = todayStats.total === 0 ? 0 : Math.round((todayStats.completed / todayStats.total) * 100)
  const maxStreak = habits.reduce((m, h) => Math.max(m, h.streak || 0), 0)

  const msg = pct === 100
    ? "All done! You're unstoppable today! 🏆"
    : pct >= 50
    ? "More than halfway there! 🔥"
    : messages[Math.floor(Date.now() / 86400000) % messages.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white p-5 mb-2"
    >
      {/* Background blobs */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-600 mb-0.5 font-semibold">
            {new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="font-extrabold text-lg leading-tight">{msg}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          {/* Circular progress */}
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="5" />
              <motion.circle
                cx="32" cy="32" r="26"
                fill="none" stroke="white" strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - pct / 100) }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-black text-sm">{pct}%</span>
            </div>
          </div>
          <span className="text-white/80 text-xs font-semibold">
            {maxStreak > 0 ? `🔥 ${maxStreak} streak` : 'Start now!'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
