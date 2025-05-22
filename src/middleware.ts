import { NextRequest, NextResponse } from 'next/server'
import { ENDPOINTS } from './config/endpoints.config'
import { EnumTokens } from './services/auth-token.services'

export async function middleware(request: NextRequest) {
	const { url, cookies } = request

	// if (process.env.NODE_ENV !== 'production') {
	// 	console.log('Skipping middleware in development mode', url)
	// 	return NextResponse.next()
	// }

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage =
		url.includes(ENDPOINTS.LOGIN) || url.includes(ENDPOINTS.REGISTER)

	const isWelcomePage = url.includes(ENDPOINTS.WELCOME)

	if (isAuthPage) {
		if (refreshToken) return NextResponse.redirect(new URL(ENDPOINTS.HOME, url))

		return NextResponse.next()
	}

	if (isWelcomePage) {
		if (refreshToken) return NextResponse.redirect(new URL(ENDPOINTS.HOME, url))

		return NextResponse.next()
	}

	console.log(url)
	console.log(
		`${new Date().toLocaleTimeString()} | Refresh token ${refreshToken}`
	)
	if (!refreshToken) {
		return NextResponse.redirect(new URL(ENDPOINTS.WELCOME, url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/login',
		'/register',
		'/',
		'/welcome',
		'/projects',
		'/swipes',
		'/chats',
		'/security',
	],
}
