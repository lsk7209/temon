import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * 관리자 로그인 — 서버 측 비밀번호 검증 + httpOnly 쿠키 발급.
 *
 * 이전: 클라이언트(components/admin-auth.tsx)에서 "1234"를 하드코딩 비교하고
 * ADMIN_TOKEN 역시 클라이언트 번들에 폴백 문자열이 노출되어 있었음.
 * 누구나 개발자도구로 토큰을 읽어 어드민 API를 탈취할 수 있던 상태.
 *
 * 현재: 서버에서 env ADMIN_PASSWORD(or ADMIN_TOKEN)만 비교, 성공 시
 * httpOnly/secure/sameSite 쿠키로 토큰 설정. 클라이언트는 토큰을 읽을 수 없음.
 *
 * 필요한 env:
 *   ADMIN_PASSWORD — 관리자 로그인 비밀번호 (없으면 ADMIN_TOKEN을 비밀번호로도 사용 가능 — 단, 권장 X)
 *   ADMIN_TOKEN    — 세션 토큰 (쿠키 값 + 이후 verifyAdminToken()에서 비교)
 */

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE_SEC = 60 * 60 * 8; // 8시간

export async function POST(request: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  const adminPassword = process.env.ADMIN_PASSWORD || adminToken;

  if (!adminPassword || !adminToken) {
    return NextResponse.json(
      { error: "Admin login is not configured on the server." },
      { status: 500 },
    );
  }

  let password: string | undefined;
  try {
    const body = (await request.json()) as { password?: unknown };
    if (typeof body?.password === "string") password = body.password;
  } catch {
    // noop
  }

  if (!password) {
    return NextResponse.json({ error: "Missing password" }, { status: 400 });
  }

  // 타이밍 공격 방지용 상수 시간 비교(간이)
  if (password.length !== adminPassword.length) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let mismatch = 0;
  for (let i = 0; i < password.length; i++) {
    mismatch |= password.charCodeAt(i) ^ adminPassword.charCodeAt(i);
  }
  if (mismatch !== 0) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SEC,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  return NextResponse.json({ success: true });
}
