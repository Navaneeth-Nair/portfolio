import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMouse } from '../../context/MouseContext'
import { useTheme } from '../../context/ThemeContext'

function buildGeometry(width, height, cols, rows) {
  const vertexCount = (cols + 1) * (rows + 1);
  const positions = new Float32Array(vertexCount * 3)
  const indices = []
  const cellW = width / cols
  const cellH = height / rows

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const i = (row * (cols + 1) + col) * 3
      positions[i] = col * cellW - width / 2
      positions[i + 1] = row * cellH - height / 2
      positions[i + 2] = 0
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tl = row * (cols + 1) + col
      const tr = tl + 1
      const bl = tl + (cols + 1)
      const br = bl + 1
      if ((row + col) % 2 === 0) {
        indices.push(tl, bl, tr)
        indices.push(tr, bl, br)
      } else {
        indices.push(tl, bl, br)
        indices.push(tl, br, tr)
      }
    }
  }

  return { positions, indices, vertexCount }
}

export default function TriangleMesh() {
  const mouse = useMouse()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const { size, viewport } = useThree()
  const meshRef = useRef()

  const responsiveWidth = Math.round(size.width / 100) * 100

  const { geometry, basePositions, vertexCount } = useMemo(() => {
    const cols = Math.max(8, Math.ceil(size.width / 60))
    const rows = Math.max(12, Math.ceil(size.height / 60))
    const pad = 1.3
    const w = viewport.width * pad
    const h = viewport.height * pad

    const { positions, indices, vertexCount: vCount } = buildGeometry(w, h, cols, rows)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    
    const colors = new Float32Array(vCount * 3)
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()

    return {
      geometry: geo,
      basePositions: positions.slice(),
      vertexCount: vCount,
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsiveWidth])

  useEffect(() => {
    return () => {
      geometry.dispose()
    }
  }, [geometry])

  const activityRef = useRef(0)

  useFrame((state, delta) => {
    const { clock } = state
    const t = clock.getElapsedTime()
    const pos = geometry.attributes.position.array
    const colorAttr = geometry.attributes.color.array
    
    // Smoothly transition activity level (0 when inactive, 1 when active)
    const targetActivity = mouse.current.active ? 1 : 0
    activityRef.current = THREE.MathUtils.lerp(activityRef.current, targetActivity, 1 - Math.pow(0.001, delta))
    
    const mx = mouse.current.nx * (viewport.width / 2)
    const my = mouse.current.ny * (viewport.height / 2)
    
    const isMobile = size.width < 768
    const influenceRadius = isMobile ? viewport.width * 0.35 : viewport.width * 0.2

    // Setup base camouflage depending on active mode
    const baseIntensity = isLight ? 0.975 : 0.015
    const peakIntensity = isLight ? (isMobile ? -0.6 : -0.9) : (isMobile ? 0.2 : 0.4)

    for (let i = 0; i < vertexCount; i++) {
        const bi = i * 3
        const bx = basePositions[bi]
        const by = basePositions[bi + 1]

        const dx = bx - mx
        const dy = by - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        let influence = 0
        if (dist < influenceRadius) {
            influence = Math.pow(Math.cos((dist / influenceRadius) * (Math.PI / 2)), 1.5)
        }

        // Apply activity level to fade out blotches when finger is lifted
        influence *= activityRef.current

        const driftX = Math.sin(t * 0.5 + by * 0.02) * (isMobile ? 1 : 2)
        const driftY = Math.cos(t * 0.5 + bx * 0.02) * (isMobile ? 1 : 2)

        const pull = influence * (isMobile ? 10 : 25)
        const angle = Math.atan2(dy, dx)
        const mobileWave = isMobile ? Math.sin(t * 1.5 + bx * 0.02 + by * 0.02) * 15 : 0

        pos[bi] = bx + driftX - Math.cos(angle) * pull
        pos[bi + 1] = by + driftY - Math.sin(angle) * pull
        pos[bi + 2] = influence * (isMobile ? 25 : 55) + mobileWave

        const highlightIntensity = baseIntensity + influence * peakIntensity
        
        colorAttr[bi] = highlightIntensity
        colorAttr[bi + 1] = highlightIntensity
        colorAttr[bi + 2] = highlightIntensity
    }

    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
    geometry.computeVertexNormals()
  })

  // Read raw hex from document root to keep solid material synced
  const meshBg = isLight ? '#f8f9fa' : '#050505'

  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={meshBg}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh geometry={geometry}>
        <meshBasicMaterial
          vertexColors={true}
          wireframe={true}
          transparent={true}
          // Don't nuke opacity in light mode, otherwise the dark lines disappear.
          opacity={isLight ? 0.6 : 0.8}
        />
      </mesh>
    </group>
  )
}
