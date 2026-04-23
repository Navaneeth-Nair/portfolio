import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import TriangleMesh from './TriangleMesh'

export default function TriangleBackground() {
  return (
    <Canvas
      id="triangle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
      camera={{ position: [0, 0, 600], fov: 75, near: 1, far: 2000 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <TriangleMesh />
      </Suspense>
    </Canvas>
  )
}
