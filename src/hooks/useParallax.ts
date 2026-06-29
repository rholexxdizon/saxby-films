import { useEffect, useState, useRef } from 'react'

interface ParallaxOptions {
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  disabled?: boolean
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = 'up', disabled = false } = options
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (disabled) return

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Check if element is in viewport
      const isInViewport = rect.top < windowHeight && rect.bottom > 0
      setIsActive(isInViewport)

      if (isInViewport) {
        const scrollY = window.scrollY
        const elementTop = rect.top + scrollY
        const distance = scrollY - elementTop

        // Calculate parallax offset based on direction
        let newOffset = 0
        switch (direction) {
          case 'up':
            newOffset = distance * speed
            break
          case 'down':
            newOffset = -distance * speed
            break
          case 'left':
            newOffset = distance * speed
            break
          case 'right':
            newOffset = -distance * speed
            break
        }

        setOffset(newOffset)
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener with passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true } as any)

    // Add resize listener
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [speed, direction, disabled])

  return { ref, offset, isActive }
}

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      setProgress(Math.min(scrolled, 100))

      // Determine active section
      const sections = document.querySelectorAll('section[id]')
      let currentSection: string | null = null

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = section.getAttribute('id')
        }
      })

      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true } as any)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { progress, activeSection }
}