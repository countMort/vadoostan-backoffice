"use client"

import { Button, ButtonGroup } from "@mui/material"
import { ReactNode } from "react"
import {
  experience_create_route,
  experiences_route,
} from "@/constants/route-names"
import Link from "next/link"
import { usePathname } from "next/navigation"

const buttons = [
  { label: "خلق تجربه", path: experience_create_route },
  { label: "تجربه‌ها", path: experiences_route },
]

function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <div className="mx-auto max-w-3xl my-10 rounded-sm mb-16">{children}</div>
      <footer className="fixed bottom-0 left-0 z-20 w-full h-16 bg-white border-t border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-600">
        <ButtonGroup className="flex items-stretch h-full w-full">
          {buttons.map((btn) => (
            <Button
              variant="text"
              className={`grow`}
              key={"btn-" + btn.label}
              href={btn.path}
              component={Link}
              disabled={pathname === btn.path}
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
  return <Layout>{children}</Layout>
}
