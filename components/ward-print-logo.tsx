import type { SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"

export function WardPrintLogo({
  className,
  linkToHome = true,
  ...props
}: SVGProps<SVGSVGElement> & {
  className?: string
  linkToHome?: boolean
}) {
  const LogoContent = (
    <div className={`relative ${className || "h-10 w-10"}`}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-07%2020.03.10%20-%20A%20modern%20and%20sleek%20logo%20for%20%27Ward%203D%20Prints%27.%20The%20logo%20features%20a%20stylized%20%27W%27%20integrated%20with%20a%203D%20printer%20nozzle%2C%20extruding%20filament%20into%20the%20letter-9raI8z8eN2GZazaJ2jW2fVfGB9NKPR.png"
        alt="Ward 3D Prints Logo"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  )

  if (linkToHome) {
    return <Link href="/">{LogoContent}</Link>
  }

  return LogoContent
}

