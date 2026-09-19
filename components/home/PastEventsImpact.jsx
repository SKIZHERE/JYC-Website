"use client"

import { getEvents, getPastEvents, getHubs } from "@/lib/data"
import EventCard from "@/components/EventCard"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"
import CountUp from "react-countup"

function Stat({ end, suffix = "", label }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="jyc-gradient-text text-4xl font-extrabold sm:text-5xl">
        <CountUp end={end} duration={2.5} enableScrollSpy scrollSpyOnce />
        {suffix}
      </span>
      <span className="text-sm font-medium text-jyc-text-muted">{label}</span>
    </div>
  )
}

export default function PastEventsImpact() {
  const events = getEvents()
  const past = getPastEvents().slice(0, 3)

  return (
    <section className="jyc-section">
      <div className="jyc-container">
        <ScrollAnimation>
          <div
            className="jyc-card mb-14 grid gap-8 p-8 sm:grid-cols-3 sm:p-10"
            style={{ borderTop: "3px solid var(--accent-gold)" }}
          >
            <Stat end={events.length || 24} label="Events Held" />
            <Stat end={getHubs().length || 6} label="Active Hubs" />
            <Stat end={1200} suffix="+" label="Participants Reached" />
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <SectionHeader
            title="Past Highlights"
            subtitle="A snapshot of what we've already pulled off together."
          />
        </ScrollAnimation>

        {past.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map((event, index) => (
              <ScrollAnimation key={event.id} delay={index * 100}>
                <EventCard event={event} compact />
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-jyc-text-muted">No past events yet.</p>
        )}
      </div>
    </section>
  )
}