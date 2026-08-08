"use client";

import { User, Mail, Shield } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Account Profile
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Manage your personal credentials and public display profile.
        </p>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-[var(--card-border)]">
          <div className="w-20 h-20 rounded-full bg-blue-600/20 border-2 border-blue-500 text-blue-500 flex items-center justify-center text-3xl font-bold">
            AJ
          </div>
          <div>
            <h2 className="text-xl font-bold">Anupam Jana</h2>
            <p className="text-xs text-[var(--text-muted)]">
              Software Developer &amp; Student
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Anupam Jana"
              className="w-full px-4 py-2.5 rounded-xl input-theme text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="anupam@example.com"
              className="w-full px-4 py-2.5 rounded-xl input-theme text-sm"
            />
          </div>
        </div>

        <button className="px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md">
          Save Profile Changes
        </button>
      </div>
    </div>
  );
}
