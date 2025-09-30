"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Screen3({ onNext }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 1.5 + 0.5,
        direction: Math.random() * 360,
      }))
      setParticles(newParticles)
    }

    generateParticles()
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: (p.x + Math.cos(p.direction * Math.PI / 180) * p.speed + window.innerWidth) % window.innerWidth,
          y: (p.y + Math.sin(p.direction * Math.PI / 180) * p.speed + window.innerHeight) % window.innerHeight
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-900">
      
      {/* Floating Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ scale: [1, 1.3, 1], opacity: [p.opacity, p.opacity * 1.3, p.opacity] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Gradient Blobs */}
      <motion.div
        className="absolute -top-44 -left-44 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500/25 to-purple-500/25 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/25 to-purple-400/25 blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center"
      >

        {/* GIF Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 relative p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 to-purple-400/15 blur-sm rounded-3xl" />
          <motion.img
            src="/gifs/screen3.gif"
            alt="Looking closer"
            className="w-44 h-44 relative z-10"
            animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-snug relative"
        >
          Come a Little closer<span className="text-white"> ✨</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-pink-400/20 blur-xl -z-10" />
        </motion.h1>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 50px rgba(236, 72, 153, 0.7), 0 0 80px rgba(168, 85, 247, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="relative px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl text-xl overflow-hidden shadow-lg"
            style={{ boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)" }}
          >
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative z-10">I’m closer 💞</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
