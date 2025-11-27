import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Script from "next/script"
import { generateQuizSchema } from "@/lib/seo-utils"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.temon.kr"

export const metadata: Metadata = {
  title: "커피 MBTI - 당신의 커피 취향으로 알아보는 성격 유형 | 테몬",
  description:
    "커피 MBTI 테스트로 알아보는 나의 성격! 좋아하는 커피로 16가지 커피 유형 중 당신은 어떤 커피일까요? 재미있는 커피 MBTI 테스트를 지금 시작해보세요.",
  keywords: "커피 MBTI, 커피 테스트, 성격 테스트, MBTI, 커피 유형, 심리테스트",
  alternates: {
    canonical: "/coffee-mbti",
  },
  openGraph: {
    title: "커피 MBTI - 당신의 커피 취향으로 알아보는 성격 유형",
    description: "좋아하는 커피로 알아보는 나의 성격! 16가지 커피 유형 중 당신은 어떤 커피일까요?",
    type: "website",
    url: "https://www.temon.kr/coffee-mbti",
  },
}

export default function CoffeeMBTI() {
  const quizSchema = generateQuizSchema({
    name: "커피 MBTI 테스트",
    description: "좋아하는 커피로 알아보는 나의 성격! 16가지 커피 유형 중 당신은 어떤 커피일까요?",
    url: `${baseUrl}/coffee-mbti`,
    questionCount: 12,
    duration: "PT3M",
  })

  return (
    <>
      <Script
        id="coffee-mbti-quiz-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: quizSchema }}
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">☕ 커피 MBTI 테스트</h1>
            <p className="text-xl text-gray-600 mb-8">커피 취향으로 알아보는 나의 성격 유형</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
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
          </div>

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
        </div>
      </div>
    </div>
    </>
  )
}
