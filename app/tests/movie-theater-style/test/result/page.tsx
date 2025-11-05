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

const movieCharacters = {
  ENFP: {
    name: "감정폭주 러",
    emoji: "🎈",
    summary: "재밌으면 다 용서됨! 즉흥 관람 장인",
    description: [
      "신작이나 특이한 장르의 영화를 가장 먼저 시도해보는 당신! 마이너 영화, 실험적인 작품, 화제작까지... 모든 새로운 영화가 당신의 호기심을 자극해요.",
      "영화를 보며 감정이입이 과해서 웃고 울고 소리지르는 리액션이 활발하고, 영화관 전체를 즐겁게 만드는 에너지를 가지고 있어요.",
      "굿즈를 살 때도 감성과 영감을 중요하게 생각하며, 예쁜 포토카드나 특별한 디자인의 굿즈를 좋아해요.",
    ],
    recommended: {
      format: "관객참여 상영",
      time: "주말 저녁",
      seat: "앞쪽 중앙",
      snack: "팝콘 콤보",
      goods: "포토스팟 굿즈",
    },
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "서정 몰입러",
    emoji: "🌙",
    summary: "감정선 따라 떠다님",
    description: [
      "잔잔하고 힐링되는 감성 영화를 좋아하는 당신! 드라마, 휴먼 스토리, 서정적인 작품에 깊이 몰입하며 영화의 감정을 온전히 느껴요.",
      "영화를 본 후에도 잔상이 오래 남아서 혼자 조용히 그 감정을 음미하는 시간을 소중히 여겨요.",
      "조용한 심야 시간대를 선호하며, 혼자 영화를 보는 것도 편안하게 느껴요.",
    ],
    recommended: {
      format: "드라마/휴먼",
      time: "심야 타임",
      seat: "뒤쪽 조용한 자리",
      snack: "차 또는 음료",
      goods: "감성 굿즈",
    },
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "무드 메이커",
    emoji: "🤝",
    summary: "다 같이 즐거운 관람이 먼저",
    description: [
      "단체 관람을 주도하며 모든 사람이 즐길 수 있는 무난한 작품을 추천하는 당신! 패밀리, 로맨틱 코미디, 코미디 등 누구나 즐길 수 있는 장르를 선호해요.",
      "팝콘도 나눠먹으며 모두가 행복한 시간을 보낼 수 있도록 분위기를 만들어내는 능력이 있어요.",
      "영화를 본 후에도 함께 이야기 나누며 소통하는 것을 좋아해요.",
    ],
    recommended: {
      format: "패밀리/로코/코미디",
      time: "주말 오후",
      seat: "중앙 구역",
      snack: "나눠먹기 팝콘",
      goods: "기념품 굿즈",
    },
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "의미 수집가",
    emoji: "📖",
    summary: "메시지·상징 해석 즐김",
    description: [
      "감독의 의도와 영화의 미장센을 탐구하는 것을 즐기는 당신! 아트하우스, 독립영화, GV(관객과의 대화) 상영을 선호해요.",
      "엔딩크레딧까지 쿠키씬을 확인하며 영화의 모든 의미를 파악하려고 노력해요.",
      "영화를 본 후 해석 글을 찾아보고, 다른 사람들과 깊이 있는 토론을 나누는 것을 좋아해요.",
    ],
    recommended: {
      format: "아트/독립/GV",
      time: "평일 저녁",
      seat: "중앙 H열",
      snack: "간단한 음료",
      goods: "해석 글 모음",
    },
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "실험 상영러",
    emoji: "🧪",
    summary: "신선함·토론거리 최우선",
    description: [
      "마이너 작품이나 실험적인 영화를 선호하는 당신! 시사회, GV 상영, 컬트 영화, 실험 영화 등 신선한 경험을 추구해요.",
      "영화를 본 후 토론거리를 찾아서 다른 사람들과 깊이 있는 대화를 나누는 것을 좋아해요.",
      "유행하는 대작보다는 독특하고 신선한 작품을 찾아서 보는 것을 즐겨요.",
    ],
    recommended: {
      format: "시사회/관객 GV",
      time: "프리미어 상영",
      seat: "앞쪽 중앙",
      snack: "간식 세트",
      goods: "컬트·실험영화 굿즈",
    },
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "분석 관람러",
    emoji: "🔬",
    summary: "평점·리뷰·메타데이터",
    description: [
      "영화를 보기 전 평점, 리뷰, 메타데이터를 철저히 분석하는 당신! 시네필 영화를 선호하며, 관람 기록을 앱으로 관리해요.",
      "비교 분석을 통해 어떤 영화를 볼지 결정하며, 영화에 대한 깊이 있는 지식을 가지고 있어요.",
      "영화를 본 후에도 리뷰를 작성하고 평가하는 것을 즐겨요.",
    ],
    recommended: {
      format: "시네필 픽",
      time: "평일 오후",
      seat: "중앙 뒤쪽",
      snack: "간단한 음료",
      goods: "관람 기록 앱",
    },
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "프로젝트 매니저",
    emoji: "🧱",
    summary: "예매-좌석-시간표 완벽 운영",
    description: [
      "영화관람을 하나의 프로젝트처럼 완벽하게 계획하는 당신! 황금좌석, 음향관 고정, IMAX나 돌비시네마 등 최고의 환경을 선호해요.",
      "예매부터 좌석 선택, 시간표까지 모든 것을 체계적으로 관리하며, 프리미엄 좌석과 VIP 혜택을 활용해요.",
      "시간 낭비 없이 효율적으로 영화를 관람하는 것을 중요하게 생각해요.",
    ],
    recommended: {
      format: "IMAX/돌비",
      time: "조조/심야(소음 적은 시간)",
      seat: "프리미엄 좌석",
      snack: "프리미엄 스낵",
      goods: "VIP 혜택 굿즈",
    },
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "최적화 설계자",
    emoji: "📐",
    summary: "몰입 극대화 동선",
    description: [
      "중앙 황금좌석을 고집하며 사운드 스펙에 집착하는 당신! 돌비시네마, IMAX 등 최고의 사운드 시스템을 가진 상영관을 선호해요.",
      "소음이 적은 시간대를 선택하여 몰입도를 극대화하며, 완벽한 관람 환경을 추구해요.",
      "영화를 보는 것도 하나의 시스템처럼 최적화하여 최고의 경험을 만들어내요.",
    ],
    recommended: {
      format: "돌비/IMAX",
      time: "소음 적은 시간대",
      seat: "중앙 황금좌석",
      snack: "조용한 음료",
      goods: "기술 스펙 굿즈",
    },
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFJ: {
    name: "호감형 큐레이터",
    emoji: "😊",
    summary: "동행 취향 맞춤형 추천",
    description: [
      "동행하는 사람의 취향에 맞춰 영화를 추천하는 당신! 전연령 무난작을 선호하며, 스포일러에 주의하고 예절을 철저히 지켜요.",
      "간식을 공유하며 모두가 함께 즐거운 시간을 보낼 수 있도록 배려하는 따뜻한 마음을 가지고 있어요.",
      "영화를 본 후에도 함께 이야기 나누며 소통하는 것을 좋아해요.",
    ],
    recommended: {
      format: "전연령 무난작",
      time: "주말 오후",
      seat: "중앙 구역",
      snack: "셰어 팝콘·콜라",
      goods: "기념품 굿즈",
    },
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ESFP: {
    name: "하이라이트 헌터",
    emoji: "📸",
    summary: "재밌고 예쁜 게 최고",
    description: [
      "포토존을 찾아서 인증샷을 찍고, 예쁜 굿즈를 수집하는 당신! 트렌디한 신작, 로맨스, 뮤지컬 영화를 선호해요.",
      "포토카드 상영이나 특별 이벤트를 좋아하며, SNS에 공유하기 좋은 영화를 선택해요.",
      "영화관의 분위기와 경험 자체를 즐기며, 굿즈 수집도 취미 중 하나예요.",
    ],
    recommended: {
      format: "포토카드 상영",
      time: "주말 저녁",
      seat: "앞쪽 중앙",
      snack: "팝콘 콤보",
      goods: "포토스팟 굿즈",
    },
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ESTJ: {
    name: "매뉴얼 관람러",
    emoji: "📑",
    summary: "규칙·효율·가성비",
    description: [
      "할인과 적립을 최적화하여 가성비를 추구하는 당신! 조조할인, 문화의날 할인 등을 활용하며, 대형 상영관을 선호해요.",
      "시간 낭비 없이 효율적으로 영화를 관람하며, 영수증과 적립을 철저히 관리해요.",
      "규칙을 지키며 예의 바르게 영화를 관람하는 것을 중요하게 생각해요.",
    ],
    recommended: {
      format: "조조/문화의날",
      time: "조조 시간대",
      seat: "중앙 뒤쪽",
      snack: "할인 스낵",
      goods: "실용 굿즈",
    },
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ESTP: {
    name: "스피드 무브",
    emoji: "⚡",
    summary: "보고 싶을 때 바로 본다",
    description: [
      "당일 예매를 선호하며 앞쪽이나 통로 좌석을 좋아하는 당신! 핫한 상영 영화를 바로 보고, 이동이 빠른 통로 좌석을 선택해요.",
      "그랩앤고 스낵을 좋아하며, 영화를 보는 것도 즉흥적이고 유연하게 즐겨요.",
      "계획보다는 상황에 맞춰 즉시 결정하는 것을 선호해요.",
    ],
    recommended: {
      format: "핫한 상영",
      time: "당일 예매",
      seat: "앞쪽·통로",
      snack: "그랩앤고 스낵",
      goods: "즉석 굿즈",
    },
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISFJ: {
    name: "안정 루틴러",
    emoji: "🧸",
    summary: "익숙하면 편하다",
    description: [
      "단골 영화관과 루틴 좌석을 고정하는 당신! 스테디셀러, 로맨틱 코미디 등 안정적인 작품을 선호하며, 편한 시간대를 선택해요.",
      "과자도 항상 같은 종류를 고르며, 익숙한 환경에서 편안하게 영화를 관람하는 것을 좋아해요.",
      "변화보다는 안정적인 루틴을 선호하며, 예측 가능한 경험을 즐겨요.",
    ],
    recommended: {
      format: "스테디셀러/로코",
      time: "편한 시간대",
      seat: "고정 루틴 좌석",
      snack: "고정 과자",
      goods: "기념품 굿즈",
    },
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ISFP: {
    name: "감각 미니멀",
    emoji: "🌿",
    summary: "부드럽고 잔잔한 선호",
    description: [
      "소음이 싫어서 혼자 조용히 영화를 관람하는 것을 선호하는 당신! 예술 영화, 힐링 영화, 사운드가 좋은 소규모 상영관을 좋아해요.",
      "허브티 같은 부드러운 음료를 즐기며, 영화의 분위기와 감성을 중요하게 생각해요.",
      "큰 소리나 시끄러운 환경보다는 조용하고 편안한 분위기를 선호해요.",
    ],
    recommended: {
      format: "예술/힐링/사운드 좋은 소관",
      time: "심야 타임",
      seat: "뒤쪽 조용한 자리",
      snack: "허브티",
      goods: "감성 굿즈",
    },
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ISTJ: {
    name: "타임테이블 설계자",
    emoji: "📦",
    summary: "체크리스트형 관람",
    description: [
      "시간, 좌석, 통로, 퇴장 동선까지 모두 계획하는 당신! 조조 시간대를 선호하며, 고정 좌석을 선택해요.",
      "영수증과 적립을 철저히 관리하며, 모든 것을 체크리스트로 관리해요.",
      "계획대로 진행되는 것을 좋아하며, 예상치 못한 상황보다는 예측 가능한 경험을 선호해요.",
    ],
    recommended: {
      format: "조조/고정 좌석",
      time: "조조 시간대",
      seat: "고정 좌석",
      snack: "계획된 스낵",
      goods: "영수증/적립 굿즈",
    },
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
  ISTP: {
    name: "문제 해결러",
    emoji: "🛠",
    summary: "상황 맞춤 즉시 결정",
    description: [
      "좌석이나 음향에 문제가 생기면 즉시 대응하는 당신! 리클라이너나 프리미엄 좌석을 선호하며, 장비나 편의템을 챙겨요.",
      "실용적인 굿즈를 선호하며, 상황에 맞춰 유연하게 대응하는 능력이 있어요.",
      "계획보다는 상황에 맞춰 즉시 결정하는 것을 선호해요.",
    ],
    recommended: {
      format: "리클라이너/프리미엄",
      time: "유연한 시간대",
      seat: "프리미엄 좌석",
      snack: "편의 스낵",
      goods: "실용 굿즈",
    },
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof movieCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = movieCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
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
                  className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="movie-theater-style"
                  testPath="/tests/movie-theater-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 ${character.emoji} ${character.name}!`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/movie-theater-style/test">
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
              <span>🎬</span>
              <span>당신의 관람 스타일</span>
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

        {/* Recommended */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🎯</span>
              <span>추천 관람 가이드</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">🎬 상영 포맷</div>
                  <div className="text-muted-foreground">{character.recommended.format}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">🪑 추천 좌석</div>
                  <div className="text-muted-foreground">{character.recommended.seat}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">⏰ 시간대</div>
                  <div className="text-muted-foreground">{character.recommended.time}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">🍿 추천 스낵</div>
                  <div className="text-muted-foreground">{character.recommended.snack}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">🎁 추천 굿즈</div>
                  <div className="text-muted-foreground">{character.recommended.goods}</div>
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
              <span>잘 맞는 관람 파트너</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = movieCharacters[type as keyof typeof movieCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg text-center"
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
                  slug: "ramen-mbti",
                  title: "라면 MBTI",
                  emoji: "🍜",
                  description: "라면 취향으로 알아보는 성격",
                  participants: "10.2K",
                },
                {
                  slug: "kdrama-mbti",
                  title: "K-드라마 클리셰",
                  emoji: "🎬",
                  description: "드라마 속 당신은 어떤 캐릭터?",
                  participants: "1.2K",
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

export default function MovieTheaterStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

