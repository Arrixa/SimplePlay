import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
   
        try {
            const formData = await request.formData()
            const file = formData.get('file') as File

            if (!file) {
                return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
            }
            //Great
            // Convert file to buffer
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            // Create upload directory if it doesn't exist
            const uploadDir = path.join(process.cwd(), 'public', 'uploads')

            // Generate unique filename
            const filename = `${file.name}`
            const fullPath = path.join(uploadDir, filename)

            // Write file to uploads directory
            await writeFile(fullPath, buffer)

            return NextResponse.json({
                message: 'File uploaded successfully',
                fileName: filename
            }, { status: 200 })

        } catch (error) {
            console.error('File upload error:', error)
            return NextResponse.json({
                error: 'File upload failed'
            }, { status: 500 })
        }
    
} 