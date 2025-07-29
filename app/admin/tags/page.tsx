import React from 'react'
import TagsAdminPage from './components/TagsAdminPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Admin Tailwind Blog | Tags",
}

const TagsPage = () => {
  return (
    <TagsAdminPage />
  )
}

export default TagsPage