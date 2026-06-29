import { useState, useEffect, useRef } from 'react'

export const useWebGLPerformance = () => {
  const [isVisible, setIsVisible] = useState(true)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current || document.querySelector('#hero')

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { isVisible, elementRef }
}
