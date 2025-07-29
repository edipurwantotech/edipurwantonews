import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import mime from 'mime';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
    const { filename } =  await context.params;

  // Get absolute path to the uploads directory
  const filePath = path.join('/tmp', filename);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const contentType = mime.getType(filename) || 'application/octet-stream';
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    );
  }
}
