import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function FAB({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xl shadow-brand-500/40 flex items-center justify-center hover:shadow-brand-500/60 transition-shadow"
    >
      <Plus size={26} strokeWidth={2.5} />
    </motion.button>
  )
}
