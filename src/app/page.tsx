"use client"

import { experience_create_route } from "@/constants/route-names"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    Telegram: any
  }
}

export default function Home() {
  const [, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.ready()

      tg.expand()
      setUser(tg.initDataUnsafe.user)
    }

    router.replace(experience_create_route)
  }, [router])

  return (
    <div className="p-4 text-center h-[100vh] flex items-center justify-center flex-col"></div>
  )
}
