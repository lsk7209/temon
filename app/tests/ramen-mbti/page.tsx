import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "라면 MBTI 테스트 - 무료 성격 테스트 | 테몬",
  description:
    "라면 MBTI 테스트로 알아보는 나의 성격! 16가지 라면 유형 중 당신은 어떤 라면일까요? 재미있는 라면 MBTI 테스트를 무료로 시작해보세요.",
  keywords: "라면 MBTI, 라면 테스트, 성격 테스트, MBTI, 라면 유형, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/ramen-mbti",
  },
  openGraph: {
    title: "라면 MBTI 테스트 - 무료 성격 테스트",
    description: "라면 MBTI 테스트로 알아보는 나의 성격! 16가지 라면 유형 중 당신은 어떤 라면일까요?",
    type: "website",
    url: "https://www.temon.kr/tests/ramen-mbti",
  },
}

export default function RamenMBTI() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "라면 취향으로 성격을 알 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "라면을 끓이고 먹는 방식(꼬들면 vs 푹익면, 계란 유무 등)은 개인의 선호와 습관을 반영하며, 이를 MBTI 성향과 연결하여 재미있게 분석했습니다."
        }
      },
      {
        "@type": "Question",
        "name": "어떤 라면 유형이 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "신라면, 진라면, 불닭볶음면 등 16가지 다양한 라면 유형으로 당신의 성격을 표현해드립니다."
        }
      },
      {
        "@type": "Question",
        "name": "테스트 시간은 얼마나 걸리나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "약 3분 정도 소요됩니다. 12개의 간단한 질문에 답하면 바로 결과를 확인할 수 있습니다."
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🍜 라면 MBTI</h1>
              <p className="text-xl text-gray-600 mb-8">당신의 라면 취향으로 알아보는 성격 유형</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 테스트 소개</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>• 좋아하는 라면으로 알아보는 나의 성격</p>
                    <p>• 16가지 라면 유형 중 당신의 유형은?</p>
                    <p>• 라면 취향에 숨겨진 성격 특성 발견</p>
                    <p>• 친구들과 함께 즐기는 재미있는 테스트</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">소요시간</div>
                      <div>약 3분</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">문항수</div>
                      <div>12문항</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/tests/ramen-mbti/test">
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-orange-600 hover:bg-orange-700"
              >
                테스트 시작하기 🚀
              </Button>
            </Link>

            <div className="mt-8 text-sm text-gray-500">
              <p>💡 정확한 결과를 위해 솔직하게 답변해주세요!</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ 자주 묻는 질문</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>라면 취향으로 성격을 알 수 있나요?</AccordionTrigger>
                  <AccordionContent>
                    라면을 끓이고 먹는 방식(꼬들면 vs 푹익면, 계란 유무 등)은 개인의 선호와 습관을 반영하며,
                    이를 MBTI 성향과 연결하여 재미있게 분석했습니다. 과학적 근거보다는 재미로 즐겨주세요!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>어떤 라면 유형이 있나요?</AccordionTrigger>
                  <AccordionContent>
                    신라면, 진라면, 불닭볶음면, 짜파게티 등 16가지 다양한 라면 유형으로 당신의 성격을 표현해드립니다.
                    각 라면의 특징과 당신의 성격이 얼마나 일치하는지 확인해보세요.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>테스트 시간은 얼마나 걸리나요?</AccordionTrigger>
                  <AccordionContent>
                    약 3분 정도 소요됩니다. 12개의 간단한 질문에 답하면 바로 결과를 확인할 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">관련 정보</h3>
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%9D%BC%EB%A9%B4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 hover:underline"
                >
                  라면의 역사와 종류 알아보기 <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
