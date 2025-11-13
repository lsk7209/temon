"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const youtubeTypes = {
  ENFP: {
    label: "영감 확산형",
    summary: "썸네일에서 아이디어를 확장하는 발견가",
    traits: ["추천 탐험", "공유 활발", "트렌드 민감"],
    picks: ["크리에이티브 편집", "여행 브이로그", "틈새 인사이트"],
    tips: ["워치리스트 분리", "길이 제한 규칙", "알림 과밀 관리"],
    match: "ISTJ, INTJ",
    emoji: "💡",
  },
  INFP: {
    label: "몰입 감상형",
    summary: "조용히 스토리를 음미하는 정서 시청자",
    traits: ["광고 관대", "플레이리스트 보관", "긴 영상 선호"],
    picks: ["기록 다큐", "감성 브이로그", "책·영화 해설"],
    tips: ["시간 캡 설정", "요약 북마크", "밝기·자막 최적화"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "큐레이션 리더형",
    summary: "사람 중심으로 유익한 콘텐츠를 배포",
    traits: ["추천 글 작성", "학습 스터디 운영", "댓글 매너"],
    picks: ["관계·심리 강의", "팀 생산성", "커뮤니케이션 사례"],
    tips: ["근거 링크화", "편향 점검", "주제별 폴더"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 선별형",
    summary: "가치와 메시지로 채널을 엄격히 관리",
    traits: ["알고리즘 절제", "저잡음 환경", "기록 습관"],
    picks: ["미니멀·정리", "철학·인문", "심층 인터뷰"],
    tips: ["즉흥 슬롯 허용", "완주 기준 설정", "알림 최소화"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 토론형",
    summary: "새 포맷을 테스트하며 비교·논증",
    traits: ["배속 시청", "챕터 점프", "댓글 토론"],
    picks: ["테크 리뷰", "신사업·스타트업", "반박·팩트체크"],
    tips: ["감정 소모 관리", "근거 출처 고정", "워치리스트 청소"],
    match: "ISFJ, ISTJ",
    emoji: "💬",
  },
  INTP: {
    label: "지식 최적화형",
    summary: "정보 밀도를 극대화하는 탐구가",
    traits: ["요약 수집", "타임스탬프 기록", "검색 우선"],
    picks: ["강의·컨퍼런스", "코딩·튜토리얼", "과학 렉처"],
    tips: ["완주보다 흡수율", "하이라이트 자동화", "중복 채널 정리"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "목표 지향형",
    summary: "성과 중심으로 채널 포트폴리오 운영",
    traits: ["학습 플랜", "알림 전략", "루틴 고정"],
    picks: ["리더십", "재무·경영", "체력·루틴"],
    tips: ["보상 시청 창구", "피로 신호 감지", "월간 리밸런싱"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 큐레이터형",
    summary: "주제 지도와 출처 신뢰도로 선별",
    traits: ["북마크 트리", "오용 방지", "실험 슬롯"],
    picks: ["메타 분석", "장기 프로젝트", "연구 발표"],
    tips: ["알고리즘 교정", "리캡 노트", "긴 영상은 챕터로"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 매니저형",
    summary: "함께 보기 좋은 콘텐츠를 챙김",
    traits: ["공유 리스트", "리액션 중심", "가벼운 몰입"],
    picks: ["쿠킹·홈카페", "여행 모음", "하이라이트 편집"],
    tips: ["시간대 배분", "광고 피로 관리", "자막 가독성"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 루틴형",
    summary: "늘 보던 채널을 편안히 시청",
    traits: ["규칙 시청", "저소음 환경", "보수적 구독"],
    picks: ["생활 정보", "건강·힐링", "클래식 교양"],
    tips: ["신규 1개 체험", "알림 묶음", "보관함 슬림화"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 체험형",
    summary: "재미와 현장감으로 에너지를 충전",
    traits: ["트렌드 민감", "실시간 반응", "짧은 영상 선호"],
    picks: ["쇼츠·릴스", "댄스·뮤직", "브이로그 하이라이트"],
    tips: ["소리 관리", "수면 전 제한", "구독 클린업"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 힐링형",
    summary: "잔잔한 영상으로 머리를 비움",
    traits: ["무자막 선호", "화이트노이즈", "미니멀 공유"],
    picks: ["ASMR", "자연 풍경", "갤러리 투어"],
    tips: ["볼륨 안전선", "긴 영상 예약", "데이터 절약"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 관리자형",
    summary: "시청 시간을 예산처럼 관리",
    traits: ["시간 캡", "알림 규칙", "정기 점검"],
    picks: ["뉴스 요약", "생산성 툴", "재무 브리핑"],
    tips: ["보상 시청 허용", "편향 교정", "분기별 정리"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 시청형",
    summary: "검증된 채널만 꾸준히 소화",
    traits: ["즐겨찾기 고정", "히스토리 관리", "광고 스킵"],
    picks: ["공식 채널", "교육 콘텐츠", "정리형 튜토리얼"],
    tips: ["실험 슬롯 도입", "배속 다양화", "주제 교차"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 해결형",
    summary: "필요한 정보와 재미를 빠르게 획득",
    traits: ["결정 빠름", "건너뛰기 능숙", "현실 적용"],
    picks: ["수리·DIY", "요약 뉴스", "리뷰 하이라이트"],
    tips: ["근거 확인", "충동 클릭 관리", "세이프리스트"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 최적화형",
    summary: "핵심만 뽑아 쓰는 효율 시청자",
    traits: ["챕터 활용", "배속 루틴", "기술 튜토리얼"],
    picks: ["코딩·전자공학", "기계·공구", "퀵 팁 모음"],
    tips: ["백업 메모", "중복 제거", "장비 세팅"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof youtubeTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = youtubeTypes[mbtiType]
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
                  className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="youtube-habit"
                  testPath="/tests/youtube-habit/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 ▶️ ${character.label}(${mbtiType})! 너는 어떤 유튜브 시청자야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/youtube-habit/test">
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
              <span>▶️</span>
              <span>당신의 시청 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg"
                >
                  <p className="font-medium text-center">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Picks */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>📺</span>
              <span>추천 채널 유형</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg"
                >
                  <p className="font-medium text-center">{pick}</p>
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
              <span>시청 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-red-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "phone-style",
                  title: "스마트폰 사용 습관",
                  emoji: "📱",
                  description: "스마트폰 사용 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "music-style",
                  title: "음악 취향",
                  emoji: "🎵",
                  description: "음악 선택으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "movie-theater",
                  title: "영화관 관람 스타일",
                  emoji: "🎬",
                  description: "영화관 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "kakao-reply-style",
                  title: "카톡 답장 스타일",
                  emoji: "💬",
                  description: "카톡 답장 습관으로 알아보는 성격",
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
              className="border-2 border-red-300 hover:bg-red-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function YoutubeHabitResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

