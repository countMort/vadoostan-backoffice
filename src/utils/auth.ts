import { store } from "@/store"
import { setToken, clearAuth } from "@/app/auth/auth.slice"

export const authUtils = {
  // Get token from localStorage
  getStoredToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  },

  // Get refresh token from localStorage
  getStoredRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refresh_token")
    }
    return null
  },

  // Store token in localStorage
  storeToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  },

  // Store refresh token in localStorage
  storeRefreshToken: (refreshToken: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("refresh_token", refreshToken)
    }
  },

  // Remove tokens from localStorage
  clearStoredTokens: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("refresh_token")
    }
  },

  // Initialize auth state from localStorage
  initializeAuth: (): void => {
    const token = authUtils.getStoredToken()
    if (token) {
      store.dispatch(setToken(token))
    }
  },

  // Clear auth state and stored tokens
  clearAuth: (): void => {
    authUtils.clearStoredTokens()
    store.dispatch(clearAuth())
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const state = store.getState()
    return state.auth.isAuthenticated
  },

  // Get current user from store
  getCurrentUser: () => {
    const state = store.getState()
    return state.auth.user
  },
}
