"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Sparkles } from "lucide-react"
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
    funny: "/placeholder-kosqn.png",
    serious: "/placeholder.svg?height=290&width=390",
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
  const pencilRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)

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

function AnimatedTitle({ phrases, currentIndex }: { phrases: string[]; currentIndex: number }) {
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

function PencilAnimation({ progress }: { progress: number }) {
  const pathLength = 400 // Approximate path length
  const currentLength = pathLength * progress

  return (
    <div className="absolute top-1/2 left-0 w-full h-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-32" viewBox="0 0 800 100" style={{ transform: "translateY(-50%)" }}>
        {/* Drawn line */}
        <path
          d="M50,50 Q200,30 400,50 T750,50"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          fill="none"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - currentLength}
          className="transition-all duration-100 ease-out"
        />

        {/* Pencil */}
        <g
          transform={`translate(${50 + 700 * progress}, ${50 + Math.sin(progress * Math.PI * 2) * 5})`}
          className={cn("transition-all duration-100 ease-out", progress > 0 ? "opacity-100" : "opacity-0")}
          style={{
            transform: `translate(${50 + 700 * progress}px, ${50 + Math.sin(progress * Math.PI * 2) * 5}px) rotate(${progress * 10}deg)`,
          }}
        >
          {/* Pencil body */}
          <rect x="-15" y="-2" width="30" height="4" fill="#FFD700" rx="2" />
          {/* Pencil tip */}
          <polygon points="15,-2 20,0 15,2" fill="#333" />
          {/* Glow effect */}
          <circle cx="18" cy="0" r="3" fill="rgba(255,215,0,0.6)" className="animate-pulse" />
        </g>
      </svg>
    </div>
  )
}

function ImageGallery({
  images,
  hoveredImage,
  onImageHover,
}: {
  images: typeof CONTENT_IMAGES
  hoveredImage: number | null
  onImageHover: (index: number | null) => void
}) {
  const positions = [
    { top: "10%", left: "15%", rotation: -5 },
    { top: "25%", right: "20%", rotation: 8 },
    { top: "45%", left: "10%", rotation: -3 },
    { top: "60%", right: "15%", rotation: 6 },
    { top: "15%", left: "50%", rotation: -8 },
    { top: "70%", left: "45%", rotation: 4 },
  ]

  return (
    <div className="relative h-screen">
      {/* Background overlay when hovering */}
      <div
        className={cn(
          "absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-700 ease-out",
          hoveredImage !== null ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      {images.map((imageSet, index) => {
        const position = positions[index]
        const isHovered = hoveredImage === index
        const isOtherHovered = hoveredImage !== null && hoveredImage !== index

        return (
          <div
            key={index}
            className={cn(
              "absolute transition-all duration-700 ease-out cursor-pointer",
              isOtherHovered ? "opacity-30 scale-90 blur-sm" : "opacity-100 scale-100 blur-0",
              isHovered ? "z-20 scale-110" : "z-10",
            )}
            style={{
              ...position,
              transform: `rotate(${position.rotation}deg) ${isHovered ? "scale(1.1)" : "scale(1)"}`,
            }}
            onMouseEnter={() => onImageHover(index)}
            onMouseLeave={() => onImageHover(null)}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Funny image (default) */}
              <img
                src={imageSet.funny || "/placeholder.svg"}
                alt={`Content example ${index + 1}`}
                className={cn(
                  "w-full h-full object-cover transition-all duration-700 ease-out",
                  isHovered ? "opacity-0" : "opacity-100",
                )}
              />

              {/* Serious image (on hover) */}
              <img
                src={imageSet.serious || "/placeholder.svg"}
                alt={`Serious content example ${index + 1}`}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
                  isHovered ? "opacity-100" : "opacity-0",
                )}
              />

              {/* Hover glow effect */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent transition-all duration-700 ease-out",
                  isHovered ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function GridBackground({ scrollY }: { scrollY: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      {/* Vertical lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-white/10"
          style={{
            left: `${(i + 1) * 8.33}%`,
            transform: `translateY(${(scrollY * 0.1 * (i % 3)) % 100}px)`,
          }}
        />
      ))}

      {/* Horizontal lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-white/10"
          style={{
            top: `${(i + 1) * 12.5}%`,
            transform: `translateX(${(scrollY * 0.05 * (i % 2)) % 50}px)`,
          }}
        />
      ))}
    </div>
  )
}
