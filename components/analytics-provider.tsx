"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import {
  trackCTAClick,
  trackContentReadComplete,
  trackPageVisit,
} from "@/lib/analytics"

const READ_COMPLETE_SCROLL_PERCENT = 80
const TEST_START_LABEL_PATTERN = /\uD14C\uC2A4\uD2B8\s*\uC2DC\uC791/
const TEST_PATH_PATTERN = /\/test(?:\/|$)/

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const pagePath = queryString ? `${pathname}?${queryString}` : pathname

  useEffect(() => {
    trackPageVisit(pagePath)
  }, [pagePath])

  useEffect(() => {
    let hasTracked = false

    const trackIfReadComplete = () => {
      if (hasTracked) return

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollDepth =
        scrollableHeight <= 0
          ? 100
          : Math.round((window.scrollY / scrollableHeight) * 100)

      if (scrollDepth < READ_COMPLETE_SCROLL_PERCENT) return

      hasTracked = true
      trackContentReadComplete(pagePath, Math.min(scrollDepth, 100))
    }

    const timer = window.setTimeout(trackIfReadComplete, 1200)

    window.addEventListener("scroll", trackIfReadComplete, { passive: true })
    window.addEventListener("resize", trackIfReadComplete)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("scroll", trackIfReadComplete)
      window.removeEventListener("resize", trackIfReadComplete)
    }
  }, [pagePath])

  useEffect(() => {
    const trackCtaClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof HTMLElement)) return

      const clickable = target.closest("a, button")
      if (!(clickable instanceof HTMLElement)) return

      const label = clickable.textContent?.trim() || "unknown"
      const href =
        clickable instanceof HTMLAnchorElement
          ? clickable.getAttribute("href") || ""
          : ""

      if (
        !TEST_START_LABEL_PATTERN.test(label) &&
        !TEST_PATH_PATTERN.test(href)
      ) {
        return
      }

      trackCTAClick("test_start", pagePath)
    }

    document.addEventListener("click", trackCtaClick)

    return () => {
      document.removeEventListener("click", trackCtaClick)
    }
  }, [pagePath])

  return <>{children}</>
}
