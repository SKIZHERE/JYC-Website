import EventsExplorer from "@/components/EventsExplorer"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"

export const metadata = {
  title: "Events | JYC — JIIT Youth Club",
  description:
    "Explore upcoming and past events from the JIIT Youth Club — hackathons, cultural fests, sports meets, workshops, and drives.",
}

export default function EventsPage() {
  return (
    <section className="jyc-section pt-28 lg:pt-36">
      <ScrollAnimation>
        <div className="jyc-container">
          <SectionHeader
            title="Events"
            subtitle="Everything happening under the JYC banner — upcoming and past."
          />
        </div>
      </ScrollAnimation>
      <EventsExplorer />
    </section>
  )
}