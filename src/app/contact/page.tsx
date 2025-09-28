'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: 'General Inquiry',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            subject: formData.subject,
            message: `Company: ${formData.company}\n\n${formData.message}`,
          }
        ])

      if (submitError) {
        throw submitError
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitted) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="rounded-full bg-green-100 p-6 mx-auto w-20 h-20 flex items-center justify-center mb-6">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your message. We will get back to you within 24 hours.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Get in touch with our team. We would love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form and Info */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Smith"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your Removal Company"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>General Inquiry</option>
                  <option>List My Company</option>
                  <option>Partnership Opportunities</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Contact Information - Same as before */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
            <p className="text-gray-600 mb-8">
              We are here to help you find the best suppliers for your moving business. 
              Reach out to us through any of the channels below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">Send us an email and we will get back to you within 24 hours.</p>
                  <a href="mailto:hello@appylink.co.uk" className="text-blue-600 hover:text-blue-500 font-medium">
                    hello@appylink.co.uk
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">Call us during business hours for immediate assistance.</p>
                  <a href="tel:+442012345678" className="text-blue-600 hover:text-blue-500 font-medium">
                    +44 20 1234 5678
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Monday - Friday, 9am - 5pm GMT</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Office</h3>
                  <p className="text-gray-600">Visit us at our London office.</p>
                  <p className="text-gray-900 font-medium">
                    123 Business Street<br />
                    London, UK SW1A 1AA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
