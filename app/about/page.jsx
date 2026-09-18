import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"
import Card from "@/components/ui/Card"

export const metadata = {
  title: "About | JYC — JIIT Youth Club",
  description:
    "Learn about the JIIT Youth Club — our vision, mission, what we do, and the milestones that shaped us.",
}

const WHAT_WE_DO = [
  {
    title: "Organise Campus Events",
    text: "Hackathons, cultural fests, sports meets, and design competitions that define campus life at JIIT Sector 62.",
  },
  {
    title: "Run Skill-Building Hubs",
    text: "Six hubs — Tech, Social Impact, Cultural, Sports, Media, and Design — each running weekly sessions and projects.",
  },
  {
    title: "Drive Social Impact",
    text: "Volunteer drives, sustainability pledges, and community teaching programs that extend the club beyond campus.",
  },
  {
    title: "Connect Students with Industry",
    text: "Tech talks, mentorship programs, and hiring workshops that prepare members for life after college.",
  },
]

const MILESTONES = [
  {
    year: "2014",
    title: "Club Founded",
    text: "JYC is founded as a student council at JIIT Sector 62.",
  },
  {
    year: "2017",
    title: "First Flag-High Event",
    text: "The inaugural cultural fest draws a record campus crowd.",
  },
  {
    year: "2020",
    title: "Walks Through A Pandemic",
    text: "The club pivots to online workshops, keeping 200+ members engaged.",
  },
  {
    year: "2024",
    title: "Six Hubs Launched",
    text: "JYC restructures into six focused hubs, growing to 350+ members.",
  },
]

const VISION =
  "To make JIIT a campus where every student finds a community, builds real skills, and contributes to something bigger than themselves."
const MISSION =
  "To curate experiences — events, hubs, and drives — that bring students together, and to channel student energy into innovation, culture, and social good."

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, var(--accent-red), var(--accent-gold))",
          }}
        />
        <div className="jyc-tech-circuit absolute inset-0" style={{ opacity: 0.18 }} />
        <div className="jyc-container relative z-10 text-center text-white">
          <ScrollAnimation animation="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              About Us
            </p>
            <h1 className="jyc-h1 mt-3">The JIIT Youth Club</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              A student-run community making JIIT Sector 62 energetic, creative,
              and a little more fun — since 2014.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className="jyc-section">
        <div className="jyc-container">
          <ScrollAnimation>
            <SectionHeader title="Who We Are" />
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <div className="jyc-card mx-auto mt-10 max-w-4xl p-8 sm:p-10">
              <p className="text-base leading-relaxed sm:text-lg">
                {`The JIIT Youth Club (JYC) is the student council-turned-community
                at the heart of JIIT Sector 62. We are a group of students —
                engineers, artists, athletes, and volunteers — who believe that a
                great campus experience is built, not given.`}
              </p>
              <p className="mt-4 text-base leading-relaxed text-jyc-text-muted sm:text-lg">
                {`Everything we do is run by students, for students. Our leadership
                cabinet plans the year ahead while our six hubs execute it —
                hosting events, running workshops, and driving volunteer work
                that touches both the campus and the neighbouring community.`}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="jyc-section" style={{ backgroundColor: "var(--bg-elevated)" }}>
        <div className="jyc-container">
          <ScrollAnimation>
            <SectionHeader
              title="Vision & Mission"
              subtitle="The two sentences that guide every event we plan and every hub we run."
            />
          </ScrollAnimation>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <ScrollAnimation delay={80}>
              <Card className="h-full p-8">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-jyc-accent-red/15 text-jyc-accent-red">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
                  </svg>
                </div>
                <h3 className="jyc-h3">Our Vision</h3>
                <p className="mt-3 leading-relaxed text-jyc-text-muted">{VISION}</p>
              </Card>
            </ScrollAnimation>
            <ScrollAnimation delay={160}>
              <Card className="h-full p-8">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-jyc-accent-gold/20 text-jyc-accent-gold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                </div>
                <h3 className="jyc-h3">Our Mission</h3>
                <p className="mt-3 leading-relaxed text-jyc-text-muted">{MISSION}</p>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="jyc-section">
        <div className="jyc-container">
          <ScrollAnimation>
            <SectionHeader
              title="What JYC Does"
              subtitle="Tap each section to see how the club runs."
            />
          </ScrollAnimation>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {WHAT_WE_DO.map((item, index) => (
              <ScrollAnimation key={item.title} delay={index * 60}>
                <details
                  className="jyc-card group overflow-hidden"
                  style={{
                    borderLeft: "3px solid var(--accent-gold)",
                  }}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
                    <span className="jyc-h3">{item.title}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="shrink-0 text-jyc-accent-gold transition-transform duration-300 group-open:rotate-180"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed text-jyc-text-muted sm:px-6 sm:pb-6">
                    {item.text}
                  </p>
                </details>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="jyc-section" style={{ backgroundColor: "var(--bg-elevated)" }}>
        <div className="jyc-container">
          <ScrollAnimation>
            <SectionHeader
              title="Our Journey"
              subtitle="Placeholder milestones — replace with JYC's official story."
            />
          </ScrollAnimation>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative border-l-2 border-jyc-accent-gold pl-8">
              {MILESTONES.map((milestone, index) => (
                <ScrollAnimation key={milestone.year} delay={index * 80}>
                  <div className="relative pb-10 last:pb-0">
                    <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border-2 bg-jyc-bg-main" style={{ borderColor: "var(--accent-gold)" }}>
                      <span className="h-2 w-2 rounded-full bg-jyc-accent-red" />
                    </span>
                    <p className="text-sm font-extrabold uppercase tracking-widest text-jyc-accent-gold">
                      {milestone.year}
                    </p>
                    <h3 className="jyc-h3 mt-1">{milestone.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-jyc-text-muted">
                      {milestone.text}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}