import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ServiceCard from '@components/ui/ServiceCard'
import MouseGlowEffect from '@components/ui/MouseGlowEffect'
import { useCursorHover } from '@hooks/useCursorHover'

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
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
      id: 'wedding-photography',
      title: 'Wedding Photography',
      description: 'Capturing the magic and emotion of your special day with stunning, timeless photographs.',
      icon: 'Camera' as const
    },
    {
      id: 'wedding-videography',
      title: 'Wedding Videography',
      description: 'Cinematic wedding films that tell your love story with artistic flair and emotional depth.',
      icon: 'Video' as const
    },
    {
      id: 'pre-wedding',
      title: 'Pre-Wedding Sessions',
      description: 'Beautiful pre-wedding photoshoots at romantic locations to celebrate your journey together.',
      icon: 'Heart' as const
    },
    {
      id: 'debut-coverage',
      title: 'Debut Coverage',
      description: 'Comprehensive coverage of debut events, capturing every precious moment and milestone.',
      icon: 'Sparkles' as const
    },
    {
      id: 'event-photography',
      title: 'Event Photography',
      description: 'Professional event photography for corporate gatherings, celebrations, and special occasions.',
      icon: 'Camera' as const
    },
    {
      id: 'event-videography',
      title: 'Event Videography',
      description: 'Dynamic event videography that brings your occasions to life with professional quality.',
      icon: 'Video' as const
    },
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      description: 'Premium coverage for corporate events, conferences, and business functions with polished presentation.',
      icon: 'Building' as const
    },
    {
      id: 'drone-coverage',
      title: 'Drone Coverage',
      description: 'Breathtaking aerial footage and photography using state-of-the-art drone technology.',
      icon: 'Plane' as const
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
