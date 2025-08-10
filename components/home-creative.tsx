"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ChevronLeft, ChevronRight, Sparkle, Sparkles, Shuffle, Laugh, Video } from "lucide-react"
import { cn } from "@/lib/utils"

type Idea = {
  id: string
  title: string
  hook: string
  tags: string[]
  duration: string
  vibe: "quirky" | "tutorial" | "challenge" | "storytime" | "aesthetic"
}

const BASE_IDEAS: Idea[] = [
  {
    id: "1",
    title: "Microwave Gourmet in 60s",
    hook: "Turn leftovers into a '5-star' dish with only a microwave.",
    tags: ["food", "hack", "budget"],
    duration: "0:60",
    vibe: "quirky",
  },
  {
    id: "2",
    title: "Silent Disco Cooking",
    hook: "Cook a full recipe using dance moves as instructions only.",
    tags: ["dance", "cooking", "no-voice"],
    duration: "0:45",
    vibe: "aesthetic",
  },
  {
    id: "3",
    title: "Random Color Challenge",
    hook: "Pick 3 random colors and style an outfit that actually works.",
    tags: ["fashion", "challenge", "style"],
    duration: "0:30",
    vibe: "challenge",
  },
  {
    id: "4",
    title: "Mini Mythbusters",
    hook: "Test a viral ‘life hack’ using items from a dollar store.",
    tags: ["science", "myth", "budget"],
    duration: "0:40",
    vibe: "tutorial",
  },
  {
    id: "5",
    title: "Emoji Recipe",
    hook: "Followers pick 4 emojis. You must cook a dish that matches them.",
    tags: ["interactive", "food", "fun"],
    duration: "0:50",
    vibe: "quirky",
  },
  {
    id: "6",
    title: "Desk Makeover ASMR",
    hook: "Transform a messy desk into a dreamy setup with ASMR sounds.",
    tags: ["aesthetic", "asmr", "productivity"],
    duration: "0:35",
    vibe: "aesthetic",
  },
  {
    id: "7",
    title: "One-Minute Origin Story",
    hook: "Explain a random object’s history in exactly 60 seconds.",
    tags: ["history", "education", "storytime"],
    duration: "0:60",
    vibe: "storytime",
  },
]

function useRandomIdea() {
  const adjectives = [
    "chaotic",
    "hyper-minimal",
    "retro",
    "cozy",
    "lo-fi",
    "glitchy",
    "wholesome",
    "speedrun",
    "zero-waste",
    "tiny",
  ]
  const frames = [
    "POV",
    "before/after",
    "1 take",
    "no cuts",
    "reverse",
    "stop-motion",
    "duet",
    "split-screen",
    "voice-over only",
    "caption-only",
  ]
  const topics = [
    "morning routine",
    "pet tricks",
    "desk setup",
    "street interview",
    "tiny recipe",
    "closet flip",
    "mini-documentary",
    "dance tutorial",
    "sound design",
    "color theory",
  ]
  const vibes: Idea["vibe"][] = ["quirky", "tutorial", "challenge", "storytime", "aesthetic"]
  const tagsPool = [
    "trend",
    "loopable",
    "satisfying",
    "first-person",
    "comedy",
    "hack",
    "budget",
    "aesthetic",
    "micro-story",
    "challenge",
  ]

  return () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const frame = frames[Math.floor(Math.random() * frames.length)]
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const vibe = vibes[Math.floor(Math.random() * vibes.length)]
    const tags = Array.from({ length: 3 }, () => tagsPool[Math.floor(Math.random() * tagsPool.length)])
    const secs = [20, 25, 30, 35, 40, 45, 50, 60][Math.floor(Math.random() * 8)]
    return {
      id: crypto.randomUUID(),
      title: `${adj} ${topic} (${frame})`,
      hook: `Make a ${adj} ${topic} using a ${frame} format — fast, fun, and loopable.`,
      tags: Array.from(new Set(tags)),
      duration: `0:${secs.toString().padStart(2, "0")}`,
      vibe,
    } as Idea
  }
}

export default function HomeCreative() {
  const { toast } = useToast()
  const [ideas, setIdeas] = useState<Idea[]>(BASE_IDEAS)
  const [query, setQuery] = useState("")
  const [activeGlow, setActiveGlow] = useState(false)
  const randomIdea = useRandomIdea()

  const filtered = useMemo(() => {
    if (!query) return ideas
    const q = query.toLowerCase()
    return ideas.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.hook.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [ideas, query])

  // Carousel refs and logic
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const scrollBy = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" })
  }

  const startDrag = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    isDragging.current = true
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
    trackRef.current.classList.add("cursor-grabbing")
  }
  const onDrag = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.2
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }
  const endDrag = () => {
    if (!trackRef.current) return
    isDragging.current = false
    trackRef.current.classList.remove("cursor-grabbing")
  }

  const handleRandom = () => {
    setActiveGlow(true)
    const idea = randomIdea()
    setIdeas((prev) => [idea, ...prev])
    toast({
      title: "New random idea added",
      description: idea.title,
    })
    // Nudge scroll to start to highlight the new card
    setTimeout(() => {
      trackRef.current?.scrollTo({ left: 0, behavior: "smooth" })
      setActiveGlow(false)
    }, 250)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const wheelHandler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollBy({ left: e.deltaY, behavior: "smooth" })
        e.preventDefault()
      }
    }
    el.addEventListener("wheel", wheelHandler, { passive: false })
    return () => el.removeEventListener("wheel", wheelHandler)
  }, [])

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <BackgroundDecor />

      <header className="relative z-10 container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-teal-400 via-fuchsia-500 to-amber-300 shadow-sm"
            aria-hidden="true"
          ></div>
          <div className="text-lg font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-teal-500 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent">
              ShortSpark
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Badge className="bg-teal-500/20 text-teal-900 dark:text-teal-100 border border-teal-500/30 rounded-full">
            Playful UI
          </Badge>
          <Badge className="bg-fuchsia-500/20 text-fuchsia-900 dark:text-fuchsia-100 border border-fuchsia-500/30 rounded-full">
            Creator Friendly
          </Badge>
          <Badge className="bg-amber-400/20 text-amber-900 dark:text-amber-900 border border-amber-400/30 rounded-full">
            Fast Ideas
          </Badge>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 pb-36">
        <section className="py-6 md:py-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95]">
              <span className="inline-block bg-gradient-to-br from-fuchsia-500 via-amber-400 to-teal-400 bg-clip-text text-transparent">
                Get Your Next Viral Idea!
              </span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-black/70">
              A vibrant playground for creators—spin up quirky, scroll-stopping shorts prompts in seconds.
            </p>
          </div>

          <div className="mt-6 flex w-full max-w-xl rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-2 shadow-sm">
            <Input
              aria-label="Search ideas"
              placeholder="Search ideas, tags, vibes…"
              className="border-0 bg-transparent focus-visible:ring-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="secondary" className="rounded-xl bg-black/70 text-white hover:bg-black/80">
              <Sparkles className="mr-2 h-4 w-4" />
              Surprise
            </Button>
          </div>
        </section>

        <section aria-label="Suggestion carousel" className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-fuchsia-500" />
              <h2 className="text-lg font-semibold">Quirky, engaging shorts prompts</h2>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous"
                onClick={() => scrollBy(-360)}
                className="rounded-full bg-white/30 hover:bg-white/50 backdrop-blur border border-white/40"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next"
                onClick={() => scrollBy(360)}
                className="rounded-full bg-white/30 hover:bg-white/50 backdrop-blur border border-white/40"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="relative flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth cursor-grab"
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseLeave={endDrag}
            onMouseUp={endDrag}
            role="region"
            aria-roledescription="carousel"
            aria-label="Idea cards"
          >
            {filtered.map((idea, idx) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                className={cn(
                  "snap-start",
                  idx === 0 && activeGlow
                    ? "ring-2 ring-amber-300 shadow-[0_0_25px_6px_rgba(251,191,36,0.45)] transition-all"
                    : "",
                )}
              />
            ))}
            {filtered.length === 0 && <EmptyCard query={query} onReset={() => setQuery("")} />}
          </div>
        </section>
      </main>

      <RandomButton onClick={handleRandom} />

      <Toaster />

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(20px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-10px, 20px) scale(0.98);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes floaty {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  )
}

function IdeaCard({ idea, className = "" }: { idea: Idea; className?: string }) {
  return (
    <Card
      className={cn(
        "group relative min-w-[78%] xs:min-w-[70%] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px]",
        "rounded-3xl border-white/30 bg-white/20 backdrop-blur-xl",
        "transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "rounded-full border-0",
                idea.vibe === "quirky" && "bg-amber-300/70 text-amber-900",
                idea.vibe === "tutorial" && "bg-teal-300/70 text-teal-900",
                idea.vibe === "challenge" && "bg-fuchsia-300/70 text-fuchsia-900",
                idea.vibe === "storytime" && "bg-purple-300/70 text-purple-900",
                idea.vibe === "aesthetic" && "bg-rose-300/70 text-rose-900",
              )}
            >
              {idea.vibe}
            </Badge>
          </div>
          <div className="text-xs text-black/60">{idea.duration}</div>
        </div>
        <h3 className="mt-2 text-xl font-extrabold leading-snug">{idea.title}</h3>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-black/70">{idea.hook}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {idea.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-black/5 border border-black/10">
              #{t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-black/60">
          <Sparkle className="h-4 w-4 text-fuchsia-500" />
          <span>Tip: Make it loop seamlessly.</span>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyCard({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className="min-w-[80%] sm:min-w-[500px] rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl p-8">
      <div className="flex items-start gap-3">
        <Laugh className="h-6 w-6 text-fuchsia-500" />
        <div>
          <div className="text-lg font-semibold">No matches for "{query}"</div>
          <div className="text-sm text-black/70 mt-1">
            Try a different word or clear the search. You can also hit Random!
          </div>
          <Button onClick={onReset} className="mt-4 rounded-xl">
            Clear search
          </Button>
        </div>
      </div>
    </div>
  )
}

function RandomButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-20">
      <Button
        onClick={onClick}
        className={cn(
          "group relative h-14 rounded-full px-5 text-base font-bold",
          "bg-gradient-to-r from-amber-300 via-fuchsia-400 to-teal-400 text-black",
          "shadow-[0_0_25px_6px_rgba(251,191,36,0.45)] hover:shadow-[0_0_35px_10px_rgba(251,191,36,0.55)]",
          "ring-2 ring-amber-300/80 hover:ring-amber-400/90",
          "transition-all",
        )}
        aria-label="Random Idea"
      >
        <span
          className="absolute -inset-2 rounded-full blur-2xl opacity-60 bg-gradient-to-r from-amber-300 via-fuchsia-400 to-teal-400 -z-10"
          aria-hidden="true"
        />
        <Shuffle className="mr-2 h-5 w-5" />
        Random Idea
      </Button>
    </div>
  )
}

function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_10%_10%,rgba(34,197,94,0.20),transparent),radial-gradient(50%_50%_at_90%_10%,rgba(244,63,94,0.20),transparent),radial-gradient(50%_50%_at_10%_90%,rgba(217,70,239,0.20),transparent),radial-gradient(50%_50%_at_90%_90%,rgba(251,191,36,0.25),transparent)]" />

      {/* Blobs */}
      <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-gradient-to-br from-teal-300 via-fuchsia-400 to-amber-300 opacity-60 blur-2xl animate-[blob_22s_ease-in-out_infinite]" />
      <div className="absolute top-[30%] -right-20 h-80 w-80 rounded-full bg-gradient-to-tr from-amber-300 via-fuchsia-400 to-purple-400 opacity-50 blur-2xl animate-[blob_18s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gradient-to-tr from-fuchsia-400 via-purple-400 to-teal-300 opacity-40 blur-3xl animate-[blob_26s_ease-in-out_infinite]" />

      {/* Soft glass layer */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      {/* Wave pattern (subtle) */}
      <svg
        className="absolute inset-x-0 top-0 h-40 w-full opacity-40"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f472b6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path d="M0,80 C240,140 480,20 720,80 C960,140 1200,60 1440,120 L1440,0 L0,0 Z" fill="url(#waveGrad)" />
      </svg>

      {/* Floating dots */}
      <div className="absolute left-6 top-24 h-2 w-2 rounded-full bg-fuchsia-400 animate-[floaty_5s_ease-in-out_infinite]" />
      <div className="absolute left-10 top-36 h-2 w-2 rounded-full bg-amber-300 animate-[floaty_6s_ease-in-out_infinite]" />
      <div className="absolute right-12 top-20 h-2 w-2 rounded-full bg-teal-300 animate-[floaty_7s_ease-in-out_infinite]" />
    </div>
  )
}
