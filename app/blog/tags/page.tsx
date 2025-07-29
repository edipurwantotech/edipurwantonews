import type { Metadata } from "next"
import TagsClientPage from "./components/TagsClientPage"

export const metadata: Metadata = {
  title: "Tags - Browse Posts by Topic | TailwindBlog",
  description:
    "Browse all blog posts by tags and topics. Find articles about web development, programming, tutorials, and technology organized by categories.",
  keywords: [
    "tags",
    "topics",
    "categories",
    "web development",
    "programming",
    "tutorials",
    "javascript",
    "react",
    "nextjs",
  ],
  openGraph: {
    title: "Tags - Browse Posts by Topic | TailwindBlog",
    description:
      "Browse all blog posts by tags and topics. Find articles about web development, programming, tutorials, and technology.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/blog/tags`,
  },
  twitter: {
    card: "summary",
    title: "Tags - Browse Posts by Topic | TailwindBlog",
    description:
      "Browse all blog posts by tags and topics. Find articles about web development, programming, tutorials, and technology.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/blog/tags`,
  },
}

export default function TagsPage() {
 return <TagsClientPage />
}
