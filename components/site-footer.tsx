import Link from "next/link"
import { WardPrintLogo } from "@/components/ward-print-logo"

export function SiteFooter() {
  return (
    <footer className="border-t py-10 bg-background">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <WardPrintLogo className="h-6 w-6" linkToHome={false} />
            <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Ward 3D Prints
            </span>
          </div>
          <p className="text-muted-foreground">Turning imagination into reality with AI-powered 3D printing.</p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/generate" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                3D Model Generation
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Resin Printing
              </Link>
            </li>
            <li>
              <Link href="/workspace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Model Management
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/shipping-policy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                href="/refund-policy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Ward 3D Prints. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

