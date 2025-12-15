import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd, createQuizSchema, createBreadcrumbSchema, createFAQSchema } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"

const baseUrl = "https://temon.kr"
const canonical = "/coffee-mbti"
const fullUrl = `${baseUrl}${canonical}`

// Naver-optimized description (under 80 chars)
const shortDescription = "커피 취향으로 알아보는 성격 유형 테스트. 16가지 커피 MBTI 유형 발견!"
// Full description for Google/AI
const fullDescription = "커피 MBTI 테스트로 알아보는 나의 성격! 좋아하는 커피로 16가지 커피 유형 중 당신은 어떤 커피일까요? 커피 취향에 숨겨진 성격 특성을 발견하고, 나에게 맞는 완벽한 커피를 추천받아보세요. 재미있는 커피 MBTI 테스트를 지금 시작해보세요."

export const metadata: Metadata = {
  title: "커피 MBTI - 당신의 커피 취향으로 알아보는 성격 유형 | 테몬",
  description: shortDescription, // Naver-optimized (under 80 chars)
  keywords: "커피 MBTI, 커피 테스트, 성격 테스트, MBTI, 커피 유형, 심리테스트, 무료 테스트",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical,
  },
  openGraph: {
    title: "커피 MBTI - 당신의 커피 취향으로 알아보는 성격 유형",
    description: fullDescription, // Full description for OG
    type: "website",
    url: fullUrl,
    siteName: "테몬",
    locale: "ko_KR",
    images: [
      {
        url: `${baseUrl}/og-tests/coffee-mbti.png`,
        width: 1200,
        height: 630,
        alt: "커피 MBTI 테스트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "커피 MBTI - 당신의 커피 취향으로 알아보는 성격 유형",
    description: fullDescription,
    images: [`${baseUrl}/og-tests/coffee-mbti.png`],
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
    other: {
      "naverbot": "index,follow",
      "Yeti": "index,follow",
      "Yeti-Mobile": "index,follow",
    },
  },
}

// FAQ data for AI bot optimization
const faqs = [
  {
    question: "커피 MBTI 테스트는 어떻게 진행되나요?",
    answer: "12개의 간단한 질문에 답변하시면 됩니다. 각 질문은 커피 취향과 관련된 일상적인 선택 상황을 제시하며, 솔직하게 답변하시면 더 정확한 결과를 얻을 수 있습니다. 소요 시간은 약 3분입니다.",
  },
  {
    question: "커피 MBTI 테스트 결과는 몇 가지 유형이 있나요?",
    answer: "총 16가지 커피 MBTI 유형이 있습니다. 각 유형은 MBTI의 16가지 성격 유형을 기반으로 하며, 커피 취향에 따라 나의 성격 특성을 재미있게 알아볼 수 있습니다.",
  },
  {
    question: "이 테스트는 무료인가요?",
    answer: "네, 커피 MBTI 테스트는 완전 무료로 이용하실 수 있습니다. 회원가입이나 결제 없이 바로 시작하실 수 있습니다.",
  },
  {
    question: "테스트 결과를 공유할 수 있나요?",
    answer: "네, 테스트 결과는 SNS(카카오톡, 페이스북, 트위터 등)를 통해 공유하실 수 있습니다. 친구들과 함께 재미있는 커피 MBTI 결과를 비교해보세요!",
  },
  {
    question: "커피를 좋아하지 않아도 테스트할 수 있나요?",
    answer: "네, 가능합니다. 테스트는 커피 취향을 통해 성격을 알아보는 것이지만, 커피를 자주 마시지 않으시더라도 일반적인 선호도를 바탕으로 답변하시면 됩니다.",
  },
]

export default function CoffeeMBTI() {
  // Generate structured data schemas
  const quizSchema = createQuizSchema({
    name: "커피 MBTI 테스트",
    description: fullDescription,
    url: fullUrl,
    questionCount: 12,
    duration: "PT3M",
    image: `${baseUrl}/og-tests/coffee-mbti.png`,
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "테스트 모음", url: `${baseUrl}/tests` },
    { name: "커피 MBTI", url: fullUrl },
  ])

  const faqSchema = createFAQSchema(faqs)

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="coffee-mbti-quiz-schema" data={quizSchema} />
      <JsonLd id="coffee-mbti-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="coffee-mbti-faq-schema" data={faqSchema} />

      <article className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <header className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                ☕ 커피 MBTI 테스트
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                커피 취향으로 알아보는 나의 성격 유형
              </p>
            </header>

            {/* Main Content Section */}
            <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 테스트 소개</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>• 좋아하는 커피로 알아보는 나의 성격</p>
                    <p>• 16가지 커피 유형 중 당신의 유형은?</p>
                    <p>• 커피 취향에 숨겨진 성격 특성 발견</p>
                    <p>• 나에게 맞는 완벽한 커피 추천</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="text-center">
                      <div className="font-semibold text-amber-600">소요시간</div>
                      <div>약 3분</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-amber-600">문항수</div>
                      <div>12문항</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center mb-8">
              <Link href="/coffee-mbti/test">
                <Button
                  size="lg"
                  className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-amber-600 hover:bg-amber-700"
                >
                  테스트 시작하기 🚀
                </Button>
              </Link>
              <div className="mt-8 text-sm text-gray-500">
                <p>💡 정확한 결과를 위해 솔직하게 답변해주세요!</p>
              </div>
            </section>

            {/* FAQ Section for AI Bot Optimization */}
            <section className="mt-12">
              <FAQSection faqs={faqs} title="커피 MBTI 테스트 자주 묻는 질문" />
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
