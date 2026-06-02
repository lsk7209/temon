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
import { AlarmClock, Clock, Sparkles, Users } from "lucide-react"

const quizTitle = "아침 알람 대하는 방식 테스트"
const shortDescription = "아침 알람 테스트로 스누즈형·즉시기상형 기상 습관을 16유형으로 확인하세요."
const fullDescription =
  "아침 알람 대하는 방식 테스트로 알람이 울렸을 때 바로 일어나는지, 스누즈를 누르는지, 여유 시간을 어떻게 잡는지 확인하세요. 12문항으로 16가지 알람 스타일을 무료로 제공합니다."
const keywords =
  "아침 알람 테스트, 기상 습관 테스트, 스누즈 테스트, 알람 스타일 테스트, 아침 루틴 테스트, 수면 습관 테스트, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "morning-alarm",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/morning-alarm",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "아침 알람 테스트 검색",
    description: "첫 알람에 일어나는지, 스누즈를 누르는지, 여러 알람을 어떻게 쓰는지 확인합니다.",
  },
  {
    title: "기상 습관 분석",
    description: "알람 시간, 소리, 여유 시간, 졸릴 때 반응을 기준으로 아침 루틴을 나눕니다.",
  },
  {
    title: "스누즈 습관 참고",
    description: "결과는 수면 진단이 아니라 알람을 대하는 선택 습관을 이해하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 아침 알람이 울렸을 때", "바로 일어난다 vs 스누즈를 누른다"],
  ["2. 알람을 여러 개 맞출 때", "첫 알람에 일어난다 vs 마지막 알람까지 기다린다"],
  ["3. 알람 소리가 너무 작을 때", "바로 바꾼다 vs 조금 더 들어본다"],
  ["4. 알람 없이 깼을 때", "다음 일정에 맞춘다 vs 자연스럽게 시작한다"],
  ["5. 아직 졸릴 때", "루틴대로 일어난다 vs 조금 더 쉰다"],
  ["6. 알람 시간을 정할 때", "정확한 시간으로 맞춘다 vs 여유 있게 맞춘다"],
]

const alarmTypes = [
  ["즉시 기상형", "ENTJ"],
  ["스누즈 러버", "INFP"],
  ["시간 관리형", "ENFJ"],
  ["여유 기상형", "INFJ"],
  ["알람 실험형", "ENTP"],
  ["멜로디 분석형", "INTP"],
  ["루틴 실행형", "ESTJ"],
  ["자연 기상형", "ISFP"],
]

const featureCards = [
  ["정확한 분석", "12문항으로 알람 습관을 4축으로 나눠 유형화합니다."],
  ["맞춤 팁", "유형에 맞는 알람 설정과 아침 루틴 팁을 제공합니다."],
  ["쉬운 공유", "결과를 친구들과 공유하고 기상 습관을 비교할 수 있습니다."],
]

export default function MorningAlarmIntro() {
  const schemas = generateQuizSchemas({
    quizId: "morning-alarm",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/morning-alarm",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="morning-alarm-quiz-schema" data={schemas.quiz} />
      <JsonLd id="morning-alarm-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="morning-alarm-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="space-y-8 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-red-300 shadow-lg">
              <AlarmClock className="h-14 w-14 text-orange-900" aria-hidden="true" />
            </div>
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                NEW 테스트
              </Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  아침 알람을 대하는 방식으로 보는
                </span>
                <br />
                <span className="text-foreground">나의 기상 습관</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                첫 알람에 일어나는지, 스누즈를 누르는지, 여유 시간을 어떻게 잡는지 12문항으로 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />5,966명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" asChild>
                <Link href="/tests/morning-alarm/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <AlarmClock className="h-6 w-6 text-orange-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-orange-50 dark:bg-orange-950" : "bg-red-50 dark:bg-red-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 알람 스타일</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 기상 타입일까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {alarmTypes.map(([name, type]) => (
                    <div key={type} className="rounded-lg bg-gradient-to-br from-orange-50 to-red-50 p-3 text-center dark:from-orange-950 dark:to-red-950">
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
                  <Sparkles className="h-6 w-6 text-red-500" /> 특별한 기능
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
              title="아침 알람 테스트로 보는 기상 습관"
              summary="아침 알람 테스트는 기상 습관 테스트, 스누즈 테스트, 알람 스타일 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 첫 알람 반응, 스누즈 사용, 알람 시간 설정을 바탕으로 16가지 알람 스타일을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/morning-rush", label: "아침 준비 속도 테스트" },
                { href: "/tests/morning-energy", label: "아침 에너지 테스트" },
                { href: "/tests/sleep-chronotype", label: "수면 크로노타입 테스트" },
              ]}
              tone="orange"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Morning Alarm Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Morning Alarm Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="morning-alarm" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="아침 알람 대하는 방식 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
