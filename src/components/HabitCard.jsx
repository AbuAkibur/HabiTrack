import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useHabitsContext } from "../context/HabitsContext";
import { getColor } from "../utils/colors";
import CircularProgress from "./CircularProgress";
import WeeklyChart from "./WeeklyChart";

export default function HabitCard({ habit, onEdit, index }) {
  const { toggleHabit, deleteHabit, isCompletedToday, getWeeklyData } =
    useHabitsContext();

  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const color = getColor(habit.color);
  const completed = isCompletedToday(habit);
  const days = getWeeklyData(habit);
  const weeklyPct = Math.round(
    (days.filter((d) => d.completed).length / 7) * 100,
  );

  const handleToggle = () => {
    if (!completed) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 600);
    }
    toggleHabit(habit.id);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: "easeOut" }}
      className={`rounded-2xl p-4 border ${
        completed
          ? `${color.bg} ${color.bgDark} border-transparent`
          : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
      } card-shadow dark:card-shadow-dark relative overflow-visible ${menuOpen ? "z-50" : ""}`}
    >
      {/* Celebration burst */}
      <AnimatePresence>
        {justCompleted && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 rounded-2xl ${color.bg} pointer-events-none`}
          />
        )}
      </AnimatePresence>

      <div className="flex items-start gap-3">
        {/* Icon + progress ring */}
        <div
          className="relative shrink-0 cursor-pointer"
          onClick={() => setExpanded((e) => !e)}
        >
          <CircularProgress
            percentage={weeklyPct}
            color={color.hex}
            size={52}
            strokeWidth={3.5}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xl">
            {habit.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3
              className={`font-bold text-base truncate ${
                completed ? color.text : "text-gray-800 dark:text-gray-100"
              }`}
            >
              {habit.name}
            </h3>

            {/* Three Dots Menu */}
            <div className="relative shrink-0 z-10">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <MoreVertical size={18} />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 z-[300] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 w-52 py-1 overflow-hidden"
                    onMouseLeave={closeMenu}
                  >
                    <button
                      onClick={() => {
                        closeMenu();
                        onEdit(habit);
                      }}
                      className="flex items-center gap-3 w-full px-6 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors"
                    >
                      <Pencil size={16} /> Edit Habit
                    </button>
                    <button
                      onClick={() => {
                        closeMenu();
                        deleteHabit(habit.id);
                      }}
                      className="flex items-center gap-3 w-full px-6 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 size={16} /> Delete Habit
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <motion.span
                key={habit.streak}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="text-sm"
              >
                🔥
              </motion.span>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                {habit.streak} day streak
              </span>
            </div>
            {habit.bestStreak > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Best: {habit.bestStreak}
              </span>
            )}
          </div>
        </div>

        {/* Check Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleToggle}
          className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${
            completed
              ? `${color.dot} text-white shadow-md`
              : "border-2 border-gray-200 dark:border-gray-700 text-transparent hover:border-orange-300"
          }`}
        >
          <AnimatePresence mode="wait">
            {completed ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Check size={18} strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Weekly Chart Toggle */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-2 w-full flex items-center justify-center gap-1 text-xs font-semibold text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <WeeklyChart habit={habit} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
