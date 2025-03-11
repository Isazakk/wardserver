"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ModelAdjusterProps {
  onAdjust: (adjustments: ModelAdjustments) => void
}

interface ModelAdjustments {
  scale: number
  rotationX: number
  rotationY: number
  rotationZ: number
}

export function ModelAdjuster({ onAdjust }: ModelAdjusterProps) {
  const handleAdjustment = (property: keyof ModelAdjustments, value: number) => {
    onAdjust({ scale: 1, rotationX: 0, rotationY: 0, rotationZ: 0, [property]: value })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Model Adjustments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Scale</Label>
          <Slider
            defaultValue={[1]}
            min={0.1}
            max={2}
            step={0.1}
            onValueChange={([value]) => handleAdjustment("scale", value ?? 1)}
          />
        </div>
        <div className="space-y-2">
          <Label>Rotation X</Label>
          <Slider
            defaultValue={[0]}
            min={-180}
            max={180}
            step={1}
            onValueChange={([value]) => handleAdjustment("rotationX", value ?? 0)}
          />
        </div>
        <div className="space-y-2">
          <Label>Rotation Y</Label>
          <Slider
            defaultValue={[0]}
            min={-180}
            max={180}
            step={1}
            onValueChange={([value]) => handleAdjustment("rotationY", value ?? 0)}
          />
        </div>
        <div className="space-y-2">
          <Label>Rotation Z</Label>
          <Slider
            defaultValue={[0]}
            min={-180}
            max={180}
            step={1}
            onValueChange={([value]) => handleAdjustment("rotationZ", value ?? 0)}
          />
        </div>
      </CardContent>
    </Card>
  )
} 