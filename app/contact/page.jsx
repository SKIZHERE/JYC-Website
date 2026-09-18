"use client"

import { useState } from "react"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"
import Button from "@/components/ui/Button"

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "jyc@jiit.ac.in",
    href: "mailto:jyc@jiit.ac.in",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 00000 00000",
    href: "tel:+910000000000",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Address",
    value: "JIIT, A-10, Sector 62, Noida, UP — 201309",
    href: "https://maps.google.com/?q=JIIT+Sector+62+Noida",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

const inputClasses =
  "w-full rounded-lg border border-solid bg-jyc-bg-card px-4 py-3 text-sm text-jyc-text-primary placeholder:text-jyc-text-muted transition-colors focus:border-jyc-accent-gold focus:outline-none"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field) => (e) =>
    setForm((current) => ({ ...current, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.")
      return
    }
    setSubmitted(true)
  }

  return (
    <section className="jyc-section pt-28 lg:pt-36">
      <div className="jyc-container">
        <ScrollAnimation>
          <SectionHeader
            title="Contact Us"
            subtitle="Questions, ideas, or partnerships — drop us a line. We usually reply within a day."
          />
        </ScrollAnimation>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
          <ScrollAnimation animation="slide-left">
            <div
              className="jyc-card p-8"
              style={{ borderTop: "3px solid var(--accent-gold)" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-jyc-accent-gold/20 text-jyc-accent-gold">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <h2 className="jyc-h3">Message Sent!</h2>
                  <p className="max-w-sm text-sm text-jyc-text-muted">
                    Thanks {form.name.split(" ")[0] || "friend"} — we&apos;ve
                    received your message and will get back to you shortly.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: "", email: "", subject: "", message: "" })
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold">Name</span>
                      <input
                        type="text"
                        value={form.name}
                        onChange={handleChange("name")}
                        placeholder="Your name"
                        className={inputClasses}
                        style={{ borderColor: "var(--border-tech)" }}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold">Email</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        placeholder="you@example.com"
                        className={inputClasses}
                        style={{ borderColor: "var(--border-tech)" }}
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold">Subject</span>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={handleChange("subject")}
                      placeholder="What is this about?"
                      className={inputClasses}
                      style={{ borderColor: "var(--border-tech)" }}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold">Message</span>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={handleChange("message")}
                      placeholder="Tell us everything…"
                      className={`${inputClasses} resize-y`}
                      style={{ borderColor: "var(--border-tech)" }}
                    />
                  </label>

                  {error && (
                    <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm font-medium text-jyc-accent-red">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-jyc-text-muted">
                      UI only — a backend endpoint will be wired up in a future release.
                    </p>
                    <Button type="submit" size="lg">
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </ScrollAnimation>

          <div className="space-y-6">
            {CONTACT_DETAILS.map((detail, index) => (
              <ScrollAnimation key={detail.label} animation="slide-right" delay={index * 80}>
                <a
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="jyc-card flex items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-jyc-accent-gold/15 text-jyc-accent-gold">
                    {detail.icon}
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-jyc-text-muted">
                      {detail.label}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-jyc-text-primary">
                      {detail.value}
                    </span>
                  </span>
                </a>
              </ScrollAnimation>
            ))}

            <ScrollAnimation animation="slide-right" delay={240}>
              <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--border-tech)", backgroundColor: "var(--bg-card)" }}>
                <div
                  className="relative flex aspect-[16/9] items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(120deg, var(--accent-red), var(--accent-gold))",
                  }}
                >
                  <p className="px-6 text-center text-sm font-semibold text-white">
                    JIIT Sector 62 map placeholder
                    <span className="mt-1 block text-xs font-normal text-white/85">
                      Replace with embedded Google Map
                    </span>
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}