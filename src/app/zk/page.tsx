'use client'

import {
  Container,
  Heading,
  Text,
  Box,
  VStack,
  SimpleGrid,
  Icon,
  List,
  HStack,
  Link as ChakraLink,
  Code,
  Separator,
} from '@chakra-ui/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { FiShield, FiCheckCircle, FiArrowRight, FiEye, FiLock, FiUsers } from 'react-icons/fi'
import Link from 'next/link'
import { brandColors } from '@/theme'

export default function ZKPage() {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack gap={12} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            ZK Proofs
          </Heading>
          <Text fontSize="xl" color="gray.400" maxW="2xl" mx="auto">
            Privacy-preserving cryptographic proofs that let you prove statements without revealing
            the underlying data
          </Text>
          <Box mt={6}>
            <ChakraLink
              href="https://www.npmjs.com/package/w3pk"
              target="_blank"
              rel="noopener noreferrer"
              display="inline-block"
              mr={4}
            >
              <Badge colorPalette="purple" fontSize="sm" px={3} py={2} cursor="pointer">
                npm install w3pk snarkjs circomlibjs
              </Badge>
            </ChakraLink>
          </Box>
        </Box>

        {/* What are ZK Proofs */}
        <Box>
          <Heading size="lg" mb={6} textAlign="center">
            What are Zero-Knowledge Proofs?
          </Heading>
          <Box bg="gray.900" p={6} borderRadius="lg" border="1px solid" borderColor="gray.700">
            <Text color="gray.300" mb={4} fontSize="lg">
              Zero-knowledge proofs (ZKPs) are cryptographic protocols that allow one party (the
              prover) to prove to another party (the verifier) that a statement is true, without
              revealing any information beyond the validity of the statement itself.
            </Text>
            <Separator my={4} />
            <Heading size="sm" mb={3} color={brandColors.primary}>
              Real-World Example
            </Heading>
            <Text color="gray.400" fontSize="sm">
              Imagine you want to prove you&apos;re over 18 to enter a venue, but you don&apos;t
              want to show your ID (which contains your name, address, exact birth date, etc.). A
              zero-knowledge proof lets you prove &quot;I am over 18&quot; without revealing
              anything else about yourself.
            </Text>
          </Box>
        </Box>

        {/* ZK in w3pk */}
        <Box>
          <Heading size="lg" mb={6} textAlign="center">
            ZK Proofs in w3pk
          </Heading>
          <Alert.Root status="info" mb={6} bg="rgba(69, 162, 248, 0.1)" borderRadius="md">
            <Alert.Indicator />
            <Alert.Description fontSize="sm">
              ZK proof features are optional in w3pk. They require additional dependencies (~70MB)
              and are designed for privacy-focused applications.
            </Alert.Description>
          </Alert.Root>

          <Code
            display="block"
            whiteSpace="pre"
            p={4}
            borderRadius="md"
            fontSize="sm"
            bg="gray.800"
            mb={6}
          >
            {`# Install core w3pk
npm install w3pk ethers

# Add ZK proof capabilities (optional)
npm install snarkjs circomlibjs`}
          </Code>
        </Box>

        {/* ZK Use Cases */}
        <Box>
          <Heading size="lg" mb={6} textAlign="center">
            ZK Proof Use Cases in w3pk
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Box
              bg="gray.900"
              p={6}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.700"
              _hover={{ borderColor: brandColors.primary, transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <Icon as={FiUsers} color={brandColors.primary} boxSize={8} mb={3} />
              <Heading size="md" mb={3}>
                Anonymous Membership Proofs
              </Heading>
              <Text color="gray.400" fontSize="sm" mb={3}>
                Prove you belong to a group without revealing your identity
              </Text>
              <List.Root gap={2} fontSize="sm">
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  DAO voting without revealing wallet
                </List.Item>
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Anonymous governance participation
                </List.Item>
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Private group membership verification
                </List.Item>
              </List.Root>
            </Box>

            <Box
              bg="gray.900"
              p={6}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.700"
              _hover={{ borderColor: brandColors.primary, transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <Icon as={FiLock} color={brandColors.primary} boxSize={8} mb={3} />
              <Heading size="md" mb={3}>
                Private Balance Verification
              </Heading>
              <Text color="gray.400" fontSize="sm" mb={3}>
                Prove you have sufficient funds without revealing the exact amount
              </Text>
              <List.Root gap={2} fontSize="sm">
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  KYC without exposing balances
                </List.Item>
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Creditworthiness proofs
                </List.Item>
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Collateral verification for loans
                </List.Item>
              </List.Root>
            </Box>

            <Box
              bg="gray.900"
              p={6}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.700"
              _hover={{ borderColor: brandColors.primary, transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <Icon as={FiEye} color={brandColors.primary} boxSize={8} mb={3} />
              <Heading size="md" mb={3}>
                Range Proofs
              </Heading>
              <Text color="gray.400" fontSize="sm" mb={3}>
                Prove a value falls within a range without revealing the exact value
              </Text>
              <List.Root gap={2} fontSize="sm">
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Age verification (over 18, under 65)
                </List.Item>
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Income brackets without exact salary
                </List.Item>
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Token holdings within threshold
                </List.Item>
              </List.Root>
            </Box>

            <Box
              bg="gray.900"
              p={6}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.700"
              _hover={{ borderColor: brandColors.primary, transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <Icon as={FiShield} color={brandColors.primary} boxSize={8} mb={3} />
              <Heading size="md" mb={3}>
                NFT Ownership Proofs
              </Heading>
              <Text color="gray.400" fontSize="sm" mb={3}>
                Prove you own an NFT without linking it to your public wallet address
              </Text>
              <List.Root gap={2} fontSize="sm">
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Anonymous access to token-gated content
                </List.Item>
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Private collector verification
                </List.Item>
                <List.Item>
                  <List.Indicator asChild>
                    <FiCheckCircle color="green" />
                  </List.Indicator>
                  Unlinkable membership credentials
                </List.Item>
              </List.Root>
            </Box>
          </SimpleGrid>
        </Box>

        {/* How it Works */}
        <Box>
          <Heading size="lg" mb={6} textAlign="center">
            How ZK Proofs Work in w3pk
          </Heading>
          <VStack gap={4} align="stretch">
            <Box bg="gray.900" p={5} borderRadius="lg" border="1px solid" borderColor="gray.700">
              <HStack mb={3}>
                <Badge colorPalette="purple">STEP 1</Badge>
                <Heading size="sm">Circuit Design</Heading>
              </HStack>
              <Text color="gray.400" fontSize="sm">
                w3pk uses pre-built circuits written in Circom (a domain-specific language for ZK
                circuits). These circuits define the mathematical constraints that represent your
                proof statement.
              </Text>
            </Box>

            <Box bg="gray.900" p={5} borderRadius="lg" border="1px solid" borderColor="gray.700">
              <HStack mb={3}>
                <Badge colorPalette="purple">STEP 2</Badge>
                <Heading size="sm">Witness Generation</Heading>
              </HStack>
              <Text color="gray.400" fontSize="sm">
                Your private data (witness) is used to generate the proof. This happens locally in
                your browser - your private data never leaves your device.
              </Text>
            </Box>

            <Box bg="gray.900" p={5} borderRadius="lg" border="1px solid" borderColor="gray.700">
              <HStack mb={3}>
                <Badge colorPalette="purple">STEP 3</Badge>
                <Heading size="sm">Proof Generation</Heading>
              </HStack>
              <Text color="gray.400" fontSize="sm">
                The snarkjs library generates a cryptographic proof using the Groth16 proving
                system. This proof is small (typically less than 1KB) and fast to verify.
              </Text>
            </Box>

            <Box bg="gray.900" p={5} borderRadius="lg" border="1px solid" borderColor="gray.700">
              <HStack mb={3}>
                <Badge colorPalette="purple">STEP 4</Badge>
                <Heading size="sm">Verification</Heading>
              </HStack>
              <Text color="gray.400" fontSize="sm">
                Anyone can verify the proof on-chain or off-chain without accessing your private
                data. Verification is fast and cheap (gas-efficient for on-chain verification).
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Code Example */}
        <Box>
          <Heading size="lg" mb={6} textAlign="center">
            Example: Anonymous Membership Proof
          </Heading>
          <Box bg="gray.900" p={6} borderRadius="lg" border="1px solid" borderColor="gray.700">
            <Text color="gray.400" fontSize="sm" mb={4}>
              This example shows how to prove you&apos;re a member of a DAO without revealing which
              member you are:
            </Text>
            <Code
              display="block"
              whiteSpace="pre"
              p={4}
              borderRadius="md"
              fontSize="xs"
              bg="gray.800"
              overflowX="auto"
            >
              {`import { createWeb3Passkey } from 'w3pk'

const w3pk = createWeb3Passkey()

// Login with w3pk
await w3pk.login()

// Generate a proof that you're in the allowlist
// Without revealing your specific address
const proof = await w3pk.zkProof.generateMembershipProof({
  allowlist: [
    '0x1234...',
    '0x5678...',
    '0x9abc...',  // Your address (kept private)
    '0xdef0...'
  ],
  myAddress: await w3pk.getAddress()
})

// Verify the proof (can be done by anyone)
const isValid = await w3pk.zkProof.verifyMembershipProof(proof)
console.log('Is valid member?', isValid) // true

// The verifier knows you're in the list,
// but doesn't know WHICH address is yours!`}
            </Code>
          </Box>
        </Box>

        {/* Technical Stack */}
        <Box>
          <Heading size="lg" mb={6} textAlign="center">
            Technical Stack
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            <Box bg="gray.900" p={5} borderRadius="lg" border="1px solid" borderColor="gray.700">
              <Badge colorPalette="purple" mb={3}>
                Circuit Language
              </Badge>
              <Heading size="sm" mb={2}>
                Circom
              </Heading>
              <Text fontSize="xs" color="gray.400">
                Domain-specific language for writing arithmetic circuits. Mature ecosystem with
                extensive tooling and libraries.
              </Text>
            </Box>

            <Box bg="gray.900" p={5} borderRadius="lg" border="1px solid" borderColor="gray.700">
              <Badge colorPalette="purple" mb={3}>
                Proving System
              </Badge>
              <Heading size="sm" mb={2}>
                Groth16
              </Heading>
              <Text fontSize="xs" color="gray.400">
                Efficient zk-SNARK proving system with constant-size proofs and fast verification.
                Widely used in production systems.
              </Text>
            </Box>

            <Box bg="gray.900" p={5} borderRadius="lg" border="1px solid" borderColor="gray.700">
              <Badge colorPalette="purple" mb={3}>
                JavaScript Library
              </Badge>
              <Heading size="sm" mb={2}>
                snarkjs
              </Heading>
              <Text fontSize="xs" color="gray.400">
                Complete implementation of zkSNARK schemes in JavaScript. Enables browser-based
                proof generation.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Bundle Size Warning */}
        <Alert.Root status="warning" bg="orange.900" opacity={0.9} borderRadius="lg">
          <Alert.Indicator />
          <Box fontSize="sm">
            <Text fontWeight="bold" mb={2}>
              Bundle Size Consideration
            </Text>
            <Text fontSize="xs" color="gray.300">
              ZK proof dependencies add approximately 70MB to your bundle size. This is due to the
              cryptographic libraries required for proof generation and verification. Consider using
              code splitting or lazy loading to optimize your application&apos;s initial load time.
              Core w3pk features (authentication, wallets, stealth addresses) work without these
              dependencies.
            </Text>
          </Box>
        </Alert.Root>

        {/* Resources */}
        <Box>
          <Heading size="md" mb={4} textAlign="center">
            Learn More
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <ChakraLink
              href="https://www.npmjs.com/package/w3pk"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                bg="gray.900"
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.700"
                _hover={{ borderColor: brandColors.primary }}
                transition="all 0.2s"
              >
                <Text fontWeight="bold" mb={1}>
                  w3pk ZK Integration Guide
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Complete documentation for implementing ZK proofs in your app
                </Text>
              </Box>
            </ChakraLink>

            <ChakraLink
              href="https://docs.circom.io/"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                bg="gray.900"
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.700"
                _hover={{ borderColor: brandColors.primary }}
                transition="all 0.2s"
              >
                <Text fontWeight="bold" mb={1}>
                  Circom Documentation
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Learn about circuit design and the Circom language
                </Text>
              </Box>
            </ChakraLink>

            <ChakraLink
              href="https://github.com/iden3/snarkjs"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                bg="gray.900"
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.700"
                _hover={{ borderColor: brandColors.primary }}
                transition="all 0.2s"
              >
                <Text fontWeight="bold" mb={1}>
                  snarkjs Library
                </Text>
                <Text fontSize="sm" color="gray.400">
                  zkSNARK implementation in JavaScript
                </Text>
              </Box>
            </ChakraLink>

            <ChakraLink
              href="https://z.cash/technology/zksnarks/"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                bg="gray.900"
                p={4}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.700"
                _hover={{ borderColor: brandColors.primary }}
                transition="all 0.2s"
              >
                <Text fontWeight="bold" mb={1}>
                  What are zk-SNARKs?
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Introduction to zero-knowledge proofs and zk-SNARKs
                </Text>
              </Box>
            </ChakraLink>
          </SimpleGrid>
        </Box>

        {/* Call to Action */}
        {/* <Box
          p={8}
          borderColor={brandColors.accent}
          border="2px solid"
          borderRadius="3xl"
          textAlign="center"
          boxShadow="0 10px 200px rgba(69, 162, 248, 0.3)"
        >
          <Heading size="lg" mb={4} color="white">
            See Zero-Knowledge Proofs in Action
          </Heading>
          <Text fontSize="lg" color="whiteAlpha.900" mb={6}>
            Try our interactive voting demo featuring anonymous voting with ZK membership proofs
          </Text>
          <Link href="https://d2u.w3hc.org/voting" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              bg="white"
              color={brandColors.accent}
              _hover={{ bg: 'gray.100', transform: 'translateY(-2px)', boxShadow: 'lg' }}
              fontWeight="bold"
              px={8}
              py={6}
              fontSize="lg"
              transition="all 0.3s"
            >
              Try Voting Demo
              <Icon ml={2}>
                <FiArrowRight />
              </Icon>
            </Button>
          </Link>
          <Text fontSize="sm" color="whiteAlpha.700" mt={4}>
            Experience passwordless authentication + anonymous voting
          </Text>
        </Box> */}
      </VStack>
    </Container>
  )
}
