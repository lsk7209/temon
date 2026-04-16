"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Music, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const karaokeTypes = {
  ENFP: {
    label: "즉흥 파티형",
    summary: "그때그때 다른 곡으로 분위기를 띄우는 활발한 타입",
    description: [
      "노래방에 가면 그때그때 다른 곡을 선택하는 당신! 분위기에 맞춰서 곡을 고르고, 모두가 즐거워하는 곡을 선택해요.",
      "노래를 부를 때도 열정적으로 부르고, 분위기를 띄우는 것을 좋아해요. 다양한 장르를 시도하며 새로운 경험을 즐겨요.",
      "노래 후기도 공유하고, 경험을 나누는 것을 좋아하며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["다양한 곡", "열정적 부르기", "분위기 띄우기"],
    picks: ["트렌디한 곡", "인기곡", "다양한 장르"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "감성 몰입형",
    summary: "나만의 취향 곡으로 조용히 몰입하는 감성형",
    description: [
      "노래방에 가면 나만의 취향 곡을 선택하는 당신! 특별한 의미가 있는 곡, 감성적인 곡을 좋아해요.",
      "노래를 부를 때도 조용히 부드럽게 부르며, 그 순간에 몰입하는 것을 좋아해요.",
      "혼자 조용히 노래를 즐기며, 그 순간의 감정을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["나만의 취향", "조용히 부르기", "감성 몰입"],
    picks: ["감성적인 곡", "특별한 의미", "부드러운 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "소통 리더형",
    summary: "모두가 즐거워할 곡으로 소통하는 리더형",
    description: [
      "노래방에 가면 모두가 즐거워할 곡을 선택하는 당신! 분위기를 띄우고, 모두가 함께 즐길 수 있는 곡을 골라요.",
      "노래를 부를 때도 열정적으로 부르고, 모두가 함께 즐거워하는 모습을 만들어요.",
      "노래 후기도 공유하고, 경험을 나누며, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["모두가 즐거워", "열정적 부르기", "소통 중시"],
    picks: ["인기곡", "함께 부르기", "분위기 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 있는 선택형",
    summary: "의미 있는 곡을 선택하여 깊이 있게 부르는 큐레이터형",
    description: [
      "노래방에 가면 의미 있는 곡을 선택하는 당신! 단순히 인기곡이 아니라, 특별한 의미가 있는 곡을 골라요.",
      "노래를 부를 때도 깊이 있게 부르며, 그 곡의 의미를 전달하는 것을 좋아해요.",
      "혼자 조용히 노래를 즐기며, 그 순간의 감정과 의미를 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["의미 있는 곡", "깊이 있게 부르기", "감성 전달"],
    picks: ["특별한 의미", "깊이 있는 곡", "감성적인 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 탐구형",
    summary: "새로운 곡과 장르를 실험하며 탐구하는 탐구형",
    description: [
      "노래방에 가면 새로운 곡과 장르를 실험하는 당신! 다양한 장르를 시도하고, 새로운 경험을 즐겨요.",
      "노래를 부를 때도 다양한 스타일을 시도하며, 어떤 스타일이 가장 잘 맞는지 탐구해요.",
      "사람들과 함께 있을 때는 새로운 곡을 제안하며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["새로운 시도", "다양한 장르", "실험 정신"],
    picks: ["새로운 곡", "다양한 장르", "실험적 스타일"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석 연습형",
    summary: "기술을 분석하며 실력을 향상시키는 분석가형",
    description: [
      "노래방에 가면 실력 향상을 위한 곡을 선택하는 당신! 기술을 분석하고, 연습하는 것을 좋아해요.",
      "노래를 부를 때도 기술에 집중하며, 어떤 부분을 개선할 수 있는지 생각해요.",
      "혼자 조용히 노래를 연습하며, 실력을 향상시키는 것을 목표로 해요.",
    ],
    traits: ["기술 분석", "실력 향상", "연습 중시"],
    picks: ["도전 곡", "기술 연습", "실력 향상"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 리더형",
    summary: "전략적으로 계획하여 목표를 달성하는 리더형",
    description: [
      "노래방에 가면 전략적으로 계획하는 당신! 미리 곡을 정해두고, 목표에 맞게 선택해요.",
      "노래를 부를 때도 목표를 달성하기 위해 노력하며, 효율적으로 연습해요.",
      "사람들과 함께 있을 때는 모두가 즐거워할 수 있도록 분위기를 만들고, 목표를 달성해요.",
    ],
    traits: ["전략적 계획", "목표 달성", "효율적 연습"],
    picks: ["목표 곡", "전략적 선택", "효율적 연습"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 연습형",
    summary: "완벽하게 부르기 위해 연습하는 큐레이터형",
    description: [
      "노래방에 가면 완벽하게 부를 수 있는 곡을 선택하는 당신! 미리 연습하고, 완벽하게 부르는 것을 목표로 해요.",
      "노래를 부를 때도 기술에 집중하며, 완벽한 연주를 추구해요.",
      "혼자 조용히 노래를 연습하며, 완벽한 실력을 만드는 것을 좋아해요.",
    ],
    traits: ["완벽 추구", "기술 집중", "연습 중시"],
    picks: ["완벽한 곡", "기술 연습", "완벽한 연주"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 소통형",
    summary: "따뜻하게 부르며 모두가 즐거워하는 배려형",
    description: [
      "노래방에 가면 모두가 즐거워할 곡을 선택하는 당신! 분위기를 띄우고, 모두가 함께 즐길 수 있는 곡을 골라요.",
      "노래를 부를 때도 따뜻하게 부르며, 모두가 즐거워하는 모습을 만들어요.",
      "노래 후기도 공유하고, 경험을 나누며, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["따뜻한 부르기", "모두가 즐거워", "소통 중시"],
    picks: ["인기곡", "함께 부르기", "따뜻한 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 루틴형",
    summary: "안정적인 곡으로 루틴을 유지하는 수호자형",
    description: [
      "노래방에 가면 항상 같은 곡을 선택하는 당신! 안정적인 곡으로 루틴을 유지해요.",
      "노래를 부를 때도 조용히 부드럽게 부르며, 안정적인 느낌을 즐겨요.",
      "혼자 조용히 노래를 즐기며, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["안정적 곡", "조용히 부르기", "루틴 유지"],
    picks: ["단골 곡", "안정적인 곡", "부드러운 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 즐거움형",
    summary: "즉흥적으로 즐거운 곡으로 분위기를 띄우는 에너지형",
    description: [
      "노래방에 가면 즉흥적으로 즐거운 곡을 선택하는 당신! 분위기에 맞춰서 곡을 고르고, 모두가 즐거워하는 곡을 선택해요.",
      "노래를 부를 때도 열정적으로 부르고, 분위기를 띄우는 것을 좋아해요.",
      "사람들과 함께 있을 때는 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 선택", "열정적 부르기", "분위기 띄우기"],
    picks: ["즐거운 곡", "인기곡", "분위기 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 취향형",
    summary: "조용히 나만의 취향 곡을 즐기는 미니멀형",
    description: [
      "노래방에 가면 조용히 나만의 취향 곡을 선택하는 당신! 특별한 의미가 있는 곡, 감성적인 곡을 좋아해요.",
      "노래를 부를 때도 조용히 부드럽게 부르며, 그 순간에 몰입하는 것을 좋아해요.",
      "혼자 조용히 노래를 즐기며, 그 순간의 감정을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["나만의 취향", "조용히 부르기", "감성 몰입"],
    picks: ["감성적인 곡", "특별한 의미", "부드러운 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "계획 효율형",
    summary: "계획적으로 효율적으로 부르는 매니저형",
    description: [
      "노래방에 가면 계획적으로 곡을 선택하는 당신! 미리 곡을 정해두고, 효율적으로 부르는 것을 좋아해요.",
      "노래를 부를 때도 목표를 달성하기 위해 노력하며, 효율적으로 연습해요.",
      "사람들과 함께 있을 때는 모두가 즐거워할 수 있도록 분위기를 만들고, 효율적으로 처리해요.",
    ],
    traits: ["계획적 선택", "효율적 부르기", "목표 달성"],
    picks: ["계획된 곡", "효율적 선택", "목표 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 수호형",
    summary: "정해진 루틴으로 안정적으로 부르는 수호자형",
    description: [
      "노래방에 가면 항상 같은 곡을 선택하는 당신! 정해진 루틴으로 안정적으로 부르는 것을 좋아해요.",
      "노래를 부를 때도 조용히 부드럽게 부르며, 안정적인 느낌을 즐겨요.",
      "혼자 조용히 노래를 즐기며, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["정해진 루틴", "안정적 부르기", "일관성"],
    picks: ["단골 곡", "안정적인 곡", "부드러운 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 액션형",
    summary: "즉흥적으로 빠르게 부르며 분위기를 띄우는 액션형",
    description: [
      "노래방에 가면 즉흥적으로 빠르게 곡을 선택하는 당신! 분위기에 맞춰서 곡을 고르고, 모두가 즐거워하는 곡을 선택해요.",
      "노래를 부를 때도 열정적으로 부르고, 분위기를 띄우는 것을 좋아해요.",
      "사람들과 함께 있을 때는 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 선택", "빠른 부르기", "분위기 띄우기"],
    picks: ["즐거운 곡", "인기곡", "분위기 곡"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 연습형",
    summary: "실용적으로 부르며 효율적으로 연습하는 실용가형",
    description: [
      "노래방에 가면 실용적으로 곡을 선택하는 당신! 필요한 것만 선택하고, 효율적으로 부르는 것을 좋아해요.",
      "노래를 부를 때도 기술에 집중하며, 효율적으로 연습해요.",
      "혼자 조용히 노래를 연습하며, 실력을 향상시키는 것을 목표로 해요.",
    ],
    traits: ["실용적 선택", "효율적 부르기", "기술 집중"],
    picks: ["실용적 곡", "효율적 선택", "기술 연습"],
    tips: ["목 관리", "음정 연습", "다양한 장르 시도"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof karaokeTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = karaokeTypes[mbtiType]
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
                  className="mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="karaoke-song"
                  testPath="/tests/karaoke-song/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🎤 ${character.label}(${mbtiType})! 너는 어떤 노래방러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/karaoke-song/test">
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
              <span>🎤</span>
              <span>당신의 노래방 스타일</span>
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
              <span>🎵</span>
              <span>당신의 노래 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950 dark:to-red-950 rounded-lg"
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
              <span>🎶</span>
              <span>추천 곡 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950 dark:to-red-950 rounded-lg"
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
              <span>노래방 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-pink-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "gift-wrapping",
                  title: "포장지 뜯는 스타일",
                  emoji: "🎁",
                  description: "포장지 뜯는 방식으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "shower-habit",
                  title: "샤워 습관",
                  emoji: "🚿",
                  description: "샤워 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "instagram-story",
                  title: "인스타그램 스토리 스타일",
                  emoji: "📸",
                  description: "스토리 올리는 방식으로 알아보는 성격",
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
              className="border-2 border-pink-300 hover:bg-pink-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function KaraokeSongResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

