import Image from "next/image"
import { getHubById } from "@/lib/data"

function SocialIcon({ type }) {
  if (type === "linkedin") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 5.5a2.06 2.06 0 1 1-4.13 0 2.06 2.06 0 0 1 4.13 0zM3.1 8h4.07v12.7H3.1zM9.55 8h3.9v1.75h.05c.54-.97 1.87-1.99 3.85-1.99 4.12 0 4.88 2.64 4.88 6.08v6.86h-4.06v-6.08c0-1.45-.03-3.32-2.06-3.32-2.06 0-2.38 1.58-2.38 3.21v6.19H9.55z" />
      </svg>
    )
  }
  if (type === "instagram") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    )
  }
  return null
}

export default function TeamCard({ member }) {
  const hub = getHubById(member.hubId)
  const socials = member.socialLinks || {}

  return (
    <div className="jyc-card group flex flex-col items-center gap-4 p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-jyc-accent-gold ring-offset-2 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={member.photo}
          alt={`${member.name} photo`}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="text-lg font-bold">{member.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-jyc-accent-gold">{member.role}</p>
        {member.bio ? (
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-jyc-text-muted">
            {member.bio}
          </p>
        ) : null}
        {hub ? (
          <div className="mt-3">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: hub.color || "var(--accent-red)" }}
            >
              {hub.name}
            </span>
          </div>
        ) : null}
      </div>

      {socials && Object.keys(socials).length > 0 ? (
        <div className="flex gap-2">
          {Object.entries(socials).map(([type, href]) =>
            href && href !== "#" ? (
              <a
                key={type}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${type}`}
                className="grid h-9 w-9 place-items-center rounded-full border border-solid border-jyc-border-tech text-jyc-text-muted transition-colors hover:border-jyc-accent-gold hover:text-jyc-accent-gold"
              >
                <SocialIcon type={type} />
              </a>
            ) : null
          )}
        </div>
      ) : null}
    </div>
  )
}