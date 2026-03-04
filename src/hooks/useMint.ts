'use client'

import { useState } from 'react'
import { useW3PK } from '@/context/W3PK'
import { toaster } from '@/components/ui/toaster'

const ALPHATESTER_CONTRACT_ADDRESS = '0x319503520456Fac47a18879d05A56f919f67ffa5'
const OP_MAINNET_CHAIN_ID = 10

export function useMint() {
  const [isMinting, setIsMinting] = useState(false)
  const { isAuthenticated, sendTransaction, getAddress } = useW3PK()

  const mint = async () => {
    if (!isAuthenticated) {
      toaster.create({
        title: 'Authentication Required',
        description: 'Please log in to mint an AlphaTester NFT',
        type: 'error',
        duration: 5000,
      })
      return
    }

    try {
      setIsMinting(true)

      // Get the user's address
      const userAddress = await getAddress('STANDARD', 'MAIN')

      // Check if user already owns an NFT (via API)
      const checkResponse = await fetch('/api/check-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress,
        }),
      })

      const checkData = await checkResponse.json()

      if (checkData.hasNFT) {
        toaster.create({
          title: 'Already minted',
          description: "You're already a member, thanks again for testing!",
          type: 'error',
          duration: 7000,
        })
        return
      }

      // Encode the safeMint function call
      // safeMint(address to) - function signature: 0x40d097c3
      const functionSelector = '0x40d097c3'
      const encodedAddress = userAddress.slice(2).padStart(64, '0')
      const data = functionSelector + encodedAddress

      // Send transaction using w3pk's sendTransaction method
      const result = await sendTransaction(
        {
          to: ALPHATESTER_CONTRACT_ADDRESS,
          data,
          chainId: OP_MAINNET_CHAIN_ID,
        },
        {
          mode: 'STANDARD',
          tag: 'MAIN',
        }
      )

      toaster.create({
        title: 'Done!',
        description: `NFT minted! Transaction: ${result.hash.substring(0, 10)}...`,
        type: 'success',
        duration: 10000,
      })

      return { txHash: result.hash, ...result }
    } catch (error) {
      console.error('Failed to mint AlphaTester NFT:', error)

      let errorMessage = 'Failed to mint AlphaTester NFT'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      toaster.create({
        title: 'Minting Failed',
        description: errorMessage,
        type: 'error',
        duration: 7000,
      })

      throw error
    } finally {
      setIsMinting(false)
    }
  }

  return {
    mint,
    isMinting,
  }
}
