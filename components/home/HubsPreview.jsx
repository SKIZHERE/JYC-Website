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
        {/* JTV Spotlight Banner */}
        <ScrollAnimation>
          <a
            href="https://jtv.jiit.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="jyc-card group relative mb-14 block overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8"
            style={{ borderColor: "var(--accent-red)" }}
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-jyc-accent-red/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-jyc-accent-red">
                    Featured Media Society
                  </span>
                  <span className="text-xs text-jyc-text-muted">• Official Broadcast Body</span>
                </div>
                <h3 className="jyc-h2 mt-3 flex items-center gap-2 group-hover:text-jyc-accent-red transition-colors">
                  JTV — Jaypee TV
                  <span className="text-sm text-jyc-text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-jyc-text-muted">
                  The voice and visual lens of JIIT. Covering campus culture, live events, fest aftermovies, and exclusive student-faculty interactions.
                </p>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 rounded-xl bg-jyc-accent-red px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity group-hover:opacity-90">
                  Visit JTV Website
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </ScrollAnimation>

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