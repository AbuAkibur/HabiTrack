import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, User, FileText, Shield, Info, LogOut, X, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function AccountModal({ user, onClose, onUpdate }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirm: '',
  })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleUpdate = () => {
    setError('')
    if (!form.name || !form.email) { setError('Name and email are required.'); return }
    if (form.password && form.password !== form.confirm) { setError('Passwords do not match.'); return }
    onUpdate({ name: form.name, email: form.email })
    setSuccess(true)
    setTimeout(() => { setSuccess(false); onClose() }, 1200)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-4 pb-4 sm:pb-0">
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Account</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500"><X size={18} /></button>
        </div>

        <div className="space-y-4">
          {[
            { key: 'name', label: 'Name', type: 'text', icon: null },
            { key: 'email', label: 'Email', type: 'email', icon: null },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
              <input type={f.type} value={form[f.key]} onChange={set(f.key)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-semibold outline-none focus:border-brand-400 transition" />
            </div>
          ))}

          {/* Password */}
          {[
            { key: 'password', label: 'Password', show: showPass, toggle: () => setShowPass(s => !s) },
            { key: 'confirm', label: 'Password Confirmation', show: showConfirm, toggle: () => setShowConfirm(s => !s) },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
              <div className="relative">
                <input type={f.show ? 'text' : 'password'} value={form[f.key]} onChange={set(f.key)} placeholder="••••••••••"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pr-10 text-gray-900 dark:text-white font-semibold outline-none focus:border-brand-400 transition" />
                <button type="button" onClick={f.toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {f.show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}

          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleUpdate}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-extrabold shadow-lg shadow-brand-500/30">
            {success ? '✓ Updated!' : 'Update'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function InfoModal({ title, content, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-4 pb-4 sm:pb-0">
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 max-h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500"><X size={18} /></button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-semibold leading-relaxed text-sm">{content}</p>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onClose}
          className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-extrabold">
          Got it
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth()
  const [modal, setModal] = useState(null) // 'account' | 'terms' | 'policy' | 'about'

  const menuItems = [
    { id: 'account', label: 'Account', icon: User, color: 'text-brand-500' },
    { id: 'terms', label: 'Term and Condition', icon: FileText, color: 'text-blue-500' },
    { id: 'policy', label: 'Policy', icon: Shield, color: 'text-green-500' },
    { id: 'about', label: 'About App', icon: Info, color: 'text-purple-500' },
  ]

  const infoContent = {
    terms: 'By using Habitrack, you agree to use this app responsibly for personal habit tracking. We reserve the right to update these terms at any time. Continued use of the app constitutes acceptance of any changes.',
    policy: 'Habitrack stores all your data locally on your device. We do not collect, share, or sell your personal information to third parties. Your habits and progress are private and belong to you.',
    about: 'Habitrack v1.0.0\nBuild Better Habits, One Day at a Time.\n\nA beautiful, minimal habit tracker built with React, Tailwind CSS, and Framer Motion. Track your daily habits, maintain streaks, and visualize your progress over time.',
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-nunito">
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-24">
        {/* Header */}
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-gray-900 dark:text-white mb-6">
          Setting
        </motion.h1>

        {/* User card */}
        {user && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 mb-4 flex items-center gap-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-black text-xl">
              {user.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <div>
              <p className="font-extrabold text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-sm text-gray-400 font-semibold">{user.email}</p>
            </div>
          </motion.div>
        )}

        {/* Menu */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 mb-4">
          {menuItems.map((item, i) => (
            <motion.button key={item.id} whileTap={{ scale: 0.98 }} onClick={() => setModal(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${i < menuItems.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
              <div className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${item.color}`}>
                <item.icon size={16} />
              </div>
              <span className="flex-1 font-bold text-gray-800 dark:text-gray-100">{item.label}</span>
              <ChevronRight size={18} className="text-gray-400" />
            </motion.button>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={logout}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-500 font-extrabold border border-red-100 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
          <LogOut size={18} /> Log Out
        </motion.button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modal === 'account' && (
          <AccountModal user={user} onClose={() => setModal(null)} onUpdate={updateUser} />
        )}
        {['terms', 'policy', 'about'].includes(modal) && (
          <InfoModal
            title={menuItems.find(m => m.id === modal)?.label}
            content={infoContent[modal]}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
