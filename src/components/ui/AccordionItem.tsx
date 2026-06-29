import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useCursorHover } from '@hooks/useCursorHover'
import type { FAQ as FAQType } from '../../types'

interface AccordionItemProps {
  faq: FAQType
  isOpen: boolean
  onToggle: () => void
  index: number
}

const AccordionItem = ({ faq, isOpen, onToggle, index }: AccordionItemProps) => {
  const cursorHover = useCursorHover({ text: 'Expand' })

  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={item}
      className="cinematic-card rounded-xl overflow-hidden"
    >
      {/* Question Button */}
      <button
        onClick={onToggle}
        onMouseEnter={cursorHover.onMouseEnter}
        onMouseLeave={cursorHover.onMouseLeave}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-surface-tertiary/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={isOpen}
      >
        <span className="font-display font-semibold text-lg pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 secondary leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AccordionItem
