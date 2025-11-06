/**
 * Analytics 대시보드 페이지
 * 관리자 전용
 */

import DashboardClient from './dashboard-client'

export const metadata = {
  title: 'Analytics 대시보드 | 테몬',
  description: '테몬 Analytics 관리자 대시보드',
}

// output: 'export'를 위한 정적 페이지
// 인증은 클라이언트 사이드에서 처리
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardClient initialData={null} />
    </div>
  )
}

