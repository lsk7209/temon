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

const pizzaTypes = {
  ENFP: {
    label: "즉흥 탐험형",
    summary: "신메뉴와 특이한 토핑을 즐기는 확산형",
    description: [
      "피자집에 새로운 토핑이 나오면 가장 먼저 시도해보는 당신! 페퍼로니, 하와이안, 고구마, 불닭까지... 모든 조합이 당신의 호기심을 자극해요.",
      "친구들에게 '이거 진짜 맛있어!'라며 새로운 발견을 공유하는 것을 좋아하고, SNS에 예쁜 피자 사진을 올리는 것도 빼놓지 않아요.",
      "때로는 실패작을 만나기도 하지만, '이것도 경험이지!'라며 긍정적으로 받아들이는 모험가 정신을 가지고 있어요.",
    ],
    traits: ["신메뉴 우선", "토핑 여러 개", "사진 공유"],
    picks: ["하와이안", "불닭 피자", "고구마 토핑"],
    tips: ["칼로리 체크", "토핑 비율 조절", "후기 기록"],
    match: "ISTJ, ISFJ",
    emoji: "🎉",
  },
  INFP: {
    label: "감성 클래식형",
    summary: "조용히 완벽한 한 조각에 몰입하는 힐링 지향",
    description: [
      "피자 한 조각을 보며 상상의 나래를 펼치는 당신! 맛보다는 분위기와 감성을 중요하게 생각하는 로맨틱한 피자 애호가예요.",
      "창가 자리에 앉아 따뜻한 피자 한 조각과 함께 책을 읽거나 음악을 들으며 혼자만의 시간을 소중히 여겨요.",
      "피자 위의 토핑 배치를 보며 감동받고, 그 순간을 오래 기억하는 감성적인 모습이 정말 아름다워요.",
    ],
    traits: ["클래식 선호", "분위기 중시", "혼자 즐김"],
    picks: ["마르게리타", "페퍼로니", "치즈 피자"],
    tips: ["과식 주의", "영양 균형", "소용량 주문"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "나눔 리더형",
    summary: "모두가 만족하도록 토핑과 조각을 조율",
    description: [
      "회사나 모임에서 피자 주문을 대표로 받아서 한 번에 결제하는 당신! 모든 사람의 취향을 기억하고 배려하는 따뜻한 마음의 소유자예요.",
      "'누구는 페퍼로니, 누구는 하와이안...' 복잡한 주문도 완벽하게 기억해서 실수 없이 전달하는 놀라운 능력을 가지고 있어요.",
      "피자 한 조각으로도 사람들을 행복하게 만들고, 팀의 분위기를 따뜻하게 만드는 마법 같은 힘을 가지고 있어요.",
    ],
    traits: ["알레르기 체크", "공평 분배", "세트 구성"],
    picks: ["반반 피자", "콤비네이션", "하프앤하프"],
    tips: ["선호 수집", "나눔 플랜", "정산 안내"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 선택형",
    summary: "브랜드 가치와 원재료 기준으로 선별",
    description: [
      "피자의 향만 맡아도 그 피자의 맛을 정확하게 예측하는 신비로운 능력을 가진 당신! 피자에 대한 깊은 이해와 직감을 동시에 가지고 있어요.",
      "단순히 배부름이 아니라 피자 한 조각에 담긴 스토리와 의미를 중요하게 생각하며, 토핑의 원산지와 가공 과정까지 관심을 가져요.",
      "당신이 추천하는 피자는 항상 특별한 의미가 있고, 그 순간에 딱 맞는 완벽한 선택이 되어줘요.",
    ],
    traits: ["성분 확인", "유기농 선호", "루틴 유지"],
    picks: ["오가닉 피자", "시그니처", "프리미엄 라인"],
    tips: ["즉흥 슬롯 1개", "칼로리 관리", "보관 용기"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "조합 실험형",
    summary: "토핑과 소스 조합으로 실험하는 전략가",
    description: [
      "메뉴에 없는 나만의 피자 조합을 만들어내는 창의적인 실험가! 페퍼로니 추가, 다양한 소스 믹스, 특별한 토핑까지... 무한한 가능성을 탐구해요.",
      "피자집 직원에게 '이거랑 저거 섞어서 만들어주세요!'라고 당당하게 요청하고, 새로운 맛의 조합을 발견하는 것을 즐겨요.",
      "때로는 실패작이 나와도 '다음엔 이렇게 해봐야지!'라며 끊임없이 연구하는 모습이 정말 멋져요.",
    ],
    traits: ["토핑 믹스", "소스 조합", "토론 유도"],
    picks: ["페퍼로니+하와이안", "불닭+치즈", "고구마+베이컨"],
    tips: ["위생 체크", "칼로리 관리", "실패 기록도 자산"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "데이터 최적화형",
    summary: "가격·칼로리·영양을 비교해 합리화",
    description: [
      "피자 한 조각의 가격, 칼로리, 영양 정보를 정확하게 계산하는 분석가! 모든 선택에는 논리와 데이터가 있어요.",
      "여러 피자집의 메뉴를 비교 분석하고, 최적의 가성비를 찾아내는 놀라운 능력을 가지고 있어요.",
      "감성보다는 합리성을 중시하지만, 가끔은 '오늘은 특별한 날이니까!'라며 자신에게 작은 선물을 주는 여유도 있어요.",
    ],
    traits: ["단위가격 계산", "영양 분석", "리뷰 비교"],
    picks: ["가성비 피자", "라지 사이즈", "칼로리 낮은 토핑"],
    tips: ["감성 픽 허용", "나트륨 관리", "수분 보충"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "프로세스 리더형",
    summary: "주문·결제·배분을 한 번에 관리",
    description: [
      "피자 주문부터 배분까지 모든 과정을 효율적으로 관리하는 리더! 타임라인을 정확하게 짜고, 모든 사람의 역할을 명확하게 분담해요.",
      "예산을 정확하게 계산하고, 정산을 깔끔하게 처리하는 능력이 뛰어나서 모두가 당신을 신뢰해요.",
      "때로는 '오늘은 좀 느슨하게 가자'라며 팀의 분위기를 조절하는 센스도 있어요.",
    ],
    traits: ["타임라인 공지", "역할 분담", "정확 정산"],
    picks: ["패밀리 세트", "프리미엄 피자", "콜라 1.5L"],
    tips: ["즉흥 여지 10%", "개인 취향 반영", "리스크 분산"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 큐레이터형",
    summary: "브랜드 포트폴리오와 시즌 한정 전략 운영",
    description: [
      "각 피자집의 특색과 시즌 한정 메뉴를 정확하게 파악하는 큐레이터! 사전 리서치를 철저히 하고, 대안까지 준비해요.",
      "피자 한 조각에도 전략이 있어요. 오늘의 목적, 분위기, 예산에 맞는 완벽한 선택을 만들어내요.",
      "모든 경험을 기록하고 정리하여, 다음번에는 더 나은 선택을 할 수 있도록 준비하는 철저함이 인상적이에요.",
    ],
    traits: ["사전 리서치", "대안 준비", "기록 정리"],
    picks: ["시즌 한정", "프리미엄 라인", "특별 토핑"],
    tips: ["소용량 테스트", "공유 인원 고려", "재가열 가이드"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 조정형",
    summary: "여럿이 먹기 좋은 구성으로 만족 극대화",
    description: [
      "모두가 만족할 수 있는 피자 조합을 만들어내는 분위기 메이커! 각자의 취향을 세심하게 고려하고, 모두가 행복해지는 선택을 해요.",
      "피자 한 조각을 나눠 먹을 때도 공평하게 분배하고, 모두가 즐거워하는 모습을 보며 행복해해요.",
      "사진을 찍어서 추억을 남기고, 후기를 작성해서 다른 사람들에게도 도움을 주는 따뜻한 마음을 가지고 있어요.",
    ],
    traits: ["공유 포장", "감사 멘트", "사진 담당"],
    picks: ["콤비네이션", "하프앤하프", "디저트 피자"],
    tips: ["결정권자 지정", "과소비 신호", "선호 레코드"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "따뜻한 챙김형",
    summary: "편안함과 안정감을 주는 루틴형",
    description: [
      "늘 먹던 피자로 안정감을 찾는 당신! 변화보다는 익숙함을 선호하고, 예상 가능한 맛에서 위로를 받아요.",
      "다른 사람들의 취향을 기억하고, 그들이 좋아하는 피자를 미리 주문해주는 따뜻한 마음을 가지고 있어요.",
      "피자 한 조각을 먹으며 하루의 피로를 풀고, 소중한 사람들과의 시간을 즐기는 것을 가장 중요하게 생각해요.",
    ],
    traits: ["자극 덜한 선택", "온도 확인", "휴지 준비"],
    picks: ["치즈 피자", "마르게리타", "페퍼로니"],
    tips: ["신메뉴 소량 체험", "유통기한 확인", "보관 용기"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 흥행형",
    summary: "리액션과 체험 중심의 베스트 픽",
    description: [
      "피자를 보는 순간 '와!'라고 외치는 당신! 리액션이 크고, 분위기를 띄우는 것을 좋아해요.",
      "신메뉴가 나오면 가장 먼저 시도해보고, 맛있으면 친구들에게 적극 추천하는 열정적인 모습이 인상적이에요.",
      "피자 한 조각을 먹으며 행복해하는 모습이 주변 사람들에게도 긍정적인 에너지를 전달해요.",
    ],
    traits: ["신상 발견", "리뷰 올림", "사진 스토리"],
    picks: ["불닭 피자", "고구마 피자", "하와이안"],
    tips: ["예산 캡", "매운 정도 체크", "수분 보충"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 미니멀형",
    summary: "심플하고 깔끔한 조합을 선호",
    description: [
      "복잡한 토핑보다는 심플한 조합을 선호하는 당신! 기본에 충실하면서도 나만의 취향을 찾아요.",
      "피자 한 조각을 조용히 즐기며, 그 순간의 맛과 감각에 집중하는 것을 좋아해요.",
      "과하지 않은 것에서 아름다움을 찾고, 소소한 행복을 누리는 여유로운 삶의 태도를 가지고 있어요.",
    ],
    traits: ["소용량 선호", "포장 깔끔", "잔말 없음"],
    picks: ["마르게리타", "치즈 피자", "페퍼로니"],
    tips: ["단백질 보강", "온도 주의", "휴지 챙기기"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 매니저형",
    summary: "규칙과 효율로 혼선을 최소화",
    description: [
      "피자 주문도 계획적으로 하는 당신! 예산을 정확하게 계산하고, 시간을 효율적으로 관리해요.",
      "모든 사람의 역할을 명확하게 분담하고, 정산을 깔끔하게 처리하는 능력이 뛰어나요.",
      "때로는 '오늘은 좀 느슨하게 가자'라며 팀의 분위기를 조절하는 센스도 있어요.",
    ],
    traits: ["줄·시간 관리", "예산 준수", "정산 담당"],
    picks: ["세트 메뉴", "할인 피자", "콤보"],
    tips: ["감성 픽 허용", "나눔 여지", "후기 공유"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 수호형",
    summary: "늘 먹던 메뉴의 안정감을 중시",
    description: [
      "항상 같은 피자를 주문하는 당신! 변화보다는 안정감을 선호하고, 예상 가능한 맛에서 위로를 받아요.",
      "피자 한 조각을 먹는 순서도 정해져 있고, 그 루틴을 지키는 것이 중요해요.",
      "새로운 것을 시도하는 것도 좋지만, 기본에 충실한 것이 가장 안전하고 확실하다고 믿어요.",
    ],
    traits: ["단골 브랜드", "루틴 고정", "영수증 보관"],
    picks: ["페퍼로니", "치즈 피자", "마르게리타"],
    tips: ["신상 소량 테스트", "나트륨 체크", "수분 섭취"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 해결형",
    summary: "빠르게 담고 바로 즐기는 행동 중심",
    description: [
      "피자를 보는 순간 바로 먹기 시작하는 당신! 계획보다는 즉흥적인 행동을 선호해요.",
      "복잡한 고민 없이 '이거 맛있어 보인다!'라는 직감으로 선택하고, 그 순간을 즐기는 것을 좋아해요.",
      "피자 한 조각을 먹으며 행복해하는 모습이 주변 사람들에게도 긍정적인 에너지를 전달해요.",
    ],
    traits: ["문제 즉시 해결", "결정 빠름", "분위기 전환"],
    picks: ["불닭 피자", "고구마 피자", "하와이안"],
    tips: ["단백질·섬유질 보완", "카페인 한도", "영수증 기록"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 셰이퍼형",
    summary: "필요한 것만 고르는 효율형",
    description: [
      "불필요한 토핑 없이 필요한 것만 선택하는 당신! 실용성과 효율성을 중시해요.",
      "피자 한 조각을 먹는 방법도 가장 효율적인 방법을 찾아내는 능력이 뛰어나요.",
      "과하지 않은 것에서 아름다움을 찾고, 소소한 행복을 누리는 여유로운 삶의 태도를 가지고 있어요.",
    ],
    traits: ["체크리스트", "짧은 멘트", "감정 최소"],
    picks: ["페퍼로니", "치즈 피자", "마르게리타"],
    tips: ["기한 표기", "톤 매칭", "보관 용기"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof pizzaTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = pizzaTypes[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

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
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="pizza-topping"
                  testPath="/tests/pizza-topping/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🍕 ${character.label}(${mbtiType})! 너는 어떤 피자러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/pizza-topping/test">
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
              <span>🍕</span>
              <span>당신의 피자 스타일</span>
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

        {/* Traits */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🍕</span>
              <span>당신의 토핑 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg"
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
              <span>추천 토핑 조합</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg"
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
              <span>토핑 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">{index + 1}.</span>
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
                  slug: "hamburger-combo",
                  title: "햄버거 조합 스타일",
                  emoji: "🍔",
                  description: "햄버거 조합으로 알아보는 성격",
                  participants: "0",
                },
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

        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-red-300 hover:bg-red-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function PizzaToppingResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

