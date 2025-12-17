import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signatures | w3pk',
  description: 'Sign messages with different wallet modes using w3pk',

  openGraph: {
    title: 'Signatures | w3pk',
    description: 'Sign messages with different wallet modes using w3pk',
    siteName: 'w3pk',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'Sign messages with different wallet modes using w3pk',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Signatures | w3pk',
    description: 'Sign messages with different wallet modes using w3pk',
    images: ['/huangshan.png'],
    creator: '@julienbrg',
  },
}

export default function SigLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
