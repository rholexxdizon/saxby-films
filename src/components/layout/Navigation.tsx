import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/branding/logo/saxby-films-logo-2.jpg'
import { useCursorHover } from '@hooks/useCursorHover'

interface NavigationProps {
  onOpenChatbot?: () => void
  isMobileMenuOpen?: boolean
  setIsMobileMenuOpen?: (isOpen: boolean) => void
}

const Navigation = ({ onOpenChatbot, isMobileMenuOpen: controlledIsOpen, setIsMobileMenuOpen: controlledSetOpen }: NavigationProps = {}) => {
  // Use controlled state if provided, otherwise use local state
  const [localIsOpen, setLocalIsOpen] = useState(false)
  const isMobileMenuOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen
  const setIsMobileMenuOpen = controlledSetOpen || setLocalIsOpen

  // We'll use onOpenChatbot when needed
  void onOpenChatbot;
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Cursor hover effects
  const linkHover = useCursorHover({ text: 'Navigate' })
  const ctaHover = useCursorHover({ text: 'Book' })

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 ${
        isScrolled ? 'cinematic-card py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between flex-row-reverse lg:flex-row">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="Saxby Films Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full"
            />
            <span className="font-display font-bold text-xl md:text-2xl">
              Saxby Films
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={linkHover.onMouseEnter}
                onMouseLeave={linkHover.onMouseLeave}
                className="text-sm uppercase tracking-wider hover:text-accent transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              onMouseEnter={ctaHover.onMouseEnter}
              onMouseLeave={ctaHover.onMouseLeave}
              className="px-6 py-3 gold-gradient text-white rounded-full font-medium"
            >
              Book a Session
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navigation
