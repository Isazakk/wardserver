# Ward 3D Prints

A Next.js 14 application for generating and ordering 3D prints via an AI-driven interface.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI**: Tailwind CSS, Shadcn UI components
- **3D Rendering**: Three.js, React Three Fiber
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Storage
- **Deployment**: Vercel

## Firebase Setup

1. Create a Firebase project at [https://firebase.google.com/](https://firebase.google.com/)
2. Enable Authentication, Firestore, and Storage services
3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Firebase Features

- User authentication (email/password, Google)
- Firestore database for user data, products, and orders
- Storage for 3D model files and images
- Security rules for data protection
- Real-time data synchronization 