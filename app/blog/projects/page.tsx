import type { Metadata } from "next"
import ProjectClientPage from "./components/ProjectClientPage"


export const metadata: Metadata = {
  title: "Projects - Showcase and Portfolio | TailwindBlog",
  description:
    "Explore our projects and portfolio showcasing modern web development with Next.js, React, and cutting-edge technologies. See what we've built.",
  keywords: [
    "projects",
    "portfolio",
    "showcase",
    "web development",
    "nextjs",
    "react",
    "tailwind css",
    "modern web apps",
  ],
  openGraph: {
    title: "Projects - Showcase and Portfolio | TailwindBlog",
    description:
      "Explore our projects and portfolio showcasing modern web development with Next.js, React, and cutting-edge technologies.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/blog/projects`,
  },
  twitter: {
    card: "summary",
    title: "Projects - Showcase and Portfolio | TailwindBlog",
    description:
      "Explore our projects and portfolio showcasing modern web development with Next.js, React, and cutting-edge technologies.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/blog/projects`,
  },
}

export default function ProjectsPage() {
  return (
    <ProjectClientPage />
  )
  
}
