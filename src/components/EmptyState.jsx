import { motion } from "framer-motion";

export default function EmptyState({ filter, onAdd }) {
  const msg =
    filter === "done"
      ? {
          emoji: "😴",
          title: "Nothing completed yet",
          sub: "Check off a habit to see it here!",
        }
      : filter === "pending"
        ? {
            emoji: "🎉",
            title: "All habits done!",
            sub: "You're crushing it today!",
          }
        : {
            emoji: "🌱",
            title: "No habits yet",
            sub: "Add your first habit and start your streak!",
          };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl mb-4"
      >
        {msg.emoji}
      </motion.div>
      <h3 className="font-extrabold text-xl text-gray-800 dark:text-gray-100 mb-1">
        {msg.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{msg.sub}</p>
      {filter === "all" && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="px-6 py-2.5 rounded-full bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/30"
        >
          + Add Habit
        </motion.button>
      )}
    </motion.div>
  );
}
