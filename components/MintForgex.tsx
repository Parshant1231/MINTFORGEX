"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Sparkles } from "lucide-react"
import { AnimatedTitle } from "./AnimatedTitle"
import { ImageGallery } from "./ImageGallery"
import { GridBackground } from "./GridBackground"
import { PencilAnimation } from "./PencilAnimation"
import { cn } from "@/lib/utils"

const TITLE_PHRASES = [
  "We Have Many",
  "Find Your Next Viral Idea",
  "Create Stories That Stick",
  "Spark Creative Magic",
  "Build Engaging Content",
]

const CONTENT_IMAGES = [
  {
    funny: "/funny-meme-creator-laughing.png",
    serious: "/serious-content-creator.png",
  },
  {
    funny: "/silly-dance-bts.png",
    serious: "/cinematic-video-setup.png",
  },
  {
    funny: "/comedy-sketch.png",
    serious: "/documentary-filmmaker.png",
  },
  {
    funny: "/funny-cooking-fail.png",
    serious: "/chef-demonstration.png",
  },
  {
    funny: "/funny-pet-tricks.png",
    serious: "/animal-documentary.png",
  },
  {
    funny: "/placeholder.svg?height=300&width=400",
    serious: "/placeholder.svg?height=300&width=400",
  },
]

export default function MintForgex() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [pencilProgress, setPencilProgress] = useState(0)
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)

  const searchRef = useRef<HTMLInputElement>(null)

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
    setCurrentTitleIndex((prev) => (prev + 1) % TITLE_PHRASES.length)
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
    handleSearchClick()
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Grid Background */}
      <GridBackground scrollY={scrollY} />

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-white mb-2 relative">
            <span className="relative z-10">MintForgex</span>
            <div className="absolute inset-0 text-teal-400 blur-sm opacity-60 animate-pulse">MintForgex</div>
          </h1>
          <p className="text-sm text-gray-300 uppercase tracking-widest font-medium">AI POWERED</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6">
        {/* Title Section */}
        <section className="text-center py-16 relative">
          <div className="h-24 flex items-center justify-center mb-12">
            <h2 className="text-5xl md:text-7xl font-extrabold font-poppins leading-tight">
              <AnimatedTitle phrases={TITLE_PHRASES} currentIndex={currentTitleIndex} />
            </h2>
          </div>

          {/* Pencil Animation */}
          <PencilAnimation progress={pencilProgress} />

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div
              className={cn(
                "relative transition-all duration-500 ease-out",
                isSearchFocused ? "scale-105" : "scale-100",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl transition-all duration-300",
                  isSearchFocused ? "bg-teal-400/20 blur-xl scale-110" : "bg-transparent",
                )}
              />

              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                <Input
                  ref={searchRef}
                  placeholder="What kind of content do you want to create?"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={() => setIsSearchFocused(false)}
                  onClick={handleSearchClick}
                  className="border-0 bg-transparent text-black text-lg px-6 py-4 focus-visible:ring-0 placeholder:text-gray-500"
                />
                <Button
                  className="m-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-6 transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={handleSearchClick}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-20">
          <div className="relative">
            <ImageGallery images={CONTENT_IMAGES} hoveredImage={hoveredImage} onImageHover={setHoveredImage} />
          </div>
        </section>
      </main>

      {/* Floating Action */}
      <div className="fixed bottom-8 right-8 z-20">
        <Button className="h-14 w-14 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95">
          <Sparkles className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
