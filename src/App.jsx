import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import { HabitsProvider } from './context/HabitsContext'

import LoginPage from './components/auth/LoginPage'
import SignUpPage from './components/auth/SignUpPage'
import OTPPage from './components/auth/OTPPage'
import ForgotPasswordPage from './components/auth/ForgotPasswordPage'

import Header from './components/Header'
import Dashboard from './components/Dashboard'
import ProgressPage from './components/ProgressPage'
import SettingsPage from './components/settings/SettingsPage'
import BottomNav from './components/BottomNav'

// ─── Auth router (shown when not logged in) ───────────────────────
function AuthRouter() {
  const [screen, setScreen] = useState('login') // login | signup | otp | forgot
  const [otpData, setOtpData] = useState(null)

  const navigate = (to, data = null) => {
    if (to === 'otp' && data) setOtpData(data)
    setScreen(to)
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={screen}
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.22 }}>
        {screen === 'login'  && <LoginPage onNavigate={navigate} />}
        {screen === 'signup' && <SignUpPage onNavigate={navigate} />}
        {screen === 'otp'    && <OTPPage userData={otpData} onNavigate={navigate} />}
        {screen === 'forgot' && <ForgotPasswordPage onNavigate={navigate} />}
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Main app (shown when logged in) ──────────────────────────────
function MainApp() {
  const [tab, setTab] = useState('home')

  return (
    <HabitsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-nunito transition-colors duration-300">
        {/* Header only on home + progress */}
        {tab !== 'settings' && <Header />}

        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}>
            {tab === 'home'     && <Dashboard />}
            {tab === 'progress' && <ProgressPage />}
            {tab === 'settings' && <SettingsPage />}
          </motion.div>
        </AnimatePresence>

        <BottomNav active={tab} onChange={setTab} />
      </div>
    </HabitsProvider>
  )
}

// ─── Root: decides auth vs app ─────────────────────────────────────
function Root() {
  const { user } = useAuth()
  return user ? <MainApp /> : <AuthRouter />
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  )
}
