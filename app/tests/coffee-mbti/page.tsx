import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "커피 MBTI 테스트 - 무료 성격 테스트 | 테몬",
  description:
    "커피 MBTI 테스트로 알아보는 나의 성격! 16가지 커피 유형 중 당신은 어떤 커피일까요? 재미있는 커피 MBTI 테스트를 무료로 시작해보세요.",
  keywords: "커피 MBTI, 커피 테스트, 성격 테스트, MBTI, 커피 유형, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/coffee-mbti",
  },
  openGraph: {
    title: "커피 MBTI 테스트 - 무료 성격 테스트",
    description: "커피 MBTI 테스트로 알아보는 나의 성격! 16가지 커피 유형 중 당신은 어떤 커피일까요?",
    type: "website",
    url: "https://www.temon.kr/tests/coffee-mbti",
  },
}

export default function CoffeeMBTI() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "이 테스트는 어떤 원리로 작동하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MBTI 성격 유형 이론을 바탕으로 커피 취향과 성격의 연관성을 분석하여 제작되었습니다. 12개의 질문을 통해 당신의 성향을 파악합니다."
        }
      },
      {
        "@type": "Question",
        "name": "테스트 소요 시간은 얼마나 걸리나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "약 3분 정도 소요됩니다. 총 12문항으로 구성되어 있어 빠르고 간편하게 참여할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "결과를 친구들과 공유할 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 결과 페이지에서 카카오톡, 페이스북, 트위터 등 다양한 SNS로 결과를 공유할 수 있습니다."
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">☕ 커피 MBTI</h1>
              <p className="text-xl text-gray-600 mb-8">당신의 커피 취향으로 알아보는 성격 유형</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-8">
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

                {/* FAQ Section for AEO/SEO */}
                <div className="text-left border-t pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ 자주 묻는 질문</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>이 테스트는 어떤 원리로 작동하나요?</AccordionTrigger>
                      <AccordionContent>
                        MBTI 성격 유형 이론을 바탕으로 커피 취향과 성격의 연관성을 분석하여 제작되었습니다. 
                        12개의 질문을 통해 당신의 성향을 파악합니다.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>테스트 소요 시간은 얼마나 걸리나요?</AccordionTrigger>
                      <AccordionContent>
                        약 3분 정도 소요됩니다. 총 12문항으로 구성되어 있어 빠르고 간편하게 참여할 수 있습니다.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>결과를 친구들과 공유할 수 있나요?</AccordionTrigger>
                      <AccordionContent>
                        네, 결과 페이지에서 카카오톡, 페이스북, 트위터 등 다양한 SNS로 결과를 공유할 수 있습니다.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Outlink for Trust (E-E-A-T) */}
                <div className="text-left border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">참고 자료</h3>
                  <a 
                    href="https://ko.wikipedia.org/wiki/MBTI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-amber-600 hover:text-amber-700 hover:underline"
                  >
                    MBTI 성격 유형 검사란? <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <Link href="/tests/coffee-mbti/test">
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
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
