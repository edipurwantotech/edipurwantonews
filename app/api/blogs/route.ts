import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(blogs)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to fetch blogs" + error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, categoryId, tagIds } = await request.json()

    const blog = await prisma.blog.create({
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
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to create blog" + error }, { status: 500 })
  }
}
