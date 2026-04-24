import React, { createContext, useContext, useRef, useEffect } from 'react'

const MouseContext = createContext({ x: 0, y: 0, nx: 0, ny: 0 })

export function MouseProvider({ children }) {
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches
  const mouse = useRef({ x: 0, y: 0, nx: -10, ny: -10, active: !isTouchDevice })
  const timeoutRef = useRef(null)

  useEffect(() => {
    const resetActive = () => {
      mouse.current.active = false
    }

    const updateMouse = (x, y, active) => {
      mouse.current = {
        x,
        y,
        nx: (x / window.innerWidth) * 2 - 1,
        ny: -(y / window.innerHeight) * 2 + 1,
        active: active
      }
      
      // Auto-reset active state after 500ms of no movement (insurance for mobile)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (active) {
        timeoutRef.current = setTimeout(resetActive, 500)
      }
    }

    const handleMouseMove = (e) => {
      // Ignore mouse events if we're on a touch device to prevent "phantom" moves during scroll
      if (isTouchDevice && e.movementX === 0 && e.movementY === 0) return
      updateMouse(e.clientX, e.clientY, true)
    }

    const handleTouch = (e) => {
      const touch = e.touches[0]
      if (!touch) return
      updateMouse(touch.clientX, touch.clientY, true)
    }

    const handleEnd = () => {
      resetActive()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouch, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    window.addEventListener('touchend', handleEnd, { passive: true })
    window.addEventListener('touchcancel', handleEnd, { passive: true })
    document.addEventListener('mouseleave', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('touchend', handleEnd)
      window.removeEventListener('touchcancel', handleEnd)
      document.removeEventListener('mouseleave', handleEnd)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isTouchDevice])

  return (
    <MouseContext.Provider value={mouse}>
      {children}
    </MouseContext.Provider>
  )
}

export function useMouse() {
  return useContext(MouseContext)
}
