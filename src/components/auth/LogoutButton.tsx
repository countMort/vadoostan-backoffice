"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "@/store"
import { logout } from "@/app/auth/auth.slice"
import { useLogoutMutation } from "@/api/auth"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"
import { login_route } from "@/constants/route-names"

interface LogoutButtonProps {
  variant?: "text" | "outlined" | "contained"
  size?: "small" | "medium" | "large"
  className?: string
}

export default function LogoutButton({
  variant = "outlined",
  size = "medium",
  className,
}: LogoutButtonProps) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [logoutMutation] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      dispatch(logout())
      router.push(login_route)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
      color="error"
    >
      خروج
    </Button>
  )
}
