import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Examples | w3pk',
  description: 'Real-world applications built with w3pk - passwordless Web3 authentication',

  openGraph: {
    title: 'Examples | w3pk',
    description: 'Real-world applications built with w3pk - passwordless Web3 authentication',
    url: 'https://w3pk.w3hc.org/examples',
    siteName: 'w3pk Playground',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'W3PK Examples',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Examples | w3pk',
    description: 'Real-world applications built with w3pk - passwordless Web3 authentication',
    images: ['/huangshan.png'],
    creator: '@julienbrg',
  },
}

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
