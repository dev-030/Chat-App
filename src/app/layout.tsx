import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'Chat App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext/>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
