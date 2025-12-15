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
  title: "MBTI ?ŒìŠ¤??- ë¬´ë£Œ ?±ê²© ?ŒìŠ¤??ëª¨ìŒ | ?Œëª¬",
  description: "MBTI ?ŒìŠ¤?¸ë¡œ ?Œì•„ë³´ëŠ” ?˜ë§Œ???±ê²© ? í˜•! ì»¤í”¼, ?¼ë©´, ë°˜ë ¤?™ë¬¼, ê³µë? ?µê? ???¤ì–‘??ì£¼ì œë¡??¬ë??ˆëŠ” MBTI ?ŒìŠ¤?¸ë? ë¬´ë£Œë¡??œì‘?´ë³´?¸ìš”.",
  keywords: "MBTI, ?±ê²©?ŒìŠ¤?? MBTI ?ŒìŠ¤?? ì»¤í”¼MBTI, ?¼ë©´MBTI, ë°˜ë ¤?™ë¬¼MBTI, ê³µë?MBTI, ?ŒëŒ?µê?, NTRP?ŒìŠ¤?? ë¬´ë£Œ ?ŒìŠ¤??,
  metadataBase: new URL("https://temon.kr"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: "?Œëª¬ MBTI RSS Feed" },
      ],
      "application/atom+xml": [
        { url: "/feed.xml", title: "?Œëª¬ MBTI Atom Feed" },
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
    title: "?Œëª¬ MBTI - ?˜ë§Œ???±ê²© ? í˜• ?ŒìŠ¤??,
    description: "ì»¤í”¼, ?¼ë©´, ë°˜ë ¤?™ë¬¼, ê³µë? ?µê? ???¤ì–‘??ì£¼ì œë¡??Œì•„ë³´ëŠ” ?¬ë??ˆëŠ” MBTI ?ŒìŠ¤??,
    url: "https://temon.kr",
    siteName: "?Œëª¬ MBTI",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: 'https://temon.kr/placeholder-logo.png',
        width: 1200,
        height: 630,
        alt: '?Œëª¬ MBTI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "?Œëª¬ MBTI - ?˜ë§Œ???±ê²© ? í˜• ?ŒìŠ¤??,
    description: "ì»¤í”¼, ?¼ë©´, ë°˜ë ¤?™ë¬¼, ê³µë? ?µê? ???¤ì–‘??ì£¼ì œë¡??Œì•„ë³´ëŠ” ?¬ë??ˆëŠ” MBTI ?ŒìŠ¤??,
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
        {/* SEO, AEO, GEO ìµœì ?”ë? ?„í•œ êµ¬ì¡°???°ì´??*/}
        <JsonLd id="organization-schema" data={JSON.parse(organizationSchema)} />
        <JsonLd id="website-schema" data={JSON.parse(websiteSchema)} />
        {/* Google tag (gtag.js) - ì§€??ë¡œë”©?¼ë¡œ ?˜ì´ì§€ ?ë„ ìµœì ??*/}
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
        {/* Microsoft Clarity - ì§€??ë¡œë”© */}
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
        {/* ?¤ì´ë²?ê²€??ìµœì ??ë©”í? ?œê·¸ */}
        {process.env.NAVER_SITE_VERIFICATION && (
          <meta name="naver-site-verification" content={process.env.NAVER_SITE_VERIFICATION} />
        )}
        {/* ?¤ì´ë²?ê²€??ìµœì ??- ëª¨ë°”??ìµœì ??*/}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        {/* ?¤ì´ë²?ê²€??ìµœì ??- ì½˜í…ì¸?? í˜• */}
        <meta name="naver" content="index,follow" />
        {/* ?¤ìŒ(Daum) ê²€??ìµœì ??*/}
        <meta name="daum" content="index,follow" />
        {/* ê²€???”ì§„ ìµœì ??- ?¸ì–´ ë°?ì§€??*/}
        <meta httpEquiv="content-language" content="ko-KR" />
        <meta name="geo.region" content="KR" />
        {/* ëª¨ë°”??ìµœì ??*/}
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
