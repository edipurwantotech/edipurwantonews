import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(tags)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to fetch tags" + error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json()

    const tag = await prisma.tag.create({
      data: { name },
    })

    return NextResponse.json(tag)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to create tag" + error }, { status: 500 })
  }
}
