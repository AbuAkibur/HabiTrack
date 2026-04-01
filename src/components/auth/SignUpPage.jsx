import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function SignUpPage({ onNavigate }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSignUp = async () => {
    setError('')
    if (!form.name || !form.email || !form.password || !form.confirm) { setError('Please fill in all fields.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 5) { setError('Password must be at least 5 characters.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    onNavigate('otp', { email: form.email, name: form.name })
  }

  const fields = [
    { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
    { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
    { key: 'confirm', label: 'Password Confirmation', type: 'password', placeholder: '••••••••' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-nunito flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-10 max-w-md mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Sign Up</h1>
            <button onClick={() => onNavigate('login')} className="flex items-center gap-1 text-brand-500 font-bold text-sm">
              Log In <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-1.5">{f.label}</label>
              <input
                type={f.type} value={form[f.key]} onChange={set(f.key)}
                placeholder={f.placeholder}
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 font-semibold outline-none focus:border-brand-400 transition"
              />
            </div>
          ))}

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm font-semibold bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2">
              {error}
            </motion.p>
          )}

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSignUp} disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-extrabold text-base shadow-lg shadow-brand-500/30 disabled:opacity-70 mt-2">
            {loading ? 'Creating account...' : 'Sign Up'}
          </motion.button>

          <div className="text-center text-sm text-gray-400 font-semibold">Or sign up with:</div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
