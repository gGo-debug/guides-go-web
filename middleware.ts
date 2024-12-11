import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Check if we're in a GitHub Codespaces environment
  const isGitHubCodespaces = request.headers.get('x-forwarded-host')?.includes('.app.github.dev')

  if (isGitHubCodespaces) {
    // If we're in GitHub Codespaces, set the correct origin
    const newHeaders = new Headers(request.headers)
    newHeaders.set('origin', `https://${request.headers.get('x-forwarded-host')}`)
    
    // Create a new request with the updated headers
    const newRequest = new NextRequest(request.nextUrl, {
      headers: newHeaders,
      method: request.method,
      body: request.body,
      cache: request.cache,
      credentials: request.credentials,
      integrity: request.integrity,
      keepalive: request.keepalive,
      mode: request.mode,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      signal: request.signal,
    })

    // Pass the new request to updateSession
    return await updateSession(newRequest)
  }

  // For non-GitHub Codespaces environments, proceed as normal
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

