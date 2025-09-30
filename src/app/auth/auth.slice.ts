import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState, LoginResponse } from "@/types/api"
import { authUtils } from "@/utils/auth"

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
      
      // Store tokens in localStorage
      authUtils.storeToken(action.payload.token)
      authUtils.storeRefreshToken(action.payload.refreshToken)
    },
    loginFailure: (state) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.token = null
      state.refreshToken = null
      state.user = null
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.refreshToken = null
      state.user = null
      state.isLoading = false
      
      // Clear tokens from localStorage
      authUtils.clearStoredTokens()
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
    },
    clearAuth: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.refreshToken = null
      state.user = null
      state.isLoading = false
      
      // Clear tokens from localStorage
      authUtils.clearStoredTokens()
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setToken,
  clearAuth,
} = authSlice.actions

export default authSlice.reducer
