import type { Metadata } from "next"
import HomeClientPage from "./components/HomeClientPage"

const metadata: Metadata = {
  title: "Edi purwanto Blog",
  description:
    "Welcome to Edi Purwanto, a modern and elegant blog platform built with Next.js, Tailwind CSS, and Prisma. Discover the latest articles, tutorials, and insights about web development.",
  keywords: [
    "blog",
    "nextjs",
    "tailwind css",
    "web development",
    "modern blog",
    "react",
    "typescript",
    "prisma",
    "tutorials",
    "programming",
  ],
  openGraph: {
    title: "Edi Purwanto",
    description:
      "Welcome to Edi Purwanto, a modern and elegant blog platform built with Next.js, Tailwind CSS, and Prisma. Discover the latest articles, tutorials, and insights about web development.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
    images: [
      {
        url: "/images/og-home.png",
        width: 1200,
        height: 630,
        alt: "TailwindBlog - Modern Blog Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TailwindBlog - Modern Blog Platform",
    description:
      "Welcome to TailwindBlog, a modern and elegant blog platform built with Next.js, Tailwind CSS, and Prisma.",
    images: ["/images/og-home.png"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  },
}


export default function HomePage() {
 return <><HomeClientPage /></>
}
