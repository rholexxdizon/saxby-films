import { useEffect, useState, useRef } from 'react'

interface MouseGlowOptions {
  intensity?: number
  radius?: number
  color?: string
}

export const useMouseGlow = (options: MouseGlowOptions = {}) => {
  const { intensity = 0.5, radius = 200, color = 'rgba(212,175,55,0.1)' } = options
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })
      setIsActive(true)
    }

    const handleMouseLeave = () => {
      setIsActive(false)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const glowStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}, transparent ${radius}px)`,
    opacity: isActive ? intensity : 0,
    transition: 'opacity 0.3s ease',
  }

  return { containerRef, glowStyle, isActive }
}

export default useMouseGlow