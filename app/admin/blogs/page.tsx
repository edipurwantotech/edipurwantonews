import React from 'react'

import { Metadata } from 'next'
import BlogsAdminPage from './components/BlogsAdminPage'

export const metadata: Metadata = {
  title: "Admin Tailwind Blog | Blogs",
}

const BlogsPage = () => {
  return (
    <BlogsAdminPage />
  )
}

export default BlogsPage