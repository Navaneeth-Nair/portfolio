import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  { name: 'Python', level: 90, category: 'Language' },
  { name: 'C / C++', level: 85, category: 'Language' },
  { name: 'Rust', level: 80, category: 'Language' },
  { name: 'AI / ML Models', level: 85, category: 'Machine Learning' },
  { name: 'n8n / Workflows', level: 88, category: 'Automation' },
  { name: 'Compiler Design', level: 75, category: 'Systems' },
  { name: 'Docker / Linux', level: 82, category: 'DevOps' },
  { name: 'CUDA / GPUs', level: 70, category: 'Hardware Acceleration' },
  { name: 'Firebase / Supabase', level: 85, category: 'Database' },
  { name: 'Redis', level: 80, category: 'Caching' },
  { name: 'TypeScript / JS', level: 75, category: 'Language' },
]

function SkillTile({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: '160px', position: 'relative' }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
    >
      <div
        className="glass-card triangle-corner-tr"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '1.5rem',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          transition: 'all 0.3s ease',
        }}
      >
        <svg
          style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.06 }}
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
        >
          <polygon points="60,0 60,60 0,60" fill="var(--theme-text-primary)" />
        </svg>

        <div
          style={{
            width: '36px',
            height: '31px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
            <polygon points="16,0 32,28 0,28" stroke="var(--theme-text-tertiary)" strokeWidth="1.5" fill="var(--theme-border-faint)" />
          </svg>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1rem',
            color: 'var(--theme-text-primary)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          {skill.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          color: 'var(--theme-text-tertiary)',
          textTransform: 'uppercase',
          marginTop: '4px'
        }}>
          {skill.category}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '8rem 8vw',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Top divider triangle */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 40" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '40px' }}>
          <polygon points="0,0 1440,0 720,40" fill="var(--theme-surface-glass)" />
        </svg>
      </div>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
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
        02 — Skills
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 700,
          color: 'var(--theme-text-primary)',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        Craft & Expertise
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          color: 'var(--theme-text-tertiary)',
          fontSize: '0.9rem',
          marginBottom: '3.5rem',
          maxWidth: '500px',
        }}
      >
        Built through curiosity, sharpened in production.
      </motion.p>

      {/* Skill grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1px',
          background: 'var(--theme-border-faint)',
        }}
      >
        {SKILLS.map((skill, i) => (
          <SkillTile key={skill.name} skill={skill} index={i} inView={isInView} />
        ))}
      </div>

      {/* Floating triangle accent */}
      <motion.svg
        initial={{ opacity: 0, rotate: -10 }}
        animate={isInView ? { opacity: 0.05, rotate: 0 } : {}}
        transition={{ duration: 2 }}
        style={{ position: 'absolute', bottom: '5%', right: '5%', pointerEvents: 'none' }}
        width="200"
        height="175"
        viewBox="0 0 200 175"
        fill="none"
      >
        <polygon points="100,0 200,175 0,175" stroke="var(--theme-text-primary)" strokeWidth="1" fill="none" />
      </motion.svg>
    </section>
  )
}
