import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import logo from '../../assets/saxby-films-logo-2.jpg'
import backgroundImage from '../../assets/saxby-films-wedding-bg.jpg'
import { useCursorHover } from '@hooks/useCursorHover'

const Hero = () => {

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Cursor hover effects
  const bookHover = useCursorHover({ text: 'Book' })
  const viewHover = useCursorHover({ text: 'View' })
  const instagramHover = useCursorHover({ text: 'Follow' })

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 cinematic-hero-dark dark:bg-gradient-to-b dark:from-black/70 dark:via-black/80 dark:to-black/90" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img
            src={logo}
            alt="Saxby Films Logo"
            className="w-20 h-20 md:w-32 md:h-32 rounded-full mx-auto shadow-2xl"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-[100px] font-display font-bold mb-6 leading-tight"
        >
          Every Moment Has A Story<br />Worth Remembering
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl secondary max-w-2xl mx-auto mb-12"
        >
          Saxby Films captures real-life moments and transforms them into
          timeless visual stories.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToContact}
            onMouseEnter={bookHover.onMouseEnter}
            onMouseLeave={bookHover.onMouseLeave}
            className="group px-8 py-4 gold-gradient text-white rounded-full font-medium flex items-center gap-2"
          >
            Book a Session
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollToPortfolio}
            onMouseEnter={viewHover.onMouseEnter}
            onMouseLeave={viewHover.onMouseLeave}
            className="px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors"
          >
            View Portfolio
          </button>
        </motion.div>

        {/* Social Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12"
        >
          <a
            href="https://www.instagram.com/saxbyfilms"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary hover:primary transition-colors text-sm uppercase tracking-wider"
            {...instagramHover}
          >
            Follow us on Instagram
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
