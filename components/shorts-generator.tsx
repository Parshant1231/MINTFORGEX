"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ChevronLeft, ChevronRight, Sparkles, Shuffle, Lightbulb, Zap, Film, Laugh, Ghost } from "lucide-react"
import { cn } from "@/lib/utils"

type ThemeMood = "funny" | "cinematic" | "suspense" | "horror" | "storytelling"

type Idea = {
  id: string
  title: string
  hook: string
  tags: string[]
  duration: string
  mood: ThemeMood
}

const THEME_MOODS: { mood: ThemeMood; tagline: string; color: string; animation: string }[] = [
  { mood: "funny", tagline: "Make them laugh out loud!", color: "#FFD93D", animation: "bounce" },
  { mood: "cinematic", tagline: "Create movie magic...", color: "#1DD1A1", animation: "fade" },
  { mood: "suspense", tagline: "Keep them on edge.", color: "#FF6F3C", animation: "pulse" },
  { mood: "horror", tagline: "Terrify and thrill...", color: "#8B5CF6", animation: "drip" },
  { mood: "storytelling", tagline: "Weave unforgettable tales", color: "#EAEAEA", animation: "typewriter" },
]

const BASE_IDEAS: Idea[] = [
  {
    id: "1",
    title: "The 3AM Kitchen Experiment",
    hook: "What happens when you cook blindfolded at 3AM? Chaos and comedy gold.",
    tags: ["comedy", "cooking", "challenge"],
    duration: "0:45",
    mood: "funny",
  },
  {
    id: "2",
    title: "One Shot, One Story",
    hook: "Tell a complete emotional journey in a single continuous take.",
    tags: ["cinematic", "storytelling", "one-take"],
    duration: "0:60",
    mood: "cinematic",
  },
  {
    id: "3",
    title: "The Last Text Message",
    hook: "Someone receives their final text before their phone dies forever...",
    tags: ["suspense", "drama", "mystery"],
    duration: "0:30",
    mood: "suspense",
  },
  {
    id: "4",
    title: "Mirror, Mirror",
    hook: "Your reflection starts moving independently. What does it want?",
    tags: ["horror", "supernatural", "psychological"],
    duration: "0:40",
    mood: "horror",
  },
  {
    id: "5",
    title: "The Memory Keeper",
    hook: "An old photo album reveals memories that aren't yours.",
    tags: ["storytelling", "mystery", "emotional"],
    duration: "0:50",
    mood: "storytelling",
  },
]

function useRandomIdea() {
  const templates = {
    funny: ["The {adjective} {activity} Challenge", "{time} {activity} Gone Wrong", "What If {scenario}?"],
    cinematic: ["The Last {noun}", "{emotion} in {setting}", "One {timeframe}, One {goal}"],
    suspense: ["The {mystery} Nobody Talks About", "What's Behind {location}?", "The {time} {event}"],
    horror: ["{scary_thing}, {scary_thing}", "The {adjective} {noun}", "Don't Look at {object}"],
    storytelling: ["The {character} Who {action}", "Letters from {place}", "The {object} Collector"],
  }

  const words = {
    adjective: ["impossible", "backwards", "silent", "invisible", "forbidden"],
    activity: ["cooking", "dancing", "drawing", "singing", "cleaning"],
    time: ["3AM", "midnight", "sunrise", "rush hour", "lunch break"],
    scenario: ["gravity stopped working", "colors disappeared", "time moved backwards"],
    noun: ["letter", "photograph", "song", "dance", "conversation"],
    emotion: ["hope", "regret", "wonder", "fear", "joy"],
    setting: ["empty subway", "abandoned library", "rooftop garden", "old bookstore"],
    timeframe: ["minute", "breath", "heartbeat", "glance", "moment"],
    goal: ["chance", "truth", "memory", "dream", "secret"],
    mystery: ["room", "sound", "shadow", "door", "window"],
    location: ["the basement door", "that old mirror", "the attic", "the garden shed"],
    event: ["visitor", "call", "knock", "whisper", "footstep"],
    scary_thing: ["mirror", "doll", "music box", "photograph", "diary"],
    object: ["the old TV", "that painting", "the music box", "your reflection"],
    character: ["librarian", "mailman", "night shift worker", "artist", "gardener"],
    action: ["never sleeps", "remembers everything", "sees the future", "hears thoughts"],
    place: ["tomorrow", "the past", "parallel worlds", "forgotten places"],
  }

  return () => {
    const moods: ThemeMood[] = ["funny", "cinematic", "suspense", "horror", "storytelling"]
    const mood = moods[Math.floor(Math.random() * moods.length)]
    const template = templates[mood][Math.floor(Math.random() * templates[mood].length)]

    let title = template
    Object.entries(words).forEach(([key, values]) => {
      const placeholder = `{${key}}`
      if (title.includes(placeholder)) {
        const value = values[Math.floor(Math.random() * values.length)]
        title = title.replace(placeholder, value)
      }
    })

    const hooks = {
      funny: "Turn everyday chaos into comedy gold with unexpected twists.",
      cinematic: "Create a visually stunning moment that tells a complete story.",
      suspense: "Build tension that keeps viewers glued to their screens.",
      horror: "Craft a spine-chilling experience in under a minute.",
      storytelling: "Weave a narrative that resonates long after it ends.",
    }

    const tags = {
      funny: ["comedy", "challenge", "relatable", "chaos"],
      cinematic: ["cinematic", "visual", "artistic", "emotional"],
      suspense: ["suspense", "mystery", "thriller", "tension"],
      horror: ["horror", "scary", "supernatural", "psychological"],
      storytelling: ["story", "narrative", "character", "journey"],
    }

    const durations = ["0:15", "0:30", "0:45", "0:60"]

    return {
      id: crypto.randomUUID(),
      title,
      hook: hooks[mood],
      tags: tags[mood].slice(0, 3),
      duration: durations[Math.floor(Math.random() * durations.length)],
      mood,
    } as Idea
  }
}

export default function ShortsGenerator() {
  const { toast } = useToast()
  const [ideas, setIdeas] = useState<Idea[]>(BASE_IDEAS)
  const [query, setQuery] = useState("")
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [confetti, setConfetti] = useState<{ id: string; type: string; x: number; y: number }[]>([])
  const trackRef = useRef<HTMLDivElement>(null)
  const randomIdea = useRandomIdea()

  const currentMood = THEME_MOODS[currentMoodIndex]

  // Cycle through moods every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentMoodIndex((prev) => (prev + 1) % THEME_MOODS.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const filtered = useMemo(() => {
    if (!query) return ideas
    const q = query.toLowerCase()
    return ideas.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.hook.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q)) ||
        i.mood.toLowerCase().includes(q),
    )
  }, [ideas, query])

  const scrollBy = (amount: number) => {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" })
  }

  const handleRandom = () => {
    const idea = randomIdea()
    setIdeas((prev) => [idea, ...prev])

    // Create confetti based on mood
    const confettiTypes = {
      funny: ["😂", "🤣", "😄", "🎉"],
      cinematic: ["🎬", "🎭", "⭐", "🎪"],
      suspense: ["❓", "🔍", "⚡", "👁️"],
      horror: ["🦇", "👻", "🕷️", "💀"],
      storytelling: ["📖", "✨", "🖋️", "📜"],
    }

    const types = confettiTypes[idea.mood]
    const newConfetti = Array.from({ length: 12 }, (_, i) => ({
      id: crypto.randomUUID(),
      type: types[Math.floor(Math.random() * types.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }))

    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 2000)

    toast({
      title: "New idea generated!",
      description: idea.title,
    })

    setTimeout(() => {
      trackRef.current?.scrollTo({ left: 0, behavior: "smooth" })
    }, 250)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-violet-800" />

      {/* Animated Background Elements */}
      <BackgroundElements />

      {/* Floating Pencil */}
      <FloatingPencil />

      {/* Animated Line Sketches */}
      <AnimatedSketches />

      {/* Confetti */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className="fixed text-2xl pointer-events-none animate-bounce z-50"
          style={{
            left: item.x,
            top: item.y,
            animationDuration: "2s",
            animationFillMode: "forwards",
          }}
        >
          {item.type}
        </div>
      ))}

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-orange-400 via-teal-400 to-yellow-300 shadow-lg flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-slate-900" />
            </div>
            <div className="text-xl font-extrabold text-white font-poppins">
              <span className="bg-gradient-to-r from-orange-400 via-teal-400 to-yellow-300 bg-clip-text text-transparent">
                ShortsAI
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Badge className="bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full">
              AI-Powered
            </Badge>
            <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full">
              Creative Studio
            </Badge>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight font-poppins">
            <AnimatedTitle text="Get Your Next Viral Idea!" />
          </h1>

          <div className="h-16 flex items-center justify-center mb-8">
            <div
              className={cn(
                "text-2xl md:text-3xl font-bold transition-all duration-300",
                isAnimating ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100",
                currentMood.animation === "bounce" && !isAnimating && "animate-bounce",
                currentMood.animation === "pulse" && !isAnimating && "animate-pulse",
              )}
              style={{
                color: currentMood.color,
                fontFamily: "var(--font-pacifico)",
                textShadow: `0 0 20px ${currentMood.color}40`,
              }}
            >
              {currentMood.tagline}
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="flex rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-2 shadow-lg">
              <Input
                placeholder="Search by mood, theme, or style..."
                className="border-0 bg-transparent text-white placeholder:text-gray-300 focus-visible:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </Button>
            </div>
          </div>
        </section>

        {/* Ideas Carousel */}
        <section className="container mx-auto px-4 pb-24">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Film className="h-5 w-5 text-teal-400" />
              <h2 className="text-xl font-bold text-white font-poppins">AI-Generated Ideas</h2>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollBy(-360)}
                className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollBy(360)}
                className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div ref={trackRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
            {filtered.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      </div>

      {/* Random Idea Button */}
      <Button
        onClick={handleRandom}
        className={cn(
          "fixed bottom-8 right-8 z-20 h-16 px-6 rounded-full text-lg font-bold",
          "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
          "shadow-[0_0_30px_8px_rgba(255,111,60,0.4)] hover:shadow-[0_0_40px_12px_rgba(255,111,60,0.5)]",
          "animate-pulse hover:animate-none transition-all",
        )}
      >
        <Shuffle className="mr-2 h-5 w-5" />
        Random Idea
      </Button>

      <Toaster />
    </div>
  )
}

function AnimatedTitle({ text }: { text: string }) {
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= text.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [text])

  return (
    <span>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-300",
            index < visibleChars ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4",
          )}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}

function IdeaCard({ idea }: { idea: Idea }) {
  const moodColors = {
    funny: "from-yellow-400/20 to-orange-400/20 border-yellow-400/30",
    cinematic: "from-teal-400/20 to-blue-400/20 border-teal-400/30",
    suspense: "from-orange-400/20 to-red-400/20 border-orange-400/30",
    horror: "from-purple-400/20 to-violet-400/20 border-purple-400/30",
    storytelling: "from-gray-400/20 to-slate-400/20 border-gray-400/30",
  }

  const moodIcons = {
    funny: Laugh,
    cinematic: Film,
    suspense: Zap,
    horror: Ghost,
    storytelling: Sparkles,
  }

  const Icon = moodIcons[idea.mood]

  return (
    <Card
      className={cn(
        "min-w-[320px] md:min-w-[380px] snap-start rounded-3xl backdrop-blur-xl border",
        "bg-gradient-to-br",
        moodColors[idea.mood],
        "hover:scale-105 transition-all duration-300 hover:shadow-2xl",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <Badge
            className={cn(
              "rounded-full border-0 text-sm font-medium",
              idea.mood === "funny" && "bg-yellow-400/80 text-yellow-900",
              idea.mood === "cinematic" && "bg-teal-400/80 text-teal-900",
              idea.mood === "suspense" && "bg-orange-400/80 text-orange-900",
              idea.mood === "horror" && "bg-purple-400/80 text-purple-900",
              idea.mood === "storytelling" && "bg-gray-400/80 text-gray-900",
            )}
          >
            <Icon className="mr-1 h-3 w-3" />
            {idea.mood}
          </Badge>
          <span className="text-sm text-gray-300">{idea.duration}</span>
        </div>
        <h3 className="text-xl font-bold text-white leading-tight font-poppins">{idea.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">{idea.hook}</p>
        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-400/20 blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-400/20 blur-xl animate-bounce" />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-400/20 to-violet-400/20 blur-xl animate-pulse" />

      {/* Parallax shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-400 rounded-full animate-ping" />
        <div
          className="absolute top-1/2 right-1/4 w-2 h-2 bg-teal-400 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  )
}

function FloatingPencil() {
  return (
    <div className="fixed top-1/4 right-8 z-10 pointer-events-none">
      <div className="relative animate-spin" style={{ animationDuration: "20s" }}>
        <div className="w-16 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full relative">
          <div className="absolute -right-2 -top-1 w-4 h-4 bg-yellow-300 rounded-full shadow-[0_0_20px_rgba(255,255,0,0.6)] animate-pulse">
            <Lightbulb className="h-3 w-3 text-yellow-800 absolute top-0.5 left-0.5" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AnimatedSketches() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="sketchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6F3C" />
            <stop offset="50%" stopColor="#1DD1A1" />
            <stop offset="100%" stopColor="#FFD93D" />
          </linearGradient>
        </defs>
        <path
          d="M100,200 Q200,100 300,200 T500,200"
          stroke="url(#sketchGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M600,300 Q700,200 800,300 T1000,300"
          stroke="url(#sketchGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </svg>
    </div>
  )
}
