import type { Metadata } from "next"
import AboutClientPage from "./components/AboutClientPage"
AboutClientPage
export const metadata: Metadata = {
  title: "About TailwindBlog - Modern Blog Platform | TailwindBlog",
  description:
    "Learn about TailwindBlog, a modern blog platform built with Next.js, Tailwind CSS, and Prisma. Discover our features, technology stack, and mission.",
  keywords: [
    "about",
    "tailwindblog",
    "nextjs",
    "tailwind css",
    "prisma",
    "blog platform",
    "web development",
    "modern blog",
  ],
  openGraph: {
    title: "About TailwindBlog - Modern Blog Platform",
    description:
      "Learn about TailwindBlog, a modern blog platform built with Next.js, Tailwind CSS, and Prisma. Discover our features and technology stack.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/blog/about`,
  },
  twitter: {
    card: "summary",
    title: "About TailwindBlog - Modern Blog Platform",
    description: "Learn about TailwindBlog, a modern blog platform built with Next.js, Tailwind CSS, and Prisma.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/blog/about`,
  },
}
export default function AboutPage() {
  return (
      <AboutClientPage />
  )
}
