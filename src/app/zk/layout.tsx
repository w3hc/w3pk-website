import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZK Proofs | w3pk',
  description:
    'Privacy-preserving zero-knowledge proofs for anonymous membership, balance verification, and more',

  openGraph: {
    title: 'ZK Proofs | w3pk',
    description:
      'Privacy-preserving zero-knowledge proofs for anonymous membership, balance verification, and more',
    siteName: 'w3pk',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'Zero-knowledge proofs for privacy-preserving applications',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ZK Proofs | w3pk',
    description:
      'Privacy-preserving zero-knowledge proofs for anonymous membership, balance verification, and more',
    images: ['/huangshan.png'],
    creator: '@julienbrg',
  },
}

export default function ZKLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
