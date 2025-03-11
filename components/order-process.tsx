"use client"

import Link from "next/link"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, ShoppingCartIcon as Paypal, Smartphone } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

const ACCEPTED_CARDS = ["visa", "mastercard", "amex", "discover"]

export default function OrderProcess({
  modelUrl,
  size,
  price,
  color,
}: { modelUrl: string; size: string; price: number; color: string }) {
  const [step, setStep] = useState(1)
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardType, setCardType] = useState<string | null>(null)
  const [shippingCost, setShippingCost] = useState(0)

  const venmoUsername = "ISaacWard344"
  const venmoPaymentUrl = `venmo://paycharge?txn=pay&recipients=${venmoUsername}&amount=${price}&note=3D Print Order`

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment
    console.log("Processing payment:", { shippingDetails, paymentMethod, modelUrl, size, price })
    setStep(3)

    // Add a timeout to simulate order processing before redirecting
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 3000)
  }

  const detectCardType = (cardNumber: string) => {
    if (cardNumber.startsWith("4")) return "visa"
    if (/^5[1-5]/.test(cardNumber)) return "mastercard"
    if (/^3[47]/.test(cardNumber)) return "amex"
    if (/^6(?:011|5)/.test(cardNumber)) return "discover"
    return null
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardNumber = e.target.value
    setCardType(detectCardType(cardNumber))
  }

  useEffect(() => {
    // Simulate shipping cost calculation based on a random US zip code
    const randomZip = Math.floor(Math.random() * 90000) + 10000
    const distance = Math.abs(randomZip - 63367) // 63367 is the zip code for Lake Saint Louis, MO
    const baseCost = 5
    const costPerMile = 0.1
    const calculatedCost = baseCost + (distance / 100) * costPerMile
    setShippingCost(Math.round(calculatedCost * 100) / 100)
  }, [])

  return (
    <div className="space-y-4">
      {step === 1 && (
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={shippingDetails.name}
              onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={shippingDetails.address}
              onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={shippingDetails.city}
                onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={shippingDetails.state}
                onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                value={shippingDetails.zip}
                onChange={(e) => setShippingDetails({ ...shippingDetails, zip: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={shippingDetails.country}
                onChange={(e) => setShippingDetails({ ...shippingDetails, country: e.target.value })}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Continue to Payment
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Select Payment Method</Label>
            <RadioGroup onValueChange={setPaymentMethod} required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center">
                  <CreditCard className="mr-2" /> Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center">
                  <Paypal className="mr-2" /> PayPal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="venmo" id="venmo" />
                <Label htmlFor="venmo" className="flex items-center">
                  <Smartphone className="mr-2" /> Venmo
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="venmo">Venmo</TabsTrigger>
            </TabsList>
            <TabsContent value="card">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required onChange={handleCardNumberChange} />
                {cardType && (
                  <p className="text-sm text-muted-foreground">
                    Card type: <span className="font-medium">{cardType}</span>
                  </p>
                )}
                <p className="text-sm text-muted-foreground">Accepted cards: {ACCEPTED_CARDS.join(", ")}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="paypal">
              <p>You will be redirected to PayPal to complete your payment.</p>
            </TabsContent>
            <TabsContent value="venmo">
              <div className="text-center">
                <p className="mb-4">Scan this QR code with your Venmo app to pay:</p>
                <div className="inline-block bg-white p-4 rounded-lg">
                  <QRCodeSVG value={venmoPaymentUrl} size={200} />
                </div>
                <p className="mt-4">Or pay to: @{venmoUsername}</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Order Summary</h4>
            <p>Model Size: {size}</p>
            <p>Model Color: {color}</p>
            <p>Model Price: ${price.toFixed(2)}</p>
            <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
            <p className="font-bold mt-2">Total: ${(price + shippingCost).toFixed(2)}</p>
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Place Order
          </Button>
        </form>
      )}

      {step === 3 && (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Order Placed Successfully!</h3>
          <p className="mb-4">Your order number is: #WD-{Math.floor(Math.random() * 10000)}</p>
          <p className="mb-4">You can track your order status in your account dashboard.</p>
          <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

