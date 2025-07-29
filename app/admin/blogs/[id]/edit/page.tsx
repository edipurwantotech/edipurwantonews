import React from 'react'

import { Metadata } from 'next'
import BlogEditAdminPage from './components/BlogEditAdminPage'



export const metadata: Metadata = {
  title: "Admin Tailwind Blog | Edit Blog",
}

const BlogsPage = () => {
  return (
    <BlogEditAdminPage />
  )
}

export default BlogsPage