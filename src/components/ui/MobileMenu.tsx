import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: Array<{ name: string; href: string }>
  onNavigate: (href: string) => void
}

const MobileMenu = ({ isOpen, onClose, navItems, onNavigate }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/20 z-[10001]"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 left-0 h-full w-72 z-[10002] shadow-2xl flex flex-col border-r"
            style={{
              backgroundColor: '#131f0f',
              isolation: 'isolate'
            }}
          >
            {/* Drawer Header */}
            <div
              className="flex items-center justify-between p-5 border-b"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <span
                className="font-display font-bold text-lg"
                style={{ color: '#ffffff' }}
              >
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-saxby-accent/10 transition"
                style={{ color: '#ffffff' }}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate(item.href)
                    }}
                    className="block px-4 py-3 rounded-lg hover:bg-saxby-accent/10 transition text-lg uppercase tracking-wider"
                    style={{ color: '#ffffff' }}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavigate('#contact')
                  }}
                  className="block px-4 py-3 rounded-lg font-medium text-center mt-4"
                  style={{
                    backgroundColor: '#d4af37',
                    color: '#ffffff'
                  }}
                >
                  Book a Session
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
