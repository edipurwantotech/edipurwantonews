import { Metadata } from "next"
import BlogSlugClientPage from "./components/BlogSlugClientPage"
import { extractFirstImage } from "@/lib/extract-first-image"

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const param = await params
  const slug = param.slug
  const blogId = slug.split("-").pop()
  const baseUrl = "https://edipurwanto.com"

  try {
    // Improved fetch with error handling and absolute URL
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blogs/${blogId}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status}`)
    }

    const blog = await res.json()
    const blogUrl = `${baseUrl}/blog/${slug}`
    const description = blog.description.replace(/<[^>]*>/g, "").substring(0, 160)
    const image = extractFirstImage(blog.description)
    const keywords = blog.tags.map((t: any) => t.tag.name)

    return {
      title: `${blog.title} | TailwindBlog`,
      description,
      keywords,
      openGraph: {
        type: "article",
        url: blogUrl,
        title: blog.title,
        description,
        publishedTime: blog.createdAt,
        authors: ["Admin"],
        section: blog.category?.name,
        tags: blog.tags.map((t: any) => t.tag.name),
        images: image ? [{ url: image }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: image ? [image] : [],
      },
      alternates: {
        canonical: blogUrl,
      },
    }
  } catch (error) {
    console.error("Fetch error:", error)
    return {  
      title: "Blog not found | TailwindBlog",
      description: "The requested blog post could not be loaded",
    }
  }
}

export default function BlogSlugPage() {
  return <BlogSlugClientPage />
}