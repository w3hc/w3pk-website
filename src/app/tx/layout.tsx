import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transactions | w3pk',
  description: 'Mint W3PK Alpha Tester NFT using w3pk',

  openGraph: {
    title: 'Transactions | w3pk',
    description: 'Mint W3PK Alpha Tester NFT using w3pk',
    siteName: 'w3pk',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'Mint W3PK Alpha Tester NFT using w3pk',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Transactions | w3pk',
    description: 'Mint W3PK Alpha Tester NFT using w3pk',
    images: ['/huangshan.png'],
    creator: '@julienbrg',
  },
}

export default function TxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
