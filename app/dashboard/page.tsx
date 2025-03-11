"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CuboidIcon as Cube, PackageIcon, TruckIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"

// Mock API function (replace with actual API call)
async function fetchOrders() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: "WD-1234",
      status: "Processing",
      date: "2023-06-01",
      queuePosition: 3,
      modelName: "Chess Knight",
      size: "Medium",
      color: "Black",
      price: 30.0,
      paymentMethod: "Credit Card",
      estimatedDelivery: "2023-06-15",
      shippingAddress: "123 Main St, Anytown, CA 12345",
      trackingNumber: "TRK123456789",
    },
    {
      id: "WD-5678",
      status: "Printing",
      date: "2023-05-28",
      queuePosition: 2,
      modelName: "Dragon Figurine",
      size: "Large",
      color: "Red",
      price: 50.0,
      paymentMethod: "PayPal",
      estimatedDelivery: "2023-06-12",
      shippingAddress: "456 Oak Ave, Somewhere, NY 54321",
      trackingNumber: "TRK987654321",
    },
    {
      id: "WD-9012",
      status: "Shipped",
      date: "2023-05-20",
      queuePosition: null,
      modelName: "Phone Stand",
      size: "Small",
      color: "Blue",
      price: 15.0,
      paymentMethod: "Venmo",
      estimatedDelivery: "2023-06-05",
      shippingAddress: "789 Pine St, Nowhere, TX 67890",
      trackingNumber: "TRK456789123",
    },
  ]
}

export default function DashboardPage() {
  const { theme, setTheme } = useTheme()
  const [orders, setOrders] = useState([])
  const [queueLength, setQueueLength] = useState(0)

  // Custom nav items for dashboard
  const navItems = [
    { title: "Home", href: "/" },
    { title: "Generate", href: "/generate" },
  ]

  useEffect(() => {
    const loadOrders = async () => {
      const fetchedOrders = await fetchOrders()
      setOrders(fetchedOrders)
      setQueueLength(fetchedOrders.filter((order) => order.queuePosition !== null).length)
    }
    loadOrders()

    // Update queue positions every 30 seconds
    const interval = setInterval(async () => {
      const updatedOrders = await fetchOrders()
      setOrders(updatedOrders)
      setQueueLength(updatedOrders.filter((order) => order.queuePosition !== null).length)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader navItems={navItems} showAuth={false} showOrdersDropdown={true} />
      <main className="flex-1 py-10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Order {order.id}</CardTitle>
                    <Badge
                      variant={
                        order.status === "Processing"
                          ? "outline"
                          : order.status === "Printing"
                            ? "secondary"
                            : order.status === "Shipped"
                              ? "default"
                              : "success"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <CardDescription>Placed on {order.date}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      {order.status === "Processing" && <PackageIcon className="text-yellow-500" />}
                      {order.status === "Shipped" && <TruckIcon className="text-blue-500" />}
                      {order.status === "Delivered" && <Cube className="text-green-500" />}
                      {order.status === "Printing" && <Cube className="text-orange-500" />}
                      <span className="font-medium">{order.modelName}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Size:</p>
                        <p>{order.size}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Color:</p>
                        <p>{order.color}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price:</p>
                        <p>${order.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Payment:</p>
                        <p>{order.paymentMethod}</p>
                      </div>
                    </div>

                    {order.queuePosition !== null && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Queue Position: {order.queuePosition} of {queueLength}
                        </p>
                        <Progress value={(1 - order.queuePosition / queueLength) * 100} />
                      </div>
                    )}

                    <div className="text-sm">
                      <p className="text-muted-foreground">Estimated Delivery:</p>
                      <p>{order.estimatedDelivery}</p>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 bg-muted/30 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Tracking: </span>
                    {order.trackingNumber}
                  </div>
                  <Link href={`/track-order?orderNumber=${order.id}`}>
                    <Button size="sm" variant="outline">
                      Track Order
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

