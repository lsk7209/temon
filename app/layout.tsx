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
import CoupangAffiliateBanner from "@/components/affiliate/CoupangAffiliateBanner";
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
const NAVER_SITE_VERIFICATION =
  process.env.NAVER_SITE_VERIFICATION ||
  "a57f4e75c60c7b2f5117885c1ffcdf9c1b3ca4b4";

const siteTitle = "MBTI 테스트 - 무료 성격 테스트 모음 | 테몬";
const siteDescription =
  "MBTI 테스트와 무료 성격 테스트를 한곳에서 즐기세요. 커피, 라면, 반려동물, 공부, 연애 등 일상 주제로 나의 성향을 쉽고 재미있게 확인할 수 있습니다.";
const socialTitle = "테몬 MBTI - 나만의 성격 유형 테스트";
const socialDescription =
  "커피, 라면, 반려동물, 공부 등 다양한 주제로 알아보는 재미있는 무료 MBTI 테스트 모음입니다.";
const ogImage =
  "https://temon.kr/api/og?title=%ED%85%8C%EB%AA%AC%20MBTI&desc=%EB%AC%B4%EB%A3%8C%20%EC%84%B1%EA%B2%A9%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EB%AA%A8%EC%9D%8C";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords:
    "MBTI 테스트, 무료 성격 테스트, 성격 테스트, 커피 MBTI, 라면 MBTI, 반려동물 MBTI, 공부 MBTI, 연애 테스트, NTRP 테스트",
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
    title: socialTitle,
    description: socialDescription,
    url: "https://temon.kr",
    siteName: "테몬 MBTI",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "테몬 MBTI - 무료 성격 테스트 모음",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [ogImage],
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
        <JsonLd id="organization-schema" data={organizationSchema} />
        <JsonLd id="website-schema" data={websiteSchema} />
        <JsonLd id="speakable-webpage-schema" data={speakableWebPageSchema} />
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
        <meta name="naver-site-verification" content={NAVER_SITE_VERIFICATION} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="naver" content="index,follow" />
        <meta name="naverbot" content="index,follow" />
        <meta name="daum" content="index,follow" />
        <meta name="daumbot" content="index,follow" />
        <meta httpEquiv="content-language" content="ko-KR" />
        <meta name="geo.region" content="KR" />
        <meta name="geo.placename" content="대한민국" />
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          본문 바로가기
        </a>
        <AdminHeadScripts />
        <Header />
        <main id="main-content" className="min-h-screen">
          <AutoContentToc />
          {children}
        </main>
        <CoupangAffiliateBanner />
        <Footer />
        <Suspense fallback={null}>
          <AdSenseScript />
          <AnalyticsProvider />
        </Suspense>
        {isVercel && <Analytics />}
        {isVercel && <SpeedInsights />}
        <WebVitals />
      </body>
    </html>
  );
}
