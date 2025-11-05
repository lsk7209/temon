"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Smartphone, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const phoneCharacters = {
  ENFP: {
    name: "즉흥 탐험러",
    emoji: "🎈",
    summary: "새로운 앱은 일단 깔고 봐야지!",
    description: [
      "새로운 앱은 일단 깔고 봐야지! 아침에 눈 뜨자마자 폰 확인부터 하는 당신은 즉흥 탐험러예요.",
      "SNS 알림이 뜨면 바로 확인하고, 재밌어 보여서 앱을 시도하며, '에이 뭐 어때'라고 생각하는 자유로운 스타일이에요.",
      "감성·사진형 배경화면을 사용하며, 음악·영상 감상을 즐기고, 눈부시게 밝게 설정하는 즉흥·창의·감각형 스타일이에요.",
    ],
    recommendedApps: ["틱톡", "인스타"],
    recommendedAction: "즉흥적으로 즐기되, 가끔은 앱을 정리해보세요.",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
    shareText: "나는 🔋 즉흥 탐험러(ENFP)! 너는 어떤 폰 유저야?",
  },
  ENFJ: {
    name: "공감 커뮤니케이터",
    emoji: "🤝",
    summary: "친구 알림엔 즉시 반응",
    description: [
      "친구 알림엔 즉시 반응하는 당신은 공감 커뮤니케이터예요. 아침에 눈 뜨자마자 폰 확인부터 하고, 배터리 10% 남았을 때 불안해서 바로 충전해요.",
      "SNS 알림이 뜨면 바로 확인하고, 주기적으로 사진을 삭제하며, 친구와 채팅할 때 바로 답장하는 사교적인 스타일이에요.",
      "감성·사진형 배경화면을 사용하며, 일정·업무 확인을 하고, 바로 찾기모드를 켜는 배려·소통형 스타일이에요.",
    ],
    recommendedApps: ["카카오톡", "단체채팅"],
    recommendedAction: "모두를 챙기되, 자신의 여유도 잊지 마세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
    shareText: "나는 🔋 공감 커뮤니케이터(ENFJ)! 너는 어떤 폰 유저야?",
  },
  ENTJ: {
    name: "전략 관리자",
    emoji: "🧱",
    summary: "폰은 도구, 관리가 목적",
    description: [
      "폰은 도구, 관리가 목적인 당신은 전략 관리자예요. 스트레칭이나 생각 정리를 하지만, 배터리 10% 남았을 때 불안해서 바로 충전해요.",
      "주기적으로 사진을 삭제하고, 깔끔·심플한 배경화면을 사용하며, 필요할 때만 앱을 설치하는 효율적인 스타일이에요.",
      "폰 사용 시간 알림을 보면 관리해야겠다 생각하고, 효율·생산성 중심으로 앱을 정리하며, 일정·업무 확인을 하는 통제·계획형 스타일이에요.",
    ],
    recommendedApps: ["노션", "캘린더"],
    recommendedAction: "전략적으로 관리하되, 가끔은 즐거움도 잊지 마세요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
    shareText: "나는 🔋 전략 관리자(ENTJ)! 너는 어떤 폰 유저야?",
  },
  ENTP: {
    name: "실험 기술러",
    emoji: "🧪",
    summary: "신기한 기능, 새로운 OS에 열광",
    description: [
      "신기한 기능, 새로운 OS에 열광하는 당신은 실험 기술러예요. 아침에 눈 뜨자마자 폰 확인부터 하고, 그냥 버틸 때까지 사용해요.",
      "SNS 알림이 뜨면 바로 확인하고, 재밌어 보여서 앱을 시도하며, '에이 뭐 어때'라고 생각하는 탐구적인 스타일이에요.",
      "깔끔·심플한 배경화면을 사용하지만, 음악·영상 감상을 즐기고, '언젠가 나오겠지'라고 생각하는 도전형 스타일이에요.",
    ],
    recommendedApps: ["베타 앱", "테크 유틸"],
    recommendedAction: "새로운 것을 탐험하되, 기본적인 정리는 해두세요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
    shareText: "나는 🔋 실험 기술러(ENTP)! 너는 어떤 폰 유저야?",
  },
  ESFJ: {
    name: "따뜻한 소통러",
    emoji: "😊",
    summary: "연락 먼저 하는 세심형",
    description: [
      "연락 먼저 하는 세심한 당신은 따뜻한 소통러예요. 아침에 눈 뜨자마자 폰 확인부터 하고, 배터리 10% 남았을 때 불안해서 바로 충전해요.",
      "SNS 알림이 뜨면 바로 확인하고, 주기적으로 사진을 삭제하며, 친구와 채팅할 때 바로 답장하는 배려심 많은 스타일이에요.",
      "감성·사진형 배경화면을 사용하며, 일정·업무 확인을 하고, 바로 찾기모드를 켜는 소통형 스타일이에요.",
    ],
    recommendedApps: ["인스타그램", "밴드"],
    recommendedAction: "모두를 챙기되, 자신의 여유도 잊지 마세요.",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
    shareText: "나는 🔋 따뜻한 소통러(ESFJ)! 너는 어떤 폰 유저야?",
  },
  ESFP: {
    name: "감성 트렌더",
    emoji: "📸",
    summary: "폰은 나의 일기장",
    description: [
      "폰은 나의 일기장인 당신은 감성 트렌더예요. 아침에 눈 뜨자마자 폰 확인부터 하고, 그냥 버틸 때까지 사용해요.",
      "SNS 알림이 뜨면 바로 확인하고, 쌓여도 그대로 두며, 친구와 채팅할 때 바로 답장하는 감성적인 스타일이에요.",
      "감성·사진형 배경화면을 사용하며, 음악·영상 감상을 즐기고, 눈부시게 밝게 설정하는 트렌드형 스타일이에요.",
    ],
    recommendedApps: ["스냅", "필터 앱"],
    recommendedAction: "감성으로 사용하되, 가끔은 정리도 해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
    shareText: "나는 🔋 감성 트렌더(ESFP)! 너는 어떤 폰 유저야?",
  },
  ESTJ: {
    name: "실속 관리자",
    emoji: "📋",
    summary: "폴더 정리 완벽, 효율 최고",
    description: [
      "폴더 정리 완벽, 효율 최고인 당신은 실속 관리자예요. 스트레칭이나 생각 정리를 하지만, 배터리 10% 남았을 때 불안해서 바로 충전해요.",
      "주기적으로 사진을 삭제하고, 깔끔·심플한 배경화면을 사용하며, 필요할 때만 앱을 설치하는 현실적인 스타일이에요.",
      "폰 사용 시간 알림을 보면 관리해야겠다 생각하고, 효율·생산성 중심으로 앱을 정리하며, 일정·업무 확인을 하는 실용형 스타일이에요.",
    ],
    recommendedApps: ["이메일", "할 일 관리"],
    recommendedAction: "효율적으로 관리하되, 가끔은 즐거움도 잊지 마세요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
    shareText: "나는 🔋 실속 관리자(ESTJ)! 너는 어떤 폰 유저야?",
  },
  ESTP: {
    name: "속전속결러",
    emoji: "⚡",
    summary: "빠르고 직관적인 사용",
    description: [
      "빠르고 직관적으로 사용하는 당신은 속전속결러예요. 아침에 눈 뜨자마자 폰 확인부터 하고, 그냥 버틸 때까지 사용해요.",
      "SNS 알림이 뜨면 바로 확인하고, 재밌어 보여서 앱을 시도하며, '에이 뭐 어때'라고 생각하는 실행력 있는 스타일이에요.",
      "감성·사진형 배경화면을 사용하며, 음악·영상 감상을 즐기고, '언젠가 나오겠지'라고 생각하는 즉흥형 스타일이에요.",
    ],
    recommendedApps: ["리워드 앱", "퀵서치"],
    recommendedAction: "빠르게 사용하되, 가끔은 신중하게 고민해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
    shareText: "나는 🔋 속전속결러(ESTP)! 너는 어떤 폰 유저야?",
  },
  INFP: {
    name: "감성 기록러",
    emoji: "🌙",
    summary: "노트에 생각 적고 사진 저장",
    description: [
      "노트에 생각 적고 사진 저장하는 당신은 감성 기록러예요. 스트레칭이나 생각 정리를 하지만, 그냥 버틸 때까지 사용해요.",
      "나중에 한꺼번에 보고, 쌓여도 그대로 두며, 생각나면 답장하는 내면형 스타일이에요.",
      "감성·사진형 배경화면을 사용하며, 음악·영상 감상을 즐기고, '언젠가 나오겠지'라고 생각하는 감성형 스타일이에요.",
    ],
    recommendedApps: ["다이어리", "포토 앱"],
    recommendedAction: "감성에 따라 사용하되, 가끔은 정리도 해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
    shareText: "나는 🔋 감성 기록러(INFP)! 너는 어떤 폰 유저야?",
  },
  INFJ: {
    name: "사색형 관찰러",
    emoji: "📖",
    summary: "조용히 폰으로 세상을 관찰",
    description: [
      "조용히 폰으로 세상을 관찰하는 당신은 사색형 관찰러예요. 스트레칭이나 생각 정리를 하고, 배터리 10% 남았을 때 불안해서 바로 충전해요.",
      "나중에 한꺼번에 보고, 주기적으로 사진을 삭제하며, 생각나면 답장하는 철학적인 스타일이에요.",
      "깔끔·심플한 배경화면을 사용하며, 음악·영상 감상을 즐기고, 바로 찾기모드를 켜는 분석형 스타일이에요.",
    ],
    recommendedApps: ["독서", "명상 앱"],
    recommendedAction: "조용히 관찰하되, 가끔은 소통도 해보세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
    shareText: "나는 🔋 사색형 관찰러(INFJ)! 너는 어떤 폰 유저야?",
  },
  INTJ: {
    name: "효율 분석러",
    emoji: "📐",
    summary: "앱 구조·생산성 극대화",
    description: [
      "앱 구조·생산성을 극대화하는 당신은 효율 분석러예요. 스트레칭이나 생각 정리를 하고, 배터리 10% 남았을 때 불안해서 바로 충전해요.",
      "나중에 한꺼번에 보고, 주기적으로 사진을 삭제하며, 생각나면 답장하는 전략적인 스타일이에요.",
      "깔끔·심플한 배경화면을 사용하며, 일정·업무 확인을 하고, 바로 찾기모드를 켜는 분석형 스타일이에요.",
    ],
    recommendedApps: ["캘린더", "자동화 앱"],
    recommendedAction: "효율적으로 사용하되, 가끔은 즐거움도 잊지 마세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
    shareText: "나는 🔋 효율 분석러(INTJ)! 너는 어떤 폰 유저야?",
  },
  INTP: {
    name: "실험적 분석러",
    emoji: "🔬",
    summary: "앱 기능 분석이 취미",
    description: [
      "앱 기능 분석이 취미인 당신은 실험적 분석러예요. 스트레칭이나 생각 정리를 하고, 그냥 버틸 때까지 사용해요.",
      "나중에 한꺼번에 보고, 재밌어 보여서 앱을 시도하며, 생각나면 답장하는 탐구적인 스타일이에요.",
      "깔끔·심플한 배경화면을 사용하며, 음악·영상 감상을 즐기고, '언젠가 나오겠지'라고 생각하는 논리형 스타일이에요.",
    ],
    recommendedApps: ["AI 앱", "개발툴"],
    recommendedAction: "기능을 분석하되, 가끔은 실용적인 앱도 사용해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
    shareText: "나는 🔋 실험적 분석러(INTP)! 너는 어떤 폰 유저야?",
  },
  ISFJ: {
    name: "정리형 힐러",
    emoji: "🧸",
    summary: "사진·메시지 정리 잘함",
    description: [
      "사진·메시지를 정리 잘하는 당신은 정리형 힐러예요. 스트레칭이나 생각 정리를 하지만, 배터리 10% 남았을 때 불안해서 바로 충전해요.",
      "나중에 한꺼번에 보고, 주기적으로 사진을 삭제하며, 생각나면 답장하는 안정적인 스타일이에요.",
      "감성·사진형 배경화면을 사용하며, 일정·업무 확인을 하고, 바로 찾기모드를 켜는 세심형 스타일이에요.",
    ],
    recommendedApps: ["앨범", "메모"],
    recommendedAction: "정리하는 습관은 좋지만, 가끔은 여유도 잊지 마세요.",
    compatibleTypes: ["ESFP", "ESTP", "ESFJ"],
    shareText: "나는 🔋 정리형 힐러(ISFJ)! 너는 어떤 폰 유저야?",
  },
  ISFP: {
    name: "감성 소비러",
    emoji: "🌷",
    summary: "감정에 따라 앱 사용 변화",
    description: [
      "감정에 따라 앱 사용이 변화하는 당신은 감성 소비러예요. 스트레칭이나 생각 정리를 하지만, 그냥 버틸 때까지 사용해요.",
      "나중에 한꺼번에 보고, 쌓여도 그대로 두며, 생각나면 답장하는 감각적인 스타일이에요.",
      "감성·사진형 배경화면을 사용하며, 음악·영상 감상을 즐기고, 눈부시게 밝게 설정하는 감정형 스타일이에요.",
    ],
    recommendedApps: ["음악", "디자인 앱"],
    recommendedAction: "감성에 따라 사용하되, 가끔은 정리도 해보세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESTJ"],
    shareText: "나는 🔋 감성 소비러(ISFP)! 너는 어떤 폰 유저야?",
  },
  ISTJ: {
    name: "질서 유지러",
    emoji: "📦",
    summary: "폴더 구조 완벽, 반복형",
    description: [
      "폴더 구조가 완벽하고 반복형인 당신은 질서 유지러예요. 스트레칭이나 생각 정리를 하고, 배터리 10% 남았을 때 불안해서 바로 충전해요.",
      "나중에 한꺼번에 보고, 주기적으로 사진을 삭제하며, 생각나면 답장하는 체계적인 스타일이에요.",
      "깔끔·심플한 배경화면을 사용하며, 일정·업무 확인을 하고, 바로 찾기모드를 켜는 보수형 스타일이에요.",
    ],
    recommendedApps: ["생산성 도구"],
    recommendedAction: "체계적으로 사용하되, 가끔은 새로운 앱도 시도해보세요.",
    compatibleTypes: ["ESFP", "ENFP", "ESTP"],
    shareText: "나는 🔋 질서 유지러(ISTJ)! 너는 어떤 폰 유저야?",
  },
  ISTP: {
    name: "기능 실용러",
    emoji: "🛠",
    summary: "필요한 기능만 딱 사용",
    description: [
      "필요한 기능만 딱 사용하는 당신은 기능 실용러예요. 스트레칭이나 생각 정리를 하고, 그냥 버틸 때까지 사용해요.",
      "나중에 한꺼번에 보고, 필요할 때만 앱을 설치하며, 생각나면 답장하는 실용적인 스타일이에요.",
      "깔끔·심플한 배경화면을 사용하며, 일정·업무 확인을 하고, 낮게 조정하는 냉철형 스타일이에요.",
    ],
    recommendedApps: ["계산기", "파일 앱"],
    recommendedAction: "실용적으로 사용하되, 가끔은 즐거움도 잊지 마세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
    shareText: "나는 🔋 기능 실용러(ISTP)! 너는 어떤 폰 유저야?",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof phoneCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = phoneCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950 dark:via-purple-950 dark:to-fuchsia-950">
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
                  className="mb-4 bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="phone-style"
                  testPath="/tests/phone-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={character.shareText}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/phone-style/test">
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
              <span>📱</span>
              <span>당신의 스마트폰 사용 습관</span>
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

        {/* Recommended Apps & Action Tip */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🔋</span>
              <span>추천 앱 스타일 & 꿀팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong>추천 앱 스타일:</strong> {character.recommendedApps.join(", ")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong>스마트폰 꿀팁:</strong> {character.recommendedAction}
            </p>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 폰 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = phoneCharacters[type as keyof typeof phoneCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950 rounded-lg text-center"
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
              <Sparkles className="h-6 w-6 text-fuchsia-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  slug: "coffee-mbti",
                  title: "커피 MBTI",
                  emoji: "☕",
                  description: "커피 취향으로 알아보는 성격",
                  participants: "12.5K",
                },
                {
                  slug: "dessert-style",
                  title: "디저트 취향",
                  emoji: "🍰",
                  description: "디저트 취향으로 알아보는 성격",
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

export default function PhoneStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
