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

const jachuiCharacters = {
  ENFP: {
    name: "즉흥 요리러",
    emoji: "🎈",
    summary: "냉장고 털어 요리왕!",
    description: [
      "냉장고를 열었을 때 반쯤 비어있어도 당신은 요리왕이에요! 남은 재료들을 실험적으로 조합해서 새로운 맛을 만들어내는 창의적인 요리꾼이에요.",
      "레시피? 그건 참고일 뿐이에요. 당신만의 방식으로 요리하며, 때로는 실패작이 나와도 '이것도 경험이지!'라며 긍정적으로 받아들여요.",
      "냉장고 속 그건 오늘의 재료야!",
    ],
    recommendedMenu: ["김치볶음밥", "떡볶이"],
    recommendedTime: "야식 시간",
    shoppingTips: "할인 재료, 신상품",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "감성 혼밥러",
    emoji: "🌙",
    summary: "한 그릇에도 감정이 담김",
    description: [
      "밥 한 그릇에도 감정을 담는 당신! 혼자 먹는 밥도 소중한 시간이에요. 영상이나 음악을 틀어놓으며 조용히 식사를 즐겨요.",
      "요리는 나의 힐링 시간이에요. 복잡한 레시피보다는 간단하지만 따뜻한 음식을 만들어 먹는 것을 좋아해요.",
      "따뜻한 밥 한 그릇이 위로야. 밥보다 분위기가 중요해요.",
    ],
    recommendedMenu: ["된장찌개", "김치찜", "오트밀", "허브티"],
    recommendedTime: "저녁 시간",
    shoppingTips: "감성 식품, 허브티",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "공유밥상 리더",
    emoji: "🤝",
    summary: "친구 불러 같이 먹는 타입",
    description: [
      "친구가 집에 오면 한상 차림을 준비하는 당신! 모두가 함께 즐거운 시간을 보낼 수 있도록 배려하는 따뜻한 마음을 가지고 있어요.",
      "밥은 나눌수록 따뜻해져요. 다른 사람을 챙기며 함께 식사하는 것을 좋아해요.",
      "같이 먹어야 더 맛있지 🍽️",
    ],
    recommendedMenu: ["한상 차림", "파티 음식", "나눔 요리"],
    recommendedTime: "주말 점심/저녁",
    shoppingTips: "대량 구매, 파티 용품",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "철학적 미식가",
    emoji: "📖",
    summary: "음식에 의미를 담는 타입",
    description: [
      "요리는 나의 명상시간이에요. 음식에 담긴 의미와 감정을 중요하게 생각하는 당신! 레시피를 따라하는 것보다는 그 음식의 스토리를 이해하며 요리해요.",
      "간단한 음식도 정성스럽게 만들며, 그 과정에서 마음을 담아요.",
      "요리는 나의 명상시간 🍵",
    ],
    recommendedMenu: ["정성 요리", "명상 차", "간단한 국물 요리"],
    recommendedTime: "저녁 시간",
    shoppingTips: "정성 식품, 차류",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "창의 조리왕",
    emoji: "🧪",
    summary: "레시피? 내 방식대로!",
    description: [
      "레시피를 참고만 하고 나만의 방식으로 요리하는 창의적인 당신! 이 조합, 의외로 괜찮다! 라며 새로운 맛을 만들어내는 실험가예요.",
      "요리는 무한한 가능성의 실험실이에요. 때로는 실패해도 '다음엔 이렇게 해봐야지!'라며 끊임없이 연구해요.",
      "이 조합, 의외로 괜찮다!",
    ],
    recommendedMenu: ["퓨전 요리", "실험 요리", "새로운 조합"],
    recommendedTime: "야식 시간",
    shoppingTips: "신상품, 다양한 재료",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "레시피 분석러",
    emoji: "🔬",
    summary: "데이터형 요리법 추구",
    description: [
      "레시피를 정확히 계량하며 과학적으로 요리하는 당신! 맛도 과학이에요. 온도, 시간, 비율까지 모든 것을 정확하게 측정해요.",
      "요리 기록을 남기며 매번 일정한 품질을 유지하는 놀라운 일관성을 보여줘요.",
      "맛도 과학이다.",
    ],
    recommendedMenu: ["정밀 요리", "과학적 조리법"],
    recommendedTime: "점심 시간",
    shoppingTips: "정밀 계량 도구, 원재료",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "식단 관리자",
    emoji: "🧱",
    summary: "영양·시간·비용 완벽관리",
    description: [
      "이번 주 식단표 완성! 영양, 시간, 비용까지 완벽하게 관리하는 당신! 요리도 하나의 프로젝트처럼 체계적으로 관리해요.",
      "효율적인 식사와 영양 균형을 중요하게 생각하며, 모든 것을 계획적으로 운영해요.",
      "이번 주 식단표 완성!",
    ],
    recommendedMenu: ["닭가슴살 샐러드", "현미밥"],
    recommendedTime: "정해진 시간",
    shoppingTips: "영양 식품, 효율 재료",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "효율 요리 설계자",
    emoji: "📐",
    summary: "완벽한 루틴식 관리",
    description: [
      "한 끼도 전략적으로. 요리를 하나의 시스템처럼 완벽하게 설계하는 당신! 최소한의 시간과 노력으로 최대의 효율을 내는 요리법을 연구해요.",
      "효율적인 레시피와 루틴을 만들어서 매번 동일한 품질의 음식을 만들어내요.",
      "한 끼도 전략적으로.",
    ],
    recommendedMenu: ["닭가슴살 샐러드", "현미밥"],
    recommendedTime: "정해진 시간",
    shoppingTips: "효율 식품, 루틴 재료",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFJ: {
    name: "따뜻한 밥상러",
    emoji: "😊",
    summary: "가족·친구 챙기는 요리꾼",
    description: [
      "밥은 나눌수록 따뜻해진다 🍲 다른 사람을 챙기며 요리하는 당신! 가족이나 친구의 취향을 기억하고 배려하는 따뜻한 마음을 가지고 있어요.",
      "정성스럽게 만든 음식으로 사람들을 행복하게 만드는 것이 당신의 기쁨이에요.",
      "밥은 나눌수록 따뜻해진다 🍲",
    ],
    recommendedMenu: ["정성 요리", "나눔 식단", "따뜻한 국물"],
    recommendedTime: "주말 점심/저녁",
    shoppingTips: "정성 식품, 나눔 재료",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ESFP: {
    name: "감성 플레이팅러",
    emoji: "📸",
    summary: "맛보다 감성 우선",
    description: [
      "오늘 저녁은 인스타용 🍱✨ 맛보다는 감성과 플레이팅을 중요하게 생각하는 당신! 트렌디한 음식과 예쁜 그릇을 좋아해요.",
      "요리한 음식을 사진으로 남기고 친구들과 공유하는 것을 즐겨요.",
      "오늘 저녁은 인스타용 🍱✨",
    ],
    recommendedMenu: ["스테이크 도시락", "디저트컵"],
    recommendedTime: "저녁 시간",
    shoppingTips: "트렌디 식품, 플레이팅 용품",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ESTJ: {
    name: "루틴 셰프",
    emoji: "📋",
    summary: "계획형, 위생철저",
    description: [
      "매 끼니가 프로젝트다. 계획적으로 요리하며 위생을 철저히 지키는 당신! 조리 도구를 바로 씻고, 정해진 시간에 식사해요.",
      "모든 것이 체계적으로 관리되며, 규칙적인 밥상이 평화예요.",
      "매 끼니가 프로젝트다.",
    ],
    recommendedMenu: ["계획 식단", "위생 요리", "루틴 메뉴"],
    recommendedTime: "정해진 시간",
    shoppingTips: "계획 식품, 위생 용품",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ESTP: {
    name: "스피드 배달러",
    emoji: "⚡",
    summary: "빠르고 맛있게",
    description: [
      "배고프면 바로 주문! 즉시성과 결단력을 중시하는 당신! 요리보다는 배달앱을 킨 것이 더 빠르다고 생각해요.",
      "썸네일과 사진을 보고 맛집을 선택하며, 배달이 오면 바로 먹는 스피드한 스타일이에요.",
      "배고프면 바로 주문!",
    ],
    recommendedMenu: ["배달 음식", "즉석 식품"],
    recommendedTime: "배고플 때",
    shoppingTips: "즉석 식품, 배달 쿠폰",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISFJ: {
    name: "정성 밥상러",
    emoji: "🧸",
    summary: "꾸준히 챙겨 먹는 타입",
    description: [
      "밥 한 끼라도 소중히. 꾸준히 챙겨 먹으며 정성스럽게 요리하는 당신! 필요한 재료만 사서 냉장고를 채워요.",
      "조리 도구를 바로 씻고 정리하며, 일정한 시간에 식사하는 루틴을 지켜요.",
      "밥 한 끼라도 소중히.",
    ],
    recommendedMenu: ["정성 요리", "루틴 식단", "소중한 한 끼"],
    recommendedTime: "정해진 시간",
    shoppingTips: "필수 재료, 정성 식품",
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ISFP: {
    name: "느긋한 힐링러",
    emoji: "🌿",
    summary: "즉흥·편안함 중심",
    description: [
      "요리보다 분위기가 중요해. 즉흥적이지만 편안함을 추구하는 당신! 감으로 레시피를 맞추며, 감성적인 음식을 좋아해요.",
      "야식이 생각나면 배달앱을 켜고, 편한 음식을 즐기며 여유롭게 식사해요.",
      "요리보다 분위기가 중요해.",
    ],
    recommendedMenu: ["오트밀", "허브티"],
    recommendedTime: "편한 시간",
    shoppingTips: "감성 식품, 편안한 재료",
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ISTJ: {
    name: "체계형 밥상러",
    emoji: "📦",
    summary: "장보기→조리→정리 루틴",
    description: [
      "규칙적인 밥상은 평화야. 장보기부터 조리, 정리까지 모든 것이 체계적인 당신! 필요한 것만 사서 냉장고를 채우고, 조리 도구를 바로 씻어요.",
      "일정한 시간에 식사하며, 모든 것이 예측 가능한 루틴을 좋아해요.",
      "규칙적인 밥상은 평화야.",
    ],
    recommendedMenu: ["체계 식단", "루틴 메뉴", "정리된 요리"],
    recommendedTime: "정해진 시간",
    shoppingTips: "필수 재료, 체계 용품",
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
  ISTP: {
    name: "해결형 셰프",
    emoji: "🛠",
    summary: "최소한으로 최대효율",
    description: [
      "라면 + 달걀 = 완벽 공식. 실용적이고 단순한 요리를 좋아하는 당신! 최소한의 재료로 최대의 맛을 내는 요리법을 추구해요.",
      "상황에 맞춰 즉시 결정하며, 복잡한 레시피보다는 간단하고 실용적인 요리를 선호해요.",
      "라면 + 달걀 = 완벽 공식.",
    ],
    recommendedMenu: ["라면+달걀", "간단 요리", "실용 메뉴"],
    recommendedTime: "배고플 때",
    shoppingTips: "실용 재료, 간단 용품",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof jachuiCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = jachuiCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
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
                  testId="jachui"
                  testPath="/tests/jachui/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 ${character.emoji} ${character.name} (${mbtiType})!`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/jachui/test">
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
              <span>🍳</span>
              <span>당신의 밥상 스타일</span>
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

        {/* Recommended Menu */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🍽️</span>
              <span>추천 메뉴 & 꿀템</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">🍚 추천 메뉴</div>
                  <div className="flex flex-wrap gap-2">
                    {character.recommendedMenu.map((menu, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {menu}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">⏰ 추천 시간대</div>
                  <div className="text-muted-foreground">{character.recommendedTime}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">🛒 장보기 꿀템</div>
                  <div className="text-muted-foreground">{character.shoppingTips}</div>
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
              <span>잘 맞는 밥상 파트너</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = jachuiCharacters[type as keyof typeof jachuiCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 rounded-lg text-center"
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
                  slug: "coffee-mbti",
                  title: "커피 MBTI",
                  emoji: "☕",
                  description: "커피 취향으로 알아보는 성격",
                  participants: "12.5K",
                },
                {
                  slug: "movie-theater-style",
                  title: "영화관 관람 스타일",
                  emoji: "🎬",
                  description: "영화관 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "ramen-mbti",
                  title: "라면 MBTI",
                  emoji: "🍜",
                  description: "라면 취향으로 알아보는 성격",
                  participants: "10.2K",
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

export default function JachuiResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

