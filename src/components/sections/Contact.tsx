import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react'
// ponytail: ContactForm temporarily disabled, will be restored when email service is chosen
// import ContactForm from '@components/ui/ContactForm'
import { useEffect, useState } from 'react'
import { useCursorHover } from '@hooks/useCursorHover'

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Cursor hover effects
  const instagramHover = useCursorHover({ text: 'Message' })
  const contactHover = useCursorHover({ text: 'Contact' })
  const socialHover = useCursorHover({ text: 'Follow' })

  const [ref, inView] = useInView({
    threshold: isMobile ? 0.05 : 0.3,
    triggerOnce: false,
  })

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@saxbyfilms.com',
      link: 'mailto:info@saxbyfilms.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+63 9151 676 819',
      link: 'tel:+639151676819',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Cavite, Philippines',
      link: null,
    },
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/saxbyfilms',
      handle: '@saxbyfilms',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/saxbyfilms',
      handle: 'Saxby Films',
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 px-6 md:px-12 contact-bg cinematic-contact-dark dark:from-dark-surface dark:to-dark-background light:from-white light:to-gray-50">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-lg secondary max-w-2xl mx-auto">
            Ready to tell your story? Contact us today to discuss your upcoming
            event and let us capture your precious moments.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-bold mb-6">
                Contact Information
              </h3>
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                                      >
                    {info.link ? (
                      <a
                        href={info.link}
                        className="cinematic-card flex items-start gap-4 p-4 rounded-xl group"
                        {...contactHover}
                      >
                        <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-sm secondary mb-1">
                            {info.label}
                          </div>
                          <div className="font-medium">{info.value}</div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 p-4 surface-secondary border border-light rounded-xl">
                        <div className="p-3 bg-accent/20 rounded-lg">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-sm secondary mb-1">
                            {info.label}
                          </div>
                          <div className="font-medium">{info.value}</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-display font-semibold mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="cinematic-card flex items-center gap-3 p-4 rounded-xl"
                      {...socialHover}
                    >
                      <Icon className="w-5 h-5 text-accent" />
                      <div>
                        <div className="text-sm secondary">
                          {social.name}
                        </div>
                        <div className="font-medium text-sm">
                          {social.handle}
                        </div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Quick Contact Option */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                            className="cinematic-card p-6 rounded-xl"
            >
              <h4 className="font-display font-semibold mb-3">
                Prefer to chat?
              </h4>
              <p className="secondary text-sm mb-4">
                Connect with us on Facebook for quick inquiries and updates.
              </p>
              <a
                href="https://www.facebook.com/SaxbyFilms/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-white rounded-full font-medium"
                {...instagramHover}
              >
                <MessageCircle className="w-4 h-4" />
                Message on Facebook
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
