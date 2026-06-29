import { useState, useEffect, useRef } from 'react'

interface CursorPosition {
  x: number
  y: number
}

interface CursorState {
  position: CursorPosition
  isHovering: boolean
  hoverText: string
  isActive: boolean
}

export const useCustomCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    position: { x: 0, y: 0 },
    isHovering: false,
    hoverText: '',
    isActive: false,
  })

  const targetPositionRef = useRef({ x: 0, y: 0 })

  // Check if device has fine pointer (mouse)
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

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

  // Hover state management
  const setHoverState = (isHovering: boolean, text: string = '') => {
    setCursorState((prev) => ({
      ...prev,
      isHovering,
      hoverText: text,
    }))
  }

  return {
    ...cursorState,
    hasFinePointer,
    prefersReducedMotion,
    isDesktop,
    setHoverState,
  }
}

export default useCustomCursor
