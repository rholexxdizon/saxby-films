import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const StoryGallery = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Original branding images from assets/branding/about folder
  const images = [
    {
      id: 1,
      src: new URL('../../assets/branding/about/image-1.jpg', import.meta.url).href,
      alt: 'Saxby Films Journey',
      height: 'h-64',
    },
    {
      id: 2,
      src: new URL('../../assets/branding/about/image-2.jpg', import.meta.url).href,
      alt: 'Behind the Scenes',
      height: 'h-80',
    },
    {
      id: 3,
      src: new URL('../../assets/branding/about/image-3.jpg', import.meta.url).href,
      alt: 'Filming in Action',
      height: 'h-64',
    },
    {
      id: 4,
      src: new URL('../../assets/branding/about/image-4.jpg', import.meta.url).href,
      alt: 'Team Collaboration',
      height: 'h-96',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
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

export default StoryGallery
