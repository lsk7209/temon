import type { Metadata } from "next"
import {
  JsonLd,
  createBreadcrumbSchema,
  createFAQSchema,
  createItemListSchema,
} from "@/components/json-ld"
import { getHomePageTests } from "@/lib/tests-config"
import HomeClient from "./home-client"

const baseUrl = "https://temon.kr"
const canonical = "/"
const title = "무료 MBTI 테스트 모음 | 성격 테스트 사이트 - 테몬"
const description =
  "테몬은 무료 MBTI 테스트 모음과 성격 테스트 사이트입니다. 2~3분 테스트를 고르고 결과를 바로 공유하세요."
const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(
  "테몬 MBTI 테스트 모음",
)}&desc=${encodeURIComponent("무료 성격 테스트와 취향 테스트 모음")}`
const homeFaqs = [
  {
    question: "테몬 MBTI 테스트 모음은 무료인가요?",
    answer:
      "네. 테몬의 MBTI 테스트와 성격 테스트 모음은 가입이나 결제 없이 무료로 이용할 수 있습니다.",
  },
  {
    question: "테스트 사이트에서 어떤 주제를 찾을 수 있나요?",
    answer:
      "음식, 연애, 생활 습관, 디지털, 직장, 음악 취향 등 일상 주제별 무료 테스트를 찾을 수 있습니다.",
  },
  {
    question: "어떤 성격 테스트를 고르면 좋나요?",
    answer:
      "처음 방문했다면 전체 테스트 목록에서 음식, 연애, 생활, 디지털, 직장 등 관심 있는 카테고리를 먼저 고르는 것이 좋습니다.",
  },
  {
    question: "테스트 결과는 정확한 진단인가요?",
    answer:
      "테몬의 결과는 가볍게 즐기는 성향 분석 콘텐츠입니다. 심리 진단이나 의학적 판단이 아니라 자기 이해와 대화 소재로 활용하는 것을 권장합니다.",
  },
]

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "MBTI 테스트 모음, 무료 MBTI 테스트, 성격 테스트 모음, 성격 테스트 사이트, 테스트 사이트, 무료 성격 테스트, 취향 테스트, 연애 테스트, 음식 테스트",
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
  const faqSchema = createFAQSchema(homeFaqs)

  return (
    <>
      <JsonLd id="home-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="home-itemlist-schema" data={itemListSchema} />
      <JsonLd id="home-faq-schema" data={faqSchema} />
      <HomeClient />
    </>
  )
}
