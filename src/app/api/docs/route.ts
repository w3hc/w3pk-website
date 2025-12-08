import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const file = searchParams.get('file')

    if (!file) {
      // Return list of all docs
      const docsPath = path.join(process.cwd(), '../w3pk/docs')
      const files = fs.readdirSync(docsPath).filter(f => f.endsWith('.md'))

      return NextResponse.json({ files })
    }

    // Return specific file content
    const docsPath = path.join(process.cwd(), '../w3pk/docs', file)
    const content = fs.readFileSync(docsPath, 'utf-8')

    return NextResponse.json({ content, filename: file })
  } catch (error) {
    console.error('Error reading docs:', error)
    return NextResponse.json(
      { error: 'Failed to read documentation' },
      { status: 500 }
    )
  }
}
