import GalleryExplorer from "@/components/GalleryExplorer"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"

export const metadata = {
  title: "Gallery | JYC — JIIT Youth Club",
  description:
    "Browse photo highlights from JYC events — hackathons, cultural fests, sports meets, workshops, and drives.",
}

export default function GalleryPage() {
  return (
    <section className="jyc-section pt-28 lg:pt-36">
      <ScrollAnimation>
        <div className="jyc-container">
          <SectionHeader
            title="Gallery"
            subtitle="Every moment we capture becomes a memory worth keeping."
          />
        </div>
      </ScrollAnimation>
      <GalleryExplorer />
    </section>
  )
}