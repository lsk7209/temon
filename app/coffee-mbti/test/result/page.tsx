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

const coffeeCharacters = {
  ENFP: {
    name: "신메뉴 헌터",
    emoji: "🥤",
    summary: '"새로 나왔대!" 즉시 직행',
    description: [
      "카페에 새로운 메뉴가 나오면 가장 먼저 시도해보는 당신! 시즌 한정 메뉴, 콜라보 음료, 특별한 토핑까지... 모든 신메뉴가 당신의 호기심을 자극해요.",
      "친구들에게 '이거 진짜 맛있어!'라며 새로운 발견을 공유하는 것을 좋아하고, SNS에 예쁜 음료 사진을 올리는 것도 빼놓지 않아요.",
      "때로는 실패작을 만나기도 하지만, '이것도 경험이지!'라며 긍정적으로 받아들이는 모험가 정신을 가지고 있어요.",
    ],
    recommendedBeans: ["🌈 시즌 블렌드", "🍓 플레이버드 원두", "🌸 벚꽃 라떼", "🥥 코코넛 콜드브루"],
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "몽상 라떼리스트",
    emoji: "☁️",
    summary: "폼 거품 보며 상상 여행",
    description: [
      "라떼 위의 거품 모양을 보며 상상의 나래를 펼치는 당신! 카페인보다는 분위기와 감성을 중요하게 생각하는 로맨틱한 커피 애호가예요.",
      "창가 자리에 앉아 따뜻한 라떼 한 잔과 함께 책을 읽거나 음악을 들으며 혼자만의 시간을 소중히 여겨요.",
      "바리스타가 만들어준 라떼 아트를 보며 감동받고, 그 순간을 오래 기억하는 감성적인 모습이 정말 아름다워요.",
    ],
    recommendedBeans: ["🌙 문라이트 블렌드", "🌸 바닐라 라떼", "🍯 허니 오트 라떼", "🌿 캐모마일 라떼"],
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "단체커피 서포터",
    emoji: "🧾",
    summary: "모두 주문 받아 대표 결제",
    description: [
      "회사나 모임에서 커피 주문을 대표로 받아서 한 번에 결제하는 당신! 모든 사람의 취향을 기억하고 배려하는 따뜻한 마음의 소유자예요.",
      "'누구는 디카페인, 누구는 시럽 빼고...' 복잡한 주문도 완벽하게 기억해서 실수 없이 전달하는 놀라운 능력을 가지고 있어요.",
      "커피 한 잔으로도 사람들을 행복하게 만들고, 팀의 분위기를 따뜻하게 만드는 마법 같은 힘을 가지고 있어요.",
    ],
    recommendedBeans: ["🤝 팀워크 블렌드", "☕ 클래식 아메리카노", "🥛 부드러운 카페라떼", "🍪 쿠키 크림 라떼"],
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "향기 예언가",
    emoji: "🌿",
    summary: "원두 향만으로 맛 예측",
    description: [
      "원두의 향만 맡아도 그 커피의 맛을 정확하게 예측하는 신비로운 능력을 가진 당신! 커피에 대한 깊은 이해와 직감을 동시에 가지고 있어요.",
      "단순히 카페인 섭취가 아니라 커피 한 잔에 담긴 스토리와 의미를 중요하게 생각하며, 원두의 원산지와 가공 과정까지 관심을 가져요.",
      "당신이 추천하는 커피는 항상 특별한 의미가 있고, 그 순간에 딱 맞는 완벽한 선택이 되어줘요.",
    ],
    recommendedBeans: ["🔮 미스터리 블렌드", "🌿 허브 인퓨즈드", "🌙 미드나이트 로스트", "✨ 시그니처 블렌드"],
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "커스텀 믹솔로지",
    emoji: "⚗️",
    summary: "샷+우유+토핑 조합 연구",
    description: [
      "메뉴에 없는 나만의 커피 조합을 만들어내는 창의적인 실험가! 에스프레소 샷 추가, 다양한 시럽 믹스, 특별한 토핑까지... 무한한 가능성을 탐구해요.",
      "바리스타에게 '이거랑 저거 섞어서 만들어주세요!'라고 당당하게 요청하고, 새로운 맛의 조합을 발견하는 것을 즐겨요.",
      "때로는 실패작이 나와도 '다음엔 이렇게 해봐야지!'라며 끊임없이 연구하는 모습이 정말 멋져요.",
    ],
    recommendedBeans: ["🧪 실험용 블렌드", "🌈 멀티 플레이버", "⚡ 더블샷 베이스", "🎨 크리에이티브 믹스"],
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "TDS 분석러",
    emoji: "📊",
    summary: "추출 시간·그램 수 기록",
    description: [
      "커피 추출의 모든 변수를 과학적으로 분석하는 당신! TDS(총용존고형물) 측정, 추출 시간, 원두 그램 수까지 모든 것을 정확하게 기록해요.",
      "핸드드립을 할 때는 온도계와 저울을 사용해서 완벽한 커피를 만들어내고, 매번 일정한 품질을 유지하는 놀라운 일관성을 보여줘요.",
      "당신이 내린 커피는 항상 과학적 근거에 바탕한 완벽한 맛을 자랑하며, 다른 사람들이 그 비법을 궁금해해요.",
    ],
    recommendedBeans: ["📊 데이터 드리븐 블렌드", "⚖️ 정밀 측정용", "🔬 사이언스 로스트", "📈 최적화 원두"],
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "타임 효율러",
    emoji: "🚀",
    summary: "픽업 동선·대기 0초 설계",
    description: [
      "카페에서의 모든 동선을 효율적으로 계획하는 시간 관리의 달인! 앱 주문, 픽업 시간 계산, 최적의 루트까지 모든 것이 체계적으로 설계되어 있어요.",
      "대기 시간 없이 커피를 받아서 바로 다음 일정으로 넘어가는 완벽한 스케줄 관리 능력을 가지고 있어요.",
      "당신의 커피 루틴을 보면 다른 사람들이 '어떻게 저렇게 효율적일 수 있지?'라며 감탄하게 되는 놀라운 시스템을 구축했어요.",
    ],
    recommendedBeans: ["🚀 스피드 블렌드", "⏰ 퀵 에스프레소", "💼 비즈니스 로스트", "⚡ 에너지 부스터"],
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "콜드브루 집사",
    emoji: "🧊",
    summary: "24 시간 침출 완벽 관리",
    description: [
      "콜드브루 제작의 모든 과정을 완벽하게 관리하는 장인 정신의 소유자! 24시간 침출 시간, 원두와 물의 비율, 필터링까지 모든 단계가 정밀하게 계획되어 있어요.",
      "한 번 완성한 콜드브루 레시피는 거의 수정하지 않으며, 매번 동일한 퀄리티의 완벽한 커피를 만들어내는 놀라운 일관성을 자랑해요.",
      "당신만의 콜드브루는 마치 예술 작품과 같은 완성도를 가지고 있으며, 그 깊고 부드러운 맛에 모든 사람이 감탄해요.",
    ],
    recommendedBeans: ["🧊 콜드브루 전용", "🌙 슬로우 로스트", "💎 프리미엄 블렌드", "🎯 퍼펙션 원두"],
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFP: {
    name: "브이로그 바리스타",
    emoji: "📸",
    summary: "테이블·조명 셋, 사진 찍고 즐김",
    description: [
      "카페에서의 모든 순간을 아름답게 기록하는 당신! 완벽한 조명, 예쁜 테이블 세팅, 인스타그램용 각도까지... 커피 한 잔도 작품으로 만들어내요.",
      "친구들과 함께 카페에 가면 자연스럽게 포토그래퍼가 되어서 모든 사람의 예쁜 순간을 담아주는 따뜻한 마음을 가지고 있어요.",
      "당신이 찍은 커피 사진은 항상 SNS에서 많은 좋아요를 받고, 그 카페가 핫플레이스가 되는 마법 같은 힘을 가지고 있어요.",
    ],
    recommendedBeans: ["📸 포토제닉 블렌드", "🌈 컬러풀 라떼", "✨ 인스타 스페셜", "🎉 파티 믹스"],
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ISFP: {
    name: "감성 드리퍼",
    emoji: "🎶",
    summary: "핸드드립 소리·향에 몰입",
    description: [
      "핸드드립하는 과정 자체를 하나의 명상처럼 즐기는 당신! 물이 원두를 적시는 소리, 피어오르는 향, 천천히 떨어지는 커피 방울까지... 모든 순간에 감성을 담아요.",
      "커피를 내리는 시간은 당신만의 소중한 힐링 타임이며, 그 과정에서 하루의 스트레스가 모두 사라져요.",
      "당신이 정성스럽게 내린 커피는 단순한 음료가 아니라 따뜻한 마음이 담긴 선물 같은 의미를 가지고 있어요.",
    ],
    recommendedBeans: ["🎶 하모니 블렌드", "🌸 플로럴 노트", "🍯 스위트 드립", "🌿 내추럴 프로세스"],
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ESTP: {
    name: "에너지 샷러",
    emoji: "⚡",
    summary: "더블샷 원킬 후 GO!",
    description: [
      "에스프레소 더블샷을 원샷에 마시고 바로 다음 일정으로 넘어가는 액션파! 커피는 에너지 충전용이며, 빠르고 강력한 것을 선호해요.",
      "복잡한 메뉴나 긴 대기시간보다는 간단하고 확실한 효과를 주는 커피를 좋아하며, 카페인의 각성 효과를 최대한 활용해요.",
      "당신의 커피 마시는 속도와 에너지를 보면 다른 사람들이 '정말 대단하다'며 놀라게 되는 놀라운 활력을 가지고 있어요.",
    ],
    recommendedBeans: ["⚡ 하이 카페인", "🔥 인텐스 로스트", "💪 파워 블렌드", "🚀 터보 샷"],
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISTP: {
    name: "스텔스 테이크아웃",
    emoji: "🕶️",
    summary: "말없이 받자마자 퇴장",
    description: [
      "카페에서 최소한의 말과 동작으로 커피를 받아서 조용히 나가는 쿨한 스타일! 복잡한 주문이나 긴 대화보다는 간단하고 확실한 것을 선호해요.",
      "앱 주문을 활용해서 대기 시간을 최소화하고, 픽업 후 바로 자신만의 공간으로 돌아가는 효율적인 패턴을 가지고 있어요.",
      "말은 적지만 커피에 대한 확실한 취향을 가지고 있으며, 한 번 정한 메뉴는 거의 바꾸지 않는 일관성을 보여줘요.",
    ],
    recommendedBeans: ["🕶️ 스텔스 블렌드", "🥷 닌자 로스트", "🔇 사일런트 드립", "⚫ 블랙 에스프레소"],
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
  ESFJ: {
    name: "브런치 메이트",
    emoji: "🥯",
    summary: "커피+베이글 나눔, 수다 ON",
    description: [
      "커피와 함께 맛있는 브런치를 나누며 친구들과 즐거운 시간을 보내는 당신! 카페는 단순히 커피를 마시는 곳이 아니라 소중한 사람들과의 만남의 장소예요.",
      "메뉴를 고를 때도 혼자보다는 함께 나눠 먹을 수 있는 것들을 선택하고, 모든 사람이 만족할 수 있는 선택을 하려고 노력해요.",
      "당신이 있는 카페 테이블은 항상 따뜻한 웃음소리와 맛있는 음식으로 가득하며, 모든 사람이 행복한 시간을 보낼 수 있어요.",
    ],
    recommendedBeans: ["🥯 브런치 블렌드", "🧈 버터 스콘 라떼", "🍓 베리 크림", "🥐 크루아상 페어링"],
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ISFJ: {
    name: "따숩한 모카라",
    emoji: "🍫",
    summary: "달콤·부드러움으로 힐링 제공",
    description: [
      "달콤하고 부드러운 모카로 자신과 주변 사람들에게 위로를 주는 따뜻한 마음의 소유자! 커피보다는 초콜릿의 달콤함이 주는 힐링을 중요하게 생각해요.",
      "스트레스받는 친구에게 '모카 한 잔 어때?'라며 자연스럽게 위로를 건네고, 함께 달콤한 시간을 보내며 마음을 나눠요.",
      "당신이 추천하는 모카는 단순한 음료가 아니라 따뜻한 포옹 같은 위로가 되어주며, 모든 사람의 마음을 편안하게 만들어줘요.",
    ],
    recommendedBeans: ["🍫 초콜릿 모카", "🥛 밀크 초콜릿", "🍯 허니 모카", "☁️ 클라우드 라떼"],
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ESTJ: {
    name: "루틴 마스터",
    emoji: "🗓️",
    summary: "오전 9시, 200 ml, 65℃",
    description: [
      "매일 정확히 같은 시간에, 같은 양의, 같은 온도의 커피를 마시는 완벽한 루틴의 소유자! 커피 한 잔도 체계적이고 계획적으로 관리해요.",
      "아침 9시 아메리카노 200ml, 점심 후 에스프레소 한 잔... 모든 것이 시간표처럼 정확하게 짜여져 있고, 이 루틴을 통해 최고의 컨디션을 유지해요.",
      "당신의 일관된 커피 루틴을 보면 다른 사람들이 '정말 대단한 자기관리'라며 존경하게 되는 놀라운 규칙성을 자랑해요.",
    ],
    recommendedBeans: ["🗓️ 데일리 루틴", "⏰ 모닝 스탠다드", "📏 정량 블렌드", "✅ 컨시스턴트 로스트"],
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ISTJ: {
    name: "전통 블랙러",
    emoji: "🔔",
    summary: "무가당, 노토핑, '진리'만",
    description: [
      "설탕도, 시럽도, 토핑도 없는 순수한 블랙커피만을 고집하는 전통주의자! 커피 본연의 맛을 가장 중요하게 생각하는 진정한 커피 애호가예요.",
      "유행하는 새로운 메뉴보다는 오랫동안 검증된 클래식한 커피를 선호하며, 그 안에서 완벽함을 추구해요.",
      "당신이 마시는 블랙커피는 어떤 화려한 음료보다도 깊고 진정성 있는 맛을 가지고 있으며, 그 순수함이 정말 아름다워요.",
    ],
    recommendedBeans: ["🔔 클래식 블랙", "🏛️ 트래디셔널", "⚫ 퓨어 에스프레소", "📜 헤리티지 로스트"],
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof coffeeCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = coffeeCharacters[mbtiType]
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
                  testId="coffee-mbti"
                  testPath="/coffee-mbti/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 ${character.emoji} ${character.name}!`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/coffee-mbti/test">
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
              <span>당신의 커피 스타일</span>
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

        {/* Recommended Beans */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🫘</span>
              <span>추천 원두 & 메뉴</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {character.recommendedBeans.map((bean, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-amber-50 to-brown-50 dark:from-amber-950 dark:to-brown-950 rounded-lg text-center"
                >
                  <span className="text-base font-medium">{bean}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💕</span>
              <span>잘 맞는 커피 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = coffeeCharacters[type as keyof typeof coffeeCharacters]
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
              <span>다른 취향 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  slug: "ramen-mbti",
                  title: "라면 끓일 때 MBTI",
                  emoji: "🍜",
                  description: "라면 조리법으로 알아보는 성격",
                  participants: "25.8K",
                },
                {
                  slug: "alarm-habit",
                  title: "알람 습관 MBTI",
                  emoji: "⏰",
                  description: "기상 패턴으로 보는 당신의 유형",
                  participants: "8.9K",
                },
                {
                  slug: "travel-mbti",
                  title: "여행 스타일 MBTI",
                  emoji: "✈️",
                  description: "여행 계획으로 알아보는 성격",
                  participants: "9.8K",
                },
              ].map((test) => (
                <Card key={test.slug} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{test.emoji}</div>
                    <h3 className="font-bold mb-2">{test.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                    <p className="text-xs text-muted-foreground mb-4">{test.participants}명 참여</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/${test.slug}`}>테스트 하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function CoffeeMBTIResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
