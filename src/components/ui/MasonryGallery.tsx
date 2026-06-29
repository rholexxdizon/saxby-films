import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const MasonryGallery = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Placeholder images (to be replaced with real portfolio images)
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
      alt: 'Wedding moment',
      height: 'h-64',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600',
      alt: 'Wedding ceremony',
      height: 'h-80',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600',
      alt: 'Groom and bride',
      height: 'h-64',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600',
      alt: 'Wedding details',
      height: 'h-96',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600',
      alt: 'Couple portrait',
      height: 'h-64',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600',
      alt: 'Bride',
      height: 'h-72',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "-100px" }}
      className="grid grid-cols-2 gap-4"
    >
      {images.map((image, index) => {
        const parallaxOffset = (index % 3) * 20
        const yOffset = Math.max(0, scrollY * 0.1 - parallaxOffset)

        return (
          <motion.div
            key={image.id}
            variants={item}
            className="relative overflow-hidden rounded-lg"
            style={{
              transform: `translateY(${yOffset}px)`,
            }}
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className={`w-full ${image.height} object-cover rounded-lg hover:scale-110 transition-transform duration-700`}
              whileHover={{ scale: 1.1 }}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default MasonryGallery
