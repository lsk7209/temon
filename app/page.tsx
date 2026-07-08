import type { Metadata } from "next";
import {
  JsonLd,
  createBreadcrumbSchema,
  createFAQSchema,
  createItemListSchema,
} from "@/components/json-ld";
import { getHomePageTests } from "@/lib/tests-config";
import HomeClient from "./home-client";

const baseUrl = "https://temon.kr";
const canonical = "/";
const title = "테스트 모음, 재미있는 MBTI·연애·아이돌 테스트 - 테몬";
const description =
  "테몬에서 무료 MBTI 테스트, 성격 테스트, 연애·취향·아이돌 테스트를 한곳에서 골라보세요. 가입 없이 2~3분 안에 결과를 확인하고 친구와 공유할 수 있습니다.";
const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(
  "재밌는 테스트 모음",
)}&desc=${encodeURIComponent("MBTI부터 아이돌 포지션까지 무료 테스트")}`;

const homeFaqs = [
  {
    question: "테몬 MBTI 테스트 모음은 무료인가요?",
    answer:
      "네. 테몬의 MBTI 테스트와 성격 테스트 모음은 가입이나 결제 없이 무료로 이용할 수 있습니다.",
  },
  {
    question: "어떤 주제의 테스트를 찾을 수 있나요?",
    answer:
      "음식, 연애, 생활 습관, 직장, 음악 취향처럼 일상 주제별 무료 테스트와 재미있는 심리 테스트를 찾을 수 있습니다.",
  },
  {
    question: "처음 방문했다면 어떤 테스트를 고르면 좋나요?",
    answer:
      "처음이라면 전체 테스트 목록에서 음식, 생활, 취향, 관계처럼 관심 있는 카테고리를 먼저 고르는 것을 추천합니다.",
  },
  {
    question: "테스트 결과는 정확한 진단인가요?",
    answer:
      "테몬의 결과는 가볍게 즐기는 성향 분석 콘텐츠입니다. 의료, 심리, 진로 진단이 아니라 자기 이해와 대화 소재로 사용하는 것이 좋습니다.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "MBTI 테스트 모음, 무료 MBTI 테스트, 재밌는 테스트, 성격 테스트 모음, 테스트 사이트, 무료 성격 테스트, 취향 테스트, 연애 테스트, 음식 테스트, 아이돌 테스트",
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
        alt: "테몬 무료 MBTI 테스트 모음",
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
};

export default function HomePage() {
  const displayTests = getHomePageTests();

  const breadcrumbSchema = createBreadcrumbSchema([{ name: "홈", url: baseUrl }]);

  const itemListSchema = createItemListSchema(
    displayTests.map((test) => ({
      name: test.title,
      description: test.description,
      url: `${baseUrl}${test.href}`,
      image: `${baseUrl}/api/og?title=${encodeURIComponent(
        test.title,
      )}&desc=${encodeURIComponent(test.description)}`,
    })),
  );
  const faqSchema = createFAQSchema(homeFaqs);

  return (
    <>
      <JsonLd id="home-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="home-itemlist-schema" data={itemListSchema} />
      <JsonLd id="home-faq-schema" data={faqSchema} />
      <HomeClient />
    </>
  );
}
