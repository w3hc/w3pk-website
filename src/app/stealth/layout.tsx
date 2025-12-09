import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stealth Addresses | w3pk',
  description:
    'Privacy-preserving stealth addresses with view tag optimization - ERC-5564 compliant',

  openGraph: {
    title: 'Stealth Addresses | w3pk',
    description:
      'Privacy-preserving stealth addresses with view tag optimization - ERC-5564 compliant',
    siteName: 'w3pk',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'Privacy-preserving stealth addresses with view tag optimization',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Stealth Addresses | w3pk',
    description:
      'Privacy-preserving stealth addresses with view tag optimization - ERC-5564 compliant',
    images: ['/huangshan.png'],
    creator: '@julienbrg',
  },
}

export default function StealthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
