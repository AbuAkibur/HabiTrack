# 🔥 Habitrack — Build Better Habits

A mobile-first habit tracker built with React + Vite + Tailwind CSS + Framer Motion.

## ✨ Features

- **Daily Habit Tracking** — Check off habits each day
- **Streak System** 🔥 — Auto-calculated streaks, resets on missed days + best streak tracking
- **Weekly Progress Chart** — Visual 7-day bar chart per habit
- **Circular Progress Ring** — Shows weekly completion percentage per habit
- **Add / Edit / Delete Habits** — Full CRUD with emoji icons & color tags
- **Filter View** — All / Pending / Done
- **Motivation Banner** — Dynamic messages + daily completion ring
- **Dark / Light Mode** 🌙☀️ — Persisted in localStorage
- **LocalStorage Persistence** — All data survives refresh
- **Framer Motion Animations** — Smooth, delightful micro-interactions

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## 🏗️ Project Structure

```
src/
├── App.jsx                    # Root component
├── main.jsx                   # Entry point
├── index.css                  # Global styles + Tailwind
├── components/
│   ├── Header.jsx             # Top bar with branding + theme toggle
│   ├── Dashboard.jsx          # Main page layout
│   ├── MotivationBanner.jsx   # Hero stats card
│   ├── HabitCard.jsx          # Individual habit card
│   ├── WeeklyChart.jsx        # 7-day bar chart
│   ├── CircularProgress.jsx   # Animated SVG progress ring
│   ├── HabitModal.jsx         # Add/Edit modal (bottom sheet)
│   ├── FilterBar.jsx          # All/Pending/Done filter tabs
│   ├── FAB.jsx                # Floating action button
│   └── EmptyState.jsx         # Empty state UI
├── context/
│   └── HabitsContext.jsx      # React context provider
├── hooks/
│   └── useHabits.js           # Core state + localStorage logic
└── utils/
    └── colors.js              # Color palette + icon list
```

## 🎨 Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (dark mode via `class`)
- **Framer Motion 11** (animations)
- **Lucide React** (icons)
- **Google Fonts: Nunito**
- **localStorage** (no backend needed)

## 📱 Design

- Mobile-first, fully responsive
- Orange brand color (`#f97316`)
- Soft rounded cards with subtle shadows
- Animated celebration burst on habit completion
- Staggered card entrance animations
