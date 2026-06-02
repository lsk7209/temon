"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
  "ca-pub-3050601904412736"
const ADSENSE_SCRIPT_ID = "adsense-loader"
const ADSENSE_DELAY_MS = 8000
const ADSENSE_IDLE_TIMEOUT_MS = 2500
const ADSENSE_INTERACTION_EVENTS = [
  "pointerdown",
  "touchstart",
  "wheel",
  "keydown",
] as const
const ADSENSE_EXCLUDED_PATH_PREFIXES = [
  "/admin",
  "/dashboard",
] as const
type IdleCallbackApi = {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number
  cancelIdleCallback?: (handle: number) => void
}

function isAdSenseExcludedPath(pathname: string | null) {
  if (!pathname) return false
  if (ADSENSE_EXCLUDED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return true
  }

  return /\/tests\/[^/]+\/test(?:\/|$)/.test(pathname)
}

export default function AdSenseScript() {
  const pathname = usePathname()

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID) return

    if (isAdSenseExcludedPath(pathname)) return
    if (document.getElementById(ADSENSE_SCRIPT_ID)) return

    const appendScript = () => {
      if (document.getElementById(ADSENSE_SCRIPT_ID)) return

      const script = document.createElement("script")
      script.id = ADSENSE_SCRIPT_ID
      script.async = true
      script.crossOrigin = "anonymous"
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`
      document.head.appendChild(script)
    }
    let idleId: number | null = null
    const scheduleScript = () => {
      const idleWindow = window as Window & IdleCallbackApi

      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(appendScript, {
          timeout: ADSENSE_IDLE_TIMEOUT_MS,
        })
        return
      }

      appendScript()
    }

    ADSENSE_INTERACTION_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, appendScript, {
        once: true,
        passive: true,
      })
    })

    const timeoutId = globalThis.setTimeout(
      scheduleScript,
      ADSENSE_DELAY_MS,
    )
    return () => {
      globalThis.clearTimeout(timeoutId)
      const idleWindow = window as Window & IdleCallbackApi
      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId)
      }
      ADSENSE_INTERACTION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, appendScript)
      })
    }
  }, [pathname])

  return null
}
