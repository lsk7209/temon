import { NextResponse } from "next/server";
import { ALL_TESTS } from "@/lib/tests-config";
import { getStaticRoutes } from "@/lib/sitemap-utils";
import { NOINDEX_TEST_IDS } from "@/lib/noindex-tests";

/**
 * Sitemap.xml 동적 생성 (Route Handler)
 *
 * 설계:
 * - Vercel serverless 런타임에서 `fs.readdir(app/tests)` 스캔은 신뢰할 수 없음
 *   (빌드 후 디렉토리 구조가 달라 try 블록이 throw → fallback 2 URL만 반환하던 버그 원인).
 * - 단일 소스: `ALL_TESTS` 배열만 사용. 정적 페이지는 getStaticRoutes에서 가져옴.
 * - test 실행/결과 페이지(`/tests/{id}/test`, `/tests/{id}/test/result`)는 sitemap에서 제외.
 *   인트로(`/tests/{id}`) 한 장만 색인되는 게 중복 회피 및 crawl budget 절감.
 *
 * Vercel ISR: 1시간마다 재생성.
 */
export const revalidate = 3600;

type RouteEntry = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

function buildSitemapXml(routes: RouteEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (r) => `  <url>
    <loc>${r.url}</loc>
    <lastmod>${r.lastModified.toISOString()}</lastmod>
    <changefreq>${r.changeFrequency}</changefreq>
    <priority>${r.priority}</priority>
    <mobile:mobile/>
  </url>`,
  )
  .join("\n")}
</urlset>`;
}

export async function GET() {
  const baseUrl = "https://temon.kr";
  const now = new Date();

  try {
    // 정적 라우트 (홈, /tests, /about, /contact, /privacy, /terms)
    const staticRoutes = getStaticRoutes(baseUrl).map<RouteEntry>((r) => ({
      url: r.path,
      lastModified: r.lastModified || now,
      changeFrequency: r.changeFrequency || "weekly",
      priority: r.priority ?? 0.5,
    }));

    // ALL_TESTS에서 테스트 ID 추출 → 인트로 페이지만 sitemap에 포함.
    // noindex 테스트(lib/noindex-tests.ts)는 검색엔진 혼선 방지를 위해 sitemap에서도 제외.
    const testIds = Array.from(
      new Set(
        ALL_TESTS.map((t) => {
          const m = t.href.match(/^\/tests\/([^/]+)/);
          return m?.[1] ?? null;
        }).filter((id): id is string => !!id && !NOINDEX_TEST_IDS.has(id)),
      ),
    );

    const testRoutes: RouteEntry[] = testIds.map((id) => ({
      url: `${baseUrl}/tests/${id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // 중복 URL 제거 (staticRoutes에 /tests가 이미 포함되므로)
    const merged = new Map<string, RouteEntry>();
    for (const r of [...staticRoutes, ...testRoutes]) {
      merged.set(r.url, r);
    }
    const allRoutes = Array.from(merged.values());

    return new NextResponse(buildSitemapXml(allRoutes), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    // 극히 예외적 상황에만 진입. fallback도 정적 routes까지는 노출.
    console.error("Sitemap generation error:", error);
    const fallback: RouteEntry[] = [
      {
        url: baseUrl,
        lastModified: now,
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/tests`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      },
    ];

    return new NextResponse(buildSitemapXml(fallback), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }
}
