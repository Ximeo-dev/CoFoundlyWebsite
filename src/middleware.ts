import { NextRequest, NextResponse } from 'next/server'
import { EnumTokens } from './services/auth-token.services'
import { ENDPOINTS } from './config/endpoints.config'

export async function middleware(request: NextRequest) {
  const { url, cookies } = request

  if (process.env.NODE_ENV !== 'production') {
    console.log('Skipping middleware in development mode', url)
		return NextResponse.next()
  }

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  // const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

  const isAuthPage = 
    url.includes(ENDPOINTS.LOGIN) || url.includes(ENDPOINTS.REGISTER)
  const isSwipePage = url.includes(ENDPOINTS.SWIPE_USERS)

  if (isAuthPage) {
    if (refreshToken)
			return NextResponse.redirect(new URL(ENDPOINTS.PROFILE, url))

    return NextResponse.next()
  }

  if (isSwipePage) {
		if (!refreshToken) {
			return NextResponse.redirect(new URL(ENDPOINTS.LOGIN, url))
		}
		return NextResponse.next()
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
	matcher: ['/login', '/register', '/profile', '/swipes'],
}