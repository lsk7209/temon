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

const hamburgerTypes = {
  ENFP: {
    label: "즉흥 조합형",
    summary: "신메뉴와 특제 소스를 즐기는 확산형 조합가",
    traits: ["신메뉴 우선", "소스 여러 개", "사진 공유"],
    picks: ["치킨 패티", "브리오슈", "특제 소스 3종"],
    tips: ["칼로리 체크", "야채 비율 조절", "후기 기록"],
    match: "ISTJ, ISFJ",
    emoji: "🎉",
  },
  INFP: {
    label: "감성 클래식형",
    summary: "조용히 완벽한 한 입에 몰입하는 힐링 지향",
    traits: ["클래식 선호", "분위기 중시", "혼자 즐김"],
    picks: ["소고기 패티", "클래식 번", "기본 야채"],
    tips: ["과식 주의", "영양 균형", "소용량 주문"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "나눔 리더형",
    summary: "모두가 만족하도록 메뉴와 조합을 조율",
    traits: ["알레르기 체크", "공평 분배", "세트 구성"],
    picks: ["반반 패티", "세트 메뉴", "다양한 사이드"],
    tips: ["선호 수집", "나눔 플랜", "정산 안내"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 선택형",
    summary: "브랜드 가치와 원재료 기준으로 선별",
    traits: ["성분 확인", "유기농 선호", "루틴 유지"],
    picks: ["유기농 패티", "통밀 빵", "신선 야채"],
    tips: ["즉흥 슬롯 1개", "칼로리 관리", "보관 용기"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "조합 실험형",
    summary: "패티와 소스 조합으로 실험하는 전략가",
    traits: ["패티 믹스", "소스 조합", "토론 유도"],
    picks: ["소고기+치킨", "특제 소스 2종", "추가 토핑"],
    tips: ["위생 체크", "칼로리 관리", "실패 기록도 자산"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "데이터 최적화형",
    summary: "가격·칼로리·영양을 비교해 합리화",
    traits: ["단위가격 계산", "영양 분석", "리뷰 비교"],
    picks: ["가성비 패티", "기본 세트", "칼로리 낮은 사이드"],
    tips: ["감성 픽 허용", "나트륨 관리", "수분 보충"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "프로세스 리더형",
    summary: "주문·결제·배분을 한 번에 관리",
    traits: ["타임라인 공지", "역할 분담", "정확 정산"],
    picks: ["패밀리 세트", "프리미엄 패티", "콜라 1.5L"],
    tips: ["즉흥 여지 10%", "개인 취향 반영", "리스크 분산"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 큐레이터형",
    summary: "브랜드 포트폴리오와 시즌 한정 전략 운영",
    traits: ["사전 리서치", "대안 준비", "기록 정리"],
    picks: ["시즌 한정", "프리미엄 라인", "특별 토핑"],
    tips: ["소용량 테스트", "공유 인원 고려", "재가열 가이드"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 조정형",
    summary: "여럿이 먹기 좋은 구성으로 만족 극대화",
    traits: ["공유 포장", "감사 멘트", "사진 담당"],
    picks: ["미니 햄버거 세트", "과일 주스", "디저트"],
    tips: ["결정권자 지정", "과소비 신호", "선호 레코드"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "따뜻한 챙김형",
    summary: "편안함과 안정감을 주는 루틴형",
    traits: ["자극 덜한 선택", "온도 확인", "휴지 준비"],
    picks: ["순한 패티", "부드러운 빵", "기본 야채"],
    tips: ["신메뉴 소량 체험", "유통기한 확인", "보관 용기"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 흥행형",
    summary: "리액션과 체험 중심의 베스트 픽",
    traits: ["신상 발견", "리뷰 올림", "사진 스토리"],
    picks: ["매운 패티", "특제 소스", "탄산"],
    tips: ["예산 캡", "매운 정도 체크", "수분 보충"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 미니멀형",
    summary: "심플하고 깔끔한 조합을 선호",
    traits: ["소용량 선호", "포장 깔끔", "잔말 없음"],
    picks: ["오리지널 패티", "기본 빵", "최소 야채"],
    tips: ["단백질 보강", "온도 주의", "휴지 챙기기"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 매니저형",
    summary: "규칙과 효율로 혼선을 최소화",
    traits: ["줄·시간 관리", "예산 준수", "정산 담당"],
    picks: ["묶음 할인", "세트 메뉴", "도시락"],
    tips: ["감성 픽 허용", "나눔 여지", "후기 공유"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 수호형",
    summary: "늘 먹던 메뉴의 안정감을 중시",
    traits: ["단골 브랜드", "루틴 고정", "영수증 보관"],
    picks: ["클래식 패티", "기본 번", "기본 사이드"],
    tips: ["신상 소량 테스트", "나트륨 체크", "수분 섭취"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 해결형",
    summary: "빠르게 담고 바로 즐기는 행동 중심",
    traits: ["문제 즉시 해결", "결정 빠름", "분위기 전환"],
    picks: ["핫 패티", "감자튀김", "에너지 드링크"],
    tips: ["단백질·섬유질 보완", "카페인 한도", "영수증 기록"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 셰이퍼형",
    summary: "필요한 것만 고르는 효율형",
    traits: ["체크리스트", "짧은 멘트", "감정 최소"],
    picks: ["기본 패티", "무 추가", "제로 음료"],
    tips: ["기한 표기", "톤 매칭", "보관 용기"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof hamburgerTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = hamburgerTypes[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  // 결과 ID가 있으면 결과 정보 로드
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
      {/* Main Result */}
      <main className="container max-w-[720px] mx-auto px-4 py-8">
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="hamburger-combo"
                  testPath="/tests/hamburger-combo/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🍔 ${character.label}(${mbtiType})! 너는 어떤 햄버거러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/hamburger-combo/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🍔</span>
              <span>당신의 조합 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg"
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
              <span>🍽️</span>
              <span>추천 조합</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg"
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
              <span>조합 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-orange-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-red-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "chicken-style",
                  title: "치킨 주문 스타일",
                  emoji: "🍗",
                  description: "치킨 주문 습관으로 알아보는 성격",
                  participants: "0",
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
                  description: "디저트 선택으로 알아보는 성격",
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
              className="border-2 border-orange-300 hover:bg-orange-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function HamburgerComboResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

