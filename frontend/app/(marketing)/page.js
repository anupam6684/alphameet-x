"use client";

import Link from "next/link";
import Logo from "../components/Logo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
      <div className="glass-card max-w-md w-full rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <Logo showText={true} className="justify-center" />
          <h1 className="text-2xl font-bold pt-2">Create Account</h1>
          <p className="text-xs text-[var(--text-muted)]">
            Join AlphaMeet X for modern video collaboration
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Anupam Jana"
              className="w-full px-4 py-2.5 rounded-xl input-theme text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">
              Email
            </label>
            <input
              type="email"
              placeholder="anupam@example.com"
              className="w-full px-4 py-2.5 rounded-xl input-theme text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl input-theme text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl input-theme text-sm"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-[var(--text-muted)] pt-1 cursor-pointer">
            <input type="checkbox" className="rounded accent-blue-600" />
            <span>I agree to the Terms &amp; Conditions</span>
          </label>

          <Link
            href="/home"
            className="block w-full py-3 rounded-xl text-center font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30"
          >
            Create Account
          </Link>
        </form>

        <p className="text-center text-xs text-[var(--text-muted)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
