"use client";

import { motion } from "framer-motion";
import { Laptop, Video, User, MessageSquare, Sparkles } from "lucide-react";

export default function LoginHeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-[260px] flex items-center justify-center">
      {/* Background Ambient Glow */}
      <div className="absolute w-48 h-48 bg-blue-600/20 rounded-full blur-2xl" />

      {/* Main 3D Composition Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Floating Remote Video Screen */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-44 h-28 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-xl p-2 relative flex flex-col justify-between overflow-hidden backdrop-blur-md"
        >
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1 font-bold text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Call
            </span>
            <Video className="w-3 h-3 text-indigo-400" />
          </div>

          <div className="flex items-center justify-center my-auto">
            <div className="w-12 h-12 rounded-full bg-indigo-600/30 border border-indigo-400/40 text-xl flex items-center justify-center shadow-inner">
              🧔🏻‍♂️
            </div>
          </div>

          <div className="text-[9px] bg-black/60 px-2 py-0.5 rounded text-white font-medium self-start">
            Sarah Miller
          </div>
        </motion.div>

        {/* User Workspace (Laptop + Desk Silhouette) */}
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative -mt-6 flex flex-col items-center"
        >
          {/* User Avatar working at Desk */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-14 h-14 rounded-full bg-blue-600/30 border border-blue-400/40 text-2xl flex items-center justify-center shadow-lg">
              👨🏻‍💻
            </div>
          </div>

          {/* Glowing Laptop Base */}
          <div className="w-36 h-20 bg-slate-900 rounded-t-xl border border-blue-500/30 shadow-2xl p-1.5 relative flex flex-col justify-between">
            <div className="w-full h-full rounded-lg bg-blue-950/50 border border-blue-400/20 flex items-center justify-center">
              <Laptop className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
          </div>
          <div className="w-44 h-2 bg-slate-800 rounded-b-md shadow-md border-t border-slate-700" />
        </motion.div>

        {/* Floating App Badge Badges */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], rotate: [-5, 5, -5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-2 left-4 p-2 rounded-xl bg-blue-600 text-white shadow-lg text-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.div
          animate={{ scale: [1.1, 0.9, 1.1], rotate: [5, -5, 5] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 right-2 p-2 rounded-xl bg-indigo-600 text-white shadow-lg text-xs"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </motion.div>
      </div>
    </div>
  );
}
