"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl bg-[var(--nav-hover)] border border-[var(--card-border)] text-[var(--foreground)] transition-all duration-200 flex items-center justify-center ${className}`}
      aria-label="Toggle Dark/Light Mode"
    >
      <motion.div
        key={isDarkMode ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        {isDarkMode ? (
          <Moon className="w-5 h-5 text-indigo-400" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
