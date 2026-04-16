"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { trackTestComplete, trackShare } from "@/lib/analytics"

const results = {
  "1.0": {
    level: "1.0",
    title: "테니스 입문자",
    description: "테니스를 이제 막 시작한 단계",
    characteristics: [
      "기본적인 그립과 스탠스를 배우는 중",
      "공을 라켓에 맞추는 것이 주요 목표",
      "서브와 기본 스트로크 연습 필요",
      "규칙과 스코어링 시스템 학습 중",
    ],
    recommendations: [
      "기본기 연습에 집중하세요",
      "전문 코치의 지도를 받는 것을 추천",
      "벽치기 연습으로 공 감각 기르기",
      "테니스 규칙과 에티켓 학습",
    ],
    nextLevel: "꾸준한 연습으로 2.0 레벨 도전!",
    color: "bg-red-100 text-red-800",
  },
  "2.0": {
    level: "2.0",
    title: "초보 플레이어",
    description: "기본적인 스트로크를 구사할 수 있는 단계",
    characteristics: [
      "포핸드와 백핸드 기본 동작 가능",
      "느린 공은 어느 정도 리턴 가능",
      "서브를 넣을 수 있지만 일정하지 않음",
      "짧은 랠리가 가능한 수준",
    ],
    recommendations: [
      "일관된 스트로크 연습",
      "발놀림과 포지셔닝 개선",
      "서브 정확도 향상 연습",
      "더 많은 실전 경험 쌓기",
    ],
    nextLevel: "안정적인 기본기로 2.5 레벨 도전!",
    color: "bg-orange-100 text-orange-800",
  },
  "2.5": {
    level: "2.5",
    title: "발전하는 초급자",
    description: "기본 스트로크가 안정화되기 시작하는 단계",
    characteristics: [
      "포핸드와 백핸드가 어느 정도 안정적",
      "중간 속도의 공도 처리 가능",
      "서브가 일정한 방향으로 들어감",
      "네트 플레이 시도 가능",
    ],
    recommendations: ["스핀과 슬라이스 기술 연습", "코트 커버리지 향상", "전략적 사고 개발", "다양한 상대와 경기 경험"],
    nextLevel: "전술적 이해로 3.0 레벨 도전!",
    color: "bg-yellow-100 text-yellow-800",
  },
  "3.0": {
    level: "3.0",
    title: "초급 플레이어",
    description: "기본기가 탄탄하고 전술을 이해하기 시작하는 단계",
    characteristics: [
      "안정적인 포핸드와 백핸드",
      "적당한 파워와 컨트롤 보유",
      "서브에 어느 정도 스핀 구사",
      "기본적인 전술 이해",
    ],
    recommendations: ["공격과 수비의 균형 연습", "다양한 샷 레퍼토리 확장", "멘탈 게임 강화", "토너먼트 참가 고려"],
    nextLevel: "일관성 향상으로 3.5 레벨 도전!",
    color: "bg-lime-100 text-lime-800",
  },
  "3.5": {
    level: "3.5",
    title: "중급 입문자",
    description: "일관성 있는 플레이와 전술적 사고가 가능한 단계",
    characteristics: [
      "대부분의 샷을 일관성 있게 구사",
      "상황에 따른 샷 선택 가능",
      "네트 플레이와 로브 활용",
      "경기 운영 능력 보유",
    ],
    recommendations: [
      "고급 기술 습득 (드롭샷, 패싱샷)",
      "체력과 지구력 향상",
      "다양한 플레이 스타일 경험",
      "정기적인 경기 참여",
    ],
    nextLevel: "기술 다양성으로 4.0 레벨 도전!",
    color: "bg-green-100 text-green-800",
  },
  "4.0": {
    level: "4.0",
    title: "중급 플레이어",
    description: "다양한 기술과 전략을 구사할 수 있는 단계",
    characteristics: [
      "모든 기본 샷을 안정적으로 구사",
      "상황에 맞는 전략적 플레이",
      "강력한 서브와 리턴",
      "압박 상황에서도 안정적인 플레이",
    ],
    recommendations: [
      "고급 전술과 패턴 플레이 학습",
      "멘탈 강화와 집중력 향상",
      "특화된 기술 개발",
      "상급자와의 경기 경험",
    ],
    nextLevel: "전문성 강화로 4.5 레벨 도전!",
    color: "bg-blue-100 text-blue-800",
  },
  "4.5": {
    level: "4.5",
    title: "상급 플레이어",
    description: "높은 수준의 기술과 전략을 구사하는 단계",
    characteristics: [
      "모든 샷을 파워와 정확성으로 구사",
      "복잡한 전략과 패턴 플레이",
      "뛰어난 코트 커버리지",
      "경기 상황 판단력 우수",
    ],
    recommendations: [
      "전문적인 코칭 받기",
      "고급 토너먼트 참가",
      "약점 보완과 강점 극대화",
      "주니어나 초급자 지도 경험",
    ],
    nextLevel: "완벽함을 추구하며 5.0 레벨 도전!",
    color: "bg-indigo-100 text-indigo-800",
  },
  "5.0": {
    level: "5.0",
    title: "전문 플레이어",
    description: "거의 모든 기술을 완벽하게 구사하는 단계",
    characteristics: [
      "모든 샷을 완벽하게 컨트롤",
      "고도의 전략적 사고",
      "뛰어난 체력과 정신력",
      "경기 주도권 장악 능력",
    ],
    recommendations: ["프로 수준의 훈련", "전국 단위 대회 참가", "스폰서십 기회 모색", "테니스 지도자 자격 취득"],
    nextLevel: "프로 테니스 선수의 길!",
    color: "bg-purple-100 text-purple-800",
  },
}

export default function NTRPTestResult() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const level = searchParams.get("level") || "2.0"
  const result = results[level as keyof typeof results] || results["2.0"]

  useEffect(() => {
    setMounted(true)
    trackTestComplete("ntrp-test", level)
  }, [level])

  const handleShare = async (platform: string) => {
    const text = `나의 NTRP 테니스 레벨은 ${result.level} - ${result.title}! 당신도 테스트해보세요!`
    const url = "https://temon.vercel.app/ntrp-test"

    trackShare("ntrp-test", platform)

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    } else if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`)
        alert("링크가 복사되었습니다!")
      } catch (err) {
        console.error("복사 실패:", err)
      }
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎾</div>
            <Badge className={`text-lg px-4 py-2 mb-4 ${result.color}`}>NTRP {result.level}</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{result.title}</h1>
            <p className="text-xl text-gray-600">{result.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 주요 특징</h2>
              <ul className="space-y-3">
                {result.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-gray-700">{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 개선 방향</h2>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 다음 목표</h2>
            <p className="text-lg text-gray-700 bg-green-50 p-4 rounded-lg">{result.nextLevel}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📤 결과 공유하기</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => handleShare("twitter")} className="bg-blue-500 hover:bg-blue-600">
                트위터 공유
              </Button>
              <Button onClick={() => handleShare("facebook")} className="bg-blue-700 hover:bg-blue-800">
                페이스북 공유
              </Button>
              <Button onClick={() => handleShare("copy")} variant="outline">
                링크 복사
              </Button>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button onClick={() => router.push("/ntrp-test")} size="lg" variant="outline" className="mr-4">
              다시 테스트하기
            </Button>
            <Button onClick={() => router.push("/tests")} size="lg" className="bg-green-600 hover:bg-green-700">
              다른 테스트 해보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
