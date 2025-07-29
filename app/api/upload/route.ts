import { type NextRequest, NextResponse } from 'next/server'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file: File | null = formData.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
    }

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Define uploads path inside public
    const uploadDir = '/tmp';
    await mkdir(uploadDir, { recursive: true })

    // Sanitize and rename the file with a timestamp
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    const fileName = `${timestamp}_${safeName}`
    const filePath = path.join(uploadDir, fileName)

    // Save the file
    await writeFile(filePath, buffer)

    // Return public URL
    const publicUrl = `/api/upload/${fileName}`

    return NextResponse.json({
      message: 'File uploaded successfully.',
      url: publicUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
