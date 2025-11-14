"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Camera, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const photoTypes = {
  ENFP: {
    label: "즉흥 감성 포토그래퍼",
    summary: "즉흥적이고 창의적으로 음식 사진을 찍으며 공유하는 타입",
    description: [
      "즉흥적이고 창의적으로 촬영하는 당신! 생각날 때마다 여러 각도로 찍고, 편집하며, 감성을 담아요.",
      "적극적으로 공유하고, 소통하며, 트렌디한 스타일을 시도해요. 촬영을 통해 즐거움을 느끼고, 사람들과 나눠요.",
      "사진을 통해 아름다움을 표현하고, 모두가 행복해하는 순간을 만들어요.",
    ],
    traits: ["즉흥 촬영", "창의적 편집", "적극적 공유"],
    picks: ["감각적 구도", "트렌디 스타일", "편집 활용"],
    tips: ["계획적 촬영", "정확한 구도", "정리 습관"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: { label: "감성 공유 포토그래퍼", summary: "계획적이고 감성적으로 음식 사진을 완성하며 나누는 타입", description: ["계획적이고 감성적으로 촬영하는 당신! 먹기 전에 바로 찍고, 창의적으로 편집하며, 감성을 담아요.", "적극적으로 공유하고, 소통하며, 즉시 정리해요. 촬영을 통해 뿌듯함을 느끼고, 사람들에게 영감을 줘요.", "사진을 통해 아름다움을 나누고, 모두가 즐거워하는 순간을 만들어요."], traits: ["계획적 촬영", "감성 담기", "적극적 공유"], picks: ["창의적 편집", "즉시 촬영", "체계적 정리"], tips: ["유연한 촬영", "자연스러운 스타일", "개인 시간"], match: "ISTP, INTP", emoji: "💖" },
  ENTP: { label: "실험 혁신 포토그래퍼", summary: "즉흥적이고 논리적으로 음식 사진을 실험하는 타입", description: ["즉흥적이고 논리적으로 촬영하는 당신! 생각날 때마다 여러 각도로 찍고, 창의적으로 편집하며, 완성도를 추구해요.", "적극적으로 공유하고, 소통하며, 트렌디한 스타일을 시도해요. 촬영을 통해 만족감을 느끼고, 최적의 결과를 만들어요.", "사진을 통해 새로운 가능성을 탐구하고, 혁신적인 스타일을 만들어요."], traits: ["실험적 촬영", "논리적 완성", "적극적 공유"], picks: ["창의적 편집", "트렌디 스타일", "즉흥 촬영"], tips: ["계획적 촬영", "전통 스타일", "정리 습관"], match: "ISFJ, ISTJ", emoji: "🔬" },
  ENTJ: { label: "전략 완벽 포토그래퍼", summary: "계획적이고 논리적으로 음식 사진을 완벽하게 완성하는 타입", description: ["계획적이고 논리적으로 촬영하는 당신! 먹기 전에 바로 몇 장만 찍고, 창의적으로 편집하며, 완성도를 추구해요.", "적극적으로 공유하고, 즉시 정리하며, 기록으로 남겨요. 촬영을 통해 만족감을 느끼고, 완벽한 결과를 만들어요.", "사진을 통해 효율성을 높이고, 체계적인 시스템을 만들어요."], traits: ["계획적 촬영", "완벽한 완성", "체계적 정리"], picks: ["창의적 편집", "정확한 구도", "즉시 촬영"], tips: ["감성 담기", "유연한 촬영", "자연스러운 스타일"], match: "ISFP, INFP", emoji: "⚡" },
  INFP: { label: "감성 예술 포토그래퍼", summary: "즉흥적이고 감성적으로 음식 사진을 예술처럼 담는 타입", description: ["즉흥적이고 감성적으로 촬영하는 당신! 생각날 때마다 여러 각도로 찍고, 창의적으로 편집하며, 아름다움을 담아요.", "조용히 보관하고, 나중에 정리하며, 감성을 표현해요. 촬영을 통해 즐거움을 느끼고, 특별한 순간을 만들어요.", "사진을 통해 자신만의 스타일을 만들고, 의미있는 순간을 담아요."], traits: ["감성 촬영", "창의적 편집", "조용한 보관"], picks: ["감각적 구도", "트렌디 스타일", "편집 활용"], tips: ["계획적 촬영", "적극적 공유", "정리 습관"], match: "ESTJ, ENTJ", emoji: "🌸" },
  INFJ: { label: "완벽 감성 포토그래퍼", summary: "계획적이고 감성적으로 음식 사진을 의미있게 담는 타입", description: ["계획적이고 감성적으로 촬영하는 당신! 먹기 전에 바로 몇 장만 찍고, 창의적으로 편집하며, 감성을 담아요.", "조용히 보관하고, 즉시 정리하며, 아름다움을 표현해요. 촬영을 통해 뿌듯함을 느끼고, 의미있는 순간을 만들어요.", "사진을 통해 특별한 순간을 담고, 소중한 기억을 남겨요."], traits: ["계획적 촬영", "감성 담기", "완벽한 보관"], picks: ["창의적 편집", "정확한 구도", "즉시 촬영"], tips: ["유연한 촬영", "적극적 공유", "자연스러운 스타일"], match: "ESTP, ESFP", emoji: "🌙" },
  INTP: { label: "분석 실험 포토그래퍼", summary: "즉흥적이고 논리적으로 음식 사진을 분석하며 찍는 타입", description: ["즉흥적이고 논리적으로 촬영하는 당신! 생각날 때마다 여러 각도로 찍고, 창의적으로 편집하며, 완성도를 추구해요.", "조용히 보관하고, 나중에 정리하며, 기록으로 남겨요. 촬영을 통해 만족감을 느끼고, 최적의 결과를 만들어요.", "사진을 통해 효율성을 추구하고, 논리적인 방법을 찾아요."], traits: ["논리적 촬영", "실험적 편집", "조용한 보관"], picks: ["창의적 편집", "트렌디 스타일", "즉흥 촬영"], tips: ["계획적 촬영", "감성 담기", "정리 습관"], match: "ESFJ, ENFJ", emoji: "🧪" },
  INTJ: { label: "전략 완벽 포토그래퍼", summary: "계획적이고 논리적으로 음식 사진을 완벽하게 완성하는 타입", description: ["계획적이고 논리적으로 촬영하는 당신! 먹기 전에 바로 몇 장만 찍고, 창의적으로 편집하며, 완성도를 추구해요.", "조용히 보관하고, 즉시 정리하며, 기록으로 남겨요. 촬영을 통해 만족감을 느끼고, 완벽한 결과를 만들어요.", "사진을 통해 완벽함을 추구하고, 체계적인 시스템을 만들어요."], traits: ["계획적 촬영", "완벽한 완성", "체계적 보관"], picks: ["창의적 편집", "정확한 구도", "즉시 촬영"], tips: ["감성 담기", "적극적 공유", "유연한 촬영"], match: "ESFP, ENFP", emoji: "🎯" },
  ESFP: { label: "즉흥 감성 포토그래퍼", summary: "즉흥적이고 감성적으로 음식 사진을 즐겁게 찍는 타입", description: ["즉흥적이고 감성적으로 촬영하는 당신! 생각날 때마다 여러 각도로 찍고, 자연스럽게 원본으로 남기며, 아름다움을 담아요.", "적극적으로 공유하고, 소통하며, 전통적인 스타일을 선호해요. 촬영을 통해 즐거움을 느끼고, 모두가 행복해하는 순간을 만들어요.", "사진을 통해 즐거움을 나누고, 행복한 시간을 만들어요."], traits: ["즉흥 촬영", "감성 담기", "적극적 공유"], picks: ["자연스러운 원본", "전통 스타일", "즉시 공유"], tips: ["계획적 촬영", "편집 활용", "정리 습관"], match: "INTJ, ISTJ", emoji: "🎉" },
  ESFJ: { label: "전통 나눔 포토그래퍼", summary: "계획적이고 감성적으로 음식 사진을 정성스럽게 찍는 타입", description: ["계획적이고 감성적으로 촬영하는 당신! 먹기 전에 바로 몇 장만 찍고, 자연스럽게 원본으로 남기며, 아름다움을 담아요.", "적극적으로 공유하고, 즉시 정리하며, 전통적인 스타일을 선호해요. 촬영을 통해 뿌듯함을 느끼고, 모두가 만족하는 결과를 만들어요.", "사진을 통해 사람들을 챙기고, 행복을 나눠요."], traits: ["계획적 촬영", "정성 담기", "적극적 공유"], picks: ["자연스러운 원본", "정확한 구도", "즉시 촬영"], tips: ["편집 활용", "유연한 촬영", "트렌디 스타일"], match: "INTP, ISTP", emoji: "🤝" },
  ESTP: { label: "즉흥 빠른 포토그래퍼", summary: "즉흥적이고 논리적으로 음식 사진을 빠르게 찍는 타입", description: ["즉흥적이고 논리적으로 촬영하는 당신! 생각날 때마다 여러 각도로 찍고, 자연스럽게 원본으로 남기며, 기록을 남겨요.", "적극적으로 공유하고, 소통하며, 전통적인 스타일을 선호해요. 촬영을 통해 만족감을 느끼고, 빠르게 완성해요.", "사진을 통해 효율성을 높이고, 실용적인 결과를 만들어요."], traits: ["즉흥 촬영", "빠른 완성", "적극적 공유"], picks: ["자연스러운 원본", "전통 스타일", "즉시 공유"], tips: ["계획적 촬영", "편집 활용", "정리 습관"], match: "INFJ, ISFJ", emoji: "⚡" },
  ESTJ: { label: "체계 전통 포토그래퍼", summary: "계획적이고 논리적으로 음식 사진을 체계적으로 찍는 타입", description: ["계획적이고 논리적으로 촬영하는 당신! 먹기 전에 바로 몇 장만 찍고, 자연스럽게 원본으로 남기며, 기록을 남겨요.", "적극적으로 공유하고, 즉시 정리하며, 전통적인 스타일을 선호해요. 촬영을 통해 만족감을 느끼고, 체계적으로 관리해요.", "사진을 통해 효율성을 높이고, 체계적인 시스템을 만들어요."], traits: ["계획적 촬영", "체계적 관리", "전통 스타일"], picks: ["정확한 구도", "자연스러운 원본", "즉시 촬영"], tips: ["편집 활용", "감성 담기", "트렌디 스타일"], match: "INFP, INTP", emoji: "📋" },
  ISFP: { label: "감각 예술 포토그래퍼", summary: "즉흥적이고 감성적으로 음식 사진을 예술처럼 담는 타입", description: ["즉흥적이고 감성적으로 촬영하는 당신! 생각날 때마다 여러 각도로 찍고, 자연스럽게 원본으로 남기며, 아름다움을 담아요.", "조용히 보관하고, 나중에 정리하며, 전통적인 스타일을 선호해요. 촬영을 통해 즐거움을 느끼고, 자신만의 스타일을 만들어요.", "사진을 통해 감성을 표현하고, 아름다운 순간을 담아요."], traits: ["감성 촬영", "예술적 표현", "조용한 보관"], picks: ["자연스러운 원본", "감각적 구도", "여유로운 촬영"], tips: ["계획적 촬영", "편집 활용", "적극적 공유"], match: "ENTJ, ESTJ", emoji: "🎨" },
  ISFJ: { label: "정성 전통 포토그래퍼", summary: "계획적이고 감성적으로 음식 사진을 정성스럽게 찍는 타입", description: ["계획적이고 감성적으로 촬영하는 당신! 먹기 전에 바로 몇 장만 찍고, 자연스럽게 원본으로 남기며, 아름다움을 담아요.", "조용히 보관하고, 즉시 정리하며, 전통적인 스타일을 선호해요. 촬영을 통해 뿌듯함을 느끼고, 정성을 담아요.", "사진을 통해 소중한 기억을 남기고, 따뜻한 마음을 담아요."], traits: ["계획적 촬영", "정성 담기", "전통 스타일"], picks: ["자연스러운 원본", "정확한 구도", "즉시 촬영"], tips: ["편집 활용", "트렌디 스타일", "유연한 촬영"], match: "ENTP, ESTP", emoji: "💝" },
  ISTP: { label: "실용 기술 포토그래퍼", summary: "즉흥적이고 논리적으로 음식 사진을 실용적으로 찍는 타입", description: ["즉흥적이고 논리적으로 촬영하는 당신! 생각날 때마다 여러 각도로 찍고, 자연스럽게 원본으로 남기며, 기록을 남겨요.", "조용히 보관하고, 나중에 정리하며, 전통적인 스타일을 선호해요. 촬영을 통해 만족감을 느끼고, 실용적으로 활용해요.", "사진을 통해 효율성을 추구하고, 최소한의 노력으로 최대 효과를 내요."], traits: ["즉흥 촬영", "실용적 활용", "조용한 보관"], picks: ["자연스러운 원본", "전통 스타일", "여유로운 촬영"], tips: ["계획적 촬영", "편집 활용", "적극적 공유"], match: "ENFJ, ESFJ", emoji: "🔧" },
  ISTJ: { label: "원칙 정확 포토그래퍼", summary: "계획적이고 논리적으로 음식 사진을 원칙에 따라 찍는 타입", description: ["계획적이고 논리적으로 촬영하는 당신! 먹기 전에 바로 몇 장만 찍고, 자연스럽게 원본으로 남기며, 기록을 남겨요.", "조용히 보관하고, 즉시 정리하며, 전통적인 스타일을 선호해요. 촬영을 통해 만족감을 느끼고, 체계적으로 관리해요.", "사진을 통해 안정감을 느끼고, 신뢰할 수 있는 기록을 만들어요."], traits: ["계획적 촬영", "원칙 준수", "체계적 보관"], picks: ["정확한 구도", "자연스러운 원본", "즉시 촬영"], tips: ["편집 활용", "감성 담기", "트렌디 스타일"], match: "ENFP, ESFP", emoji: "📐" },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof photoTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = photoTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = `나의 음식 사진 스타일은 "${character.label}" ${character.emoji}`
  const shareText = `${character.summary}\n\n나도 음식 사진 스타일 테스트 하러 가기 📸`

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  {character.label}
                </h1>
                <p className="text-xl text-muted-foreground">{character.summary}</p>
              </div>

              <div className="pt-6">
                <ShareButtons title={shareTitle} text={shareText} url={currentUrl} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">상세 분석</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              {character.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">주요 특징</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-xl text-center font-medium"
                >
                  {trait}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">추천 촬영 스타일</h2>
            </div>
            <div className="space-y-3">
              {character.picks.map((pick, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
                  <span className="text-lg">{pick}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">성장 포인트</h2>
            </div>
            <div className="space-y-3">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
                  <span className="text-lg">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">궁합</h2>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-xl">
              <p className="text-lg mb-2 text-muted-foreground">최고의 촬영 파트너</p>
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-pink-500 to-rose-500">
          <CardContent className="p-8">
            <div className="text-center space-y-6 text-white">
              <h2 className="text-2xl font-bold">다른 테스트도 해보세요!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/leftover-handling"><div className="text-left w-full"><div className="text-2xl mb-1">📦</div><div className="font-semibold">남은 음식 처리</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-sharing"><div className="text-left w-full"><div className="text-2xl mb-1">🤝</div><div className="font-semibold">음식 나눔 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
              </div>
              <Button size="lg" variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                <Link href="/">전체 테스트 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function FoodPhotographyResult() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><div className="text-4xl animate-bounce">📸</div><p className="text-muted-foreground">결과 로딩 중...</p></div></div>}>
      <ResultContent />
    </Suspense>
  )
}

