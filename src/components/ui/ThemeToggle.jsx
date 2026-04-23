import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        height: '40px',
        width: '110px', // Increased width to give text breathing room
        overflow: 'hidden',
        outline: 'none'
      }}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isLight ? (
          <motion.div
            key="light"
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 25, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--theme-text-secondary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            light
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            initial={{ x: -25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -25, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              right: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--theme-text-secondary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            dark
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ rotate: isLight ? 0 : 180 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: 0,
          height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderBottom: '12px solid var(--theme-text-primary)'
        }}
      />
    </button>
  )
}
