import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { inter, orbitron, spaceGrotesk } from "./fonts"

export const metadata: Metadata = {
  title: "Ward 3D Prints - AI-Powered 3D Model Generation and Printing",
  description: "Generate 3D models with Meshy AI and have them printed and delivered to your doorstep.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable}`}
    >
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

