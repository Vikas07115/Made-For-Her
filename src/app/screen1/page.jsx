"use client"

import { useRouter } from "next/navigation"
import Screen1 from "@/components/Screen1"

export default function Screen1Page() {
  const router = useRouter()

  const handleNext = () => {
    // Continue your main flow from the homepage (or change to "/screen2" if you have that route)
    router.replace("/")
  }

  return <Screen1 onNext={handleNext} />
}


