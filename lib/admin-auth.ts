/**
 * 관리자 인증 유틸리티
 */

import { headers } from 'next/headers'

/**
 * 서버 사이드 관리자 토큰 검증
 */
export async function verifyAdminToken(): Promise<boolean> {
  const headersList = await headers()
  const authHeader = headersList.get('Authorization')
  const token = authHeader?.replace('Bearer ', '') || ''

  const adminToken = process.env.ADMIN_TOKEN
  if (!adminToken) {
    return false
  }

  return token === adminToken
}

/**
 * 클라이언트 사이드 관리자 토큰 가져오기
 */
export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}

/**
 * 클라이언트 사이드 관리자 토큰 설정
 */
export function setAdminToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('admin_token', token)
}

