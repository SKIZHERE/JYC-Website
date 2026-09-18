import Image from "next/image"
import Link from "next/link"
import { getHubs } from "@/lib/data"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"

export const metadata = {
  title: "Hubs | JYC — JIIT Youth Club",
  description:
    "Explore the six JYC hubs — Technology & Innovation, Social Impact, Cultural & Arts, Sports, Media & Photography, and Design & Creative.",
}

export default function HubsPage() {
  const hubs = getHubs()

  return (
    <>
      <section className="jyc-section pt-28 lg:pt-36">
        <div className="jyc-container">
          <ScrollAnimation>
            <SectionHeader
              title="Our Hubs"
              subtitle="Each hub is a community within the club — pick your lane and grow with people who share it."
            />
          </ScrollAnimation>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((hub, index) => (
              <ScrollAnimation key={hub.id} delay={index * 80}>
                <Link
                  href={`/hubs/${hub.id}`}
                  className="jyc-card group block h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                  style={{ ["--hub-accent"]: hub.color }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-jyc-bg-elevated">
                    <Image
                      src={hub.image}
                      alt={`${hub.name} cover`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="jyc-h3">{hub.name}</h3>
                      <span
                        className="h-3 w-3 rounded-full ring-2 ring-offset-2"
                        style={{
                          backgroundColor: hub.color,
                          color: "var(--bg-card)",
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-jyc-text-muted">
                      {hub.tagline}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-jyc-accent-gold">
                      Explore hub →
                    </p>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}