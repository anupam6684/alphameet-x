"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "system", // "light" | "dark" | "system"
  setTheme: () => {},
  isDarkMode: true,
  toggleTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("system");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Apply class to documentElement based on theme selection
  const applyTheme = (selectedTheme) => {
    let effectiveDark = false;

    if (selectedTheme === "light") {
      effectiveDark = false;
    } else if (selectedTheme === "dark") {
      effectiveDark = true;
    } else {
      // System mode preference
      effectiveDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    setIsDarkMode(effectiveDark);

    if (effectiveDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Mount & Load stored theme preference on startup
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("alphameet_theme") || "system";
    setThemeState(savedTheme);
    applyTheme(savedTheme);

    // System theme change listener
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e) => {
      const currentStored = localStorage.getItem("alphameet_theme");
      if (!currentStored || currentStored === "system") {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  // Handler to set theme directly ("light" | "dark" | "system")
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("alphameet_theme", newTheme);
    applyTheme(newTheme);
  };

  // Quick toggle between light and dark
  const toggleTheme = () => {
    const nextTheme = isDarkMode ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, isDarkMode, toggleTheme, mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
