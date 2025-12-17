import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transactions | w3pk',
  description: 'Mint W3PK Alpha Tester NFT using w3pk',
}

export default function TxLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
