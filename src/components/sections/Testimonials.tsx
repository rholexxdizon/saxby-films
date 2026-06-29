import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import TestimonialCard from '@components/ui/TestimonialCard'
import type { Testimonial } from '../../types'

const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
  })

  // Placeholder testimonials (to be replaced with real client testimonials)
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah & Mike Johnson',
      role: 'Wedding Clients',
      content: 'Saxby Films captured our wedding day perfectly. Every moment was beautifully documented, and the final video exceeded our expectations. Highly recommended!',
      rating: 5,
    },
    {
      id: '2',
      name: 'Emily Chen',
      role: 'Debut Client',
      content: 'Professional, creative, and incredibly talented. They turned my debut celebration into a stunning visual story that I will treasure forever.',
      rating: 5,
    },
    {
      id: '3',
      name: 'David Rodriguez',
      role: 'Corporate Event',
      content: 'Exceptional work on our company anniversary event. The team was professional, and the final photos and videos were outstanding.',
      rating: 5,
    },
    {
      id: '4',
      name: 'Jessica & Tom Williams',
      role: 'Pre-Wedding Clients',
      content: 'Our pre-wedding session was an amazing experience. They made us feel comfortable, and the photos turned out absolutely stunning!',
      rating: 5,
    },
    {
      id: '5',
      name: 'Amanda Foster',
      role: 'Event Photography',
      content: 'Captured all the special moments of our charity event beautifully. The photos tell the story of our event perfectly.',
      rating: 5,
    },
    {
      id: '6',
      name: 'Robert & Linda Martinez',
      role: 'Wedding Clients',
      content: 'From our first meeting to the final delivery, the experience was wonderful. The wedding video is something we will watch for years to come.',
      rating: 5,
    },
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
    <section id="testimonials" ref={ref} className="py-24 md:py-32 px-6 md:px-12 testimonials-bg">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Don't just take our word for it — hear from the couples and clients
            who have trusted us with their special moments.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
