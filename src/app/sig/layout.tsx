import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signatures | w3pk',
  description: 'Sign messages with different wallet modes using w3pk',
}

export default function SigLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
