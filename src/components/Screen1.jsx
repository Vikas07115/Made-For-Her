"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Instagram } from "lucide-react" // make sure lucide-react is installed

export default function Screen1({ onNext }) {
  const [particles, setParticles] = useState([])

  // floating background dots
  useEffect(() => {
    const gen = () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.3,
        speed: Math.random() * 1.4 + 0.4,
        dir: Math.random() * 360,
      }))
    setParticles(gen())

    const tick = setInterval(() => {
      setParticles(p =>
        p.map(q => ({
          ...q,
          x: (q.x + Math.cos((q.dir * Math.PI) / 180) * q.speed + window.innerWidth) % window.innerWidth,
          y: (q.y + Math.sin((q.dir * Math.PI) / 180) * q.speed + window.innerHeight) % window.innerHeight,
        }))
      )
    }, 50)
    return () => clearInterval(tick)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-900">
      {/* subtle star particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ scale: [1, 1.3, 1], opacity: [p.opacity, p.opacity * 1.4, p.opacity] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* dreamy gradient orbs */}
      <motion.div
        className="absolute -top-52 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/25 to-purple-500/25 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-56 -right-44 w-[28rem] h-[28rem] rounded-full bg-gradient-to-r from-cyan-400/25 to-purple-400/25 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        {/* floating gif card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-10 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/15 to-purple-400/15 blur-sm" />
          <motion.img
            src="/gifs/screen1.gif"
            alt="Heart gif"
            className="w-44 h-44 object-contain relative z-10"
            animate={{ y: [0, -12, 0], rotate: [0, 2.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* subtle floating hearts */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400 text-2xl"
              style={{ left: `${18 + i * 14}%`, top: `${15 + (i % 2) * 70}%` }}
              animate={{ y: [0, -18, 0], opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.25 }}
            >
              ❤️
            </motion.div>
          ))}
        </motion.div>

        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-snug relative mb-10"
        >
          <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            I have something special for you,
          </span>
          <br />
          <motion.span
            className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Cutiepiee
          </motion.span>
          <motion.span
            className="text-white ml-2"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 blur-xl -z-10" />
        </motion.h1>

        {/* next button */}
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 55px rgba(236,72,153,0.7),0 0 90px rgba(168,85,247,0.5)",
          }}
          whileTap={{ scale: 0.94 }}
          onClick={onNext}
          className="relative px-12 py-5 text-lg md:text-xl font-semibold text-white rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2, #f093fb)",
            boxShadow: "0 0 35px rgba(102,126,234,0.4)",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10 flex items-center gap-3">
            <motion.span
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.span>
            Next
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </span>
        </motion.button>

        {/* side "Created By" with Instagram icon */}
        <div className="absolute top-4 right-4 flex items-center gap-2 text-white cursor-pointer">
          <span className="text-sm font-medium">Created By Vikas Mehta</span>
          <a
            href="https://www.instagram.com/__v__mehta/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
