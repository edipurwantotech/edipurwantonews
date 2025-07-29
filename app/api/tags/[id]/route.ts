import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/tags/:id
export async function GET(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params

  try {
    const category = await prisma.tag.findUnique({
      where: { id: Number(id) },
    })

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 })
  }
}

// PUT /api/tags/:id
export async function PUT(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params
  const body = await req.json()

  try {
    const category = await prisma.tag.update({
      where: { id: Number(id) },
      data: { name: body.name },
    })

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ message: "Failed to update category", error }, { status: 500 })
  }
}

// DELETE /api/tags/:id
export async function DELETE(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params

  try {
    await prisma.tag.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({ message: "Category deleted successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete category", error }, { status: 500 })
  }
}
