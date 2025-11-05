"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const musicCharacters = {
  ENFP: {
    name: "감정폭발 플레이리스트러",
    emoji: "🎈",
    summary: "즉흥적 감정선으로 플레이리스트 꾸미는 사람",
    description: [
      "신상 탐색을 즐기고 트렌디한 곡을 선호하는 당신! 감정에 따라 플레이리스트가 바뀌는 즉흥적인 음악 스타일이에요.",
      "친구 추천을 신뢰하며, 새로운 음악을 발견하면 바로 플레이리스트에 추가해요.",
      "즉흥적이고 감성적인 활발한 음악 취향이에요.",
    ],
    recommendedGenre: ["팝", "인디록"],
    recommendedPlaylist: "밤 감성 드라이브",
    recommendedAction: "오늘은 가사 없는 곡으로 감정 정리해보세요.",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "감정선 뮤지션",
    emoji: "🌙",
    summary: "가사 한 줄에도 몰입하는 감성형",
    description: [
      "가사 한 줄에도 깊이 몰입하는 당신! 잔잔한 곡을 좋아하며 음악의 의미를 중시해요.",
      "혼자 음악을 찾아 듣고, 잠들기 전이나 감정 정리 시간에 음악을 즐겨요.",
      "감정을 더 깊게 공감하는 곡을 선택하며, 음악에 완전히 집중하는 스타일이에요.",
    ],
    recommendedGenre: ["인디", "발라드"],
    recommendedPlaylist: "잠들기 전 감성 플레이리스트",
    recommendedAction: "가사 한 줄씩 천천히 읽으며 듣어보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "감성공유 DJ",
    emoji: "🤝",
    summary: "친구와 음악 나누며 분위기를 만드는 사람",
    description: [
      "친구들과 음악을 나누며 분위기를 만드는 당신! 모두가 즐거운 시간을 보낼 수 있도록 배려하는 따뜻한 마음을 가지고 있어요.",
      "콘서트에서도 사람들과 어울리는 것을 즐기며, 음악을 통해 감정을 공유해요.",
      "분위기 리더 역할을 하며, 감정 맞춤형으로 곡을 선곡하는 스타일이에요.",
    ],
    recommendedGenre: ["어쿠스틱", "R&B"],
    recommendedPlaylist: "친구들과 함께",
    recommendedAction: "오늘 듣는 곡을 친구에게 공유해보세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "감정분석 리스너",
    emoji: "📖",
    summary: "음악으로 세상을 해석하는 사람",
    description: [
      "음악으로 세상을 해석하는 당신! 가사를 분석하고 앨범 전체를 해석하며 듣는 스타일이에요.",
      "새로운 아티스트를 알게 되면 전 앨범을 분석해 듣는 꼼꼼함을 가지고 있어요.",
      "음악에 담긴 의미와 감정을 중요하게 생각하며, 음악은 나의 명상시간이에요.",
    ],
    recommendedGenre: ["포크", "뉴에이지"],
    recommendedPlaylist: "명상과 사색",
    recommendedAction: "오늘 듣는 곡의 가사를 한 번 분석해보세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "실험적 믹서",
    emoji: "🧪",
    summary: "새로운 장르와 조합을 즐기는 사람",
    description: [
      "새로운 장르와 조합을 즐기는 당신! 리믹스나 커버곡도 새 버전이 더 좋을 때가 있다고 생각해요.",
      "장르 크로스오버를 좋아하며, 신곡 탐험을 즐기는 실험적인 음악 스타일이에요.",
      "즉흥적으로 플레이리스트에 추가하며, 다양한 음악을 시도하는 것을 좋아해요.",
    ],
    recommendedGenre: ["일렉트로닉", "힙합"],
    recommendedPlaylist: "실험적 믹스",
    recommendedAction: "오늘은 전혀 듣지 않던 장르를 시도해보세요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "사운드 엔지니어",
    emoji: "🔬",
    summary: "사운드 분석과 구조에 흥미",
    description: [
      "사운드 분석과 구조에 흥미를 가진 당신! 헤드폰을 중심으로 음질과 믹싱을 중시해요.",
      "집중력 향상이나 작업용으로 음악을 듣으며, 멀티태스킹 중 배경음악으로 활용해요.",
      "음악의 기술적 측면을 분석하며, 완벽한 사운드를 추구하는 스타일이에요.",
    ],
    recommendedGenre: ["앰비언트", "재즈퓨전"],
    recommendedPlaylist: "집중력 올리는 Lo-Fi",
    recommendedAction: "오늘은 음악의 구조와 믹싱을 분석하며 들어보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "전략적 큐레이터",
    emoji: "🧱",
    summary: "집중과 성취를 위한 음악 관리형",
    description: [
      "집중과 성취를 위한 음악을 관리하는 당신! 루틴 음악을 만들어 생산성을 높이는 전략적인 스타일이에요.",
      "테마별로 체계적으로 플레이리스트를 정리하며, 작업용 음악을 고정적으로 사용해요.",
      "이번 주 플레이리스트 완성! 매일 같은 시간, 같은 음악 루틴을 만들어보세요.",
    ],
    recommendedGenre: ["클래식", "시티팝"],
    recommendedPlaylist: "생산성 향상",
    recommendedAction: "매일 같은 시간, 같은 음악 루틴을 만들어보세요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "플레이리스트 설계자",
    emoji: "📐",
    summary: "완벽한 밸런스형 큐레이션",
    description: [
      "완벽한 밸런스형 큐레이션을 만드는 당신! 정제된 트랙으로 컨셉형 플레이리스트를 만드는 스타일이에요.",
      "전 앨범을 분석해 듣고, 원곡을 선호하는 완벽주의적 성향이에요.",
      "한 끼도 전략적으로. 음악도 하나의 시스템처럼 완벽하게 설계해요.",
    ],
    recommendedGenre: ["클래식", "시네마틱"],
    recommendedPlaylist: "완벽한 밸런스",
    recommendedAction: "매일 같은 시간, 같은 음악 루틴을 만들어보세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFJ: {
    name: "파티 DJ형",
    emoji: "😊",
    summary: "모두가 즐기는 분위기 중시형",
    description: [
      "모두가 즐기는 분위기를 만드는 당신! 단체감을 강조하며 인기곡을 중심으로 선곡해요.",
      "콘서트에서 사람들과 어울리는 것을 즐기며, 친구 추천을 믿고 함께 음악을 즐겨요.",
      "파티 분위기를 만드는 것이 당신의 특기예요.",
    ],
    recommendedGenre: ["댄스", "K-POP"],
    recommendedPlaylist: "파티 타임",
    recommendedAction: "오늘은 친구들과 함께 플레이리스트를 만들어보세요.",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ESFP: {
    name: "하이라이트 셀렉터",
    emoji: "📸",
    summary: "감정과 순간 중심 감각적 리스너",
    description: [
      "감정과 순간을 중심으로 음악을 선택하는 당신! 트렌드에 민감하며, SNS에서 하이라이트되는 곡을 좋아해요.",
      "즉흥적으로 플레이리스트에 추가하며, 감정에 몰입하는 스타일이에요.",
      "오늘 저녁은 인스타용 플레이리스트를 만들어보세요.",
    ],
    recommendedGenre: ["팝댄스", "라틴"],
    recommendedPlaylist: "트렌드 하이라이트",
    recommendedAction: "오늘은 SNS에서 화제인 곡을 들어보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ESTJ: {
    name: "루틴 사운드러",
    emoji: "📋",
    summary: "일정한 패턴의 음악 루틴 유지",
    description: [
      "일정한 패턴의 음악 루틴을 유지하는 당신! 작업용과 출근용 음악을 고정적으로 사용해요.",
      "테마별로 체계적으로 플레이리스트를 정리하며, 원곡을 선호하는 스타일이에요.",
      "매 끼니가 프로젝트다. 음악도 규칙적으로 관리해요.",
    ],
    recommendedGenre: ["시티팝", "재즈"],
    recommendedPlaylist: "출근길 루틴",
    recommendedAction: "오늘은 루틴대로 플레이리스트를 재생해보세요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ESTP: {
    name: "에너지 부스터",
    emoji: "⚡",
    summary: "스피커 ON! 즉시 리듬에 몸이 반응",
    description: [
      "스피커 ON! 즉시 리듬에 몸이 반응하는 당신! 드라이브나 운동용 음악을 중심으로 선곡해요.",
      "이동 중이나 출퇴근길에 음악을 듣으며, 장르 중심으로 멜로디를 즐겨요.",
      "배고프면 바로 주문! 음악도 바로 듣고 싶을 때 바로 재생해요.",
    ],
    recommendedGenre: ["힙합", "EDM"],
    recommendedPlaylist: "에너지 충전",
    recommendedAction: "오늘은 운동하거나 드라이브할 때 이 플레이리스트를 들어보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISFJ: {
    name: "추억 리스너",
    emoji: "🧸",
    summary: "오래된 명곡을 반복 청취",
    description: [
      "오래된 명곡을 반복 청취하는 당신! 익숙한 곡을 좋아하며, 감성 회귀형 음악 스타일이에요.",
      "테마별로 체계적으로 플레이리스트를 정리하며, 원곡을 선호해요.",
      "밥 한 끼라도 소중히. 음악 한 곡도 소중히 들어요.",
    ],
    recommendedGenre: ["발라드", "OST"],
    recommendedPlaylist: "추억의 명곡",
    recommendedAction: "오늘은 오래된 명곡을 다시 들어보세요.",
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ISFP: {
    name: "힐링 사운드러",
    emoji: "🌿",
    summary: "부드럽고 감각적인 음향 선호",
    description: [
      "부드럽고 감각적인 음향을 선호하는 당신! 감정 안정을 위해 잔잔한 곡 위주로 듣는 스타일이에요.",
      "혼자 음악을 찾아 듣고, 감정/상황으로 음악을 표현해요.",
      "요리보다 분위기가 중요해. 음악도 분위기가 중요해요.",
    ],
    recommendedGenre: ["로파이", "어쿠스틱"],
    recommendedPlaylist: "힐링 타임",
    recommendedAction: "오늘은 부드러운 음악으로 감정을 정리해보세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ISTJ: {
    name: "클래식 플레이어",
    emoji: "📦",
    summary: "늘 듣던 트랙, 확실한 취향",
    description: [
      "늘 듣던 트랙을 반복 청취하는 당신! 확실한 취향을 가지고 있으며, 정돈된 플레이리스트를 좋아해요.",
      "테마별로 체계적으로 정리하며, 원곡을 선호하는 스타일이에요.",
      "규칙적인 밥상은 평화야. 규칙적인 음악도 평화예요.",
    ],
    recommendedGenre: ["클래식", "재즈"],
    recommendedPlaylist: "클래식 컬렉션",
    recommendedAction: "오늘은 늘 듣던 플레이리스트를 재생해보세요.",
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
  ISTP: {
    name: "실용 리스너",
    emoji: "🛠",
    summary: "상황 맞춤 즉시 듣기형",
    description: [
      "상황에 맞춰 즉시 음악을 듣는 당신! 기능성 음악을 중심으로 집중 모드를 활용해요.",
      "집중력 향상이나 작업용으로 음악을 듣으며, 멀티태스킹 중 배경음악으로 활용해요.",
      "라면 + 달걀 = 완벽 공식. 음악도 실용적이면 완벽해요.",
    ],
    recommendedGenre: ["Lo-Fi", "시네마틱"],
    recommendedPlaylist: "집중력 향상",
    recommendedAction: "오늘은 작업할 때 이 플레이리스트를 들어보세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof musicCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = musicCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
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
                  className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="music-taste"
                  testPath="/tests/music-taste/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 ${character.emoji} ${character.name} (${mbtiType})!`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/music-taste/test">
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
              <span>🎧</span>
              <span>당신의 음악 취향</span>
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

        {/* Recommended Playlist & Action */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🎵</span>
              <span>추천 플레이리스트 & 행동</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">🎼 추천 장르</div>
                  <div className="flex flex-wrap gap-2">
                    {character.recommendedGenre.map((genre, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">📋 추천 플레이리스트</div>
                  <div className="text-muted-foreground">{character.recommendedPlaylist}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-pink-950 dark:to-blue-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">💡 추천 행동</div>
                  <div className="text-muted-foreground">{character.recommendedAction}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💕</span>
              <span>잘 맞는 음악 파트너</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = musicCharacters[type as keyof typeof musicCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg text-center"
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
              <span>🎯</span>
              <span>다른 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  slug: "jachui",
                  title: "자취 밥상 스타일",
                  emoji: "🍳",
                  description: "자취 밥상 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "movie-theater-style",
                  title: "영화관 관람 스타일",
                  emoji: "🎬",
                  description: "영화관 습관으로 알아보는 성격",
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

export default function MusicTasteResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

