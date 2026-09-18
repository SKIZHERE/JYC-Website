"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "@/components/Lightbox"
import { getGallery, getGalleryCategories } from "@/lib/data"

export default function GalleryExplorer() {
  const photos = getGallery()
  const categories = getGalleryCategories()
  const [category, setCategory] = useState("all")
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const visible =
    category === "all" ? photos : photos.filter((photo) => photo.category === category)

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            category === "all"
              ? "bg-jyc-accent-red text-white"
              : "border border-solid border-jyc-border-tech text-jyc-text-muted hover:border-jyc-accent-gold hover:text-jyc-accent-gold"
          }`}
        >
          All
        </button>
        {categories.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setCategory(key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-colors ${
              category === key
                ? "bg-jyc-accent-red text-white"
                : "border border-solid border-jyc-border-tech text-jyc-text-muted hover:border-jyc-accent-gold hover:text-jyc-accent-gold"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl"
              style={{ border: "1px solid var(--border-tech)", backgroundColor: "var(--bg-card)" }}
              aria-label={`View photo: ${photo.caption}`}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8 text-left text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {photo.caption}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm font-medium uppercase tracking-wide text-jyc-text-muted">
          No photos in this category yet
        </p>
      )}

      {lightboxIndex !== null && visible[lightboxIndex] && (
        <Lightbox
          items={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}