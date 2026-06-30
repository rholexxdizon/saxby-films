import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import logo from '../../assets/branding/logo/saxby-films-logo-2.jpg'
import backgroundImage from '../../assets/branding/backgrounds/saxby-films-wedding-bg.jpg'
import { useCursorHover } from '@hooks/useCursorHover'
import { useState, useEffect } from 'react'

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Every Moment Has A Story\nWorth Remembering"

  // Typing animation effect
  useEffect(() => {
    let index = 0
    let isDeleting = false
    const typingSpeed = 100 // milliseconds per character
    const deletingSpeed = 50 // milliseconds per character when deleting
    const pauseTime = 2000 // pause before deleting

    const typeLoop = () => {
      if (!isDeleting && index < fullText.length) {
        // Typing
        setTypedText(fullText.slice(0, index + 1))
        index++
        setTimeout(typeLoop, typingSpeed + Math.random() * 50) // Add variation for natural typing
      } else if (isDeleting && index > 0) {
        // Deleting
        setTypedText(fullText.slice(0, index - 1))
        index--
        setTimeout(typeLoop, deletingSpeed)
      } else {
        // Switch between typing and deleting
        isDeleting = !isDeleting
        if (isDeleting) {
          // Just finished typing, pause before deleting
          setTimeout(typeLoop, pauseTime)
        } else {
          // Just finished deleting, start typing immediately
          setTimeout(typeLoop, 100)
        }
      }
    }

    // Start typing after a short delay
    const startDelay = setTimeout(typeLoop, 500)

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearTimeout(startDelay)
      clearInterval(cursorInterval)
    }
  }, [])

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
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <img
            src={logo}
            alt="Saxby Films Logo"
            className="w-20 h-20 md:w-32 md:h-32 rounded-full mx-auto shadow-2xl"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <div className="text-4xl md:text-7xl font-display font-bold mb-6 leading-tight min-h-[140px] md:min-h-[180px] max-w-6xl mx-auto">
            {typedText.split('\n').map((line, lineIndex) => (
              <div key={lineIndex} className="flex items-center justify-center">
                <span className="typing-wrapper">{line}</span>
                {lineIndex === typedText.split('\n').length - 1 && (
                  <motion.span
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                    className="cursor"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl secondary max-w-2xl mx-auto mb-12"
        >
          Saxby Films captures real-life moments and transforms them into
          timeless visual stories.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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
        transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
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
