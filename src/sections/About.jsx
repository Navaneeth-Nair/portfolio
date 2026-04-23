import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

const stats = [
  { label: 'Workshops Hosted', value: '5+' },
  { label: 'Repositories', value: '15+' },
  { label: 'Technologies', value: '10+' },
]

export default function About() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' })

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '8rem 8vw',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background triangle accents */}
      <svg
        style={{ position: 'absolute', top: '10%', right: '2%', opacity: 0.04, pointerEvents: 'none' }}
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
      >
        <polygon points="150,0 300,300 0,300" stroke="var(--theme-text-primary)" strokeWidth="1" fill="none" />
        <polygon points="150,40 260,300 40,300" stroke="var(--theme-text-primary)" strokeWidth="0.6" fill="none" />
        <polygon points="150,80 220,300 80,300" stroke="var(--theme-text-primary)" strokeWidth="0.3" fill="none" />
      </svg>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            color: 'var(--theme-text-tertiary)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="var(--theme-text-primary)" opacity="0.35">
            <polygon points="7,0 14,12 0,12" />
          </svg>
          01 — About
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          {/* Left: Portrait */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            style={{ position: 'relative' }}
          >
            {/* Diamond frame */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px', margin: '0 auto' }}>
              {/* Outer triangle frame */}
              <svg
                style={{ position: 'absolute', inset: '-30px', width: 'calc(100% + 60px)', height: 'calc(100% + 60px)', zIndex: 1 }}
                viewBox="0 0 440 440"
                fill="none"
              >
                <polygon points="220,10 430,430 10,430" stroke="var(--theme-border-light)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                <polygon points="220,50 390,430 50,430" stroke="var(--theme-border-faint)" strokeWidth="1" fill="none" />
              </svg>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: 'var(--theme-surface-glass)',
                  border: '1px solid var(--theme-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Abstract geometric face placeholder */}
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" opacity="0.6">
                  <polygon points="100,10 190,180 10,180" stroke="var(--theme-text-primary)" strokeWidth="1.5" fill="none" />
                  <polygon points="100,40 165,180 35,180" stroke="var(--theme-text-secondary)" strokeWidth="1" fill="var(--theme-surface-glass)" />
                  <polygon points="100,70 140,180 60,180" stroke="var(--theme-text-tertiary)" strokeWidth="0.8" fill="var(--theme-surface-glass)" />
                  <circle cx="100" cy="75" r="15" stroke="var(--theme-text-primary)" strokeWidth="1" fill="none" />
                  <circle cx="100" cy="75" r="5" fill="var(--theme-text-primary)" opacity="0.6" />
                  <line x1="80" y1="100" x2="120" y2="100" stroke="var(--theme-text-tertiary)" strokeWidth="0.8" />
                  <line x1="75" y1="115" x2="125" y2="115" stroke="var(--theme-border-strong)" strokeWidth="0.6" />
                </svg>

                {/* Triangle corner accents */}
                <div className="triangle-corner-tr" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
                <div className="triangle-corner-bl" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
              </div>

              {/* Floating label */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  right: '-1rem',
                  background: 'var(--theme-text-primary)',
                  color: 'var(--theme-bg)',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  zIndex: 2,
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  willChange: 'transform',
                  WebkitFontSmoothing: 'antialiased',
                }}
              >
                Available for Work
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={1.5}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--theme-text-primary)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Turning Ideas Into
              <br />
              <span className="text-gradient">Scalable Systems</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={2}
              style={{
                color: 'var(--theme-text-secondary)',
                lineHeight: '1.8',
                marginBottom: '1.2rem',
                fontSize: '0.95rem',
              }}
            >
              I'm an Automation and Machine Learning Engineer focused on building scalable backend workflows, compiler design, and robust systems-level architecture. Through my internship at Tech Saksham, I further enhanced my ability to optimize AI task modules and develop reliable ML evaluation pipelines.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={2.3}
              style={{
                color: 'var(--theme-text-tertiary)',
                lineHeight: '1.8',
                marginBottom: '2.5rem',
                fontSize: '0.9rem',
              }}
            >
              Beyond coding, I have delivered multiple technical workshops on Linux, GitHub version control, CUDA programming, Cryptography, and Homelabbing capabilities—helping developers easily deploy their own self-hosted services and workflows.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={2.6}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--theme-border-faint)',
              }}
            >
              {stats.map(({ label, value }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: 'var(--theme-text-primary)',
                      lineHeight: 1,
                      marginBottom: '4px',
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      color: 'var(--theme-text-tertiary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section bottom divider */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 40" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '40px' }}>
          <polygon points="0,40 720,0 1440,40" fill="var(--theme-surface-glass)" />
        </svg>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
