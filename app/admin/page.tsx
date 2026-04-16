"use client"

import { useState, useEffect } from "react"
import AdminAuth from "@/components/admin-auth"
import EnhancedAdminDashboard from "@/components/enhanced-admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="container mx-auto py-6">
      <EnhancedAdminDashboard />
    </div>
  )
}
