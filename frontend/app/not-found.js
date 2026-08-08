"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, ArrowLeft, Radio, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-4 relative overflow-hidden transition-colors duration-300 selection:bg-blue-600 selection:text-white">
      {/* =========================================================================
          1. Cybernetic Graph Grid Background & Spotlight Effect
         ========================================================================= */}
      {/* 1. Precision Coordinate Graph Grid (High contrast in Light & Dark mode) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.2)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(99,102,241,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.25)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* 2. Single Balanced Vignette Mask (Lets grid show across ~80% of screen before soft fading) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_90%)] pointer-events-none" />
      {/* Pulsing Backlight Ambient Glows */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"
      />

      {/* =========================================================================
          2. Main Floating Holographic Card
         ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card max-w-4xl w-full rounded-3xl p-6 md:p-12 shadow-2xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 border border-[var(--card-border)] overflow-hidden"
      >
        {/* Decorative Top Card Scanner Line */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent pointer-events-none"
        />

        {/* =========================================================================
            3. Left Side: Animated Radar Scanning HUD
           ========================================================================= */}
        <div className="relative w-full md:w-1/2 h-72 md:h-96 flex items-center justify-center">
          {/* Outer Pulsing Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed border-blue-500/30 flex items-center justify-center relative"
          >
            {/* Satellite Node on Orbit */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_#2563eb]" />
          </motion.div>

          {/* Inner Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full border border-indigo-500/20 dark:border-indigo-400/30 border-t-indigo-500 border-l-transparent"
          />

          {/* Scanning Radar Beam Sweeper */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full bg-conic-gradient from-blue-500/20 via-transparent to-transparent pointer-events-none"
          />

          {/* Central Glowing Core Badge */}
          <motion.div
            animate={{ scale: [0.92, 1.05, 0.92] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl flex flex-col items-center justify-center gap-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-blue-500 uppercase">
              Signal Lost
            </span>
          </motion.div>

          {/* Floating Warning Pill */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold font-mono flex items-center gap-1.5 shadow-sm"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>ERROR 0x404</span>
          </motion.div>
        </div>

        {/* =========================================================================
            4. Right Side: Kinetic Typography & Actions
           ========================================================================= */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <div className="space-y-2">
            {/* Animated Big 404 */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400"
            >
              404
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] tracking-wide"
            >
              Out of Signal Range
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed max-w-md"
          >
            The video call route or destination parameters you requested do not
            exist or were disconnected from the AlphaMeet X mesh network.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start"
          >
            <Link href="/home" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Compass className="w-4 h-4" />
                <span>Return to Navigation</span>
              </motion.button>
            </Link>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-[var(--foreground)] bg-[var(--nav-hover)] border border-[var(--card-border)] transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Dashboard</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
