"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface FileUploadProps {
  onFileUploaded: (url: string, type: "image" | "file") => void
  accept?: string
  maxSize?: number // in MB
}

export function FileUpload({
  onFileUploaded,
  accept = "image/*,application/pdf,.doc,.docx",
  maxSize = 10,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList) => {
    const file = files[0]
    if (!file) return

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Error",
        description: `File size must be less than ${maxSize}MB`,
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        const fileType = file.type.startsWith("image/") ? "image" : "file"
        onFileUploaded(data.url, fileType)
        toast({
          title: "Success",
          description: "File uploaded successfully",
        })
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      })
    }

    setUploading(false)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"}`}
    >
      <CardContent className="p-6">
        <div
          className="text-center"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to select</p>
            <p className="text-xs text-gray-500">Supports images, PDFs, and documents (max {maxSize}MB)</p>
          </div>
          <Input ref={fileInputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading..." : "Select File"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
