import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/**
 * 동적 robots.txt 생성 (Next.js 13+ App Router)
 *
 * 검색 엔진별 최적화 설정:
 * - Google: 최대 속도 크롤링 (Crawl-delay: 0)
 * - Naver (Yeti): 안정적 크롤링 (Crawl-delay: 1)
 * - Daum (Daumoa): 안정적 크롤링
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  // Result pages carry noindex in app/results/layout.tsx and must be crawlable
  // for search bots to read that directive. The image route is public only.
  const publicImagePath = "/api/og";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", publicImagePath],
        disallow: ["/api/", "/admin"],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: ["/", publicImagePath],
        disallow: ["/api/", "/admin"],
        crawlDelay: 0, // Google은 최대 속도 크롤링
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", publicImagePath],
        disallow: ["/api/", "/admin"],
      },
      {
        userAgent: "Googlebot-Mobile",
        allow: ["/", publicImagePath],
        disallow: ["/api/", "/admin"],
      },
      {
        userAgent: "Yeti",
        allow: ["/", publicImagePath],
        disallow: ["/api/", "/admin"],
        crawlDelay: 1, // 네이버는 안정적 크롤링
      },
      {
        userAgent: "Yeti-Mobile",
        allow: ["/", publicImagePath],
        disallow: ["/api/", "/admin"],
        crawlDelay: 1,
      },
      {
        userAgent: "Daumoa",
        allow: ["/", publicImagePath],
        disallow: ["/api/", "/admin"],
        crawlDelay: 1,
      },
      // AI 검색 엔진 크롤러 명시 허용 (GEO 최적화)
      ...[
        "GPTBot",
        "OAI-SearchBot",
        "PerplexityBot",
        "ClaudeBot",
        "anthropic-ai",
        "Google-Extended",
      ].map((userAgent) => ({
        userAgent,
        allow: ["/", publicImagePath],
        disallow: ["/api/", "/admin"],
      })),
      // 스팸 크롤러 차단
      { userAgent: "Bytespider", disallow: ["/"] },
      { userAgent: "AhrefsBot", disallow: ["/api/"] },
    ],
    sitemap: [`${baseUrl}/sitemap-index.xml`, `${baseUrl}/sitemap.xml`],
  };
}
