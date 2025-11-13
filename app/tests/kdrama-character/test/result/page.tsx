"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Clapperboard, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const kdramaTypes = {
  ENFP: {
    label: "직진 로맨티스트",
    summary: "상대의 마음을 흔드는 추진력과 즉흥성",
    traits: ["분위기 메이커", "새길 개척", "감정표현 솔직"],
    recommend: ["청춘 로맨스", "성장물"],
    chemistry: "ISTJ, INTJ",
    emoji: "⚡",
  },
  INFP: {
    label: "따뜻한 힐러",
    summary: "상처를 알아보고 회복을 돕는 감수성",
    traits: ["공감 깊음", "관계의 진정성", "선의의 끈기"],
    recommend: ["휴먼 드라마", "힐링 로맨스"],
    chemistry: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "관계 조율자",
    summary: "사람을 묶어 결말로 이끄는 힘",
    traits: ["조정·중재", "팀케어", "상황 리딩"],
    recommend: ["직장 군상극", "스포츠 팀물"],
    chemistry: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "운명 설계자",
    summary: "큰 그림과 상징을 읽는 통찰",
    traits: ["장기 플랜", "차분한 리더십", "서사적 직관"],
    recommend: ["판타지 서사", "미스터리 성장물"],
    chemistry: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "규칙 파괴자",
    summary: "틀을 깨며 사건을 전진시키는 두뇌전",
    traits: ["재치있는 논쟁", "전환 속도", "아이디어 스파크"],
    recommend: ["범죄 수사", "코믹 미스터리"],
    chemistry: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "논리 탐정",
    summary: "정교한 추론과 구조화의 귀재",
    traits: ["팩트 조립", "냉정한 판단", "메모·아카이브"],
    recommend: ["추리물", "법정극"],
    chemistry: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 지휘관",
    summary: "목표를 향해 팀을 배치하는 카리스마",
    traits: ["결단력", "책임감", "자원 운영"],
    recommend: ["기업·정치극", "복수 서사"],
    chemistry: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "냉철한 설계자",
    summary: "완성도를 향한 고독한 집중",
    traits: ["계획 수립", "리스크 통제", "간결한 실행"],
    recommend: ["첩보·두뇌전", "SF 스릴러"],
    chemistry: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "동네 대표",
    summary: "현장을 따뜻하게 묶는 핵심 인물",
    traits: ["세심한 배려", "조직화", "피드백 순환"],
    recommend: ["가족 드라마", "학교물"],
    chemistry: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "성실한 수호자",
    summary: "꾸준함으로 신뢰를 쌓는 인내형 주인공",
    traits: ["약속 준수", "디테일 관리", "조용한 헌신"],
    recommend: ["의학·법정", "실화 기반"],
    chemistry: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 엔진",
    summary: "순간을 살리는 재치와 액션",
    traits: ["상황 호응", "관계 몰입", "감각적 매력"],
    recommend: ["로코", "버디 액션"],
    chemistry: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "섬세한 예술가",
    summary: "말보다 장면으로 말하는 감성",
    traits: ["미니멀 대사", "따뜻한 시선", "자연스러운 변화"],
    recommend: ["아트하우스", "힐링 로맨스"],
    chemistry: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "원칙 운영자",
    summary: "질서·규칙으로 사건을 관리",
    traits: ["시간 엄수", "정산·정리", "현실 판단"],
    recommend: ["경찰·조직물", "재난 대응극"],
    chemistry: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 관리자",
    summary: "한결같음으로 팀 버팀목",
    traits: ["검증·기록", "책임감", "절제된 판단"],
    recommend: ["공무·사법극", "역사 실화"],
    chemistry: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "액션 해결사",
    summary: "즉각 판단과 현장 대처",
    traits: ["직감 실행", "대담한 결단", "트렌드 감각"],
    recommend: ["범죄 액션", "스릴러"],
    chemistry: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "고독한 문제해결자",
    summary: "핵심만 짚어 조용히 해결",
    traits: ["간결한 소통", "기술·도구 활용", "자율 존중"],
    recommend: ["공학 스릴러", "서스펜스"],
    chemistry: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof kdramaTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = kdramaTypes[mbtiType]
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
                  className="mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="kdrama-character"
                  testPath="/tests/kdrama-character/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🎬 ${character.label}(${mbtiType})! 너는 어떤 드라마 캐릭터야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/kdrama-character/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clapperboard className="h-6 w-6 text-pink-500" />
              <span>특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {character.traits.map((trait, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-1">
                    {index + 1}
                  </Badge>
                  <p className="text-lg flex-1">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Genre Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <span>추천 서사·장르</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {character.recommend.map((genre, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 rounded-lg text-center"
                >
                  <div className="text-2xl mb-2">🎬</div>
                  <p className="font-medium">{genre}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chemistry Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clapperboard className="h-6 w-6 text-pink-500" />
              <span>케미가 좋은 상대 유형</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-center">{character.chemistry}</p>
          </CardContent>
        </Card>

        {/* Related Tests */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>다른 테스트도 해보세요</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  slug: "movie-theater-style",
                  title: "영화관 관람 스타일",
                  description: "영화관에서 드러나는 성향",
                  emoji: "🎬",
                  participants: "0",
                },
                {
                  slug: "music-taste",
                  title: "음악 취향 성격",
                  description: "음악 취향으로 보는 성향",
                  emoji: "🎧",
                  participants: "0",
                },
                {
                  slug: "cafe-style",
                  title: "카페 스타일",
                  description: "카페 스타일로 보는 성향",
                  emoji: "☕",
                  participants: "0",
                },
                {
                  slug: "alarm-habit",
                  title: "알람 습관",
                  description: "알람 습관으로 보는 성향",
                  emoji: "⏰",
                  participants: "0",
                },
                {
                  slug: "shopping-style",
                  title: "쇼핑 스타일",
                  description: "쇼핑 스타일로 보는 성향",
                  emoji: "🛍️",
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

        {/* Retry Button */}
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

export default function KdramaCharacterResult() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}

