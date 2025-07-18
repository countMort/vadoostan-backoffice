"use client"

import { Button, ButtonGroup } from "@mui/material"
import { ReactNode, Suspense } from "react"
import {
  experiences_active_route,
  experiences_past_route,
  experience_create_route,
} from "@/constants/route-names"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

const buttons = [
  { label: "خلق تجربه", path: experience_create_route },
  { label: "تجربه‌های فعال", path: experiences_active_route },
  { label: "تجربه‌های گذشته", path: experiences_past_route },
]

function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const fullPathname = queryString ? `${pathname}?${queryString}` : pathname

  return (
    <>
      <div className="mx-auto max-w-3xl mt-5 md:border-1 border-gray-400 rounded-sm mb-16">
        {children}
      </div>
      <footer className="fixed bottom-0 left-0 z-20 w-full h-16 bg-white border-t border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-600">
        <ButtonGroup className="flex items-stretch h-full w-full">
          {buttons.map((btn) => (
            <Button
              variant="text"
              className={`grow`}
              key={"btn-" + btn.label}
              href={btn.path}
              component={Link}
              disabled={fullPathname.includes(btn.path)}
            >
              {btn.label}
            </Button>
          ))}
        </ButtonGroup>
      </footer>
    </>
  )
}

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>{children}</Layout>
    </Suspense>
  )
}
