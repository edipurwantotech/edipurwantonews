
import type { Metadata } from "next"
import BlogClientPage from "./components/BlogClientPage"


export const metadata: Metadata = {
  title: "Blog - Latest Posts and Articles | TailwindBlog",
  description:
    "Discover the latest blog posts, tutorials, and insights about web development, Next.js, React, and modern technologies. Stay updated with our comprehensive articles.",
  keywords: [
    "blog",
    "web development",
    "nextjs",
    "react",
    "javascript",
    "typescript",
    "tutorials",
    "programming",
    "technology",
  ],
  openGraph: {
    title: "Blog - Latest Posts and Articles | TailwindBlog",
    description:
      "Discover the latest blog posts, tutorials, and insights about web development, Next.js, React, and modern technologies.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Latest Posts and Articles | TailwindBlog",
    description:
      "Discover the latest blog posts, tutorials, and insights about web development, Next.js, React, and modern technologies.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/blog`,
  },
}

export default function BlogPage() {
  return <BlogClientPage />

  
}
