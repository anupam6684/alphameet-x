"use client";

import ThemeToggle from "../../components/ThemeToggle";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Configure user interface theme preferences and device defaults.
        </p>
      </div>

      <div className="glass-card p-6 rounded-3xl space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-[var(--card-border)]">
          <div>
            <h3 className="font-bold text-sm">Theme Appearance</h3>
            <p className="text-xs text-[var(--text-muted)]">
              Switch between dark cosmic and light mode.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-sm">Media Device Defaults</h3>
          <div className="space-y-2">
            <label className="text-xs text-[var(--text-muted)]">
              Default Camera
            </label>
            <select className="w-full px-4 py-2.5 rounded-xl input-theme text-xs">
              <option>Integrated Webcam (HD)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
