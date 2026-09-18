"use client"

import { useEffect, useRef, useState } from "react"

const HIDDEN_STYLES = {
  "fade-in": { opacity: 0 },
  "fade-up": { opacity: 0, transform: "translateY(32px)" },
  "slide-left": { opacity: 0, transform: "translateX(-48px)" },
  "slide-right": { opacity: 0, transform: "translateX(48px)" },
}

export default function ScrollAnimation({
  children,
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  const hidden = HIDDEN_STYLES[animation] || HIDDEN_STYLES["fade-up"]

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...hidden,
        opacity: visible ? 1 : hidden.opacity,
        transform: visible ? "none" : hidden.transform || "none",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}