"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Store, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const convenienceTypes = {
  ENFP: {
    label: "즉흥 큐레이터",
    summary: "신상품과 한정 조합을 발견하고 공유하는 편",
    traits: ["다채로운 조합", "행사 활용", "친구 추천"],
    tips: ["예산 상한 먼저 설정", "핵심 고정템 1개 유지", "야식 시간엔 수량 제한"],
    match: "ISFJ와 조화, ISTJ와는 기준 합의 필요",
    emoji: "🔍",
  },
  INFP: {
    label: "감성 미식가",
    summary: "분위기·기억이 선택에 큰 영향",
    traits: ["혼방문 선호", "감상 중심", "한정에 약함"],
    tips: ["마감 시간 설정", "반반 전략으로 리스크 분산", "재구매 기준 한 줄 정리"],
    match: "ENFJ와 상보, ESTJ와는 체크리스트 공유",
    emoji: "🌙",
  },
  ENFJ: {
    label: "케어 리더",
    summary: "함께 갈 때 모두의 취향을 맞추는 조정자",
    traits: ["투표·정리", "공평 분배", "피드백 수집"],
    tips: ["본인 취향 1개 고정", "예산·수량 공지", "선호 조사 폼 활용"],
    match: "INTP와 상보, ISTP와는 역할 분담 명확히",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 큐레이터",
    summary: "브랜드 히스토리와 품질 일관성을 중시",
    traits: ["사전 조사", "루틴 충성", "리스크 관리"],
    tips: ["즉흥 제안 슬롯 1개 허용", "결정 지연 타임박스", "후기 기록 습관"],
    match: "ENFP와 시너지, ESTP와는 마감 합의",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 조합러",
    summary: "소스·음료·간식의 새로운 조합을 테스트",
    traits: ["동시 비교", "유연한 기준", "후기 데이터화"],
    tips: ["한 번에 2종까지만", "결론 문장 고정", "비용 상한 표시"],
    match: "ISFJ와 밸런스, ISTJ와는 기준 확정",
    emoji: "🧪",
  },
  INTP: {
    label: "분석 테이스터",
    summary: "중량·가격·칼로리·만족도를 수치화",
    traits: ["링크·스샷 저장", "재구매 기준 명확", "개선 제안"],
    tips: ["감사 문장 추가", "현장 변수 반영", "결론부터 말하기"],
    match: "ENFJ와 상보, ESFJ와는 톤 조율",
    emoji: "🔬",
  },
  ENTJ: {
    label: "드라이브 결정가",
    summary: "빠른 합의와 역할 배분으로 효율 최적화",
    traits: ["시간·예산 통제", "담당 지정", "불필요 반복 제거"],
    tips: ["공감 문장 확보", "실험 슬롯 1개 열기", "대기 기준 명시"],
    match: "ISFP와 보완, INFP와는 합의 프레임 제시",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 큐레이터",
    summary: "품질·동선·보관의 최적화를 설계",
    traits: ["브랜드 화이트리스트", "리스크 최소", "평가 로그"],
    tips: ["즉흥 수용 창구 1개", "변수 체크리스트", "리뷰 아카이브 공유"],
    match: "ESFP와 균형, ENFP와는 역할 분담",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 메이커",
    summary: "함께 고르고 나누는 즐거움에 강점",
    traits: ["단체 조율", "사진 기록", "공정 분배"],
    tips: ["요청·기한·담당 표기", "결정 로그 남기기", "예산 상한 합의"],
    match: "INTP와 상보, ISTP와는 형식 합의",
    emoji: "😊",
  },
  ISFJ: {
    label: "세심한 기록가",
    summary: "브랜드별 반응과 특징을 꼼꼼히 기록",
    traits: ["안정 선호", "재구매 강점", "배려 깊음"],
    tips: ["변경 즉시 공유", "신상 반쪽 시도", "핵심 기준 굵게 표기"],
    match: "ENTP와 보완, ENFP와는 리듬 조정",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 감각러",
    summary: "현장 분위기와 즉각 만족을 중시",
    traits: ["빠른 반응", "재미화", "기록 최소"],
    tips: ["결론 문장 고정", "리스크 한 줄 표기", "과소비 방지 한도 설정"],
    match: "INTJ와 균형, ISTJ와는 규칙 합의",
    emoji: "🎉",
  },
  ISFP: {
    label: "미니멀 테이스터",
    summary: "조용히 맛과 조합에 집중",
    traits: ["단문 피드백", "숙고형 선택", "정서 고려"],
    tips: ["요점 첫 문장", "지연 시 사전 알림", "대안 1개 준비"],
    match: "ENTJ와 보완, ESTJ와는 형식 맞춤",
    emoji: "🌿",
  },
  ESTJ: {
    label: "프로세스 운영자",
    summary: "목록화·정리·분배를 깔끔하게 처리",
    traits: ["규칙 선호", "담당 배정", "명확 요약"],
    tips: ["톤 완화 문장", "예외 처리안 제시", "의견 수렴 타임 확보"],
    match: "INFP와 상보, ENFP와는 룰 명시",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 수호자",
    summary: "항상 같은 조합과 포맷을 선호",
    traits: ["응답 일정", "템플릿 재사용", "예외에 약함"],
    tips: ["변경 이유 한 줄", "예외 시나리오 합의", "감사 표현 추가"],
    match: "ENFP와 보완, ESFP와는 규칙 공유",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 실행가",
    summary: "보이는 대로 고르고 움직인다",
    traits: ["짧고 명료", "결정 후 피드백", "세부는 나중"],
    tips: ["리스크·대안 1줄", "합의 로그 남기기", "세부는 문서 링크"],
    match: "INFJ와 상보, INTP와는 근거 링크 확보",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 솔루션러",
    summary: "필요한 말만 남기고 효율적으로 처리",
    traits: ["문의형 반응", "스크린샷 선호", "감정 표현 최소"],
    tips: ["배경 한 줄", "기한 표기", "상대 톤 맞춤"],
    match: "ESFJ와 보완, ENFJ와는 요청 형식 합의",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof convenienceTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = convenienceTypes[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  // 결과 ID가 있으면 결과 정보 로드
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
                  className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="convenience-snack"
                  testPath="/tests/convenience-snack/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🏪 ${character.label}(${mbtiType})! 너는 어떤 편의점러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/convenience-snack/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🏪</span>
              <span>당신의 루틴 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg"
                >
                  <p className="font-medium text-center">{trait}</p>
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
              <span>추천 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">{index + 1}.</span>
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
              <span>잘 맞는 상대 / 주의 상대</span>
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
              <Sparkles className="h-6 w-6 text-emerald-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  slug: "dessert-style",
                  title: "디저트 취향",
                  emoji: "🍰",
                  description: "디저트 선택으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "cafe-style",
                  title: "카페 스타일",
                  emoji: "☕",
                  description: "카페 취향으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "food-delivery",
                  title: "배달 음식",
                  emoji: "🍕",
                  description: "배달 습관으로 알아보는 성격",
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
              className="border-2 border-green-300 hover:bg-green-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function ConvenienceSnackResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

