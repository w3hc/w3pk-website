import { NextRequest, NextResponse } from 'next/server'

const GITHUB_DOCS_URL = 'https://raw.githubusercontent.com/w3hc/w3pk/main/docs'
const GITHUB_API_URL = 'https://api.github.com/repos/w3hc/w3pk/contents/docs'

// Cache for docs file list (in-memory, resets on deployment)
let cachedDocFiles: string[] | null = null
let cacheTimestamp: number | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function getDocFiles(): Promise<string[]> {
  // Return cached files if still valid
  if (cachedDocFiles && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedDocFiles
  }

  try {
    const response = await fetch(GITHUB_API_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch docs list: ${response.statusText}`)
    }

    const files = await response.json()
    const mdFiles = files
      .filter((file: any) => file.type === 'file' && file.name.endsWith('.md'))
      .map((file: any) => file.name)
      .sort((a: string, b: string) => {
        // Quick Start should always be first
        if (a === 'QUICK_START.md') return -1
        if (b === 'QUICK_START.md') return 1
        // Otherwise alphabetical
        return a.localeCompare(b)
      })

    // Update cache
    cachedDocFiles = mdFiles
    cacheTimestamp = Date.now()

    return mdFiles
  } catch (error) {
    console.error('Error fetching docs list:', error)
    // Return fallback list if API fails
    return [
      'QUICK_START.md',
      'API_REFERENCE.md',
      'ARCHITECTURE.md',
      'BROWSER_COMPATIBILITY.md',
      'BUILD_VERIFICATION.md',
      'EIP-7951.md',
      'EIP_7702.md',
      'INTEGRATION_GUIDELINES.md',
      'PORTABILITY.md',
      'RECOVERY.md',
      'SECURITY.md',
      'ZK.md',
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const file = searchParams.get('file')

    if (!file) {
      // Return list of all docs
      const files = await getDocFiles()
      return NextResponse.json({ files })
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
    return NextResponse.json({ error: 'Failed to read documentation' }, { status: 500 })
  }
}
