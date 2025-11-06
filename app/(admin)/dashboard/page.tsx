/**
 * Analytics 대시보드 페이지
 * 관리자 전용
 */

import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import DashboardClient from './dashboard-client'
import { verifyAdminToken } from '@/lib/admin-auth'

export const metadata = {
  title: 'Analytics 대시보드 | 테몬',
  description: '테몬 Analytics 관리자 대시보드',
}

async function getReports(startDate?: number, endDate?: number) {
  const token = process.env.ADMIN_TOKEN
  if (!token) {
    return null
  }

  // Cloudflare Functions 또는 Next.js API 라우트 사용
  const apiUrl = process.env.CLOUDFLARE_FUNCTIONS_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const url = new URL('/api/reports', apiUrl)
  if (startDate) url.searchParams.set('startDate', startDate.toString())
  if (endDate) url.searchParams.set('endDate', endDate.toString())

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    console.error('Failed to fetch reports:', error)
    return null
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { startDate?: string; endDate?: string; quizId?: string }
}) {
  // 관리자 토큰 검증 (서버 사이드)
  const isAuthorized = await verifyAdminToken()
  if (!isAuthorized) {
    redirect('/admin')
  }

  const startDate = searchParams.startDate ? parseInt(searchParams.startDate) : undefined
  const endDate = searchParams.endDate ? parseInt(searchParams.endDate) : undefined

  const reports = await getReports(startDate, endDate)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<div>Loading...</div>}>
        {/* 임시로 간단한 컴포넌트 렌더링 */}
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold">Analytics 대시보드</h1>
          <p className="text-muted-foreground mt-2">데이터 로딩 중...</p>
        </div>
        {/* <DashboardClient initialData={reports} /> */}
      </Suspense>
    </div>
  )
}

