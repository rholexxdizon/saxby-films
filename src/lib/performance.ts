/**
 * Performance monitoring utilities
 */

/**
 * Report Web Vitals for performance monitoring
 */
export const reportWebVitals = (metric: any) => {
  const { name, value } = metric

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`${name}:`, value)
  }

  // You can send this to analytics service
  // Example: sendToAnalytics({ name, value, id })

  // Alert on poor performance
  switch (name) {
    case 'LCP':
      if (value > 2500) {
        console.warn('Poor LCP detected:', value)
      }
      break
    case 'FID':
      if (value > 100) {
        console.warn('Poor FID detected:', value)
      }
      break
    case 'CLS':
      if (value > 0.1) {
        console.warn('Poor CLS detected:', value)
      }
      break
  }
}

/**
 * Measure component render performance
 */
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = performance.now()

  return () => {
    const endTime = performance.now()
    const renderTime = endTime - startTime

    if (import.meta.env.DEV && renderTime > 16) { // 16ms is one frame at 60fps
      console.warn(`Slow render detected in ${componentName}:`, renderTime.toFixed(2), 'ms')
    }

    return renderTime
  }
}

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if element is in viewport with Intersection Observer
 */
export const observeElement = (
  element: HTMLElement,
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px',
    ...options,
  }

  const observer = new IntersectionObserver(([entry]) => {
    callback(entry)
  }, defaultOptions)

  observer.observe(element)

  return observer
}

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImages = (
  selector: string = 'img[data-src]',
  options: IntersectionObserverInit = {}
) => {
  const images = document.querySelectorAll(selector)

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute('data-src')

        if (src) {
          img.src = src
          img.removeAttribute('data-src')
          observer.unobserve(img)
        }
      }
    })
  }, options)

  images.forEach(img => imageObserver.observe(img))

  return imageObserver
}

/**
 * Preload critical resources
 */
export const preloadResource = (url: string, as: 'script' | 'style' | 'image' | 'font') => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = url
  link.as = as
  document.head.appendChild(link)
}

/**
 * Detect network connection speed
 */
export const getConnectionSpeed = (): string => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

  if (connection) {
    const { effectiveType, downlink } = connection
    return effectiveType || `${downlink}Mbps`
  }

  return 'unknown'
}

/**
 * Optimize images based on network speed
 */
export const shouldUseLowQualityImages = (): boolean => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

  if (connection) {
    const { saveData, effectiveType } = connection
    return saveData || effectiveType === 'slow-2g' || effectiveType === '2g'
  }

  return false
}

/**
 * Memory cleanup for heavy components
 */
export const cleanupMemory = () => {
  // Force garbage collection hint (works in some browsers)
  if (window.gc) {
    window.gc()
  }
}

/**
 * Measure FPS (Frames Per Second)
 */
export const measureFPS = (callback: (fps: number) => void) => {
  let frameCount = 0
  let lastTime = performance.now()

  const measure = () => {
    frameCount++
    const currentTime = performance.now()
    const elapsedTime = currentTime - lastTime

    if (elapsedTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / elapsedTime)
      callback(fps)
      frameCount = 0
      lastTime = currentTime
    }

    requestAnimationFrame(measure)
  }

  measure()
}
