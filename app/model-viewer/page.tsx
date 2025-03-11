"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Grid } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { PrinterIcon as Printer3d, Download, RotateCcw, Maximize } from "lucide-react"
import type * as THREE from "three"
import { SiteHeader } from "@/components/site-header"

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005
    }
  })

  return <primitive ref={ref} object={scene} scale={1.5} position={[0, 0, 0]} />
}

function ModelViewer() {
  const [modelUrl, setModelUrl] = useState("/assets/3d/duck.glb")
  const [scale, setScale] = useState(1.5)
  const [autoRotate, setAutoRotate] = useState(true)

  const navItems = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Home", href: "/" },
  ]

  return (
    <div className="flex flex-col h-screen">
      <SiteHeader navItems={navItems} showAuth={false} />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-full h-full relative">
          <Canvas camera={{ position: [0, 2, 5], fov: 50 }} style={{ background: "black" }}>
            <color attach="background" args={["#000000"]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            <Model url={modelUrl} />

            <Grid
              renderOrder={-1}
              position={[0, -1, 0]}
              infiniteGrid
              cellSize={0.6}
              cellThickness={0.6}
              sectionSize={3.3}
              sectionThickness={1.5}
              fadeDistance={30}
              fadeStrength={1.5}
              cellColor="#444444"
              sectionColor="#888888"
            />
            <Environment preset="studio" />
            <OrbitControls autoRotate={autoRotate} enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="view">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="view" className="font-display">
                      View
                    </TabsTrigger>
                    <TabsTrigger value="print" className="font-display">
                      Order Print
                    </TabsTrigger>
                    <TabsTrigger value="export" className="font-display">
                      Export
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="view" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="scale" className="font-display">
                          Scale
                        </Label>
                        <span className="text-sm text-muted-foreground font-mono">{scale.toFixed(1)}x</span>
                      </div>
                      <Slider
                        id="scale"
                        min={0.5}
                        max={3}
                        step={0.1}
                        value={[scale]}
                        onValueChange={(value) => setScale(value[0])}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant={autoRotate ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setAutoRotate(!autoRotate)}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Auto-Rotate
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Maximize className="mr-2 h-4 w-4" />
                        Reset View
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="print" className="mt-4 space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-display">Material</Label>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              PLA
                            </Button>
                            <Button size="sm" className="flex-1">
                              Resin
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-display">Quality</Label>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              Standard
                            </Button>
                            <Button size="sm" className="flex-1">
                              High
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-display">Size</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Small
                          </Button>
                          <Button size="sm" className="flex-1">
                            Medium
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Large
                          </Button>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Printer3d className="mr-2 h-4 w-4" />
                        Order Print
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="export" className="mt-4 space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          STL
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          OBJ
                        </Button>
                      </div>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download All Files
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ModelViewerPage() {
  return <ModelViewer />
}

