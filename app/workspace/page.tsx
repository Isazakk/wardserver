"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CuboidIcon as Cube, ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Mock data for previously generated models
const mockModels = [
  {
    id: "model-1",
    name: "Chess Knight",
    date: "2023-06-01",
    thumbnail: "/placeholder.svg?height=200&width=200",
    modelUrl: "/assets/3d/duck.glb",
  },
  {
    id: "model-2",
    name: "Dragon Figurine",
    date: "2023-05-28",
    thumbnail: "/placeholder.svg?height=200&width=200",
    modelUrl: "/assets/3d/duck.glb",
  },
  {
    id: "model-3",
    name: "Phone Stand",
    date: "2023-05-20",
    thumbnail: "/placeholder.svg?height=200&width=200",
    modelUrl: "/assets/3d/duck.glb",
  },
  {
    id: "model-4",
    name: "Desk Organizer",
    date: "2023-05-15",
    thumbnail: "/placeholder.svg?height=200&width=200",
    modelUrl: "/assets/3d/duck.glb",
  },
]

export default function WorkspacePage() {
  const [models, setModels] = useState(mockModels)

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Generate", href: "/generate" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader navItems={navItems} showAuth={false} />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-07%2020.09.07%20-%20A%20high-tech%2C%20futuristic%20background%20designed%20for%20the%20%27Ward%203D%20Prints%27%20website.%20The%20scene%20features%20a%20sleek%2C%20dark%20metallic%20surface%20with%20glowing%20blue%20neon-GfajWJ9qZOxZZaoh2qZxTNbeAWWsYW.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display">Your Workspace</h1>
              <p className="text-muted-foreground font-mono">View and manage your previously generated 3D models</p>
            </div>
            <Link href="/generate">
              <Button className="gap-2 bg-black text-white hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4" />
                Back to Generator
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {models.map((model) => (
              <Card key={model.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={model.thumbnail || "/placeholder.svg"}
                    alt={model.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-white text-black hover:bg-gray-100 border border-gray-300"
                          onClick={() => (window.location.href = `/model-viewer?model=${model.modelUrl}`)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-black text-white hover:bg-gray-800"
                          onClick={() => (window.location.href = `/generate?model=${model.id}`)}
                        >
                          Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg font-display">{model.name}</CardTitle>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-mono">{model.date}</span>
                  <Cube className="h-4 w-4 text-blue-500" />
                </CardFooter>
              </Card>
            ))}

            {/* Add New Model Card */}
            <Link href="/generate">
              <Card className="overflow-hidden h-full border-dashed border-2 hover:border-primary/50 transition-colors duration-300 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 font-display">Create New Model</h3>
                <p className="text-sm text-muted-foreground font-mono">Generate a new 3D model using AI</p>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

