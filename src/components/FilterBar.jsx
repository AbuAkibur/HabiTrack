import { motion } from 'framer-motion'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: '⏳ Pending' },
  { id: 'done', label: '✅ Done' },
]

export default function FilterBar({ active, onChange }) {
  return (
    <div className="flex gap-2 mb-4">
      {filters.map(f => (
        <motion.button
          key={f.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(f.id)}
          className={`relative px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
            active === f.id
              ? 'text-white'
              : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {active === f.id && (
            <motion.div
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-brand-500"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{f.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
