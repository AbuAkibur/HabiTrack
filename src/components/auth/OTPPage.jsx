import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

const DEFAULT_OTP = '12345'
const LEN = 5

export default function OTPPage({ userData, onNavigate }) {
  const { login } = useAuth()
  const [digits, setDigits] = useState(Array(LEN).fill(''))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const refs = useRef([])

  useEffect(() => { refs.current[0]?.focus() }, [])

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[i] = val
    setDigits(next)
    setError('')
    if (val && i < LEN - 1) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LEN)
    if (pasted.length === LEN) {
      setDigits(pasted.split(''))
      refs.current[LEN - 1]?.focus()
    }
    e.preventDefault()
  }

  const handleSubmit = async () => {
    const otp = digits.join('')
    if (otp.length < LEN) { setError('Please enter the full 5-digit OTP.'); return }
    if (otp !== DEFAULT_OTP) { setError('Incorrect OTP. Hint: 12345'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    login({ name: userData?.name || 'Susy', email: userData?.email || 'admin@habitrack.com' })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-nunito flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-10 max-w-md mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="text-5xl mb-4">📬</div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Check your email</h2>
          <p className="text-gray-500 dark:text-gray-400 font-semibold text-sm">
            Enter OTP code we've sent to your email
          </p>
          {userData?.email && (
            <p className="text-brand-500 font-bold text-sm mt-1">{userData.email}</p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {/* OTP boxes */}
          <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <motion.input
                key={i}
                ref={el => refs.current[i] = el}
                type="text" inputMode="numeric" maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                whileFocus={{ scale: 1.08 }}
                className={`w-14 h-14 text-center text-xl font-black rounded-2xl border-2 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
                  d ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-gray-700'
                } focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/30`}
              />
            ))}
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-semibold text-center mb-4 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2">
              {error}
            </motion.p>
          )}

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSubmit} disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-extrabold text-base shadow-lg shadow-brand-500/30 disabled:opacity-70">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                Verifying...
              </span>
            ) : 'Submit'}
          </motion.button>

          <button onClick={() => onNavigate('login')} className="w-full text-center mt-4 text-sm font-semibold text-gray-400 hover:text-brand-500 transition-colors">
            ← Back to Login
          </button>
        </motion.div>
      </div>
    </div>
  )
}
