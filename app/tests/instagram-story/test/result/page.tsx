"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Camera, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const instagramTypes = {
  ENFP: {
    label: "즉흥 확산형",
    summary: "매일 여러 개 올리고 필터 실험하는 활발한 스토리러",
    description: [
      "하루에도 스토리를 여러 개 올리는 당신! 일상의 소소한 순간들을 모두 기록하고 싶어해요. 필터도 여러 개 시도해보며 가장 예쁜 것을 찾아요.",
      "친구들의 스토리에 댓글이나 이모지로 활발하게 반응하고, 질문 박스도 자주 열어서 소통하는 것을 좋아해요.",
      "스토리로 하루를 시작하고 마무리하는 당신, 그 순간순간이 모두 소중한 추억이 되어요.",
    ],
    traits: ["하루 여러 개", "필터 실험", "소통 활발"],
    picks: ["일상 공유", "음악 스티커", "위치 태그"],
    tips: ["하이라이트 정리", "과도한 업로드 주의", "프라이버시 설정"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "감성 기록형",
    summary: "특별한 순간만 조용히 기록하는 감성 스토리러",
    description: [
      "스토리를 가끔씩만 올리는 당신! 일상보다는 의미 있는 순간, 감동받은 순간만 기록해요. 필터는 최소한으로 사용하거나 아예 사용하지 않아요.",
      "스토리를 올려도 댓글이나 반응을 크게 기대하지 않고, 조용히 자신만의 공간으로 사용해요.",
      "하이라이트에 특별한 추억들을 보관하고, 가끔씩 돌아보며 그 순간을 다시 느끼는 것을 좋아해요.",
    ],
    traits: ["가끔씩만", "의미 있는 순간", "조용히 기록"],
    picks: ["감성 사진", "책 인용", "음악 스티커"],
    tips: ["하이라이트 카테고리", "프라이버시 관리", "과도한 공유 주의"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "소통 큐레이터형",
    summary: "모두가 즐거워할 콘텐츠로 소통하는 리더",
    description: [
      "스토리로 사람들과 소통하는 것을 좋아하는 당신! 질문 박스를 자주 열고, 친구들의 스토리에 따뜻한 댓글을 남겨요.",
      "하이라이트를 여러 개 만들어서 카테고리별로 정리하고, 추억을 체계적으로 보관해요.",
      "스토리로 분위기를 띄우고, 모두가 즐거워하는 콘텐츠를 만들어내는 능력이 뛰어나요.",
    ],
    traits: ["소통 중시", "하이라이트 정리", "댓글 활발"],
    picks: ["질문 박스", "투표 기능", "음악 스티커"],
    tips: ["과도한 소통 주의", "프라이버시 설정", "시간 관리"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 선별형",
    summary: "깊이 있는 콘텐츠로 의미를 전달하는 큐레이터",
    description: [
      "스토리를 올릴 때도 의미를 중시하는 당신! 단순한 일상보다는 생각을 나누거나, 영감을 주는 콘텐츠를 올려요.",
      "필터나 스티커는 최소한으로 사용하고, 내용 자체에 집중해요. 하이라이트도 의미 있는 것만 선별해서 보관해요.",
      "스토리로 자신의 가치관이나 생각을 전달하고, 그것을 공감하는 사람들과 연결되는 것을 좋아해요.",
    ],
    traits: ["의미 중시", "깊이 있는 콘텐츠", "선별적 공유"],
    picks: ["인용구", "책 추천", "생각 나누기"],
    tips: ["과도한 공유 주의", "프라이버시 관리", "시간 관리"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 창의형",
    summary: "새로운 기능과 필터로 실험하는 창의가",
    description: [
      "인스타그램의 새로운 기능을 가장 먼저 시도해보는 당신! 새로운 필터, 스티커, 기능을 실험하며 창의적인 스토리를 만들어내요.",
      "스토리로 재미있는 콘텐츠를 만들고, 사람들의 반응을 보는 것을 즐겨요. 때로는 실험적인 시도도 망설이지 않아요.",
      "하이라이트도 독특하게 꾸미고, 자신만의 스타일을 만들어내는 것을 좋아해요.",
    ],
    traits: ["새 기능 시도", "창의적 콘텐츠", "실험 정신"],
    picks: ["새 필터", "스티커 조합", "인터랙티브 기능"],
    tips: ["과도한 실험 주의", "프라이버시 설정", "시간 관리"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석 기록형",
    summary: "데이터와 정보를 공유하는 분석가",
    description: [
      "스토리로 유용한 정보나 데이터를 공유하는 당신! 일상보다는 지식이나 인사이트를 나누는 것을 좋아해요.",
      "스토리를 올릴 때도 논리적으로 구성하고, 정보를 명확하게 전달하려고 노력해요.",
      "하이라이트도 주제별로 정리하고, 나중에 참고할 수 있도록 체계적으로 관리해요.",
    ],
    traits: ["정보 공유", "논리적 구성", "체계적 관리"],
    picks: ["정보 그래픽", "책 추천", "팁 공유"],
    tips: ["과도한 정보 주의", "프라이버시 설정", "시간 관리"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 운영형",
    summary: "스토리를 전략적으로 활용하는 리더",
    description: [
      "스토리를 전략적으로 활용하는 당신! 목적에 맞는 콘텐츠를 계획하고, 효과적으로 전달해요.",
      "하이라이트를 카테고리별로 정리하고, 브랜딩이나 목적에 맞게 꾸며요.",
      "스토리로 영향력을 만들고, 목표를 달성하는 데 활용하는 것을 좋아해요.",
    ],
    traits: ["전략적 활용", "계획적 운영", "목적 지향"],
    picks: ["목표 공유", "성과 공유", "인사이트"],
    tips: ["과도한 공유 주의", "프라이버시 관리", "시간 관리"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "선별 큐레이터형",
    summary: "완벽한 콘텐츠만 선별해서 공유하는 큐레이터",
    description: [
      "스토리를 올릴 때도 완벽을 추구하는 당신! 의미 있고 가치 있는 콘텐츠만 선별해서 공유해요.",
      "필터나 스티커도 최소한으로 사용하고, 내용의 질에 집중해요. 하이라이트도 정말 특별한 것만 보관해요.",
      "스토리로 자신의 전문성이나 가치를 전달하고, 그것을 인정받는 것을 좋아해요.",
    ],
    traits: ["완벽 추구", "질 중시", "선별적 공유"],
    picks: ["전문 콘텐츠", "인사이트", "성과 공유"],
    tips: ["과도한 완벽주의 주의", "프라이버시 관리", "시간 관리"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 메이커형",
    summary: "모두가 즐거워하는 분위기를 만드는 메이커",
    description: [
      "스토리로 분위기를 띄우는 것을 좋아하는 당신! 모두가 즐거워할 콘텐츠를 만들고, 소통을 활발하게 해요.",
      "하이라이트도 친구들과의 추억, 특별한 순간들을 따뜻하게 기록해요.",
      "스토리로 사람들을 행복하게 만들고, 긍정적인 에너지를 전달하는 것을 좋아해요.",
    ],
    traits: ["분위기 중시", "소통 활발", "추억 기록"],
    picks: ["친구들과의 순간", "음악 스티커", "위치 태그"],
    tips: ["과도한 공유 주의", "프라이버시 설정", "시간 관리"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "따뜻한 기록형",
    summary: "소중한 순간을 따뜻하게 기록하는 기록가",
    description: [
      "스토리로 소중한 순간들을 따뜻하게 기록하는 당신! 일상의 작은 행복도 놓치지 않고 기록해요.",
      "하이라이트에 가족, 친구들과의 추억을 보관하고, 가끔씩 돌아보며 그 순간을 다시 느껴요.",
      "스토리를 올릴 때도 따뜻한 마음을 담아서 올리고, 그것을 보는 사람들도 행복해지길 바라요.",
    ],
    traits: ["소중한 순간", "따뜻한 기록", "추억 보관"],
    picks: ["가족 사진", "친구들과의 순간", "음악 스티커"],
    tips: ["과도한 공유 주의", "프라이버시 관리", "시간 관리"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 공유형",
    summary: "즉흥적으로 재미있는 순간을 공유하는 에너지",
    description: [
      "즉흥적으로 스토리를 올리는 당신! 재미있는 순간, 예쁜 순간을 바로바로 공유해요.",
      "필터도 여러 개 시도해보고, 스티커도 재미있게 사용해요. 스토리로 분위기를 띄우는 것을 좋아해요.",
      "하이라이트도 재미있게 꾸미고, 자신만의 스타일을 만들어내는 것을 좋아해요.",
    ],
    traits: ["즉흥 공유", "재미 중시", "에너지 넘침"],
    picks: ["일상 공유", "음악 스티커", "위치 태그"],
    tips: ["과도한 공유 주의", "프라이버시 설정", "시간 관리"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 미니멀형",
    summary: "최소한으로 조용히 기록하는 미니멀",
    description: [
      "스토리를 최소한으로만 올리는 당신! 특별한 순간만 기록하고, 과도한 공유는 피해요.",
      "필터나 스티커도 최소한으로 사용하고, 깔끔하고 심플한 스토리를 선호해요.",
      "하이라이트도 만들지 않거나, 정말 특별한 것만 보관해요. 자신만의 공간으로 조용히 사용해요.",
    ],
    traits: ["최소한 공유", "심플 선호", "조용히 기록"],
    picks: ["특별한 순간", "감성 사진", "음악 스티커"],
    tips: ["과도한 공유 주의", "프라이버시 관리", "시간 관리"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "계획 운영형",
    summary: "계획적으로 스토리를 운영하는 매니저",
    description: [
      "스토리도 계획적으로 운영하는 당신! 목적에 맞는 콘텐츠를 미리 계획하고, 효과적으로 전달해요.",
      "하이라이트도 카테고리별로 정리하고, 체계적으로 관리해요.",
      "스토리로 목표를 달성하고, 효과를 측정하는 것을 좋아해요.",
    ],
    traits: ["계획적 운영", "체계적 관리", "목적 지향"],
    picks: ["목표 공유", "성과 공유", "정보 공유"],
    tips: ["과도한 공유 주의", "프라이버시 설정", "시간 관리"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 기록형",
    summary: "일정한 루틴으로 기록하는 수호자",
    description: [
      "스토리를 일정한 루틴으로 올리는 당신! 특정 시간이나 특정 주제로만 기록해요.",
      "필터나 스티커도 일정한 스타일을 유지하고, 변화보다는 안정을 선호해요.",
      "하이라이트도 주제별로 정리하고, 체계적으로 보관해요.",
    ],
    traits: ["루틴 유지", "안정 선호", "체계적 관리"],
    picks: ["일상 루틴", "특정 주제", "정보 공유"],
    tips: ["과도한 공유 주의", "프라이버시 관리", "시간 관리"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 액션형",
    summary: "즉흥적으로 액션 있는 순간을 공유",
    description: [
      "즉흥적으로 액션 있는 순간을 공유하는 당신! 재미있는 순간, 스릴 있는 순간을 바로바로 올려요.",
      "필터도 여러 개 시도해보고, 스티커도 재미있게 사용해요. 스토리로 분위기를 띄우는 것을 좋아해요.",
      "하이라이트도 재미있게 꾸미고, 자신만의 스타일을 만들어내는 것을 좋아해요.",
    ],
    traits: ["즉흥 공유", "액션 중시", "에너지 넘침"],
    picks: ["액션 순간", "음악 스티커", "위치 태그"],
    tips: ["과도한 공유 주의", "프라이버시 설정", "시간 관리"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 기록형",
    summary: "필요한 정보만 실용적으로 공유",
    description: [
      "스토리로 필요한 정보만 실용적으로 공유하는 당신! 불필요한 공유는 피하고, 가치 있는 정보만 전달해요.",
      "필터나 스티커도 최소한으로 사용하고, 내용에 집중해요.",
      "하이라이트도 정말 필요한 것만 보관하고, 체계적으로 관리해요.",
    ],
    traits: ["실용적 공유", "정보 중심", "최소한 사용"],
    picks: ["유용한 정보", "팁 공유", "도구 추천"],
    tips: ["과도한 공유 주의", "프라이버시 관리", "시간 관리"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof instagramTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = instagramTypes[mbtiType]
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
                  className="mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="instagram-story"
                  testPath="/tests/instagram-story/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 📸 ${character.label}(${mbtiType})! 너는 어떤 스토리러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/instagram-story/test">
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
              <span>📸</span>
              <span>당신의 스토리 스타일</span>
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
              <span>✨</span>
              <span>당신의 스토리 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 rounded-lg"
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
              <span>🎨</span>
              <span>추천 스토리 콘텐츠</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 rounded-lg"
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
              <span>스토리 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-pink-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "pizza-topping",
                  title: "피자 토핑 선택",
                  emoji: "🍕",
                  description: "피자 토핑으로 알아보는 성격",
                  participants: "0",
                },
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
              className="border-2 border-pink-300 hover:bg-pink-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function InstagramStoryResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

