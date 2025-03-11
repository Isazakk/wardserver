"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SiteHeader } from "@/components/site-header"

// Mock order data (replace with actual API call in a real application)
const mockOrders = {
  "WD-1234": {
    status: "Processing",
    progress: 25,
    estimatedDelivery: "2023-06-15",
    shippingAddress: "123 Main St, Anytown, CA 12345",
    trackingNumber: "TRK123456789",
    carrier: "USPS",
    paymentMethod: "Credit Card",
    lastFour: "4242",
    orderDate: "2023-06-01",
    modelName: "Chess Knight",
    size: "Medium",
    color: "Black",
    price: 30.0,
  },
  "WD-5678": {
    status: "Printing",
    progress: 50,
    estimatedDelivery: "2023-06-12",
    shippingAddress: "456 Oak Ave, Somewhere, NY 54321",
    trackingNumber: "TRK987654321",
    carrier: "FedEx",
    paymentMethod: "PayPal",
    lastFour: "",
    orderDate: "2023-05-28",
    modelName: "Dragon Figurine",
    size: "Large",
    color: "Red",
    price: 50.0,
  },
  "WD-9012": {
    status: "Shipped",
    progress: 75,
    estimatedDelivery: "2023-06-10",
    shippingAddress: "789 Pine St, Nowhere, TX 67890",
    trackingNumber: "TRK456789123",
    carrier: "UPS",
    paymentMethod: "Venmo",
    lastFour: "",
    orderDate: "2023-05-20",
    modelName: "Phone Stand",
    size: "Small",
    color: "Blue",
    price: 15.0,
  },
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [orderDetails, setOrderDetails] = useState<null | {
    status: string
    progress: number
    estimatedDelivery: string
    shippingAddress: string
    trackingNumber: string
    carrier: string
    paymentMethod: string
    lastFour: string
    orderDate: string
    modelName: string
    size: string
    color: string
    price: number
  }>(null)

  // Custom nav items for track order page
  const navItems = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" },
  ]

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const order = mockOrders[orderNumber as keyof typeof mockOrders]
    setOrderDetails(order || null)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader navItems={navItems} showAuth={false} showOrdersDropdown={true} />
      <main className="flex-1 py-10">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
              <CardDescription>Enter your order number to see its current status</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="order-number">Order Number</Label>
                  <Input
                    id="order-number"
                    placeholder="e.g., WD-1234"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Track Order</Button>
              </form>
              {orderDetails && (
                <div className="mt-8 space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Order Status: {orderDetails.status}</h3>
                    <Progress value={orderDetails.progress} className="w-full mb-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Order Placed</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Shipping Details</h4>
                        <p className="text-sm mb-1">
                          <span className="text-muted-foreground">Address:</span> {orderDetails.shippingAddress}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="text-muted-foreground">Carrier:</span> {orderDetails.carrier}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="text-muted-foreground">Tracking Number:</span> {orderDetails.trackingNumber}
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Estimated Delivery:</span>{" "}
                          {orderDetails.estimatedDelivery}
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Payment Information</h4>
                        <p className="text-sm mb-1">
                          <span className="text-muted-foreground">Method:</span> {orderDetails.paymentMethod}
                        </p>
                        {orderDetails.lastFour && (
                          <p className="text-sm mb-1">
                            <span className="text-muted-foreground">Card:</span> **** **** **** {orderDetails.lastFour}
                          </p>
                        )}
                        <p className="text-sm">
                          <span className="text-muted-foreground">Order Date:</span> {orderDetails.orderDate}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Order Details</h4>
                        <p className="text-sm mb-1">
                          <span className="text-muted-foreground">Model:</span> {orderDetails.modelName}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="text-muted-foreground">Size:</span> {orderDetails.size}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="text-muted-foreground">Color:</span> {orderDetails.color}
                        </p>
                        <p className="text-sm font-medium">
                          <span className="text-muted-foreground">Total:</span> ${orderDetails.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Need Help?</h4>
                        <div className="space-y-2">
                          <Link href="/refund-policy">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              View Refund Policy
                            </Button>
                          </Link>
                          <Link href="/refund-request">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              Request Refund
                            </Button>
                          </Link>
                          <Link href="/contact">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              Contact Support
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {orderNumber && !orderDetails && (
                <p className="mt-4 text-red-500">Order not found. Please check the order number and try again.</p>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                If you have any questions about your order, please{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact our support team
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

