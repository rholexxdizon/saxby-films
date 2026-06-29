import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext'
import CursorProvider from './contexts/CursorContext'
import SEO from '@components/meta/SEO'
import SkipLink from '@components/ui/SkipLink'
import CustomCursor from '@components/ui/CustomCursor'
import Navigation from '@components/layout/Navigation'
import Hero from '@components/sections/Hero'
import Services from '@components/sections/Services'
import Portfolio from '@components/sections/Portfolio'
import About from '@components/sections/About'
import Testimonials from '@components/sections/Testimonials'
import FAQ from '@components/sections/FAQ'
import Contact from '@components/sections/Contact'
import Footer from '@components/layout/Footer'
import Chatbot from '@components/ui/Chatbot'

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <ThemeProvider>
        <CursorProvider>
          <div className="min-h-screen bg-saxby-bg-primary transition-colors duration-300">
            <CustomCursor />
            <SkipLink />
            <Navigation />
            <main id="main">
              <Hero />
              <Services />
              <Portfolio />
              <About />
              <Testimonials />
              <FAQ />
              <Contact />
            </main>
            <Footer />
            <Chatbot />
          </div>
        </CursorProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App