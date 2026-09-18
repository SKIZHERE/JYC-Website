import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getEvents, getEventById, getHubById, getGalleryByEvent, formatFullDate } from "@/lib/data"
import ScrollAnimation from "@/components/ScrollAnimation"
import Button from "@/components/ui/Button"

export function generateStaticParams() {
  return getEvents().map((event) => ({ id: event.id }))
}

export function generateMetadata({ params }) {
  const event = getEventById(params.id)
  return {
    title: event ? `${event.title} | JYC Events` : "Event | JYC",
    description: event ? event.description : "JYC event",
  }
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-jyc-accent-gold/15 text-jyc-accent-gold">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-jyc-text-muted">
          {label}
        </p>
        <p className="text-sm font-medium text-jyc-text-primary">{value}</p>
      </div>
    </div>
  )
}

export default function EventDetailPage({ params }) {
  const event = getEventById(params.id)
  if (!event) notFound()

  const hub = getHubById(event.hubId)
  const photos = getGalleryByEvent(event.id)
  const isUpcoming = event.status === "upcoming"

  return (
    <>
      <section className="relative aspect-[16/7] min-h-72 w-full overflow-hidden">
        <Image
          src={event.bannerImage}
          alt={`${event.title} banner`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.65))" }} />
        <div className="jyc-container absolute inset-x-0 bottom-0 z-10 pb-8 sm:pb-10">
          <ScrollAnimation animation="fade-up">
            <div className="flex flex-wrap items-center gap-3">
              {hub && (
                <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: hub.color }}>
                  {hub.name}
                </span>
              )}
              {isUpcoming && (
                <span className="rounded-full bg-jyc-accent-gold px-3 py-1 text-xs font-bold text-black">
                  Upcoming
                </span>
              )}
            </div>
            <h1 className="jyc-h1 mt-4 max-w-3xl text-white">{event.title}</h1>
          </ScrollAnimation>
        </div>
      </section>

      <section className="jyc-section">
        <div className="jyc-container">
          <ScrollAnimation>
            <Link href="/events" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-jyc-text-muted transition-colors hover:text-jyc-accent-gold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5m6 6-6-6 6-6" />
              </svg>
              Back to Events
            </Link>
          </ScrollAnimation>

          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <ScrollAnimation animation="slide-left">
              <article className="jyc-card p-8 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-widest text-jyc-accent-red">
                  About this event
                </p>
                <p className="mt-4 text-base leading-relaxed text-jyc-text-primary sm:text-lg">
                  {event.fullWriteUp}
                </p>

                <h2 className="jyc-h3 mt-10">Highlights</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {event.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 rounded-lg bg-jyc-bg-elevated p-3 text-sm font-medium">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-jyc-accent-gold">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-right" delay={100}>
              <aside className="jyc-card sticky top-24 p-6">
                <div className="space-y-5">
                  <InfoRow
                    label="Date"
                    value={formatFullDate(event.date)}
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M8 3v4m8-4v4M3 10h18" />
                      </svg>
                    }
                  />
                  <InfoRow
                    label="Time"
                    value={`${event.startTime} – ${event.endTime}`}
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    }
                  />
                  <InfoRow
                    label="Venue"
                    value={event.venue}
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    }
                  />
                  {hub && (
                    <InfoRow
                      label="Hub"
                      value={hub.name}
                      icon={
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                          <path d="M9 21v-4h6v4" />
                        </svg>
                      }
                    />
                  )}
                </div>

                {isUpcoming && event.registrationLink ? (
                  <div className="mt-6 border-t border-solid pt-6" style={{ borderColor: "var(--border-tech)" }}>
                    <Button href={event.registrationLink} className="w-full" size="lg">
                      Register Now
                    </Button>
                    <p className="mt-3 text-center text-xs text-jyc-text-muted">
                      Registrations open to all JIIT students.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 border-t border-solid pt-6" style={{ borderColor: "var(--border-tech)" }}>
                    <Button href="/contact" variant="secondary" className="w-full">
                      Interested? Contact Us
                    </Button>
                  </div>
                )}
              </aside>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section className="jyc-section" style={{ backgroundColor: "var(--bg-elevated)" }}>
          <div className="jyc-container">
            <ScrollAnimation>
              <h2 className="jyc-h2">From the Event</h2>
            </ScrollAnimation>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, index) => (
                <ScrollAnimation key={photo.id} delay={index * 80}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl" style={{ border: "1px solid var(--border-tech)" }}>
                    <Image
                      src={photo.imageUrl}
                      alt={photo.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}