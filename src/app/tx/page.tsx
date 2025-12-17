'use client'

import { Text, VStack, Box, Heading, Link, Image } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { useW3PK } from '@/context/W3PK'
import { useTranslation } from '@/hooks/useTranslation'
import { useMint } from '@/hooks/useMint'
import { useState, useEffect } from 'react'
import { brandColors } from '@/theme'

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

  .flip-card {
    perspective: 1000px;
    cursor: pointer;
    position: relative;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    transition: transform 0.4s ease-in-out;
    transform-style: preserve-3d;
  }

  .flip-card-inner.flipped {
    transform: rotateY(360deg);
  }

  .flip-card-front,
  .flip-card-back {
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 0.5rem;
  }

  .flip-card-back {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateY(180deg);
  }
`

export default function TxPage() {
  const { isAuthenticated, user, login, signMessage, deriveWallet, getAddress } = useW3PK()
  const { mint, isMinting } = useMint()
  const t = useTranslation()
  const [mainAddress, setMainAddress] = useState<string>('')
  const [isLoadingMain, setIsLoadingMain] = useState(false)
  const [mintTxHash, setMintTxHash] = useState<string>('')
  const [ownedTokenId, setOwnedTokenId] = useState<string | null>(null)
  const [isCheckingNFT, setIsCheckingNFT] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadAddresses = async () => {
      if (!isAuthenticated || !user) {
        return
      }

      try {
        // Load MAIN address
        if (!mainAddress) {
          setIsLoadingMain(true)
          const mainWallet = await deriveWallet('STANDARD', 'MAIN')
          if (cancelled) return
          setMainAddress(mainWallet.address)
          setIsLoadingMain(false)
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load addresses:', error)
        }
      } finally {
        if (!cancelled) {
          setIsLoadingMain(false)
        }
      }
    }

    loadAddresses()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user, mainAddress, deriveWallet, getAddress])

  // Check if user already owns an NFT
  useEffect(() => {
    let cancelled = false

    const checkNFTOwnership = async () => {
      if (!mainAddress || !isAuthenticated) {
        return
      }

      try {
        setIsCheckingNFT(true)
        const response = await fetch('/api/check-nft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userAddress: mainAddress,
          }),
        })

        const data = await response.json()

        if (!cancelled && data.hasNFT && data.tokenId !== undefined) {
          setOwnedTokenId(data.tokenId.toString())
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to check NFT ownership:', error)
        }
      } finally {
        if (!cancelled) {
          setIsCheckingNFT(false)
        }
      }
    }

    checkNFTOwnership()

    return () => {
      cancelled = true
    }
  }, [mainAddress, isAuthenticated])

  const handleMintNFT = async () => {
    try {
      const result = await mint()
      if (result?.txHash) {
        setMintTxHash(result.txHash)
        // Refresh NFT ownership after successful mint
        setTimeout(async () => {
          try {
            const response = await fetch('/api/check-nft', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userAddress: mainAddress,
              }),
            })
            const data = await response.json()
            if (data.hasNFT && data.tokenId !== undefined) {
              setOwnedTokenId(data.tokenId.toString())
            }
          } catch (error) {
            console.error('Failed to refresh NFT ownership:', error)
          }
        }, 3000) // Wait 3 seconds for blockchain to update
      }
    } catch (error) {
      console.error('Failed to mint NFT:', error)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />
      <VStack gap={8} align="stretch" py={20}>
        <Box p={6} borderRadius="md" textAlign="center">
          {isAuthenticated ? (
            <>
              <Heading as="h1" size="xl" mb={4}>
                Mint W3PK Alpha Tester NFT
              </Heading>
              <Text mb={6} color="gray.400">
                Mint your W3PK Alpha Tester NFT on OP Mainnet from your main wallet.
              </Text>
              <Box h="20px" />
            </>
          ) : (
            <>
              <Heading as="h1" size="xl" mb={4}>
                {t.home.greeting}
              </Heading>
              <Text mb={6} color="gray.400">
                {t.home.greetingSubtitle}
              </Text>
              <Text fontSize="sm" color="gray.500">
                <Button
                  variant="plain"
                  as="span"
                  color="gray.500"
                  textDecorationStyle="dotted"
                  textUnderlineOffset="3px"
                  cursor="pointer"
                  _hover={{ color: 'gray.300' }}
                  onClick={login}
                  fontSize="sm"
                >
                  {t.common.pleaseLogin}{' '}
                </Button>
              </Text>
            </>
          )}
        </Box>

        {isAuthenticated && user && (
          <>
            <VStack gap={4} align="stretch">
              <Box
                as="span"
                fontSize="xl"
                wordBreak="break-all"
                className="shimmer-text"
                textAlign={'center'}
              >
                {isLoadingMain ? 'Loading...' : mainAddress || 'Not available'}
              </Box>
              <Box textAlign="center" mt={10}>
                <VStack gap={3}>
                  <Button
                    bg={brandColors.accent}
                    _hover={{ bg: brandColors.accent, opacity: 0.9 }}
                    color="white"
                    onClick={handleMintNFT}
                    disabled={!mainAddress || isMinting || !!ownedTokenId}
                    loading={isMinting}
                    size="sm"
                  >
                    {ownedTokenId ? 'Already Minted' : 'Mint'}
                  </Button>
                </VStack>

                {/* Show NFT if user already owns one */}
                {ownedTokenId && (
                  <Box
                    className="flip-card"
                    mt={8}
                    maxW="500px"
                    mx="auto"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <Box className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                      <Box className="flip-card-front">
                        <Box
                          p={6}
                          borderRadius="lg"
                          borderWidth="1px"
                          borderColor="blue.700"
                          bg="blue.950"
                        >
                          <VStack gap={4}>
                            <Image
                              src="https://bafybeif54pvansk6tlywsxajimb3qwtp5mm7efsp6loiaoioocpgebirwu.ipfs.dweb.link/pa30.png"
                              alt="Alpha Tester NFT"
                              borderRadius="lg"
                              width="100%"
                              maxW="300px"
                              mx="auto"
                            />
                            <Text fontSize="lg" fontWeight="bold" color="blue.300">
                              Alpha Tester NFT #{ownedTokenId}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              Tap to flip
                            </Text>
                            <Link
                              href={`https://optimistic.etherscan.io/address/${mainAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              fontSize="0.875rem"
                              color={brandColors.accent}
                              textDecoration="underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View on Etherscan
                            </Link>
                            <Text
                              fontSize="sm"
                              color="gray.300"
                              textAlign="left"
                              lineHeight="1.6"
                              width="100%"
                            >
                              You already own the Alpha Tester NFT on OP Mainnet! Don&apos;t forget to
                              backup your account so you don&apos;t lose the NFT: we&apos;ll soon deploy a
                              DAO and you&apos;re already a member of it! Thanks again for testing!
                            </Text>
                          </VStack>
                        </Box>
                      </Box>
                      <Box className="flip-card-back">
                        <Box
                          p={6}
                          borderRadius="lg"
                          borderWidth="1px"
                          borderColor="blue.700"
                          bg="blue.950"
                        >
                          <VStack gap={4}>
                            <Image
                              src="https://bafybeif54pvansk6tlywsxajimb3qwtp5mm7efsp6loiaoioocpgebirwu.ipfs.dweb.link/pa30.png"
                              alt="Alpha Tester NFT"
                              borderRadius="lg"
                              width="100%"
                              maxW="300px"
                              mx="auto"
                            />
                            <Text fontSize="lg" fontWeight="bold" color="blue.300">
                              Alpha Tester NFT #{ownedTokenId}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              Tap to flip
                            </Text>
                            <Link
                              href={`https://optimistic.etherscan.io/address/${mainAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              fontSize="0.875rem"
                              color={brandColors.accent}
                              textDecoration="underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View on Etherscan
                            </Link>
                            <Text
                              fontSize="sm"
                              color="gray.300"
                              textAlign="left"
                              lineHeight="1.6"
                              width="100%"
                            >
                              You already own the Alpha Tester NFT on OP Mainnet! Don&apos;t forget to
                              backup your account so you don&apos;t lose the NFT: we&apos;ll soon deploy a
                              DAO and you&apos;re already a member of it! Thanks again for testing!
                            </Text>
                          </VStack>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Show success message after new mint */}
                {mintTxHash && !ownedTokenId && (
                  <Box
                    mt={8}
                    p={6}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="blue.700"
                    bg="blue.950"
                    maxW="500px"
                    mx="auto"
                  >
                    <VStack gap={4}>
                      <Image
                        src="https://bafybeif54pvansk6tlywsxajimb3qwtp5mm7efsp6loiaoioocpgebirwu.ipfs.dweb.link/pa30.png"
                        alt="Alpha Tester NFT"
                        borderRadius="lg"
                        width="100%"
                        maxW="300px"
                      />
                      <Link
                        href={`https://optimistic.etherscan.io/tx/${mintTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        fontSize="0.875rem"
                        color={brandColors.accent}
                        textDecoration="underline"
                        wordBreak="break-all"
                        width="100%"
                      >
                        {mintTxHash}
                      </Link>
                      <Text
                        fontSize="sm"
                        color="gray.300"
                        textAlign="left"
                        lineHeight="1.6"
                        width="100%"
                      >
                        Thank you for testing W3PK! You now own the Alpha Tester NFT on OP Mainnet,
                        it&apos;s in your wallet. Don&apos;t forget to backup your account so you
                        don&apos;t lose the NFT: we&apos;ll soon deploy a DAO and you&apos;re
                        already a member of it! Thanks again!
                      </Text>
                    </VStack>
                  </Box>
                )}
              </Box>
            </VStack>
          </>
        )}
      </VStack>
    </>
  )
}
