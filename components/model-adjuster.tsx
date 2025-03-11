"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

function Model({ url, scale, rotation }: { url: string; scale: number; rotation: [number, number, number] }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={scale} rotation={rotation} />
}

export default function ModelAdjuster({
  modelUrl,
  initialPrice,
  onPriceChange,
}: { modelUrl: string; initialPrice: number; onPriceChange: (newPrice: number) => void }) {
  const [scale, setScale] = useState(1)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)
  const [rotationZ, setRotationZ] = useState(0)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    const newPrice = initialPrice * scale
    setPrice(newPrice)
    onPriceChange(newPrice)
  }, [scale, initialPrice, onPriceChange])

  const handleSave = () => {
    // Here you would typically save the adjustments to your backend
    console.log("Saving adjustments:", { scale, rotation: [rotationX, rotationY, rotationZ], price })
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-muted rounded-lg">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Model url={modelUrl} scale={scale} rotation={[rotationX, rotationY, rotationZ]} />
          <OrbitControls />
        </Canvas>
      </div>
      <div className="space-y-2">
        <Label>Scale</Label>
        <Slider min={0.5} max={2} step={0.1} value={[scale]} onValueChange={(value) => setScale(value[0])} />
      </div>
      <div className="space-y-2">
        <Label>Rotation X</Label>
        <Slider
          min={0}
          max={Math.PI * 2}
          step={0.1}
          value={[rotationX]}
          onValueChange={(value) => setRotationX(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label>Rotation Y</Label>
        <Slider
          min={0}
          max={Math.PI * 2}
          step={0.1}
          value={[rotationY]}
          onValueChange={(value) => setRotationY(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label>Rotation Z</Label>
        <Slider
          min={0}
          max={Math.PI * 2}
          step={0.1}
          value={[rotationZ]}
          onValueChange={(value) => setRotationZ(value[0])}
        />
      </div>
      <div className="text-lg font-semibold">Adjusted Price: ${price.toFixed(2)}</div>
      <Button onClick={handleSave} className="w-full">
        Save Adjustments
      </Button>
    </div>
  )
}

