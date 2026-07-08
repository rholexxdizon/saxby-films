import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext'
import CursorProvider from './contexts/CursorContext'
import SEO from '@components/meta/SEO'
import SkipLink from '@components/ui/SkipLink'
import CustomCursor from '@components/ui/CustomCursor'
import Navigation from '@components/layout/Navigation'
import MobileMenu from '@components/ui/MobileMenu'
import Hero from '@components/sections/Hero'
import Services from '@components/sections/Services'
import Portfolio from '@components/sections/Portfolio'
import About from '@components/sections/About'
import Testimonials from '@components/sections/Testimonials'
import FAQ from '@components/sections/FAQ'
import Contact from '@components/sections/Contact'
import Footer from '@components/layout/Footer'
import Chatbot from '@components/ui/Chatbot'
import { useState } from 'react'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavigate = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <HelmetProvider>
      <SEO />
      <ThemeProvider>
        <CursorProvider>
          <div className="min-h-screen bg-saxby-bg-primary transition-colors duration-300 overflow-x-hidden">
            <CustomCursor />
            <SkipLink />
            <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              navItems={navItems}
              onNavigate={handleNavigate}
            />
            <main
              id="main"
              className={`transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'lg:translate-x-0 translate-x-72' : ''} ${isMobileMenuOpen ? 'pointer-events-none' : ''}`}
            >
              <Hero />
              <Services />
              <Portfolio />
              <About />
              <Testimonials />
              <FAQ />
              <Contact />
            </main>
            <div
              className={`transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'lg:translate-x-0 translate-x-72' : ''} ${isMobileMenuOpen ? 'pointer-events-none' : ''}`}
            >
              <Footer />
            </div>
            <Chatbot />
          </div>
        </CursorProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App