'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import {  
  Mail,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  TreesIcon as Threads,
  MessageCircle,
} from "lucide-react"
import { Input } from '@/components/ui/input'

interface Blog {
  id: number
  title: string
  description: string
  createdAt: string
  category: { name: string } | null
  tags: { tag: { name: string } }[]
}

const HomeClientPage = () => {
   const [blogs, setBlogs] = useState<Blog[]>([])
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestBlogs()
  }, [])

  const fetchLatestBlogs = async () => {
    try {
      const response = await fetch("/api/blogs")
      if (response.ok) {
        const data = await response.json()
        // Get latest 5 posts
        setBlogs(data.slice(0, 5))
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    }
    setLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "")
  }

  const createSlug = (title: string, id: number) => {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${id}`
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
    // You can add actual newsletter integration here
  }

  return (
    <div className="min-h-screen bg-white">
      
      

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Latest</h1>
        </div>

        {/* Blog Posts */}
        <div className="space-y-12 mb-20">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-gray-500">No posts found</div>
          ) : (
            blogs.map((blog) => (
              <article key={blog.id} className="flex gap-8">
                {/* Date */}
                <div className="w-32 flex-shrink-0">
                  <time className="text-sm text-gray-500">{formatDate(blog.createdAt)}</time>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Link href={`/blog/${createSlug(blog.title, blog.id)}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-gray-700 cursor-pointer">
                      {blog.title}
                    </h2>
                  </Link>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.category && (
                      <Badge className="bg-pink-100 text-pink-600 hover:bg-pink-200 text-xs font-semibold px-2 py-1 uppercase">
                        {blog.category.name}
                      </Badge>
                    )}
                    {blog.tags.map((bt, index) => (
                      <Badge
                        key={index}
                        className="bg-pink-100 text-pink-600 hover:bg-pink-200 text-xs font-semibold px-2 py-1 uppercase"
                      >
                        {bt.tag.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {stripHtml(blog.description).substring(0, 200)}
                    {stripHtml(blog.description).length > 200 && "..."}
                  </p>

                  {/* Read More */}
                  <Link
                    href={`/blog/${createSlug(blog.title, blog.id)}`}
                    className="text-pink-500 hover:text-pink-600 font-medium inline-flex items-center"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>

        {/* All Posts Link */}
        <div className="text-right mb-16">
          <Link href="/blog" className="text-pink-500 hover:text-pink-600 font-medium">
            All Posts →
          </Link>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-100 pt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscribe to the newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-6">
                Sign up
              </Button>
            </form>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button variant="ghost" size="sm" asChild>
              <a href="mailto:admin@example.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://threads.net" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                <Threads className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Footer */}
          
        </div>
      </div>
    </div>
  )
}

export default HomeClientPage