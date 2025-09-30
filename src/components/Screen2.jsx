"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function Screen2({ onNext }) {
  const [showPopup, setShowPopup] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.3,
        speed: Math.random() * 1.2 + 0.5,
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
    }, 60)

    return () => clearInterval(interval)
  }, [])

  const handleNo = () => setShowPopup(true)
  const handleYes = () => onNext()

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-900">

        {/* Floating Particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              opacity: p.opacity
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [p.opacity, p.opacity * 1.4, p.opacity]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Blobs */}
        <motion.div
          className="absolute -top-44 -left-44 w-72 h-72 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
          animate={{ x: [0, -70, 0], y: [0, -40, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent leading-relaxed"
          >
            Are you alone?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-8"
          >
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0 0 35px rgba(34,197,94,0.45)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-full text-xl shadow-lg transition-all duration-300"
            >
              Yes
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0 0 35px rgba(239,68,68,0.45)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNo}
              className="px-10 py-4 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold rounded-full text-xl shadow-lg transition-all duration-300"
            >
              No
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-8 rounded-2xl max-w-md text-center border border-purple-500/20"
              style={{ boxShadow: "0 0 50px rgba(168,85,247,0.25)" }}
              onClick={e => e.stopPropagation()}
            >
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xl text-purple-100 mb-6 leading-relaxed"
              >
                Take a quiet moment… this little surprise is made just for you 💝
              </motion.p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 35px rgba(236,72,153,0.45)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPopup(false)}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-semibold rounded-full shadow-lg border border-white/20"
              >
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
