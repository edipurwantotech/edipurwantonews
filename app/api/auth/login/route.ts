import { type NextRequest, NextResponse } from "next/server"
import { signIn } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const { data, error } = await signIn(email, password)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set("session", JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ success: true, user: data.user })
  } catch (error: unknown) {
    return NextResponse.json({ error: "Internal server error" + error }, { status: 500 })
  }
  
}
