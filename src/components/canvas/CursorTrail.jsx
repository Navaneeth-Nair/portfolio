import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 8

export default function CursorTrail() {
  const trailRef = useRef([])
  const mouseRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Create trail elements
    const container = document.getElementById('cursor-trail-container')
    if (!container) return

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
        transition: opacity 0.3s ease;
      `
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', '0 0 20 17')
      svg.setAttribute('fill', 'none')
      svg.style.width = '100%'
      svg.style.height = '100%'
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
      poly.setAttribute('points', '10,0 20,17 0,17')
      
      const alpha = 0.6 * ((i + 1) / TRAIL_LENGTH)
      poly.setAttribute('stroke', `rgba(255,255,255,${alpha})`)
      poly.setAttribute('stroke-width', '1.5')
      poly.setAttribute('fill', `rgba(255,255,255,${alpha * 0.1})`)
      svg.appendChild(poly)
      el.appendChild(svg)
      container.appendChild(el)
      return { el, x: -100, y: -100 }
    })
    trailRef.current = triangles

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      triangles.forEach((t) => {
        t.el.style.opacity = '1'
      })
    }

    const handleMouseLeave = () => {
      triangles.forEach((t) => {
        t.el.style.opacity = '0'
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    let positions = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))

    const animate = () => {
      // Shift positions
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        positions[i] = { ...positions[i - 1] }
      }
      positions[0] = { ...mouseRef.current }

      triangles.forEach((t, i) => {
        const pos = positions[i]
        const size = 8 + (TRAIL_LENGTH - i) * 2
        t.el.style.left = `${pos.x - size / 2}px`
        t.el.style.top = `${pos.y - size / 2 - 2}px`
        t.el.style.transform = `rotate(${i * 15}deg) scale(${1 - i * 0.08})`
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
      triangles.forEach((t) => t.el.remove())
    }
  }, [])

  return <div id="cursor-trail-container" style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }} />
}
