import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface ScrollEffectsProps {
  children: React.ReactNode
  className?: string
  glowIntensity?: number
  parallaxSpeed?: number
}

export const ScrollEffects = ({ children, className = '', glowIntensity = 0.8, parallaxSpeed = 0.3 }: ScrollEffectsProps) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how much of the section has been scrolled through
      const scrolled = (windowHeight - rect.top) / (windowHeight + rect.height)
      setScrollProgress(Math.max(0, Math.min(1, scrolled)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true } as any)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollProgress * 50 * parallaxSpeed
  const glowOpacity = isInView ? scrollProgress * glowIntensity : 0

  return (
    <section
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        transform: `translateY(${parallaxOffset}px)`,
      }}
    >
      {/* Scroll-based glow effect */}
      <div
        className="section-scroll-glow"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(circle at center, rgba(212,175,55,${glowIntensity * 0.15}) 0%, transparent 70%)`,
        }}
      />

      {children}

      {/* Floating particles for added depth */}
      {isInView && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent/15 rounded-full"
            animate={{
              y: [0, -25, 0],
              x: [0, -15, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}
    </section>
  )
}

export default ScrollEffects