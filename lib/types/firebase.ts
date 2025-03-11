import { User as FirebaseUser } from 'firebase/auth'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

export interface User extends FirebaseUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface Order {
  id: string
  customerId: string
  date: string
  modelName: string
  size: string
  color: string
  price: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'crafting'
  queuePosition: number
  paymentMethod: string
  estimatedDelivery: string
  shippingAddress: string
  trackingNumber: string
}

export interface FirestoreCollections {
  users: User
  orders: Order
}

export type FirestoreDoc<T> = QueryDocumentSnapshot<T & DocumentData>

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
} 