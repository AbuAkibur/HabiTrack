import { HabitsProvider } from './context/HabitsContext'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

export default function App() {
  return (
    <HabitsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-nunito transition-colors duration-300">
        <Header />
        <main>
          <Dashboard />
        </main>
      </div>
    </HabitsProvider>
  )
}