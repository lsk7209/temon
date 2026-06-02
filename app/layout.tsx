import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AnalyticsProvider from "@/components/analytics-provider";
import Script from "next/script";
import { Suspense } from "react";
import AdminHeadScripts from "@/components/admin-head-scripts";
import AdSenseScript from "@/components/adsense-script";
import AutoContentToc from "@/components/auto-content-toc";
import WebVitals from "@/components/web-vitals";
import {
  generateOrganizationSchema,
  generateSpeakableWebPageSchema,
  generateWebSiteSchema,
} from "@/lib/seo-utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/json-ld";

const inter = Inter({ subsets: ["latin"] });
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-L167CCPS8E";
const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
  "ca-pub-3050601904412736";
const NAVER_SITE_VERIFICATION =
  process.env.NAVER_SITE_VERIFICATION ||
  "a57f4e75c60c7b2f5117885c1ffcdf9c1b3ca4b4";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "MBTI 테스트 - 무료 성격 테스트 모음 | 테몬",
  description:
    "MBTI 테스트로 알아보는 나만의 성격 유형! 커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 재미있는 MBTI 테스트를 무료로 시작해보세요.",
  keywords:
    "MBTI, 성격테스트, MBTI 테스트, 커피MBTI, 라면MBTI, 반려동물MBTI, 공부MBTI, 알람습관, NTRP테스트, 무료 테스트",
  metadataBase: new URL("https://temon.kr"),
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "https://temon.kr",
    },
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "테몬 MBTI RSS Feed" }],
      "application/atom+xml": [
        { url: "/feed.xml", title: "테몬 MBTI Atom Feed" },
      ],
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "테몬 MBTI - 나만의 성격 유형 테스트",
    description:
      "커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트",
    url: "https://temon.kr",
    siteName: "테몬 MBTI",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://temon.kr/api/og?title=테몬%20MBTI&desc=무료%20성격%20테스트%20모음",
        width: 1200,
        height: 630,
        alt: "테몬 MBTI - 무료 성격 테스트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "테몬 MBTI - 나만의 성격 유형 테스트",
    description:
      "커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트",
    images: [
      "https://temon.kr/api/og?title=테몬%20MBTI&desc=무료%20성격%20테스트%20모음",
    ],
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = "https://temon.kr";
  const isVercel = process.env.VERCEL === "1";
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema({
    target: `${baseUrl}/tests?q={search_term_string}`,
    queryInput: "required name=search_term_string",
  });
  const speakableWebPageSchema = generateSpeakableWebPageSchema({
    name: "테몬 MBTI",
    url: baseUrl,
    description:
      "무료 성격 테스트와 취향 테스트를 제공하는 한국어 퀴즈 사이트입니다.",
  });

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        {/* SEO, AEO, GEO 최적화를 위한 구조화된 데이터 */}
        <JsonLd id="organization-schema" data={organizationSchema} />
        <JsonLd id="website-schema" data={websiteSchema} />
        <JsonLd id="speakable-webpage-schema" data={speakableWebPageSchema} />
        <Script
          id="adsense-loader"
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          strategy="afterInteractive"
        />
        {/* Google tag (gtag.js) - GA4 실시간 노출 안정화 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);}
            window.gtag('js', new Date());
            window.gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              page_location: window.location.href,
              send_page_view: false
            });
          `}
        </Script>
        {/* Microsoft Clarity - 지연 로딩 */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="lazyOnload">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}
        {/* 네이버 검색 최적화 - 모바일 최적화 */}
        <meta name="naver-site-verification" content={NAVER_SITE_VERIFICATION} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        {/* 네이버 검색 최적화 - 콘텐츠 타입 */}
        <meta name="naver" content="index,follow" />
        {/* 네이버 봇 최적화 */}
        <meta name="naverbot" content="index,follow" />
        {/* 다음(Daum) 검색 최적화 */}
        <meta name="daum" content="index,follow" />
        {/* 다음 봇 최적화 */}
        <meta name="daumbot" content="index,follow" />
        {/* 검색 엔진 최적화 - 언어 및 지역 */}
        <meta httpEquiv="content-language" content="ko-KR" />
        <meta name="geo.region" content="KR" />
        <meta name="geo.placename" content="대한민국" />
        {/* 검색 엔진 크롤링 최적화 */}
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
        >
          본문 바로가기
        </a>
        <Suspense fallback={null}>
          <AnalyticsProvider>
            <AdSenseScript />
            <AdminHeadScripts />
            <Header />
            <main id="main-content" className="min-h-screen">
              <AutoContentToc />
              {children}
            </main>
            <Footer />
          </AnalyticsProvider>
        </Suspense>
        {/* Vercel Analytics & Speed Insights */}
        {isVercel && <Analytics />}
        {isVercel && <SpeedInsights />}
        {/* Core Web Vitals → GA4 전송 (RUM) */}
        <WebVitals />
      </body>
    </html>
  );
}
