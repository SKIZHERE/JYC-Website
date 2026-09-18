import Image from "next/image"
import Link from "next/link"
import { getGallery } from "@/lib/data"
import ScrollAnimation from "@/components/ScrollAnimation"
import SectionHeader from "@/components/ui/SectionHeader"
import Button from "@/components/ui/Button"

const ASPECTS = [
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
]

export default function GalleryPreview() {
  const photos = getGallery().slice(0, 6)

  return (
    <section className="jyc-section" style={{ backgroundColor: "var(--bg-elevated)" }}>
      <div className="jyc-container">
        <ScrollAnimation>
          <SectionHeader
            title="Moments from the Club"
            subtitle="Hackathons, fests, drives, and everything in between — captured by JYC's media team."
          />
        </ScrollAnimation>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((photo, index) => (
            <ScrollAnimation
              key={photo.id}
              animation={index % 2 === 0 ? "slide-left" : "slide-right"}
              delay={(index % 3) * 80}
            >
              <Link
                href="/gallery"
                className="relative block overflow-hidden rounded-xl bg-jyc-bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                style={{ border: "1px solid var(--border-tech)" }}
              >
                <div className={`relative ${ASPECTS[index % ASPECTS.length]} overflow-hidden`}>
                  <Image
                    src={photo.imageUrl}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/gallery" variant="secondary">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  )
}