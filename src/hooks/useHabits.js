import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'habitrack_habits'
const THEME_KEY = 'habitrack_theme'

const TODAY = () => new Date().toISOString().split('T')[0]

export function useHabits() {
  const [habits, setHabits] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : defaultHabits()
    } catch {
      return defaultHabits()
    }
  })

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(THEME_KEY) === 'dark'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const addHabit = useCallback((name, icon, color) => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      icon,
      color,
      createdAt: TODAY(),
      completions: {},
      streak: 0,
      bestStreak: 0,
    }
    setHabits(prev => [...prev, newHabit])
  }, [])

  const editHabit = useCallback((id, updates) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h))
  }, [])

  const deleteHabit = useCallback((id) => {
    setHabits(prev => prev.filter(h => h.id !== id))
  }, [])

  const toggleHabit = useCallback((id) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h
      const today = TODAY()
      const completions = { ...h.completions }
      const wasCompleted = completions[today]

      if (wasCompleted) {
        delete completions[today]
      } else {
        completions[today] = true
      }

      const streak = calcStreak(completions)
      const bestStreak = Math.max(h.bestStreak || 0, streak)
      return { ...h, completions, streak, bestStreak }
    }))
  }, [])

  const isCompletedToday = useCallback((habit) => {
    return !!habit.completions[TODAY()]
  }, [])

  const getWeeklyData = useCallback((habit) => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().split('T')[0]
      days.push({
        date: key,
        label: d.toLocaleDateString('en', { weekday: 'short' }),
        completed: !!habit.completions[key],
        isToday: i === 0,
      })
    }
    return days
  }, [])

  const todayStats = {
    total: habits.length,
    completed: habits.filter(h => h.completions[TODAY()]).length,
  }

  return {
    habits,
    darkMode,
    setDarkMode,
    addHabit,
    editHabit,
    deleteHabit,
    toggleHabit,
    isCompletedToday,
    getWeeklyData,
    todayStats,
  }
}

function calcStreak(completions) {
  let streak = 0
  const d = new Date()
  while (true) {
    const key = d.toISOString().split('T')[0]
    if (completions[key]) {
      streak++
      d.setDate(d.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

function defaultHabits() {
  const today = TODAY()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yd = yesterday.toISOString().split('T')[0]

  return [
    {
      id: '1',
      name: 'Morning Run',
      icon: '🏃',
      color: 'orange',
      createdAt: yd,
      completions: { [yd]: true, [today]: true },
      streak: 2,
      bestStreak: 5,
    },
    {
      id: '2',
      name: 'Read 30 mins',
      icon: '📖',
      color: 'green',
      createdAt: yd,
      completions: { [yd]: true },
      streak: 1,
      bestStreak: 3,
    },
    {
      id: '3',
      name: 'Meditate',
      icon: '🧘',
      color: 'purple',
      createdAt: yd,
      completions: {},
      streak: 0,
      bestStreak: 4,
    },
  ]
}