import { DOMAIN, SAME_SITE } from '@/constants/api.constants'
import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

export const saveAccessTokenToStorage = (accessToken: string) => {
  if (process.env.NODE_ENV === 'production') {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
      domain: DOMAIN,
      sameSite: SAME_SITE,
      expires: 0.125
    })
  } else {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
      domain: 'localhost',
      sameSite: SAME_SITE,
      expires: 0.125
    })
  }
}

export const removeAccessTokenFromStorage = () => {
  if (process.env.NODE_ENV === 'production') {
    Cookies.remove(EnumTokens.ACCESS_TOKEN, {
      domain: DOMAIN
    })
  } else {
    Cookies.remove(EnumTokens.ACCESS_TOKEN, {
      domain: 'localhost'
    })
  }
}