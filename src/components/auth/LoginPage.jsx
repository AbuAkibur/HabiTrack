import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ChevronRight } from 'lucide-react'

const DEFAULT_EMAIL = 'admin@habitrack.com'
const DEFAULT_PASSWORD = '12345'

export default function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }

    if (email.trim() === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      setLoading(true)
      await new Promise(r => setTimeout(r, 700))
      setLoading(false)
      onNavigate('otp', { email: email.trim(), name: 'Susy' })
    } else {
      setError('Invalid credentials. Use admin@habitrack.com / 12345')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-nunito flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-10 max-w-md mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Log In</h1>
            <button onClick={() => onNavigate('signup')} className="flex items-center gap-1 text-brand-500 font-bold text-sm">
              Sign Up <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-1.5">Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="admin@habitrack.com"
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 font-semibold outline-none focus:border-brand-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••"
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pr-12 text-gray-900 dark:text-white placeholder-gray-400 font-semibold outline-none focus:border-brand-400 transition"
              />
              <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => setRemember(r => !r)}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${remember ? 'bg-brand-500 border-brand-500' : 'border-gray-300 dark:border-gray-600'}`}>
                {remember && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
            <button onClick={() => onNavigate('forgot')} className="text-sm font-bold text-brand-500">Forgot Password?</button>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm font-semibold bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2">
              {error}
            </motion.p>
          )}

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleLogin} disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-extrabold text-base shadow-lg shadow-brand-500/30 disabled:opacity-70 mt-2">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                Logging in...
              </span>
            ) : 'Log In'}
          </motion.button>

          <div className="text-center text-sm text-gray-400 font-semibold">Or log in with:</div>
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
