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

const cvsTypes = {
  ENFP: {
    label: "신상 탐험가",
    summary: "새 조합을 즐기고 주변에 전파한다",
    traits: ["신규 선호", "즉흥 선택", "공유 활발"],
    tips: ["예산 상한 설정", "실험은 2개 이하", "재구매 기준 한 줄 기록"],
    match: "ISFJ와 균형, ISTJ와는 기준 합의",
    emoji: "🔍",
  },
  INFP: {
    label: "감성 테이스터",
    summary: "그날의 감정에 맞춘 간식 위로",
    traits: ["혼자 즐김", "스토리 중시", "한정판 선호"],
    tips: ["시간 타이머", "당 섭취 가이드", "소포장 우선"],
    match: "ENFJ와 상보, ESTJ와는 규칙 공유",
    emoji: "🌙",
  },
  ENFJ: {
    label: "케어 셀렉터",
    summary: "함께 먹는 상황에 최적화해 고른다",
    traits: ["취향 수집", "공평 분배", "추천 주도"],
    tips: ["본인 픽 1개 고정", "예산·알레르기 공지", "의견 마감 시간"],
    match: "INTP와 상보, ISTP와는 역할 분담",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 큐레이터",
    summary: "브랜드 철학과 일관된 품질을 찾는다",
    traits: ["사전 조사", "루틴 유지", "리스크 관리"],
    tips: ["즉흥 슬롯 1개", "후기 간단 기록", "변경 사유 공유"],
    match: "ENFP와 시너지, ESTP와는 시간 합의",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 조합가",
    summary: "소스·음료·스낵을 자유롭게 믹스",
    traits: ["비교 시식", "유연 기준", "후기 공유"],
    tips: ["동시 실험 2개 제한", "비용 상한", "피드백 형식화"],
    match: "ISFJ와 보완, ISTJ와는 기준 확정",
    emoji: "🧪",
  },
  INTP: {
    label: "분석 설계자",
    summary: "성분·단가·열량을 수치로 비교",
    traits: ["표준화", "재구매 로직", "개선 제안"],
    tips: ["결론 먼저 말하기", "현장 변수 반영", "톤 부드럽게"],
    match: "ENFJ와 상보, ESFJ와는 톤 조율",
    emoji: "🔬",
  },
  ENTJ: {
    label: "드라이브 운영자",
    summary: "시간·동선·예산 최적화로 신속 결정",
    traits: ["담당 배정", "대기 컷라인", "불필요 절차 최소"],
    tips: ["공감 문장 추가", "실험 슬롯 1개", "합의 로그"],
    match: "ISFP와 보완, INFP와는 프레임 제시",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 큐레이터",
    summary: "화이트리스트로 품질을 관리",
    traits: ["리스트 관리", "리스크 최소", "리뷰 아카이브"],
    tips: ["즉흥 제안 접수", "예외 시나리오", "주기 업데이트"],
    match: "ESFP와 균형, ENFP와는 역할 분담",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 메이커",
    summary: "함께 즐기고 기록해 추억을 만든다",
    traits: ["사진 기록", "공정 분배", "초대 주도"],
    tips: ["요청·기한·담당 표기", "예산 합의", "결정 로그"],
    match: "INTP와 상보, ISTP와는 형식 합의",
    emoji: "😊",
  },
  ISFJ: {
    label: "세심한 기록가",
    summary: "취향과 반응을 기억해 안정 선택",
    traits: ["안정 선호", "재구매 강점", "배려 깊음"],
    tips: ["신규는 반반 전략", "변경 즉시 공유", "핵심 기준 굵게"],
    match: "ENTP와 보완, ENFP와는 리듬 조정",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 감각러",
    summary: "현장 분위기와 즉각 만족 최우선",
    traits: ["빠른 반응", "재미화", "기록 최소"],
    tips: ["리스크 한 줄", "한도 설정", "과소비 방지"],
    match: "INTJ와 균형, ISTJ와는 규칙 합의",
    emoji: "🎉",
  },
  ISFP: {
    label: "미니멀 미식가",
    summary: "조용히 맛과 식감에 집중",
    traits: ["단문 피드백", "숙고형 선택", "정서 고려"],
    tips: ["요점 먼저", "지연 시 알림", "대안 1개 준비"],
    match: "ENTJ와 보완, ESTJ와는 형식 맞춤",
    emoji: "🌿",
  },
  ESTJ: {
    label: "프로세스 매니저",
    summary: "목록화·정리·분배를 깔끔히 처리",
    traits: ["규칙 선호", "담당 배정", "명확 요약"],
    tips: ["예외 처리안", "톤 완화", "의견 수렴 타임"],
    match: "INFP와 상보, ENFP와는 룰 명시",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 수호자",
    summary: "항상 같은 루틴과 포맷을 선호",
    traits: ["응답 일정", "템플릿 재사용", "예외에 약함"],
    tips: ["변경 이유 기록", "예외 합의", "감사 표현"],
    match: "ENFP와 보완, ESFP와는 규칙 공유",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 셀렉터",
    summary: "보이는 대로 고르고 빠르게 이동",
    traits: ["짧고 명료", "결정 후 피드백", "세부는 나중"],
    tips: ["리스크·대안 1줄", "합의 로그", "세부는 문서 링크"],
    match: "INFJ와 상보, INTP와는 근거 링크",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 솔루션러",
    summary: "필요한 말만 남기고 효율 선택",
    traits: ["문의형 반응", "스크린샷 선호", "감정 표현 최소"],
    tips: ["배경 한 줄", "기한 표기", "상대 톤 맞춤"],
    match: "ESFJ와 보완, ENFJ와는 요청 형식 합의",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof cvsTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = cvsTypes[mbtiType]
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
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        {/* Character Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="cvs-snack-routine"
                  testPath="/tests/cvs-snack-routine/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🏪 ${character.label}(${mbtiType})! 너는 어떤 간식러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/cvs-snack-routine/test">
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
              <span>당신의 선택 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg"
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
                  <span className="text-purple-500 font-bold">{index + 1}.</span>
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
              <span>어울리는 파트너</span>
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
                  slug: "lunch-decider",
                  title: "회사 점심 뭐 먹지",
                  emoji: "🍱",
                  description: "점심 선택으로 알아보는 성격",
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
                  slug: "dessert-style",
                  title: "디저트 취향",
                  emoji: "🍰",
                  description: "디저트 선택으로 알아보는 성격",
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
              className="border-2 border-purple-300 hover:bg-purple-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function CvsSnackRoutineResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

