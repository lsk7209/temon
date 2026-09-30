import type { Metadata } from "next";
import {
  JsonLd,
  createBreadcrumbSchema,
  createFAQSchema,
  createItemListSchema,
} from "@/components/json-ld";
import { getHomePageTests } from "@/lib/tests-config";
import { getHomeFAQs } from "@/lib/quiz-seo-utils";
import HomeClient from "./home-client";

const baseUrl = "https://temon.kr";
const canonical = "/";
const title = "무료 심리 테스트·MBTI 테스트 모음 | 테몬";
const description =
  "무료 심리 테스트와 MBTI·성격·연애·취향·아이돌 테스트를 가입 없이 2~3분 안에 즐겨보세요. 결과는 가벼운 자기이해와 대화 소재를 위한 콘텐츠입니다.";
const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(
  "무료 심리 테스트·MBTI 테스트 모음",
)}&desc=${encodeURIComponent("가입 없이 즐기는 성격·연애·취향 테스트")}`;

// 화면(home-client.tsx)과 JSON-LD FAQPage가 반드시 같은 문항을 쓰도록
// lib/quiz-seo-utils.ts의 getHomeFAQs()를 단일 소스로 사용한다 (F12).
const homeFaqs = getHomeFAQs();

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
