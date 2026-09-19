import Link from "next/link"

const QUICK_LINKS = [
  { href: "/about", label: "About" },
  { href: "/hubs", label: "Hubs" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
]

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 5.5a2.06 2.06 0 1 1-4.13 0 2.06 2.06 0 0 1 4.13 0zM3.1 8h4.07v12.7H3.1zM9.55 8h3.9v1.75h.05c.54-.97 1.87-1.99 3.85-1.99 4.12 0 4.88 2.64 4.88 6.08v6.86h-4.06v-6.08c0-1.45-.03-3.32-2.06-3.32-2.06 0-2.38 1.58-2.38 3.21v6.19H9.55z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.72 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto"
      style={{
        backgroundColor: "var(--bg-elevated)",
        borderTop: "2px solid var(--accent-gold)",
      }}
    >
      <div className="jyc-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-white shadow-card ring-1 ring-jyc-accent-gold/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/jyc-logo.jpg"
                alt="JYC logo"
                width={64}
                height={64}
                className="h-16 w-16 object-cover"
              />
            </span>
            <p className="mt-4 text-sm leading-relaxed text-jyc-text-muted">
              {`JYC is the JIIT Youth Club — a student-run community fostering
              innovation, culture, and social impact at Jaypee Institute of
              Information Technology.`}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-jyc-accent-gold">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-jyc-text-muted transition-colors hover:text-jyc-accent-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-jyc-accent-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-jyc-text-muted">
              <li>Jaypee Institute of Information Technology</li>
              <li>A-10, Sector 62, Noida, Uttar Pradesh — 201309</li>
              <li>
                <a
                  href="mailto:jyc@jiit.ac.in"
                  className="transition-colors hover:text-jyc-accent-gold"
                >
                  jyc@jiit.ac.in
                </a>
              </li>
              <li>+91 00000 00000 (placeholder)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-jyc-accent-gold">
              Follow Us
            </h3>
            <p className="mt-4 text-sm text-jyc-text-muted">
              Stay tuned for announcements, events, and club highlights.
            </p>
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-solid border-jyc-border-tech text-jyc-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-jyc-accent-gold hover:text-jyc-accent-gold"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-solid" style={{ borderColor: "var(--border-tech)" }}>
        <div className="jyc-container flex flex-col items-center justify-between gap-2 py-5 text-xs text-jyc-text-muted sm:flex-row">
          <p>&copy; {year} JYC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Made with fidelity by the JIIT Youth Club</p>
            <span className="text-neutral-600">•</span>
            <Link
              href="/admin"
              className="text-[11px] text-neutral-500 transition-colors hover:text-jyc-accent-gold"
            >
              Admin Access ↗
            </Link>
          </div>
        </div>
      </div>
      </footer>
  )
} 