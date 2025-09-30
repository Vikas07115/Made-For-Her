"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function VideoScreen() {
  const videoRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const video = videoRef.current 
    if (video) {
      video.play()

      // Redirect to Screen1 after video ends
      const handleEnded = () => {
        router.replace("/screen1")
      }

      video.addEventListener("ended", handleEnded)

      return () => video.removeEventListener("ended", handleEnded)
    }
  }, [router])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted={false}
        playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70"
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  )
}
