import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "MintForgex - AI Powered Creative Studio",
  description: "Find your next viral idea with AI-powered content generation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>{children}</body>
    </html>
  )
}
