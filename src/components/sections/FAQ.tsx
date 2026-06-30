import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AccordionItem from '@components/ui/AccordionItem'
import type { FAQ as FAQType } from '../../types'

const FAQ = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // FAQ questions as specified
  const faqs: FAQType[] = [
    {
      id: 'booking',
      question: 'How do I book Saxby Films?',
      answer: 'To book our services, simply fill out the contact form on our website with your event details. We will get back to you within 24-48 hours to discuss your requirements and provide a personalized quote based on your needs.',
    },
    {
      id: 'reservation',
      question: 'Is reservation required?',
      answer: 'Yes, we recommend booking as early as possible to secure your date. Weddings and major events typically require at least 6-12 months advance notice, especially during peak season. However, we always try to accommodate last-minute requests when our schedule permits.',
    },
    {
      id: 'photo-delivery',
      question: 'How long before photos are delivered?',
      answer: 'Photo delivery time varies by event type. For weddings and pre-wedding sessions, photos are typically delivered within 4-8 weeks. For smaller events and corporate functions, delivery is usually within 2-4 weeks. We provide sneak peeks within 1 week for most events.',
    },
    {
      id: 'video-delivery',
      question: 'How long before videos are delivered?',
      answer: 'Video editing and post-production require careful attention. Wedding films and Same Day Edits have different timelines — SDEs are delivered at the event, while full wedding films typically take 8-12 weeks. Shorter event videos are usually delivered within 4-6 weeks.',
    },
    {
      id: 'customization',
      question: 'Can packages be customized?',
      answer: 'Absolutely! We offer flexible packages that can be tailored to your specific needs, budget, and preferences. During our consultation, we will work with you to create a customized package that includes exactly what you envision for your event.',
    },
    {
      id: 'travel',
      question: 'Do you travel outside your area?',
      answer: 'Yes, we love to travel! We are available for destination weddings and events worldwide. Travel fees apply for locations outside our primary service area, and we are happy to discuss destination packages that include travel and accommodation.',
    },
    {
      id: 'drone',
      question: 'Do you provide drone coverage?',
      answer: 'Yes, we offer professional drone coverage with licensed and experienced drone operators. Drone footage adds breathtaking aerial perspectives to your event coverage. Weather conditions, local regulations, and venue permissions are factors we consider for drone shoots.',
    },
  ]

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
    <section id="faq" ref={ref} className="py-24 md:py-32 px-6 md:px-12 faq-bg bg-saxby-surface transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Find answers to common questions about our services, booking process,
            and what to expect when working with Saxby Films.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
