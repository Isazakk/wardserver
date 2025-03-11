import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
      <div className="prose max-w-none">
        <h2>1. Processing Time</h2>
        <p>
          After you place your order, we typically need 3-5 business days to print and prepare your 3D model for
          shipping. This time may vary depending on the complexity and size of your order.
        </p>

        <h2>2. Shipping Methods</h2>
        <p>We offer the following shipping options:</p>
        <ul>
          <li>Standard Shipping (5-7 business days)</li>
          <li>Express Shipping (2-3 business days)</li>
          <li>Overnight Shipping (1 business day, where available)</li>
        </ul>

        <h2>3. Shipping Costs</h2>
        <p>
          Shipping costs are calculated based on the weight of your order and your location. You can view the exact
          shipping cost during the checkout process before completing your purchase.
        </p>

        <h2>4. International Shipping</h2>
        <p>
          We currently ship to select countries. International orders may be subject to import duties and taxes, which
          are the responsibility of the recipient.
        </p>

        <h2>5. Tracking Your Order</h2>
        <p>
          Once your order ships, we'll send you a confirmation email with a tracking number. You can use this number to
          track your package on our website or the carrier's website.
        </p>

        <h2>6. Delivery Issues</h2>
        <p>
          If you haven't received your order within the expected timeframe or there are issues with delivery, please
          contact our customer support team. We'll work with the shipping carrier to resolve any problems.
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

