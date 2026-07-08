import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import ServiceCard from '@components/ui/ServiceCard'
import MouseGlowEffect from '@components/ui/MouseGlowEffect'
import { useCursorHover } from '@hooks/useCursorHover'

const Services = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [ref, inView] = useInView({
    threshold: isMobile ? 0.05 : 0.3,
    triggerOnce: false,
  })

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Cursor hover effect
  const quoteHover = useCursorHover({ text: 'Quote' })

  const services = [
    {
      id: 'wedding-photo-video',
      title: 'Wedding Photography & Videography',
      description: 'Complete wedding coverage capturing both stunning photographs and cinematic films of your special day.',
      icon: 'Camera' as const
    },
    {
      id: 'pre-wedding',
      title: 'Pre-Wedding Sessions',
      description: 'Beautiful pre-wedding photoshoots at romantic locations to celebrate your journey together.',
      icon: 'Heart' as const
    },
    {
      id: 'event-coverage',
      title: 'Event Coverage',
      description: 'Comprehensive event coverage with both photography and videography for all types of occasions and celebrations.',
      icon: 'Video' as const
    },
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      description: 'Premium coverage for corporate events, conferences, and business functions. Provided by our partner studio.',
      icon: 'Building' as const,
      externalLink: 'https://yellowmangostudios.com',
      isExternal: true
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: isMobile ? 0.1 : 0.3,
      },
    },
  }

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 px-6 md:px-12 services-bg">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.1 : 0.2 }}
                    className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Our Services
          </h2>
          <p className="text-lg secondary max-w-2xl mx-auto">
            We specialize in capturing life's most precious moments and turning
            them into timeless visual stories.
          </p>
        </motion.div>

        {/* Services Grid */}
        <MouseGlowEffect className="mb-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </MouseGlowEffect>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
                    className="text-center"
        >
          <button
            onClick={scrollToContact}
            className="px-8 py-4 gold-gradient text-white rounded-full font-medium"
            {...quoteHover}
          >
            Request a Quote
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
