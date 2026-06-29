import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@hooks/useTheme'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full glassmorphism flex items-center justify-center hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 primary" />
        ) : (
          <Sun className="w-5 h-5 text-light-accent" />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
