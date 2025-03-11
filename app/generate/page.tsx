"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, MessageSquareText, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ModelAdjuster from "@/components/model-adjuster"
import OrderProcess from "@/components/order-process"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={1.5} />
}

export default function GeneratePage() {
  const [generationMethod, setGenerationMethod] = useState<"text" | "image">("text")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [modelGenerated, setModelGenerated] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("grey")
  const [price, setPrice] = useState<number>(0)
  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [isAdjusting, setIsAdjusting] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)
  const [adjustedPrice, setAdjustedPrice] = useState<number>(0)
  const [prompt, setPrompt] = useState<string>("")
  const [queueCount, setQueueCount] = useState(0)
  const [validationWarning, setValidationWarning] = useState<string | null>(null)

  // Resin color options with individual images
  const colorOptions = [
    {
      value: "black",
      label: "Black",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-RZFCP1fiAilMLTXDYkABWrZ4Hab8FG.webp",
    },
    {
      value: "blue",
      label: "Blue",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-sg9ofLLiBYhv3gLJXnsxrng8Vx0Kab.webp",
    },
    {
      value: "grey",
      label: "Grey",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grey-ypdTV6DKUza77LtAlJv6dyzo51I2Vj.webp",
    },
    {
      value: "red",
      label: "Red",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/red-CMI44MSsAlMCFamVGDd01lcjWKLdeH.webp",
    },
    {
      value: "clear",
      label: "Clear",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clear-e2ELKMd3pelNkv1PFvIgoJQHlzFrY0.webp",
    },
    {
      value: "green",
      label: "Green",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/green-MB1CFrKIF7KU7K0b01C0JIwtt1Pf4P.webp",
    },
  ]

  useEffect(() => {
    // Simulate fetching queue count
    setQueueCount(Math.floor(Math.random() * 6))
  }, [])

  // Check if all required fields are filled
  const isFormValid = () => {
    if (queueCount >= 5) return false
    if (!selectedSize) return false
    if (!selectedColor) return false

    if (generationMethod === "text" && !prompt.trim()) return false
    if (generationMethod === "image" && !uploadedImage) return false

    return true
  }

  // Function to check what's missing and show appropriate warning
  const checkFormAndShowWarning = () => {
    if (queueCount >= 5) {
      setValidationWarning("The queue is currently full. Please try again later.")
      return
    }

    if (!selectedSize) {
      setValidationWarning("Please select a size for your model.")
      return
    }

    if (!selectedColor) {
      setValidationWarning("Please select a color for your model.")
      return
    }

    if (generationMethod === "text" && !prompt.trim()) {
      setValidationWarning("Please enter a text description for your model.")
      return
    }

    if (generationMethod === "image" && !uploadedImage) {
      setValidationWarning("Please upload a reference image for your model.")
      return
    }

    setValidationWarning(null)
  }

  const generateModel = async () => {
    if (!isFormValid()) {
      checkFormAndShowWarning()
      return
    }

    setValidationWarning(null)
    setIsGenerating(true)
    setGenerationProgress(0)
    setModelGenerated(false)

    try {
      // Mock API call with setTimeout to simulate network request
      setTimeout(() => {
        let progress = 0
        const interval = setInterval(() => {
          progress += 10
          setGenerationProgress(Math.min(progress, 100))

          if (progress >= 100) {
            clearInterval(interval)
            // Use a sample 3D model URL
            setModelUrl("/assets/3d/duck.glb")
            setModelGenerated(true)
            setIsGenerating(false)
            toast({
              title: "Model generated successfully",
              description: "Your 3D model is ready for viewing and ordering.",
            })
          }
        }, 500)
      }, 1000)
    } catch (error) {
      console.error("Error generating model:", error)
      toast({
        title: "Error generating model",
        description: "An error occurred while generating the model.",
        variant: "destructive",
      })
      setIsGenerating(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        setValidationWarning(null) // Clear any validation warnings
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    setValidationWarning(null) // Clear any validation warnings
    switch (size) {
      case "small":
        setPrice(15)
        break
      case "medium":
        setPrice(30)
        break
      case "large":
        setPrice(50)
        break
      default:
        setPrice(0)
    }
  }

  const handleAdjustModel = () => {
    setIsAdjusting(true)
  }

  const handleOrderPrint = () => {
    setIsOrdering(true)
  }

  const handlePriceChange = (newPrice: number) => {
    setAdjustedPrice(newPrice)
  }

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Pricing", href: "/#pricing" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader navItems={navItems} showThemeToggle={false} />
      <main
        className="flex-1 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-07%2020.14.52%20-%20A%20high-tech%2C%20futuristic%20background%20designed%20for%20the%20%27Ward%203D%20Prints%27%20website.%20The%20scene%20features%20a%20sleek%2C%20dark%20metallic%20surface%20with%20glowing%20blue%20neon-jpUxjepvUudmCyg9SsDiNbJV2IUn9r.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Enhanced lighting effects */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/30"></div>

        {/* Animated glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl animate-pulse"
          style={{ animationDuration: "12s" }}
        ></div>

        <div className="container max-w-4xl mx-auto relative z-10">
          <Card className="bg-card/90 backdrop-blur-sm text-card-foreground mb-8 shadow-xl border-opacity-30">
            <CardHeader>
              <CardTitle className="font-display">Generate Your 3D Model</CardTitle>
              <CardDescription className="font-mono">
                Create a 3D model using text prompts or reference images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Button
                  variant={generationMethod === "text" ? "default" : "outline"}
                  onClick={() => {
                    setGenerationMethod("text")
                    setValidationWarning(null)
                  }}
                  className="flex-1"
                >
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Text Prompt
                </Button>
                <Button
                  variant={generationMethod === "image" ? "default" : "outline"}
                  onClick={() => {
                    setGenerationMethod("image")
                    setValidationWarning(null)
                  }}
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Image Upload
                </Button>
              </div>

              {generationMethod === "text" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt" className="font-display">
                      Describe your 3D model
                    </Label>
                    <Textarea
                      id="prompt"
                      placeholder="A detailed chess piece of a knight with intricate details, suitable for 3D printing"
                      className="min-h-[120px] h-full font-mono"
                      style={{ height: "calc(100vh - 400px)", maxHeight: "300px" }}
                      value={prompt}
                      onChange={(e) => {
                        setPrompt(e.target.value)
                        setValidationWarning(null)
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image" className="font-display">
                      Upload a reference image
                    </Label>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      {uploadedImage ? (
                        <div className="relative w-full">
                          <img
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Uploaded reference"
                            className="max-h-[200px] mx-auto rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                              setUploadedImage(null)
                              setValidationWarning(null)
                            }}
                          >
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground mb-2 font-mono">
                            Drag and drop an image, or click to browse
                          </p>
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <Button variant="outline" onClick={() => document.getElementById("image")?.click()}>
                            Upload Image
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image-prompt" className="font-display">
                      Additional description (optional)
                    </Label>
                    <Textarea
                      id="image-prompt"
                      placeholder="Add any additional details or modifications to the reference image"
                      className="font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="size" className="font-display">
                    Select Size
                  </Label>
                  <Select onValueChange={handleSizeChange}>
                    <SelectTrigger id="size" className="font-mono">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (up to 50mm)</SelectItem>
                      <SelectItem value="medium">Medium (51mm - 100mm)</SelectItem>
                      <SelectItem value="large">Large (101mm - 200mm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color" className="font-display">
                    Select Resin Color
                  </Label>
                  <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 justify-center">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className={cn(
                          "relative cursor-pointer transition-all transform hover:scale-105",
                          selectedColor === color.value
                            ? "ring-4 ring-primary ring-offset-2 scale-110"
                            : "hover:ring-2 hover:ring-primary/50",
                        )}
                        onClick={() => {
                          setSelectedColor(color.value)
                          setValidationWarning(null)
                        }}
                      >
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative overflow-hidden"
                          style={{
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                            transform: "perspective(800px) rotateX(10deg)",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {/* Base image for all colors */}
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                              backgroundImage: `url('${color.imageUrl}')`,
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 opacity-60"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-white bg-black bg-opacity-50 px-2 py-1 rounded-full shadow-lg">
                            {color.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedSize && (
                  <div className="bg-muted/80 backdrop-blur-sm p-4 rounded-lg">
                    <h4 className="font-medium mb-2 font-display">Estimated Price</h4>
                    {price > 0 ? (
                      <p className="text-2xl font-bold font-mono">${price.toFixed(2)}</p>
                    ) : (
                      <p className="font-mono">Please select a size to see the price.</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2 font-mono">
                      Final price may vary based on model complexity.
                    </p>
                  </div>
                )}

                {/* Validation warning message */}
                {validationWarning && (
                  <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded-md" role="alert">
                    <p className="font-bold font-display">Please check your inputs</p>
                    <p className="font-mono">{validationWarning}</p>
                  </div>
                )}

                {isGenerating ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                        <p className="text-sm text-muted-foreground mb-2 font-mono">Generating your 3D model...</p>
                        <Progress value={generationProgress} className="w-[300px]" />
                        <p className="text-xs text-muted-foreground mt-2 font-mono">{generationProgress}% complete</p>
                      </div>
                    </div>
                  </div>
                ) : modelGenerated && modelUrl ? (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-background/50 backdrop-blur-sm">
                      <div className="aspect-square bg-black rounded-lg flex items-center justify-center">
                        <Canvas camera={{ position: [0, 0, 5] }} style={{ background: "black" }}>
                          <color attach="background" args={["#000000"]} />
                          <ambientLight intensity={0.5} />
                          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                          <pointLight position={[-10, -10, 10]} />
                          <Model url={modelUrl} />
                          <OrbitControls />
                        </Canvas>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium font-display">Printability Check:</span>
                          <span className="text-sm text-green-600 font-medium flex items-center">
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Printable
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium font-display">Estimated Print Time:</span>
                          <span className="text-sm font-mono">4 hours 30 minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium font-display">Material Usage:</span>
                          <span className="text-sm font-mono">120ml resin</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium font-display">Selected Color:</span>
                          <span className="text-sm capitalize font-mono">{selectedColor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              {queueCount >= 5 && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                  <p className="font-bold font-display">Queue Full</p>
                  <p className="font-mono">
                    The current queue is full. Please try again later when the queue has less than 5 models.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
              {!isGenerating && !modelGenerated ? (
                <>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 border border-gray-300"
                  >
                    <Link href="/">Cancel</Link>
                  </Button>
                  <div className="relative group w-full sm:w-auto">
                    {/* Glow effect behind the button */}
                    <div
                      className={cn(
                        "absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-75 transition duration-200",
                        isFormValid() ? "group-hover:opacity-100" : "opacity-30",
                      )}
                    ></div>
                    <Button
                      onClick={generateModel}
                      className={cn(
                        "relative w-full bg-black text-white hover:bg-gray-800 font-medium transition-all duration-200 transform hover:shadow-lg",
                        isFormValid()
                          ? "group-hover:scale-105"
                          : "opacity-70 cursor-not-allowed hover:bg-black hover:scale-100 hover:shadow-none",
                      )}
                    >
                      Generate Model
                    </Button>
                  </div>
                </>
              ) : modelGenerated ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setModelGenerated(false)}
                    className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 border border-gray-300"
                  >
                    Start Over
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Dialog open={isAdjusting} onOpenChange={setIsAdjusting}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={handleAdjustModel}
                          className="w-full bg-white text-black hover:bg-gray-100 border border-gray-300"
                        >
                          Adjust Model
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="font-display">Adjust Model</DialogTitle>
                          <DialogDescription className="font-mono">
                            Make adjustments to your 3D model before printing.
                          </DialogDescription>
                        </DialogHeader>
                        <ModelAdjuster
                          modelUrl={modelUrl || ""}
                          initialPrice={price}
                          onPriceChange={handlePriceChange}
                        />
                      </DialogContent>
                    </Dialog>
                    <div className="relative group w-full">
                      {/* Glow effect behind the button */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                      <Dialog open={isOrdering} onOpenChange={setIsOrdering}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={handleOrderPrint}
                            className="relative w-full bg-black text-white hover:bg-gray-800 transition-all duration-200"
                          >
                            Order Print
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle className="font-display">Order Your 3D Print</DialogTitle>
                            <DialogDescription className="font-mono">
                              Complete your order details and choose a payment method.
                            </DialogDescription>
                          </DialogHeader>
                          <OrderProcess
                            modelUrl={modelUrl || ""}
                            size={selectedSize}
                            price={price}
                            color={selectedColor}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="ml-auto bg-white text-black hover:bg-gray-100 border border-gray-300"
                  onClick={() => setIsGenerating(false)}
                >
                  Cancel Generation
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

