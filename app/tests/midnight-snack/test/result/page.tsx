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

const midnightSnackTypes = {
  ENFP: {
    label: "즉흥 야식 탐험가",
    summary: "즉흥적으로 야식을 선택하며 새로운 종류를 탐구하는 타입",
    description: [
      "즉흥적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 새로운 종류를 시도해요. 즉흥적으로 선택하며 감각과 직감을 추구해요.",
      "즉시 선택하고, 자주 변경하며, 다른 사람과 함께 야식을 즐겨요. 감각과 직감으로 선택하고, 그때그때 새로운 종류를 시도하는 유연한 스타일이에요.",
      "야식을 통해 새로운 경험을 하고, 다양한 종류를 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 선택", "새로운 종류", "적극적 공유"],
    picks: ["새로운 야식", "즉시 선택", "함께 즐기기"],
    tips: ["익숙한 야식", "계획적 선택", "혼자 즐기기"],
    match: "ISTJ, INTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "배려 야식 큐레이터",
    summary: "계획적으로 야식을 선택하며 모두를 위한 종류를 찾는 타입",
    description: [
      "계획적으로 야식을 선택하는 당신! 항상 야식을 섭취하고, 익숙한 종류를 선호해요. 계획적으로 선택하며 감각과 직감을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 다른 사람과 함께 야식을 즐겨요. 감각과 직감으로 선택하고, 미리 준비하는 체계적인 스타일로, 모두가 만족할 수 있는 종류를 찾아요.",
      "야식을 통해 행복한 선택을 하고, 소중한 사람들을 위한 종류를 제공하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "익숙한 종류", "배려심"],
    picks: ["균형 잡힌 야식", "신중한 선택", "함께 즐기기"],
    tips: ["즉흥적 선택", "새로운 종류", "혼자 즐기기"],
    match: "ISTP, INTP",
    emoji: "💝",
  },
  ENTP: {
    label: "분석 야식 혁신가",
    summary: "즉흥적으로 야식을 선택하며 논리적으로 선택하는 타입",
    description: [
      "즉흥적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 새로운 종류를 시도해요. 즉흥적으로 선택하며 논리와 정보를 중시해요.",
      "즉시 선택하고, 자주 변경하며, 다른 사람과 함께 야식을 즐겨요. 논리와 정보로 선택하고, 그때그때 새로운 종류를 시도하는 효율적인 스타일이에요.",
      "야식을 통해 최적의 선택을 하고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "논리적 선택", "효율적 확인"],
    picks: ["새로운 종류", "빠른 변경", "정보 공유"],
    tips: ["익숙한 종류", "느린 변경", "혼자 즐기기"],
    match: "ISFJ, INFJ",
    emoji: "💡",
  },
  ENTJ: {
    label: "전략 야식 리더",
    summary: "계획적으로 야식을 선택하며 목표 달성을 위한 종류를 선택하는 타입",
    description: [
      "계획적으로 야식을 선택하는 당신! 항상 야식을 섭취하고, 익숙한 종류를 선호해요. 계획적으로 선택하며 논리와 정보를 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 다른 사람과 함께 야식을 즐겨요. 논리와 정보로 선택하고, 미리 준비하는 체계적인 스타일로, 목표 달성을 위한 종류를 찾아요.",
      "야식을 통해 최적의 선택을 하고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 분석", "전략적 선택", "목표 지향"],
    picks: ["균형 잡힌 야식", "신중한 결정", "정보 공유"],
    tips: ["즉흥적 선택", "새로운 종류", "혼자 즐기기"],
    match: "ISFP, INFP",
    emoji: "👑",
  },
  INFP: {
    label: "이상주의 야식 몽상가",
    summary: "즉흥적으로 야식을 선택하며 개인적인 의미를 찾는 타입",
    description: [
      "즉흥적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 새로운 종류를 시도해요. 즉흥적으로 선택하며 개인적인 의미와 감성을 추구해요.",
      "즉시 선택하고, 자주 변경하며, 혼자 조용히 야식을 즐겨요. 감각과 직감으로 선택하고, 그때그때 새로운 종류를 시도하는 유연한 스타일이에요.",
      "야식을 통해 개인적인 경험을 하고, 깊은 감성을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 선택", "개인적 의미", "감성적 탐구"],
    picks: ["독특한 야식", "자유로운 결정", "혼자 즐기기"],
    tips: ["대중적인 야식", "계획적 선택", "함께 즐기기"],
    match: "ENTJ, ESTJ",
    emoji: "✨",
  },
  INFJ: {
    label: "통찰력 야식 조언가",
    summary: "계획적으로 야식을 선택하며 깊은 통찰을 얻는 타입",
    description: [
      "계획적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 익숙한 종류를 선호해요. 계획적으로 선택하며 깊은 통찰과 의미를 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 혼자 조용히 야식을 즐겨요. 감각과 직감으로 선택하고, 미리 준비하는 체계적인 스타일로, 깊은 통찰을 얻어요.",
      "야식을 통해 깊은 의미를 찾고, 내면의 성장을 추구하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "깊은 통찰", "내면의 성장"],
    picks: ["의미 있는 야식", "신중한 결정", "혼자 즐기기"],
    tips: ["즉흥적 선택", "새로운 종류", "함께 즐기기"],
    match: "ENTP, ESTP",
    emoji: "🔮",
  },
  INTP: {
    label: "논리적 야식 탐구자",
    summary: "즉흥적으로 야식을 선택하며 논리적인 탐구를 즐기는 타입",
    description: [
      "즉흥적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 새로운 종류를 시도해요. 즉흥적으로 선택하며 논리적인 탐구와 분석을 중시해요.",
      "즉시 선택하고, 자주 변경하며, 혼자 조용히 야식을 즐겨요. 논리와 정보로 선택하고, 그때그때 새로운 종류를 시도하는 효율적인 스타일이에요.",
      "야식을 통해 논리적인 분석을 하고, 새로운 지식을 탐구하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "논리적 탐구", "지식 추구"],
    picks: ["새로운 종류", "빠른 분석", "정보 탐색"],
    tips: ["익숙한 종류", "느린 분석", "함께 즐기기"],
    match: "ENFJ, ESFJ",
    emoji: "🧠",
  },
  INTJ: {
    label: "전략적 야식 설계자",
    summary: "계획적으로 야식을 선택하며 완벽한 종류를 설계하는 타입",
    description: [
      "계획적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 익숙한 종류를 선호해요. 계획적으로 선택하며 완벽한 종류를 설계하는 것을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 혼자 조용히 야식을 즐겨요. 논리와 정보로 선택하고, 미리 준비하는 체계적인 스타일로, 완벽한 종류를 설계해요.",
      "야식을 통해 완벽한 경험을 하고, 효율적인 시스템을 구축하는 것을 좋아해요.",
    ],
    traits: ["계획적 분석", "완벽 추구", "시스템 구축"],
    picks: ["균형 잡힌 야식", "신중한 분석", "효율적 설계"],
    tips: ["즉흥적 선택", "새로운 종류", "함께 즐기기"],
    match: "ENFP, ESFP",
    emoji: "⚙️",
  },
  ESFP: {
    label: "자유로운 야식 즐거움 추구자",
    summary: "즉흥적으로 야식을 선택하며 즐거움을 추구하는 타입",
    description: [
      "즉흥적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 새로운 종류를 시도해요. 즉흥적으로 선택하며 즐거움과 재미를 추구해요.",
      "즉시 선택하고, 자주 변경하며, 다른 사람과 함께 야식을 즐겨요. 감각과 직감으로 선택하고, 그때그때 새로운 종류를 시도하는 유연한 스타일이에요.",
      "야식을 통해 즐거운 경험을 하고, 사람들과 함께 행복을 나누는 것을 즐겨요.",
    ],
    traits: ["즉흥적 선택", "즐거움 추구", "사교적"],
    picks: ["새로운 종류", "빠른 변경", "함께 즐기기"],
    tips: ["익숙한 종류", "계획적 선택", "혼자 즐기기"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "친화적 야식 조화 추구자",
    summary: "계획적으로 야식을 선택하며 조화로운 경험을 만드는 타입",
    description: [
      "계획적으로 야식을 선택하는 당신! 항상 야식을 섭취하고, 익숙한 종류를 선호해요. 계획적으로 선택하며 조화로운 경험과 관계를 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 다른 사람과 함께 야식을 즐겨요. 감각과 직감으로 선택하고, 미리 준비하는 체계적인 스타일로, 모두가 만족할 수 있는 조화로운 종류를 만들어요.",
      "야식을 통해 행복한 경험을 하고, 사람들과의 관계를 돈독히 하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "조화 추구", "친화적"],
    picks: ["균형 잡힌 야식", "신중한 결정", "함께 즐기기"],
    tips: ["즉흥적 선택", "새로운 종류", "혼자 즐기기"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "현실적 야식 모험가",
    summary: "즉흥적으로 야식을 선택하며 현실적인 모험을 즐기는 타입",
    description: [
      "즉흥적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 새로운 종류를 시도해요. 즉흥적으로 선택하며 현실적인 모험과 도전을 추구해요.",
      "즉시 선택하고, 자주 변경하며, 다른 사람과 함께 야식을 즐겨요. 논리와 정보로 선택하고, 그때그때 새로운 종류를 시도하는 효율적인 스타일이에요.",
      "야식을 통해 현실적인 경험을 하고, 새로운 도전을 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "현실적 모험", "도전적"],
    picks: ["새로운 종류", "빠른 변경", "정보 공유"],
    tips: ["익숙한 종류", "느린 변경", "혼자 즐기기"],
    match: "INFJ, ISFJ",
    emoji: "🚀",
  },
  ESTJ: {
    label: "실용적 야식 관리자",
    summary: "계획적으로 야식을 선택하며 실용적인 관리를 중시하는 타입",
    description: [
      "계획적으로 야식을 선택하는 당신! 항상 야식을 섭취하고, 익숙한 종류를 선호해요. 계획적으로 선택하며 실용적인 관리와 효율을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 다른 사람과 함께 야식을 즐겨요. 논리와 정보로 선택하고, 미리 준비하는 체계적인 스타일로, 실용적인 관리를 해요.",
      "야식을 통해 효율적인 경험을 하고, 실용적인 지식을 얻는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "실용적 관리", "효율적"],
    picks: ["균형 잡힌 야식", "신중한 결정", "정보 공유"],
    tips: ["즉흥적 선택", "새로운 종류", "혼자 즐기기"],
    match: "INFP, ISFP",
    emoji: "📊",
  },
  ISFP: {
    label: "감성적 야식 예술가",
    summary: "즉흥적으로 야식을 선택하며 감성적인 경험을 추구하는 타입",
    description: [
      "즉흥적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 새로운 종류를 시도해요. 즉흥적으로 선택하며 감성적인 경험과 아름다움을 추구해요.",
      "즉시 선택하고, 자주 변경하며, 혼자 조용히 야식을 즐겨요. 감각과 직감으로 선택하고, 그때그때 새로운 종류를 시도하는 유연한 스타일이에요.",
      "야식을 통해 감성적인 경험을 하고, 아름다움을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 선택", "감성적 경험", "아름다움 추구"],
    picks: ["독특한 야식", "자유로운 결정", "혼자 즐기기"],
    tips: ["대중적인 야식", "계획적 선택", "함께 즐기기"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "세심한 야식 보호자",
    summary: "계획적으로 야식을 선택하며 세심한 배려를 하는 타입",
    description: [
      "계획적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 익숙한 종류를 선호해요. 계획적으로 선택하며 세심한 배려와 안정성을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 혼자 조용히 야식을 즐겨요. 감각과 직감으로 선택하고, 미리 준비하는 체계적인 스타일로, 세심한 배려를 해요.",
      "야식을 통해 안정적인 경험을 하고, 소중한 사람들을 보호하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "세심한 배려", "안정성 추구"],
    picks: ["균형 잡힌 야식", "신중한 결정", "혼자 즐기기"],
    tips: ["즉흥적 선택", "새로운 종류", "함께 즐기기"],
    match: "ENTP, ESTP",
    emoji: "🛡️",
  },
  ISTP: {
    label: "분석적 야식 장인",
    summary: "즉흥적으로 야식을 선택하며 실용적인 해결책을 찾는 타입",
    description: [
      "즉흥적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 새로운 종류를 시도해요. 즉흥적으로 선택하며 실용적인 해결책과 효율을 중시해요.",
      "즉시 선택하고, 자주 변경하며, 혼자 조용히 야식을 즐겨요. 논리와 정보로 선택하고, 그때그때 새로운 종류를 시도하는 효율적인 스타일이에요.",
      "야식을 통해 실용적인 해결책을 찾고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "실용적 해결", "효율 추구"],
    picks: ["새로운 종류", "빠른 분석", "정보 탐색"],
    tips: ["익숙한 종류", "느린 분석", "함께 즐기기"],
    match: "ENFJ, ESFJ",
    emoji: "🛠️",
  },
  ISTJ: {
    label: "원칙주의 야식 감별사",
    summary: "계획적으로 야식을 선택하며 원칙에 따라 감별하는 타입",
    description: [
      "계획적으로 야식을 선택하는 당신! 가끔 야식을 섭취하고, 익숙한 종류를 선호해요. 계획적으로 선택하며 원칙과 정확성을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 혼자 조용히 야식을 즐겨요. 논리와 정보로 선택하고, 미리 준비하는 체계적인 스타일로, 원칙에 따라 감별해요.",
      "야식을 통해 정확한 정보를 얻고, 원칙적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 분석", "원칙 준수", "정확성 추구"],
    picks: ["균형 잡힌 야식", "신중한 분석", "효율적 감별"],
    tips: ["즉흥적 선택", "새로운 종류", "함께 즐기기"],
    match: "ENFP, ESFP",
    emoji: "📜",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const resultId = searchParams.get("id")
  const resultType = searchParams.get("type")

  useEffect(() => {
    const fetchResult = async () => {
      if (resultId) {
        try {
          const data = await getTestResult(resultId)
          setResult(data)
        } catch (err) {
          console.error("Failed to fetch test result:", err)
          setError("결과를 불러오지 못했습니다.")
        } finally {
          setLoading(false)
        }
      } else if (resultType) {
        setResult({ resultType })
        setLoading(false)
      } else {
        setError("결과 ID 또는 유형이 없습니다.")
        setLoading(false)
      }
    }
    fetchResult()
  }, [resultId, resultType])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">결과를 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 text-center">
        <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <h1 className="text-3xl font-bold text-red-600 mb-4">오류 발생</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{error}</p>
            <Link href="/tests/midnight-snack">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg px-8 py-4">
                테스트 다시 하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 text-center">
        <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">결과를 찾을 수 없습니다.</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              유효하지 않은 결과 ID이거나 결과가 만료되었습니다.
            </p>
            <Link href="/tests/midnight-snack">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg px-8 py-4">
                테스트 다시 하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const mbtiType = result.resultType as keyof typeof midnightSnackTypes
  const resultData = midnightSnackTypes[mbtiType]

  if (!resultData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 text-center">
        <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <h1 className="text-3xl font-bold text-red-600 mb-4">결과 유형 오류</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              일치하는 MBTI 결과 유형을 찾을 수 없습니다: {mbtiType}
            </p>
            <Link href="/tests/midnight-snack">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg px-8 py-4">
                테스트 다시 하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const shareTitle = `🌙 나의 야식 선호도 유형은 ${resultData.emoji} ${resultData.label}!`
  const shareDescription = resultData.summary

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center py-12 px-4">
      <Card className="w-full max-w-3xl shadow-2xl rounded-xl p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0 text-center">
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm mb-4">
            나의 야식 선호도 유형은?
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {resultData.emoji} {resultData.label}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">{resultData.summary}</p>

          <div className="space-y-6 text-left mb-8">
            <div className="bg-indigo-50 dark:bg-gray-700 p-5 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center">
                <FileText className="w-6 h-6 mr-2" /> 상세 설명
              </h2>
              {resultData.description.map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-purple-50 dark:bg-gray-700 p-5 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center">
                <Sparkles className="w-6 h-6 mr-2" /> 주요 특징
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {resultData.traits.map((trait, index) => (
                  <li key={index}>{trait}</li>
                ))}
              </ul>
            </div>

            <div className="bg-pink-50 dark:bg-gray-700 p-5 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-pink-700 dark:text-pink-300 mb-3 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" /> 이런 야식을 선호해요
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {resultData.picks.map((pick, index) => (
                  <li key={index}>{pick}</li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-100 dark:bg-gray-700 p-5 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-3 flex items-center">
                <RotateCcw className="w-6 h-6 mr-2" /> 이런 점을 시도해보세요
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {resultData.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-100 dark:bg-gray-700 p-5 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center">
                <Heart className="w-6 h-6 mr-2" /> 잘 맞는 야식 유형
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{resultData.match}</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">결과 공유하기</h2>
            <ShareButtons
              testId="midnight-snack"
              testPath="/tests/midnight-snack/test/result"
              resultType={mbtiType}
              resultId={resultId || undefined}
              title={shareTitle}
              description={shareDescription}
            />
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-center gap-4">
            <Link href="/tests/midnight-snack">
              <Button
                variant="outline"
                className="w-full md:w-auto text-lg px-8 py-4 border-indigo-500 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-700"
              >
                <RotateCcw className="w-5 h-5 mr-2" /> 다시 테스트하기
              </Button>
            </Link>
            <Link href="/tests">
              <Button
                className="w-full md:w-auto text-lg px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                <Users className="w-5 h-5 mr-2" /> 다른 테스트 보러가기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MidnightSnackResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">결과를 불러오는 중...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}

