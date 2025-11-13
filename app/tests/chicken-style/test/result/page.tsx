"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Drumstick, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const chickenTypes = {
  ENFP: {
    label: "즉흥 파티형",
    summary: "분위기 타고 신메뉴를 즐기는 확산형 주문가",
    traits: ["신상 우선", "단톡 공유 활발", "반반 조합"],
    picks: ["양념 반반", "치즈볼", "스파클링"],
    tips: ["예산 상한선 표시", "매운 단계 확인", "후기 요약 저장"],
    match: "ISTJ, ISFJ",
    emoji: "🎉",
  },
  INFP: {
    label: "감성 몰입형",
    summary: "조용히 최고의 한 조각에 몰입하는 힐링 지향",
    traits: ["혼주 선호", "분위기 중시", "사진 기록"],
    picks: ["허니콤보", "고구마치즈볼", "제로콜라"],
    tips: ["단백질 보완", "과식 신호 설정", "소용량 주문"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "나눔 리더형",
    summary: "모두가 만족하도록 메뉴와 양을 조율",
    traits: ["알레르기 체크", "공평 분배", "사이드 밸런스"],
    picks: ["반반 세트", "샐러드", "논카페인 티"],
    tips: ["선호 폼 수집", "남은 양 플랜", "정산 안내"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 선택형",
    summary: "브랜드 가치와 원재료 기준으로 선별",
    traits: ["성분 확인", "낭비 최소", "루틴 유지"],
    picks: ["오븐구이", "곡물차", "저당 소스"],
    tips: ["즉흥 슬롯 1개", "리뷰 편향 주의", "보관 용기 준비"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "조합 설계형",
    summary: "소스와 사이드 조합으로 실험하는 전략가",
    traits: ["두 소스 믹스", "새 메뉴 테스트", "토론 유도"],
    picks: ["양념+간장 반반", "디핑 소스 2종", "웨지감자"],
    tips: ["위생·온도 체크", "카페인 한도", "실패 기록도 자산"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "데이터 최적화형",
    summary: "가격·중량·대기시간을 비교해 합리화",
    traits: ["단위가격 계산", "쿠폰 최적화", "리뷰 분석"],
    picks: ["가성비 후라이드", "대용량 세트", "아메리카노"],
    tips: ["감성 픽 허용", "나트륨 관리", "수분 보충"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "프로세스 리더형",
    summary: "모집·주문·정산·배분을 한 번에 관리",
    traits: ["타임라인 공지", "역할 분담", "정확 정산"],
    picks: ["패밀리 세트", "프로틴 음료", "콜라 1.5L"],
    tips: ["즉흥 여지 10%", "개인 취향 반영", "리스크 분산 반반"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 큐레이터형",
    summary: "브랜드 포트폴리오와 시즌 한정 전략 운영",
    traits: ["사전 리서치", "대안 준비", "기록 정리"],
    picks: ["시즌 한정", "프리미엄 라인", "크런치 토핑"],
    tips: ["소용량 테스트", "공유 인원 고려", "재가열 가이드"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 조정형",
    summary: "여럿이 먹기 좋은 구성으로 만족 극대화",
    traits: ["공유 포장", "감사 멘트", "사진 담당"],
    picks: ["미니드럼세트", "과일 주스", "샐러드"],
    tips: ["결정권자 지정", "과소비 신호", "선호 레코드"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "따뜻한 챙김형",
    summary: "편안함과 안정감을 주는 루틴형",
    traits: ["자극 덜한 선택", "온도 확인", "휴지 준비"],
    picks: ["순살 후라이드", "옥수수콘", "허브티"],
    tips: ["신메뉴 소량 체험", "유통기한 확인", "보관 용기"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 흥행형",
    summary: "리액션과 체험 중심의 베스트 픽",
    traits: ["신상 발견", "리뷰 올림", "사진 스토리"],
    picks: ["매운 양념", "치즈링", "탄산"],
    tips: ["예산 캡", "매운 정도 체크", "수분 보충"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 미니멀형",
    summary: "심플하고 깔끔한 조합을 선호",
    traits: ["소용량 선호", "포장 깔끔", "잔말 없음"],
    picks: ["오리지널 후라이드", "무가당 티", "플레인 요구르트"],
    tips: ["단백질 보강", "온도 주의", "휴지 챙기기"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 매니저형",
    summary: "규칙과 효율로 혼선을 최소화",
    traits: ["줄·시간 관리", "예산 준수", "정산 담당"],
    picks: ["묶음 할인", "생수 1+1", "도시락 세트"],
    tips: ["감성 픽 허용", "나눔 여지", "후기 공유"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 수호형",
    summary: "늘 먹던 메뉴의 안정감을 중시",
    traits: ["단골 브랜드", "루틴 고정", "영수증 보관"],
    picks: ["간장 치킨", "스트레이트 커피", "클래식 사이드"],
    tips: ["신상 소량 테스트", "나트륨 체크", "수분 섭취"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 해결형",
    summary: "빠르게 담고 바로 즐기는 행동 중심",
    traits: ["문제 즉시 해결", "결정 빠름", "분위기 전환"],
    picks: ["핫양념", "웨지감자", "에너지 드링크"],
    tips: ["단백질·섬유질 보완", "카페인 한도", "영수증 기록"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 셰이퍼형",
    summary: "필요한 것만 고르는 효율형",
    traits: ["체크리스트", "짧은 멘트", "감정 최소"],
    picks: ["순살 후라이드", "무 추가", "제로 음료"],
    tips: ["기한 표기", "톤 매칭", "보관 용기"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof chickenTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = chickenTypes[mbtiType]
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
                  className="mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="chicken-style"
                  testPath="/tests/chicken-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🍗 ${character.label}(${mbtiType})! 너는 어떤 치킨러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/chicken-style/test">
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
              <span>🍗</span>
              <span>당신의 주문 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg"
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
              <span>추천 메뉴</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg"
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
              <span>주문 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-yellow-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-orange-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
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
                  slug: "home-cooking",
                  title: "자취 밥상",
                  emoji: "🍳",
                  description: "자취 요리 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "cafe-style",
                  title: "카페 스타일",
                  emoji: "☕",
                  description: "카페 취향으로 알아보는 성격",
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
              className="border-2 border-yellow-300 hover:bg-yellow-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function ChickenStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
