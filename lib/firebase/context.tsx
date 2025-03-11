'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { app, db, auth, storage, analytics } from './config'
import type { FirebaseApp } from 'firebase/app'
import type { Firestore } from 'firebase/firestore'
import type { Auth } from 'firebase/auth'
import type { Storage } from 'firebase/storage'
import type { Analytics } from 'firebase/analytics'

interface FirebaseContextType {
  app: FirebaseApp | null
  db: Firestore | null
  auth: Auth | null
  storage: Storage | null
  analytics: Analytics | null
  currentUser: User | null
  isAuthenticated: boolean
  loading: boolean
}

const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  db: null,
  auth: null,
  storage: null,
  analytics: null,
  currentUser: null,
  isAuthenticated: false,
  loading: true
})

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) return

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    app,
    db,
    auth,
    storage,
    analytics,
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
  }

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
}

export function useFirebase() {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider')
  }
  return context
} 