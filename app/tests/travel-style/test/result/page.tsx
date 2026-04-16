"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const travelCharacters = {
  ENFP: {
    name: "즉흥 여행러",
    emoji: "🎈",
    summary: "캐리어보다 감정이 먼저!",
    description: [
      "캐리어보다 감정이 먼저인 당신! 짐은 전날 감으로 챙기며, 가서 분위기에 맞춰 옷을 고르는 즉흥적인 여행 스타일이에요.",
      "감으로 대충 맞추며, 약국은 어디든 있지라고 생각하는 자유로운 스타일이에요.",
      "짐보다 추억이 중요해요. 즉흥의 매력을 믿으세요.",
    ],
    recommendedDestinations: ["치앙마이", "바르셀로나"],
    recommendedAction: "짐보다 추억이 중요해요. 즉흥의 매력을 믿으세요.",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "몽상 여행러",
    emoji: "🌙",
    summary: "감정 따라 길 위를 걷는 사람",
    description: [
      "감정 따라 길 위를 걷는 당신! 짐은 전날 감으로 챙기며, 감으로 대충 맞추는 스타일이에요.",
      "가서 분위기에 맞춰 옷을 고르고, 그날 쇼핑으로 해결하는 여유로운 여행러예요.",
      "감성과 여유를 중시하며, 순간 감성 우선으로 사진을 찍어요.",
    ],
    recommendedDestinations: ["교토", "포르투갈"],
    recommendedAction: "감정에 따라 여행을 즐기되, 기본적인 준비는 미리 해두세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "계획 리더러",
    emoji: "🤝",
    summary: "일정표로 모두를 이끄는 타입",
    description: [
      "일정표로 모두를 이끄는 당신! 리스트부터 만들고, 날짜별 코디를 미리 정하는 계획적인 스타일이에요.",
      "비상약은 혹시 몰라 다 넣고, 옷·화장품·전자기기를 구역별로 정리하는 꼼꼼함을 가지고 있어요.",
      "사회적이고 배려심이 많은 여행 리더예요.",
    ],
    recommendedDestinations: ["파리", "도쿄"],
    recommendedAction: "모두를 챙기되, 자신의 여유도 잊지 마세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "사색 여행러",
    emoji: "📖",
    summary: "조용히 의미 있는 여정 추구",
    description: [
      "조용히 의미 있는 여정을 추구하는 당신! 리스트부터 만들지만, 가서 분위기에 맞춰 옷을 고르는 스타일이에요.",
      "감으로 대충 맞추지만, 순간 감성 우선으로 사진을 찍는 깊이 있는 여행러예요.",
      "깊이와 내면을 중시하며, 돌아다니다 끌리는 곳에서 식사해요.",
    ],
    recommendedDestinations: ["아이슬란드", "프라하"],
    recommendedAction: "의미 있는 여정을 추구하되, 준비도 잊지 마세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "모험 여행러",
    emoji: "🧪",
    summary: "즉흥 결정과 실험 정신 가득",
    description: [
      "즉흥 결정과 실험 정신이 가득한 당신! 짐은 전날 감으로 챙기며, 가서 분위기에 맞춰 옷을 고르는 스타일이에요.",
      "감으로 대충 맞추고, 약국은 어디든 있지라고 생각하는 호기심 많은 여행러예요.",
      "도전과 호기심을 즐기며, 눈에 띄는 대로 기념품을 구매해요.",
    ],
    recommendedDestinations: ["발리", "뉴질랜드"],
    recommendedAction: "즉흥의 매력을 즐기되, 기본적인 준비는 미리 해두세요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "탐구 여행러",
    emoji: "🔬",
    summary: "목적보다 과정에 흥미",
    description: [
      "목적보다 과정에 흥미를 가지는 당신! 리스트부터 만들지만, 가서 분위기에 맞춰 옷을 고르는 스타일이에요.",
      "무게 확인을 필수로 하며, 일정 체크하며 기다리는 분석적인 여행러예요.",
      "호기심과 관찰을 즐기며, 배경·구도 완벽하게 사진을 찍어요.",
    ],
    recommendedDestinations: ["베를린", "타이페이"],
    recommendedAction: "과정을 즐기되, 목적도 잊지 마세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "완벽 준비형",
    emoji: "🧱",
    summary: "모든 걸 통제하는 완벽 플래너",
    description: [
      "모든 걸 통제하는 완벽 플래너인 당신! 리스트부터 만들고, 날짜별 코디를 미리 정하는 체계적인 스타일이에요.",
      "무게 확인 필수, 비상약은 혹시 몰라 다 넣고, 옷·화장품·전자기기를 구역별로 정리하는 완벽주의자예요.",
      "효율과 리더십을 중시하며, 맛집 예약을 필수로 해요.",
    ],
    recommendedDestinations: ["뉴욕", "런던"],
    recommendedAction: "완벽한 계획도 여유를 두고 준비하세요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "전략 여행러",
    emoji: "📐",
    summary: "동선·비용 완벽 계산형",
    description: [
      "동선과 비용을 완벽하게 계산하는 당신! 리스트부터 만들고, 날짜별 코디를 미리 정하는 전략적인 스타일이에요.",
      "무게 확인 필수, 비상약은 혹시 몰라 다 넣고, 옷·화장품·전자기기를 구역별로 정리하는 분석가예요.",
      "플랜은 완벽하지만 여유도 잊지 마세요.",
    ],
    recommendedDestinations: ["취리히", "코펜하겐"],
    recommendedAction: "플랜은 완벽하지만 여유도 잊지 마세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFJ: {
    name: "친구 챙김러",
    emoji: "😊",
    summary: "모두의 짐까지 챙기는 타입",
    description: [
      "모두의 짐까지 챙기는 당신! 리스트부터 만들고, 날짜별 코디를 미리 정하는 배려심 많은 스타일이에요.",
      "비상약은 혹시 몰라 다 넣고, 옷·화장품·전자기기를 구역별로 정리하는 따뜻한 여행러예요.",
      "따뜻함과 조직력을 중시하며, 커피 마시며 여유롭게 기다려요.",
    ],
    recommendedDestinations: ["오사카", "방콕"],
    recommendedAction: "모두를 챙기되, 자신의 여유도 잊지 마세요.",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ESFP: {
    name: "감성 인플러",
    emoji: "📸",
    summary: "감각적 순간을 쫓는 사람",
    description: [
      "감각적 순간을 쫓는 당신! 짐은 전날 감으로 챙기며, 가서 분위기에 맞춰 옷을 고르는 표현력 있는 스타일이에요.",
      "감으로 대충 맞추고, 그날 쇼핑으로 해결하는 즉흥적인 여행러예요.",
      "표현력과 즉흥을 즐기며, 순간 감성 우선으로 사진을 찍어요.",
    ],
    recommendedDestinations: ["베네치아", "제주도"],
    recommendedAction: "순간을 즐기되, 기본적인 준비는 미리 해두세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ESTJ: {
    name: "일정 관리자",
    emoji: "📋",
    summary: "시간표와 규칙으로 무장",
    description: [
      "시간표와 규칙으로 무장한 당신! 리스트부터 만들고, 날짜별 코디를 미리 정하는 체계적인 스타일이에요.",
      "무게 확인 필수, 비상약은 혹시 몰라 다 넣고, 옷·화장품·전자기기를 구역별로 정리하는 효율적인 여행러예요.",
      "체계와 효율을 중시하며, 비행 2시간 전 도착을 원칙으로 해요.",
    ],
    recommendedDestinations: ["싱가포르", "스위스"],
    recommendedAction: "체계적으로 준비하되, 여유도 두세요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ESTP: {
    name: "속전속결러",
    emoji: "⚡",
    summary: "즉시 행동, 여행 고수형",
    description: [
      "즉시 행동하는 여행 고수인 당신! 짐은 전날 감으로 챙기며, 가서 분위기에 맞춰 옷을 고르는 행동력 있는 스타일이에요.",
      "감으로 대충 맞추고, 약국은 어디든 있지라고 생각하는 결단력 있는 여행러예요.",
      "행동력과 결단을 중시하며, 딱 맞춰 가도 됨이라고 생각해요.",
    ],
    recommendedDestinations: ["홍콩", "라스베이거스"],
    recommendedAction: "즉시 행동하되, 기본적인 준비는 미리 해두세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISFJ: {
    name: "정리된 여행러",
    emoji: "🧸",
    summary: "잊지 않고 챙기는 안정형",
    description: [
      "잊지 않고 챙기는 안정형 여행러인 당신! 리스트부터 만들고, 날짜별 코디를 미리 정하는 꼼꼼한 스타일이에요.",
      "비상약은 혹시 몰라 다 넣고, 옷·화장품·전자기기를 구역별로 정리하는 성실한 여행러예요.",
      "꼼꼼함과 성실함을 중시하며, 도착하자마자 정리해요.",
    ],
    recommendedDestinations: ["후쿠오카", "런던"],
    recommendedAction: "꼼꼼하게 준비하되, 여유도 두세요.",
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ISFP: {
    name: "힐링 여행러",
    emoji: "🌿",
    summary: "즉흥 감성, 여유 만끽",
    description: [
      "즉흥 감성으로 여유를 만끽하는 당신! 짐은 전날 감으로 챙기며, 가서 분위기에 맞춰 옷을 고르는 감성적인 스타일이에요.",
      "감으로 대충 맞추고, 그날 쇼핑으로 해결하는 자연을 사랑하는 여행러예요.",
      "감정과 자연을 중시하며, 순간 감성 우선으로 사진을 찍어요.",
    ],
    recommendedDestinations: ["제주", "치앙마이"],
    recommendedAction: "감성에 따라 여행을 즐기되, 기본적인 준비는 미리 해두세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ISTJ: {
    name: "루틴 여행러",
    emoji: "📦",
    summary: "준비물·동선 고정 루틴",
    description: [
      "준비물과 동선을 고정 루틴으로 하는 당신! 리스트부터 만들고, 날짜별 코디를 미리 정하는 규칙적인 스타일이에요.",
      "무게 확인 필수, 비상약은 혹시 몰라 다 넣고, 옷·화장품·전자기기를 구역별로 정리하는 신뢰할 수 있는 여행러예요.",
      "규칙과 신뢰를 중시하며, 도착하자마자 정리해요.",
    ],
    recommendedDestinations: ["도쿄", "바르셀로나"],
    recommendedAction: "루틴을 지키되, 새로운 경험도 즐겨보세요.",
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
  ISTP: {
    name: "실용 여행러",
    emoji: "🛠",
    summary: "최소한으로도 완벽한 여행",
    description: [
      "최소한으로도 완벽한 여행을 추구하는 당신! 리스트부터 만들지만, 가서 분위기에 맞춰 옷을 고르는 실용적인 스타일이에요.",
      "무게 확인을 필수로 하며, 일정 체크하며 기다리는 독립적인 여행러예요.",
      "단순함과 독립을 중시하며, 맛집 예약을 필수로 해요.",
    ],
    recommendedDestinations: ["괌", "하와이"],
    recommendedAction: "최소한으로 준비하되, 필수품은 잊지 마세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof travelCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = travelCharacters[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  // 결과 ID가 있으면 결과 정보 로드
  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((result) => {
          setLoadedResult({ id: result.id, testId: result.testId })
        })
        .catch((error) => {
          console.error('결과 로드 실패:', error)
        })
    }
  }, [resultId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Main Result */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Character Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="travel-style"
                  testPath="/tests/travel-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 ${character.emoji} ${character.name} (${mbtiType})!`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/travel-style/test">
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
              <span>🧳</span>
              <span>당신의 여행 스타일</span>
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

        {/* Recommended Destinations & Action */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>✈️</span>
              <span>추천 여행지 & 행동 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-cyan-950 dark:to-indigo-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">🌍 추천 여행지</div>
                  <div className="flex flex-wrap gap-2">
                    {character.recommendedDestinations.map((dest, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {dest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">💡 행동 팁</div>
                  <div className="text-muted-foreground">{character.recommendedAction}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💕</span>
              <span>잘 맞는 여행 파트너</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = travelCharacters[type as keyof typeof travelCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-cyan-950 dark:to-indigo-950 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">{compatibleChar.emoji}</div>
                    <div className="font-medium">{compatibleChar.name}</div>
                    <div className="text-sm text-muted-foreground">{type}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Other Tests */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🎯</span>
              <span>다른 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  slug: "cafe-style",
                  title: "카페 스타일",
                  emoji: "☕",
                  description: "카페 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "music-taste",
                  title: "음악 취향",
                  emoji: "🎧",
                  description: "플레이리스트로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "jachui",
                  title: "자취 밥상 스타일",
                  emoji: "🍳",
                  description: "자취 밥상 습관으로 알아보는 성격",
                  participants: "0",
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

        {/* 다른 테스트하기 버튼 */}
        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-cyan-300 hover:bg-cyan-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function TravelStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

