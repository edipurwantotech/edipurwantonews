import { type NextRequest, NextResponse } from "next/server"
import { readdir, stat, unlink } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function GET() {
  try {
    const uploadsDir = join(process.cwd(), "public", "uploads")

    if (!existsSync(uploadsDir)) {
      return NextResponse.json([])
    }

    const files = await readdir(uploadsDir)
    const fileDetails = await Promise.all(
      files.map(async (filename) => {
        const filepath = join(uploadsDir, filename)
        const stats = await stat(filepath)

        // Extract original filename (remove timestamp prefix)
        const originalName = filename.replace(/^\d+_/, "")

        return {
          url: `/uploads/${filename}`,
          filename: originalName,
          size: stats.size,
          type: getFileType(filename),
          uploadedAt: stats.birthtime.toISOString(),
        }
      }),
    )

    // Sort by upload date (newest first)
    fileDetails.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

    return NextResponse.json(fileDetails)
  } catch (error) {
    console.error("Failed to fetch files:", error)
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || !url.startsWith("/uploads/")) {
      return NextResponse.json({ error: "Invalid file URL" }, { status: 400 })
    }

    const filename = url.replace("/uploads/", "")
    const filepath = join(process.cwd(), "public", "uploads", filename)

    if (existsSync(filepath)) {
      await unlink(filepath)
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Failed to delete file:", error)
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}

function getFileType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase()

  const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg"]
  const documentExts = ["pdf", "doc", "docx", "txt", "rtf"]

  if (imageExts.includes(ext || "")) {
    return `image/${ext}`
  } else if (documentExts.includes(ext || "")) {
    return `application/${ext}`
  }

  return "application/octet-stream"
}
