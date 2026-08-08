"use client";

import Link from "next/link";
import Logo from "../../components/Logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
      <div className="glass-card max-w-md w-full rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <Logo showText={true} className="justify-center" />
          <h1 className="text-2xl font-bold pt-2">Welcome Back</h1>
          <p className="text-xs text-[var(--text-muted)]">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">
              Email
            </label>
            <input
              type="email"
              placeholder="anupam@example.com"
              className="w-full px-4 py-3 rounded-xl input-theme text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl input-theme text-sm"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded accent-blue-600" />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Link
            href="/home"
            className="block w-full py-3 rounded-xl text-center font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30"
          >
            Sign In
          </Link>
        </form>

        <p className="text-center text-xs text-[var(--text-muted)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
