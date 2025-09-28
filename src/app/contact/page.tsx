import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
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
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Smith"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
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
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your Removal Company"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
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
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                className="flex items-center justify-center w-full rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Contact Information */}
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

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">How do I list my company?</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Contact us through this form or email us directly. We will review your application and get back to you within 2 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Is there a cost to be listed?</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Basic listings are free. We also offer premium listing options with additional features and visibility.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">How are suppliers vetted?</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    All suppliers go through our verification process including business registration checks, reference verification, and quality standards review.
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
