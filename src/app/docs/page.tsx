'use client'

import { Box, Heading, Text, VStack, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { brandColors } from '@/theme'
import { FaChevronRight, FaLink } from 'react-icons/fa'

interface DocFile {
  id: string
  title: string
  filename: string
}

const docFiles: DocFile[] = [
  { id: 'quick-start', title: 'Quick Start', filename: 'QUICK_START.md' },
  { id: 'api-reference', title: 'API Reference', filename: 'API_REFERENCE.md' },
  { id: 'integration', title: 'Integration Guidelines', filename: 'INTEGRATION_GUIDELINES.md' },
  { id: 'security', title: 'Security', filename: 'SECURITY.md' },
  { id: 'architecture', title: 'Architecture', filename: 'ARCHITECTURE.md' },
  { id: 'recovery', title: 'Recovery', filename: 'RECOVERY.md' },
  { id: 'eip-7951', title: 'EIP-7951', filename: 'EIP-7951.md' },
  { id: 'eip-7702', title: 'EIP-7702', filename: 'EIP_7702.md' },
  { id: 'zk', title: 'Zero-Knowledge', filename: 'ZK.md' },
  {
    id: 'build-verification',
    title: 'Build Verification',
    filename: 'BUILD_VERIFICATION.md',
  },
  {
    id: 'browser-compatibility',
    title: 'Browser Compatibility',
    filename: 'BROWSER_COMPATIBILITY.md',
  },
]

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<string>('quick-start')
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  // Handle hash navigation on mount and hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            const headerOffset = 90 // Account for fixed header (72px) + some padding
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
          }
        }, 100)
      }
    }

    // Handle on mount
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    loadDoc(selectedDoc)
  }, [selectedDoc])

  // Scroll to hash after content loads
  useEffect(() => {
    if (content && window.location.hash) {
      const hash = window.location.hash.slice(1)
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          const headerOffset = 90
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }, 150)
    }
  }, [content])

  const loadDoc = async (docId: string) => {
    setLoading(true)
    try {
      const file = docFiles.find(d => d.id === docId)
      if (!file) return

      const response = await fetch(`/api/docs?file=${file.filename}`)
      const data = await response.json()

      if (data.content) {
        setContent(data.content)
      }
    } catch (error) {
      console.error('Error loading doc:', error)
      setContent('Failed to load documentation')
    } finally {
      setLoading(false)
    }
  }

  // Convert heading text to URL-friendly anchor ID
  const textToAnchorId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single
      .trim()
  }

  // Copy anchor link to clipboard
  const copyAnchorLink = async (anchorId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`
    try {
      await navigator.clipboard.writeText(url)
      // Visual feedback could be added here if needed
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  // Helper to parse inline markdown (bold, italic, inline code, links)
  const parseInlineMarkdown = (text: string, key: string | number) => {
    let currentText = text
    let partIndex = 0

    // Process bold text **text**
    const boldRegex = /\*\*([^*]+)\*\*/g
    const processedForBold: (string | React.ReactNode)[] = []
    let lastIndex = 0
    let match

    while ((match = boldRegex.exec(currentText)) !== null) {
      if (match.index > lastIndex) {
        processedForBold.push(currentText.substring(lastIndex, match.index))
      }
      processedForBold.push(
        <Text as="strong" key={`bold-${key}-${partIndex++}`} fontWeight="bold">
          {match[1]}
        </Text>
      )
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < currentText.length) {
      processedForBold.push(currentText.substring(lastIndex))
    }

    // Process inline code `code`
    const finalParts: (string | React.ReactNode)[] = []
    processedForBold.forEach((part, idx) => {
      if (typeof part === 'string') {
        const codeParts = part.split('`')
        codeParts.forEach((codePart, codeIdx) => {
          if (codeIdx % 2 === 1) {
            finalParts.push(
              <Text
                as="code"
                key={`code-${key}-${idx}-${codeIdx}`}
                bg="gray.800"
                px={2}
                py={1}
                borderRadius="sm"
                fontFamily="monospace"
                fontSize="sm"
                color={brandColors.accent}
              >
                {codePart}
              </Text>
            )
          } else if (codePart) {
            finalParts.push(codePart)
          }
        })
      } else {
        finalParts.push(part)
      }
    })

    return finalParts.length > 0 ? finalParts : text
  }

  const renderMarkdown = (markdown: string) => {
    // Simple markdown rendering - replace with proper library when react-markdown is installed
    const lines = markdown.split('\n')
    const elements: JSX.Element[] = []
    let inCodeBlock = false
    let codeBlockContent: string[] = []
    let codeBlockLang = ''
    let inTable = false
    let tableHeaders: string[] = []
    let tableRows: string[][] = []

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeBlockLang = line.replace('```', '').trim()
          codeBlockContent = []
        } else {
          inCodeBlock = false
          elements.push(
            <Box
              key={`code-${index}`}
              bg="gray.900"
              p={4}
              borderRadius="lg"
              fontFamily="monospace"
              fontSize="sm"
              overflowX="auto"
              my={4}
              borderWidth="2px"
              borderColor={brandColors.primary}
              position="relative"
            >
              {codeBlockLang && (
                <Text
                  color={brandColors.accent}
                  fontSize="xs"
                  mb={2}
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  {codeBlockLang}
                </Text>
              )}
              <Text whiteSpace="pre" color="gray.100" lineHeight="1.6">
                {codeBlockContent.join('\n')}
              </Text>
            </Box>
          )
          codeBlockContent = []
          codeBlockLang = ''
        }
        return
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        return
      }

      // Tables
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const cells = line
          .split('|')
          .slice(1, -1)
          .map(cell => cell.trim())

        // Check if it's a separator line
        if (cells.every(cell => /^[-:]+$/.test(cell))) {
          // Skip separator line
          return
        }

        if (tableHeaders.length === 0) {
          // First row is headers
          tableHeaders = cells
          inTable = true
        } else {
          // Data rows
          tableRows.push(cells)
        }
        return
      } else if (inTable && tableHeaders.length > 0) {
        // End of table - render it
        elements.push(
          <Box
            key={`table-${index}`}
            overflowX="auto"
            my={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.700"
          >
            <Box as="table" w="100%" fontSize="sm">
              <Box as="thead" bg="gray.900">
                <Box as="tr">
                  {tableHeaders.map((header, i) => (
                    <Box
                      as="th"
                      key={i}
                      p={3}
                      textAlign="left"
                      borderBottomWidth="2px"
                      borderColor={brandColors.accent}
                      fontWeight="semibold"
                      color={brandColors.accent}
                    >
                      {parseInlineMarkdown(header, `th-${i}`)}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box as="tbody">
                {tableRows.map((row, rowIdx) => (
                  <Box
                    as="tr"
                    key={rowIdx}
                    _hover={{ bg: 'gray.900' }}
                    transition="background 0.2s"
                  >
                    {row.map((cell, cellIdx) => (
                      <Box
                        as="td"
                        key={cellIdx}
                        p={3}
                        borderBottomWidth="1px"
                        borderColor="gray.800"
                        color="gray.300"
                      >
                        {parseInlineMarkdown(cell, `td-${rowIdx}-${cellIdx}`)}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )
        inTable = false
        tableHeaders = []
        tableRows = []
        // Continue processing this line
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <Box
            key={`quote-${index}`}
            pl={4}
            py={2}
            my={2}
            borderLeftWidth="4px"
            borderLeftColor={brandColors.primary}
            bg="gray.900"
            borderRadius="sm"
          >
            <Text color="gray.400" fontStyle="italic">
              {parseInlineMarkdown(line.replace('> ', ''), `quote-${index}`)}
            </Text>
          </Box>
        )
        return
      }

      // Headings
      if (line.startsWith('# ')) {
        const text = line.replace('# ', '')
        const anchorId = textToAnchorId(text)
        elements.push(
          <Box key={`h1-${index}`} id={anchorId} position="relative" mt={8} mb={4}>
            <Heading
              size="2xl"
              display="inline-block"
              _hover={{ '& .anchor-link': { opacity: 1 } }}
            >
              {text}
              <ChakraLink
                href={`#${anchorId}`}
                className="anchor-link"
                ml={2}
                opacity={0}
                transition="opacity 0.2s"
                color="gray.500"
                _hover={{ color: brandColors.accent }}
                onClick={e => {
                  e.preventDefault()
                  copyAnchorLink(anchorId)
                  window.location.hash = anchorId
                }}
              >
                <FaLink size={20} style={{ display: 'inline' }} />
              </ChakraLink>
            </Heading>
          </Box>
        )
      } else if (line.startsWith('## ')) {
        const text = line.replace('## ', '')
        const anchorId = textToAnchorId(text)
        elements.push(
          <Box key={`h2-${index}`} id={anchorId} position="relative" mt={6} mb={3}>
            <Heading size="xl" display="inline-block" _hover={{ '& .anchor-link': { opacity: 1 } }}>
              {text}
              <ChakraLink
                href={`#${anchorId}`}
                className="anchor-link"
                ml={2}
                opacity={0}
                transition="opacity 0.2s"
                color="gray.500"
                _hover={{ color: brandColors.accent }}
                onClick={e => {
                  e.preventDefault()
                  copyAnchorLink(anchorId)
                  window.location.hash = anchorId
                }}
              >
                <FaLink size={18} style={{ display: 'inline' }} />
              </ChakraLink>
            </Heading>
          </Box>
        )
      } else if (line.startsWith('### ')) {
        const text = line.replace('### ', '')
        const anchorId = textToAnchorId(text)
        elements.push(
          <Box key={`h3-${index}`} id={anchorId} position="relative" mt={4} mb={2}>
            <Heading size="lg" display="inline-block" _hover={{ '& .anchor-link': { opacity: 1 } }}>
              {text}
              <ChakraLink
                href={`#${anchorId}`}
                className="anchor-link"
                ml={2}
                opacity={0}
                transition="opacity 0.2s"
                color="gray.500"
                _hover={{ color: brandColors.accent }}
                onClick={e => {
                  e.preventDefault()
                  copyAnchorLink(anchorId)
                  window.location.hash = anchorId
                }}
              >
                <FaLink size={16} style={{ display: 'inline' }} />
              </ChakraLink>
            </Heading>
          </Box>
        )
      } else if (line.startsWith('#### ')) {
        const text = line.replace('#### ', '')
        const anchorId = textToAnchorId(text)
        elements.push(
          <Box key={`h4-${index}`} id={anchorId} position="relative" mt={3} mb={2}>
            <Heading size="md" display="inline-block" _hover={{ '& .anchor-link': { opacity: 1 } }}>
              {text}
              <ChakraLink
                href={`#${anchorId}`}
                className="anchor-link"
                ml={2}
                opacity={0}
                transition="opacity 0.2s"
                color="gray.500"
                _hover={{ color: brandColors.accent }}
                onClick={e => {
                  e.preventDefault()
                  copyAnchorLink(anchorId)
                  window.location.hash = anchorId
                }}
              >
                <FaLink size={14} style={{ display: 'inline' }} />
              </ChakraLink>
            </Heading>
          </Box>
        )
      }
      // Lists
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        const listText = line.replace(/^[-*] /, '')
        elements.push(
          <Text key={`li-${index}`} pl={4} mb={1} color="gray.300">
            • {parseInlineMarkdown(listText, `li-${index}`)}
          </Text>
        )
      }
      // Regular text (includes links, bold, inline code)
      else if (line.trim()) {
        // Check for links
        if (line.includes('[') && line.includes('](')) {
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
          const parts: (string | React.ReactNode)[] = []
          let lastIndex = 0
          let match
          let tempLine = line

          while ((match = linkRegex.exec(tempLine)) !== null) {
            if (match.index > lastIndex) {
              const textBefore = tempLine.substring(lastIndex, match.index)
              parts.push(...(parseInlineMarkdown(textBefore, `pre-link-${index}-${lastIndex}`) as any))
            }
            parts.push(
              <ChakraLink
                key={`link-${index}-${match.index}`}
                href={match[2]}
                color={brandColors.accent}
                textDecoration="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {match[1]}
              </ChakraLink>
            )
            lastIndex = match.index + match[0].length
          }

          if (lastIndex < tempLine.length) {
            const textAfter = tempLine.substring(lastIndex)
            parts.push(...(parseInlineMarkdown(textAfter, `post-link-${index}-${lastIndex}`) as any))
          }

          elements.push(
            <Text key={`p-${index}`} mb={2} color="gray.300">
              {parts}
            </Text>
          )
        } else {
          // No links, just parse inline markdown
          elements.push(
            <Text key={`p-${index}`} mb={2} color="gray.300">
              {parseInlineMarkdown(line, `p-${index}`)}
            </Text>
          )
        }
      }
      // Empty line
      else {
        elements.push(<Box key={`space-${index}`} h={2} />)
      }
    })

    return elements
  }

  return (
    <Box position="relative" minH="calc(100vh - 72px)">
      {/* Sidebar */}
      <Box
        w={{ base: sidebarOpen ? '100%' : '0', md: '280px' }}
        bg="gray.950"
        borderRightWidth="1px"
        borderColor="gray.800"
        overflowY="auto"
        position={{ base: 'fixed', md: 'fixed' }}
        top={{ base: 0, md: '72px' }}
        left={0}
        h={{ base: '100vh', md: 'calc(100vh - 72px)' }}
        zIndex={{ base: 20, md: 10 }}
        transition="all 0.3s"
      >
        <VStack align="stretch" gap={0} p={4}>
          <Heading size="md" mb={4} px={2}>
            Documentation
          </Heading>
          {docFiles.map(doc => (
            <Box
              key={doc.id}
              px={4}
              py={3}
              borderRadius="md"
              cursor="pointer"
              bg={selectedDoc === doc.id ? 'gray.800' : 'transparent'}
              borderLeftWidth={selectedDoc === doc.id ? '3px' : '0'}
              borderLeftColor={brandColors.accent}
              _hover={{
                bg: selectedDoc === doc.id ? 'gray.800' : 'gray.900',
              }}
              transition="all 0.2s"
              onClick={() => {
                setSelectedDoc(doc.id)
                if (window.innerWidth < 768) {
                  setSidebarOpen(false)
                }
              }}
            >
              <HStack justify="space-between">
                <Text
                  fontSize="sm"
                  fontWeight={selectedDoc === doc.id ? 'semibold' : 'normal'}
                  color={selectedDoc === doc.id ? brandColors.accent : 'gray.300'}
                >
                  {doc.title}
                </Text>
                {selectedDoc === doc.id && <FaChevronRight color={brandColors.accent} size={12} />}
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box
        ml={{ base: 0, md: '280px' }}
        p={{ base: 4, md: 8 }}
        maxW={{ base: '100%', md: 'calc(100% - 280px)' }}
        w="100%"
      >
        {/* Mobile Menu Toggle */}
        <Box display={{ base: 'block', md: 'none' }} mb={4}>
          <Box
            px={4}
            py={2}
            bg="gray.900"
            borderRadius="md"
            cursor="pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            borderWidth="1px"
            borderColor="gray.700"
          >
            <HStack justify="space-between">
              <Text fontSize="sm" fontWeight="semibold">
                {docFiles.find(d => d.id === selectedDoc)?.title}
              </Text>
              <FaChevronRight
                style={{
                  transform: sidebarOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </HStack>
          </Box>
        </Box>

        {loading ? (
          <Box textAlign="center" py={20}>
            <Text color="gray.500">Loading...</Text>
          </Box>
        ) : (
          <VStack align="stretch" gap={0}>
            {renderMarkdown(content)}
          </VStack>
        )}

        {/* Footer Links */}
        <Box mt={16} pt={8} borderTopWidth="1px" borderColor="gray.800">
          <HStack gap={6} justify="center">
            <ChakraLink
              href="https://github.com/w3hc/w3pk"
              target="_blank"
              rel="noopener noreferrer"
              color={brandColors.accent}
              fontSize="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              GitHub
            </ChakraLink>
            <ChakraLink
              href="https://www.npmjs.com/package/w3pk"
              target="_blank"
              rel="noopener noreferrer"
              color={brandColors.accent}
              fontSize="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              NPM
            </ChakraLink>
            <ChakraLink
              href="https://github.com/w3hc/w3pk/issues"
              target="_blank"
              rel="noopener noreferrer"
              color={brandColors.accent}
              fontSize="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              Issues
            </ChakraLink>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}
