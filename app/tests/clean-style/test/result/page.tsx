"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Sparkles, Sparkles as SparklesIcon } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const cleanCharacters = {
  ENFP: {
    name: "감성 청소러",
    emoji: "🎈",
    summary: "기분 따라 움직이는 즉흥 청소러",
    description: [
      "기분 따라 움직이는 즉흥 청소러인 당신은 감성 청소러예요. 일단 손부터 움직이고, '나중에 해야지' 하고 넘기며, 없으면 안 되는 음악을 들으며 청소해요.",
      "추억 생각나서 보관하고, 새로 배치 시도하며, 그냥 대충 끝내는 감정이 들면 대청소하는 스타일이에요.",
      "통화하며 청소하고, 스트레스 쌓일 때만 청소하며, 색감·디자인 중심으로 도구를 구매하는 청소=감정 리셋형 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: BTS - 'Home'", "추천 아이템: 감성 인테리어 소품"],
    recommendedAction: "기분에 따라 청소하되, 가끔은 계획적인 청소도 즐겨보세요!",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
    shareText: "나는 🧹 감성 청소러(ENFP)! 너는 어떤 청소러야?",
  },
  ENFJ: {
    name: "배려 청소러",
    emoji: "🤝",
    summary: "동거인·가족 중심 정리",
    description: [
      "동거인·가족 중심으로 정리하는 당신은 배려 청소러예요. 계획부터 세우지만, 당장 닦으며, 없으면 안 되는 음악을 들으며 청소해요.",
      "추억 생각나서 보관하고, 원래대로가 편하지만, 현실 직시 후 다시 계획하는 타인 배려 중심형 스타일이에요.",
      "통화하며 청소하고, 주기적으로 청소하며, 색감·디자인 중심으로 도구를 구매하는 '같이 살아서 깨끗해야지!' 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 따뜻한 팝송", "추천 아이템: 공용 수납함"],
    recommendedAction: "모두를 챙기되, 자신의 공간도 잊지 마세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
    shareText: "나는 🧹 배려 청소러(ENFJ)! 너는 어떤 청소러야?",
  },
  ENTJ: {
    name: "전략 청소러",
    emoji: "🎯",
    summary: "계획적·효율적 정리",
    description: [
      "계획적·효율적으로 정리하는 당신은 전략 청소러예요. 계획부터 세우고, 당장 닦으며, 없으면 안 되는 음악을 들으며 청소해요.",
      "과감히 버리고, 새로 배치 시도하며, 현실 직시 후 다시 계획하는 도구·시간 관리형 스타일이에요.",
      "통화하며 청소하고, 주기적으로 청소하며, 기능/가격 비교로 도구를 구매하는 청소도 미션처럼 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 업템포 팝", "추천 아이템: 효율 청소 도구 세트"],
    recommendedAction: "전략적으로 청소하되, 가끔은 여유롭게 즐기는 것도 좋아요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
    shareText: "나는 🧹 전략 청소러(ENTJ)! 너는 어떤 청소러야?",
  },
  ENTP: {
    name: "실험 청소러",
    emoji: "🧪",
    summary: "새 방식 시도",
    description: [
      "새 방식을 시도하는 당신은 실험 청소러예요. 일단 손부터 움직이고, '나중에 해야지' 하고 넘기며, 없으면 안 되는 음악을 들으며 청소해요.",
      "과감히 버리고, 새로 배치 시도하며, 그냥 대충 끝내는 신박한 정리법 탐구형 스타일이에요.",
      "통화하며 청소하고, 스트레스 쌓일 때만 청소하며, 기능/가격 비교로 도구를 구매하는 '이건 과학이다!' 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 실험적인 음악", "추천 아이템: 신기술 청소 도구"],
    recommendedAction: "새로운 방법을 시도하되, 기본적인 청소는 해두세요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
    shareText: "나는 🧹 실험 청소러(ENTP)! 너는 어떤 청소러야?",
  },
  ESFJ: {
    name: "따뜻한 청소러",
    emoji: "😊",
    summary: "가족·친구를 위한 청소",
    description: [
      "가족·친구를 위한 청소를 하는 당신은 따뜻한 청소러예요. 계획부터 세우고, 당장 닦으며, 없으면 안 되는 음악을 들으며 청소해요.",
      "추억 생각나서 보관하고, 원래대로가 편하지만, 현실 직시 후 다시 계획하는 정성형 스타일이에요.",
      "통화하며 청소하고, 주기적으로 청소하며, 색감·디자인 중심으로 도구를 구매하는 향초 필수, 공간 분위기 중요형 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 가족과 함께 듣는 음악", "추천 아이템: 향초, 인테리어 소품"],
    recommendedAction: "모두를 위해 청소하되, 자신의 시간도 가지세요.",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
    shareText: "나는 🧹 따뜻한 청소러(ESFJ)! 너는 어떤 청소러야?",
  },
  ESFP: {
    name: "감각 청소러",
    emoji: "📸",
    summary: "인스타 감성 청소",
    description: [
      "인스타 감성 청소를 하는 당신은 감각 청소러예요. 일단 손부터 움직이고, '나중에 해야지' 하고 넘기며, 없으면 안 되는 음악을 들으며 청소해요.",
      "추억 생각나서 보관하고, 새로 배치 시도하며, 그냥 대충 끝내는 사진 찍기용 정리형 스타일이에요.",
      "통화하며 청소하고, 스트레스 쌓일 때만 청소하며, 색감·디자인 중심으로 도구를 구매하는 인테리어에 진심형 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 트렌디한 팝", "추천 아이템: 예쁜 수납함, 인테리어 소품"],
    recommendedAction: "감성으로 청소하되, 가끔은 정리도 해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
    shareText: "나는 🧹 감각 청소러(ESFP)! 너는 어떤 청소러야?",
  },
  ESTJ: {
    name: "효율 청소러",
    emoji: "📋",
    summary: "루틴·체계적 정리",
    description: [
      "루틴·체계적으로 정리하는 당신은 효율 청소러예요. 계획부터 세우고, 당장 닦으며, 없으면 안 되는 음악을 들으며 청소해요.",
      "과감히 버리고, 원래대로가 편하지만, 현실 직시 후 다시 계획하는 청소 스케줄 있음형 스타일이에요.",
      "통화하며 청소하고, 주기적으로 청소하며, 기능/가격 비교로 도구를 구매하는 '토요일 10시, 청소 시간' 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 리듬감 있는 음악", "추천 아이템: 체계적 수납 시스템"],
    recommendedAction: "효율적으로 청소하되, 가끔은 여유롭게 즐기는 것도 좋아요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
    shareText: "나는 🧹 효율 청소러(ESTJ)! 너는 어떤 청소러야?",
  },
  ESTP: {
    name: "스피드 청소러",
    emoji: "⚡",
    summary: "빠르고 실용적",
    description: [
      "빠르고 실용적으로 청소하는 당신은 스피드 청소러예요. 일단 손부터 움직이고, 당장 닦으며, 없으면 안 되는 음악을 들으며 청소해요.",
      "과감히 버리고, 새로 배치 시도하며, 그냥 대충 끝내는 보기 싫은 것만 치움형 스타일이에요.",
      "통화하며 청소하고, 스트레스 쌓일 때만 청소하며, 기능/가격 비교로 도구를 구매하는 '결과만 좋으면 됨'형 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 빠른 템포 음악", "추천 아이템: 빠른 청소 도구"],
    recommendedAction: "빠르게 청소하되, 가끔은 신중하게 정리해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
    shareText: "나는 🧹 스피드 청소러(ESTP)! 너는 어떤 청소러야?",
  },
  INFP: {
    name: "사색 청소러",
    emoji: "🌙",
    summary: "청소하며 생각 정리",
    description: [
      "청소하며 생각을 정리하는 당신은 사색 청소러예요. 일단 손부터 움직이고, '나중에 해야지' 하고 넘기며, 조용히 집중하며 청소해요.",
      "추억 생각나서 보관하고, 새로 배치 시도하며, 그냥 대충 끝내는 내면 성찰형 스타일이에요.",
      "'청소 끝나고 보자!'라고 하며, 스트레스 쌓일 때만 청소하고, 색감·디자인 중심으로 도구를 구매하는 '이 먼지처럼 나도 정리돼야…' 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 잔잔한 음악", "추천 아이템: 감성 수납함"],
    recommendedAction: "사색하며 청소하되, 가끔은 실용적인 정리도 해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
    shareText: "나는 🧹 사색 청소러(INFP)! 너는 어떤 청소러야?",
  },
  INFJ: {
    name: "완벽 미니멀러",
    emoji: "📖",
    summary: "공간의 의미 중시",
    description: [
      "공간의 의미를 중시하는 당신은 완벽 미니멀러예요. 계획부터 세우지만, '나중에 해야지' 하고 넘기며, 조용히 집중하며 청소해요.",
      "과감히 버리고, 새로 배치 시도하며, 현실 직시 후 다시 계획하는 깔끔·정제형 스타일이에요.",
      "'청소 끝나고 보자!'라고 하며, 주기적으로 청소하고, 기능/가격 비교로 도구를 구매하는 '버림의 미학' 실천형 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 미니멀 음악", "추천 아이템: 미니멀 수납 시스템"],
    recommendedAction: "완벽하게 정리하되, 가끔은 여유롭게 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
    shareText: "나는 🧹 완벽 미니멀러(INFJ)! 너는 어떤 청소러야?",
  },
  INTJ: {
    name: "최적화 청소러",
    emoji: "🧠",
    summary: "구조·동선 중심",
    description: [
      "구조·동선을 중심으로 청소하는 당신은 최적화 청소러예요. 계획부터 세우고, 당장 닦으며, 조용히 집중하며 청소해요.",
      "과감히 버리고, 새로 배치 시도하며, 현실 직시 후 다시 계획하는 계획·시스템화형 스타일이에요.",
      "'청소 끝나고 보자!'라고 하며, 주기적으로 청소하고, 기능/가격 비교로 도구를 구매하는 '청소 알고리즘' 존재형 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 집중 음악", "추천 아이템: 시스템 수납함"],
    recommendedAction: "최적화된 청소는 좋지만, 가끔은 감성 청소도 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
    shareText: "나는 🧹 최적화 청소러(INTJ)! 너는 어떤 청소러야?",
  },
  INTP: {
    name: "실험적 청소러",
    emoji: "🔬",
    summary: "도중에 딴짓多",
    description: [
      "도중에 딴짓이 많은 당신은 실험적 청소러예요. 일단 손부터 움직이고, '나중에 해야지' 하고 넘기며, 조용히 집중하며 청소해요.",
      "과감히 버리고, 새로 배치 시도하며, 그냥 대충 끝내는 탐구·분석형 스타일이에요.",
      "'청소 끝나고 보자!'라고 하며, 스트레스 쌓일 때만 청소하고, 기능/가격 비교로 도구를 구매하는 '왜 먼지는 위에서 쌓일까?' 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 탐구 음악", "추천 아이템: 실험적 청소 도구"],
    recommendedAction: "탐구하며 청소하되, 가끔은 실용적인 정리도 해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
    shareText: "나는 🧹 실험적 청소러(INTP)! 너는 어떤 청소러야?",
  },
  ISFJ: {
    name: "따뜻한 정리러",
    emoji: "🧸",
    summary: "가족 위한 유지형",
    description: [
      "가족을 위한 유지형 청소를 하는 당신은 따뜻한 정리러예요. 계획부터 세우고, 당장 닦으며, 조용히 집중하며 청소해요.",
      "추억 생각나서 보관하고, 원래대로가 편하지만, 현실 직시 후 다시 계획하는 꾸준함·섬세함형 스타일이에요.",
      "'청소 끝나고 보자!'라고 하며, 주기적으로 청소하고, 색감·디자인 중심으로 도구를 구매하는 '집이 마음의 안식처' 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 따뜻한 음악", "추천 아이템: 가족용 수납함"],
    recommendedAction: "가족을 위해 청소하되, 자신의 공간도 잊지 마세요.",
    compatibleTypes: ["ESFP", "ESTP", "ESFJ"],
    shareText: "나는 🧹 따뜻한 정리러(ISFJ)! 너는 어떤 청소러야?",
  },
  ISFP: {
    name: "감성 인테리어러",
    emoji: "🌷",
    summary: "미적 중심 청소",
    description: [
      "미적 중심으로 청소하는 당신은 감성 인테리어러예요. 일단 손부터 움직이고, '나중에 해야지' 하고 넘기며, 조용히 집중하며 청소해요.",
      "추억 생각나서 보관하고, 새로 배치 시도하며, 그냥 대충 끝내는 정리보다 꾸미기형 스타일이에요.",
      "'청소 끝나고 보자!'라고 하며, 스트레스 쌓일 때만 청소하고, 색감·디자인 중심으로 도구를 구매하는 향·조명·배치 중요형 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 감성 음악", "추천 아이템: 인테리어 소품, 예쁜 수납함"],
    recommendedAction: "감성으로 꾸미되, 가끔은 정리도 해보세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESTJ"],
    shareText: "나는 🧹 감성 인테리어러(ISFP)! 너는 어떤 청소러야?",
  },
  ISTJ: {
    name: "완벽 정리러",
    emoji: "📦",
    summary: "체계·규칙형 청소",
    description: [
      "체계·규칙형으로 청소하는 당신은 완벽 정리러예요. 계획부터 세우고, 당장 닦으며, 조용히 집중하며 청소해요.",
      "과감히 버리고, 원래대로가 편하지만, 현실 직시 후 다시 계획하는 루틴 유지형 스타일이에요.",
      "'청소 끝나고 보자!'라고 하며, 주기적으로 청소하고, 기능/가격 비교로 도구를 구매하는 '청소 전후 비교가 삶의 낙' 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 규칙적인 리듬", "추천 아이템: 밀폐수납함", "미니 먼지청소기"],
    recommendedAction: "완벽하게 정리하되, 가끔은 여유롭게 즐기는 것도 좋아요.",
    compatibleTypes: ["ESFP", "ENFP", "ESTP"],
    shareText: "나는 🧹 완벽 정리러(ISTJ)! 너는 어떤 청소러야?",
  },
  ISTP: {
    name: "실용 청소러",
    emoji: "🛠",
    summary: "필요할 때만 행동",
    description: [
      "필요할 때만 행동하는 당신은 실용 청소러예요. 일단 손부터 움직이고, 당장 닦으며, 조용히 집중하며 청소해요.",
      "과감히 버리고, 원래대로가 편하지만, 그냥 대충 끝내는 간결·효율형 스타일이에요.",
      "'청소 끝나고 보자!'라고 하며, 스트레스 쌓일 때만 청소하고, 기능/가격 비교로 도구를 구매하는 '필요 없으면 버림' 스타일이에요.",
    ],
    recommendedTips: ["청소 Playlist: 실용적인 음악", "추천 아이템: 간단한 청소 도구"],
    recommendedAction: "실용적으로 청소하되, 가끔은 감성 청소도 즐겨보세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
    shareText: "나는 🧹 실용 청소러(ISTP)! 너는 어떤 청소러야?",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof cleanCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = cleanCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950">
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
                  className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="clean-style"
                  testPath="/tests/clean-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={character.shareText}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/clean-style/test">
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
              <span>🧹</span>
              <span>당신의 청소 스타일</span>
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
              <span>추천 포인트 & 청소 꿀팁</span>
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
              <strong>청소 꿀팁:</strong> {character.recommendedAction}
            </p>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 청소 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = cleanCharacters[type as keyof typeof cleanCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg text-center"
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
              <SparklesIcon className="h-6 w-6 text-cyan-500" />
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
                  slug: "lunch-style",
                  title: "회사 점심",
                  emoji: "🍱",
                  description: "점심 선택으로 알아보는 성격",
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

export default function CleanStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

