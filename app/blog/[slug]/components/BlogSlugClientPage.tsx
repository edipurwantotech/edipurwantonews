"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { SyntaxHighlighter } from "@/components/syntax-highlighter"
import { TableOfContents } from "@/components/table-of-contents"
import { extractFirstImage } from "@/lib/extract-first-image"

interface Blog {
  id: number
  title: string
  description: string
  createdAt: string
  category: { name: string } | null
  tags: { tag: { name: string } }[]
}

export default function BlogSlugClientPage() {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [previousPost, setPreviousPost] = useState<{ id: number; title: string } | null>(null)
  const [contentParts, setContentParts] = useState<{ beforeToc: string, afterToc: string }>({ beforeToc: '', afterToc: '' })
  const [headerImage, setHeaderImage] = useState<string | null>(null)
  const params = useParams()
  const slug = params.slug as string

  // Fetch blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogId = slug.split("-").pop()
        const response = await fetch(`/api/blogs/${blogId}`)

        if (response.ok) {
          const data = await response.json()
          setBlog(data)

          // Extract first image for header
          const firstImage = extractFirstImage(data.description)
          setHeaderImage(firstImage)

          // Split content after first paragraph
          const splitContent = splitAfterFirstParagraph(data.description)
          setContentParts(splitContent)

          // Fetch previous blog
          const allBlogsResponse = await fetch("/api/blogs")
          if (allBlogsResponse.ok) {
            const allBlogs = await allBlogsResponse.json()
            const otherBlogs = allBlogs.filter((b: Blog) => b.id !== data.id)
            if (otherBlogs.length > 0) {
              setPreviousPost(otherBlogs[0])
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  const splitAfterFirstParagraph = (html: string) => {
    const firstParagraphEnd = html.indexOf('</p>') + 4
    return {
      beforeToc: html.substring(0, firstParagraphEnd),
      afterToc: html.substring(firstParagraphEnd)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const textContent = content.replace(/<[^>]*>/g, "")
    const wordCount = textContent.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  const createSlug = (title: string, id: number) => {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${id}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Blog post not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <SyntaxHighlighter />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Title */}
        <div className="mb-12 flex gap-12">
          <div className="w-80"></div>
          <div className="">
            <h1 className="text-4xl md:text-5xl mb-4 font-bold text-gray-900 leading-tight">{blog.title}</h1>
            <div className="flex items-center justify-center space-x-6 text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{getReadingTime(blog.description)} min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">TAGS</h3>
              <div className="space-y-2">
                {blog.tags.map((bt, index) => (
                  <Badge
                    key={index}
                    className="bg-pink-100 text-pink-600 hover:bg-pink-200 block w-fit px-3 py-1 text-sm font-medium"
                  >
                    {bt.tag.name.toUpperCase()}
                  </Badge>
                ))}
                {blog.category && (
                  <Badge className="bg-pink-100 text-pink-600 hover:bg-pink-200 block w-fit px-3 py-1 text-sm font-medium">
                    {blog.category.name.toUpperCase()}
                  </Badge>
                )}
              </div>
            </div>

            {/* Previous Article */}
            {previousPost && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">PREVIOUS ARTICLE</h3>
                <Link
                  href={`/blog/${createSlug(previousPost.title, previousPost.id)}`}
                  className="text-pink-500 hover:text-pink-600 font-medium"
                >
                  {previousPost.title}
                </Link>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-none">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {/* First paragraph */}
              <div dangerouslySetInnerHTML={{ __html: contentParts.beforeToc }} />

              {/* Table of Contents after first paragraph */}
              <div className="my-8">
                <TableOfContents content={blog.description} />
              </div>

              {/* Remaining content */}
              <div dangerouslySetInnerHTML={{ __html: contentParts.afterToc }} />
            </div>
          </main>
        </div>

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/blog" className="inline-flex items-center text-pink-500 hover:text-pink-600 font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to the blog
          </Link>
        </div>
      </div>
    </div>
  )
}