"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { toast } from "@/components/ui/use-toast"

export default function RefundRequestPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [reason, setReason] = useState("")
  const [description, setDescription] = useState("")
  const [refundType, setRefundType] = useState("full")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Custom nav items for refund request page
  const navItems = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" },
    { title: "Track Order", href: "/track-order" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Refund request submitted",
        description: `Your refund request for order ${orderNumber} has been submitted successfully.`,
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader navItems={navItems} showAuth={false} showOrdersDropdown={true} />
      <main className="flex-1 py-10">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Request a Refund</CardTitle>
              <CardDescription>
                Please fill out this form to request a refund for your order. We'll review your request and get back to
                you within 48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="order-number">Order Number</Label>
                    <Input
                      id="order-number"
                      placeholder="e.g., WD-1234"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Refund</Label>
                    <Select onValueChange={setReason} required>
                      <SelectTrigger id="reason">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="damaged">Product arrived damaged</SelectItem>
                        <SelectItem value="wrong-item">Received wrong item</SelectItem>
                        <SelectItem value="quality">Quality issues</SelectItem>
                        <SelectItem value="not-as-described">Product not as described</SelectItem>
                        <SelectItem value="other">Other reason</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide details about your refund request..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Refund Type</Label>
                    <RadioGroup defaultValue="full" onValueChange={setRefundType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full" id="full" />
                        <Label htmlFor="full">Full refund</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partial" id="partial" />
                        <Label htmlFor="partial">Partial refund</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="replacement" id="replacement" />
                        <Label htmlFor="replacement">Replacement</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photos">Upload Photos (Optional)</Label>
                    <Input id="photos" type="file" multiple accept="image/*" />
                    <p className="text-sm text-muted-foreground">
                      Photos of the issue can help us process your refund request faster.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/refund-policy">View Refund Policy</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Refund Request Submitted</h3>
                  <p className="text-muted-foreground mb-6">
                    Your refund request for order {orderNumber} has been submitted successfully. We'll review your
                    request and get back to you within 48 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="outline">
                      <Link href="/dashboard">Return to Dashboard</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/track-order">Track Another Order</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
              <p>
                For immediate assistance, please contact our support team at{" "}
                <a href="mailto:support@wardprints.com" className="text-primary hover:underline">
                  support@wardprints.com
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

