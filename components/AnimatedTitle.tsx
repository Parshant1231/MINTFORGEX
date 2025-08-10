"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTitleProps {
  phrases: string[]
  currentIndex: number
}

export function AnimatedTitle({ phrases, currentIndex }: AnimatedTitleProps) {
  const [displayText, setDisplayText] = useState(phrases[0])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (currentIndex === 0 && displayText === phrases[0]) return

    setIsAnimating(true)

    // Smooth transition effect
    const timer = setTimeout(() => {
      setDisplayText(phrases[currentIndex])
      setIsAnimating(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [currentIndex, phrases, displayText])

  return (
    <span
      className={cn(
        "inline-block transition-all duration-500 ease-out",
        isAnimating ? "opacity-0 transform scale-95 blur-sm" : "opacity-100 transform scale-100 blur-0",
      )}
    >
      {displayText}
    </span>
  )
}
