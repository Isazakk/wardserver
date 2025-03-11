import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <div className="prose max-w-none">
        <h2>1. Eligibility for Refunds</h2>
        <p>We offer refunds on 3D printed products under the following circumstances:</p>
        <ul>
          <li>The product arrives damaged or defective due to manufacturing errors.</li>
          <li>The product significantly differs from the 3D model you approved.</li>
          <li>The order was not delivered within 30 days of the estimated delivery date.</li>
        </ul>

        <h2>2. Refund Process</h2>
        <p>
          To request a refund, please contact our customer support team within 14 days of receiving your order. Provide
          your order number and a detailed explanation of the issue. We may request photos or additional information to
          process your refund.
        </p>

        <h2>3. Non-Refundable Items</h2>
        <p>The following are not eligible for refunds:</p>
        <ul>
          <li>Custom 3D models generated using our AI service, as these are digital products.</li>
          <li>3D printed products that have been used, altered, or damaged after delivery.</li>
          <li>Shipping costs, unless the refund is due to our error.</li>
        </ul>

        <h2>4. Refund Timeframe</h2>
        <p>
          Once your refund is approved, we will process it within 5-10 business days. The time it takes for the refund
          to appear in your account depends on your payment method and financial institution.
        </p>

        <h2>5. Exchanges</h2>
        <p>
          We do not offer direct exchanges. If you need a different product, please return the original item for a
          refund and place a new order.
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

