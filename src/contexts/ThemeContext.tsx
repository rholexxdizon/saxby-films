import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) return savedTheme

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }

    return 'dark'
  })

  useEffect(() => {
    // Apply theme to document and body
    document.documentElement.setAttribute('data-theme', theme)
    document.body.className = theme === 'dark' ? '' : 'light'

    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
