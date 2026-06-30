import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import TestimonialCard from '@components/ui/TestimonialCard'
import type { Testimonial } from '../../types'

const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
  })

  // Real client testimonials
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Carren Aiseldrick Felipe',
      role: 'January 31, 2026',
      content: 'Simula pa lang ng pre-nup until the wedding wala akong ibang nasabi kundi "the BEST SAXBY TEAM" 10000000000/10. Ang ganda ng pre-nup pati SDE. Sobrang professional at gaan nila kawork. Parang tropa na nga namin sila simula pa lang nong pre-nup. Lol At yung outcome ng vids nila wala akong narinig sa visitors kundi ang galing ng photos and vids. Iyak, tawa, kaba, saya lahat ng emotions naipakita nila sa output. Sobrang sulit 💯 even yung mga raws nila grabe ang gaganda na. 🥰 sila pinaka the best supplier ko nong kasal ko. ♥️ sobrang thankful ako sa inyooo.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Ma-e Merca',
      role: 'December 23, 2024',
      content: 'Huy sax and team. Ang galing niyo. 🥹 From Prenup to My very big Day. As in. Irerecomend talaga Kita. Very Hands on kahit naulan na. 🥹Appreciate ko talaga lahat ng effort sa Kasal namin. Kukunin namin kayo ulit very soon. ❤️',
      rating: 5,
    },
    {
      id: '3',
      name: 'Gibo Palmeras',
      role: 'May 23, 2024',
      content: 'Lakas mambudol nito. Pero super ganda ng kinalabasan. Alang masabe from Prenup, SDE and Photos! Ika nga ng mga friends ko, lakas makasosyal ng Prenup, at SDE, very me! 😂😂',
      rating: 5,
    },
    {
      id: '4',
      name: 'Mica Gapate Miranda',
      role: 'April 27, 2021',
      content: 'Very recommended, Budget friendly and madaling kausap. ☺️',
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
