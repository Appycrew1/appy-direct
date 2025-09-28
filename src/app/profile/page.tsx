// src/app/profile/page.tsx
'use client'

import { useState, useEffect } from 'react'
// TEMPORARY: Use relative import instead of @/ path
import { useUser } from '../../context/UserContext'
import { supabase } from '../../lib/supabase'
import { Save, User, ArrowLeft } from 'lucide-react'

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useUser()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: ''
  })

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        company_name: profile.company_name || '',
        email: profile.email || ''
      })
    }
  }, [profile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          company_name: formData.company_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      await refreshProfile()
      setSuccess('Profile updated successfully!')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (error: any) {
      setError(error.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!user || !profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <a 
          href="/dashboard" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </a>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">
          Update your account information and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <User className="w-8 h-8 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed. Contact support if you need to update your email.
            </p>
          </div>

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            
            <a
              href="/dashboard"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Account Type:</span>
            <p className="font-medium text-gray-900 capitalize">{profile.role}</p>
          </div>
          <div>
            <span className="text-gray-500">Member Since:</span>
            <p className="font-medium text-gray-900">
              {new Date(profile.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Last Updated:</span>
            <p className="font-medium text-gray-900">
              {new Date(profile.updated_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Email Verified:</span>
            <p className="font-medium text-gray-900">
              {user.email_confirmed_at ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
