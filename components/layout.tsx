"use client"

import Link from "next/link"


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Edi Purwanto
              </Link>
            </div>
            <nav className="flex items-center space-x-8">
              <Link href="/blog" className="text-gray-700 hover:text-pink-600 transition duration-400 font-medium">
                Blog
              </Link>
              <Link href="/blog/tags" className="text-gray-700 hover:text-pink-600 transition duration-400 font-medium">
                Tags
              </Link>
              <Link href="/blog/projects" className="text-gray-700 hover:text-pink-600 transition duration-400 font-medium">
                Projects
              </Link>
              <Link href="/blog/about" className="text-gray-700 hover:text-pink-600 transition duration-400 font-medium">
                About
              </Link>
              {/* <Button variant="ghost" size="sm" className="p-2">
                <Sun className="h-4 w-4" />
              </Button> */}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      <footer className="border-t border-gray-200 text-sm text-center py-6 text-gray-500">
        © 2025 Edi Purwanto. All rights reserved.
      </footer>
    </div>
  )
}
