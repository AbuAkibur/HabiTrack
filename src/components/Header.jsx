import { motion } from 'framer-motion'
import { Sun, Moon, Flame } from 'lucide-react'
import { useHabitsContext } from '../context/HabitsContext'

export default function Header() {
  const { darkMode, setDarkMode, todayStats } = useHabitsContext()

  const pct = todayStats.total === 0 ? 0 : Math.round((todayStats.completed / todayStats.total) * 100)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 glass border-b border-orange-100 dark:border-gray-800"
    >
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            className="text-2xl"
          >
            🔥
          </motion.div>
          <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white">
            Habi<span className="text-brand-500">track</span>
          </span>
        </div>

        {/* Center stat */}
        {todayStats.total > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="hidden sm:flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 rounded-full px-4 py-1.5"
          >
            <div className="relative w-5 h-5">
              <svg className="w-5 h-5 -rotate-90" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" fill="none" stroke="#fed7aa" strokeWidth="2.5" />
                <circle
                  cx="10" cy="10" r="8" fill="none"
                  stroke="#f97316" strokeWidth="2.5"
                  strokeDasharray={`${2 * Math.PI * 8}`}
                  strokeDashoffset={`${2 * Math.PI * 8 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
            </div>
            <span className="text-sm font-700 text-brand-600 dark:text-brand-400 font-bold">
              {todayStats.completed}/{todayStats.total} today
            </span>
          </motion.div>
        )}

        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
      </div>
    </motion.header>
  )
}
