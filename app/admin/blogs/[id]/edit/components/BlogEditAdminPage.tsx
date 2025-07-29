"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { EnhancedRichTextEditor } from "@/components/enhanced-rich-text-editor"
import { toast } from "@/hooks/use-toast"

interface Category {
  id: number
  name: string
}

interface Tag {
  id: number
  name: string
}

interface Blog {
  id: number
  title: string
  description: string
  categoryId: number | null
  tags: { tag: { id: number; name: string } }[]
}

export default function BlogEditAdminPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const blogId = params.id as string

useEffect(() => {
  const fetchBlogAndData = async () => {
    try {
      const [blogRes, categoriesRes, tagsRes] = await Promise.all([
        fetch(`/api/blogs/${blogId}`),
        fetch("/api/categories"),
        fetch("/api/tags"),
      ])

      if (blogRes.ok) {
        const blog: Blog = await blogRes.json()
        setTitle(blog.title)
        setDescription(blog.description)
        setCategoryId(blog.categoryId?.toString() || "")
        setSelectedTags(blog.tags.map((bt) => bt.tag.id))
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
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to fetch blog data",
        variant: "destructive",
      })
    }

    setInitialLoading(false)
  }

  fetchBlogAndData()
}, [blogId])


  

  const handleTagChange = (tagId: number, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tagId])
    } else {
      setSelectedTags(selectedTags.filter((id) => id !== tagId))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          categoryId: categoryId || null,
          tagIds: selectedTags,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog updated successfully",
        })
        router.push("/admin/blogs")
      } else {
        toast({
          title: "Error",
          description: "Failed to update blog",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Network error occurred",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  if (initialLoading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Blog</h1>
         <p className="text-muted-foreground">Update your blog post with rich content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="grid grid-cols-2 gap-2">
                {tags.map((tag) => (
                  <div key={tag.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag.id}`}
                      checked={selectedTags.includes(tag.id)}
                      onCheckedChange={(checked) => handleTagChange(tag.id, checked as boolean)}
                    />
                    <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <EnhancedRichTextEditor content={description} onChange={setDescription} />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Blog"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
