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

const cstoreTypes = {
  ENFP: {
    label: "발견형 탐험가",
    summary: "즉흥과 재미로 신상을 개척",
    traits: ["신제품 선호", "공유 활발", "현장 제안"],
    tips: ["예산 상한 설정", "필수품 우선 담기", "장바구니 검수 10초"],
    match: "ISTJ, ISFJ",
    emoji: "🔍",
  },
  INFP: {
    label: "감성형 선택가",
    summary: "분위기와 취향 일치가 우선",
    traits: ["라벨 스토리 중시", "혼자 시간 선호", "소소한 만족"],
    tips: ["리스트 미리 작성", "시간 제한 정하기", "후기 1개만 확인"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "케어형 큐레이터",
    summary: "함께 먹을 사람을 먼저 생각",
    traits: ["추천·분배 능숙", "대화 리드", "분위기 조성"],
    tips: ["결정 시점 고정", "취향 조사 간단 폼", "예외 처리 문구"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "맥락형 설계자",
    summary: "의미와 일관성을 챙기는 쇼핑",
    traits: ["브랜드 철학 고려", "중복 구매 최소", "기록 습관"],
    tips: ["한줄 결론 먼저", "즉흥 슬롯 허용", "소요시간 알림"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험형 조합가",
    summary: "조합·리믹스로 새로움 추구",
    traits: ["행사 묶음 최적화", "비교 빠름", "후기 제작"],
    tips: ["결정권 명확화", "카테고리 한도", "최종 요약 카드"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석형 합리가",
    summary: "데이터와 가성비로 선택",
    traits: ["단가·성분 비교", "충동 억제", "간결 결론"],
    tips: ["감정 한줄 추가", "탐색 시간 제한", "감사 표현"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "오더형 매니저",
    summary: "목표 품목을 정확히 완수",
    traits: ["리스트 기반", "역할 분담", "시간 효율"],
    tips: ["유연성 10% 배정", "동행 의견 수렴", "리워드 설정"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략형 계획가",
    summary: "동선·예산·행사 최적화",
    traits: ["루틴 고정", "리마인드", "로그 관리"],
    tips: ["즉흥 신상 1개 허용", "감성 피드백", "정기 점검"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "케어형 조정가",
    summary: "함께의 만족을 설계",
    traits: ["공지형 소통", "할인 공유", "평탄화"],
    tips: ["결정권자 지정", "스레드 분리", "요약 카드"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "따뜻한 기록가",
    summary: "히스토리 기반의 안정 선택",
    traits: ["재구매 강점", "세심한 배려", "사전 확인"],
    tips: ["지연 알림", "사과 과잉 축소", "요청 명확화"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "라이브 메이커",
    summary: "현장감과 속도를 중시",
    traits: ["짧은 호응", "시식·체험", "즉흥 합류"],
    tips: ["핵심 우선 담기", "예산·시간 표기", "업무·사적 분리"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "감성 미니멀",
    summary: "부드럽고 단정한 취향",
    traits: ["톤 온화", "선택적 공유", "휴식 중요"],
    tips: ["배경 한줄", "대안 1개", "읽음 대체문구"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "프로세스 매니저",
    summary: "룰과 체크로 혼선 최소화",
    traits: ["요청 포맷", "마감 우선", "책임 명확"],
    tips: ["감정 한줄", "피드백 타임", "예외 처리"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 수호자",
    summary: "일관된 규칙과 시간 관리",
    traits: ["응답 규칙", "기록 집착", "오해 최소"],
    tips: ["즉흥 슬롯 허용", "감사 표현", "완벽주의 완화"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 해결사",
    summary: "빠른 판단과 실행",
    traits: ["행동 중심", "통보형 결정", "후속 피드백"],
    tips: ["근거 한줄", "합의 로그", "부드러운 마감"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 셰이퍼",
    summary: "필요한 정보만 남기는 효율",
    traits: ["체크리스트", "질문 선호", "감정 최소"],
    tips: ["컨텍스트 보강", "기한 표기", "상대 톤 매칭"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof cstoreTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = cstoreTypes[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  // 결과 ID가 있으면 결과 정보 로드
  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((result) => {
          setLoadedResult({ id: result.id, testId: result.testId })
        })
        .catch((error) => {
          void error
        })
    }
  }, [resultId])

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      {/* Main Result */}
      <main className="container max-w-[720px] mx-auto px-4 py-8">
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="cstore-routine"
                  testPath="/tests/cstore-routine/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🏪 ${character.label}(${mbtiType})! 너는 어떤 편의점러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/cstore-routine/test">
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
                  className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg"
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
                  <span className="text-blue-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-cyan-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "shopping-style",
                  title: "소비 성향",
                  emoji: "🛍️",
                  description: "소비 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "food-delivery",
                  title: "배달 음식 선택",
                  emoji: "🍕",
                  description: "배달 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "dessert-style",
                  title: "디저트 취향",
                  emoji: "🍰",
                  description: "디저트 선택으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "evening-routine",
                  title: "퇴근 후 루틴",
                  emoji: "🌙",
                  description: "저녁 루틴으로 알아보는 성격",
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
              className="border-2 border-blue-300 hover:bg-blue-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function CstoreRoutineResult() {
  return (
    <Suspense fallback={<div>결과를 불러오는 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}

