import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        username: "asc",
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users", errors: error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()

    const user = await prisma.user.create({
      data: { username, email, password },
    })

    return NextResponse.json(user)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to create user" + error }, { status: 500 })
  }
}
