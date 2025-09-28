// src/app/auth/callback/route.ts
import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createClient()
    
    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Redirect to dashboard after successful verification
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // If there's an error, redirect to login with error message
  return NextResponse.redirect(new URL('/auth/login?error=verification_failed', request.url))
}
