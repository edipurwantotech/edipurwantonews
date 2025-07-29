'use client';

import { Badge } from '@/components/ui/badge'
import Link from "next/link"
import React, { useEffect, useState } from 'react'

interface Tag {
  id: number
  name: string
  _count: { blogs: number }
}

const TagsClientPage = () => {
   const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/tags")
      if (response.ok) {
        const data = await response.json()
        setTags(data)   
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
   

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">All Tags</h1>

          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Link key={tag.id} href={`/blog?tag=${tag.name}`}>
                  <Badge
                    variant="secondary"
                    className="bg-pink-100 text-pink-600 hover:bg-pink-200 px-4 py-2 text-sm cursor-pointer transition-colors"
                  >
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TagsClientPage