"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageVisit } from "@/lib/analytics"

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    // 페이지 방문 추적
    trackPageVisit(pathname)
  }, [pathname])

  return <>{children}</>
}
