import React from 'react'

import { Metadata } from 'next'
import CategoriesAdminPage from './components/CategoriesAdminPage'

export const metadata: Metadata = {
  title: "Admin Tailwind Blog | Categories",
}

const CategoriesPage = () => {
  return (
    <CategoriesAdminPage />
  )
}

export default CategoriesPage