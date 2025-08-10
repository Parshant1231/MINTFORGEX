export interface ImageSet {
  funny: string
  serious: string
}

export interface Position {
  top?: string
  bottom?: string
  left?: string
  right?: string
  rotation: number
}

export interface AnimatedTitleProps {
  phrases: string[]
  currentIndex: number
}

export interface PencilAnimationProps {
  progress: number
}

export interface ImageGalleryProps {
  images: ImageSet[]
  hoveredImage: number | null
  onImageHover: (index: number | null) => void
}

export interface GridBackgroundProps {
  scrollY: number
}
