import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHabitsContext } from '../context/HabitsContext'
import HabitCard from './HabitCard'
import MotivationBanner from './MotivationBanner'
import FilterBar from './FilterBar'
import EmptyState from './EmptyState'
import FAB from './FAB'
import HabitModal from './HabitModal'

export default function Dashboard() {
  const { habits, isCompletedToday } = useHabitsContext()
  const [filter, setFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState(null)

  const filtered = habits.filter(h => {
    if (filter === 'done') return isCompletedToday(h)
    if (filter === 'pending') return !isCompletedToday(h)
    return true
  })

  const openAdd = () => {
    setEditingHabit(null)
    setModalOpen(true)
  }

  const openEdit = (habit) => {
    setEditingHabit(habit)
    setModalOpen(true)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 pb-24 font-nunito">
      <MotivationBanner />

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-lg text-gray-900 dark:text-white">
            Today's Habits
          </h2>
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {habits.length} habit{habits.length !== 1 ? 's' : ''}
          </span>
        </div>

        <FilterBar active={filter} onChange={setFilter} />

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <EmptyState key="empty" filter={filter} onAdd={openAdd} />
          ) : (
            <motion.div
              key="list"
              className="flex flex-col gap-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((habit, i) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    index={i}
                    onEdit={openEdit}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FAB onClick={openAdd} />

      <HabitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editHabit={editingHabit}
      />
    </div>

    
  )
}
