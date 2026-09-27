"use client"

import { useState, useEffect } from "react"
import AdminAuth from "@/components/admin-auth"
import EnhancedAdminDashboard from "@/components/enhanced-admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // 로그인은 httpOnly 쿠키로 관리되어 JS에서 직접 읽을 수 없으므로,
    // 이미 로그인돼 있는지는 서버에 물어봐서 확인한다.
    let cancelled = false

    fetch("/api/admin/login", { method: "GET", credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then((data: { authenticated?: boolean }) => {
        if (!cancelled) setIsAuthenticated(Boolean(data.authenticated))
      })
      .catch(() => {
        if (!cancelled) setIsAuthenticated(false)
      })
      .finally(() => {
        if (!cancelled) setIsChecking(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (isChecking) {
    return null
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="container mx-auto py-6">
      <EnhancedAdminDashboard />
    </div>
  )
}
