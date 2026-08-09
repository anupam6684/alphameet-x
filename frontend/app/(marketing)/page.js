"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Video,
  Monitor,
  MessageSquare,
  ShieldCheck,
  Mic,
  Camera,
  PhoneOff,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

// =============================================================================
// DATA ARRAYS
// =============================================================================

const PARTICIPANTS = [
  {
    id: 1,
    name: "Anupam Jana (Host)",
    imageSrc: "/images/person1.png",
  },
  {
    id: 2,
    name: "David Park",
    imageSrc: "/images/person4.png",
  },
  {
    id: 3,
    name: "Emily Chen",
    imageSrc: "/images/person3.png",
  },
  {
    id: 4,
    name: "Sarah Miller",
    imageSrc: "/images/person2.png",
  },
];

const FEATURES = [
  {
    id: "hd-video",
    title: "HD Video Quality",
    description:
      "Crystal clear video calls with adaptive bandwidth adjustment.",
    icon: Video,
    colorStyle: "bg-blue-600/15 border-blue-500/30 text-blue-500",
  },
  {
    id: "screen-share",
    title: "Screen Sharing",
    description: "Share your desktop or application window instantly.",
    icon: Monitor,
    colorStyle: "bg-indigo-600/15 border-indigo-500/30 text-indigo-500",
  },
  {
    id: "in-call-chat",
    title: "Chat in Call",
    description: "Real-time group messaging and link sharing during calls.",
    icon: MessageSquare,
    colorStyle: "bg-purple-600/15 border-purple-500/30 text-purple-500",
  },
  {
    id: "secure-private",
    title: "Secure & Private",
    description:
      "End-to-end encrypted rooms to protect your team communications.",
    icon: ShieldCheck,
    colorStyle: "bg-emerald-600/15 border-emerald-500/30 text-emerald-500",
  },
];

const BRAND_LOGOS = ["GOOGLE", "MICROSOFT", "ADOBE", "AMAZON", "SPOTIFY"];

const CONTROLS = [
  { id: "mic", icon: Mic, active: false },
  { id: "cam", icon: Camera, active: false },
  { id: "share", icon: Monitor, active: true },
  { id: "chat", icon: MessageSquare, active: false },
  { id: "end", icon: PhoneOff, isEndCall: true },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* =========================================================================
          BACKGROUND GRAPH GRID & AMBIENT GLOWS
         ========================================================================= */}
      {/* Precision Coordinate Graph Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.2)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(99,102,241,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.25)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:40px_40px] pointer-events-none" />

      {/* Balanced Vignette Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_90%)] pointer-events-none" />

      {/* Pulsing Backlight Ambient Glows */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-blue-600/15 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none"
      />

      {/* =========================================================================
          1. Header Navigation
         ========================================================================= */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[var(--background)]/80 border-b border-[var(--card-border)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Logo showText={true} />

          <div className="flex items-center gap-1.5 sm:gap-3">
            <ThemeToggle />

            <Link
              href="/login"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold glass-card hover:bg-[var(--nav-hover)] transition-all"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 border border-blue-400/30 transition-all whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. Hero Section
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 my-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card text-[11px] sm:text-xs font-semibold text-blue-500"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
              <span>AlphaMeet X Video Engine</span>
            </motion.div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.1]">
              High Quality <br className="hidden xs:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">
                Video Calls for Everyone
              </span>
            </h1>

            <p className="text-xs sm:text-base text-[var(--text-muted)] max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              Connect, collaborate, and communicate face-to-face from anywhere
              in the world with ultra-low latency and crystal-clear sound.
            </p>

            {/* Responsive CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 w-full">
              <Link href="/home" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 border border-blue-400/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Start Meeting</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>

              <Link href="/room/ALPHA-77/preview" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-[var(--foreground)] glass-card hover:bg-[var(--nav-hover)] transition-all text-sm"
                >
                  Join Meeting
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Video Preview Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative w-full pt-4 sm:pt-0"
          >
            {/* HD Badge */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1 sm:-top-4 left-4 sm:left-6 z-30 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-blue-600 text-white font-extrabold text-[10px] sm:text-xs shadow-lg shadow-blue-600/40 border border-blue-400/40 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>HD 1080p</span>
            </motion.div>

            {/* Tablet Mockup Container */}
            <div className="glass-card rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-2xl border border-[var(--card-border)] relative overflow-hidden bg-slate-950">
              {/* Participant Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 aspect-video rounded-xl sm:rounded-2xl overflow-hidden relative">
                {PARTICIPANTS.map((person) => (
                  <div
                    key={person.id}
                    className="relative rounded-lg sm:rounded-xl bg-slate-900 overflow-hidden border border-white/10 group"
                  >
                    <Image
                      src={person.imageSrc}
                      alt={person.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 35vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                    <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/60 backdrop-blur-md text-[9px] sm:text-xs text-white font-medium z-10 truncate max-w-[85%]">
                      {person.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Control Bar Buttons */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-3 pt-2.5 sm:pt-3.5">
                {CONTROLS.map((btn) => {
                  const Icon = btn.icon;

                  // End Call Button
                  if (btn.isEndCall) {
                    return (
                      <div
                        key={btn.id}
                        className="p-2 sm:p-2.5 rounded-full bg-red-600 text-white text-xs shadow-lg shadow-red-600/30 cursor-pointer hover:bg-red-500 transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    );
                  }

                  // Standard Control Buttons
                  return (
                    <div
                      key={btn.id}
                      className={`p-2 sm:p-2.5 rounded-full text-xs cursor-pointer transition-all duration-200 ${
                        btn.active
                          ? "bg-blue-600 text-white dark:bg-blue-600/20 dark:text-blue-400 shadow-md shadow-blue-600/20"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 border border-slate-300/50 dark:border-white/5"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          3. Feature Cards Grid
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl space-y-2.5 sm:space-y-3"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center ${item.colorStyle}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. Brand Logos & Footer
         ========================================================================= */}
      <footer className="w-full border-t border-[var(--card-border)] py-6 sm:py-8 text-center space-y-4 relative z-10 px-4">
        <p className="text-[11px] sm:text-xs text-[var(--text-muted)] font-medium">
          Trusted by modern engineering and product teams around the world
        </p>

        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-60 text-[11px] sm:text-xs font-bold font-mono tracking-wider">
          {BRAND_LOGOS.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>

        <p className="text-[10px] text-[var(--text-muted)] pt-2 sm:pt-4">
          &copy; 2026 AlphaMeet X Communications. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
