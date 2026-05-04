import type { Metadata } from "next"
import {
  JsonLd,
  createBreadcrumbSchema,
  createItemListSchema,
} from "@/components/json-ld"
import { getHomePageTests } from "@/lib/tests-config"
import HomeClient from "./home-client"

const baseUrl = "https://temon.kr"
const canonical = "/"
const title = "MBTI 테스트 모음 | 무료 성격 테스트 - 테몬"
const description =
  "무료 MBTI 테스트 모음 사이트 테몬입니다. 성격 유형, 취향, 연애, 음식 테스트를 2분 안에 즐기고 결과를 공유하세요."
const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(
  "테몬 MBTI 테스트 모음",
)}&desc=${encodeURIComponent("무료 성격 테스트와 취향 테스트 모음")}`

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "MBTI 테스트 모음, 무료 MBTI 테스트, 성격 테스트 모음, 무료 성격 테스트, 취향 테스트, 연애 테스트, 음식 테스트",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: baseUrl,
    siteName: "테몬",
    locale: "ko_KR",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "테몬 MBTI 테스트 모음",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
}

export default function HomePage() {
  const displayTests = getHomePageTests()

  const breadcrumbSchema = createBreadcrumbSchema([{ name: "홈", url: baseUrl }])

  const itemListSchema = createItemListSchema(
    displayTests.map((test) => ({
      name: test.title,
      description: test.description,
      url: `${baseUrl}${test.href}`,
      image: `${baseUrl}/api/og?title=${encodeURIComponent(
        test.title,
      )}&desc=${encodeURIComponent(test.description)}`,
    })),
  )

  return (
    <>
      <JsonLd id="home-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="home-itemlist-schema" data={itemListSchema} />
      <HomeClient />
    </>
  )
}
