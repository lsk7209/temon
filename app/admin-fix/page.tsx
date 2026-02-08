'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminFixPage() {
    const router = useRouter()

    useEffect(() => {
        // Set a dummy admin token to bypass client-side check
        // The real security relies on server-side env vars (which user just set)
        localStorage.setItem('admin_token', 'temon-admin-recovery-token')

        // Add a small delay to ensure localStorage is updated
        setTimeout(() => {
            alert('✅ 관리자 권한이 복구되었습니다.\n확인을 누르면 대시보드로 이동합니다.')
            router.push('/dashboard')
        }, 500)
    }, [router])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="text-center max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2 text-gray-900">관리자 권한 복구 중...</h1>
                <p className="text-gray-600 mb-6">잠시만 기다려주세요.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                    자동으로 이동하지 않으면 <a href="/dashboard" className="text-blue-500 underline">여기</a>를 클릭하세요.
                </p>
            </div>
        </div>
    )
}
