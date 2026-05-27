import { NextRequest, NextResponse } from "next/server";
import {
  getDefaultIndexNowUrls,
  INDEXNOW_ENDPOINTS,
  submitUrlsToIndexNow,
} from "@/lib/indexnow";

/**
 * IndexNow 자동 제출 엔드포인트.
 *
 * - Bing, Naver, Yandex에 URL 업데이트를 한 번에 알림 (2025년 IndexNow 통합 프로토콜)
 * - 보안: CRON_SECRET(또는 ADMIN_TOKEN) 헤더 필요
 * - 사용 예:
 *     POST /api/indexnow/submit
 *     Authorization: Bearer <CRON_SECRET>
 *     { "urls": ["https://temon.kr/tests/new-test", ...] }
 *   urls 생략 시 기본 제출 목록(sitemap 핵심 URL) 사용.
 *
 * 환경변수:
 *   INDEXNOW_KEY         — public/{KEY}.txt 파일명과 동일해야 함
 *   CRON_SECRET          — 인증용 (Vercel Cron 연동 가능)
 *   NEXT_PUBLIC_APP_URL  — 사이트 호스트
 */

export async function POST(request: NextRequest) {
  // 간이 인증 (CRON_SECRET or ADMIN_TOKEN)
  const auth = request.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET || process.env.ADMIN_TOKEN || "";
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const host = (process.env.NEXT_PUBLIC_APP_URL || "https://temon.kr").replace(
    /\/$/,
    "",
  );

  let urlList: string[];
  try {
    const body = (await request.json().catch(() => ({}))) as {
      urls?: unknown;
    };
    const candidate = body?.urls;
    urlList =
      Array.isArray(candidate) && candidate.length > 0
        ? (candidate as string[])
        : getDefaultIndexNowUrls(host);
  } catch {
    urlList = getDefaultIndexNowUrls(host);
  }

  // 상대 경로를 절대 URL로 정규화
  const urlsToSubmit = urlList.map((u) =>
    u.startsWith("http") ? u : `${host}${u.startsWith("/") ? "" : "/"}${u}`,
  );

  if (urlsToSubmit.length === 0) {
    return NextResponse.json({ error: "no urls" }, { status: 400 });
  }

  const result = await submitUrlsToIndexNow(urlsToSubmit);
  return NextResponse.json(result, { status: result.success ? 200 : 502 });
}

export async function GET() {
  return NextResponse.json({
    hint: "POST with { urls: string[] } and Authorization: Bearer <CRON_SECRET>",
    default_urls: getDefaultIndexNowUrls(),
    endpoints: INDEXNOW_ENDPOINTS,
  });
}
