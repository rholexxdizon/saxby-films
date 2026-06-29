import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
    })

    let rafId: number

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Scroll to section helper
  useEffect(() => {
    const scrollToSection = (sectionId: string) => {
      const element = document.querySelector(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // Make it available globally for navigation links
    window.scrollToSection = scrollToSection
  }, [])
}

// Extend window interface
declare global {
  interface Window {
    scrollToSection: (sectionId: string) => void
  }
}
