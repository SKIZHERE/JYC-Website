import { getTeamLevels } from "@/lib/data"
import TeamCard from "@/components/TeamCard"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"

export const metadata = {
  title: "Team | JYC — JIIT Youth Club",
  description:
    "Meet the leadership cabinet, hub heads, and core team driving the JIIT Youth Club.",
}

const LEVELS = [
  {
    key: "leadership",
    title: "Leadership",
    subtitle: "The cabinet charting JYC's course for the year.",
  },
  {
    key: "hub-heads",
    title: "Hub Heads",
    subtitle: "Leaders steering each of the six hubs.",
  },
  {
    key: "core",
    title: "Core Team",
    subtitle: "The doers turning plans into reality.",
  },
]

export default function TeamPage() {
  const levels = getTeamLevels()

  return (
    <section className="jyc-section pt-28 lg:pt-36">
      <div className="jyc-container">
        <ScrollAnimation>
          <SectionHeader
            title="Meet the Team"
            subtitle="Placeholder names and photos — swap in the official JYC roster when ready."
          />
        </ScrollAnimation>

        <div className="mt-12 space-y-20">
          {LEVELS.map((group) => {
            const members = levels[group.key]
            if (!members || members.length === 0) return null
            return (
              <div key={group.key}>
                <ScrollAnimation>
                  <div className="text-center">
                    <h2 className="jyc-h2">{group.title}</h2>
                    <p className="mt-2 text-sm text-jyc-text-muted">{group.subtitle}</p>
                  </div>
                </ScrollAnimation>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((member, index) => (
                    <ScrollAnimation key={member.id} delay={index * 60}>
                      <TeamCard member={member} />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}