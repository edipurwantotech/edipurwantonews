import React from 'react'

import { Metadata } from 'next'
import BlogCreateAdminPage from './components/BlogsCreateAdminPage'


export const metadata: Metadata = {
  title: "Admin Tailwind Blog | Create Blog",
}

const BlogsPage = () => {
  return (
    <BlogCreateAdminPage />
  )
}

export default BlogsPage