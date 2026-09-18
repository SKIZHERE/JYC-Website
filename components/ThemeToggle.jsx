"use client"

import { useTheme } from "@/lib/ThemeContext"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group grid h-10 w-10 place-items-center rounded-full border border-solid border-jyc-border-tech bg-jyc-bg-card text-jyc-text-primary transition-all duration-300 hover:border-jyc-accent-gold hover:text-jyc-accent-gold"
    >
      <span
        key={theme}
        className="inline-grid animate-[themePop_0.45s_ease-out] place-items-center"
        style={{
          animationName: "themePop",
        }}
      >
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </span>
      <style jsx>{`
        @keyframes themePop {
          0% { transform: rotate(-90deg) scale(0.4); opacity: 0; }
          70% { transform: rotate(8deg) scale(1.1); }
          100% { transform: rotate(0) scale(1); opacity: 1; }
        }
      `}</style>
    </button>
  )
}