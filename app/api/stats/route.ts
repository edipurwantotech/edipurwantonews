import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [blogs, categories, tags, users] = await Promise.all([
      prisma.blog.count(),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.user.count(),
    ])

    return NextResponse.json({
      blogs,
      categories,
      tags,
      users,
    })
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to fetch stats" + error }, { status: 500 })
  }
}
