"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("alphameet_theme");

    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      // Respect system preference on first visit
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextState = !prev;
      if (nextState) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("alphameet_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("alphameet_theme", "light");
      }
      return nextState;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// Export default as fallback to prevent import mismatch errors
export default ThemeProvider;
