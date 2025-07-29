import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(categories)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to fetch categories" + error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json()

    const category = await prisma.category.create({
      data: { name },
    })

    return NextResponse.json(category)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to create category" + error}, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json()

    const category = await prisma.category.update({
      where: { id: id }, // or just `id` if it's already a number
      data: { name },
    })

    return NextResponse.json(category)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to create category" + error}, { status: 500 })
  }
}

