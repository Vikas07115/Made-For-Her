"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function BackgroundEffects() {
  const [stars, setStars] = useState([])
  const [shootingStars, setShootingStars] = useState([])

  useEffect(() => {
    // 🌌 Twinkling Stars
    const newStars = []
    for (let i = 0; i < 120; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 2 + 2, // for subtle parallax
      })
    }
    setStars(newStars)

    // 🌠 Shooting Stars Generator
    const interval = setInterval(() => {
      const id = Date.now()
      setShootingStars(prev => [
        ...prev,
        {
          id,
          x: Math.random() * 100,
          y: Math.random() * 50,
        },
      ])

      // Remove old shooting star after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== id))
      }, 1500)
    }, 4000) // one every ~4s

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* ✨ Twinkling Stars */}
      {stars.map(star => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.4,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🌠 Shooting Stars */}
      {shootingStars.map(star => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute h-[2px] w-[80px] bg-gradient-to-r from-white via-blue-200 to-transparent rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: 0.7,
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: -300,
            y: 200,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ✨ Soft Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  )
}
