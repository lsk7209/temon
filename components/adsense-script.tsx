/**
 * AdSense 스크립트 컴포넌트
 * 관리자 페이지에서는 로드하지 않음
 */

"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdSenseScript() {
  const pathname = usePathname()
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // 관리자 페이지 경로 체크
    const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")
    setShouldLoad(!isAdminPage)
  }, [pathname])

  if (!shouldLoad) {
    return null
  }

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050601904412736"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

