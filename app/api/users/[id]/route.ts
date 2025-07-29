import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/tags/:id
export async function GET(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: "Server error" + error }, { status: 500 })
  }
}

// PUT /api/tags/:id
export async function PUT(request: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params
  const { username, email, password } = await request.json()

  try {
    const user = await prisma.user.update({
      where: {id: Number(id)},
      data: { username, email, password },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: "Failed to update user", error }, { status: 500 })
  }
}

// DELETE /api/tags/:id
export async function DELETE(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params

  try {
    await prisma.tag.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete user", error }, { status: 500 })
  }
}
