"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Video, KeyRound, ArrowRight, Sparkles } from "lucide-react";

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
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Ready to connect? 👋
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Start a new video call or join an existing meeting room.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Card */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500">
              <Video className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Start New Meeting</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Instantly launch an encrypted meeting room and invite your team
              members.
            </p>
          </div>

          <button
            onClick={handleCreateMeeting}
            className="w-full py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Meeting</span>
          </button>
        </div>

        {/* Join Card */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Join Meeting</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Enter an 8-character meeting code or link to hop straight into the
              session.
            </p>
          </div>

          <form onSubmit={handleJoinMeeting} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter meeting code"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl input-theme text-sm uppercase font-mono font-medium"
            />
            <button
              type="submit"
              disabled={!meetingCode.trim()}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 flex items-center gap-1"
            >
              <span>Join</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
