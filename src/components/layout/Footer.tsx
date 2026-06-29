import { ArrowUp, Instagram, Facebook, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useCursorHover } from '@hooks/useCursorHover'

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Cursor hover effects
  const socialHover = useCursorHover({ text: 'Follow' })

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer id="footer" className="cinematic-footer-dark surface-secondary relative">
      {/* Large CTA Section */}
      <div className="py-24 md:py-32 px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-display font-bold mb-8"
        >
          Let's Tell Your Story Together
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToContact}
            className="px-8 py-4 gold-gradient text-white rounded-full font-medium"
          >
            Book Now
          </button>
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="px-8 py-4 border border-white/20 rounded-full font-medium hover:surface-hover transition-colors flex items-center gap-2"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </button>
          )}
        </motion.div>
      </div>

      {/* Footer Content */}
      <div className="border-t border-light">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-display font-bold text-xl mb-4">Saxby Films</h3>
              <p className="secondary text-sm">
                Visual storytellers capturing real-life moments and turning them
                into timeless stories.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="secondary hover:primary transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="secondary hover:primary transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#about" className="secondary hover:primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="secondary hover:primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-display font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/saxbyfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cinematic-card p-3 rounded-full"
                  aria-label="Instagram"
                  {...socialHover}
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/saxbyfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cinematic-card p-3 rounded-full"
                  aria-label="Facebook"
                  {...socialHover}
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="mailto:info@saxbyfilms.com"
                  className="cinematic-card p-3 rounded-full"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-light pt-8 text-center text-sm secondary">
            <p>&copy; {new Date().getFullYear()} Saxby Films. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 gold-gradient text-white rounded-full shadow-lg z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </footer>
  )
}

export default Footer
