import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <h2>1. Information We Collect</h2>
        <p>
          We collect personal information that you provide to us, such as your name, email address, and shipping
          information. We also collect data about your use of our services, including your 3D model designs and order
          history.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use your information to provide and improve our services, process your orders, communicate with you about
          your account and orders, and send you marketing communications (if you opt in).
        </p>

        <h2>3. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against
          unauthorized or unlawful processing, accidental loss, destruction, or damage.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          We may use third-party services to help us operate our business and the Website or administer activities on
          our behalf. These third parties have access to your personal information only to perform specific tasks on our
          behalf and are obligated not to disclose or use it for any other purpose.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. You may also object to or restrict
          certain processing of your information. To exercise these rights, please contact us using the information
          provided below.
        </p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "last updated" date.
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

