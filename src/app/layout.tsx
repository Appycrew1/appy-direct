// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { UserProvider } from '@/context/UserContext'

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
            <header className="bg-white shadow-sm border-b">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <a href="/" className="text-2xl font-bold text-primary-600">
                      Appy Link
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href="/suppliers" className="text-gray-700 hover:text-primary-600">
                      Suppliers
                    </a>
                    <a href="/contact" className="text-gray-700 hover:text-primary-600">
                      Contact
                    </a>
                    <AuthButtons />
                  </div>
                </div>
              </nav>
            </header>
            
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

// Auth buttons component
'use client'
import { useUser } from '@/context/UserContext'
import Link from 'next/link'
import { User, LogOut } from 'lucide-react'
import { useState } from 'react'

function AuthButtons() {
  const { user, profile, signOut, loading } = useUser()
  const [showMenu, setShowMenu] = useState(false)

  if (loading) {
    return <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
  }

  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
        >
          <User className="w-5 h-5" />
          <span>{profile?.full_name || 'Account'}</span>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMenu(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMenu(false)}
            >
              Profile
            </Link>
            <hr className="my-1" />
            <button
              onClick={async () => {
                await signOut()
                setShowMenu(false)
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/auth/login"
        className="text-gray-700 hover:text-primary-600 transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/auth/signup"
        className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
      >
        Sign Up
      </Link>
    </div>
  )
}
