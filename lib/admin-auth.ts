/**
 * 관리자 인증 유틸리티.
 *
 * 서버측 검증은 두 경로를 모두 지원:
 *   1) httpOnly 쿠키 `admin_session` (권장, /api/admin/login에서 설정)
 *   2) `Authorization: Bearer <token>` 헤더 (레거시 — 관리자 API 클라이언트 호환용)
 *
 * 어떤 경로든 값은 process.env.ADMIN_TOKEN과 상수시간 비교.
 */

import { headers, cookies } from "next/headers";

const ADMIN_COOKIE = "admin_session";

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * 서버 사이드 관리자 토큰 검증 (쿠키 우선, 헤더 폴백)
 */
export async function verifyAdminToken(): Promise<boolean> {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) return false;

  // 1) httpOnly 쿠키 확인
  try {
    const jar = await cookies();
    const session = jar.get(ADMIN_COOKIE)?.value;
    if (session && safeEqual(session, adminToken)) return true;
  } catch {
    // cookies() 사용 불가 컨텍스트 — 헤더 확인으로 폴백
  }

  // 2) Authorization Bearer 헤더 확인 (레거시 클라이언트 호환)
  try {
    const headersList = await headers();
    const authHeader = headersList.get("Authorization");
    const token = authHeader?.replace("Bearer ", "") || "";
    if (token && safeEqual(token, adminToken)) return true;
  } catch {
    // noop
  }

  return false;
}

/**
 * 클라이언트 사이드 토큰 유틸리티 — 더 이상 localStorage에 토큰을 저장하지 않음.
 * 토큰은 서버가 httpOnly 쿠키로 관리하므로 JS에서 접근 불가(= XSS 내성 상승).
 * 본 함수들은 기존 호출부 호환성을 위해 유지하되 no-op 처리.
 *
 * @deprecated httpOnly 쿠키 인증으로 전환됨. localStorage 토큰 저장은 더 이상 사용되지 않음.
 */
export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

/**
 * @deprecated httpOnly 쿠키 인증으로 전환됨. 호출해도 효력 없음.
 */
export function setAdminToken(_token: string): void {
  // no-op — 서버가 쿠키로 설정
}
