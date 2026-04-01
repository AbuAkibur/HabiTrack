import { motion } from 'framer-motion'
import { useHabitsContext } from '../context/HabitsContext'
import { getColor } from '../utils/colors'

export default function WeeklyChart({ habit }) {
  const { getWeeklyData } = useHabitsContext()
  const days = getWeeklyData(habit)
  const color = getColor(habit.color)
  const completedCount = days.filter(d => d.completed).length

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">This week</span>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{completedCount}/7 days</span>
      </div>
      <div className="flex gap-1 items-end">
        {days.map((day, i) => (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: 'easeOut' }}
              style={{ transformOrigin: 'bottom' }}
              className={`w-full rounded-t-md ${
                day.completed
                  ? color.dot
                  : 'bg-gray-200 dark:bg-gray-700'
              } ${day.isToday ? 'ring-2 ring-offset-1 ' + color.ring : ''}`}
              style={{
                height: day.completed ? '24px' : '12px',
                transformOrigin: 'bottom',
                transition: 'height 0.3s ease',
              }}
            />
            <span className={`text-[10px] font-bold ${
              day.isToday ? color.text : 'text-gray-400 dark:text-gray-500'
            }`}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
