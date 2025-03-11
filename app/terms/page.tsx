import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Ward 3D Prints services, you agree to be bound by these Terms of Service. If you do not
          agree to these terms, please do not use our services.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Ward 3D Prints provides AI-powered 3D model generation and high-quality resin 3D printing services. We reserve
          the right to modify, suspend, or discontinue any part of our service at any time.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account information and for all activities
          that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          You retain all rights to the 3D models you create using our service. However, you grant us a non-exclusive
          license to use, reproduce, and display your models for the purpose of providing and improving our services.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          Ward 3D Prints shall not be liable for any indirect, incidental, special, consequential, or punitive damages
          resulting from your use or inability to use our services.
        </p>

        <h2>6. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in
          which Ward 3D Prints operates, without regard to its conflict of law provisions.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

