"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { trackAdminLogin, trackError } from "@/lib/analytics"

interface AdminAuthProps {
  onAuthenticated: () => void
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // 간단한 비밀번호 확인
      if (password === "1234") {
        // ADMIN_TOKEN을 localStorage에 저장
        // wrangler.toml에 설정된 값과 동일해야 함
        // 프로덕션에서는 Cloudflare Pages Environment Variables에서 가져옴
        const adminToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN ||
          "02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322"
        localStorage.setItem('admin_token', adminToken)

        trackAdminLogin()
        onAuthenticated()
      } else {
        setError("비밀번호가 올바르지 않습니다.")
        trackError("invalid_password", "admin_auth")
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.")
      trackError("login_error", "admin_auth")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">관리자 로그인</CardTitle>
          <CardDescription className="text-center">관리자 대시보드에 접근하려면 비밀번호를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "확인 중..." : "로그인"}
            </Button>
          </form>
          <div className="text-center">
            <p className="text-xs text-gray-500">힌트: 비밀번호는 1234입니다</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
