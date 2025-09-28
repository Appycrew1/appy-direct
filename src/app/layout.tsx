// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { UserProvider } from '@/context/UserContext'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Appy Link - Connect with Moving Industry Suppliers',
  description: 'Find and connect with vetted suppliers for moving companies across the UK. Software, insurance, equipment, leads and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <footer className="bg-gray-800 text-white py-8">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p>&copy; 2024 Appy Link. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
