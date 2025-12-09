'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Link as ChakraLink, Icon } from '@chakra-ui/react'
import { brandColors } from '@/theme'
import { FiExternalLink, FiPackage, FiCreditCard, FiFileText, FiCheckSquare } from 'react-icons/fi'

interface Example {
  id: string
  title: string
  description: string
  icon: any
  url?: string
  color: string
}

const examples: Example[] = [
  {
    id: 'genji',
    title: 'Genji',
    description: 'Next.js Web3 starter with passkey auth and WCAG 2.1 AA compliant accessibility',
    icon: FiPackage,
    url: 'https://github.com/w3hc/genji-passkey',
    color: brandColors.accent,
  },
  {
    id: 'shebam',
    title: 'Shebam',
    description: 'A simple payment app using w3pk',
    icon: FiCreditCard,
    url: 'https://shebam.w3hc.org/',
    color: brandColors.primary,
  },
  // {
  //   id: 'affix',
  //   title: 'Affix',
  //   description:
  //     'Authenticate your documents onchain while keeping your existing workflows intact. Anyone can then instantly verify that documents are genuine and unaltered.',
  //   icon: FiFileText,
  //   url: 'https://affix-ui.vercel.app/',
  //   color: '#f59e0b',
  // },
  // {
  //   id: 'stealth-gov',
  //   title: 'Stealth Gov',
  //   description: 'A voting system using w3pk',
  //   icon: FiCheckSquare,
  //   url: 'https://github.com/w3hc/stealth-gov',
  //   color: '#10b981',
  // },
]

export default function ExamplesPage() {
  return (
    <VStack gap={8} align="stretch" py={20}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Heading as="h1" size="2xl" mb={4}>
          Examples
        </Heading>
        <Text fontSize="xl" color="gray.400" maxW="2xl" mx="auto">
          Real-world applications built with w3pk
        </Text>
      </Box>

      {/* Examples Grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        {examples.map(example => (
          <ChakraLink
            key={example.id}
            href={example.url}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: 'none' }}
            w="100%"
          >
            <Box
              bg="gray.900"
              p={6}
              borderRadius="xl"
              borderWidth="2px"
              borderColor="gray.800"
              transition="all 0.3s"
              _hover={{
                borderColor: example.color,
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 30px ${example.color}33`,
              }}
              cursor="pointer"
              h="240px"
              w="100%"
              display="flex"
              flexDirection="column"
            >
              <VStack align="start" gap={4} flex="1">
                {/* Icon and Title */}
                <Box display="flex" alignItems="center" justifyContent="space-between" w="100%">
                  <Box display="flex" alignItems="center" gap={3}>
                    <Box
                      p={3}
                      bg={`${example.color}22`}
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon boxSize={6} color={example.color}>
                        {<example.icon />}
                      </Icon>
                    </Box>
                    <Heading as="h3" size="lg">
                      {example.title}
                    </Heading>
                  </Box>
                  <Icon boxSize={5} color="gray.500">
                    <FiExternalLink />
                  </Icon>
                </Box>

                {/* Description */}
                <Text color="gray.400" fontSize="md" lineHeight="1.7" flex="1">
                  {example.description}
                </Text>
              </VStack>
            </Box>
          </ChakraLink>
        ))}
      </SimpleGrid>

      {/* Bottom Info */}
      <Text fontSize="sm" color="gray.400" textAlign="center">
        Want to showcase your project built with w3pk?{' '}
        <ChakraLink
          href="https://julienberanger.com/contact"
          target="_blank"
          rel="noopener noreferrer"
          color={brandColors.accent}
          _hover={{ textDecoration: 'underline' }}
        >
          Contact Julien here.
        </ChakraLink>
      </Text>
    </VStack>
  )
}
