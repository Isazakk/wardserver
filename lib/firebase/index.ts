// Export Firebase app and services
export * from './config';

// Export Firebase utility functions
export * from './firestore';
export * from './auth';
export * from './storage';

// Export collection names for consistency
export const collections = {
  USERS: 'users',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  MODELS: 'models',
  SETTINGS: 'settings',
};

// Type definitions for common data models
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'admin' | 'user';
  createdAt?: any;
  updatedAt?: any;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageURL?: string;
  category?: string;
  available: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface Order {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  paymentId?: string;
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt?: any;
  updatedAt?: any;
}

export interface Model {
  id: string;
  userId: string;
  name: string;
  description?: string;
  modelURL: string;
  thumbnailURL?: string;
  price?: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createdAt?: any;
  updatedAt?: any;
} 