import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export async function signIn(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { data: null, error: { message: "Invalid credentials" } }
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return { data: null, error: { message: "Invalid credentials" } }
    }

    return { data: { user: { id: user.id, email: user.email, username: user.username } }, error: null }
  } catch (error) {
    console.log(error)
    return { data: null, error: { message: "Authentication failed" } }
    
  }
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}
