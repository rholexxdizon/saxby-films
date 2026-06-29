import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react'

interface CursorPosition {
  x: number
  y: number
}

interface CursorState {
  position: CursorPosition
  scrollProgress: number
  isHovering: boolean
  hoverText: string
  isActive: boolean
}

interface CursorContextType {
  position: CursorPosition
  scrollProgress: number
  isHovering: boolean
  hoverText: string
  isActive: boolean
  hasFinePointer: boolean
  prefersReducedMotion: boolean
  isDesktop: boolean
  setHoverState: (isHovering: boolean, text?: string) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export const useCursor = () => {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within CursorProvider')
  }
  return context
}

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorState, setCursorState] = useState<CursorState>({
    position: { x: 0, y: 0 },
    scrollProgress: 0,
    isHovering: false,
    hoverText: '',
    isActive: false,
  })

  const targetPositionRef = useRef({ x: 0, y: 0 })
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  // Device detection
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.innerWidth >= 768

    setHasFinePointer(finePointer)
    setPrefersReducedMotion(reducedMotion)
    setIsDesktop(desktop)

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches)
    }

    const motionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    pointerQuery.addEventListener('change', handlePointerChange)
    motionQuery.addEventListener('change', motionChange)
    window.addEventListener('resize', handleResize)

    return () => {
      pointerQuery.removeEventListener('change', handlePointerChange)
      motionQuery.removeEventListener('change', motionChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Mouse tracking with RAF optimization
  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion || !isDesktop) return

    let animationFrameId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }

      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(() => {
          setCursorState((prev) => ({
            ...prev,
            position: targetPositionRef.current,
            isActive: true,
          }))
          animationFrameId = null
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true } as any)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [hasFinePointer, prefersReducedMotion, isDesktop])

  // Scroll progress tracking
  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion || !isDesktop) return

    let scrollRaf: number | null = null
    let lastScrollUpdateTime = 0

    const updateScrollProgress = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const maxScroll = documentHeight - viewportHeight
      const progress = maxScroll > 0 ? Math.min((scrollY / maxScroll) * 100, 100) : 0

      const now = performance.now()
      if (now - lastScrollUpdateTime >= 50) {
        setCursorState((prev) => ({
          ...prev,
          scrollProgress: progress,
        }))
        lastScrollUpdateTime = now
      }

      scrollRaf = requestAnimationFrame(updateScrollProgress)
    }

    const handleScroll = () => {
      if (scrollRaf === null) {
        scrollRaf = requestAnimationFrame(updateScrollProgress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true } as any)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollRaf) {
        cancelAnimationFrame(scrollRaf)
      }
    }
  }, [hasFinePointer, prefersReducedMotion, isDesktop])

  // Hover state management
  const setHoverState = (isHovering: boolean, text: string = '') => {
    setCursorState((prev) => ({
      ...prev,
      isHovering,
      hoverText: text,
    }))
  }

  return (
    <CursorContext.Provider
      value={{
        ...cursorState,
        hasFinePointer,
        prefersReducedMotion,
        isDesktop,
        setHoverState,
      }}
    >
      {children}
    </CursorContext.Provider>
  )
}

export default CursorProvider