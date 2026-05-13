import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const GitHubSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)
const LinkedInSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const MailSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const SOCIALS = [
  { icon: GitHubSVG, href: 'https://github.com/Navaneeth-Nair', label: 'GitHub' },
  { icon: LinkedInSVG, href: 'https://www.linkedin.com/in/navaneeth-nair82/', label: 'LinkedIn' },
  { icon: MailSVG, href: 'mailto:navaneethnairdev@gmail.com', label: 'Email' },
]

export default function Hero() {
  const titleRef = useRef()
  const subtitleRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.char'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: 'power4.out',
          delay: 0.3,
        }
      )
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
      )
    })
    return () => ctx.revert()
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const name = 'Navaneeth'
  const chars = name.split('')

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 8vw',
        position: 'relative',
      }}
    >
      {/* Corner decoration triangles */}
      <svg
        style={{ position: 'absolute', top: 80, right: '5vw', opacity: 0.12 }}
        width="120" height="120" viewBox="0 0 120 120" fill="none"
      >
        <polygon points="60,0 120,120 0,120" stroke="var(--theme-text-primary)" strokeWidth="1" fill="none" />
        <polygon points="60,20 100,120 20,120" stroke="var(--theme-text-primary)" strokeWidth="0.5" fill="none" />
        <polygon points="60,40 80,120 40,120" stroke="var(--theme-text-primary)" strokeWidth="0.3" fill="none" />
      </svg>

      <svg
        style={{ position: 'absolute', bottom: 80, left: '3vw', opacity: 0.06, transform: 'rotate(180deg)' }}
        width="80" height="80" viewBox="0 0 80 80" fill="none"
      >
        <polygon points="40,0 80,80 0,80" stroke="var(--theme-text-primary)" strokeWidth="1" fill="none" />
        <polygon points="40,15 65,80 15,80" stroke="var(--theme-text-primary)" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          letterSpacing: '0.3em',
          color: 'var(--theme-text-tertiary)',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          Automation <span style={{ color: 'var(--theme-text-muted)' }}>•</span> Systems <span style={{ color: 'var(--theme-text-muted)' }}>•</span> ML
        </h2>
      </motion.div>

      {/* Main title */}
      <h1
        ref={titleRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 10vw, 9rem)',
          fontWeight: 700,
          lineHeight: 0.95,
          color: 'var(--theme-text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: '2rem',
          overflow: 'hidden',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            className="char"
            style={{
              display: 'inline-block',
              opacity: 0,
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char}
          </span>
        ))}
        <br />
        <span
          style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 4rem)', fontWeight: 300, letterSpacing: '0.02em', color: 'var(--theme-text-primary)',
          }}
        >
          Nair
        </span>
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        style={{
          maxWidth: '520px',
          fontSize: '1rem',
          lineHeight: '1.7',
          color: 'var(--theme-text-tertiary)',
          marginBottom: '3rem',
          fontWeight: 300,
          opacity: 0,
        }}
      >
        Systems engineer obsessed with automation pipelines, low-level performance,
        and ML-driven tooling. I build things that work reliably under pressure —
        from compilers and CLI tools to inference engines.
      </p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}
      >
        <button
          className="btn-primary"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View Projects
          <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
            <path d="M7,0 L12,5 L7,10 L6,9 L10,5 L6,1 Z" />
          </svg>
        </button>
        <a
          href="https://github.com/Navaneeth-Nair"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          GitHub ↗
        </a>
        <a
          href="/Navaneeth_Nair_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
          download="Navaneeth_Nair_Resume.pdf"
        >
          Resume ↓
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{ display: 'flex', gap: '1.5rem' }}
      >
        {SOCIALS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              color: 'var(--theme-text-tertiary)',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--theme-text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--theme-text-tertiary)')}
          >
            <Icon />
          </a>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}>
        <button
          onClick={scrollToAbout}
          aria-label="Scroll down"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.35 }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--theme-text-primary)', textTransform: 'uppercase' }}>Scroll</span>
          <div className="scroll-dot" />
        </button>
      </div>

      {/* Triangle repeat right side */}
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', opacity: 0.04 }}>
        <svg width="60" height="400" viewBox="0 0 60 400" fill="none">
          {[0, 60, 120, 180, 240, 300].map((y) => (
            <polygon key={y} points={`30,${y} 60,${y + 55} 0,${y + 55}`} stroke="var(--theme-text-primary)" strokeWidth="1" fill="none" />
          ))}
        </svg>
      </div>
    </section>
  )
}
