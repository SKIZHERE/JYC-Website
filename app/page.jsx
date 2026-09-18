import HeroSection from "@/components/home/HeroSection"
import WhatIsJYC from "@/components/home/WhatIsJYC"
import KeyActivities from "@/components/home/KeyActivities"
import HubsPreview from "@/components/home/HubsPreview"
import FeaturedEvents from "@/components/home/FeaturedEvents"
import PastEventsImpact from "@/components/home/PastEventsImpact"
import GalleryPreview from "@/components/home/GalleryPreview"

export const metadata = {
  title: "JYC — JIIT Youth Club",
  description:
    "The JIIT Youth Club (JYC) — a student-run community at JIIT Sector 62 fostering innovation, culture, and social impact through events, hubs, and volunteering.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsJYC />
      <KeyActivities />
      <HubsPreview />
      <FeaturedEvents />
      <PastEventsImpact />
      <GalleryPreview />
    </>
  )
}