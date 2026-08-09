"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Video,
  Calendar,
  KeyRound,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";

// Staggered Container Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

// Sample Recent Meetings Data
const RECENT_MEETINGS = [
  {
    id: "1",
    title: "Project Discussion",
    roomId: "AB001234",
    date: "2 May, 2026 - 10:30 AM",
    participants: 4,
    duration: "32 min",
  },
  {
    id: "2",
    title: "Team Sync",
    roomId: "EFE15678",
    date: "1 May, 2026 - 04:00 PM",
    participants: 6,
    duration: "45 min",
  },
  {
    id: "3",
    title: "Client Call",
    roomId: "LKG90123",
    date: "30 Apr, 2026 - 11:00 AM",
    participants: 3,
    duration: "28 min",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleStartInstant = () => {
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    router.push(`/room/${randomId}/preview`);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 w-full max-w-5xl mx-auto py-2"
    >
      {/* =========================================================================
          1. HEADER SECTION WITH TOP-RIGHT ACTION BUTTON
         ========================================================================= */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <span>Welcome back, Anupam 👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium mt-1">
            Here&apos;s what&apos;s happening today
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartInstant}
          className="px-5 py-3 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 border border-blue-400/30 flex items-center gap-2 text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Create Meeting</span>
        </motion.button>
      </motion.div>

      {/* =========================================================================
          2. THREE QUICK-ACTION CARDS (Instant / Schedule / Join)
         ========================================================================= */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5"
      >
        {/* Start Instant Meeting Card */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={handleStartInstant}
          className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-6 border border-[var(--card-border)] relative overflow-hidden group cursor-pointer shadow-lg"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-500">
              <Video className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-extrabold tracking-tight">
                Start Instant Meeting
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Begin a new meeting instantly
              </p>
            </div>
          </div>
        </motion.div>

        {/* Schedule Meeting Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-6 border border-[var(--card-border)] relative overflow-hidden group cursor-pointer shadow-lg"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Calendar className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-extrabold tracking-tight">
                Schedule Meeting
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Plan a meeting for later
              </p>
            </div>
          </div>
        </motion.div>

        {/* Join with Code Card */}
        <Link href="/home#join-section">
          <motion.div
            whileHover={{ y: -4 }}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-6 border border-[var(--card-border)] relative overflow-hidden group cursor-pointer shadow-lg h-full"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <KeyRound className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h2 className="text-base font-extrabold tracking-tight">
                  Join with Code
                </h2>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Enter code to join meeting
                </p>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* =========================================================================
          3. RECENT MEETINGS SECTION
         ========================================================================= */}
      <motion.div
        variants={itemVariants}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-[var(--card-border)] space-y-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Recent Meetings</h2>
          <Link
            href="#"
            className="text-xs font-semibold text-blue-500 hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Recent Meeting List items */}
        <div className="space-y-3">
          {RECENT_MEETINGS.map((meeting) => (
            <div
              key={meeting.id}
              className="p-4 rounded-2xl bg-[var(--nav-hover)] border border-[var(--card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-blue-500/30"
            >
              {/* Left Side Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-[var(--foreground)] shrink-0">
                  <UserCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{meeting.title}</h3>
                  <p className="text-[11px] text-[var(--text-muted)] font-mono">
                    Room ID: {meeting.roomId}
                  </p>
                </div>
              </div>

              {/* Middle Date Info */}
              <div className="text-xs text-[var(--text-muted)] font-medium">
                {meeting.date}
              </div>

              {/* Right Side Metrics (Participants & Duration) */}
              <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-muted)] shrink-0">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>{meeting.participants}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{meeting.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
