import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // Determine active section
      const sections = NAV_LINKS.map(l => document.getElementById(l.id))
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(NAV_LINKS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0 2rem',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollTo('hero')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
          <polygon points="16,0 32,28 0,28" fill="white" opacity="0.9" />
          <polygon points="16,6 30,28 2,28" fill="none" stroke="#666" strokeWidth="0.5" />
          <polygon points="16,12 24,28 8,28" fill="black" opacity="0.8" />
        </svg>
      </button>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: active === link.id ? 'white' : 'rgba(255,255,255,0.45)',
              transition: 'color 0.3s ease',
              position: 'relative',
              paddingBottom: '4px',
            }}
            className="animated-underline"
          >
            {link.label}
            {active === link.id && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'white',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px',
        }}
        className="mobile-hamburger"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{
              rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
              y: menuOpen ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'white',
              transformOrigin: 'center',
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '70px',
              left: 0,
              right: 0,
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: active === link.id ? 'white' : 'rgba(255,255,255,0.5)',
                  textAlign: 'left',
                  paddingBlock: '4px',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}
