"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, UtensilsCrossed, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const lunchCharacters = {
  ENFP: {
    name: "즉흥 미식러",
    emoji: "🎈",
    summary: "오늘의 기분이 메뉴다!",
    description: [
      "오늘의 기분이 메뉴가 되는 당신은 즉흥 미식러예요. 그때 기분 따라 선택하고, 새로운 맛집 제안이 오면 일단 도전해요.",
      "주도해서 정하고, 줄 길어도 맛있으면 감수하며, 오늘의 기분/감성을 기준으로 메뉴를 선택하는 자유로운 스타일이에요.",
      "매번 새로 가보고, 도전! 다음 단계로 매운맛을 선택하며, 카페 한 잔은 필수인 새로운 맛집·팝업에 강한 스타일이에요.",
    ],
    recommendedMenu: ["신메뉴", "퓨전", "마라"],
    recommendedAction: "오늘의 기분에 맞춰 선택하되, 가끔은 계획적인 점심도 즐겨보세요!",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
    shareText: "나는 🎯 즉흥 미식러(ENFP)! 너는 어떤 점심러야?",
  },
  ENFJ: {
    name: "배려 캡틴",
    emoji: "🤝",
    summary: "모두가 만족하는 선택",
    description: [
      "모두가 만족하는 선택을 하는 당신은 배려 캡틴예요. 주도해서 정하지만, 중간지점을 타협하며, 오늘의 기분/감성을 기준으로 메뉴를 선택해요.",
      "걷기 겸 외식하며, 줄 길어도 맛있으면 감수하는 의견 수렴·조율형 스타일이에요.",
      "모두를 챙기며 함께 즐기는 따뜻한 스타일이에요.",
    ],
    recommendedMenu: ["샤브", "뷔페", "쉐어 메뉴"],
    recommendedAction: "모두를 챙기되, 자신의 취향도 잊지 마세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
    shareText: "나는 🎯 배려 캡틴(ENFJ)! 너는 어떤 점심러야?",
  },
  ENTJ: {
    name: "전략 결정러",
    emoji: "🎯",
    summary: "시간·동선 최적화",
    description: [
      "시간과 동선을 최적화하는 당신은 전략 결정러예요. 미리 정해둔 곳으로 가고, 검증된 곳이 안전하다고 생각하며, 주도해서 정해요.",
      "가까운 곳이 우선이고, 영양/가성비를 기준으로 메뉴를 선택하며, 바로 결제하는 예약·동선 설계형 스타일이에요.",
      "효율 위해 배달을 선택하고, 바로 자리 복귀/정리하는 전략적인 스타일이에요.",
    ],
    recommendedMenu: ["샐러드볼+프로틴", "패스트 캐주얼"],
    recommendedAction: "전략적으로 선택하되, 가끔은 여유롭게 즐기는 것도 좋아요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
    shareText: "나는 🎯 전략 결정러(ENTJ)! 너는 어떤 점심러야?",
  },
  ENTP: {
    name: "실험가",
    emoji: "🧪",
    summary: "'맛있는 이유'가 궁금",
    description: [
      "'맛있는 이유'가 궁금한 당신은 실험가예요. 그때 기분 따라 선택하고, 새로운 맛집 제안이 오면 일단 도전해요.",
      "주도해서 정하고, 분위기 좋은 카페식을 선택하며, 더 찾아보는 나인 리뷰탐색·신메뉴 도전형 스타일이에요.",
      "매번 새로 가보고, 도전! 다음 단계로 매운맛을 선택하며, 카페 한 잔은 필수인 호기심 많은 스타일이에요.",
    ],
    recommendedMenu: ["수제버거", "이색국수"],
    recommendedAction: "새로운 것을 탐험하되, 가끔은 검증된 메뉴도 즐겨보세요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
    shareText: "나는 🎯 실험가(ENTP)! 너는 어떤 점심러야?",
  },
  ESFJ: {
    name: "케어 호스트",
    emoji: "😊",
    summary: "동료와 함께 즐김",
    description: [
      "동료와 함께 즐기는 당신은 케어 호스트예요. 미리 정해둔 곳으로 가지만, 검증된 곳이 안전하다고 생각하며, 주도해서 정해요.",
      "중간지점을 타협하고, 따끈한 국물을 선택하며, 단골을 만드는 단체 테이블 선호형 스타일이에요.",
      "걷기 겸 외식하며, 바로 자리 복귀/정리하는 따뜻한 스타일이에요.",
    ],
    recommendedMenu: ["한식백반", "분식 공유"],
    recommendedAction: "모두와 함께 즐기되, 자신의 시간도 가지세요.",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
    shareText: "나는 🎯 케어 호스트(ESFJ)! 너는 어떤 점심러야?",
  },
  ESFP: {
    name: "트렌드 테이스터",
    emoji: "📸",
    summary: "맛+사진이 행복",
    description: [
      "맛+사진이 행복인 당신은 트렌드 테이스터예요. 그때 기분 따라 선택하고, 새로운 맛집 제안이 오면 일단 도전해요.",
      "주도해서 정하고, 오늘의 기분/감성을 기준으로 메뉴를 선택하며, 분위기 좋은 카페식을 선택하는 핫플·시그니처형 스타일이에요.",
      "매번 새로 가보고, 걷기 겸 외식하며, 카페 한 잔은 필수인 트렌디한 스타일이에요.",
    ],
    recommendedMenu: ["크로플 브런치", "디저트 코스"],
    recommendedAction: "트렌드를 즐기되, 가끔은 정리도 해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
    shareText: "나는 🎯 트렌드 테이스터(ESFP)! 너는 어떤 점심러야?",
  },
  ESTJ: {
    name: "효율 점심러",
    emoji: "📋",
    summary: "10분 내 주문 완료",
    description: [
      "10분 내 주문 완료하는 당신은 효율 점심러예요. 미리 정해둔 곳으로 가고, 검증된 곳이 안전하다고 생각하며, 주도해서 정해요.",
      "가까운 곳이 우선이고, 영양/가성비를 기준으로 메뉴를 선택하며, 다수결/규칙으로 결정하는 대기 짧은 검증집형 스타일이에요.",
      "단골을 만들고, 효율 위해 배달을 선택하며, 바로 자리 복귀/정리하는 현실적인 스타일이에요.",
    ],
    recommendedMenu: ["분식", "덮밥", "패스트 캐주얼"],
    recommendedAction: "효율적으로 선택하되, 가끔은 여유롭게 즐기는 것도 좋아요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
    shareText: "나는 🎯 효율 점심러(ESTJ)! 너는 어떤 점심러야?",
  },
  ESTP: {
    name: "속전속결러",
    emoji: "⚡",
    summary: "보고 바로 선택",
    description: [
      "보고 바로 선택하는 당신은 속전속결러예요. 그때 기분 따라 선택하고, 새로운 맛집 제안이 오면 일단 도전해요.",
      "주도해서 정하고, 가까운 곳이 우선이며, 바로 결제하는 줄 짧고 임팩트형 스타일이에요.",
      "매번 새로 가보고, 걷기 겸 외식하며, 카페 한 잔은 필수인 실행력 있는 스타일이에요.",
    ],
    recommendedMenu: ["김밥+라면", "돈카츠"],
    recommendedAction: "빠르게 선택하되, 가끔은 신중하게 고민해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
    shareText: "나는 🎯 속전속결러(ESTP)! 너는 어떤 점심러야?",
  },
  INFP: {
    name: "감성 혼밥러",
    emoji: "🌙",
    summary: "조용히 취향 즐김",
    description: [
      "조용히 취향을 즐기는 당신은 감성 혼밥러예요. 그때 기분 따라 선택하고, 검증된 곳이 안전하다고 생각하며, 후보만 던지고 의견 묻기예요.",
      "줄 길어도 맛있으면 감수하고, 오늘의 기분/감성을 기준으로 메뉴를 선택하며, 중간지점을 타협하는 아늑·감성 위주형 스타일이에요.",
      "단골을 만들고, 효율 위해 배달을 선택하며, 카페 한 잔은 필수인 내면형 스타일이에요.",
    ],
    recommendedMenu: ["수프/키시", "잔잔한 카페식"],
    recommendedAction: "감성에 따라 선택하되, 가끔은 실용적인 메뉴도 즐겨보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
    shareText: "나는 🎯 감성 혼밥러(INFP)! 너는 어떤 점심러야?",
  },
  INFJ: {
    name: "사색 식사러",
    emoji: "📖",
    summary: "의미와 컨셉 중시",
    description: [
      "의미와 컨셉을 중시하는 당신은 사색 식사러예요. 미리 정해둔 곳으로 가지만, 새로운 맛집 제안이 오면 일단 도전해요.",
      "후보만 던지고 의견 묻고, 줄 길어도 맛있으면 감수하며, 오늘의 기분/감성을 기준으로 메뉴를 선택하는 철학있는 식당·브랜드형 스타일이에요.",
      "분위기 좋은 카페식을 선택하고, 효율 위해 배달을 선택하며, 카페 한 잔은 필수인 깊이 있는 스타일이에요.",
    ],
    recommendedMenu: ["비건볼", "슬로우푸드"],
    recommendedAction: "의미 있는 선택은 좋지만, 가끔은 즉흥적으로 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
    shareText: "나는 🎯 사색 식사러(INFJ)! 너는 어떤 점심러야?",
  },
  INTJ: {
    name: "최적화 플래너",
    emoji: "🧠",
    summary: "영양/가격/거리 균형",
    description: [
      "영양·가격·거리의 균형을 계산하는 당신은 최적화 플래너예요. 미리 정해둔 곳으로 가고, 검증된 곳이 안전하다고 생각하며, 후보만 던지고 의견 묻기예요.",
      "가까운 곳이 우선이고, 영양/가성비를 기준으로 메뉴를 선택하며, 다수결/규칙으로 결정하는 루틴·식단관리형 스타일이에요.",
      "단골을 만들고, 효율 위해 배달을 선택하며, 바로 자리 복귀/정리하는 전략적인 스타일이에요.",
    ],
    recommendedMenu: ["압밥/저염식", "샐러드 루틴"],
    recommendedAction: "최적화된 선택은 좋지만, 가끔은 감성 쇼핑도 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
    shareText: "나는 🎯 최적화 플래너(INTJ)! 너는 어떤 점심러야?",
  },
  INTP: {
    name: "분석 미식러",
    emoji: "🔬",
    summary: "리뷰·원가·구성 분석",
    description: [
      "리뷰·원가·구성을 분석하는 당신은 분석 미식러예요. 미리 정해둔 곳으로 가지만, 새로운 맛집 제안이 오면 일단 도전해요.",
      "후보만 던지고 의견 묻고, 가까운 곳이 우선이며, 영양/가성비를 기준으로 메뉴를 선택하는 데이터형 선택 스타일이에요.",
      "매번 새로 가보고, 효율 위해 배달을 선택하며, 카페 한 잔은 필수인 탐구적인 스타일이에요.",
    ],
    recommendedMenu: ["런치세트", "신메뉴 비교"],
    recommendedAction: "분석적인 선택은 좋지만, 가끔은 감으로 선택해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
    shareText: "나는 🎯 분석 미식러(INTP)! 너는 어떤 점심러야?",
  },
  ISFJ: {
    name: "안정 단골러",
    emoji: "🧸",
    summary: "늘 그 자리 그 맛",
    description: [
      "늘 그 자리 그 맛인 당신은 안정 단골러예요. 미리 정해둔 곳으로 가고, 검증된 곳이 안전하다고 생각하며, 후보만 던지고 의견 묻기예요.",
      "줄 길어도 맛있으면 감수하고, 따끈한 국물을 선택하며, 중간지점을 타협하는 단골·사장님 친화형 스타일이에요.",
      "단골을 만들고, 효율 위해 배달을 선택하며, 바로 자리 복귀/정리하는 안정적인 스타일이에요.",
    ],
    recommendedMenu: ["집밥 백반", "순한 면류"],
    recommendedAction: "안정적인 선택은 좋지만, 가끔은 새로운 메뉴도 시도해보세요.",
    compatibleTypes: ["ESFP", "ESTP", "ESFJ"],
    shareText: "나는 🎯 안정 단골러(ISFJ)! 너는 어떤 점심러야?",
  },
  ISFP: {
    name: "감각 힐링러",
    emoji: "🌷",
    summary: "식사가 휴식",
    description: [
      "식사가 휴식인 당신은 감각 힐링러예요. 그때 기분 따라 선택하고, 검증된 곳이 안전하다고 생각하며, 후보만 던지고 의견 묻기예요.",
      "줄 길어도 맛있으면 감수하고, 오늘의 기분/감성을 기준으로 메뉴를 선택하며, 분위기 좋은 카페식을 선택하는 공간·플레이팅형 스타일이에요.",
      "단골을 만들고, 효율 위해 배달을 선택하며, 카페 한 잔은 필수인 감성적인 스타일이에요.",
    ],
    recommendedMenu: ["브런치", "파스타·리조또"],
    recommendedAction: "감성에 따라 선택하되, 가끔은 실용적인 메뉴도 즐겨보세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESTJ"],
    shareText: "나는 🎯 감각 힐링러(ISFP)! 너는 어떤 점심러야?",
  },
  ISTJ: {
    name: "정석 식사러",
    emoji: "📦",
    summary: "규칙·시간엄수",
    description: [
      "규칙·시간을 엄수하는 당신은 정석 식사러예요. 미리 정해둔 곳으로 가고, 검증된 곳이 안전하다고 생각하며, 후보만 던지고 의견 묻기예요.",
      "가까운 곳이 우선이고, 영양/가성비를 기준으로 메뉴를 선택하며, 다수결/규칙으로 결정하는 일정한 루틴형 스타일이에요.",
      "단골을 만들고, 효율 위해 배달을 선택하며, 바로 자리 복귀/정리하는 체계적인 스타일이에요.",
    ],
    recommendedMenu: ["정해진 코스", "사내식당"],
    recommendedAction: "규칙적인 선택은 좋지만, 가끔은 새로운 메뉴도 시도해보세요.",
    compatibleTypes: ["ESFP", "ENFP", "ESTP"],
    shareText: "나는 🎯 정석 식사러(ISTJ)! 너는 어떤 점심러야?",
  },
  ISTP: {
    name: "실용 선택러",
    emoji: "🛠",
    summary: "가성비·속도 중심",
    description: [
      "가성비·속도를 중심으로 하는 당신은 실용 선택러예요. 그때 기분 따라 선택하지만, 검증된 곳이 안전하다고 생각하며, 후보만 던지고 의견 묻기예요.",
      "가까운 곳이 우선이고, 영양/가성비를 기준으로 메뉴를 선택하며, 바로 결제하는 간단·담백 선호형 스타일이에요.",
      "단골을 만들고, 효율 위해 배달을 선택하며, 바로 자리 복귀/정리하는 실용적인 스타일이에요.",
    ],
    recommendedMenu: ["편의점 콤보", "김치볶음밥"],
    recommendedAction: "실용적인 선택은 좋지만, 가끔은 감성 쇼핑도 즐겨보세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
    shareText: "나는 🎯 실용 선택러(ISTP)! 너는 어떤 점심러야?",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof lunchCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = lunchCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 dark:from-orange-950 dark:via-red-950 dark:to-amber-950">
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
                  className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="lunch-style"
                  testPath="/tests/lunch-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={character.shareText}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/lunch-style/test">
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
              <span>🍱</span>
              <span>당신의 점심 선택 스타일</span>
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

        {/* Recommended Menu & Action Tip */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🍴</span>
              <span>추천 메뉴 & 점심 꿀팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong>추천 메뉴:</strong> {character.recommendedMenu.join(", ")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong>점심 꿀팁:</strong> {character.recommendedAction}
            </p>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 점심 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = lunchCharacters[type as keyof typeof lunchCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg text-center"
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
              <Sparkles className="h-6 w-6 text-red-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  slug: "coffee-mbti",
                  title: "커피 MBTI",
                  emoji: "☕",
                  description: "커피 취향으로 알아보는 성격",
                  participants: "12.5K",
                },
                {
                  slug: "food-delivery",
                  title: "배달 음식 선택",
                  emoji: "🍕",
                  description: "배달 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "dessert-style",
                  title: "디저트 취향",
                  emoji: "🍰",
                  description: "디저트 취향으로 알아보는 성격",
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

export default function LunchStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

