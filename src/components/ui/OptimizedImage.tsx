import { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  placeholder = 'blur'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const setRefs = (node: HTMLImageElement | null) => {
    if (node) {
      (imgRef as React.MutableRefObject<HTMLImageElement>).current = node
    }
    inViewRef(node)
  }

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  // Generate different sizes for responsive images
  const generateSrcSet = (baseSrc: string): string => {
    const sizes = [400, 800, 1200, 1600]
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ')
  }

  const srcSet = generateSrcSet(src)

  if (!inView && loading === 'lazy') {
    return (
      <div
        ref={setRefs}
        className={`surface-secondary ${className}`}
        style={{ width: '100%', aspectRatio: width && height ? `${width}/${height}` : undefined }}
      />
    )
  }

  return (
    <div ref={setRefs} className={`relative ${className}`}>
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-dark-surface blur-sm animate-pulse"
          style={{ width: '100%', aspectRatio: width && height ? `${width}/${height}` : undefined }}
        />
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError ? 'hidden' : ''} w-full h-full object-cover`}
        sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, (max-width: 1440px) 1200px, 1600px"
      />

      {/* Error State */}
      {hasError && (
        <div
          className="absolute inset-0 bg-dark-surface flex items-center justify-center"
          style={{ width: '100%', aspectRatio: width && height ? `${width}/${height}` : undefined }}
        >
          <span className="secondary text-sm">Image not available</span>
        </div>
      )}
    </div>
  )
}

export default OptimizedImage
