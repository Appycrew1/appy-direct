// src/app/dashboard/page.tsx
'use client'

import { useUser } from '@/context/UserContext'
import { User, Building, Mail, Calendar } from 'lucide-react'

export default function DashboardPage() {
  const { user, profile, loading } = useUser()

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md h-48"></div>
            <div className="bg-white p-6 rounded-lg shadow-md h-48"></div>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your suppliers and grow your moving business
        </p>
      </div>

      {/* Account Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-gray-900">{profile?.full_name || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Building className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Company</p>
                <p className="text-gray-900">{profile?.company_name || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Member Since</p>
                <p className="text-gray-900">
                  {profile?.created_at ? formatDate(profile.created_at) : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <a 
            href="/profile" 
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Edit Profile
          </a>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Suppliers</h3>
          <p className="text-gray-600 text-sm mb-4">
            Find new suppliers for your moving business
          </p>
          <a 
            href="/suppliers" 
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Browse Now →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
          <p className="text-gray-600 text-sm mb-4">
            Get help with your account or platform
          </p>
          <a 
            href="/contact" 
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Contact Us →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-600 text-sm mb-4">
            Favorites, quotes, and more features are coming
          </p>
          <span className="text-gray-400 text-sm">
            Stay tuned!
          </span>
        </div>
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Info (Dev Only)</h3>
          <pre className="text-xs text-gray-600 overflow-auto">
            {JSON.stringify({ 
              user: user ? { id: user.id, email: user.email } : null,
              profile: profile 
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
