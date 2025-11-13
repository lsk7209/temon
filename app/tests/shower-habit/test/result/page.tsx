"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Droplets, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const showerTypes = {
  ENFP: {
    label: "즉흥 힐링형",
    summary: "샤워를 즐거운 시간으로 만드는 활발한 타입",
    description: [
      "샤워 시간을 즐거운 시간으로 만드는 당신! 샤워 중 노래를 부르거나, 새로운 제품을 시도하며 즐거워해요.",
      "샤워 시간이 그때그때 달라지고, 분위기에 따라 샤워 제품도 바꿔가며 사용하는 유연한 스타일이에요.",
      "샤워 후 상쾌하고 에너지가 넘쳐서, 하루를 시작하는 데 최고의 루틴이 되어줘요.",
    ],
    traits: ["즐거운 시간", "유연한 루틴", "에너지 충만"],
    picks: ["향기 좋은 제품", "다양한 제품 시도", "음악과 함께"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "감성 힐링형",
    summary: "샤워를 혼자만의 힐링 타임으로 만드는 감성형",
    description: [
      "샤워를 혼자만의 힐링 타임으로 만드는 당신! 조용히 샤워하며 생각에 잠기거나, 상상의 나래를 펼쳐요.",
      "샤워 시간이 길고, 따뜻한 물로 몸을 따뜻하게 하며 편안함을 느껴요.",
      "샤워 후 평온하고 편안한 느낌으로, 하루의 피로를 풀고 마음을 정리하는 소중한 시간이에요.",
    ],
    traits: ["혼자만의 시간", "편안함 중시", "평온함"],
    picks: ["부드러운 제품", "따뜻한 물", "조용한 환경"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "체계적 케어형",
    summary: "샤워를 체계적으로 관리하는 케어형",
    description: [
      "샤워를 체계적으로 관리하는 당신! 정해진 순서와 루틴을 따르며, 효율적으로 샤워해요.",
      "샤워 제품도 정해진 것을 사용하고, 샤워 후 루틴도 체계적으로 관리해요.",
      "샤워로 몸과 마음을 케어하며, 하루를 시작하는 데 필요한 에너지를 충전해요.",
    ],
    traits: ["체계적 루틴", "정해진 순서", "효율적 관리"],
    picks: ["정해진 제품", "체계적 순서", "효율적 루틴"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 있는 케어형",
    summary: "샤워를 의미 있는 케어 시간으로 만드는 큐레이터형",
    description: [
      "샤워를 의미 있는 케어 시간으로 만드는 당신! 단순히 청결이 아니라, 몸과 마음을 케어하는 시간으로 생각해요.",
      "샤워 제품도 성분을 확인하고, 자신에게 맞는 제품을 선택하며, 샤워 중 생각을 정리해요.",
      "샤워 후 평온하고 깨끗한 느낌으로, 하루를 시작하는 데 필요한 마음의 준비를 해요.",
    ],
    traits: ["의미 있는 시간", "성분 확인", "마음 정리"],
    picks: ["성분 좋은 제품", "의미 있는 루틴", "평온한 환경"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 탐구형",
    summary: "새로운 제품과 방법을 실험하는 탐구형",
    description: [
      "샤워를 실험의 장으로 만드는 당신! 새로운 제품을 시도하고, 다양한 방법을 탐구해요.",
      "샤워 시간도 그때그때 달라지고, 제품도 다양하게 시도하며, 새로운 경험을 즐겨요.",
      "샤워 후 상쾌하고 새로운 느낌으로, 하루를 시작하는 데 필요한 자극을 받아요.",
    ],
    traits: ["새로운 시도", "다양한 실험", "자극 추구"],
    picks: ["새로운 제품", "다양한 방법", "실험적 루틴"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "효율 분석형",
    summary: "샤워를 효율적으로 분석하는 분석가형",
    description: [
      "샤워를 효율적으로 분석하는 당신! 시간과 물 사용량을 고려하며, 최적의 방법을 찾아요.",
      "샤워 제품도 성분을 분석하고, 효율적인 제품을 선택하며, 체계적으로 관리해요.",
      "샤워 후 깔끔하고 효율적인 느낌으로, 하루를 시작하는 데 필요한 준비를 해요.",
    ],
    traits: ["효율 분석", "성분 분석", "체계적 관리"],
    picks: ["효율적 제품", "최적의 방법", "체계적 루틴"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 관리형",
    summary: "샤워를 전략적으로 관리하는 리더형",
    description: [
      "샤워를 전략적으로 관리하는 당신! 시간과 효율을 고려하며, 목적에 맞게 샤워해요.",
      "샤워 루틴도 체계적으로 관리하고, 제품도 목적에 맞게 선택하며, 효율적으로 운영해요.",
      "샤워 후 에너지 충만하고 준비된 느낌으로, 하루를 시작하는 데 필요한 동력을 얻어요.",
    ],
    traits: ["전략적 관리", "효율적 운영", "목적 지향"],
    picks: ["목적에 맞는 제품", "전략적 루틴", "효율적 방법"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 케어형",
    summary: "샤워를 완벽하게 케어하는 큐레이터형",
    description: [
      "샤워를 완벽하게 케어하는 당신! 모든 것을 체계적으로 관리하며, 최적의 방법을 찾아요.",
      "샤워 제품도 성분을 분석하고, 자신에게 맞는 제품을 선택하며, 완벽한 루틴을 만들어요.",
      "샤워 후 깨끗하고 준비된 느낌으로, 하루를 시작하는 데 필요한 완벽한 상태를 만들어요.",
    ],
    traits: ["완벽 케어", "체계적 관리", "최적화"],
    picks: ["완벽한 제품", "최적의 루틴", "체계적 방법"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 케어형",
    summary: "샤워를 따뜻하게 케어하는 배려형",
    description: [
      "샤워를 따뜻하게 케어하는 당신! 몸과 마음을 따뜻하게 하며, 편안함을 느껴요.",
      "샤워 제품도 부드러운 것을 선택하고, 따뜻한 물로 몸을 따뜻하게 하며, 편안한 루틴을 만들어요.",
      "샤워 후 따뜻하고 편안한 느낌으로, 하루를 시작하는 데 필요한 위로를 받아요.",
    ],
    traits: ["따뜻한 케어", "편안함 중시", "부드러운 제품"],
    picks: ["부드러운 제품", "따뜻한 물", "편안한 루틴"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 케어형",
    summary: "샤워를 안정적으로 케어하는 수호자형",
    description: [
      "샤워를 안정적으로 케어하는 당신! 정해진 루틴을 따르며, 안정감을 느껴요.",
      "샤워 제품도 정해진 것을 사용하고, 정해진 순서를 따르며, 안정적인 루틴을 만들어요.",
      "샤워 후 안정되고 편안한 느낌으로, 하루를 시작하는 데 필요한 평온함을 얻어요.",
    ],
    traits: ["안정적 루틴", "정해진 순서", "안정감"],
    picks: ["정해진 제품", "안정적 루틴", "편안한 방법"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 즐거움형",
    summary: "샤워를 즉흥적으로 즐기는 에너지형",
    description: [
      "샤워를 즉흥적으로 즐기는 당신! 샤워 중 노래를 부르거나, 즐거운 시간을 만들어요.",
      "샤워 시간도 그때그때 달라지고, 제품도 다양하게 시도하며, 즐거운 경험을 만들어요.",
      "샤워 후 상쾌하고 즐거운 느낌으로, 하루를 시작하는 데 필요한 에너지를 얻어요.",
    ],
    traits: ["즉흥적 즐거움", "다양한 시도", "에너지 넘침"],
    picks: ["즐거운 제품", "다양한 방법", "즐거운 루틴"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 케어형",
    summary: "샤워를 조용히 케어하는 미니멀형",
    description: [
      "샤워를 조용히 케어하는 당신! 최소한의 제품으로 깔끔하게 샤워해요.",
      "샤워 시간도 적당하고, 제품도 심플하게 선택하며, 조용한 루틴을 만들어요.",
      "샤워 후 깔끔하고 평온한 느낌으로, 하루를 시작하는 데 필요한 준비를 해요.",
    ],
    traits: ["조용한 케어", "심플한 제품", "평온함"],
    picks: ["심플한 제품", "조용한 루틴", "깔끔한 방법"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "효율 관리형",
    summary: "샤워를 효율적으로 관리하는 매니저형",
    description: [
      "샤워를 효율적으로 관리하는 당신! 시간과 물 사용량을 고려하며, 효율적으로 샤워해요.",
      "샤워 루틴도 체계적으로 관리하고, 제품도 효율적인 것을 선택하며, 목적에 맞게 운영해요.",
      "샤워 후 깔끔하고 효율적인 느낌으로, 하루를 시작하는 데 필요한 준비를 해요.",
    ],
    traits: ["효율적 관리", "체계적 루틴", "목적 지향"],
    picks: ["효율적 제품", "체계적 루틴", "효율적 방법"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 수호형",
    summary: "샤워를 정해진 루틴으로 수호하는 수호자형",
    description: [
      "샤워를 정해진 루틴으로 수호하는 당신! 항상 같은 순서와 방법으로 샤워해요.",
      "샤워 제품도 정해진 것을 사용하고, 정해진 시간에 샤워하며, 안정적인 루틴을 유지해요.",
      "샤워 후 안정되고 깨끗한 느낌으로, 하루를 시작하는 데 필요한 평온함을 얻어요.",
    ],
    traits: ["정해진 루틴", "안정적 유지", "일관성"],
    picks: ["정해진 제품", "정해진 순서", "안정적 루틴"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 상쾌형",
    summary: "샤워를 즉흥적으로 상쾌하게 만드는 액션형",
    description: [
      "샤워를 즉흥적으로 상쾌하게 만드는 당신! 빠르게 샤워하며, 상쾌한 느낌을 즐겨요.",
      "샤워 시간도 짧고, 제품도 간단하게 선택하며, 효율적으로 샤워해요.",
      "샤워 후 상쾌하고 에너지 넘치는 느낌으로, 하루를 시작하는 데 필요한 동력을 얻어요.",
    ],
    traits: ["즉흥적 상쾌", "빠른 샤워", "에너지 충만"],
    picks: ["상쾌한 제품", "빠른 루틴", "효율적 방법"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 케어형",
    summary: "샤워를 실용적으로 케어하는 실용가형",
    description: [
      "샤워를 실용적으로 케어하는 당신! 필요한 것만 사용하며, 효율적으로 샤워해요.",
      "샤워 제품도 실용적인 것을 선택하고, 간단한 루틴을 만들어요.",
      "샤워 후 깔끔하고 실용적인 느낌으로, 하루를 시작하는 데 필요한 준비를 해요.",
    ],
    traits: ["실용적 케어", "효율적 사용", "간단한 루틴"],
    picks: ["실용적 제품", "간단한 루틴", "효율적 방법"],
    tips: ["시간 관리", "물 사용량 체크", "제품 정리"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof showerTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = showerTypes[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((result) => {
          setLoadedResult({ id: result.id, testId: result.testId })
        })
        .catch((error) => {
          console.error("결과 로드 실패:", error)
        })
    }
  }, [resultId])

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="shower-habit"
                  testPath="/tests/shower-habit/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🚿 ${character.label}(${mbtiType})! 너는 어떤 샤워러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/shower-habit/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🚿</span>
              <span>당신의 샤워 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.description.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Traits */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💧</span>
              <span>당신의 샤워 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg"
                >
                  <p className="font-medium text-center">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Picks */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🧴</span>
              <span>추천 샤워 루틴</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg"
                >
                  <p className="font-medium text-center">{pick}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💡</span>
              <span>샤워 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-blue-500 font-bold">{index + 1}.</span>
                  <p className="text-lg leading-relaxed text-muted-foreground flex-1">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Match */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 궁합</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-muted-foreground">{character.match}</p>
          </CardContent>
        </Card>

        {/* Other Tests */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "instagram-story",
                  title: "인스타그램 스토리 스타일",
                  emoji: "📸",
                  description: "스토리 올리는 방식으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "pizza-topping",
                  title: "피자 토핑 선택",
                  emoji: "🍕",
                  description: "피자 토핑으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "hamburger-combo",
                  title: "햄버거 조합 스타일",
                  emoji: "🍔",
                  description: "햄버거 조합으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "coffee-mbti",
                  title: "커피 MBTI",
                  emoji: "☕",
                  description: "커피 취향으로 알아보는 성격",
                  participants: "12.5K",
                },
              ].map((test) => (
                <Card key={test.slug} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{test.emoji}</div>
                    <h3 className="font-bold mb-2">{test.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                    <p className="text-xs text-muted-foreground mb-4">{test.participants}명 참여</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/tests/${test.slug}`}>테스트 하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-blue-300 hover:bg-blue-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function ShowerHabitResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

