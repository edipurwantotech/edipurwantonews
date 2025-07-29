import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { ClientWrapper } from "@/components/client-wrapper"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Admin Tailwind Blog",
    template: "%s | TailwindBlog",
  },
  description:
    "A modern blog platform built with Next.js, Tailwind CSS, and Prisma. Share your thoughts and ideas with the world.",
  keywords: ["blog", "nextjs", "tailwind", "prisma", "typescript", "react"],
  authors: [{ name: "TailwindBlog Team" }],
  creator: "TailwindBlog",
  publisher: "TailwindBlog",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
    siteName: "TailwindBlog",
    title: "TailwindBlog - A Modern Blog Platform",
    description: "A modern blog platform built with Next.js, Tailwind CSS, and Prisma.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "TailwindBlog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TailwindBlog - A Modern Blog Platform",
    description: "A modern blog platform built with Next.js, Tailwind CSS, and Prisma.",
    images: ["/images/og-image.png"],
    creator: "@tailwindblog",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          {children}
          <Toaster />
        </ClientWrapper>
      </body>
    </html>
  )
}
