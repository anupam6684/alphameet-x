"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  Video,
  History,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import Logo from "./Logo";
import { useTheme } from "./ThemeProvider";

import { useApp } from "@/context/AppContext";

const navItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Meetings", href: "/history", icon: History },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useApp();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    router.replace("/login"); // router.replace prevents the user from clicking 'Back' into a protected page
  };

  return (
    <>
      {/* 1. Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[var(--sidebar-bg)] border-b border-[var(--card-border)] sticky top-0 z-40 w-full">
        <Logo showText={true} />

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[var(--nav-hover)] border border-[var(--card-border)] text-[var(--foreground)]"
            aria-label="Toggle Mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-500" />
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-xl bg-[var(--nav-hover)] border border-[var(--card-border)] text-[var(--foreground)]"
            aria-label="Toggle Drawer Menu"
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* 2. Mobile Drawer Panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-72 bg-[var(--sidebar-bg)] border-r border-[var(--card-border)] z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--card-border)]">
                  <Logo showText={true} />
                  <button
                    onClick={toggleMobileMenu}
                    className="p-1.5 text-[var(--text-muted)] hover:text-[var(--foreground)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                            : "text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--nav-hover)]"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${isActive ? "text-white" : "text-[var(--text-muted)]"}`}
                        />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-2 pt-4 border-t border-[var(--card-border)]">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] bg-[var(--nav-hover)] border border-[var(--card-border)] w-full"
                >
                  <div className="flex items-center gap-3">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-amber-500" />
                    )}
                    <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
                  </div>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200 w-full text-left"
                >
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-[var(--sidebar-bg)] border-r border-[var(--card-border)] flex-col justify-between p-6 shrink-0 sticky top-0 transition-colors duration-300">
        <div>
          <div className="mb-10 px-1">
            <Logo showText={true} />
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--nav-hover)]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-white" : "text-[var(--text-muted)]"}`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-2 pt-4 border-t border-[var(--card-border)]">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] bg-[var(--nav-hover)] border border-[var(--card-border)] transition-all duration-200 w-full"
          >
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-indigo-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
            <div
              className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ${isDarkMode ? "bg-blue-600" : "bg-slate-300"}`}
            >
              <motion.div
                layout
                className="w-3 h-3 rounded-full bg-white shadow-sm"
                animate={{ x: isDarkMode ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200 w-full text-left"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
