import { useEffect, useState, useRef } from 'react'

export const useSnapScroll = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTime = useRef(0)

  useEffect(() => {
    // Get all sections including footer
    const sections = document.querySelectorAll('section[id], footer[id]')

    if (sections.length === 0) return

    // Track which section is currently in view
    const updateCurrentSection = () => {
      let maxVisibility = 0
      let bestIndex = 0

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Calculate visible height
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
        const sectionHeight = rect.bottom - rect.top

        if (sectionHeight > 0 && visibleHeight > 0) {
          const visibilityPercentage = visibleHeight / sectionHeight
          if (visibilityPercentage > maxVisibility) {
            maxVisibility = visibilityPercentage
            bestIndex = index
          }
        }
      })

      setCurrentSectionIndex(bestIndex)
    }

    // Initial section detection
    updateCurrentSection()

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTime.current

      // Prevent rapid triggering
      if (timeSinceLastScroll < 50) return

      lastScrollTime.current = now

      // Check if we're at the very end of the page
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const maxScroll = documentHeight - viewportHeight
      const isAtEnd = scrollY >= maxScroll - 50 // Allow 50px tolerance

      // Allow normal scrolling for small movements (scrollbar, touchpad)
      if (Math.abs(e.deltaY) < 100) return

      // Don't prevent default if at the very end and scrolling down
      if (isAtEnd && e.deltaY > 0) {
        // Let normal scrolling happen at the end
        return
      }

      // Prevent default for snap scrolling
      e.preventDefault()

      // Don't scroll if already scrolling
      if (isScrolling.current) return

      isScrolling.current = true

      // Determine scroll direction and target section
      let targetIndex = currentSectionIndex

      if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        // Scrolling down - move to next section
        targetIndex = currentSectionIndex + 1
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        // Scrolling up - move to previous section
        targetIndex = currentSectionIndex - 1
      }

      // Smooth scroll to target section
      if (targetIndex !== currentSectionIndex && targetIndex >= 0 && targetIndex < sections.length) {
        setCurrentSectionIndex(targetIndex)
        const targetSection = sections[targetIndex]
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          })
        }
      }

      // Reset scrolling flag after animation completes
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
        updateCurrentSection()
      }, 1000)
    }

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false } as any)

    // Update current section on scroll (for keyboard/touchpad users)
    const handleScroll = () => {
      if (!isScrolling.current) {
        updateCurrentSection()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true } as any)

    // Cleanup function
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [currentSectionIndex])
}

export default useSnapScroll