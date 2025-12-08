import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://w3pk.w3hc.org'),

  title: 'w3pk',
  description: 'Passwordless Web3 authentication SDK with encrypted wallets and privacy features.',

  keywords: ['w3pk', 'WebAuthn', 'Next.js', 'Web3', 'Ethereum'],
  authors: [{ name: 'W3HC', url: 'https://github.com/w3hc' }],

  openGraph: {
    title: 'w3pk',
    description:
      'Passwordless Web3 authentication SDK with encrypted wallets and privacy features.',
    siteName: 'w3pk',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'Passwordless Web3 authentication SDK with encrypted wallets and privacy features.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'w3pk',
    description:
      'Passwordless Web3 authentication SDK with encrypted wallets and privacy features.',
    images: ['/huangshan.png'],
    creator: '@julienbrg',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'your-google-site-verification',
  },
}
