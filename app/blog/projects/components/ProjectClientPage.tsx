'use client';

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Github, Link } from 'lucide-react'
import React from 'react'

const ProjectClientPage = () => {
  const projects = [
    {
      title: "TailwindBlog",
      description: "A modern blog platform built with Next.js and Tailwind CSS",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
      github: "#",
      demo: "#",
    },
    {
      title: "Admin Dashboard",
      description: "Full-featured admin panel for content management",
      tech: ["React", "TypeScript", "shadcn/ui"],
      github: "#",
      demo: "#",
    },
  ]

  return (
    <div className="min-h-screen ">
   

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-lg text-gray-600">A collection of projects and experiments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{project.title}</CardTitle>
                <CardDescription className="text-gray-600">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-pink-100 hover:pink-200 text-pink-600 text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.github}>
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.demo}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectClientPage