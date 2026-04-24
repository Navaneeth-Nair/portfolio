import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useMouse } from '../../context/MouseContext'

const TRAIL_LENGTH = 8

export default function CursorTrail() {
  const trailRef = useRef([])
  const rafRef = useRef(null)
  const { theme } = useTheme()
  const mouse = useMouse()

  useEffect(() => {
    // Disable trail on touch devices for cleaner mobile UX
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (isTouch) return

    const container = document.getElementById('cursor-trail-container')
    if (!container) return
    container.innerHTML = ''

    const isLight = theme === 'light'
    const rgbColor = isLight ? '0, 0, 0' : '255, 255, 255'

    const triangles = Array.from({ length: TRAIL_LENGTH }, (_, i) => {
      const el = document.createElement('div')
      el.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: ${8 + (TRAIL_LENGTH - i) * 2}px;
        height: ${7 + (TRAIL_LENGTH - i) * 2}px;
        opacity: 0;
        transform-origin: center;
        transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      `
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', '0 0 20 17')
      svg.setAttribute('fill', 'none')
      svg.style.width = '100%'
      svg.style.height = '100%'
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
      poly.setAttribute('points', '10,0 20,17 0,17')
      
      const alpha = 0.6 * ((i + 1) / TRAIL_LENGTH)
      poly.setAttribute('stroke', `rgba(${rgbColor}, ${alpha})`)
      poly.setAttribute('stroke-width', '1.5')
      poly.setAttribute('fill', `rgba(${rgbColor}, ${alpha * 0.1})`)
      svg.appendChild(poly)
      el.appendChild(svg)
      container.appendChild(el)
      return { el, x: -100, y: -100 }
    })
    trailRef.current = triangles

    let positions = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))

    const animate = () => {
      // Shift positions
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        positions[i] = { ...positions[i - 1] }
      }
      
      const mouseState = mouse.current
      positions[0] = { x: mouseState.x, y: mouseState.y }

      triangles.forEach((t, i) => {
        const pos = positions[i]
        const size = 8 + (TRAIL_LENGTH - i) * 2
        t.el.style.left = `${pos.x - size / 2}px`
        t.el.style.top = `${pos.y - size / 2 - 2}px`
        t.el.style.transform = `rotate(${i * 15}deg) scale(${1 - i * 0.08})`
        
        // Hide trail if pointer is inactive
        t.el.style.opacity = mouseState.active ? '1' : '0'
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      triangles.forEach((t) => t.el.remove())
    }
  }, [theme, mouse])

  return <div id="cursor-trail-container" style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }} />
}
