export type Customer = {
  id: string
  name: string
  email: string
  orders: string[]
  videoPreview: string
}

export type Order = {
  id: string
  customerId: string
  date: string
  status: "pending" | "crafting" | "processing" | "shipped" | "delivered"
  modelName: string
  price: number
}

export type Model = {
  id: string
  name: string
  creator: string
  createdAt: string
}

const mockCustomers: Customer[] = [
  {
    id: "customer-1",
    name: "John Doe",
    email: "john.doe@example.com",
    orders: ["order-1", "order-2"],
    videoPreview: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "customer-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    orders: ["order-3"],
    videoPreview: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
]

const mockOrders: Order[] = [
  {
    id: "order-1",
    customerId: "customer-1",
    date: "2023-08-01",
    status: "pending",
    modelName: "Chess Knight",
    price: 25.0,
  },
  {
    id: "order-2",
    customerId: "customer-1",
    date: "2023-08-05",
    status: "shipped",
    modelName: "Dragon Figurine",
    price: 45.5,
  },
  {
    id: "order-3",
    customerId: "customer-2",
    date: "2023-08-10",
    status: "delivered",
    modelName: "Phone Stand",
    price: 15.0,
  },
]

const mockModels: Model[] = [
  {
    id: "model-1",
    name: "Chess Knight",
    creator: "John Doe",
    createdAt: "2023-08-01",
  },
  {
    id: "model-2",
    name: "Dragon Figurine",
    creator: "Jane Smith",
    createdAt: "2023-08-05",
  },
]

export const db = {
  getOrders: (): Order[] => mockOrders,
  getModels: (): Model[] => mockModels,
  getCustomers: (): Customer[] => mockCustomers,
  getCustomer: (customerId: string): Customer | undefined => mockCustomers.find((c) => c.id === customerId),
  getPendingOrdersCount: (): number => mockOrders.filter((order) => order.status === "pending").length,
  getPrinterUtilization: (): number => {
    // Mock printer utilization calculation
    return Math.random() * 100
  },
  updateOrderStatus: (orderId: string, status: Order["status"]): Order | undefined => {
    const orderIndex = mockOrders.findIndex((order) => order.id === orderId)
    if (orderIndex !== -1) {
      mockOrders[orderIndex] = { ...mockOrders[orderIndex], status }
      return mockOrders[orderIndex]
    }
    return undefined
  },
}

