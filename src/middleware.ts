import { NextRequest, NextResponse } from 'next/server'
import { EnumTokens } from './services/auth-token.services'
import { ENDPOINTS } from './config/endpoints.config'

export async function middleware(request: NextRequest) {
  const { url, cookies } = request
  const path = request.nextUrl.pathname

  if (process.env.NODE_ENV !== 'production') {
    console.log('Skipping middleware in development mode', url)
		return NextResponse.next()
  }

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const isAuthenticated = !!refreshToken
  // const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  const isAuthPage =
		url.includes(ENDPOINTS.LOGIN) ||
		url.includes(ENDPOINTS.REGISTER) ||
		path.includes('/welcome')

  const isProtectedPage =
		path === '/' ||
		path.startsWith('/(auth)') ||
		path.includes(ENDPOINTS.PROFILE) ||
		path.includes(ENDPOINTS.SWIPE_USERS)

	const isChatPage = path.includes('/chats')

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isProtectedPage || isChatPage && !isAuthenticated) {
		return NextResponse.redirect(new URL('/welcome', request.url))
	}

  console.log(
    `${new Date().toLocaleTimeString()} | Refresh token ${refreshToken}`
  )
  if (!refreshToken) {
		return NextResponse.redirect(new URL(ENDPOINTS.LOGIN, url))
	}

  return NextResponse.next()
}

export const config = {
	matcher: [
		'/',
		'/(auth)/:path*',
		'/(chats)/:path*',
		'/chats',
		'/welcome',
		'/login',
		'/register',
	],
}