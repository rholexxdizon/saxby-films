import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '../../types'

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  const card = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  // Generate stars
  const stars = Array.from({ length: testimonial.rating || 5 }, (_, i) => (
    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
  ))

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
      className="cinematic-card rounded-2xl p-8 relative group"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-20">
        <Quote className="w-12 h-12 text-accent" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {stars}
      </div>

      {/* Content */}
      <p className="text-secondary mb-6 leading-relaxed relative z-10">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
          <span className="text-accent font-display font-semibold text-lg">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-semibold">{testimonial.name}</div>
          <div className="text-sm text-secondary">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard
