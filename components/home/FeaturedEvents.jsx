import { getUpcomingEvents } from "@/lib/data"
import EventCard from "@/components/EventCard"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"
import Button from "@/components/ui/Button"

export default function FeaturedEvents() {
  const upcoming = getUpcomingEvents()
  const featured = upcoming.slice(0, 3)

  return (
    <section className="jyc-section" style={{ backgroundColor: "var(--bg-elevated)" }}>
      <div className="jyc-container">
        <ScrollAnimation>
          <SectionHeader
            title="Upcoming Events"
            subtitle="Mark your calendar — here's what the club is cooking up next."
          />
        </ScrollAnimation>

        {featured.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((event, index) => (
              <ScrollAnimation key={event.id} delay={index * 100}>
                <EventCard event={event} />
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-jyc-text-muted">
            No upcoming events right now — check back soon!
          </p>
        )}

        <div className="mt-10 text-center">
          <Button href="/events" variant="secondary">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}