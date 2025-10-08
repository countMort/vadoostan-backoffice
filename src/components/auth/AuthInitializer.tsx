"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store"
import { setToken, initializeAuth } from "@/app/auth/auth.slice"
import { authUtils } from "@/utils/auth"

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Initialize auth state from cookies on app start
    const token = authUtils.getStoredToken()
    if (token) {
      dispatch(setToken(token))
    }
    // Mark initialization as complete
    dispatch(initializeAuth())
  }, [dispatch])

  return null
}
