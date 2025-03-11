"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CuboidIcon as Cube, Users, Package, Truck, Settings, BarChart3, ArrowLeft, Play, Pause } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { db, type Customer, type Order, type Model } from "@/lib/database"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WardPrintLogo } from "@/components/ward-print-logo"
import Link from "next/link"

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0)
  const [printerUtilization, setPrinterUtilization] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000) // Update data every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchData = () => {
    setOrders(db.getOrders())
    setModels(db.getModels())
    setCustomers(db.getCustomers())
    setPendingOrdersCount(db.getPendingOrdersCount())
    setPrinterUtilization(db.getPrinterUtilization())
  }

  const handleDownload = (orderId: string) => {
    console.log(`Downloading files for order ${orderId}`)
    toast({
      title: "Files downloaded",
      description: `Files for order ${orderId} have been downloaded.`,
    })
  }

  const handleViewDetails = (modelId: string) => {
    console.log(`Viewing details for model ${modelId}`)
    toast({
      title: "Model details",
      description: `Viewing details for model ${modelId}.`,
    })
  }

  const handleViewCustomer = (customerId: string) => {
    const customer = db.getCustomer(customerId)
    if (customer) {
      setSelectedCustomer(customer)
    }
  }

  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    const updatedOrder = db.updateOrderStatus(orderId, status)
    if (updatedOrder) {
      fetchData()
      toast({
        title: "Order status updated",
        description: `Order ${orderId} status updated to ${status}.`,
      })
    }
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <WardPrintLogo className="h-6 w-6" />
              <span className="text-xl font-bold">Ward 3D Prints</span>
            </Link>
            <Badge variant="outline" className="ml-2">
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Admin User
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <div className="w-64 border-r p-4 hidden md:block">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Package className="mr-2 h-4 w-4" />
              Print Queue
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Cube className="mr-2 h-4 w-4" />
              Models
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Truck className="mr-2 h-4 w-4" />
              Shipping
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage print orders, customers, and settings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOrdersCount}</div>
                <p className="text-xs text-muted-foreground">Orders waiting to be processed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Printer Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{printerUtilization.toFixed(1)}%</div>
                <Progress value={printerUtilization} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.length}</div>
                <p className="text-xs text-muted-foreground">Total registered customers</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="queue">
            <TabsList>
              <TabsTrigger value="queue">Print Queue</TabsTrigger>
              <TabsTrigger value="models">Recent Models</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>
            <TabsContent value="queue" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Print Queue Management</CardTitle>
                  <CardDescription>Manage and process customer print orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(value) => handleUpdateOrderStatus(order.id, value as Order["status"])}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="crafting">Crafting</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                          <TableCell>{customers.find((c) => c.id === order.customerId)?.name}</TableCell>
                          <TableCell>{order.modelName}</TableCell>
                          <TableCell>
                            <Button onClick={() => handleDownload(order.id)}>Download Files</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="models" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Models</CardTitle>
                  <CardDescription>Recently generated 3D models from customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {models.map((model) => (
                      <div key={model.id} className="border rounded-lg overflow-hidden">
                        <div className="aspect-square bg-muted">
                          <img
                            src="/placeholder.svg?height=200&width=200"
                            alt={`${model.name} model`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{model.name}</h3>
                            <Badge variant="outline">New</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">By {model.creator}</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Created {new Date(model.createdAt).toLocaleDateString()}
                          </p>
                          <Button size="sm" className="w-full" onClick={() => handleViewDetails(model.id)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    View All Models
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="customers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>View and manage customer accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                      <Input placeholder="Search customers..." className="pl-8 w-[300px]" />
                      <svg
                        className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <Button>Add Customer</Button>
                  </div>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Customer</th>
                          <th className="text-left p-3 font-medium">Email</th>
                          <th className="text-left p-3 font-medium">Orders</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <TableBody>
                        {customers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-medium text-primary">
                                    {customer.name.substring(0, 2).toUpperCase()}
                                  </span>
                                </div>
                                <span>{customer.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="p-3">{customer.email}</TableCell>
                            <TableCell className="p-3">{customer.orders.length}</TableCell>
                            <TableCell className="p-3">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleViewCustomer(customer.id)}>
                                  View
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleViewCustomer(customer.id)}>
                                  Edit
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">Showing {customers.length} customers</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {selectedCustomer && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Customer Details: {selectedCustomer.name}</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(null)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Customers
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Video Preview</h3>
                    <div className="relative">
                      <video ref={videoRef} src={selectedCustomer.videoPreview} className="w-full rounded-lg" />
                      <Button className="absolute bottom-4 left-4" onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Orders</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Model</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders
                          .filter((order) => order.customerId === selectedCustomer.id)
                          .map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>{order.id}</TableCell>
                              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                              <TableCell>{order.status}</TableCell>
                              <TableCell>{order.modelName}</TableCell>
                              <TableCell>${order.price.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

