// src/app/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server'
// TEMPORARY: Use relative import instead of @/ path
import { createClient } from '../../../lib/supabase'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createClient()
    
    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error && data.user) {
        // Successful verification - redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url))
      } else {
        console.error('Auth callback error:', error)
      }
    } catch (error) {
      console.error('Auth callback exception:', error)
    }
  }

  // If there's an error, redirect to login with error message
  return NextResponse.redirect(new URL('/auth/login?error=verification_failed', request.url))
}
