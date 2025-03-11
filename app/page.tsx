import { FirebaseExample } from '@/components/firebase-example'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Ward 3D Prints</h1>
        <div className="max-w-4xl mx-auto">
          <FirebaseExample />
        </div>
      </div>
    </main>
  )
}
