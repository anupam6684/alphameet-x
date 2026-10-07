"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function PreviewPage({ params }) {
  // Next.js 15+ Async params unwrap
  const { id } = use(params);
  const router = useRouter();

  // Media States
  const [userName, setUserName] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isPlayingTestSound, setIsPlayingTestSound] = useState(false);

  // appcontext
  const { user } = useApp();

  const handleJoinNow = () => {
    if (!userName.trim()) return;
    router.push(`/room/${id}`);
  };

  const handleTestSpeaker = () => {
    setIsPlayingTestSound(true);
    setTimeout(() => setIsPlayingTestSound(false), 2000);
  };
  useEffect(() => {
    if (user) {
      setUserName(user.name || user.username || "");
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Pre-Join Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-[var(--card-border)] bg-slate-950/60 shadow-2xl space-y-6 relative z-10"
      >
        {/* Top Back Navigation */}
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        {/* Title Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Let&apos;s check your setup
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">
            Make sure everything is good before joining
          </p>
        </div>

        {/* Main Camera Video Preview Window */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[var(--card-border)] bg-zinc-900 shadow-inner flex items-center justify-center">
          {isCameraOn ? (
            <Image
              src="/person1.png"
              alt="Camera Preview"
              fill
              className="object-cover object-center"
              priority
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[var(--text-muted)]">
              <VideoOff className="w-10 h-10 text-red-400" />
              <span className="text-xs font-medium">Camera is Off</span>
            </div>
          )}

          {/* Room ID Badge Overlay */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono font-medium text-slate-300">
            Room ID: {id}
          </div>
        </div>

        {/* Quick Controls Grid (Camera / Mic / Speaker) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {/* Camera Toggle Button */}
          <button
            type="button"
            onClick={() => setIsCameraOn((prev) => !prev)}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer text-left ${
              isCameraOn
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                isCameraOn ? "bg-emerald-500/20" : "bg-red-500/20"
              }`}
            >
              {isCameraOn ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5" />
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold">Camera</p>
              <p className="text-[11px] font-medium opacity-80">
                {isCameraOn ? "On" : "Off"}
              </p>
            </div>
          </button>

          {/* Microphone Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMicOn((prev) => !prev)}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer text-left ${
              isMicOn
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                isMicOn ? "bg-emerald-500/20" : "bg-red-500/20"
              }`}
            >
              {isMicOn ? (
                <Mic className="w-5 h-5" />
              ) : (
                <MicOff className="w-5 h-5" />
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold">Microphone</p>
              <p className="text-[11px] font-medium opacity-80">
                {isMicOn ? "On" : "Off"}
              </p>
            </div>
          </button>

          {/* Speaker Test Button */}
          <button
            type="button"
            onClick={handleTestSpeaker}
            className="p-3.5 sm:p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 transition-all flex items-center gap-3 cursor-pointer text-left hover:bg-indigo-500/20"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
              <Volume2
                className={`w-5 h-5 ${
                  isPlayingTestSound ? "animate-bounce" : ""
                }`}
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold">Speaker</p>
              <p className="text-[11px] font-medium opacity-80">
                {isPlayingTestSound ? "Testing..." : "Test"}
              </p>
            </div>
          </button>
        </div>

        {/* Bottom Form Action Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-end pt-2">
          {/* User Display Name Field */}
          <div className="space-y-1.5 flex-1 w-full">
            <label className="text-xs font-semibold text-[var(--text-muted)]">
              Your name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl input-theme text-sm font-medium"
            />
          </div>

          {/* Join Now Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleJoinNow}
            disabled={!userName.trim()}
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30 border border-blue-400/30 flex items-center justify-center gap-2 text-sm cursor-pointer whitespace-nowrap h-[46px]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join Now</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
