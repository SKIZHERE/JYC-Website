"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"

export default function Card({ children, className = "", as: Tag = "div", ...rest }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    setRotateX(-yPct * 12)
    setRotateY(xPct * 12)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`jyc-card relative transition-shadow duration-300 will-change-transform hover:shadow-lift ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}