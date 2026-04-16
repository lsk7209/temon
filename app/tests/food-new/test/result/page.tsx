"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { FileText, Heart, Lightbulb, Users, ArrowRight, Sparkles, RotateCcw } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const foodNewTypes = {
  ENFP: {
    label: "모험적 신상품 탐험가",
    summary: "즉흥적으로 신상품을 시도하며 새로운 경험을 즐기는 타입",
    description: [
      "신상품을 발견하면 즉시 관심이 생기고 바로 구매하고 싶어하는 당신! 새로운 음식 상품을 시도하는 것이 즐겁고, 트렌드를 따라가는 것을 좋아해요.",
      "친구들과 함께 신상품을 시도하고, 포장지와 디자인이 마음에 들면 선택하는 감성적인 스타일이에요. 신상품이 예상과 달라도 새로운 경험이라 생각하고 즐기는 유연한 성격입니다.",
      "신상품 시도를 통해 다양한 경험을 쌓고, 사람들과 함께 즐거움을 나누는 것을 좋아해요.",
    ],
    traits: ["즉흥적 시도", "트렌드 추종", "사교적", "감성적 선택", "유연한 태도"],
    picks: ["SNS에서 유행하는 신상품", "친구들과 함께 시도하기", "포장지가 예쁜 신상품"],
    tips: ["가끔은 리뷰를 확인해보세요", "가격 대비 가치도 고려해보세요", "혼자만의 경험도 즐겨보세요"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "배려심 많은 신상품 큐레이터",
    summary: "계획적으로 신상품을 선택하며 모두를 위한 추천을 하는 타입",
    description: [
      "신상품 정보를 체계적으로 수집하고 비교하는 당신! 가끔만 신중하게 시도하며, 검증된 기존 제품을 선호하는 편이에요.",
      "신상품을 시도한 후 친구들에게 추천하거나 피드백을 주는 배려심 많은 스타일입니다. 모두가 만족할 수 있는 신상품을 찾아서 공유하는 것을 좋아해요.",
      "신상품 선택을 통해 사람들과의 관계를 돈독히 하고, 모두를 위한 선택을 제공하는 것을 즐겨요.",
    ],
    traits: ["계획적 선택", "배려심", "정보 수집", "신중한 판단", "사람 중심"],
    picks: ["평이 좋은 신상품", "함께 시도할 수 있는 신상품", "검증된 신상품"],
    tips: ["가끔은 즉흥적으로 시도해보세요", "자신의 취향도 중요해요", "혼자만의 경험도 즐겨보세요"],
    match: "ISTP, INTP",
    emoji: "💝",
  },
  ENTP: {
    label: "분석적 신상품 혁신가",
    summary: "즉흥적으로 신상품을 시도하며 논리적으로 분석하는 타입",
    description: [
      "신상품을 발견하면 즉시 관심이 생기는 당신! 하지만 가격 대비 가치를 따져보고 결정하는 논리적인 스타일이에요.",
      "원재료와 영양 정보를 확인하고 선택하며, 신상품이 실패해도 다른 신상품을 계속 시도하는 모험적인 성격입니다. 정보를 공유하고 효율적인 선택을 하는 것을 좋아해요.",
      "신상품 시도를 통해 최적의 선택을 찾고, 효율적인 경험을 하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 시도", "논리적 분석", "정보 확인", "효율 추구", "모험적"],
    picks: ["영양 정보가 좋은 신상품", "가격 대비 가치가 높은 신상품", "새로운 조합의 신상품"],
    tips: ["가끔은 감성적으로 선택해보세요", "익숙한 제품도 좋아요", "계획적으로 선택해보세요"],
    match: "ISFJ, INFJ",
    emoji: "💡",
  },
  ENTJ: {
    label: "전략적 신상품 리더",
    summary: "계획적으로 신상품을 선택하며 목표 달성을 위한 선택을 하는 타입",
    description: [
      "신상품 정보를 체계적으로 수집하고 비교하는 당신! 가끔만 신중하게 시도하며, 검증된 기존 제품을 선호하는 편이에요.",
      "원재료와 영양 정보를 확인하고 선택하며, 신상품이 실패하면 익숙한 제품으로 돌아가는 실용적인 스타일입니다. 목표 달성을 위한 효율적인 선택을 하는 것을 좋아해요.",
      "신상품 선택을 통해 최적의 경험을 하고, 효율적인 시스템을 구축하는 것을 즐겨요.",
    ],
    traits: ["계획적 선택", "전략적 판단", "효율 추구", "목표 지향", "실용적"],
    picks: ["검증된 신상품", "효율적인 신상품", "목표에 맞는 신상품"],
    tips: ["가끔은 즉흥적으로 시도해보세요", "감성적 선택도 좋아요", "새로운 경험을 즐겨보세요"],
    match: "ISFP, INFP",
    emoji: "👑",
  },
  INFP: {
    label: "이상주의 신상품 몽상가",
    summary: "즉흥적으로 신상품을 시도하며 개인적인 의미를 찾는 타입",
    description: [
      "신상품을 발견하면 즉시 관심이 생기는 당신! 포장지와 디자인이 마음에 들면 선택하는 감성적인 스타일이에요.",
      "혼자만의 경험으로 간직하거나 기록하며, 신상품이 예상과 달라도 새로운 경험이라 생각하고 즐기는 유연한 성격입니다. 개인적인 의미와 감성을 추구하는 것을 좋아해요.",
      "신상품 시도를 통해 개인적인 경험을 쌓고, 깊은 감성을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 시도", "감성적 선택", "개인적 의미", "유연한 태도", "독창성"],
    picks: ["디자인이 예쁜 신상품", "독특한 신상품", "개인 취향에 맞는 신상품"],
    tips: ["가끔은 정보를 확인해보세요", "함께 시도하는 것도 좋아요", "계획적으로 선택해보세요"],
    match: "ENTJ, ESTJ",
    emoji: "✨",
  },
  INFJ: {
    label: "통찰력 있는 신상품 조언가",
    summary: "계획적으로 신상품을 선택하며 깊은 통찰을 얻는 타입",
    description: [
      "신상품 정보를 체계적으로 수집하고 비교하는 당신! 가끔만 신중하게 시도하며, 검증된 기존 제품을 선호하는 편이에요.",
      "혼자만의 경험으로 간직하거나 기록하며, 신상품 선택을 통해 깊은 의미를 찾는 것을 좋아해요. 내면의 성장을 추구하는 스타일입니다.",
      "신상품 선택을 통해 깊은 통찰을 얻고, 내면의 성장을 추구하는 것을 즐겨요.",
    ],
    traits: ["계획적 선택", "깊은 통찰", "내면 성장", "신중한 판단", "의미 추구"],
    picks: ["의미 있는 신상품", "깊이 있는 신상품", "성장에 도움이 되는 신상품"],
    tips: ["가끔은 즉흥적으로 시도해보세요", "함께 시도하는 것도 좋아요", "새로운 경험을 즐겨보세요"],
    match: "ENTP, ESTP",
    emoji: "🔮",
  },
  INTP: {
    label: "논리적 신상품 탐구자",
    summary: "즉흥적으로 신상품을 시도하며 논리적인 탐구를 즐기는 타입",
    description: [
      "신상품을 발견하면 즉시 관심이 생기는 당신! 원재료와 영양 정보를 확인하고 선택하는 논리적인 스타일이에요.",
      "혼자만의 경험으로 간직하거나 기록하며, 신상품이 실패해도 다른 신상품을 계속 시도하는 모험적인 성격입니다. 논리적인 분석과 탐구를 즐기는 것을 좋아해요.",
      "신상품 시도를 통해 논리적인 분석을 하고, 새로운 지식을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 시도", "논리적 분석", "정보 탐구", "모험적", "지식 추구"],
    picks: ["영양 정보가 좋은 신상품", "새로운 조합의 신상품", "분석할 가치가 있는 신상품"],
    tips: ["가끔은 감성적으로 선택해보세요", "함께 시도하는 것도 좋아요", "계획적으로 선택해보세요"],
    match: "ENFJ, ESFJ",
    emoji: "🧠",
  },
  INTJ: {
    label: "전략적 신상품 설계자",
    summary: "계획적으로 신상품을 선택하며 완벽한 선택을 설계하는 타입",
    description: [
      "신상품 정보를 체계적으로 수집하고 비교하는 당신! 가끔만 신중하게 시도하며, 검증된 기존 제품을 선호하는 편이에요.",
      "원재료와 영양 정보를 확인하고 선택하며, 신상품이 실패하면 익숙한 제품으로 돌아가는 실용적인 스타일입니다. 완벽한 선택을 설계하는 것을 좋아해요.",
      "신상품 선택을 통해 완벽한 경험을 하고, 효율적인 시스템을 구축하는 것을 즐겨요.",
    ],
    traits: ["계획적 선택", "완벽 추구", "시스템 구축", "효율적", "전략적"],
    picks: ["검증된 신상품", "효율적인 신상품", "완벽한 신상품"],
    tips: ["가끔은 즉흥적으로 시도해보세요", "감성적 선택도 좋아요", "새로운 경험을 즐겨보세요"],
    match: "ENFP, ESFP",
    emoji: "⚙️",
  },
  ESFP: {
    label: "자유로운 신상품 즐거움 추구자",
    summary: "즉흥적으로 신상품을 시도하며 즐거움을 추구하는 타입",
    description: [
      "신상품을 발견하면 즉시 관심이 생기고 바로 구매하고 싶어하는 당신! 트렌드를 따라가는 것을 즐기고, 포장지와 디자인이 마음에 들면 선택하는 감성적인 스타일이에요.",
      "친구들과 함께 신상품을 시도하고, 신상품이 예상과 달라도 새로운 경험이라 생각하고 즐기는 유연한 성격입니다. 즐거움과 재미를 추구하는 것을 좋아해요.",
      "신상품 시도를 통해 즐거운 경험을 하고, 사람들과 함께 행복을 나누는 것을 즐겨요.",
    ],
    traits: ["즉흥적 시도", "즐거움 추구", "사교적", "감성적 선택", "트렌드 추종"],
    picks: ["트렌드 신상품", "즐거운 신상품", "함께 시도할 수 있는 신상품"],
    tips: ["가끔은 정보를 확인해보세요", "가격도 고려해보세요", "혼자만의 경험도 즐겨보세요"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "친화적 신상품 조화 추구자",
    summary: "계획적으로 신상품을 선택하며 조화로운 경험을 만드는 타입",
    description: [
      "신상품 정보를 체계적으로 수집하고 비교하는 당신! 가끔만 신중하게 시도하며, 검증된 기존 제품을 선호하는 편이에요.",
      "친구들과 함께 신상품을 시도하고, 모두가 만족할 수 있는 신상품을 찾아서 공유하는 것을 좋아해요. 조화로운 경험과 관계를 중시하는 스타일입니다.",
      "신상품 선택을 통해 행복한 경험을 하고, 사람들과의 관계를 돈독히 하는 것을 즐겨요.",
    ],
    traits: ["계획적 선택", "조화 추구", "친화적", "배려심", "사람 중심"],
    picks: ["평이 좋은 신상품", "함께 시도할 수 있는 신상품", "조화로운 신상품"],
    tips: ["가끔은 즉흥적으로 시도해보세요", "자신의 취향도 중요해요", "새로운 경험을 즐겨보세요"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "현실적 신상품 모험가",
    summary: "즉흥적으로 신상품을 시도하며 현실적인 모험을 즐기는 타입",
    description: [
      "신상품을 발견하면 즉시 관심이 생기는 당신! 가격 대비 가치를 따져보고 결정하는 현실적인 스타일이에요.",
      "친구들과 함께 신상품을 시도하고, 신상품이 실패해도 다른 신상품을 계속 시도하는 모험적인 성격입니다. 현실적인 모험과 도전을 추구하는 것을 좋아해요.",
      "신상품 시도를 통해 현실적인 경험을 하고, 새로운 도전을 즐기는 것을 즐겨요.",
    ],
    traits: ["즉흥적 시도", "현실적 판단", "모험적", "도전적", "효율 추구"],
    picks: ["가격 대비 가치가 높은 신상품", "새로운 도전의 신상품", "현실적인 신상품"],
    tips: ["가끔은 감성적으로 선택해보세요", "계획적으로 선택해보세요", "익숙한 제품도 좋아요"],
    match: "INFJ, ISFJ",
    emoji: "🚀",
  },
  ESTJ: {
    label: "실용적 신상품 관리자",
    summary: "계획적으로 신상품을 선택하며 실용적인 관리를 중시하는 타입",
    description: [
      "신상품 정보를 체계적으로 수집하고 비교하는 당신! 가끔만 신중하게 시도하며, 검증된 기존 제품을 선호하는 편이에요.",
      "원재료와 영양 정보를 확인하고 선택하며, 신상품이 실패하면 익숙한 제품으로 돌아가는 실용적인 스타일입니다. 효율적인 관리와 실용성을 중시하는 것을 좋아해요.",
      "신상품 선택을 통해 효율적인 경험을 하고, 실용적인 지식을 얻는 것을 즐겨요.",
    ],
    traits: ["계획적 선택", "실용적 관리", "효율 추구", "신중한 판단", "목표 지향"],
    picks: ["검증된 신상품", "실용적인 신상품", "효율적인 신상품"],
    tips: ["가끔은 즉흥적으로 시도해보세요", "감성적 선택도 좋아요", "새로운 경험을 즐겨보세요"],
    match: "INFP, ISFP",
    emoji: "📊",
  },
  ISFP: {
    label: "감성적 신상품 예술가",
    summary: "즉흥적으로 신상품을 시도하며 감성적인 경험을 추구하는 타입",
    description: [
      "신상품을 발견하면 즉시 관심이 생기는 당신! 포장지와 디자인이 마음에 들면 선택하는 감성적인 스타일이에요.",
      "혼자만의 경험으로 간직하거나 기록하며, 신상품이 예상과 달라도 새로운 경험이라 생각하고 즐기는 유연한 성격입니다. 감성적인 경험과 아름다움을 추구하는 것을 좋아해요.",
      "신상품 시도를 통해 감성적인 경험을 하고, 아름다움을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 시도", "감성적 선택", "아름다움 추구", "유연한 태도", "독창성"],
    picks: ["디자인이 예쁜 신상품", "독특한 신상품", "감성적인 신상품"],
    tips: ["가끔은 정보를 확인해보세요", "함께 시도하는 것도 좋아요", "계획적으로 선택해보세요"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "세심한 신상품 보호자",
    summary: "계획적으로 신상품을 선택하며 세심한 배려를 하는 타입",
    description: [
      "신상품 정보를 체계적으로 수집하고 비교하는 당신! 가끔만 신중하게 시도하며, 검증된 기존 제품을 선호하는 편이에요.",
      "혼자만의 경험으로 간직하거나 기록하며, 신상품 선택을 통해 안정적인 경험을 하는 것을 좋아해요. 세심한 배려와 안정성을 중시하는 스타일입니다.",
      "신상품 선택을 통해 안정적인 경험을 하고, 소중한 사람들을 보호하는 것을 즐겨요.",
    ],
    traits: ["계획적 선택", "세심한 배려", "안정성 추구", "신중한 판단", "보호 본능"],
    picks: ["검증된 신상품", "안정적인 신상품", "세심한 신상품"],
    tips: ["가끔은 즉흥적으로 시도해보세요", "새로운 경험을 즐겨보세요", "함께 시도하는 것도 좋아요"],
    match: "ENTP, ESTP",
    emoji: "🛡️",
  },
  ISTP: {
    label: "분석적 신상품 장인",
    summary: "즉흥적으로 신상품을 시도하며 실용적인 해결책을 찾는 타입",
    description: [
      "신상품을 발견하면 즉시 관심이 생기는 당신! 원재료와 영양 정보를 확인하고 선택하는 논리적인 스타일이에요.",
      "혼자만의 경험으로 간직하거나 기록하며, 신상품이 실패해도 다른 신상품을 계속 시도하는 모험적인 성격입니다. 실용적인 해결책과 효율을 중시하는 것을 좋아해요.",
      "신상품 시도를 통해 실용적인 해결책을 찾고, 효율적인 경험을 하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 시도", "실용적 해결", "효율 추구", "논리적 분석", "모험적"],
    picks: ["실용적인 신상품", "효율적인 신상품", "해결책이 되는 신상품"],
    tips: ["가끔은 감성적으로 선택해보세요", "함께 시도하는 것도 좋아요", "계획적으로 선택해보세요"],
    match: "ENFJ, ESFJ",
    emoji: "🛠️",
  },
  ISTJ: {
    label: "원칙주의 신상품 감별사",
    summary: "계획적으로 신상품을 선택하며 원칙에 따라 감별하는 타입",
    description: [
      "신상품 정보를 체계적으로 수집하고 비교하는 당신! 가끔만 신중하게 시도하며, 검증된 기존 제품을 선호하는 편이에요.",
      "원재료와 영양 정보를 확인하고 선택하며, 신상품이 실패하면 익숙한 제품으로 돌아가는 실용적인 스타일입니다. 원칙과 정확성을 중시하는 것을 좋아해요.",
      "신상품 선택을 통해 정확한 정보를 얻고, 원칙적인 경험을 하는 것을 즐겨요.",
    ],
    traits: ["계획적 선택", "원칙 준수", "정확성 추구", "신중한 판단", "실용적"],
    picks: ["검증된 신상품", "원칙에 맞는 신상품", "정확한 신상품"],
    tips: ["가끔은 즉흥적으로 시도해보세요", "감성적 선택도 좋아요", "새로운 경험을 즐겨보세요"],
    match: "ENFP, ESFP",
    emoji: "📜",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof foodNewTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = foodNewTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 신상품 시도 스타일은 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 신상품 시도 스타일 테스트 하러 가기 ✨`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                  {character.label}
                </h1>
                <p className="text-xl text-muted-foreground">{character.summary}</p>
              </div>

              <div className="pt-6">
                <ShareButtons
                  testId="food-new"
                  testPath="/tests/food-new/test/result"
                  resultType={mbtiType}
                  resultId={resultId || undefined}
                  title={shareTitle}
                  description={shareDescription}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">상세 설명</h2>
              </div>
              <div className="space-y-4">
                {character.description.map((desc, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">특징</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.traits.map((trait, idx) => (
                  <div key={idx} className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <p className="font-medium">{trait}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">추천 신상품 스타일</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.picks.map((pick, idx) => (
                  <div key={idx} className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                    <p className="font-medium">{pick}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-xl">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">개선 팁</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.tips.map((tip, idx) => (
                  <div key={idx} className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                    <p className="font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">잘 맞는 타입</h2>
              </div>
              <p className="text-muted-foreground">
                {character.match} 타입과 신상품 시도 취향이 잘 맞아요! 함께 신상품을 시도하면 더욱 즐거울 거예요.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4 pb-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/tests/food-new/test">
              <RotateCcw className="h-5 w-5 mr-2" />
              다시 테스트
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/tests">
              <ArrowRight className="h-5 w-5 mr-2" />
              다른 테스트 보기
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

export default function FoodNewResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">결과를 불러오는 중...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}

