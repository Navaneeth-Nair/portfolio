import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send } from 'lucide-react'

const GitHubSVG = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)
const LinkedInSVG = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const TwitterSVG = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 1200 1227" fill="currentColor">
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6904H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/>
  </svg>
)
const MailSVG = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const SOCIALS = [
  { icon: GitHubSVG, href: 'https://github.com/Navaneeth-Nair', label: 'GitHub', handle: 'Navaneeth-Nair' },
  { icon: LinkedInSVG, href: 'https://linkedin.com/in/navaneeth%20nair', label: 'LinkedIn', handle: 'in/navaneeth nair' },
  { icon: MailSVG, href: 'mailto:navaneethnairdev@gmail.com', label: 'Email', handle: 'navaneethnairdev@gmail.com' },
]

export default function Contact() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)
  const [footerText, setFooterText] = useState('made with love and polygons')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '8rem 8vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large triangle background decoration */}
      <svg
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.025, pointerEvents: 'none', zIndex: 0 }}
        width="800"
        height="700"
        viewBox="0 0 800 700"
        fill="none"
      >
        <polygon points="400,0 800,700 0,700" stroke="white" strokeWidth="1.5" fill="none" />
        <polygon points="400,60 720,700 80,700" stroke="white" strokeWidth="1" fill="none" />
        <polygon points="400,120 640,700 160,700" stroke="white" strokeWidth="0.6" fill="none" />
        <polygon points="400,180 560,700 240,700" stroke="white" strokeWidth="0.4" fill="none" />
      </svg>

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="white" opacity="0.35">
            <polygon points="7,0 14,12 0,12" />
          </svg>
          04 — Contact
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              Let's Build
              <br />
              <span className="text-gradient">Something Great</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.8', marginBottom: '3rem', fontSize: '0.95rem' }}
            >
              Open to freelance projects, full-time roles, and interesting collaborations.
              If you have an idea worth building, I'd love to hear about it.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {SOCIALS.map(({ icon: Icon, href, label, handle }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    padding: '12px 16px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  }}
                >
                  <Icon size={16} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.5 }}>{handle}</div>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 0,
                      height: 0,
                      borderTop: '18px solid rgba(255,255,255,0.08)',
                      borderLeft: '18px solid transparent',
                    }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                  gap: '1.5rem',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '3rem',
                }}
              >
                <svg width="60" height="52" viewBox="0 0 60 52" fill="none">
                  <polygon points="30,0 60,52 0,52" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
                  <polygon points="30,12 48,52 12,52" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                </svg>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'white', fontWeight: 700 }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', maxWidth: '280px' }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Form header */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="white" opacity="0.3">
                    <polygon points="8,0 16,14 0,14" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                    new_message.txt
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}
                    >
                      Name
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="contact-name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      required
                      style={{
                        borderColor: focused === 'name' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}
                    >
                      Email
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      id="contact-email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                      style={{
                        borderColor: focused === 'email' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}
                    >
                      Message
                    </label>
                    <textarea
                      className="form-input"
                      id="contact-message"
                      placeholder="Tell me about your project..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      required
                      rows={5}
                      style={{
                        resize: 'vertical',
                        fontFamily: 'var(--font-body)',
                        minHeight: '120px',
                        borderColor: focused === 'message' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '14px 28px' }}
                  >
                    <Send size={14} />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 8vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <span 
          onClick={() => setFooterText('baseball huh?')}
          style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.65rem', 
            color: 'rgba(255,255,255,0.2)', 
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
        >
          {footerText}
        </span>
        <svg width="20" height="17" viewBox="0 0 20 17" fill="white" opacity="0.15">
          <polygon points="10,0 20,17 0,17" />
        </svg>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
