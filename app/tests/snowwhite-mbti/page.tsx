import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "백설공주 에겐테토 테스트 - 무료 성격 테스트 | 테몬",
  description:
    "백설공주 에겐테토 테스트로 알아보는 나의 성향! 감정파 에겐일까? 효율파 테토일까? 재미있는 병맛 테스트를 무료로 시작해보세요.",
  keywords: "백설공주, 에겐테토, 성격 테스트, MBTI, 병맛 테스트, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/snowwhite-mbti",
  },
  openGraph: {
    title: "백설공주 에겐테토 테스트 - 무료 성격 테스트",
    description: "백설공주 에겐테토 테스트로 알아보는 나의 성향! 감정파 에겐일까? 효율파 테토일까?",
    type: "website",
    url: "https://www.temon.kr/tests/snowwhite-mbti",
  },
}

export default function SnowWhiteMBTI() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "'에겐'과 '테토'가 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "'에겐'은 감정과 공감을 중요시하는 성향(Feeling), '테토'는 효율과 논리를 중요시하는 성향(Thinking)을 의미하는 신조어입니다."
        }
      },
      {
        "@type": "Question",
        "name": "어떤 결과가 나오나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "백설 에겐공주, 에겐왕자, 테토여왕, 난장이 테토남 등 4가지 재미있는 유형으로 당신의 성향을 분석해드립니다."
        }
      },
      {
        "@type": "Question",
        "name": "테스트 소요 시간은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "약 2분 정도 소요됩니다. 10개의 짧고 재미있는 질문으로 구성되어 있습니다."
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🍎 백설공주와 일곱 난장이</h1>
              <p className="text-xl text-gray-600 mb-8">나는 감정파 에겐일까? 효율파 테토일까? 🍎⚡</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 테스트 소개</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>• 백설공주 동화 속 상황으로 알아보는 나의 성향</p>
                    <p>• 감정파 에겐 vs 효율파 테토, 나는 어디에?</p>
                    <p>• 4가지 유형: 백설 에겐공주, 에겐왕자, 테토여왕, 난장이 테토남</p>
                    <p>• 병맛 넘치는 재미있는 질문과 결과!</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="text-center">
                      <div className="font-semibold text-pink-600">소요시간</div>
                      <div>약 2분</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-pink-600">문항수</div>
                      <div>10문항</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/tests/snowwhite-mbti/test">
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                테스트 시작하기 🚀
              </Button>
            </Link>

            <div className="mt-8 text-sm text-gray-500">
              <p>💡 솔직하게 답변하면 더 재미있어요!</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ 자주 묻는 질문</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>'에겐'과 '테토'가 무엇인가요?</AccordionTrigger>
                  <AccordionContent>
                    '에겐'은 감정과 공감을 중요시하는 성향(Feeling), '테토'는 효율과 논리를 중요시하는 성향(Thinking)을 의미하는 인터넷 밈/신조어입니다.
                    이 테스트는 이를 백설공주 세계관에 빗대어 재미있게 풀어냈습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>어떤 결과가 나오나요?</AccordionTrigger>
                  <AccordionContent>
                    백설 에겐공주, 에겐왕자, 테토여왕, 난장이 테토남 등 4가지 독특한 유형으로 당신의 성향을 분석해드립니다.
                    각 유형별 특징과 궁합도 확인할 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>테스트 소요 시간은?</AccordionTrigger>
                  <AccordionContent>
                    약 2분 정도 소요됩니다. 10개의 짧고 재미있는 질문으로 구성되어 있어 부담 없이 즐길 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">관련 정보</h3>
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%B0%B1%EC%84%A4_%EA%B3%B5%EC%A3%BC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-pink-600 hover:text-pink-700 hover:underline"
                >
                  백설 공주 이야기 더 알아보기 <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
