import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'

const GitHubSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const PROJECTS = [
  {
    id: 1,
    title: 'NeuroMate',
    subtitle: 'AI Mental Well-Being Companion',
    description:
      'Developed an AI system for mood analysis, journaling insights, and focus-coaching using custom ML logic and LLM flows. Architected the backend with Firebase/Supabase and integrated Redis caching, reducing data retrieval time by roughly 40-45%.',
    tech: ['Python', 'Rust', 'ML/LLMs', 'Firebase', 'Redis', 'Tkinter'],
    category: 'AI / ML',
    year: '2025',
    github: 'https://github.com/Navaneeth-Nair/Neuromate',
    live: null,
    featured: true,
  },
  {
    id: 2,
    title: 'nsharp-compiler',
    subtitle: 'C Transpiler / Systems Compiler',
    description:
      'A custom compiler implementing advanced lexer and parser modules. Leveraged Rust\'s memory-safe concurrency to boost parsing stability, and designed a modular architecture for seamless feature integration and fast debugging.',
    tech: ['Rust', 'Compiler Design', 'Lexing / Parsing'],
    category: 'Systems',
    year: '2025',
    github: 'https://github.com/Navaneeth-Nair/nsharp-compiler',
    live: null,
    featured: true,
  },
  {
    id: 3,
    title: 'crpt',
    subtitle: 'CLI Version Control Clone',
    description:
      'A custom version control system inspired by Git, providing basic cloning, branching, and versioning capabilities straight from the terminal. Focuses on robust local tracking and delta management.',
    tech: ['Python', 'CLI', 'VCS'],
    category: 'Tooling',
    year: '2025',
    github: 'https://github.com/Navaneeth-Nair/crpt',
    live: null,
    featured: false,
  },
  {
    id: 4,
    title: 'AI Resume Screener',
    subtitle: 'Automated recruitment pipeline',
    description:
      'An intelligent resume screening and ranking system built in Python to evaluate candidate profiles based on skill alignment, experience metrics, and keyword relevance.',
    tech: ['Python', 'Machine Learning', 'NLP'],
    category: 'AI / Automation',
    year: '2025',
    github: 'https://github.com/Navaneeth-Nair/AI-resume-and-screening-and-ranking',
    live: null,
    featured: false,
  },
  {
    id: 5,
    title: 'Customer Billing Service',
    subtitle: 'High-performance C backend',
    description:
      'Extremely lightweight, high-performance customer billing system built purely in C. Uses direct memory management to maximize throughput on legacy or embedded systems.',
    tech: ['C', 'Memory Management', 'CLI'],
    category: 'Backend',
    year: '2023',
    github: 'https://github.com/Navaneeth-Nair/Customer-Billing-Service-Using-C',
    live: null,
    featured: false,
  },
  {
    id: 6,
    title: 'ClarityDesk',
    subtitle: 'Helpdesk ticket management',
    description:
      'A responsive helpdesk dashboard allowing quick issue tracking and resolution. Developed using modern JavaScript with an emphasis on snappy client interactions.',
    tech: ['JavaScript', 'HTML/CSS', 'Frontend'],
    category: 'Web App',
    year: '2025',
    github: 'https://github.com/Navaneeth-Nair/ClarityDesk',
    live: null,
    featured: false,
  },
]

function TriangleWipe({ isOpen }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 0%)' }}
          animate={{ clipPath: 'polygon(50% -10%, 110% 110%, -10% 110%)' }}
          exit={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 0%)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 1999,
          }}
        />
      )}
    </AnimatePresence>,
    document.body
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ zIndex: 2000 }}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cover */}
          <div
            style={{
              height: '220px',
              background: "var(--theme-surface-glass)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="xMidYMid slice">
              {/* Triangle grid pattern */}
              {Array.from({ length: 8 }, (_, row) =>
                Array.from({ length: 12 }, (_, col) => {
                  const x = col * 70
                  const y = row * 60
                  return (
                    <g key={`${row}-${col}`}>
                      <polygon
                        points={`${x + 35},${y} ${x + 70},${y + 60} ${x},${y + 60}`}
                        stroke="var(--theme-border-faint)"
                        strokeWidth="0.8"
                        fill="none"
                      />
                    </g>
                  )
                })
              )}
            </svg>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <svg width="50" height="44" viewBox="0 0 50 44" fill="none" style={{ marginBottom: '12px' }}>
                <polygon points="25,0 50,44 0,44" stroke="var(--theme-text-secondary)" strokeWidth="1.5" fill="var(--theme-border-faint)" />
                <polygon points="25,10 40,44 10,44" stroke="var(--theme-border-strong)" strokeWidth="1" fill="none" />
              </svg>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--theme-text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {project.category} · {project.year}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="modal-close-btn"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '4px', letterSpacing: '-0.01em' }}>
              {project.title}
            </h3>
            <p style={{ color: 'var(--theme-text-tertiary)', fontSize: '0.9rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
              {project.subtitle}
            </p>
            <p style={{ color: 'var(--theme-text-secondary)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '0.95rem' }}>
              {project.description}
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
              {project.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: 'none', fontSize: '0.75rem' }}>
                <GitHubSVG />
                View Code
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.75rem' }}>
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

function ProjectCard({ project, index, inView, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--theme-border-light)' : 'var(--theme-surface-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${hovered ? 'var(--theme-border-strong)' : 'var(--theme-border-light)'}`,
        borderTop: `1px solid ${hovered ? 'var(--theme-text-secondary)' : 'var(--theme-border-strong)'}`,
        boxShadow: hovered 
          ? '0 30px 60px -15px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.1)' 
          : '0 10px 30px -10px rgba(0,0,0,0.4), inset 0 1px 0 0 var(--theme-border-faint)',
        padding: '2.5rem 2rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-8px)' : 'none',
        zIndex: hovered ? 10 : 1,
      }}
    >
      {/* Triangle corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderTop: `32px solid ${hovered ? 'var(--theme-border-strong)' : 'var(--theme-border-light)'}`,
          borderLeft: '32px solid transparent',
          transition: 'border-top-color 0.3s ease',
        }}
      />

      {/* Background triangle decoration */}
      <svg
        style={{ position: 'absolute', bottom: -10, right: -10, opacity: hovered ? 0.1 : 0.04, transition: 'opacity 0.3s ease' }}
        width="80"
        height="70"
        viewBox="0 0 80 70"
        fill="var(--theme-text-primary)"
      >
        <polygon points="40,0 80,70 0,70" />
      </svg>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <span className="tag" style={{ marginBottom: '8px', display: 'inline-block' }}>{project.category}</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--theme-text-primary)', lineHeight: 1.2, marginBottom: '4px' }}>
            {project.title}
          </h3>
          <p style={{ color: 'var(--theme-text-tertiary)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            {project.subtitle}
          </p>
        </div>
        <motion.div
          animate={{ rotate: hovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <polygon points="8,0 16,14 0,14" fill="var(--theme-text-tertiary)" />
          </svg>
        </motion.div>
      </div>

      {/* Description preview */}
      <p style={{ color: 'var(--theme-text-tertiary)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {project.description}
      </p>

      {/* Tech pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="tag" style={{ fontSize: '0.65rem' }}>{t}</span>
        ))}
        {project.tech.length > 3 && (
          <span className="tag" style={{ fontSize: '0.65rem' }}>+{project.tech.length - 3}</span>
        )}
      </div>

      {/* Year */}
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--theme-border-strong)', letterSpacing: '0.1em' }}>
        {project.year}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section
      id="projects"
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
      {/* Triangle modal wipe effect */}
      <TriangleWipe isOpen={!!selectedProject} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

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
        03 — Projects
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
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
        Selected Work
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ color: 'var(--theme-text-tertiary)', fontSize: '0.9rem', marginBottom: '3.5rem', maxWidth: '400px' }}
      >
        Click any card to explore the full case study.
      </motion.p>

      {/* Project grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2.5rem',
          background: 'transparent',
          paddingTop: '1rem',
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            inView={isInView}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>
    </section>
  )
}
