"use client"

import { usePathname } from "next/navigation"
import { AuthProvider } from "@/components/auth-provider"
import { Layout } from "./layout"


export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) {
    return <AuthProvider>{children}</AuthProvider>
  }

  return <Layout>{children}</Layout>
}
