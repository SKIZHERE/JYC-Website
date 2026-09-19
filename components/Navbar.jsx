"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import ThemeToggle from "./ThemeToggle"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/hubs", label: "Hubs" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "var(--bg-main)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border-tech)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <nav className="jyc-container flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="JYC — JIIT Youth Club home"
          >
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white shadow-card ring-1 ring-jyc-accent-gold/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/jyc-logo.jpg"
                alt="JYC logo"
                width={44}
                height={44}
                className="h-11 w-11 object-cover"
              />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-lg font-extrabold tracking-tight">JYC</span>
              <span className="text-[11px] font-medium text-jyc-text-muted">
                JIIT Youth Club
              </span>
            </span>
          </Link>

          {/* Desktop Nav with Magnetic Sliding Pill */}
          <ul className="hidden items-center gap-1 rounded-full p-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`relative z-10 block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "text-white"
                        : "text-jyc-text-muted hover:text-jyc-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>

                  {active && (
                    <motion.span
                      layoutId="activeTabPill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 z-0 rounded-full bg-jyc-accent-red shadow-sm"
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-solid border-jyc-border-tech bg-jyc-bg-card text-jyc-text-primary transition-colors hover:border-jyc-accent-gold lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile slide-in menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col gap-2 p-6 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "var(--bg-card)", borderLeft: "1px solid var(--border-tech)" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-extrabold tracking-tight">JYC</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-solid border-jyc-border-tech transition-colors hover:border-jyc-accent-gold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      active
                        ? "bg-jyc-accent-red text-white"
                        : "text-jyc-text-muted hover:bg-jyc-bg-elevated hover:text-jyc-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>
    </>
  )
}