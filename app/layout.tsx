import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import AnalyticsProvider from "@/components/analytics-provider"
import Script from "next/script"
import { Suspense } from "react"
import AdminHeadScripts from "@/components/admin-head-scripts"
import AdSenseScript from "@/components/adsense-script"
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo-utils"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { JsonLd } from "@/components/json-ld"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MBTI 테스트 - 무료 성격 테스트 모음 | 테몬",
  description: "MBTI 테스트로 알아보는 나만의 성격 유형! 커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 재미있는 MBTI 테스트를 무료로 시작해보세요.",
  keywords: "MBTI, 성격테스트, MBTI 테스트, 커피MBTI, 라면MBTI, 반려동물MBTI, 공부MBTI, 알람습관, NTRP테스트, 무료 테스트",
  metadataBase: new URL("https://temon.kr"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: "테몬 MBTI RSS Feed" },
      ],
      "application/atom+xml": [
        { url: "/feed.xml", title: "테몬 MBTI Atom Feed" },
      ],
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "테몬 MBTI - 나만의 성격 유형 테스트",
    description: "커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트",
    url: "https://temon.kr",
    siteName: "테몬 MBTI",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: 'https://temon.kr/placeholder-logo.png',
        width: 1200,
        height: 630,
        alt: '테몬 MBTI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "테몬 MBTI - 나만의 성격 유형 테스트",
    description: "커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트",
    images: ['https://temon.kr/placeholder-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification": process.env.NAVER_SITE_VERIFICATION || "",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = "https://temon.kr"
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema({
    target: `${baseUrl}/tests?q={search_term_string}`,
    queryInput: "required name=search_term_string",
  })

  return (
    <html lang="ko">
      <head>
        {/* SEO, AEO, GEO 최적화를 위한 구조화 데이터 */}
        <JsonLd id="organization-schema" data={JSON.parse(organizationSchema)} />
        <JsonLd id="website-schema" data={JSON.parse(websiteSchema)} />
        {/* Google tag (gtag.js) - 지연 로딩으로 페이지 속도 최적화 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L167CCPS8E"
          strategy="lazyOnload"
        />
        <Script id="google-tag" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L167CCPS8E', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* Microsoft Clarity - 지연 로딩 */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "h9v55vfsel");
          `}
        </Script>
        <AdSenseScript />
        <Script src="/analytics.js" strategy="lazyOnload" />
        {/* 네이버 검색 최적화 메타 태그 */}
        {process.env.NAVER_SITE_VERIFICATION && (
          <meta name="naver-site-verification" content={process.env.NAVER_SITE_VERIFICATION} />
        )}
        {/* 네이버 검색 최적화 - 모바일 최적화 */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        {/* 네이버 검색 최적화 - 콘텐츠 유형 */}
        <meta name="naver" content="index,follow" />
        {/* 다음(Daum) 검색 최적화 */}
        <meta name="daum" content="index,follow" />
        {/* 검색 엔진 최적화 - 언어 및 지역 */}
        <meta httpEquiv="content-language" content="ko-KR" />
        <meta name="geo.region" content="KR" />
        {/* 모바일 최적화 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <AnalyticsProvider>
            <AdminHeadScripts />
            <Header />
            <main className="min-h-screen">{children}</main>
          </AnalyticsProvider>
        </Suspense>
        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
