"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
const ADSENSE_SCRIPT_ID = "adsense-loader"

export default function AdSenseScript() {
  const pathname = usePathname()

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID) return

    const isAdminPage =
      pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")
    if (isAdminPage) return
    if (document.getElementById(ADSENSE_SCRIPT_ID)) return

    const script = document.createElement("script")
    script.id = ADSENSE_SCRIPT_ID
    script.async = true
    script.crossOrigin = "anonymous"
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`
    document.head.appendChild(script)
  }, [pathname])

  return null
}
