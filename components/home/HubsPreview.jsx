import Image from "next/image"
import Link from "next/link"
import { getHubs } from "@/lib/data"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"
import Button from "@/components/ui/Button"

export default function HubsPreview() {
  const hubs = getHubs()

  return (
    <section className="jyc-section">
      <div className="jyc-container">
        <ScrollAnimation>
          <SectionHeader
            title="Our Hubs"
            subtitle="Six teams power everything JYC does. Pick a lane — or join them all."
          />
        </ScrollAnimation>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hubs.map((hub, index) => (
            <ScrollAnimation key={hub.id} delay={index * 80}>
              <Link
                href={`/hubs/${hub.id}`}
                className="jyc-card group block h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-jyc-bg-elevated">
                  <Image
                    src={hub.image}
                    alt={`${hub.name} cover`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55))" }} />
                  <h3 className="absolute bottom-3 left-4 text-lg font-bold text-white">
                    {hub.name}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-jyc-text-muted">
                    {hub.tagline}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-jyc-accent-gold">
                    Explore hub →
                  </p>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/hubs" variant="secondary">
            View All Hubs
          </Button>
        </div>
      </div>
    </section>
  )
}