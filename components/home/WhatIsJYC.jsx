import ScrollAnimation from "@/components/ScrollAnimation"

export default function WhatIsJYC() {
  return (
    <section className="jyc-section">
      <div className="jyc-container">
        <ScrollAnimation>
          <div
            className="jyc-card mx-auto max-w-4xl border-l-4 p-8 sm:p-10"
            style={{ borderLeftColor: "var(--accent-gold)" }}
          >
            <h2 className="jyc-h3 font-extrabold uppercase tracking-wide text-jyc-accent-red">
              What is JYC?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-jyc-text-primary sm:text-lg">
              {`The JIIT Youth Club (JYC) is the heartbeat of student life at JIIT
              Sector 62. Run by students, for students, we turn ideas into
              festivals, classrooms into labs, and volunteers into leaders.`}
            </p>
            <p className="mt-3 text-base leading-relaxed text-jyc-text-muted sm:text-lg">
              {`From 24-hour hackathons to campus clean drives, cultural fests to
              inter-college sports meets — JYC is where you find your people, build
              your skills, and leave a mark.`}
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}