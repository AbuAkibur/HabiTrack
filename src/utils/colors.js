export const COLORS = [
  { id: 'orange', label: 'Orange', bg: 'bg-orange-100', bgDark: 'dark:bg-orange-900/30', text: 'text-orange-600', border: 'border-orange-300', ring: 'ring-orange-400', dot: 'bg-orange-500', hex: '#f97316' },
  { id: 'green',  label: 'Green',  bg: 'bg-green-100',  bgDark: 'dark:bg-green-900/30',  text: 'text-green-600',  border: 'border-green-300',  ring: 'ring-green-400',  dot: 'bg-green-500',  hex: '#22c55e' },
  { id: 'blue',   label: 'Blue',   bg: 'bg-blue-100',   bgDark: 'dark:bg-blue-900/30',   text: 'text-blue-600',   border: 'border-blue-300',   ring: 'ring-blue-400',   dot: 'bg-blue-500',   hex: '#3b82f6' },
  { id: 'purple', label: 'Purple', bg: 'bg-purple-100', bgDark: 'dark:bg-purple-900/30', text: 'text-purple-600', border: 'border-purple-300', ring: 'ring-purple-400', dot: 'bg-purple-500', hex: '#a855f7' },
  { id: 'pink',   label: 'Pink',   bg: 'bg-pink-100',   bgDark: 'dark:bg-pink-900/30',   text: 'text-pink-600',   border: 'border-pink-300',   ring: 'ring-pink-400',   dot: 'bg-pink-500',   hex: '#ec4899' },
  { id: 'teal',   label: 'Teal',   bg: 'bg-teal-100',   bgDark: 'dark:bg-teal-900/30',   text: 'text-teal-600',   border: 'border-teal-300',   ring: 'ring-teal-400',   dot: 'bg-teal-500',   hex: '#14b8a6' },
]

export function getColor(id) {
  return COLORS.find(c => c.id === id) || COLORS[0]
}

export const ICONS = ['🏃','📖','🧘','💪','🍎','💧','🎯','✍️','🎨','🎸','🌿','🛌','🧹','🧠','💊','🚴','🏊','🥗','🙏','💻','📝','🌞','🔥','⭐']