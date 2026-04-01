import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-nunito flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-10 max-w-md mx-auto w-full">
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => onNavigate('login')}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold mb-8 self-start"
        >
          <ArrowLeft size={18} /> Back to Login
        </motion.button>

        {!sent ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-4xl mb-4">🔑</div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Forgot Password?</h2>
            <p className="text-gray-500 dark:text-gray-400 font-semibold text-sm mb-8">
              Enter your email below, we will send instruction to reset your password
            </p>

            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="your@email.com"
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 font-semibold outline-none focus:border-brand-400 transition mb-4"
            />

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSubmit} disabled={loading || !email}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-extrabold text-base shadow-lg shadow-brand-500/30 disabled:opacity-50">
              {loading ? 'Sending...' : 'Submit'}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Email Sent!</h2>
            <p className="text-gray-500 dark:text-gray-400 font-semibold text-sm mb-8">Check your inbox for password reset instructions.</p>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('login')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-extrabold text-base shadow-lg shadow-brand-500/30">
              Back to Login
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
