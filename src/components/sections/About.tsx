import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import MasonryGallery from '@components/ui/MasonryGallery'

const About = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState<'hero' | 'story' | 'filmmaker' | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Hero statement observer - triggers when coming into view
  const [heroRef, heroInView] = useInView({
    threshold: isMobile ? 0.2 : 0.4,
    triggerOnce: false,
  })

  // Our Story observer - triggers when hero is partially out of view and story comes into view
  const [storyRef, storyInView] = useInView({
    threshold: isMobile ? 0.15 : 0.3,
    triggerOnce: false,
  })

  // Meet Your Filmmaker observer - triggers when story is partially out of view
  const [filmmakerRef, filmmakerInView] = useInView({
    threshold: isMobile ? 0.15 : 0.3,
    triggerOnce: false,
  })

  // Track which section should be active based on scroll position
  useEffect(() => {
    if (heroInView) {
      setActiveSection('hero')
    } else if (storyInView) {
      setActiveSection('story')
    } else if (filmmakerInView) {
      setActiveSection('filmmaker')
    }
  }, [heroInView, storyInView, filmmakerInView])

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-saxby-surface transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto">

        {/* Hero Statement */}
        <div ref={heroRef} className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={activeSection === 'hero' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: isMobile ? 0.8 : 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              We Don't Just Film Moments
            </h2>
            <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed">
              We Preserve How They Felt
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={activeSection === 'hero' ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: isMobile ? 0.8 : 1.2, delay: isMobile ? 0.08 : 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16"
        >

          {/* Left: About Saxby Films */}
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
              About Saxby Films
            </h3>

            <div className="space-y-5 text-lg text-secondary leading-relaxed">
              <p>
                Saxby Films is a visual storyteller that captures your real-life moments and transforms them into timeless stories.
              </p>

              <p>
                We believe the most beautiful moments are the ones that happen naturally—the genuine smiles, quiet tears, heartfelt embraces, and everything in between. Our goal is to preserve not just what happened, but how it felt, so you can relive your story for years to come.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={activeSection === 'hero' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: isMobile ? 0.8 : 1.2, delay: isMobile ? 0.12 : 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-3 gap-4 md:gap-6 mt-10 pt-10 border-t border-saxby-accent/20"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-1">
                  200+
                </div>
                <div className="text-sm text-secondary">Films Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-1">
                  150+
                </div>
                <div className="text-sm text-secondary">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-1">
                  8+
                </div>
                <div className="text-sm text-secondary">Years</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={activeSection === 'hero' ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: isMobile ? 0.8 : 1.2, delay: isMobile ? 0.1 : 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MasonryGallery />
          </motion.div>
        </motion.div>

        {/* Our Story Section with Enhanced Effects */}
        <div ref={storyRef} className="mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={activeSection === 'story' ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: isMobile ? 0.8 : 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Background decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={activeSection === 'story' ? { opacity: 0.03, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-accent via-accent/50 to-transparent rounded-3xl blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={activeSection === 'story' ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: isMobile ? 0.8 : 1.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              {/* Enhanced title with gradient effect */}
              <motion.h3
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={activeSection === 'story' ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
                transition={{ duration: 1.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-3xl md:text-5xl font-display font-bold mb-8 bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent"
              >
                Our Story
              </motion.h3>

              <div className="space-y-8 text-lg md:text-xl text-secondary leading-relaxed">
                <motion.div
                  initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
                  animate={activeSection === 'story' ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -50, filter: 'blur(8px)' }}
                  transition={{ duration: 1, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative"
                >
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-accent to-transparent" />
                  <p className="pl-6">
                    Saxby Films began in 2017 with nothing more than a dream.
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
                  animate={activeSection === 'story' ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -50, filter: 'blur(8px)' }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative"
                >
                  <span className="text-accent font-semibold">It started with a young boy</span> who simply wanted to become a filmmaker. Armed with passion, curiosity, and a camera, I set out to tell stories that matter—stories that make people smile, laugh, cry, and remember.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
                  animate={activeSection === 'story' ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -50, filter: 'blur(8px)' }}
                  transition={{ duration: 1, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  What began as a dream slowly grew into a studio built on purpose. <span className="text-accent font-medium">Every couple, every family, and every client</span> who trusted us became part of that journey.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
                  animate={activeSection === 'story' ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -50, filter: 'blur(8px)' }}
                  transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Today, Saxby Films continues to create honest, cinematic, and emotionally driven films. While our equipment, experience, and team have grown over the years, <span className="text-accent font-semibold">one thing has never changed: our passion for telling real stories with heart.</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
                  animate={activeSection === 'story' ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -50, filter: 'blur(8px)' }}
                  transition={{ duration: 1, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative bg-saxby-accent/5 rounded-2xl p-6 border-l-4 border-accent"
                >
                  <p className="text-lg md:text-xl font-medium text-primary">
                    Because at the end of the day, films aren't just about beautiful shots—they're about <span className="text-accent">preserving moments that become memories, and memories that become part of your legacy.</span>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Meet Your Filmmaker Section with Enhanced Animation */}
        <div ref={filmmakerRef}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={activeSection === 'filmmaker' ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: isMobile ? 0.8 : 1.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-saxby-accent/5 rounded-2xl p-8 md:p-12 lg:p-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Photo with enhanced animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={activeSection === 'filmmaker' ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ duration: isMobile ? 0.8 : 1.2, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="order-2 lg:order-1"
              >
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={activeSection === 'filmmaker' ? { scale: 1 } : { scale: 0.8 }}
                    transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute -inset-4 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl blur-xl"
                  ></motion.div>
                  <motion.img
                    src={new URL('../../assets/branding/about/saxby.jpg', import.meta.url).href}
                    alt="Saxby - Filmmaker & Cinematographer"
                    className="relative w-full h-auto rounded-xl shadow-2xl object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Content with staggered animation */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={activeSection === 'filmmaker' ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: isMobile ? 0.8 : 1.2, delay: 0.04, ease: [0.25, 0.1, 0.25, 1] }}
                className="order-1 lg:order-2"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={activeSection === 'filmmaker' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 1, delay: 0.06 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
                >
                  Meet Your Filmmaker
                </motion.h3>

                <div className="space-y-5 text-lg text-secondary leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={activeSection === 'filmmaker' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 1, delay: 0.08 }}
                  >
                    Behind Saxby Films is Saxby, a filmmaker, cinematographer, and licensed drone operator based in the Philippines.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={activeSection === 'filmmaker' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 1, delay: 0.09 }}
                  >
                    Driven by a deep passion for storytelling, Saxby believes that every person has a story worth telling. His approach goes beyond creating visually stunning films—he focuses on capturing genuine emotions, meaningful connections, and moments that can be treasured for generations.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={activeSection === 'filmmaker' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 1, delay: 0.1 }}
                  >
                    Since beginning his filmmaking journey, Saxby has worked on documentaries, commercial campaigns, corporate films, and weddings. These experiences have shaped his cinematic, documentary-style approach, where authenticity takes center stage and every story is told with honesty, purpose, and emotion.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={activeSection === 'filmmaker' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 1, delay: 0.12 }}
                  >
                    Through Saxby Films, his mission remains the same: to transform real-life moments into timeless stories that people can relive for years to come.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default About
