"use client"

import { experience_create_route } from "@/constants/route-names"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import Loading from "@/components/Global/Loading/Loading"
import { Button, Link } from "@mui/material"

declare global {
  interface Window {
    Telegram: any
  }
}

export default function Home() {
  const [, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { isInitializing } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    setMounted(true)
  }, [])

  // useEffect(() => {
  //   // Don't redirect until auth is initialized
  //   if (isInitializing) return

  //   const tg = window.Telegram?.WebApp
  //   if (tg) {
  //     tg.ready()

  //     tg.expand()
  //     setUser(tg.initDataUnsafe.user)
  //   }

  //   router.replace(experience_create_route)
  // }, [router, isInitializing])

  return (
    <div className="p-4 text-center h-[100vh] flex items-center justify-center flex-col">
      <div>اطلاعات تلگرامی: {mounted ? JSON.stringify(window?.Telegram?.WebApp) : 'در حال بارگذاری...'}</div>
      {isInitializing && <Loading />}
      <Button component={Link} href={experience_create_route}>
        تجربه ها
      </Button>
    </div>
  )
}
