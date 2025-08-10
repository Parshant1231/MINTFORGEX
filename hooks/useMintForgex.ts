"use client"

import { useEffect, useState } from "react"

export function useMintForgex() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [pencilProgress, setPencilProgress] = useState(0)
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Pencil animation
  useEffect(() => {
    const animatePencil = () => {
      const duration = 3000
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth animation
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        setPencilProgress(easeProgress)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }

    const timer = setTimeout(animatePencil, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSearchClick = () => {
    setCurrentTitleIndex((prev) => (prev + 1) % 5) // Assuming 5 phrases
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
    handleSearchClick()
  }

  return {
    currentTitleIndex,
    isSearchFocused,
    searchValue,
    pencilProgress,
    hoveredImage,
    scrollY,
    setSearchValue,
    setHoveredImage,
    handleSearchClick,
    handleSearchFocus,
    setIsSearchFocused,
  }
}
