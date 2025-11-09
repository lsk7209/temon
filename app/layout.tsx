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

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MBTI 테스트 - 무료 성격 테스트 모음 | 테몬",
  description: "MBTI 테스트로 알아보는 나만의 성격 유형! 커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 재미있는 MBTI 테스트를 무료로 시작해보세요.",
  keywords: "MBTI, 성격테스트, MBTI 테스트, 커피MBTI, 라면MBTI, 반려동물MBTI, 공부MBTI, 알람습관, NTRP테스트, 무료 테스트",
  metadataBase: new URL("https://www.temon.kr"),
  alternates: {
    canonical: "/",
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
    url: "https://www.temon.kr",
    siteName: "테몬 MBTI",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: 'https://www.temon.kr/placeholder-logo.png',
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
    images: ['https://www.temon.kr/placeholder-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-2TLW7Z2VQW'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-2TLW7Z2VQW'}');
          `}
        </Script>
        <AdSenseScript />
        <Script src="/analytics.js" strategy="afterInteractive" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <AnalyticsProvider>
            <AdminHeadScripts />
            <Header />
            <main className="min-h-screen">{children}</main>
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  )
}
