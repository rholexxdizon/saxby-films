import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MasonryGallery from '@components/ui/MasonryGallery'

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
  })

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-6 md:px-12 about-bg bg-saxby-surface transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
                      >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Our Story
            </h2>

            <div className="space-y-6 text-lg text-secondary">
              <p className="leading-relaxed">
                We are storytellers who believe every smile, every glance, and every
                emotion deserves to be remembered.
              </p>

              <p className="leading-relaxed">
                Saxby Films is a group of young passionate artists who thrive in your
                stories, and we are privileged to become part of them. We specialize
                in capturing life's most precious moments — from intimate wedding
                ceremonies to grand corporate events.
              </p>

              <p className="leading-relaxed">
                Every photo we take and every video we create is crafted with love,
                creativity, and attention to detail. We believe every single moment
                is a highlight, and our mission is to preserve these memories in a way
                that will be cherished for generations.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
                            className="grid grid-cols-3 gap-6 mt-12"
            >
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-accent mb-2">
                  500+
                </div>
                <div className="text-sm text-secondary">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-accent mb-2">
                  400+
                </div>
                <div className="text-sm text-secondary">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-accent mb-2">
                  8+
                </div>
                <div className="text-sm text-secondary">Years</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Masonry Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
                      >
            <MasonryGallery />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
