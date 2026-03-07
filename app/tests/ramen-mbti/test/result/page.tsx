"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useResolvedResultType } from "@/hooks/use-resolved-result-type"
import { ResultFaqSchema } from "@/components/quiz/result-faq-schema"

const ramenCharacters = {
  ENFP: {
    name: "즉흥 셰프면",
    emoji: "🔥",
    summary: "오늘도 감성 따라 신메뉴!",
    description: [
      "라면 하나 끓이는데도 매번 새로운 실험을 시도하는 당신! 오늘은 치즈, 내일은 계란, 모레는 김치까지... 냉장고 털어서 넣어보는 게 일상이에요.",
      "친구들과 함께 라면 먹을 때가 가장 행복하고, SNS에 '오늘의 라면 레시피'를 자랑스럽게 올리는 타입입니다.",
      "가끔 실패작이 나와도 '이것도 경험이지!'라며 긍정적으로 받아들이는 당신의 모습이 정말 멋져요.",
    ],
    toppings: ["🧀 치즈", "🥚 계란", "🌶️ 청양고추", "🥬 배추김치"],
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "몽상 국물러",
    emoji: "🌙",
    summary: "레시피는 머릿속 판타지",
    description: [
      "라면 끓이면서도 상상의 나래를 펼치는 당신! 물이 끓는 소리를 들으며 오늘 하루를 되돌아보거나 내일의 계획을 세우곤 해요.",
      "혼자만의 시간에 조용히 라면을 즐기는 것을 좋아하고, 특별한 날에는 정성스럽게 토핑을 올려 나만의 작품을 만들어내죠.",
      "라면 하나에도 감정을 담아 먹는 당신, 그 섬세함이 정말 아름다워요.",
    ],
    toppings: ["🌿 대파", "🍄 버섯", "🥕 당근", "🌽 옥수수"],
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "배려 국자님",
    emoji: "🤗",
    summary: "모두 취향 반영, 맛 조율의 달인",
    description: [
      "가족이나 친구들과 함께 라면을 끓일 때, 모든 사람의 취향을 다 맞춰주려고 노력하는 당신! '매운 거 못 먹는 사람 있지?' '계란 알레르기 있는 사람?'",
      "라면 하나 끓이는 것도 모두가 행복할 수 있는 방법을 찾아내는 천재예요. 여러 개의 냄비를 동시에 돌리는 것도 문제없어요.",
      "당신이 끓여준 라면을 먹으면 왠지 더 따뜻하고 맛있게 느껴지는 마법을 가지고 있어요.",
    ],
    toppings: ["🥚 반숙계란", "🧅 양파", "🥬 청경채", "🍖 햄"],
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "깊은맛 연구러",
    emoji: "🪄",
    summary: "0.5g 스프까지 철학적 의미",
    description: [
      "라면 하나에도 깊은 의미를 부여하는 당신! 스프의 양, 물의 온도, 면의 익힘 정도까지 모든 것에 나름의 철학이 있어요.",
      "단순히 배고픔을 해결하는 것이 아니라, 라면을 통해 삶의 의미를 찾고 내면의 평화를 얻는 특별한 능력을 가지고 있어요.",
      "당신만의 완벽한 라면 레시피는 오랜 시간의 연구와 성찰의 결과물이죠.",
    ],
    toppings: ["🌿 미나리", "🍄 표고버섯", "🧄 마늘", "🌶️ 고춧가루"],
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "실험 라보",
    emoji: "🧪",
    summary: "케찹·탄산수도 넣어봐야 직성",
    description: [
      "라면계의 매드 사이언티스트! 케찹, 탄산수, 아이스크림까지... 상상할 수 없는 조합을 시도해보는 용감한 실험가예요.",
      "'이걸 넣으면 어떨까?'라는 호기심이 멈추지 않아서, 주변 사람들을 놀라게 하는 신기한 라면을 만들어내곤 해요.",
      "실패해도 '재밌었다!'라고 말하며, 다음 실험을 계획하는 당신의 모습이 정말 멋져요.",
    ],
    toppings: ["🍅 케찹", "🥤 탄산수", "🍦 아이스크림", "🍫 초콜릿"],
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "공식 추구러",
    emoji: "🧠",
    summary: "끓는점·면수비율 계산 중",
    description: [
      "라면 끓이기에도 과학적 접근을 하는 당신! 물의 끓는점, 면과 물의 최적 비율, 조리 시간의 정확한 계산까지 모든 것을 논리적으로 분석해요.",
      "한 번 완벽한 공식을 찾아내면 그 방법을 계속 고수하며, 더 나은 방법이 있는지 끊임없이 연구하는 모습이 인상적이에요.",
      "당신이 끓인 라면은 항상 일정한 맛을 보장하는 신뢰할 수 있는 품질을 자랑해요.",
    ],
    toppings: ["📏 정확한 계량", "⏰ 타이머 필수", "🌡️ 온도계", "📊 기록지"],
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "타이밍 사령관",
    emoji: "📊",
    summary: "불 조절·동선 모두 최적화",
    description: [
      "라면 끓이기도 하나의 프로젝트로 접근하는 당신! 효율적인 동선, 최적의 타이밍, 완벽한 멀티태스킹으로 라면계의 CEO예요.",
      "여러 명 분량을 동시에 끓일 때도 체계적으로 계획을 세워서 모든 라면이 동시에 완성되도록 하는 놀라운 능력을 가지고 있어요.",
      "당신의 라면 조리법은 다른 사람들이 벤치마킹하고 싶어하는 완벽한 매뉴얼이에요.",
    ],
    toppings: ["⏰ 정시 투입", "🔥 화력 조절", "📋 체크리스트", "👥 팀워크"],
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "정밀 냄비마스터",
    emoji: "🥶",
    summary: "100℃→90℃ 그래프형 조리",
    description: [
      "라면 끓이기를 하나의 정밀한 시스템으로 구축한 당신! 온도 변화 그래프, 시간별 조리 단계, 완벽한 결과물을 위한 치밀한 계획이 있어요.",
      "한 번 완성한 시스템은 거의 수정하지 않으며, 매번 동일한 퀄리티의 라면을 만들어내는 장인 정신을 가지고 있어요.",
      "당신만의 라면 조리법은 예술 작품과 같은 완성도를 자랑해요.",
    ],
    toppings: ["🌡️ 온도 측정", "⏱️ 정밀 타이밍", "📈 데이터 분석", "🎯 완벽 추구"],
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFP: {
    name: "흥폭발 면치기",
    emoji: "🎊",
    summary: "끓이면서 춤, 먹으면서 방송",
    description: [
      "라면 끓이는 것도 하나의 엔터테인먼트로 만드는 당신! 음악 틀어놓고 춤추면서 끓이고, 먹는 모습까지 실시간으로 공유해요.",
      "혼자 먹어도 재밌지만, 친구들과 함께 먹을 때 더욱 빛나는 분위기 메이커예요. 라면 먹방의 진정한 고수!",
      "당신과 함께 라면을 먹으면 평범한 라면도 특별한 추억이 되어버려요.",
    ],
    toppings: ["🎵 음악", "📱 실시간 방송", "🎉 파티 분위기", "👯 친구들"],
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ISFP: {
    name: "감성 플로팅러",
    emoji: "🌷",
    summary: "별밤 감상하며 조용 라면",
    description: [
      "라면 하나에도 감성을 담아 먹는 당신! 창가에서 밤하늘을 바라보며, 또는 좋아하는 음악을 들으며 조용히 라면을 즐겨요.",
      "특별한 날에는 예쁜 그릇에 정성스럽게 담아서 나만의 작은 의식처럼 라면을 먹는 로맨틱한 감성을 가지고 있어요.",
      "당신이 먹는 라면은 단순한 음식이 아니라 하나의 예술 작품이에요.",
    ],
    toppings: ["🌙 달빛", "🎵 감성 음악", "🌸 예쁜 그릇", "💭 혼자만의 시간"],
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ESTP: {
    name: "스피드 면처리",
    emoji: "🚀",
    summary: "2분 컷! 불닭도 한입",
    description: [
      "라면계의 스피드왕! 빠르고 간단하게, 하지만 맛있게 끓여서 후루룩 마시고 다음 일정으로 넘어가는 액션파예요.",
      "매운 라면도 전혀 문제없고, 오히려 더 매운 걸 찾아다니는 용감한 도전자! 불닭볶음면도 우유 없이 그냥 먹어요.",
      "당신의 라면 먹는 속도를 보면 다른 사람들이 놀라서 입을 다물지 못해요.",
    ],
    toppings: ["🌶️ 매운맛 추가", "⚡ 스피드", "🥛 우유는 선택", "🔥 도전 정신"],
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISTP: {
    name: "쿨한 솔로쿡",
    emoji: "🥷",
    summary: "말없음, 결과는 완벽",
    description: [
      "말은 없지만 손은 정확한 라면의 닌자! 별다른 설명 없이도 완벽한 라면을 뚝딱 만들어내는 실력자예요.",
      "복잡한 토핑보다는 심플하지만 완벽한 기본기로 승부하는 스타일. 당신이 끓인 라면은 항상 딱 적당해요.",
      "혼자서도 전혀 외롭지 않게 라면을 즐기는 독립적인 모습이 정말 멋져요.",
    ],
    toppings: ["🥚 기본 계란", "🧅 파", "🌶️ 적당한 매운맛", "🤫 조용한 집중"],
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
  ESFJ: {
    name: "하트 토핑러",
    emoji: "❤️",
    summary: "계란 하트·김 이니셜 서비스",
    description: [
      "라면에도 사랑을 담아 만드는 당신! 계란으로 하트 모양 만들기, 김으로 이니셜 써주기 등 정성스러운 디테일이 가득해요.",
      "가족이나 연인을 위해 라면을 끓일 때는 더욱 특별하게 꾸며서 사랑을 표현하는 로맨틱한 요리사예요.",
      "당신이 만든 라면을 받는 사람은 맛보다도 그 마음에 더 감동받을 거예요.",
    ],
    toppings: ["💝 하트 계란", "✨ 예쁜 장식", "🥰 사랑의 정성", "👨‍👩‍👧‍👦 가족 생각"],
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ISFJ: {
    name: "따뜻한 집밥러",
    emoji: "🧸",
    summary: "가족 몫까지 챙겨 끓임",
    description: [
      "항상 다른 사람을 먼저 생각하는 따뜻한 마음의 소유자! 자신 것보다 가족들 라면을 먼저 챙겨서 끓여주는 천사예요.",
      "영양 균형까지 생각해서 야채를 듬뿍 넣어주고, 모든 사람이 좋아할 만한 맛으로 조절하는 세심함을 가지고 있어요.",
      "당신이 끓여준 라면은 단순한 음식이 아니라 따뜻한 집의 맛이에요.",
    ],
    toppings: ["🥬 건강한 야채", "🥚 영양 계란", "💚 가족 사랑", "🏠 집의 온기"],
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ESTJ: {
    name: "규칙 지킴러",
    emoji: "📏",
    summary: "봉지 지시사항 100%",
    description: [
      "라면 봉지에 적힌 조리법을 철저히 지키는 원칙주의자! 물 550ml, 조리시간 4분 30초를 정확히 지켜서 완벽한 라면을 만들어요.",
      "새로운 실험보다는 검증된 방법을 선호하며, 항상 일정한 품질의 라면을 보장하는 신뢰할 수 있는 요리사예요.",
      "당신의 라면은 언제나 예측 가능하고 안정적인 맛을 자랑해요.",
    ],
    toppings: ["📋 정확한 레시피", "⏰ 시간 준수", "📏 정량 측정", "✅ 품질 보장"],
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ISTJ: {
    name: "전통 국물러",
    emoji: "🏛️",
    summary: "요리=전통, 변형 금지",
    description: [
      "라면의 전통을 지키는 수호자! 옛날 방식 그대로, 변형 없이 정통 라면을 고집하는 클래식한 스타일이에요.",
      "새로운 토핑이나 조리법보다는 오랫동안 검증된 방법을 선호하며, 그 안에서 완벽함을 추구해요.",
      "당신이 끓여준 라면은 어머니의 손맛처럼 편안하고 정겨운 맛을 가지고 있어요.",
    ],
    toppings: ["🥚 기본 계란", "🧅 파", "🌶️ 전통 양념", "👵 어머니 손맛"],
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const resultId = searchParams.get("id")
  const { resolvedType, loading } = useResolvedResultType(Object.keys(ramenCharacters), type, resultId)
  const mbtiType = (resolvedType as keyof typeof ramenCharacters) || "ENFP"
  const character = ramenCharacters[mbtiType]

  if (loading) {
    return <div>Loading...</div>
  }

  const handleShare = async () => {
    const shareText = `나는 ${character.emoji} ${character.name}! 라면 끓일 때 MBTI 테스트 결과: ${character.summary}`
    const shareUrl = `${window.location.origin}/tests/ramen-mbti/test`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${character.emoji} ${character.name}!`,
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.log("Error sharing:", err)
        const fullShareText = `${shareText}

${shareUrl}`
        navigator.clipboard.writeText(fullShareText)
        alert("공유 메시지가 복사되었습니다! 친구들에게 붙여넣기 해보세요 📋✨")
      }
    } else {
      const fullShareText = `${shareText}

${shareUrl}`
      try {
        await navigator.clipboard.writeText(fullShareText)
        alert("공유 메시지가 복사되었습니다! 친구들에게 붙여넣기 해보세요 📋✨")
      } catch (err) {
        console.log("Clipboard API failed:", err)
        prompt("아래 링크를 복사해서 친구들에게 공유해보세요:", shareUrl)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950 dark:via-red-950 dark:to-yellow-950">
      <ResultFaqSchema quizTitle="Ramen MBTI Test" resultName={character.name} />
      {/* Main Result */}
      <main className="container max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Character Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-6xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-3 sm:mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-sm sm:text-base px-3 py-1"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                  {character.name}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium px-2">
                  "{character.summary}"
                </p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
                <Button
                  size="lg"
                  onClick={handleShare}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-12 sm:h-auto text-base sm:text-lg"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  친구들에게 공유하기
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="h-12 sm:h-auto text-base sm:text-lg bg-transparent"
                >
                  <Link href="/tests/ramen-mbti/test">
                    <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-6 sm:mb-8">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <span>🍜</span>
              <span>당신의 라면 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {character.description.map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Recommended Toppings */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-6 sm:mb-8">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <span>🥚</span>
              <span>찰떡 토핑 추천</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {character.toppings.map((topping, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg text-center"
                >
                  <span className="text-base sm:text-lg font-medium">{topping}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-6 sm:mb-8">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <span>💕</span>
              <span>잘 맞는 라면 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = ramenCharacters[type as keyof typeof ramenCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg text-center"
                  >
                    <div className="text-2xl sm:text-3xl mb-2">{compatibleChar.emoji}</div>
                    <div className="font-medium text-sm sm:text-base">{compatibleChar.name}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{type}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Other Tests */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <span>🎯</span>
              <span>다른 음식 MBTI도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  slug: "coffee-mbti",
                  title: "커피 취향 MBTI",
                  emoji: "☕",
                  description: "좋아하는 커피로 알아보는 성격",
                  participants: "15.2K",
                },
                {
                  slug: "alarm-habit",
                  title: "알람 습관 MBTI",
                  emoji: "⏰",
                  description: "기상 패턴으로 보는 당신의 유형",
                  participants: "8.9K",
                },
                {
                  slug: "study-mbti",
                  title: "공부 스타일 MBTI",
                  emoji: "📚",
                  description: "학습 방법으로 알아보는 성격",
                  participants: "6.7K",
                },
              ].map((test) => (
                <Card key={test.slug} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{test.emoji}</div>
                    <h3 className="font-bold mb-2 text-sm sm:text-base">{test.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{test.description}</p>
                    <p className="text-xs text-muted-foreground mb-3 sm:mb-4">{test.participants}명 참여</p>
                    <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm bg-transparent">
                      <Link href={`/${test.slug}`}>테스트 하기</Link>
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

export default function RamenMBTIResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
