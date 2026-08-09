"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Users,
} from "lucide-react";

// Sample History Data matching reference
const historyData = [
  {
    id: "1",
    title: "Project Discussion",
    roomId: "ABCD1234",
    date: "2 May, 2026",
    duration: "32 min",
    participants: 5,
  },
  {
    id: "2",
    title: "Team Sync",
    roomId: "EFGH5678",
    date: "3 May, 2026",
    duration: "45 min",
    participants: 6,
  },
  {
    id: "3",
    title: "Client Call",
    roomId: "IJKL9012",
    date: "30 Apr, 2026",
    duration: "28 min",
    participants: 3,
  },
  {
    id: "4",
    title: "Design Review",
    roomId: "MNOP3456",
    date: "29 Apr, 2026",
    duration: "38 min",
    participants: 5,
  },
  {
    id: "5",
    title: "Weekly Standup",
    roomId: "QRST7890",
    date: "28 Apr, 2026",
    duration: "20 min",
    participants: 4,
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter meetings by title or Room ID
  const filteredMeetings = historyData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roomId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 w-full max-w-5xl mx-auto py-2"
    >
      {/* =========================================================================
          HEADER & SEARCH BAR
         ========================================================================= */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Meeting History
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium mt-1">
            Your past meetings
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search meetings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl input-theme text-xs font-medium transition-colors"
          />
        </div>
      </motion.div>

      {/* =========================================================================
          DESKTOP TABLE VIEW
         ========================================================================= */}
      <motion.div
        variants={itemVariants}
        className="hidden md:block glass-card rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-xl"
      >
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--card-border)] text-[var(--text-muted)] font-bold uppercase tracking-wider text-[11px] bg-slate-900/40">
              <th className="py-4 px-6">Meeting Title</th>
              <th className="py-4 px-6">Room ID</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Duration</th>
              <th className="py-4 px-6">Participants</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--card-border)]">
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[var(--nav-hover)] transition-colors group cursor-pointer"
                >
                  <td className="py-4 px-6 font-bold text-sm text-[var(--foreground)]">
                    {row.title}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-[var(--text-muted)]">
                    {row.roomId}
                  </td>
                  <td className="py-4 px-6 text-[var(--text-muted)] font-medium">
                    {row.date}
                  </td>
                  <td className="py-4 px-6 font-medium text-[var(--text-muted)]">
                    {row.duration}
                  </td>
                  <td className="py-4 px-6 font-medium text-[var(--text-muted)]">
                    {row.participants}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="w-8 h-8 rounded-xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 text-blue-400 hover:text-white transition-all flex items-center justify-center ml-auto group-hover:scale-105">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-xs text-[var(--text-muted)]"
                >
                  No past meetings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* =========================================================================
          MOBILE CARDS VIEW
         ========================================================================= */}
      <motion.div variants={itemVariants} className="md:hidden space-y-3">
        {filteredMeetings.map((row) => (
          <div
            key={row.id}
            className="glass-card p-5 rounded-2xl border border-[var(--card-border)] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">{row.title}</h3>
                <p className="text-[11px] font-mono text-[var(--text-muted)]">
                  {row.roomId}
                </p>
              </div>
              <button className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--card-border)]">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>{row.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{row.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>{row.participants} members</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* =========================================================================
          PAGINATION CONTROLS
         ========================================================================= */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-center gap-2 pt-4"
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="w-8 h-8 rounded-xl border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--nav-hover)] transition-all flex items-center justify-center text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--nav-hover)]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
          className="w-8 h-8 rounded-xl border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--nav-hover)] transition-all flex items-center justify-center text-xs"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
