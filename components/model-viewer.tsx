"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei"
import { Card } from "@/components/ui/card"
import { ModelAdjuster } from "@/components/model-adjuster"

interface ModelViewerProps {
  modelUrl: string
}

interface ModelAdjustments {
  scale: number
  rotationX: number
  rotationY: number
  rotationZ: number
}

export function ModelViewer({ modelUrl }: ModelViewerProps) {
  const [adjustments, setAdjustments] = useState<ModelAdjustments>({
    scale: 1,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="w-full aspect-square">
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
            <Stage environment="city" intensity={0.6}>
              <mesh
                scale={adjustments.scale}
                rotation={[
                  adjustments.rotationX * (Math.PI / 180),
                  adjustments.rotationY * (Math.PI / 180),
                  adjustments.rotationZ * (Math.PI / 180),
                ]}
              >
                {/* Model will be loaded here */}
              </mesh>
            </Stage>
            <OrbitControls makeDefault />
          </Canvas>
        </Card>
      </div>
      <div className="md:col-span-1">
        <ModelAdjuster onAdjust={setAdjustments} />
      </div>
    </div>
  )
}

export default ModelViewer;

