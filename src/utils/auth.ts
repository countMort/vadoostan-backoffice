import { api_keys } from "@/constants/api"
import { cookieUtils } from "./cookies.util"

export const authUtils = {
  // Get token from cookies
  getStoredToken: (): string | null => {
    return cookieUtils.getCookie(api_keys.token)
  },

  // Get refresh token from cookies
  getStoredRefreshToken: (): string | null => {
    return cookieUtils.getCookie(api_keys.refreshToken)
  },

  // Store token in cookies
  storeToken: (token: string): void => {
    cookieUtils.setCookie(api_keys.token, token, 7) // 7 days expiration
  },

  // Store refresh token in cookies
  storeRefreshToken: (refreshToken: string): void => {
    cookieUtils.setCookie(api_keys.refreshToken, refreshToken, 30) // 30 days expiration
  },

  // Remove tokens from cookies
  clearStoredTokens: (): void => {
    cookieUtils.removeCookie(api_keys.token)
    cookieUtils.removeCookie(api_keys.refreshToken)
  },
}
