"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Moon, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const eveningCharacters = {
  ENFP: {
    name: "스파크 메이커",
    emoji: "🎈",
    summary: "즉흥과 사교의 저녁 설계자!",
    description: [
      "즉흥과 사교의 저녁 설계자인 당신은 스파크 메이커예요. 바로 약속을 잡아 사람을 만나고, 새로운 맛집·신상 메뉴를 탐색하며, 바로 답장/전화로 해결하는 활발한 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 좀 쉬다 슬슬 시작하며, 앞으로의 가능성/아이디어를 생각하는 즉흥적이고 창의적인 저녁러예요.",
      "번개 약속 장인이자 새 취미·새 장소 탐험을 즐기며, 기분 기반 에너지로 저녁을 보내는 스타일이에요.",
    ],
    recommendedTips: ["4주 체험 클래스", "소셜 모임 앱", "번개 약속 플랫폼"],
    recommendedAction: "즉흥적으로 즐기되, 가끔은 계획적인 루틴도 시도해보세요!",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
    shareText: "나는 🎈 스파크 메이커(ENFP)! 너의 퇴근 루틴은?",
  },
  ENFJ: {
    name: "케어 코디네이터",
    emoji: "🤝",
    summary: "사람 중심·배려형 일정",
    description: [
      "사람 중심·배려형 일정을 관리하는 당신은 케어 코디네이터예요. 바로 약속을 잡아 사람을 만나고, 새로운 맛집·신상 메뉴를 탐색하며, 바로 답장/전화로 해결하는 사교적인 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 좀 쉬다 슬슬 시작하며, 앞으로의 가능성/아이디어를 생각하는 배려심 깊은 저녁러예요.",
      "동료/가족 챙김과 합동운동을 즐기며, 모두를 위한 저녁을 계획하는 스타일이에요.",
    ],
    recommendedTips: ["소셜 러닝", "스터디 리드", "가족 모임 플래너"],
    recommendedAction: "모두를 챙기되, 자신의 시간도 잊지 마세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
    shareText: "나는 🤝 케어 코디네이터(ENFJ)! 너의 퇴근 루틴은?",
  },
  ENTJ: {
    name: "미션 플래너",
    emoji: "🎯",
    summary: "목표·효율·성과 지향",
    description: [
      "목표·효율·성과를 지향하는 당신은 미션 플래너예요. 바로 약속을 잡아 사람을 만나고, 새로운 맛집·신상 메뉴를 탐색하며, 바로 답장/전화로 해결하는 리더십 있는 타입이에요.",
      "루틴·기록·측정이 우선인 운동 계획과 들어오자마자 정리·샤워하며, 체크리스트/투두를 점검하는 전략적인 저녁러예요.",
      "PT·자격증·사이드프로젝트를 통해 성장하며, OKR형 개인보드로 목표를 관리하는 스타일이에요.",
    ],
    recommendedTips: ["OKR형 개인보드", "PT/자격증 스케줄", "사이드프로젝트 로드맵"],
    recommendedAction: "목표 달성을 위해 계획하되, 가끔은 여유롭게 즐기는 것도 좋아요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
    shareText: "나는 🎯 미션 플래너(ENTJ)! 너의 퇴근 루틴은?",
  },
  ENTP: {
    name: "아이디어 허슬러",
    emoji: "🧪",
    summary: "실험·변화·재미 최우선",
    description: [
      "실험·변화·재미를 최우선으로 하는 당신은 아이디어 허슬러예요. 바로 약속을 잡아 사람을 만나고, 새로운 맛집·신상 메뉴를 탐색하며, 바로 답장/전화로 해결하는 창의적인 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 좀 쉬다 슬슬 시작하며, 앞으로의 가능성/아이디어를 생각하는 실험 정신이 가득한 저녁러예요.",
      "신상 장비·새 루틴을 테스트하며, 해커톤·사이드 프로젝트를 즐기는 스타일이에요.",
    ],
    recommendedTips: ["해커톤", "사이드 프로젝트", "신기술 실험"],
    recommendedAction: "새로운 것을 시도하되, 가끔은 기본적인 루틴도 유지해보세요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
    shareText: "나는 🧪 아이디어 허슬러(ENTP)! 너의 퇴근 루틴은?",
  },
  ESFJ: {
    name: "소셜 호스트",
    emoji: "😊",
    summary: "함께 먹고 운동·정서케어",
    description: [
      "함께 먹고 운동하며 정서케어를 중시하는 당신은 소셜 호스트예요. 바로 약속을 잡아 사람을 만나고, 늘 가던 메뉴/가게를 선택하며, 바로 답장/전화로 해결하는 사교적인 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 들어오자마자 정리·샤워하며, 체크리스트/투두를 점검하는 따뜻한 저녁러예요.",
      "홈파티·동네 모임을 즐기며, 저녁 쿠킹/보드게임으로 모두를 즐겁게 하는 스타일이에요.",
    ],
    recommendedTips: ["저녁 쿠킹 파티", "보드게임 모임", "동네 산책 모임"],
    recommendedAction: "모두와 함께 즐기되, 자신만의 시간도 가지세요.",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
    shareText: "나는 😊 소셜 호스트(ESFJ)! 너의 퇴근 루틴은?",
  },
  ESFP: {
    name: "무드 러너",
    emoji: "📸",
    summary: "감성·즐거움·현장감",
    description: [
      "감성·즐거움·현장감을 중시하는 당신은 무드 러너예요. 바로 약속을 잡아 사람을 만나고, 새로운 맛집·신상 메뉴를 탐색하며, 바로 답장/전화로 해결하는 활발한 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 좀 쉬다 슬슬 시작하며, 앞으로의 가능성/아이디어를 생각하는 감성적인 저녁러예요.",
      "페스티벌·야시장·사진을 즐기며, 야간 전시/플리마켓을 탐방하는 스타일이에요.",
    ],
    recommendedTips: ["야간 전시", "플리마켓", "야시장 탐방"],
    recommendedAction: "즐거움을 추구하되, 가끔은 정리와 계획도 해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
    shareText: "나는 📸 무드 러너(ESFP)! 너의 퇴근 루틴은?",
  },
  ESTJ: {
    name: "루틴 마스터",
    emoji: "📋",
    summary: "규칙·시간관리·체크",
    description: [
      "규칙·시간관리·체크를 중시하는 당신은 루틴 마스터예요. 바로 약속을 잡아 사람을 만나고, 늘 가던 메뉴/가게를 선택하며, 바로 답장/전화로 해결하는 체계적인 타입이에요.",
      "루틴·기록·측정이 우선인 운동 계획과 들어오자마자 정리·샤워하며, 체크리스트/투두를 점검하는 효율적인 저녁러예요.",
      "고정 PT·가계부·정리를 통해 일상을 관리하며, 주간 리추얼 템플릿으로 완벽한 저녁을 만드는 스타일이에요.",
    ],
    recommendedTips: ["주간 리추얼 템플릿", "고정 PT 스케줄", "가계부 관리"],
    recommendedAction: "체계적으로 관리하되, 가끔은 유연함도 즐겨보세요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
    shareText: "나는 📋 루틴 마스터(ESTJ)! 너의 퇴근 루틴은?",
  },
  ESTP: {
    name: "액션 드리블러",
    emoji: "⚡",
    summary: "속전속결·체험형",
    description: [
      "속전속결·체험형인 당신은 액션 드리블러예요. 바로 약속을 잡아 사람을 만나고, 새로운 맛집·신상 메뉴를 탐색하며, 바로 답장/전화로 해결하는 즉각적인 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 좀 쉬다 슬슬 시작하며, 앞으로의 가능성/아이디어를 생각하는 행동력 있는 저녁러예요.",
      "번지르르한 계획보다 실행을 중시하며, 당일 예약 액티비티를 즐기는 스타일이에요.",
    ],
    recommendedTips: ["당일 예약 액티비티", "즉흥 운동", "번개 모임"],
    recommendedAction: "즉시 행동하되, 가끔은 계획적인 준비도 해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
    shareText: "나는 ⚡ 액션 드리블러(ESTP)! 너의 퇴근 루틴은?",
  },
  INFP: {
    name: "드리머 힐러",
    emoji: "🌙",
    summary: "혼자 회복·감성 충전",
    description: [
      "혼자 회복하며 감성을 충전하는 당신은 드리머 힐러예요. 집으로 직행하여 혼자만의 시간을 가지며, 집 가서 정리해 답장하는 내향적인 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 좀 쉬다 슬슬 시작하며, 앞으로의 가능성/아이디어를 생각하는 감성적인 저녁러예요.",
      "카페 글쓰기·산책·플레이리스트로 힐링하며, 야간 라이팅 챌린지로 자신을 표현하는 스타일이에요.",
    ],
    recommendedTips: ["야간 라이팅 챌린지", "감성 플레이리스트", "혼자만의 산책"],
    recommendedAction: "혼자 힐링하되, 가끔은 사람들과의 소통도 즐겨보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
    shareText: "나는 🌙 드리머 힐러(INFP)! 너의 퇴근 루틴은?",
  },
  INFJ: {
    name: "딥포커스 설계자",
    emoji: "📖",
    summary: "의미·깊이·미니멀",
    description: [
      "의미·깊이·미니멀을 중시하는 당신은 딥포커스 설계자예요. 집으로 직행하여 혼자만의 시간을 가지며, 집 가서 정리해 답장하는 사색적인 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 들어오자마자 정리·샤워하며, 앞으로의 가능성/아이디어를 생각하는 깊이 있는 저녁러예요.",
      "독서·저널링·명상으로 내면을 채우며, 30분 딥워크 타이머로 집중하는 스타일이에요.",
    ],
    recommendedTips: ["30분 딥워크 타이머", "저널링", "명상 루틴"],
    recommendedAction: "깊이 있게 집중하되, 가끔은 가벼운 활동도 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
    shareText: "나는 📖 딥포커스 설계자(INFJ)! 너의 퇴근 루틴은?",
  },
  INTJ: {
    name: "전략 최적화러",
    emoji: "🧠",
    summary: "시스템·자동화·개선",
    description: [
      "시스템·자동화·개선을 중시하는 당신은 전략 최적화러예요. 집으로 직행하여 혼자만의 시간을 가지며, 집 가서 정리해 답장하는 분석적인 타입이에요.",
      "루틴·기록·측정이 우선인 운동 계획과 들어오자마자 정리·샤워하며, 체크리스트/투두를 점검하는 전략적인 저녁러예요.",
      "식단·수면·헬스를 트래킹하며, 루틴 자동화 앱·IFTTT로 완벽한 저녁을 만드는 스타일이에요.",
    ],
    recommendedTips: ["루틴 자동화 앱", "IFTTT 연동", "생체 데이터 트래킹"],
    recommendedAction: "시스템화하되, 가끔은 자유로운 시간도 가지세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
    shareText: "나는 🧠 전략 최적화러(INTJ)! 너의 퇴근 루틴은?",
  },
  INTP: {
    name: "호기심 콜렉터",
    emoji: "🔬",
    summary: "탐구·딴길·몰입",
    description: [
      "탐구·딴길·몰입을 즐기는 당신은 호기심 콜렉터예요. 집으로 직행하여 혼자만의 시간을 가지며, 집 가서 정리해 답장하는 호기심 많은 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 좀 쉬다 슬슬 시작하며, 앞으로의 가능성/아이디어를 생각하는 탐구적인 저녁러예요.",
      "위키·유튜브 리서치로 지식을 쌓으며, '학습 레이더' 북마크로 관심사를 정리하는 스타일이에요.",
    ],
    recommendedTips: ["학습 레이더 북마크", "위키 탐색", "유튜브 리서치"],
    recommendedAction: "탐구하며 즐기되, 가끔은 실용적인 활동도 해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
    shareText: "나는 🔬 호기심 콜렉터(INTP)! 너의 퇴근 루틴은?",
  },
  ISFJ: {
    name: "홈 케어러",
    emoji: "🧸",
    summary: "가족/집 돌봄·안정",
    description: [
      "가족/집 돌봄·안정을 중시하는 당신은 홈 케어러예요. 집으로 직행하여 혼자만의 시간을 가지며, 집 가서 정리해 답장하는 따뜻한 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 들어오자마자 정리·샤워하며, 체크리스트/투두를 점검하는 성실한 저녁러예요.",
      "집밥·정리·소소한 취미로 안정감을 찾으며, 주간 홈케어 체크리스트로 완벽한 저녁을 만드는 스타일이에요.",
    ],
    recommendedTips: ["주간 홈케어 체크리스트", "집밥 레시피", "소소한 취미"],
    recommendedAction: "가족을 돌보되, 자신의 시간도 잊지 마세요.",
    compatibleTypes: ["ESFP", "ESTP", "ESFJ"],
    shareText: "나는 🧸 홈 케어러(ISFJ)! 너의 퇴근 루틴은?",
  },
  ISFP: {
    name: "감성 플로우러",
    emoji: "🌷",
    summary: "미감·감각·창작",
    description: [
      "미감·감각·창작을 즐기는 당신은 감성 플로우러예요. 집으로 직행하여 혼자만의 시간을 가지며, 집 가서 정리해 답장하는 예술적인 타입이에요.",
      "기분·컨디션에 맞춰 운동하고, 좀 쉬다 슬슬 시작하며, 앞으로의 가능성/아이디어를 생각하는 감성적인 저녁러예요.",
      "드로잉·사진·인테리어로 창작하며, 100일 스몰 크리에이션으로 자신을 표현하는 스타일이에요.",
    ],
    recommendedTips: ["100일 스몰 크리에이션", "드로잉", "인테리어 프로젝트"],
    recommendedAction: "감성으로 창작하되, 가끔은 실용적인 활동도 해보세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESTJ"],
    shareText: "나는 🌷 감성 플로우러(ISFP)! 너의 퇴근 루틴은?",
  },
  ISTJ: {
    name: "체크리스트러",
    emoji: "📦",
    summary: "규범·절차·성실",
    description: [
      "규범·절차·성실을 중시하는 당신은 체크리스트러예요. 집으로 직행하여 혼자만의 시간을 가지며, 집 가서 정리해 답장하는 신중한 타입이에요.",
      "루틴·기록·측정이 우선인 운동 계획과 들어오자마자 정리·샤워하며, 체크리스트/투두를 점검하는 체계적인 저녁러예요.",
      "고정 루틴·일정 마감으로 안정감을 찾으며, GTD·수면 위생 프로토콜로 완벽한 저녁을 만드는 스타일이에요.",
    ],
    recommendedTips: ["GTD 시스템", "수면 위생 프로토콜", "고정 루틴"],
    recommendedAction: "체계적으로 관리하되, 가끔은 유연함도 즐겨보세요.",
    compatibleTypes: ["ESFP", "ENFP", "ESTP"],
    shareText: "나는 📦 체크리스트러(ISTJ)! 너의 퇴근 루틴은?",
  },
  ISTP: {
    name: "솔루션 빌더",
    emoji: "🛠",
    summary: "실용·수리·개선",
    description: [
      "실용·수리·개선을 즐기는 당신은 솔루션 빌더예요. 집으로 직행하여 혼자만의 시간을 가지며, 집 가서 정리해 답장하는 실용적인 타입이에요.",
      "루틴·기록·측정이 우선인 운동 계획과 좀 쉬다 슬슬 시작하며, 체크리스트/투두를 점검하는 손재주 있는 저녁러예요.",
      "자전거/가전 손보기로 실용성을 추구하며, 취미 공방·DIY로 자신만의 솔루션을 만드는 스타일이에요.",
    ],
    recommendedTips: ["취미 공방", "DIY 프로젝트", "자전거/가전 수리"],
    recommendedAction: "실용적으로 해결하되, 가끔은 감성적인 활동도 즐겨보세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
    shareText: "나는 🛠 솔루션 빌더(ISTP)! 너의 퇴근 루틴은?",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof eveningCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = eveningCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950 dark:via-pink-950 dark:to-indigo-950">
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
                  className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="evening-routine"
                  testPath="/tests/evening-routine/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={character.shareText}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/evening-routine/test">
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
              <span>🌙</span>
              <span>당신의 저녁 패턴</span>
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

        {/* Recommended Tips & Action */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>✨</span>
              <span>추천 루틴 & 저녁 꿀팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {character.recommendedTips.map((tip, index) => (
                <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                  <strong>•</strong> {tip}
                </p>
              ))}
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong>저녁 꿀팁:</strong> {character.recommendedAction}
            </p>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 저녁 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = eveningCharacters[type as keyof typeof eveningCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg text-center"
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
              <Sparkles className="h-6 w-6 text-pink-500" />
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
                  slug: "clean-style",
                  title: "방 청소 스타일",
                  emoji: "🧹",
                  description: "청소 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "lunch-style",
                  title: "회사 점심",
                  emoji: "🍱",
                  description: "점심 선택으로 알아보는 성격",
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

export default function EveningRoutineResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

