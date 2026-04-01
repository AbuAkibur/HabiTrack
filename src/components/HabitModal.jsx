import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useHabitsContext } from '../context/HabitsContext'
import { COLORS, ICONS } from '../utils/colors'

export default function HabitModal({ isOpen, onClose, editHabit }) {
  const { addHabit, editHabit: updateHabit } = useHabitsContext()

  const [name, setName] = useState('')
  const [icon, setIcon] = useState('⭐')
  const [color, setColor] = useState('orange')
  const [error, setError] = useState('')

  useEffect(() => {
    if (editHabit) {
      setName(editHabit.name)
      setIcon(editHabit.icon)
      setColor(editHabit.color)
    } else {
      setName('')
      setIcon('⭐')
      setColor('orange')
    }
    setError('')
  }, [editHabit, isOpen])

  const handleSave = () => {
    const trimmed = name.trim()
    if (!trimmed) { setError('Please enter a habit name.'); return }
    if (trimmed.length > 40) { setError('Name is too long (max 40 chars).'); return }

    if (editHabit) {
      updateHabit(editHabit.id, { name: trimmed, icon, color })
    } else {
      addHabit(trimmed, icon, color)
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-50 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-extrabold text-xl text-gray-900 dark:text-white">
                {editHabit ? 'Edit Habit' : 'New Habit'}
              </h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Name input */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                Habit Name
              </label>
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700 focus-within:border-brand-400 transition-colors">
                <span className="text-2xl">{icon}</span>
                <input
                  autoFocus
                  value={name}
                  onChange={e => { setName(e.target.value); setError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleSave()}
                  maxLength={40}
                  placeholder="e.g. Morning Run"
                  className="flex-1 bg-transparent text-gray-900 dark:text-white font-semibold placeholder-gray-400 outline-none text-base"
                />
                <span className="text-xs text-gray-400">{name.length}/40</span>
              </div>
              {error && <p className="text-red-500 text-xs mt-1 font-semibold">{error}</p>}
            </div>

            {/* Icon picker */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-1.5">Icon</label>
              <div className="flex flex-wrap gap-2">
                {ICONS.map(ic => (
                  <motion.button
                    key={ic}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setIcon(ic)}
                    className={`w-10 h-10 text-xl rounded-xl flex items-center justify-center transition-all ${
                      icon === ic
                        ? 'bg-brand-100 dark:bg-brand-900/40 ring-2 ring-brand-400 scale-110'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {ic}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-1.5">Color</label>
              <div className="flex gap-3">
                {COLORS.map(c => (
                  <motion.button
                    key={c.id}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setColor(c.id)}
                    className={`w-8 h-8 rounded-full ${c.dot} transition-all ${
                      color === c.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-125' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Save button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-extrabold text-base shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-shadow"
            >
              {editHabit ? 'Save Changes' : '+ Add Habit'}
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
