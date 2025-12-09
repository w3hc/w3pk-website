'use client'

import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { brandColors } from '@/theme'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Endpoints page error:', error)
  }, [error])

  return (
    <Box py={20}>
      <VStack gap={6} align="center" maxW="600px" mx="auto" p={6}>
        <Heading as="h2" size="xl" color="red.400">
          Something went wrong!
        </Heading>
        <Text fontSize="lg" color="gray.400" textAlign="center">
          An error occurred while loading the RPC endpoints page.
        </Text>
        {error.message && (
          <Box
            p={4}
            bg="red.900"
            borderRadius="md"
            borderWidth="1px"
            borderColor="red.700"
            w="full"
          >
            <Text fontSize="sm" color="red.200" fontFamily="mono" wordBreak="break-word">
              {error.message}
            </Text>
          </Box>
        )}
        <Button
          bg={brandColors.accent}
          color="white"
          _hover={{ bg: '#3691e7' }}
          onClick={reset}
        >
          Try again
        </Button>
      </VStack>
    </Box>
  )
}
