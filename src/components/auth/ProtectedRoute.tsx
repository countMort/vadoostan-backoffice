"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  )
  const router = useRouter()

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push("/login")
  //   }
  // }, [isAuthenticated, isLoading, router])

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
  //         <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!isAuthenticated) {
  //   return null
  // }

  return <>{children}</>
}
