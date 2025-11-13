"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Fish, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const bungeoppangTypes = {
  ENFP: {
    label: "길거리 페스티벌형",
    summary: "현장 감각으로 신상부터 즐기는 스타일",
    traits: ["새 필링 도전", "즉흥 합류", "공유 적극"],
    picks: ["시즈널 슈크림", "피자필링", "한정 라떼"],
    tips: ["예산 상한 표시", "뜨거움 화상 주의", "단백질 보완"],
    match: "ISTJ, ISFJ",
    emoji: "🎉",
  },
  INFP: {
    label: "겨울 감성러",
    summary: "분위기와 순간 몰입이 중요한 힐링형",
    traits: ["조용한 시식", "패키지 감성", "추억 회상"],
    picks: ["고구마필링", "호지차", "초코 크림"],
    tips: ["당류 균형", "소용량로 만족도 확인", "따뜻한 음료 동행"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "나눔 리더",
    summary: "함께 먹을 사람을 먼저 떠올리는 배려형",
    traits: ["묶음 구매", "알레르기 체크", "후기 공유"],
    picks: ["팩 포장", "반반 구성", "논카페인 티"],
    tips: ["취향 수집 폼", "예산 공지", "남은 양 관리"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 있는 한입",
    summary: "원재료와 가치 기준으로 선별",
    traits: ["원산지·재료 확인", "일관 루틴", "낭비 최소"],
    picks: ["저당 팥", "견과 토핑", "곡물차"],
    tips: ["즉흥 슬롯 1개", "소용량 테스트", "휴지·가방 준비"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "조합 설계자",
    summary: "새 조합을 설계해 실험하는 타입",
    traits: ["두 필링 믹스", "먹는 순서 변주", "토론 유도"],
    picks: ["팥+슈 반반", "치즈 토핑", "소스 디핑"],
    tips: ["위생·열 체크", "칼로리 앵커", "실패 기록도 자산"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "데이터 테이스터",
    summary: "가격·중량·대기시간까지 비교",
    traits: ["단위가격 계산", "대기 최적화", "리뷰 기록"],
    picks: ["대왕 붕어빵", "가성비 묶음", "아메리카노"],
    tips: ["감성 픽 허용", "수분 보충", "휴대 파우치"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "동선 최적화 리더",
    summary: "줄·결제·나눔까지 프로세스 관리",
    traits: ["역동선 설계", "분담 지시", "시간 엄수"],
    picks: ["세트 구성", "블랙커피", "프로틴 음료"],
    tips: ["즉흥 여지 10%", "팀 취향 반영", "남은 양 처분 플랜"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 큐레이터",
    summary: "계절·재고·브랜드로 포트폴리오",
    traits: ["사전 리서치", "플랜B 예비", "기록 정리"],
    picks: ["시즌 한정", "프리미엄 코코아", "크런치 토핑"],
    tips: ["반반으로 리스크 분산", "나눔 고려", "핫팩 동행"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 조정가",
    summary: "여럿이 먹기 좋은 구성을 선호",
    traits: ["공유 포장", "감사 멘트", "사진 담당"],
    picks: ["미니 사이즈 다수", "과일 주스", "쿠키 추가"],
    tips: ["결정권자 지정", "과소비 신호 설정", "선호 레코드"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "따뜻한 챙김러",
    summary: "편안함·안정 우선의 루틴형",
    traits: ["소화 편한 선택", "온도 확인", "예비 휴지"],
    picks: ["플레인 팥", "따뜻한 차", "곡물바"],
    tips: ["즉흥 경험 1개 허용", "유통기한 확인", "휴지 여분"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 흥행러",
    summary: "현장 감각으로 베스트 픽",
    traits: ["리액션 풍부", "한정템 선호", "체험 공유"],
    picks: ["슈크림", "시나몬 토핑", "탄산 음료"],
    tips: ["예산 캡", "염분·당류 체크", "물 보충"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 미니멀",
    summary: "심플하고 깔끔한 선택",
    traits: ["소용량 선호", "포장 깔끔", "잔말 없음"],
    picks: ["작은 팥빵", "저당 음료", "플레인 요구르트"],
    tips: ["단백질 보강", "온도 주의", "휴지 챙기기"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "프로세스 매니저",
    summary: "규칙·효율로 혼선 최소화",
    traits: ["줄 정리", "예산 준수", "정산 담당"],
    picks: ["묶음 할인", "생수 1+1", "세트 도시락"],
    tips: ["감성 픽 허용", "나눔 여지", "후기 공유"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 수호자",
    summary: "늘 먹던 메뉴의 안정감",
    traits: ["단골 브랜드", "루틴 고정", "영수증 보관"],
    picks: ["오리지널 팥", "스트레이트 커피", "클래식 샌드"],
    tips: ["신상 소용량 테스트", "소금·당 체크", "수분 섭취"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 해결사",
    summary: "빠르게 담고 바로 즐김",
    traits: ["행동 중심", "문제 즉시 해결", "분위기 전환"],
    picks: ["핫바", "즉석라면", "에너지 드링크"],
    tips: ["단백질·섬유질 보완", "카페인 한도", "영수증 기록"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 셰이퍼",
    summary: "필요한 것만 고르는 효율형",
    traits: ["체크리스트", "짧은 멘트", "감정 최소"],
    picks: ["견과 소포장", "무가당 티", "플레인 요구르트"],
    tips: ["기한 표기", "상대 톤 매칭", "보관 용기"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof bungeoppangTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = bungeoppangTypes[mbtiType]
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
                  testId="bungeoppang-style"
                  testPath="/tests/bungeoppang-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🐟 ${character.label}(${mbtiType})! 너는 어떤 붕어빵러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/bungeoppang-style/test">
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
              <span>🐟</span>
              <span>당신의 취향 특징</span>
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
              <span>추천 픽</span>
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
              <span>구매 팁</span>
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
                  slug: "ramen-style",
                  title: "라면 취향",
                  emoji: "🍜",
                  description: "라면 선택으로 알아보는 성격",
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
                  slug: "food-delivery",
                  title: "배달 음식 선택",
                  emoji: "🍕",
                  description: "배달 습관으로 알아보는 성격",
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

export default function BungeoppangStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
