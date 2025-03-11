"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WardPrintLogo } from "@/components/ward-print-logo"
// Removed useTheme import
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  external?: boolean
}

interface SiteHeaderProps {
  navItems?: NavItem[]
  showAuth?: boolean
  showThemeToggle?: boolean
  showWorkspaceButton?: boolean
  showOrdersDropdown?: boolean
  className?: string
}

export function SiteHeader({
  navItems = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/#features" },
    { title: "Pricing", href: "/#pricing" },
    { title: "How It Works", href: "/#how-it-works" },
  ],
  showAuth = true,
  showThemeToggle = true,
  showWorkspaceButton = true,
  showOrdersDropdown = false,
  className,
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Theme toggle removed

  return (
    <header className={cn("sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm", className)}>
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <WardPrintLogo className="h-8 w-8" linkToHome={false} />
            <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Ward 3D Prints
            </span>
          </Link>
        </div>

        {showWorkspaceButton && (
          <Link href="/workspace" className="relative group hidden sm:block ml-2 mr-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
            <div className="relative px-5 py-2 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg leading-none flex items-center">
              <span className="text-blue-100 font-semibold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Workspace
              </span>
              <svg className="h-3 w-3 ml-1 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.title}
            </Link>
          ))}

          {/* Orders dropdown with improved hover behavior - only shown when showOrdersDropdown is true */}
          {showOrdersDropdown && (
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary flex items-center gap-1 py-2">
                Orders
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {/* Add padding-top to create space between trigger and content */}
              <div className="absolute left-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-in-out z-50">
                <div className="rounded-md shadow-lg bg-card border border-border overflow-hidden">
                  <div className="py-1">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-muted">
                      My Orders
                    </Link>
                    <Link href="/track-order" className="block px-4 py-2 text-sm hover:bg-muted">
                      Track Order
                    </Link>
                    <Link href="/refund-policy" className="block px-4 py-2 text-sm hover:bg-muted">
                      Refund Policy
                    </Link>
                    <Link href="/refund-request" className="block px-4 py-2 text-sm hover:bg-muted">
                      Request Refund
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          {/* Desktop Auth Buttons */}
          {showAuth && (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300">Log In</Button>
              </Link>
              <Link href="/generate">
                <Button className="bg-black text-white hover:bg-gray-800">Get Started</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container py-4 space-y-4">
            {showWorkspaceButton && (
              <Link href="/workspace" className="relative group block mb-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative px-5 py-3 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg leading-none flex items-center justify-center">
                  <span className="text-blue-100 font-semibold flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Workspace
                  </span>
                  <svg className="h-3 w-3 ml-2 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )}

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              {/* Only show Orders section in mobile menu when showOrdersDropdown is true */}
              {showOrdersDropdown && (
                <div className="py-2 border-t border-border">
                  <p className="text-base font-medium mb-2">Orders</p>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/dashboard"
                      className="block text-sm text-muted-foreground hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/track-order"
                      className="block text-sm text-muted-foreground hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Track Order
                    </Link>
                    <Link
                      href="/refund-policy"
                      className="block text-sm text-muted-foreground hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Refund Policy
                    </Link>
                    <Link
                      href="/refund-request"
                      className="block text-sm text-muted-foreground hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Request Refund
                    </Link>
                  </div>
                </div>
              )}
            </nav>
            {showAuth && (
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-white text-black hover:bg-gray-100 border border-gray-300">
                    Log In
                  </Button>
                </Link>
                <Link href="/generate" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

