import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { ClerkProvider } from '@clerk/nextjs'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CarrinhoProvider } from '@/context/CarrinhoProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="pt">
        <body className={inter.className}>
          <CarrinhoProvider>
            <Navbar />
            {children}
            <Footer />
          </CarrinhoProvider>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  )
}
