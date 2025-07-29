'use client';

import { Badge } from '@/components/ui/badge'
import Link from "next/link"
import React, { useEffect, useState } from 'react'

interface Blog {
  id: number
  title: string
  description: string
  createdAt: string
  category: { name: string } | null
  tags: { tag: { id: number; name: string } }[]
}

interface Category {
  id: number
  name: string
  _count: { blogs: number }
}

interface Tag {
  id: number
  name: string
  _count: { blogs: number }
}

const BlogClientPage = () => {
const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedFilter, setSelectedFilter] = useState("all posts")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [blogsRes, categoriesRes, tagsRes] = await Promise.all([
        fetch("/api/blogs"),
        fetch("/api/categories/with-counts"),
        fetch("/api/tags/with-counts"),
      ])

      if (blogsRes.ok) {
        const blogsData = await blogsRes.json()
        setBlogs(blogsData)
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData)
      }

      if (tagsRes.ok) {
        const tagsData = await tagsRes.json()
        setTags(tagsData)
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    }
    setLoading(false)
  }

  const filteredBlogs = blogs.filter((blog) => {
    if (selectedFilter === "all posts") return true

    // Check if filter matches category
    if (blog.category?.name.toLowerCase() === selectedFilter.toLowerCase()) return true

    // Check if filter matches any tag
    return blog.tags.some((bt) => bt.tag.name.toLowerCase() === selectedFilter.toLowerCase())
  })

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

  return (
    <div className="min-h-screen ">
   

      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-pink-600 mb-4">ALL POSTS</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setSelectedFilter("all posts")}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedFilter === "all posts"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  all posts
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedFilter(category.name)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedFilter === category.name
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {category.name.toLowerCase()} ({category._count?.blogs || 0})
                  </button>
                ))}

                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedFilter(tag.name)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedFilter === tag.name
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tag.name.toLowerCase()} ({tag._count?.blogs || 0})
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Header */}
              {/* <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
                <Link href="/admin/blogs/new">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </Link>
              </div> */}

              {/* Posts */}
              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading...</div>
                ) : filteredBlogs.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No posts found</div>
                ) : (
                  filteredBlogs.map((blog) => (
                    <article key={blog.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <Link href={`/blog/${createSlug(blog.title, blog.id)}`}>
                        <div className="space-y-3 cursor-pointer">
                          <div className="text-sm text-gray-500">{formatDate(blog.createdAt)}</div>

                          <h2 className="text-xl font-semibold text-gray-900 hover:text-gray-700">{blog.title}</h2>

                          <div className="flex flex-wrap gap-2">
                            {blog.category && (
                              <Badge variant="secondary" className="bg-pink-100 text-pink-600 hover:bg-pink-200">
                                {blog.category.name.toUpperCase()}
                              </Badge>
                            )}
                            {blog.tags.map((bt) => (
                              <Badge
                                key={bt.tag.id}
                                variant="secondary"
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                              >
                                {bt.tag.name.toUpperCase()}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-gray-600 leading-relaxed">
                            {stripHtml(blog.description).substring(0, 200)}
                            {stripHtml(blog.description).length > 200 && "..."}
                          </p>
                        </div>
                      </Link>
                    </article>
                  ))
                )}
              </div>

              {/* Pagination */}
              {filteredBlogs.length > 0 && (
                <div className="p-6 border-t border-gray-200 text-center">
                  <span className="text-sm text-gray-500">1 of {Math.ceil(filteredBlogs.length / 10)}</span>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default BlogClientPage