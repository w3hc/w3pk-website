'use client'

import { Heading, Text, Box, VStack, HStack, Flex, Link, Icon } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { useW3PK, base64UrlToArrayBuffer, base64UrlDecode, extractRS } from '@/context/W3PK'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'
import { toaster } from '@/components/ui/toaster'
import { Input } from '@/components/ui/input'
import { brandColors } from '@/theme'
import { FaGithub, FaNpm } from 'react-icons/fa'

const shimmerStyles = `
  @keyframes colorWave {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .shimmer-text {
    background: linear-gradient(120deg, #3182ce 0%, #ffffff 25%, #805ad5 50%, #ffffff 75%, #3182ce 100%);
    background-size: 400% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: colorWave 10s ease-in-out infinite;
  }
`

export default function Home() {
  const {
    isAuthenticated,
    user,
    login,
    signMessage,
    deriveWallet,
    getAddress,
    getStealthKeys,
    generateStealthAddressFor,
  } = useW3PK()
  const t = useTranslation()
  const [primaryAddress, setPrimaryAddress] = useState<string>('')
  const [mainAddress, setMainAddress] = useState<string>('')
  const [openbarAddress, setOpenbarAddress] = useState<string>('')

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailSubmit = async () => {
    if (!email || !email.includes('@')) {
      toaster.create({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        type: 'error',
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toaster.create({
          title: 'Success!',
          description: 'You have been subscribed to w3pk updates',
          type: 'success',
          duration: 3000,
        })
        setEmail('')
      } else {
        throw new Error('Subscription failed')
      }
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        type: 'error',
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {}, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />
      <VStack gap={8} align="stretch" py={20}>
        <Text fontSize="lg">
          w3pk is a passwordless Web3 authentication SDK with encrypted wallets and privacy
          features. You can use it in any JS/TS-based web app (Next.js, Vue, Angular, Svelte, …).
        </Text>

        {/* Code Showcase */}
        <Box mt={3} borderRadius="3xl" overflow="hidden" position="relative">
          <Box bg="gray.900" p={12} fontFamily="monospace" fontSize="md">
            <Text color="#ffffff" mb={1}>
              <Text as="span" color="#ffffff">
                import
              </Text>{' '}
              {'{ '}
              <Text as="span" color={brandColors.accent}>
                createWeb3Passkey
              </Text>
              {' }'}{' '}
              <Text as="span" color="#ffffff">
                from
              </Text>{' '}
              <Text as="span" color={brandColors.primary}>
                &apos;w3pk&apos;
              </Text>
            </Text>
            <Text mb={2}>&nbsp;</Text>
            <Text color="#ffffff" mb={2}>
              <Text as="span" color="#ffffff">
                const
              </Text>{' '}
              <Text as="span" color={brandColors.accent}>
                w3pk
              </Text>{' '}
              <Text as="span" color="#9ca3af">
                =
              </Text>{' '}
              <Text as="span" color={brandColors.accent}>
                createWeb3Passkey
              </Text>
              <Text as="span" color="#ffffff">
                ()
              </Text>
            </Text>
            <Text mb={2}>&nbsp;</Text>
            <Text color="#6b7280" mb={1}>
              {'// Register'}
            </Text>
            <Text color="#ffffff" mb={1}>
              <Text as="span" color="#ffffff">
                await
              </Text>{' '}
              <Text as="span" color={brandColors.accent}>
                w3pk
              </Text>
              <Text as="span" color="#ffffff">
                .
              </Text>
              <Text as="span" color={brandColors.accent}>
                register
              </Text>
              <Text as="span" color="#ffffff">
                ({'{'}
              </Text>
            </Text>
            <Text color="#ffffff" ml={4} mb={1}>
              <Text as="span" color="#ffffff">
                username
              </Text>
              <Text as="span" color="#9ca3af">
                :{' '}
              </Text>
              <Text as="span" color={brandColors.primary}>
                &apos;alice&apos;
              </Text>
            </Text>
            <Text color="#9ca3af" ml={4} mb={1}></Text>
            <Text color="#ffffff" mb={2}>
              {'}'})
            </Text>
            <Text mb={2}>&nbsp;</Text>
            <Text color="#6b7280" mb={1}>
              {'// Login'}
            </Text>
            <Text color="#ffffff" mb={1}>
              <Text as="span" color="#ffffff">
                await
              </Text>{' '}
              <Text as="span" color={brandColors.accent}>
                w3pk
              </Text>
              <Text as="span" color="#ffffff">
                .
              </Text>
              <Text as="span" color={brandColors.accent}>
                login
              </Text>
              <Text as="span" color="#ffffff">
                ()
              </Text>
            </Text>
            <Text mb={2}>&nbsp;</Text>
            <Text color="#6b7280" mb={1}>
              {'// Logout'}
            </Text>
            <Text color="#ffffff">
              <Text as="span" color="#ffffff">
                await
              </Text>{' '}
              <Text as="span" color={brandColors.accent}>
                w3pk
              </Text>
              <Text as="span" color="#ffffff">
                .
              </Text>
              <Text as="span" color={brandColors.accent}>
                logout
              </Text>
              <Text as="span" color="#ffffff">
                ()
              </Text>
            </Text>
          </Box>
        </Box>

        <Box pb={20}>
          {/* Social Links */}
          <HStack mt={20} gap={6} justify="center" py={4} borderColor="gray.800">
            <Link
              href="https://github.com/w3hc/w3pk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View w3pk on GitHub (opens in new tab)"
            >
              <Flex
                align="center"
                gap={3}
                px={6}
                py={3}
                borderRadius="md"
                bg="gray.800"
                minW="140px"
                justify="center"
                _hover={{
                  bg: 'gray.700',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(69, 162, 248, 0.3)',
                }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <Icon as={FaGithub} boxSize={6} color={brandColors.accent} />
                <Text fontSize="md" fontWeight="medium">
                  GitHub
                </Text>
              </Flex>
            </Link>

            <Link
              href="https://www.npmjs.com/package/w3pk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View w3pk on NPM (opens in new tab)"
            >
              <Flex
                align="center"
                gap={3}
                px={6}
                py={3}
                borderRadius="md"
                bg="gray.800"
                minW="140px"
                justify="center"
                _hover={{
                  bg: 'gray.700',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(140, 28, 132, 0.3)',
                }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <Icon as={FaNpm} boxSize={6} color={brandColors.primary} />
                <Text fontSize="md" fontWeight="medium">
                  NPM
                </Text>
              </Flex>
            </Link>
          </HStack>
        </Box>

        {/* Email Subscription Box */}
        <Box p={6} borderRadius="lg" bg="gray.900" borderWidth="1px" borderColor="gray.700">
          <Text fontSize="sm" color="gray.300" mb={4}>
            w3pk is under dev. Receive emails when we ship new features (EIP-1193 support, AI
            capacities, chain abstraction, and more)
          </Text>
          <HStack gap={3}>
            <Input
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
              bg="gray.800"
              borderColor="gray.600"
              pl={3}
              _hover={{ borderColor: 'gray.500' }}
              _focus={{
                borderColor: brandColors.accent,
                boxShadow: `0 0 0 1px ${brandColors.accent}`,
              }}
            />
            <Button
              onClick={handleEmailSubmit}
              loading={isSubmitting}
              bg={brandColors.accent}
              color="white"
              _hover={{ bg: '#3691e7' }}
              _active={{ bg: '#2780d6' }}
              px={8}
            >
              Subscribe
            </Button>
          </HStack>
        </Box>
        {/* Features List */}
        <Box mt={12}>
          <Heading size="xl" mb={6}>
            Features
          </Heading>
          <VStack align="stretch" gap={2}>
            <Text>🔐 Passwordless authentication (WebAuthn/FIDO2)</Text>
            <Text>🛡️ Origin-specific key isolation with tag-based access control</Text>
            <Text>⏱️ Session management (in-memory + optional persistence)</Text>
            <Text>
              🔒 Persistent sessions (encrypted with WebAuthn keys, survives page refresh)
            </Text>
            <Text>🌱 HD wallet generation (BIP39/BIP44)</Text>
            <Text>🔢 Multi-address derivation</Text>
            <Text>
              🌐 Origin-specific addresses (deterministic derivation per website with tag support)
            </Text>
            <Text>✍️ Multiple signing methods (EIP-191, SIWE/EIP-4361, EIP-712, rawHash)</Text>
            <VStack align="stretch" pl={6} gap={1}>
              <Text>• EIP-191: Standard Ethereum signed messages</Text>
              <Text>• SIWE: Sign-In with Ethereum (Web3 authentication)</Text>
              <Text>• EIP-712: Structured typed data (permits, voting, etc.)</Text>
              <Text>• rawHash: Pre-computed hashes (Safe multisig, custom schemes)</Text>
            </VStack>

            <Text>
              🥷 ERC-5564 stealth addresses (opt-in, privacy-preserving transactions with view tags)
            </Text>
            <Text>🧮 ZK primitives (zero-knowledge proof generation and verification)</Text>
            <Text>🔗 Chainlist support (2390+ networks, auto-filtered RPC endpoints)</Text>
            <Text>⚡ EIP-7702 network detection (329+ supported networks)</Text>
            <Text>🔑 EIP-7951 PRIMARY mode (sign with P-256 passkeys directly)</Text>
            <Text>🔍 Build verification (IPFS CIDv1 hashing for package integrity)</Text>
            <Text>🛡️ Three-layer backup & recovery system</Text>
            <VStack align="stretch" pl={6} gap={1}>
              <Text>• Passkey auto-sync (iCloud/Google/Microsoft)</Text>
              <Text>• Encrypted backups (QR codes and backup files with password protection)</Text>
              <Text>• Social recovery (Shamir Secret Sharing)</Text>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </>
  )
}
