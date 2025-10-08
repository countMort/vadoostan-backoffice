"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { login_route } from "@/constants/route-names"
import Loading from "../Global/Loading/Loading"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isInitializing } = useSelector(
    (state: RootState) => state.auth
  )

  // Show loading while initializing or during auth operations
  if (isInitializing || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect(login_route)
  }

  return <>{children}</>
}
