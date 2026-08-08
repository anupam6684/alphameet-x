"use client";

import { Video, Calendar, Clock, CheckCircle2 } from "lucide-react";

const historyData = [
  {
    id: "ALPHA-8812",
    title: "Frontend Architecture Sync",
    date: "Aug 06, 2026",
    duration: "45 mins",
    participants: 4,
    status: "Completed",
  },
  {
    id: "ALPHA-9011",
    title: "Project Review & Demo",
    date: "Aug 04, 2026",
    duration: "30 mins",
    participants: 6,
    status: "Completed",
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Meeting History
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Review past meeting logs and duration records.
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--nav-hover)] border-b border-[var(--card-border)] text-xs uppercase text-[var(--text-muted)] font-bold">
            <tr>
              <th className="p-4">Meeting</th>
              <th className="p-4">Date</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Participants</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--card-border)]">
            {historyData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[var(--nav-hover)] transition-colors"
              >
                <td className="p-4 font-semibold flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-500" />
                  <span>{row.title}</span>
                </td>
                <td className="p-4 text-[var(--text-muted)]">{row.date}</td>
                <td className="p-4 font-mono text-xs">{row.duration}</td>
                <td className="p-4">{row.participants} members</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{row.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards */}
      <div className="md:hidden space-y-3">
        {historyData.map((row) => (
          <div key={row.id} className="glass-card p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">{row.title}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                {row.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {row.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {row.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
