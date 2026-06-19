"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Determine initial theme from HTML class list
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Apply classes to html element
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
    document.documentElement.style.colorScheme = newTheme;

    // Persist in cookie (expires in 1 year)
    document.cookie = `harddex-theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="w-9 h-9 border border-foreground flex items-center justify-center hover:text-primary hover:border-primary transition-colors duration-100 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun size={14} strokeWidth={1.6} />
      ) : (
        <Moon size={14} strokeWidth={1.6} />
      )}
    </button>
  );
}
