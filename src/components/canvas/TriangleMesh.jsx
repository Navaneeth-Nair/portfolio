import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMouse } from '../../context/MouseContext'

const COLS = 24
const ROWS = 14
const VERTEX_COUNT = (COLS + 1) * (ROWS + 1)

function buildGeometry(width, height) {
  const positions = new Float32Array(VERTEX_COUNT * 3)
  const indices = []
  const cellW = width / COLS
  const cellH = height / ROWS

  for (let row = 0; row <= ROWS; row++) {
    for (let col = 0; col <= COLS; col++) {
      const i = (row * (COLS + 1) + col) * 3
      positions[i] = col * cellW - width / 2
      positions[i + 1] = row * cellH - height / 2
      positions[i + 2] = 0
    }
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const tl = row * (COLS + 1) + col
      const tr = tl + 1
      const bl = tl + (COLS + 1)
      const br = bl + 1
      // Every other cell flip the diagonal — creates varied triangle pattern
      if ((row + col) % 2 === 0) {
        indices.push(tl, bl, tr)
        indices.push(tr, bl, br)
      } else {
        indices.push(tl, bl, br)
        indices.push(tl, br, tr)
      }
    }
  }

  return { positions, indices, cellW, cellH }
}

export default function TriangleMesh() {
  const mouse = useMouse()
  const { size } = useThree()
  const meshRef = useRef()

  const { geometry, basePositions } = useMemo(() => {
    const { positions, indices, cellW, cellH } = buildGeometry(size.width, size.height)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    
    // Add color attribute for spotlight camouflage effect
    const colors = new Float32Array(VERTEX_COUNT * 3)
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    geo.setIndex(indices)
    geo.computeVertexNormals()

    return {
      geometry: geo,
      basePositions: positions.slice(),
      cellW,
      cellH,
    }
  }, [size.width, size.height])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = geometry.attributes.position.array
    const colorAttr = geometry.attributes.color.array
    
    const mx = mouse.current.nx * size.width / 2
    const my = mouse.current.ny * size.height / 2
    
    // Tightened influence area so it's a focused flashlight rather than a huge distracting web
    const influenceRadius = 250

    for (let i = 0; i < VERTEX_COUNT; i++) {
        const bi = i * 3
        const bx = basePositions[bi]
        const by = basePositions[bi + 1]

        const dx = bx - mx
        const dy = by - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        let influence = 0
        if (dist < influenceRadius) {
            // Sharper falloff for a cleaner spotlight edge
            influence = Math.pow(Math.cos((dist / influenceRadius) * (Math.PI / 2)), 1.5)
        }

        // Reduced random drift - keep it geometric and structured like Blender
        const driftX = Math.sin(t * 0.5 + by * 0.02) * 2
        const driftY = Math.cos(t * 0.5 + bx * 0.02) * 2

        // Pull vertices inward (density) and upward (3D depth) when hovered
        const pull = influence * 15
        const angle = Math.atan2(dy, dx)
        
        pos[bi] = bx + driftX - Math.cos(angle) * pull
        pos[bi + 1] = by + driftY - Math.sin(angle) * pull
        // Z-axis extrusion mapping to mouse proximity
        pos[bi + 2] = influence * 35 

        // Camouflage color: base matches #050505 exactly to be invisible
        // When hovered, it illuminates to a much more solid/opaque grey
        const baseIntensity = 0.02
        const highlightIntensity = baseIntensity + influence * 0.4
        
        colorAttr[bi] = highlightIntensity
        colorAttr[bi + 1] = highlightIntensity
        colorAttr[bi + 2] = highlightIntensity
    }

    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return (
    <group>
      {/* Solid dark base mesh to occlude lines behind the bumps */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#050505"
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Wireframe overlay that uses vertexColors for a spotlight effect */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          vertexColors={true}
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}
