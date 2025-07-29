import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const blog = await prisma.blog.findUnique({
      where: {
        id: Number.parseInt(id),
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog", errors: error }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { title, description, categoryId, tagIds } = await request.json()

    // Delete existing blog tags
    await prisma.blogTag.deleteMany({
      where: {
        blogId: Number.parseInt(id),
      },
    })

    // Update blog with new data
    const blog = await prisma.blog.update({
      where: {
        id: Number.parseInt(id),
      },
      data: {
        title,
        description,
        categoryId: categoryId ? Number.parseInt(categoryId) : null,
        tags: {
          create:
            tagIds?.map((tagId: number) => ({
              tagId,
            })) || [],
        },
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog", errors: error }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    await prisma.blog.delete({
      where: {
        id: Number.parseInt(id),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog", errors: error }, { status: 500 })
  }
}
