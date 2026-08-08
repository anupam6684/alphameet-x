"use client";

import Link from "next/link";
import { Video, Clock, Users, Calendar, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          User Dashboard
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Overview of your video meeting statistics and upcoming schedules.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-xs font-bold uppercase">Total Calls</span>
            <Video className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black">28</div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-xs font-bold uppercase">Completed</span>
            <Clock className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black">24</div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-xs font-bold uppercase">Upcoming</span>
            <Calendar className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black">4</div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-xs font-bold uppercase">Total Hours</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black">18.5h</div>
        </div>
      </div>

      {/* Quick Launch Banner */}
      <div className="glass-card p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-l-blue-600">
        <div>
          <h3 className="text-lg font-bold">Start an instant room right now</h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            No scheduling required. Launch and share code immediately.
          </p>
        </div>
        <Link
          href="/home"
          className="px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <span>Go to Home</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
