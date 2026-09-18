import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"
import Card from "@/components/ui/Card"

const ACTIVITIES = [
  {
    title: "Workshops & Skill Labs",
    text: "Hands-on sessions on coding, design, photography, and public speaking — taught by peers and professionals.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6m0 8v6M2 12h6m8 0h6M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    ),
  },
  {
    title: "Social Impact",
    text: "Clean drives, donation campaigns, tree plantation, and community teaching initiatives across the NCR.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.6-9.3-9A5.5 5.5 0 0 1 12 6.4 5.5 5.5 0 0 1 21.3 12C19 16.4 12 21 12 21z" />
      </svg>
    ),
  },
  {
    title: "Industry Connect",
    text: "Tech talks, mentorship sessions, and hiring workshops that bridge the campus with the industry.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7m1 12h18" />
      </svg>
    ),
  },
  {
    title: "Fests & Competitions",
    text: "Cultural nights, sports meets, hackathons, and creative contests that fill the campus calendar.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2m12 0h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2M6 15H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2m12 0h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2m-4-5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
  },
]

export default function KeyActivities() {
  return (
    <section className="jyc-section" style={{ backgroundColor: "var(--bg-elevated)" }}>
      <div className="jyc-container">
        <ScrollAnimation>
          <SectionHeader
            title="What We Do"
            subtitle="Four pillars keep the club buzzing all year — find your favourite and dive in."
          />
        </ScrollAnimation>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((activity, index) => (
            <ScrollAnimation key={activity.title} delay={index * 100}>
              <Card className="group h-full p-6">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-xl bg-jyc-accent-gold/15 text-jyc-accent-gold transition-transform duration-300 group-hover:scale-110">
                  {activity.icon}
                </div>
                <h3 className="jyc-h3">{activity.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-jyc-text-muted">
                  {activity.text}
                </p>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}