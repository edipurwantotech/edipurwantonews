import React from 'react'
import UsersAdminPage from './components/UsersAdminPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Admin Tailwind Blog | Users",
}

const UsersPage = () => {
  return (
    <UsersAdminPage />
  )
}

export default UsersPage