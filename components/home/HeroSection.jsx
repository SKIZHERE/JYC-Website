import Image from "next/image"
import Button from "@/components/ui/Button"
import ScrollAnimation from "@/components/ScrollAnimation"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/hero/hero-main.svg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="jyc-tech-circuit absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div className="jyc-container relative z-10 flex flex-col items-center py-32 text-center">
        <ScrollAnimation animation="fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-jyc-accent-gold/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-jyc-accent-gold sm:text-sm">
            JIIT Youth Club · Since 2014
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={120}>
          <h1 className="jyc-h1 max-w-4xl text-white">
            Empowering The Leaders{" "}<br />
            <span className="jyc-gradient-text">of Tomorrow</span>
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={240}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {`JIIT Youth Club- Your platform to soar and achieve your potential.`}
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={360}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" size="lg">
              Get Involved
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}