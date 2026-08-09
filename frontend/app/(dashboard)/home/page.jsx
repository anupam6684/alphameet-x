"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Video,
  Users,
  Keyboard,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";

// Staggered Container Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomePage() {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState("");

  const handleCreateMeeting = () => {
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    router.push(`/room/${randomId}/preview`);
  };

  const handleJoinMeeting = (e) => {
    e.preventDefault();
    if (meetingCode.trim()) {
      router.push(`/room/${meetingCode.trim().toUpperCase()}/preview`);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 w-full max-w-5xl mx-auto py-6"
    >
      {/* Welcome Title Banner */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center justify-center gap-2">
          <span>Welcome 👋</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] font-medium">
          Start or join a meeting in seconds
        </p>
      </motion.div>

      {/* Primary Action Cards (Create vs Join Choice) */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
      >
        {/* Create New Meeting Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-3xl p-8 flex flex-col items-center text-center justify-between space-y-6 border border-[var(--card-border)] relative overflow-hidden group shadow-xl"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all pointer-events-none" />

          <div className="space-y-4 flex flex-col items-center">
            {/* Animated Circular Icon Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-inner"
            >
              <Video className="w-8 h-8" />
            </motion.div>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold tracking-tight">
                Create New Meeting
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Start an instant meeting and invite others
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateMeeting}
            className="w-full py-3.5 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 border border-blue-400/30 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Meeting</span>
          </motion.button>
        </motion.div>

        {/* Join Meeting Quick Focus Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-3xl p-8 flex flex-col items-center text-center justify-between space-y-6 border border-[var(--card-border)] relative overflow-hidden group shadow-xl"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl group-hover:bg-emerald-600/20 transition-all pointer-events-none" />

          <div className="space-y-4 flex flex-col items-center">
            {/* Animated Circular Icon Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner"
            >
              <Users className="w-8 h-8" />
            </motion.div>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold tracking-tight">
                Join Meeting
              </h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Enter meeting code to join a meeting
              </p>
            </div>
          </div>

          <a href="#join-section" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-2xl font-bold text-[var(--foreground)] bg-[var(--nav-hover)] hover:bg-[var(--card-border)] border border-[var(--card-border)] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span>Join Meeting</span>
            </motion.button>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Section: Dedicated Join Code Input Bar */}
      <motion.div
        id="join-section"
        variants={itemVariants}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-[var(--card-border)] space-y-4 shadow-xl w-full"
      >
        <div className="flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-blue-500" />
          <h3 className="text-base sm:text-lg font-bold tracking-tight">
            Join Meeting with Code
          </h3>
        </div>

        <form
          onSubmit={handleJoinMeeting}
          className="flex flex-col sm:flex-row gap-3 w-full"
        >
          <input
            type="text"
            placeholder="Enter meeting code"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            className="flex-1 px-4 py-3.5 rounded-2xl input-theme text-sm uppercase font-mono font-medium tracking-wider"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!meetingCode.trim()}
            className="px-8 py-3.5 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25 border border-blue-400/30 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Join</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        {/* Tip Notice Banner */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] pt-1">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>
            Tip: You can find the meeting code in the meeting invite link.
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
