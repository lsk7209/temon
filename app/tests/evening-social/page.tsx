import type { Metadata } from "next"
import Link from "next/link"
import { AnswerEngineSection } from "@/components/answer-engine-section"
import { FAQSection } from "@/components/faq-section"
import { GscLandingBoost } from "@/components/gsc-landing-boost"
import { JsonLd } from "@/components/json-ld"
import { LandingConversionSection } from "@/components/landing-conversion-section"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { generateQuizMetadata, generateQuizSchemas } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { Clock, MessageSquare, Sparkles, Users } from "lucide-react"

const quizTitle = "저녁 약속 대하는 방식 테스트"
const shortDescription = "저녁 약속 테스트로 약속형·즉흥형·혼자충전형 사회 성향을 16유형으로 확인하세요."
const fullDescription =
  "저녁 약속 대하는 방식 테스트로 약속이 생겼을 때 계획하는지, 즉흥적으로 움직이는지, 사람들과 에너지를 얻는지 확인하세요. 12문항으로 16가지 저녁 약속 스타일을 무료로 제공합니다."
const keywords =
  "저녁 약속 테스트, 약속 스타일 테스트, 사회성 테스트, 저녁 약속 성향, 인간관계 테스트, 약속 MBTI, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "evening-social",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/evening-social",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "저녁 약속 테스트 검색",
    description: "약속이 생겼을 때 계획부터 세우는지, 상황에 맞춰 움직이는지 확인합니다.",
  },
  {
    title: "사회성 성향 분석",
    description: "약속 장소, 시간, 대화 방식, 약속 후 에너지 변화를 기준으로 사회적 리듬을 봅니다.",
  },
  {
    title: "인간관계 참고",
    description: "결과는 사회성 평가가 아니라 저녁 약속을 대하는 습관을 친구와 비교하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 저녁 약속이 생겼을 때", "바로 계획한다 vs 그때그때 대처한다"],
  ["2. 약속을 취소해야 할 때", "미리 알려준다 vs 상황에 따라 결정한다"],
  ["3. 약속 장소를 정할 때", "검증된 곳을 고른다 vs 새로운 곳을 제안한다"],
  ["4. 약속 시간에 맞출 때", "정확히 도착한다 vs 자연스럽게 맞춘다"],
  ["5. 대화가 길어질 때", "주제를 정리한다 vs 흐름대로 이어간다"],
  ["6. 약속 후 기분은", "에너지를 얻는다 vs 에너지를 회복해야 한다"],
]

const socialTypes = [
  ["즉흥 모임형", "ENFP"],
  ["공감 대화형", "INFP"],
  ["시간 관리형", "ENFJ"],
  ["깊은 관계형", "INFJ"],
  ["아이디어형", "ENTP"],
  ["관찰 분석형", "INTP"],
  ["효율 약속형", "ENTJ"],
  ["계획 실행형", "INTJ"],
]

const featureCards = [
  ["정확한 분석", "12문항으로 약속을 대하는 습관을 4축으로 나눠 유형화합니다."],
  ["맞춤 팁", "유형에 맞는 만남 방식과 사회적 에너지 관리 팁을 제공합니다."],
  ["쉬운 공유", "결과를 친구들과 공유하고 약속 스타일을 비교할 수 있습니다."],
]

export default function EveningSocialIntro() {
  const schemas = generateQuizSchemas({
    quizId: "evening-social",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/evening-social",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="evening-social-quiz-schema" data={schemas.quiz} />
      <JsonLd id="evening-social-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="evening-social-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="space-y-8 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-cyan-300 shadow-lg">
              <MessageSquare className="h-14 w-14 text-blue-900" aria-hidden="true" />
            </div>
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                NEW 테스트
              </Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  저녁 약속을 대하는 방식으로 보는
                </span>
                <br />
                <span className="text-foreground">나의 사회성 리듬</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                약속을 계획하는지, 즉흥적으로 움직이는지, 만남 후 에너지가 어떻게 바뀌는지 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />8,130명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" asChild>
                <Link href="/tests/evening-social/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <MessageSquare className="h-6 w-6 text-blue-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-blue-50 dark:bg-blue-950" : "bg-cyan-50 dark:bg-cyan-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 저녁 약속 스타일</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 약속 리듬을 가졌을까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {socialTypes.map(([name, type]) => (
                    <div key={type} className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-3 text-center dark:from-blue-950 dark:to-cyan-950">
                      <div className="text-xs font-medium">{name}</div>
                      <div className="text-xs text-slate-700 dark:text-slate-200">{type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <Sparkles className="h-6 w-6 text-cyan-500" /> 특별한 기능
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {featureCards.map(([title, description]) => (
                    <div key={title} className="space-y-2">
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="mt-12">
            <GscLandingBoost
              title="저녁 약속 테스트로 보는 사회성 리듬"
              summary="저녁 약속 테스트는 약속 스타일 테스트, 사회성 테스트, 인간관계 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 약속 시간, 장소 선택, 대화 방식과 만남 후 에너지 변화를 바탕으로 16가지 저녁 약속 스타일을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/weekend-social", label: "주말 만남 테스트" },
                { href: "/tests/meal-social", label: "식사 소셜 테스트" },
                { href: "/tests/evening-meal", label: "저녁 식사 스타일 테스트" },
              ]}
              tone="blue"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Evening Social Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Evening Social Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="evening-social" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="저녁 약속 대하는 방식 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
