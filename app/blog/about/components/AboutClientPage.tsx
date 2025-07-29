import React from 'react'

const AboutClientPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About TailwindBlog</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to TailwindBlog, a modern and clean blog platform built with Next.js, Tailwind CSS, and Prisma.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• Clean and responsive design</li>
              <li>• Rich text editor for blog posts</li>
              <li>• Category and tag organization</li>
              <li>• Full-text search capabilities</li>
              <li>• Admin panel for content management</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
            <ul className="text-gray-600 space-y-2">
              <li>
                • <strong>Frontend:</strong> Next.js, React, Tailwind CSS
              </li>
              <li>
                • <strong>Backend:</strong> Next.js API Routes, Prisma ORM
              </li>
              <li>
                • <strong>Database:</strong> PostgreSQL
              </li>
              <li>
                • <strong>Authentication:</strong> Session-based auth
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutClientPage