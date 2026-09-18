import Link from "next/link"
import Image from "next/image"
import { formatDate, getHubById } from "@/lib/data"

export default function EventCard({ event, compact = false }) {
  const hub = getHubById(event.hubId)

  return (
    <Link
      href={`/events/${event.id}`}
      className="jyc-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-jyc-bg-elevated">
        <Image
          src={event.bannerImage}
          alt={`${event.title} banner`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: hub?.color || "var(--accent-red)" }}
        >
          {hub?.shortName || "JYC"}
        </span>
        {event.status === "upcoming" && (
          <span className="absolute right-3 top-3 rounded-full bg-jyc-accent-gold px-3 py-1 text-xs font-bold text-black">
            Upcoming
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-jyc-text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4m8-4v4M3 10h18" />
          </svg>
          {formatDate(event.date)}
        </p>

        <h3 className="jyc-h3 leading-snug transition-colors group-hover:text-jyc-accent-gold">
          {event.title}
        </h3>

        {!compact && (
          <p className="line-clamp-2 text-sm leading-relaxed text-jyc-text-muted">
            {event.description}
          </p>
        )}

        <p className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-jyc-accent-gold">
          View Details
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </p>
      </div>
    </Link>
  )
}