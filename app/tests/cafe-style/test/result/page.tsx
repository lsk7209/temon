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

const cafeCharacters = {
  ENFP: {
    name: "감성 탐험러",
    emoji: "🎈",
    summary: "분위기 따라 매번 다른 메뉴 선택",
    description: [
      "분위기에 따라 매번 다른 메뉴를 선택하는 당신! 새로운 시그니처 음료를 시도하는 것을 즐겨요.",
      "메뉴판부터 보는 즉흥적인 스타일이며, 카페 사진도 감성과 분위기 중심으로 찍어요.",
      "자유롭고 창의적인 카페 스타일이에요.",
    ],
    recommendedMenu: ["플랫화이트", "시그니처 음료"],
    recommendedSeat: "분위기 좋은 자리",
    recommendedAction: "오늘은 감성 충전용 카페 탐방 어때요?",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "혼자 힐링러",
    emoji: "🌙",
    summary: "음악·감정 몰입형",
    description: [
      "혼자 카페에 있을 때 집중 모드 ON인 당신! 조용하고 집중 가능한 곳을 선호하며, 음악에 몰입해요.",
      "늘 마시는 고정 메뉴를 좋아하며, 일단 커피 향을 즐기는 여유로운 스타일이에요.",
      "감정 환기를 위해 카페를 찾는 감성적인 카페러예요.",
    ],
    recommendedMenu: ["카푸치노", "마카롱"],
    recommendedSeat: "조용한 코너 자리",
    recommendedAction: "오늘은 마음에 드는 음악을 들으며 카페를 즐겨보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "대화 마스터",
    emoji: "🤝",
    summary: "친구와 수다·공감형 카페러",
    description: [
      "친구와 수다를 나누며 공감하는 당신! 북적북적 활기찬 곳을 좋아하며, 대화 중 상대가 고민 얘기를 하면 감정적으로 공감해요.",
      "주문이 밀릴 때 직원을 응원하며 웃는 따뜻한 마음을 가지고 있어요.",
      "음료를 다 마셔도 수다를 이어가며 여운을 즐기는 스타일이에요.",
    ],
    recommendedMenu: ["바닐라라떼", "디저트 세트"],
    recommendedSeat: "활기찬 중앙 자리",
    recommendedAction: "오늘은 친구와 함께 카페에서 수다를 나눠보세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "사색적 관찰자",
    emoji: "📖",
    summary: "조용한 코너석 고정",
    description: [
      "조용한 코너석을 고정 자리로 하는 당신! 깊이 있고 내면을 중시하는 카페 스타일이에요.",
      "새로운 시그니처를 시도하며, 카페 사진은 감성과 분위기 중심으로 찍어요.",
      "음료를 다 마셔도 여운을 즐기며, 감정 환기를 위해 카페를 찾아요.",
    ],
    recommendedMenu: ["드립커피", "허브티"],
    recommendedSeat: "조용한 코너 자리",
    recommendedAction: "오늘은 조용한 카페에서 한적하게 사색의 시간을 가져보세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "실험적 크리에이터",
    emoji: "🧪",
    summary: "신메뉴 발견 + 대화 주도형",
    description: [
      "신메뉴를 발견하고 대화를 주도하는 당신! 새로운 시그니처를 시도하며, 북적북적 활기찬 곳을 좋아해요.",
      "조언과 해결책을 제시하는 스타일이며, 분위기라며 음악을 즐기는 스타일이에요.",
      "도전적이고 아이디어가 넘치는 유머러스한 카페러예요.",
    ],
    recommendedMenu: ["시그니처 콜드브루", "크로플"],
    recommendedSeat: "활기찬 자리",
    recommendedAction: "오늘은 새로운 카페에서 신메뉴를 발견해보세요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "아이디어 연구러",
    emoji: "🔬",
    summary: "노트북+커피 = 몰입 모드",
    description: [
      "노트북과 커피로 몰입 모드에 빠지는 당신! 조용하고 집중 가능한 곳을 선호하며, 노트북과 책을 꺼내 준비하는 스타일이에요.",
      "기다리며 폰을 확인하고, 생산성 향상을 위해 카페를 찾아요.",
      "분석적이고 사색적인 카페 스타일이에요.",
    ],
    recommendedMenu: ["블랙티", "필터커피"],
    recommendedSeat: "집중 가능한 조용한 자리",
    recommendedAction: "오늘은 노트북과 함께 아이디어를 연구하는 시간을 가져보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "목표 달성러",
    emoji: "🧱",
    summary: "카페는 업무 전초기지",
    description: [
      "카페를 업무 전초기지로 활용하는 당신! 자리를 먼저 찾고, 노트북과 책을 꺼내 준비하는 계획적인 스타일이에요.",
      "늘 마시는 고정 메뉴를 선호하며, 집중 방해가 되면 자리를 옮겨요.",
      "계획적이고 효율적인 카페 스타일이에요.",
    ],
    recommendedMenu: ["아메리카노", "콜드브루"],
    recommendedSeat: "집중 가능한 조용한 자리",
    recommendedAction: "오늘은 목표를 달성하기 위한 업무 시간을 카페에서 보내보세요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "계획형 카공러",
    emoji: "📐",
    summary: "루틴 중심 효율형",
    description: [
      "루틴을 중심으로 효율적으로 카페를 활용하는 당신! 자리를 먼저 찾고, 노트북과 책을 꺼내 준비하는 계획적인 스타일이에요.",
      "늘 마시는 고정 메뉴를 선호하며, 동행이 늦으면 폰으로 일정을 확인해요.",
      "전략적이고 성취 지향적인 카페 스타일이에요.",
    ],
    recommendedMenu: ["아메리카노", "더치커피"],
    recommendedSeat: "정해진 자리",
    recommendedAction: "집중이 필요한 날엔 익숙한 자리에 앉아보세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFJ: {
    name: "모두의 친구형",
    emoji: "😊",
    summary: "분위기 맞추는 밸런스형",
    description: [
      "모두와 어울리며 분위기를 맞추는 당신! 북적북적 활기찬 곳을 좋아하며, 감정적으로 공감하는 스타일이에요.",
      "직원을 응원하며 웃고, 수다를 이어가며 여운을 즐기는 스타일이에요.",
      "사회적이고 감정을 공유하는 카페러예요.",
    ],
    recommendedMenu: ["라떼", "티라미수"],
    recommendedSeat: "활기찬 중앙 자리",
    recommendedAction: "오늘은 친구들과 함께 카페에서 즐거운 시간을 보내보세요.",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ESFP: {
    name: "감성 포토러",
    emoji: "📸",
    summary: "인증샷 필수! 순간 즐기기형",
    description: [
      "인증샷을 필수로 찍는 당신! 감성과 분위기 중심으로 카페 사진을 찍으며, 사람 구경하며 힐링하는 스타일이에요.",
      "새로운 시그니처를 시도하며, 분위기라며 음악을 즐겨요.",
      "트렌디하고 표현력이 뛰어난 카페러예요.",
    ],
    recommendedMenu: ["밀크티", "크로플"],
    recommendedSeat: "인증샷 찍기 좋은 자리",
    recommendedAction: "오늘은 예쁜 카페에서 인증샷을 찍어보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ESTJ: {
    name: "업무 카공러",
    emoji: "📋",
    summary: "일정·생산성 중심",
    description: [
      "일정과 생산성을 중심으로 카페를 활용하는 당신! 자리를 먼저 찾고, 노트북과 책을 꺼내 준비하는 체계적인 스타일이에요.",
      "늘 마시는 고정 메뉴를 선호하며, 집중 방해가 되면 자리를 옮겨요.",
      "체계적이고 집중력이 높은 카페러예요.",
    ],
    recommendedMenu: ["아메리카노", "블랙커피"],
    recommendedSeat: "집중 가능한 조용한 자리",
    recommendedAction: "오늘은 일정을 정리하며 생산성을 높이는 시간을 가져보세요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ESTP: {
    name: "속전속결러",
    emoji: "⚡",
    summary: "테이크아웃 빠른 결정형",
    description: [
      "테이크아웃으로 빠르게 결정하는 당신! 메뉴판부터 보는 즉흥적인 스타일이며, 사람 구경하며 힐링하는 스타일이에요.",
      "주문이 밀릴 때 직원을 응원하며 웃고, 음료를 다 마시면 바로 나가는 스타일이에요.",
      "직관적이고 실행력이 빠른 카페러예요.",
    ],
    recommendedMenu: ["아이스라떼", "토스트"],
    recommendedSeat: "빠르게 이용 가능한 자리",
    recommendedAction: "오늘은 테이크아웃으로 빠르게 카페를 즐겨보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISFJ: {
    name: "정성 챙김러",
    emoji: "🧸",
    summary: "익숙한 단골 카페 선호",
    description: [
      "익숙한 단골 카페를 선호하는 당신! 조용하고 집중 가능한 곳을 좋아하며, 늘 마시는 고정 메뉴를 선호해요.",
      "감정적으로 공감하며, 일단 커피 향을 즐기는 여유로운 스타일이에요.",
      "안정적이고 배려심이 많은 카페러예요.",
    ],
    recommendedMenu: ["라떼", "스콘"],
    recommendedSeat: "익숙한 자리",
    recommendedAction: "오늘은 단골 카페에서 여유롭게 시간을 보내보세요.",
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ISFP: {
    name: "감각형 힐러",
    emoji: "🌿",
    summary: "조용히 감성 충전",
    description: [
      "조용히 감성 충전하는 당신! 조용하고 집중 가능한 곳을 선호하며, 새로운 시그니처를 시도하는 스타일이에요.",
      "감정적으로 공감하며, 카페 사진은 감성과 분위기 중심으로 찍어요.",
      "부드럽고 감각적인 카페러예요.",
    ],
    recommendedMenu: ["카라멜라떼", "쿠키"],
    recommendedSeat: "조용한 코너 자리",
    recommendedAction: "오늘은 조용한 카페에서 감성 충전의 시간을 가져보세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ISTJ: {
    name: "루틴 카공러",
    emoji: "📦",
    summary: "정해진 자리·시간 고수",
    description: [
      "정해진 자리와 시간을 고수하는 당신! 자리를 먼저 찾고, 늘 마시는 고정 메뉴를 선호하는 규칙적인 스타일이에요.",
      "조용하고 집중 가능한 곳을 좋아하며, 노트북과 책을 꺼내 준비하는 스타일이에요.",
      "규칙적이고 성실한 카페러예요.",
    ],
    recommendedMenu: ["아메리카노", "샌드위치"],
    recommendedSeat: "정해진 자리",
    recommendedAction: "오늘은 정해진 루틴대로 카페를 즐겨보세요.",
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
  ISTP: {
    name: "효율 마스터",
    emoji: "🛠",
    summary: "최소 동선, 실용적 선택",
    description: [
      "최소 동선으로 실용적인 선택을 하는 당신! 메뉴판부터 보는 즉흥적인 스타일이며, 집중 모드 ON인 스타일이에요.",
      "기다리며 폰을 확인하고, 생산성 향상을 위해 카페를 찾아요.",
      "실용적이고 독립적인 카페러예요.",
    ],
    recommendedMenu: ["에스프레소", "브라우니"],
    recommendedSeat: "효율적인 자리",
    recommendedAction: "오늘은 최소 동선으로 효율적으로 카페를 활용해보세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof cafeCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = cafeCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 dark:from-amber-950 dark:via-orange-950 dark:to-brown-950">
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
                  className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="cafe-style"
                  testPath="/tests/cafe-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 ${character.emoji} ${character.name} (${mbtiType})!`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/cafe-style/test">
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
              <span>☕</span>
              <span>당신의 카페 스타일</span>
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

        {/* Recommended Menu & Action */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>☕</span>
              <span>추천 메뉴 & 활동</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-amber-50 to-brown-50 dark:from-amber-950 dark:to-brown-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">☕ 추천 메뉴</div>
                  <div className="flex flex-wrap gap-2">
                    {character.recommendedMenu.map((menu, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {menu}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-brown-50 dark:from-amber-950 dark:to-brown-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">💺 추천 좌석</div>
                  <div className="text-muted-foreground">{character.recommendedSeat}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-brown-50 dark:from-orange-950 dark:to-brown-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">💡 추천 활동</div>
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
              <span>잘 맞는 카페 파트너</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = cafeCharacters[type as keyof typeof cafeCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-amber-50 to-brown-50 dark:from-amber-950 dark:to-brown-950 rounded-lg text-center"
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
                  slug: "music-taste",
                  title: "음악 취향 성격 테스트",
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

export default function CafeStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

