import { motion } from 'framer-motion'
import { Home, Activity, Settings } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'progress', label: 'Progress', Icon: Activity },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

export default function BottomNav({ active, onChange }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-t border-gray-100 dark:border-gray-800 font-nunito">
      <div className="max-w-2xl mx-auto flex">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <button key={id} onClick={() => onChange(id)}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 relative">
              {isActive && (
                <motion.div layoutId="tab-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-500 rounded-full" />
              )}
              <Icon size={22} className={isActive ? 'text-brand-500' : 'text-gray-400 dark:text-gray-500'} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[11px] font-bold ${isActive ? 'text-brand-500' : 'text-gray-400 dark:text-gray-500'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
