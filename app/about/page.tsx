import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, createBreadcrumbSchema } from "@/components/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Heart, Coffee, Sparkles, Users } from "lucide-react";

const baseUrl = "https://temon.kr";

export const metadata: Metadata = {
  title: "소개 | 테몬 MBTI - 무료 성격 테스트 플랫폼",
  description:
    "테몬은 커피, 라면, 반려동물 등 일상 속 취향으로 알아보는 재미있는 MBTI 성격 테스트를 무료로 제공하는 한국어 서비스입니다. 사이트 운영 원칙과 연락처를 확인하세요.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "소개 | 테몬 MBTI",
    description: "재미있는 무료 성격 테스트를 만드는 테몬 운영팀을 소개합니다.",
    url: `${baseUrl}/about`,
    siteName: "테몬",
    locale: "ko_KR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "소개", url: `${baseUrl}/about` },
  ]);

  // AboutPage + Organization 스키마 (E-E-A-T 강화)
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "테몬 소개",
    description: "테몬 MBTI 서비스 및 운영팀 소개",
    url: `${baseUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "테몬",
      url: baseUrl,
      logo: `${baseUrl}/apple-touch-icon.png`,
      email: "contact@temon.kr",
      foundingDate: "2024-01-01",
      description: "일상 속 취향으로 알아보는 재미있는 MBTI 성격 테스트 플랫폼",
      founder: {
        "@type": "Person",
        name: "테몬 운영팀",
      },
      areaServed: {
        "@type": "Country",
        name: "대한민국",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@temon.kr",
        contactType: "customer service",
        availableLanguage: "ko",
      },
    },
  };

  return (
    <>
      <JsonLd id="about-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="about-page-schema" data={aboutPageSchema} />

      <article className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              테몬을 소개합니다
            </h1>
            <p className="text-lg text-muted-foreground">
              일상 속 취향으로 알아보는 재미있는 성격 테스트
            </p>
          </header>

          {/* 사이트 목적 */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                </div>
                <h2 className="text-2xl font-bold">테몬은 왜 만들어졌나요?</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                테몬(Temon)은 &quot;테스트 + 모음&quot;의 줄임말입니다. 딱딱한
                심리학 테스트 대신, 커피·라면·반려동물·공부 습관처럼{" "}
                <strong>일상에서 자주 마주치는 선택지</strong>를 통해 나의
                성격을 살펴볼 수 있도록 설계했습니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                MBTI를 비롯한 성격 유형 이론을 가볍고 재미있게 체험할 수 있는
                입구 역할을 목표로 하며, 친구와 함께 결과를 공유하며 웃고
                이야기할 수 있는 콘텐츠를 꾸준히 만들고 있습니다.
              </p>
            </CardContent>
          </Card>

          {/* 운영 원칙 */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
                <h2 className="text-2xl font-bold">운영 원칙</h2>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-violet-600">1.</span>
                  <span>
                    <strong>무료 원칙</strong> — 모든 테스트는 회원가입·결제
                    없이 이용할 수 있습니다.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-violet-600">2.</span>
                  <span>
                    <strong>재미가 먼저</strong> — 테스트 결과는 전문 심리
                    진단이 아닌 엔터테인먼트 콘텐츠이며, 결과로 타인을 판단하지
                    않도록 안내합니다.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-violet-600">3.</span>
                  <span>
                    <strong>개인정보 최소 수집</strong> — 회원가입이 없고,
                    테스트 결과는 익명 통계로만 수집합니다. 자세한 사항은{" "}
                    <Link href="/privacy" className="text-violet-600 underline">
                      개인정보처리방침
                    </Link>
                    을 확인하세요.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-violet-600">4.</span>
                  <span>
                    <strong>지속 업데이트</strong> — 사용자 반응과 시즌 트렌드를
                    반영해 새로운 테스트를 꾸준히 추가합니다. 최종 업데이트:{" "}
                    <time dateTime="2026-04-23">2026년 4월 23일</time>
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 운영팀 */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-600" />
                </div>
                <h2 className="text-2xl font-bold">운영팀</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                테몬은 <strong>테몬 운영팀</strong>이 직접 기획·개발·운영합니다.
                한국어 사용자를 위해 한국에서 서비스되며, 모든 콘텐츠는 한국
                문화와 일상에 맞춰 제작됩니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 rounded-xl bg-violet-50">
                  <div className="text-2xl font-bold text-violet-600">200+</div>
                  <div className="text-sm text-gray-600">공개된 테스트</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-pink-50">
                  <div className="text-2xl font-bold text-pink-600">무료</div>
                  <div className="text-sm text-gray-600">모든 콘텐츠</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-cyan-50">
                  <div className="text-2xl font-bold text-cyan-600">한국어</div>
                  <div className="text-sm text-gray-600">서비스 언어</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 문의 & 면책 */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold">문의 및 면책</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                서비스 개선 제안, 오류 제보, 제휴 문의는 아래 이메일로 보내
                주세요.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    문의 페이지
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="mailto:contact@temon.kr">contact@temon.kr</a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground pt-4 border-t">
                본 사이트의 테스트 결과는 재미를 위한 참고 자료이며, 전문적인
                심리 진단이나 의학적·심리학적 조언을 대체하지 않습니다.
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center pt-4">
            <Button asChild size="lg">
              <Link href="/tests">전체 테스트 둘러보기 →</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
