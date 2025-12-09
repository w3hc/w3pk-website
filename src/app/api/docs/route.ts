import { NextRequest, NextResponse } from 'next/server'

const GITHUB_DOCS_URL = 'https://raw.githubusercontent.com/w3hc/w3pk/main/docs'

const DOC_FILES = [
  'QUICK_START.md',
  'API_REFERENCE.md',
  'INTEGRATION_GUIDELINES.md',
  'SECURITY.md',
  'ARCHITECTURE.md',
  'RECOVERY.md',
  'EIP-7951.md',
  'EIP_7702.md',
  'ZK.md',
  'BUILD_VERIFICATION.md',
  'BROWSER_COMPATIBILITY.md',
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const file = searchParams.get('file')

    if (!file) {
      // Return list of all docs
      return NextResponse.json({ files: DOC_FILES })
    }

    // Fetch specific file content from GitHub
    const response = await fetch(`${GITHUB_DOCS_URL}/${file}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch ${file}: ${response.statusText}`)
    }

    const content = await response.text()

    return NextResponse.json({ content, filename: file })
  } catch (error) {
    console.error('Error reading docs:', error)
    return NextResponse.json(
      { error: 'Failed to read documentation' },
      { status: 500 }
    )
  }
}
