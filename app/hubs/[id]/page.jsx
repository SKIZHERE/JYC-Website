import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getHubs, getHubById, getEventsByHub, getTeamByHub } from "@/lib/data"
import EventCard from "@/components/EventCard"
import TeamCard from "@/components/TeamCard"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"
import Button from "@/components/ui/Button"

export function generateStaticParams() {
  return getHubs().map((hub) => ({ id: hub.id }))
}

export function generateMetadata({ params }) {
  const hub = getHubById(params.id)
  return {
    title: hub ? `${hub.name} | JYC Hubs` : "Hub | JYC",
    description: hub ? hub.tagline : "JYC hub",
  }
}

export default function HubDetailPage({ params }) {
  const hub = getHubById(params.id)
  if (!hub) notFound()

  const events = getEventsByHub(hub.id)
  const team = getTeamByHub(hub.id)

  return (
    <>
      <section
        className="relative overflow-hidden pb-16 pt-28 lg:pt-36"
        style={{ backgroundColor: hub.color }}
      >
        <div className="jyc-tech-circuit absolute inset-0" style={{ opacity: 0.2 }} />
        <div className="jyc-container relative z-10">
          <ScrollAnimation animation="fade-up">
            <Link
              href="/hubs"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5m6 6-6-6 6-6" />
              </svg>
              All Hubs
            </Link>
            <h1 className="jyc-h1 text-white">{hub.name}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
              {hub.tagline}
            </p>
            <div className="mt-6">
              <Button href="/contact">Join This Hub</Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="jyc-section">
        <div className="jyc-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <ScrollAnimation animation="slide-left">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-card">
                <Image
                  src={hub.image}
                  alt={`${hub.name} cover`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-right" delay={100}>
              <div>
                <h2 className="jyc-h2">About this Hub</h2>
                <p className="mt-4 text-base leading-relaxed text-jyc-text-muted sm:text-lg">
                  {hub.description}
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="jyc-section" style={{ backgroundColor: "var(--bg-elevated)" }}>
        <div className="jyc-container">
          <ScrollAnimation>
            <SectionHeader
              title={`${hub.shortName} Events`}
              subtitle={events.length ? "Everything this hub has planned or pulled off." : "No events yet for this hub."}
            />
          </ScrollAnimation>
          {events.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <ScrollAnimation key={event.id} delay={index * 80}>
                  <EventCard event={event} />
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-sm font-medium uppercase tracking-wide text-jyc-text-muted">
              No events listed yet
            </p>
          )}
        </div>
      </section>

      <section className="jyc-section">
        <div className="jyc-container">
          <ScrollAnimation>
            <SectionHeader
              title={`Meet the ${hub.shortName} Team`}
              subtitle={team.length ? "The people running the show." : "Team members to be announced."}
            />
          </ScrollAnimation>
          {team.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <ScrollAnimation key={member.id} delay={index * 60}>
                  <TeamCard member={member} />
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-sm font-medium uppercase tracking-wide text-jyc-text-muted">
              Team roster coming soon
            </p>
          )}
        </div>
      </section>
    </>
  )
}