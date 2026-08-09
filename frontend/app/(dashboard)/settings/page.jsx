"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Moon, Sun, Monitor, Bell } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider"; // Adjust path if needed

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SettingsPage() {
  const { theme, setTheme, mounted } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  const handleTestSpeaker = () => {
    setIsPlayingTest(true);
    setTimeout(() => {
      setIsPlayingTest(false);
    }, 2000);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-4xl space-y-6 py-2"
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="text-sm font-medium text-[var(--text-muted)]">
          Customize your preferences
        </p>
      </motion.div>

      {/* MAIN SETTINGS CARD */}
      <motion.div
        variants={itemVariants}
        className="glass-card space-y-8 rounded-3xl border border-[var(--card-border)] p-6 shadow-xl sm:p-8"
      >
        {/* AUDIO & VIDEO */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold tracking-tight text-[var(--foreground)]">
            Audio &amp; Video
          </h2>

          <div className="space-y-3.5">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <label className="w-32 text-xs font-semibold text-[var(--text-muted)]">
                Camera
              </label>
              <select className="input-theme w-full max-w-md cursor-pointer rounded-xl px-4 py-2.5 text-xs font-medium outline-none">
                <option>Logitech C920 Pro</option>
                <option>Integrated Webcam (HD)</option>
              </select>
            </div>

            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <label className="w-32 text-xs font-semibold text-[var(--text-muted)]">
                Microphone
              </label>
              <select className="input-theme w-full max-w-md cursor-pointer rounded-xl px-4 py-2.5 text-xs font-medium outline-none">
                <option>Blue Yeti</option>
                <option>Default Microphone</option>
              </select>
            </div>

            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <label className="w-32 text-xs font-semibold text-[var(--text-muted)]">
                Speaker
              </label>
              <select className="input-theme w-full max-w-md cursor-pointer rounded-xl px-4 py-2.5 text-xs font-medium outline-none">
                <option>Default Speaker</option>
                <option>External Headphones</option>
              </select>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleTestSpeaker}
                className="flex cursor-pointer items-center gap-1.5 text-xs font-bold text-blue-500 transition-colors hover:text-blue-400"
              >
                <Volume2
                  className={`h-3.5 w-3.5 ${
                    isPlayingTest ? "animate-bounce" : ""
                  }`}
                />
                <span>
                  {isPlayingTest ? "Playing Sound..." : "Test Speaker"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--card-border)]" />

        {/* GENERAL PREFERENCES */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold tracking-tight text-[var(--foreground)]">
            General
          </h2>

          <div className="space-y-4">
            {/* THEME SELECTION PILLS */}
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <label className="w-32 text-xs font-semibold text-[var(--text-muted)]">
                Theme
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {/* LIGHT */}
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                    mounted && theme === "light"
                      ? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border-[var(--card-border)] text-[var(--text-muted)] hover:bg-[var(--nav-hover)]"
                  }`}
                >
                  <Sun className="h-3.5 w-3.5" />
                  <span>Light</span>
                </button>

                {/* DARK */}
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                    mounted && theme === "dark"
                      ? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border-[var(--card-border)] text-[var(--text-muted)] hover:bg-[var(--nav-hover)]"
                  }`}
                >
                  <Moon className="h-3.5 w-3.5" />
                  <span>Dark</span>
                </button>

                {/* SYSTEM */}
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                    mounted && theme === "system"
                      ? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border-[var(--card-border)] text-[var(--text-muted)] hover:bg-[var(--nav-hover)]"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                  <span>System</span>
                </button>
              </div>
            </div>

            {/* LANGUAGE */}
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <label className="w-32 text-xs font-semibold text-[var(--text-muted)]">
                Language
              </label>
              <select className="input-theme w-full max-w-md cursor-pointer rounded-xl px-4 py-2.5 text-xs font-medium outline-none">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Hindi</option>
              </select>
            </div>

            {/* NOTIFICATIONS */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="space-y-0.5">
                <label className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
                  <Bell className="h-3.5 w-3.5 text-blue-400" />
                  <span>Notifications</span>
                </label>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Enable notifications for upcoming call invites.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNotifications((prev) => !prev)}
                aria-label="Toggle notifications"
                aria-pressed={notifications}
                className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                  notifications ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    notifications ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
