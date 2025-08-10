"use client"

import { cn } from "@/lib/utils"


interface ImageSet {
  funny: string
  serious: string
}

interface ImageGalleryProps {
  images: ImageSet[]
  hoveredImage: number | null
  onImageHover: (index: number | null) => void
}

export function ImageGallery({ images, hoveredImage, onImageHover }: ImageGalleryProps) {
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
            <div className="relative overflow-hidden rounded-2xl shadow-2xl w-64 h-48">
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
