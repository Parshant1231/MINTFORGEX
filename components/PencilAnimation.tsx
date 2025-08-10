"use client"

import { cn } from "@/lib/utils"


interface PencilAnimationProps {
  progress: number
}

export function PencilAnimation({ progress }: PencilAnimationProps) {
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
