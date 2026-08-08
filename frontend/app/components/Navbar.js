"use client";

import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            A
          </div>

          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            AlphaMeet X
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Log in
          </Link>

          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
