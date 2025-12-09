import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docs | w3pk',
  description:
    'Complete technical documentation for W3PK, the passwordless Web3 authentication SDK',

  openGraph: {
    title: 'Docs | w3pk',
    description:
      'Complete technical documentation for W3PK, the passwordless Web3 authentication SDK',
    url: 'https://w3pk.w3hc.org/docs',
    siteName: 'w3pk Playground',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'W3PK Documentation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Docs | w3pk',
    description:
      'Complete technical documentation for W3PK, the passwordless Web3 authentication SDK',
    images: ['/huangshan.png'],
    creator: '@julienbrg',
  },
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
