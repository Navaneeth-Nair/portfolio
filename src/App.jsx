import { useEffect } from 'react'
import './index.css'
import { MouseProvider } from './context/MouseContext'
import { ThemeProvider } from './context/ThemeContext'
import TriangleBackground from './components/canvas/TriangleBackground'
import CursorTrail from './components/canvas/CursorTrail'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import { initClickSounds } from './utils/sound'

export default function App() {
  useEffect(() => {
    // Initialize global click sound effect
    const cleanupSounds = initClickSounds()
    return cleanupSounds
  }, [])

  return (
    <ThemeProvider>
      <MouseProvider>
        {/* Fixed WebGL triangle background */}
        <TriangleBackground />

        {/* Triangle cursor trail */}
        <CursorTrail />

        {/* Noise overlay for texture */}
        <div className="noise-overlay" />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <div className="portfolio-wrapper">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </MouseProvider>
    </ThemeProvider>
  )
}
