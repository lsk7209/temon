"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Heart, Home, RotateCcw, Share2, Sparkles, TrendingUp, Users } from "lucide-react"

import { RelatedTestsSection } from "@/components/related-tests-section"
import { ResultFaqSchema } from "@/components/quiz/result-faq-schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useResolvedResultType } from "@/hooks/use-resolved-result-type"
import { getTopicResultFAQs, getTopicResultUseCases } from "@/lib/quiz-topic-copy"

const characters = {
  princess: {
    name: "백설공주형",
    emoji: "🍎",
    summary: "다정하고 공감이 빠른 관계 중심형",
    description: [
      "주변 분위기를 빠르게 읽고 상대의 감정에 먼저 반응하는 편입니다.",
      "사람들과 함께 있을 때 에너지가 살아나고, 자연스럽게 분위기를 부드럽게 만드는 힘이 있습니다.",
      "좋아하는 사람에게는 표현도 아끼지 않아서 친밀한 관계에서 특히 강점이 드러납니다.",
    ],
    dailyLife: ["먼저 안부를 묻는다", "작은 변화도 잘 알아챈다", "분위기 조율을 맡는다", "갈등을 오래 끌지 않는다"],
    strengths: ["따뜻한 공감 능력", "부드러운 분위기 메이킹", "관계 유지력", "진심이 전달되는 표현력"],
    growthTips: ["거절이 필요한 순간을 연습하기", "내 감정도 우선순위에 두기", "모두를 만족시키려는 압박 줄이기"],
    compatibility: {
      best: { type: "prince", reason: "서로를 배려하는 성향이 만나 안정적인 관계를 만들기 쉽습니다." },
      good: { type: "dwarf", reason: "상대의 실행력과 책임감이 당신의 따뜻함을 현실적으로 받쳐 줍니다." },
    },
    famousCharacters: ["백설공주", "신데렐라", "벨"],
    lifeMotto: "따뜻함은 약점이 아니라 가장 강한 연결 방식이다.",
    bgColor: "from-rose-100 to-pink-100",
    borderColor: "border-rose-300",
  },
  prince: {
    name: "왕자형",
    emoji: "🤴",
    summary: "배려와 책임감이 강한 안정형",
    description: [
      "내 사람을 챙기는 데 익숙하고, 필요할 때 자연스럽게 앞에 나서는 편입니다.",
      "요란하게 드러나지 않아도 꾸준히 관계를 지키는 힘이 있습니다.",
      "믿을 수 있는 사람이라는 인상을 주기 쉬워서 의지받는 경우가 많습니다.",
    ],
    dailyLife: ["약속을 잘 지킨다", "도움 요청을 잘 받아준다", "불편한 상황을 정리한다", "내 몫을 끝까지 책임진다"],
    strengths: ["신뢰를 주는 태도", "꾸준한 책임감", "조용한 리더십", "상대를 편하게 만드는 안정감"],
    growthTips: ["혼자 해결하려는 습관 줄이기", "도움을 요청하는 연습", "감정 표현을 조금 더 직접적으로 하기"],
    compatibility: {
      best: { type: "princess", reason: "상대의 따뜻한 표현과 당신의 안정감이 균형을 이룹니다." },
      good: { type: "queen", reason: "추진력 있는 상대와 만나면 관계의 방향이 더 선명해질 수 있습니다." },
    },
    famousCharacters: ["왕자님", "에릭 왕자", "플린 라이더"],
    lifeMotto: "믿음은 말보다 반복되는 행동에서 나온다.",
    bgColor: "from-sky-100 to-cyan-100",
    borderColor: "border-sky-300",
  },
  queen: {
    name: "여왕형",
    emoji: "👑",
    summary: "판단이 빠르고 중심을 잡는 주도형",
    description: [
      "상황을 넓게 보고 빠르게 결정하는 힘이 강한 편입니다.",
      "모호한 상태를 오래 두기보다 기준을 세우고 움직이는 쪽에 가깝습니다.",
      "주도권을 잡았을 때 가장 편하고, 목표가 생기면 실행 속도도 빨라집니다.",
    ],
    dailyLife: ["결정을 미루지 않는다", "정리와 우선순위 설정이 빠르다", "주변에서 리더 역할을 맡긴다", "기준이 분명하다"],
    strengths: ["추진력", "상황 판단력", "리더십", "명확한 의사결정"],
    growthTips: ["상대의 속도도 고려하기", "완벽한 통제보다 유연함 늘리기", "감정보다 결과만 보지 않기"],
    compatibility: {
      best: { type: "dwarf", reason: "상대의 꼼꼼한 실행력이 당신의 방향성을 현실로 연결해 줍니다." },
      good: { type: "prince", reason: "배려형 파트너와 만나면 강한 추진력이 더 안정적으로 작동합니다." },
    },
    famousCharacters: ["엘사", "말레피센트", "미란다 프리슬리"],
    lifeMotto: "방향이 분명하면 속도는 자연스럽게 따라온다.",
    bgColor: "from-violet-100 to-purple-100",
    borderColor: "border-violet-300",
  },
  dwarf: {
    name: "난쟁이형",
    emoji: "⛏️",
    summary: "실행력과 성실함으로 신뢰를 쌓는 현실형",
    description: [
      "해야 할 일을 구조화하고 차근차근 끝내는 데 강점이 있습니다.",
      "화려하게 보이기보다 실제로 돌아가게 만드는 역할을 잘 해냅니다.",
      "작은 디테일까지 신경 쓰는 편이라 주변에서 믿고 맡기는 경우가 많습니다.",
    ],
    dailyLife: ["체크리스트를 잘 쓴다", "맡은 일을 끝까지 밀고 간다", "과정 관리가 꼼꼼하다", "실수 줄이는 데 강하다"],
    strengths: ["꾸준한 실행력", "높은 책임감", "현실 감각", "디테일 관리"],
    growthTips: ["가끔은 즉흥성도 허용하기", "과도한 부담감 줄이기", "성과를 스스로 인정하기"],
    compatibility: {
      best: { type: "queen", reason: "상대의 방향성과 당신의 실행력이 합쳐질 때 시너지가 큽니다." },
      good: { type: "princess", reason: "상대의 따뜻함이 당신의 단단함을 부드럽게 만들어 줍니다." },
    },
    famousCharacters: ["행복이", "성실이", "도비"],
    lifeMotto: "결과는 결국 꾸준한 실행이 만든다.",
    bgColor: "from-amber-100 to-yellow-100",
    borderColor: "border-amber-300",
  },
} as const

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const resultId = searchParams.get("id")
  const { resolvedType, loading } = useResolvedResultType(Object.keys(characters), type, resultId)
  const resultType = (resolvedType as keyof typeof characters) || "princess"
  const character = characters[resultType]
  const faqItems = getTopicResultFAQs("Snow White MBTI Test", character.name)
  const resultUseCases = getTopicResultUseCases("Snow White MBTI Test", character.name)

  if (loading) {
    return <div>Loading...</div>
  }

  const handleShare = async () => {
    const shareText = `나는 ${character.name} ${character.emoji}! 백설공주 캐릭터 테스트 결과: ${character.summary}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${character.name}!`,
          text: shareText,
          url: window.location.href,
        })
        return
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }

    await navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`)
    alert("결과 링크를 복사했습니다.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-violet-50 to-sky-50">
      <ResultFaqSchema quizTitle="Snow White MBTI Test" resultName={character.name} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Card className={`mb-8 border-0 bg-gradient-to-br ${character.bgColor} shadow-2xl`}>
          <CardContent className="p-8 text-center">
            <div className="mb-4 text-7xl">{character.emoji}</div>
            <Badge variant="secondary" className={`mb-4 border-2 ${character.borderColor}`}>
              {resultType.toUpperCase()}
            </Badge>
            <h1 className="mb-3 text-4xl font-bold md:text-5xl">{character.name}</h1>
            <p className="text-lg text-gray-700 md:text-2xl">"{character.summary}"</p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={handleShare}
                className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700"
              >
                <Share2 className="mr-2 h-5 w-5" />
                결과 공유하기
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-white">
                <Link href="/tests/snowwhite-mbti/test">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  다시 테스트
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-white">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  홈으로
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <span>성향 해석</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.description.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-gray-700 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Users className="h-6 w-6 text-pink-600" />
              <span>일상에서 보이는 패턴</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {character.dailyLife.map((item) => (
                <div
                  key={item}
                  className={`rounded-lg border-2 ${character.borderColor} bg-gradient-to-br ${character.bgColor} p-4 text-gray-800`}
                >
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              <span>강점</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              {character.strengths.map((strength) => (
                <li key={strength} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg text-emerald-500">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Sparkles className="h-6 w-6 text-orange-500" />
              <span>성장 포인트</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              {character.growthTips.map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg text-orange-500">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Heart className="h-6 w-6 text-rose-600" />
              <span>잘 맞는 조합</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`rounded-lg border-2 ${character.borderColor} bg-gradient-to-br ${character.bgColor} p-5`}>
              <p className="mb-2 text-lg font-bold text-gray-800">
                최고의 조합: {characters[character.compatibility.best.type].name}
              </p>
              <p className="text-gray-700">{character.compatibility.best.reason}</p>
            </div>
            <div className={`rounded-lg border-2 ${character.borderColor} bg-gradient-to-br ${character.bgColor} p-5`}>
              <p className="mb-2 text-lg font-bold text-gray-800">
                좋은 조합: {characters[character.compatibility.good.type].name}
              </p>
              <p className="text-gray-700">{character.compatibility.good.reason}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">닮은 캐릭터</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {character.famousCharacters.map((famousCharacter) => (
                <span
                  key={famousCharacter}
                  className={`rounded-full border-2 ${character.borderColor} bg-gradient-to-br ${character.bgColor} px-4 py-2 text-base font-medium text-gray-800`}
                >
                  {famousCharacter}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`mb-8 border-0 bg-gradient-to-br ${character.bgColor} shadow-xl`}>
          <CardContent className="p-8 text-center">
            <p className="mb-2 text-xl font-bold text-gray-800 md:text-2xl">한 줄 해석</p>
            <p className="text-lg italic text-gray-700 md:text-xl">"{character.lifeMotto}"</p>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">결과를 읽는 법</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              이 결과는 동화 캐릭터를 빌려 관계 스타일과 판단 방식, 감정 표현 패턴을 가볍게 해석한 카드입니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              평소 친구 관계, 말투, 일 처리 방식에서 비슷한 흐름이 반복된다면 현재 결과가 실제 성향과 맞닿아 있을 가능성이 큽니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              중요한 건 결과 이름보다 어떤 강점이 자주 나타나는지 확인하고, 성장 포인트를 생활 습관에 연결하는 것입니다.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Where This Result Becomes Useful</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resultUseCases.map((item) => (
              <p key={item} className="text-base leading-relaxed text-gray-700 sm:text-lg">
                {item}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">FAQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="mb-2 font-semibold text-gray-900">{item.question}</h3>
                <p className="text-base leading-relaxed text-gray-700 sm:text-lg">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">다른 테스트도 해보기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  slug: "kdrama-mbti",
                  title: "K-드라마 캐릭터 테스트",
                  emoji: "🎬",
                  description: "드라마 속 어떤 캐릭터와 닮았는지 확인해보세요.",
                },
                {
                  slug: "kpop-idol",
                  title: "K-아이돌 포지션 테스트",
                  emoji: "🎤",
                  description: "아이돌 그룹 안에서 내 포지션을 찾아보는 테스트입니다.",
                },
                {
                  slug: "pet-mbti",
                  title: "반려동물 MBTI",
                  emoji: "🐾",
                  description: "성향과 잘 맞는 반려동물 타입을 알아보세요.",
                },
              ].map((test) => (
                <Card key={test.slug} className="transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 text-4xl">{test.emoji}</div>
                    <h3 className="mb-2 font-bold">{test.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{test.description}</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/${test.slug}`}>테스트 하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 mt-8">
          <RelatedTestsSection testId="snowwhite-mbti" title="캐릭터 취향과 함께 볼 만한 테스트" />
        </div>

        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-cyan-300 bg-transparent px-8 py-6 font-medium hover:bg-cyan-50"
            >
              다른 테스트 더 보기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function SnowWhiteMBTIResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
