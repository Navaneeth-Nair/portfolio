import React, { createContext, useContext, useRef, useEffect } from 'react'

const MouseContext = createContext({ x: 0, y: 0, nx: 0, ny: 0 })

export function MouseProvider({ children }) {
  const mouse = useRef({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <MouseContext.Provider value={mouse}>
      {children}
    </MouseContext.Provider>
  )
}

export function useMouse() {
  return useContext(MouseContext)
}
