"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, ShoppingBag, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const cvsComboTypes = {
  ENFP: {
    label: "즉흥 탐험형",
    summary: "무드 따라 신상품을 섞는 조합 메이커",
    traits: ["바이브 우선", "공유 활발", "반짝 기획"],
    picks: ["신상 삼각김밥+스파클링", "매운 컵라면+치즈볼", "시즈널 디저트+아메리카노"],
    tips: ["예산 상한선 지정", "나트륨 체크", "실패 조합 기록"],
    match: "ISTJ, ISFJ",
    emoji: "🎉",
  },
  INFP: {
    label: "감성 힐링형",
    summary: "고요하게 취향 조합을 음미하는 몰입가",
    traits: ["분위기 중시", "소량 만족", "조용한 루틴"],
    picks: ["요거트+그래놀라", "허브티+견과", "훈제란+두유"],
    tips: ["단백질 보완", "당류 확인", "소용량 유지"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "배려 큐레이터형",
    summary: "함께 먹기 좋은 구성으로 만족 극대화",
    traits: ["선호 파악", "공평 분배", "리뷰 요약"],
    picks: ["도시락 세트+샐러드", "김밥+미니과일", "순한 컵라면+계란"],
    tips: ["알레르기 체크", "양 조절", "쓰레기 분리 배출"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 선별형",
    summary: "성분·가치를 따져 깔끔 조합을 유지",
    traits: ["성분 체크", "낭비 최소", "정돈된 루틴"],
    picks: ["현미 주먹밥+두부샐러드", "무가당 요거트+블루베리", "오트 드링크+너트바"],
    tips: ["즉흥 슬롯 1개", "유통기한 검토", "재활용 분리"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "레시피 실험형",
    summary: "소스·가열·믹스업으로 새로운 맛 설계",
    traits: ["조합 실험", "후기 작성", "논리 토론"],
    picks: ["컵라면+치즈추가", "삼각김밥 말아먹기", "핫도그+머스타드믹스"],
    tips: ["위생·온도 주의", "카페인 한도", "실패도 기록"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "데이터 최적화형",
    summary: "가격·중량·영양 지표로 합리 조합 산출",
    traits: ["단위가성비", "쿠폰 최적화", "라벨 비교"],
    picks: ["가성비 도시락+생수", "프로틴 바+무가당 커피", "훈제란+그릭요거트"],
    tips: ["감성 픽 허용", "나트륨 관리", "수분 보충"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "프로세스 리더형",
    summary: "미션처럼 목표·시간·예산을 관리",
    traits: ["타임라인", "예산 준수", "역할 분담"],
    picks: ["패밀리 도시락+대용량 음료", "샐러드+프로틴 드링크", "구운계란+블랙커피"],
    tips: ["즉흥 10% 허용", "팀 취향 반영", "사후 리뷰"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 큐레이터형",
    summary: "브랜드·라인업 포트폴리오로 시즌 운영",
    traits: ["사전 리서치", "대안 준비", "기록 정리"],
    picks: ["프리미엄 도시락+탄산수", "저당 라인+견과", "샌드위치+콜드브루"],
    tips: ["소용량 테스트", "보관 설계", "재구매 리스트"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 조정형",
    summary: "여럿이 나눠 먹기 좋은 구성 설계",
    traits: ["공유 포장", "감사 표현", "사진 담당"],
    picks: ["미니 도넛 팩+우유", "주먹밥+어묵바", "쿠키팩+차"],
    tips: ["결정권자 지정", "과소비 경계", "선호 기록"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "따뜻한 챙김형",
    summary: "편안한 맛과 안정 루틴을 유지",
    traits: ["자극 덜함", "온도 확인", "휴지 준비"],
    picks: ["참치 삼각김밥+미소국", "순한 컵라면+계란", "식빵+우유"],
    tips: ["신상 소량 체험", "기한 점검", "보온 팁"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 흥행형",
    summary: "보이면 담고 즐기는 체험 중심",
    traits: ["신상 발견", "리뷰 업로드", "스토리 기록"],
    picks: ["맵단 디저트+탄산", "치즈 핫도그+소스 2종", "스낵팩+아이스커피"],
    tips: ["예산 캡", "매운 정도 확인", "수분 보충"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 미니멀형",
    summary: "심플한 조합으로 깔끔하게 해결",
    traits: ["소용량 선호", "포장 깔끔", "말수 적음"],
    picks: ["오리지널 삼각김밥+생수", "샐러드+무가당 티", "바나나+요거트"],
    tips: ["단백질 보강", "온도 주의", "휴지 챙기기"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 매니저형",
    summary: "동선·시간·예산으로 혼선 최소화",
    traits: ["줄 관리", "예산 준수", "정산 담당"],
    picks: ["묶음 할인 음료+견과", "대용량 샐러드+프로틴", "식사대용 쉐이크"],
    tips: ["감성 픽 허용", "나눔 여지", "리뷰 공유"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 수호형",
    summary: "늘 먹던 안정 조합을 신뢰",
    traits: ["단골 브랜드", "루틴 고정", "영수증 보관"],
    picks: ["후레쉬 샌드+우유", "기본 컵라면+김치컵", "주먹밥+두유"],
    tips: ["신상 소량 실험", "나트륨 체크", "수분 섭취"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 해결형",
    summary: "빠르게 담고 바로 즐기는 행동 중심",
    traits: ["결정 빠름", "문제 즉시 해결", "분위기 전환"],
    picks: ["핫스파이시 컵라면+삼각김밥", "핫도그+에너지 드링크", "치킨스낵+콜라"],
    tips: ["섬유질 보완", "카페인 한도", "영수증 기록"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 셰이퍼형",
    summary: "필요한 것만 고르는 효율형",
    traits: ["체크리스트", "짧은 멘트", "감정 최소"],
    picks: ["프로틴 바+생수", "훈제란+샐러드", "컵라면+김"],
    tips: ["기한 표기", "톤 매칭", "보관 용기"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof cvsComboTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = cvsComboTypes[mbtiType]
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
                  className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="cvs-combo"
                  testPath="/tests/cvs-combo/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🏪 ${character.label}(${mbtiType})! 너는 어떤 편의점러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/cvs-combo/test">
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
              <span>🏪</span>
              <span>당신의 조합 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg"
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
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg"
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
              <span>쇼핑 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-emerald-500" />
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
                  slug: "shopping-style",
                  title: "쇼핑 스타일",
                  emoji: "🛍️",
                  description: "쇼핑 습관으로 알아보는 성격",
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
              className="border-2 border-green-300 hover:bg-green-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function CvsComboResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

