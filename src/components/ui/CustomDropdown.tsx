import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useCursorHover } from '@hooks/useCursorHover'

interface CustomDropdownProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  className?: string
}

const CustomDropdown = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const dropdownHover = useCursorHover({ text: 'Select' })

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <label className="block text-sm font-medium mb-2 text-primary">{label}</label>

      {/* Dropdown Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 surface-secondary border border-light rounded-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
        whileTap={{ scale: 0.98 }}
        {...dropdownHover}
      >
        <span className={value ? 'text-primary' : 'text-tertiary'}>
          {value || placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-secondary" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 surface-secondary border border-light rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <motion.button
                type="button"
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full px-4 py-3 text-left hover:bg-surface-tertiary transition-colors focus:outline-none focus:bg-surface-tertiary"
                whileHover={{ x: 4 }}
                {...dropdownHover}
              >
                <span className={value === option ? 'text-accent font-medium' : 'text-primary'}>
                  {option}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomDropdown