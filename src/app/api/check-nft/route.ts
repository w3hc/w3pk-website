import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

const ALPHATESTER_CONTRACT_ADDRESS = '0x319503520456Fac47a18879d05A56f919f67ffa5'
const OP_MAINNET_RPC = 'https://mainnet.optimism.io'

// Minimal ABI for balanceOf and tokenOfOwnerByIndex functions
const ALPHATESTER_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export async function POST(request: NextRequest) {
  try {
    const { userAddress } = await request.json()

    // Validate user address
    if (!userAddress) {
      return NextResponse.json({ error: 'User address is required' }, { status: 400 })
    }

    // Validate address format
    if (!ethers.isAddress(userAddress)) {
      return NextResponse.json({ error: 'Invalid Ethereum address' }, { status: 400 })
    }

    // Create provider
    const provider = new ethers.JsonRpcProvider(OP_MAINNET_RPC)

    // Connect to the contract
    const contract = new ethers.Contract(ALPHATESTER_CONTRACT_ADDRESS, ALPHATESTER_ABI, provider)

    // Check if user owns any NFTs
    const balance = await contract.balanceOf(userAddress)

    if (balance === 0n) {
      return NextResponse.json(
        {
          hasNFT: false,
          balance: 0,
        },
        { status: 200 }
      )
    }

    // Get the first token ID owned by the user
    const tokenId = await contract.tokenOfOwnerByIndex(userAddress, 0)

    return NextResponse.json(
      {
        hasNFT: true,
        balance: Number(balance),
        tokenId: Number(tokenId),
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error checking NFT ownership:', error)

    return NextResponse.json(
      {
        error: 'Failed to check NFT ownership',
        details: error.toString(),
      },
      { status: 500 }
    )
  }
}
