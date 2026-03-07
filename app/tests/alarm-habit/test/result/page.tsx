"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useResolvedResultType } from "@/hooks/use-resolved-result-type"

const alarmCharacters = {
  ENFP: {
    name: "즉흥 스누저",
    emoji: "🎈",
    summary: "기분 따라 알람도 변신!",
    description: [
      "매일 다른 알람 소리로 기상하는 당신! 어제는 클래식, 오늘은 K-pop, 내일은 자연의 소리... 알람 하나도 루틴이 아닌 새로운 경험이에요.",
      "스누즈 버튼을 누르면서도 '오늘은 뭔가 특별한 일이 일어날 것 같아!'라고 생각하는 긍정적인 아침형 인간이에요.",
      "친구들에게 '이 알람 소리 어때?'라며 새로운 발견을 공유하는 것을 좋아하는 당신의 모습이 정말 사랑스러워요.",
    ],
    tips: [
      "🎵 매주 새로운 알람 소리 시도",
      "🌈 기분에 따른 알람 시간 조절",
      "📱 알람 앱 다양하게 활용",
      "🎉 기상 후 좋은 음악으로 하루 시작",
    ],
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "몽상 기상러",
    emoji: "🌙",
    summary: "스누즈 속에서 꿈 연장",
    description: [
      "알람이 울려도 바로 일어나지 않고 이불 속에서 오늘 하루를 상상해보는 당신! 스누즈 시간이 하루 계획을 세우는 소중한 시간이에요.",
      "창밖의 날씨를 보며 기분을 맞춰 일어나는 시간을 조절하고, 꿈에서 본 내용을 곱씹어보며 천천히 현실로 돌아와요.",
      "알람 소리보다는 자연스러운 햇빛이나 새소리에 더 민감하게 반응하는 감성적인 기상 스타일을 가지고 있어요.",
    ],
    tips: [
      "🌅 햇빛 알람 활용하기",
      "🎵 잔잔한 음악으로 기상",
      "📝 침대에서 하루 계획 세우기",
      "🌸 계절에 맞는 알람 소리",
    ],
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "모닝 케어러",
    emoji: "🤗",
    summary: "가족 알람까지 챙김",
    description: [
      "자신의 알람보다 가족들이 제때 일어나는지 더 걱정하는 당신! 룸메이트나 가족의 알람이 울리면 대신 깨워주는 천사예요.",
      "단체 채팅방에 '굿모닝!' 메시지를 보내며 모든 사람의 하루를 응원하고, 늦잠 자는 친구에게는 깨우는 전화까지 해주는 배려심이 가득해요.",
      "당신이 있는 곳은 항상 따뜻한 아침 분위기가 만들어지고, 모든 사람이 기분 좋게 하루를 시작할 수 있어요.",
    ],
    tips: [
      "☕ 가족과 함께하는 모닝 루틴",
      "📱 단체 채팅으로 모닝 인사",
      "🤝 서로 깨워주는 시스템",
      "💝 따뜻한 아침 메시지 보내기",
    ],
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "예지형 기상러",
    emoji: "🔮",
    summary: "2분 전 기류 감지",
    description: [
      "알람이 울리기 2분 전에 신기하게 눈이 떠지는 당신! 마치 내장 시계가 있는 것처럼 정확한 생체리듬을 가지고 있어요.",
      "꿈에서 받은 영감이나 직감을 아침에 메모하는 습관이 있고, 하루의 에너지를 미리 감지해서 컨디션을 조절하는 능력이 있어요.",
      "알람 없이도 일어날 수 있지만, 만약을 위해 설정해두는 신중함과 직관력을 동시에 가진 신비로운 기상 스타일이에요.",
    ],
    tips: ["🧘 기상 후 명상 시간", "📔 꿈 일기 작성하기", "🌙 수면 패턴 관찰하기", "✨ 직감을 믿고 하루 계획"],
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "실험 알람러",
    emoji: "🧪",
    summary: "신박한 앱·소리 테스트",
    description: [
      "알람계의 실험가! 새로운 알람 앱이 나오면 바로 다운받아서 테스트해보고, 친구들에게 '이거 진짜 신기해!'라며 추천하는 얼리어답터예요.",
      "수학 문제를 풀어야 꺼지는 알람, QR코드를 스캔해야 하는 알람 등 창의적인 기상 방법을 시도해보는 것을 즐겨요.",
      "가끔 실험이 실패해서 늦잠을 자기도 하지만, '이것도 데이터야!'라며 긍정적으로 받아들이는 모습이 정말 멋져요.",
    ],
    tips: ["📱 새로운 알람 앱 체험", "🧩 퍼즐형 알람 활용", "📊 수면 데이터 분석", "🔬 다양한 기상 방법 실험"],
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "최적화 타임러",
    emoji: "📐",
    summary: "REM주기 계산 고수",
    description: [
      "수면 사이클을 완벽하게 계산해서 REM 수면 단계에 맞춰 일어나는 과학적 기상법의 달인! 90분 주기를 정확히 계산해서 가장 개운한 시간에 기상해요.",
      "수면 트래커 앱의 모든 데이터를 분석하고, 자신만의 최적 수면 공식을 만들어내는 연구자 같은 모습을 보여줘요.",
      "한 번 완벽한 시스템을 구축하면 거의 수정하지 않으며, 매일 일정한 컨디션으로 기상하는 놀라운 일관성을 자랑해요.",
    ],
    tips: ["📊 수면 데이터 체계적 분석", "⏰ REM 주기 맞춤 알람", "🧠 개인 최적화 공식 개발", "📈 장기간 패턴 관찰"],
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "타임 매니저",
    emoji: "⏱️",
    summary: "6:29 → 6:34 딱!",
    description: [
      "알람 시간을 6:29, 6:34처럼 정확하게 설정해서 하루 일정을 완벽하게 관리하는 시간의 지배자! 5분 단위로 모든 아침 루틴이 계획되어 있어요.",
      "기상 후 30분 안에 운동, 샤워, 아침식사까지 완료하는 효율성의 끝판왕이며, 시간 낭비를 절대 용납하지 않는 철저함을 보여줘요.",
      "당신의 아침 루틴을 보면 다른 사람들이 '어떻게 저렇게 체계적일 수 있지?'라며 감탄하게 되는 완벽한 시간 관리 능력을 가지고 있어요.",
    ],
    tips: ["📅 분 단위 아침 스케줄", "⚡ 효율적인 루틴 최적화", "🎯 명확한 기상 목표", "📋 체크리스트 활용"],
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "절차 지배자",
    emoji: "🧊",
    summary: "알람·조명·커튼 자동화",
    description: [
      "스마트홈 시스템을 구축해서 알람과 동시에 조명이 켜지고 커튼이 열리는 완전 자동화 기상 시스템을 만든 미래형 인간!",
      "한 번 완벽한 시스템을 구축하면 거의 수정하지 않으며, 모든 변수를 고려한 백업 플랜까지 준비되어 있는 치밀함을 보여줘요.",
      "당신의 기상 시스템은 마치 SF 영화에서 나올 법한 완성도를 자랑하며, 효율성과 편의성을 동시에 추구하는 혁신적인 스타일이에요.",
    ],
    tips: ["🏠 스마트홈 시스템 구축", "🤖 자동화 루틴 설정", "🔧 시스템 지속적 개선", "📱 통합 관리 앱 활용"],
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFP: {
    name: "쇼타임 기상러",
    emoji: "🎊",
    summary: "노래 틀고 Vlog 시작",
    description: [
      "기상과 동시에 신나는 음악을 틀고 아침 브이로그를 찍기 시작하는 엔터테이너! 침대에서 일어나는 순간부터 하루가 쇼타임이에요.",
      "거울 앞에서 '굿모닝!' 인사를 하며 하루를 시작하고, SNS에 아침 셀카와 함께 긍정적인 메시지를 올리는 것이 일상이에요.",
      "당신의 아침 에너지는 주변 사람들에게도 전염되어서, 함께 있는 사람들도 자연스럽게 기분이 좋아지는 마법 같은 힘을 가지고 있어요.",
    ],
    tips: ["🎵 신나는 기상 음악", "📸 아침 브이로그 촬영", "🌟 긍정적인 아침 인사", "💃 기상 후 스트레칭 댄스"],
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ISFP: {
    name: "감성 스누저",
    emoji: "🌷",
    summary: "창밖 햇빛 확인 후 기상",
    description: [
      "창밖의 햇빛과 날씨를 확인한 후 기분에 맞춰 일어나는 시간을 조절하는 감성적인 기상 스타일! 비 오는 날에는 조금 더 이불 속에서 여유를 즐겨요.",
      "알람 소리보다는 자연스러운 새소리나 빗소리에 더 민감하게 반응하며, 계절의 변화에 따라 기상 패턴도 자연스럽게 바뀌어요.",
      "아침에 일어나서 창가에 앉아 따뜻한 차 한 잔을 마시며 하루를 천천히 시작하는 여유로운 모습이 정말 아름다워요.",
    ],
    tips: ["🌅 자연광 활용하기", "☕ 여유로운 모닝 티타임", "🎵 잔잔한 배경음악", "🌸 계절감 있는 기상 루틴"],
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ESTP: {
    name: "속전속결러",
    emoji: "🚀",
    summary: "알람 1개, 0초 기상",
    description: [
      "알람이 울리는 순간 바로 벌떡 일어나서 5분 만에 준비를 끝내고 나가는 스피드의 화신! 스누즈 버튼이 뭔지도 모르는 액션파예요.",
      "복잡한 아침 루틴보다는 간단하고 빠르게, 하지만 효과적으로 하루를 시작하는 것을 선호하며, 시간 낭비를 절대 하지 않아요.",
      "당신의 기상 속도를 보면 다른 사람들이 '어떻게 저렇게 빨리 움직일 수 있지?'라며 놀라게 되는 놀라운 순발력을 자랑해요.",
    ],
    tips: ["⚡ 간단한 아침 루틴", "🏃 기상 후 즉시 활동", "⏰ 알람 1개로 충분", "🎯 목표 지향적 기상"],
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISTP: {
    name: "스텔스 모닝러",
    emoji: "🥷",
    summary: "무소음·무대화, 혼자 해결",
    description: [
      "알람 소리도 진동으로, 기상 후 움직임도 최소한으로... 마치 닌자처럼 조용하고 효율적으로 아침을 시작하는 스텔스 마스터!",
      "복잡한 루틴이나 소음 없이도 완벽하게 준비를 마치고, 다른 사람들이 눈치채기도 전에 이미 모든 것을 끝내놓는 놀라운 능력을 가지고 있어요.",
      "혼자만의 조용한 아침 시간을 소중히 여기며, 최소한의 동작으로 최대한의 효율을 내는 쿨한 기상 스타일이에요.",
    ],
    tips: ["🔕 진동 알람 활용", "🤫 조용한 아침 루틴", "⚡ 효율적인 동선", "🧘 혼자만의 시간 확보"],
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
  ESFJ: {
    name: "브런치 리더",
    emoji: "🍪",
    summary: "기상 후 단톡 '굿모닝!'",
    description: [
      "기상과 동시에 가족 단톡방에 '굿모닝!' 메시지를 보내고, 모든 사람의 하루 일정을 챙겨주는 따뜻한 아침의 리더!",
      "아침식사를 준비하면서 가족들의 취향을 모두 고려하고, 오늘 날씨에 맞는 옷차림까지 조언해주는 세심한 배려심을 보여줘요.",
      "당신이 있는 곳의 아침은 항상 따뜻하고 정겨우며, 모든 사람이 사랑받는다는 느낌으로 하루를 시작할 수 있어요.",
    ],
    tips: ["💬 가족 단톡 모닝 인사", "🍳 함께하는 아침식사", "👕 날씨별 옷차림 조언", "💝 따뜻한 관심과 배려"],
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ISFJ: {
    name: "케어풀 어웨이커",
    emoji: "🧸",
    summary: "가족 깨워주고 본인 준비",
    description: [
      "자신보다 가족들을 먼저 깨워주고, 모든 사람이 편안하게 하루를 시작할 수 있도록 뒷바라지하는 천사 같은 존재!",
      "가족들의 아침 일정을 모두 기억하고 있어서 '오늘 중요한 미팅 있다며? 일찍 나가야 하지 않아?'라며 세심하게 챙겨줘요.",
      "자신의 준비는 항상 마지막에 하면서도 절대 늦지 않는 놀라운 시간 관리 능력과 희생정신을 가지고 있어요.",
    ],
    tips: ["👨‍👩‍👧‍👦 가족 일정 관리", "🤗 따뜻한 기상 도움", "⏰ 여유 있는 시간 계획", "💚 배려심 있는 아침 루틴"],
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ESTJ: {
    name: "규칙 준수러",
    emoji: "📏",
    summary: "매일 6:00, 오차 0",
    description: [
      "365일 정확히 6:00에 일어나서 정해진 루틴을 철저히 지키는 규칙의 화신! 주말이든 휴일이든 생체시계는 절대 흔들리지 않아요.",
      "아침 루틴이 분 단위로 정해져 있어서 6:05 세수, 6:10 양치, 6:15 운동... 마치 군대처럼 정확한 스케줄을 자랑해요.",
      "당신의 일관성을 보면 다른 사람들이 '정말 대단하다'며 존경하게 되는 놀라운 자기관리 능력을 가지고 있어요.",
    ],
    tips: ["⏰ 정확한 기상 시간", "📋 체계적인 루틴", "📅 일관된 스케줄", "✅ 규칙적인 생활 패턴"],
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ISTJ: {
    name: "전통 알람러",
    emoji: "🏛️",
    summary: "옛날 자명종 그대로",
    description: [
      "스마트폰 알람보다는 전통적인 자명종을 선호하고, 오랫동안 검증된 기상 방법을 고수하는 클래식한 스타일의 소유자!",
      "새로운 알람 앱이나 기능보다는 단순하고 확실한 방법을 선호하며, 한 번 정한 루틴은 거의 바꾸지 않는 일관성을 보여줘요.",
      "당신의 전통적인 기상 방식은 어머니나 할머니의 손맛처럼 편안하고 안정적인 느낌을 주는 따뜻한 매력이 있어요.",
    ],
    tips: ["⏲️ 전통적인 알람 방식", "🔄 일정한 루틴 유지", "📚 검증된 방법 선호", "🏠 안정적인 환경 조성"],
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const resultId = searchParams.get("id")
  const { resolvedType, loading } = useResolvedResultType(Object.keys(alarmCharacters), type, resultId)
  const mbtiType = (resolvedType as keyof typeof alarmCharacters) || "ENFP"
  const character = alarmCharacters[mbtiType]

  if (loading) {
    return <div>Loading...</div>
  }

  const handleShare = async () => {
    const shareText = `나는 ${character.emoji} ${character.name}! 알람 습관으로 보는 성격 테스트 결과: ${character.summary}`
    const shareUrl = `${window.location.origin}/tests/alarm-habit/test`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${character.emoji} ${character.name}!`,
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.log("Error sharing:", err)
        const fullShareText = `${shareText}

${shareUrl}`
        navigator.clipboard.writeText(fullShareText)
        alert("공유 메시지가 복사되었습니다! 친구들에게 붙여넣기 해보세요 📋✨")
      }
    } else {
      const fullShareText = `${shareText}

${shareUrl}`
      try {
        await navigator.clipboard.writeText(fullShareText)
        alert("공유 메시지가 복사되었습니다! 친구들에게 붙여넣기 해보세요 📋✨")
      } catch (err) {
        console.log("Clipboard API failed:", err)
        prompt("아래 링크를 복사해서 친구들에게 공유해보세요:", shareUrl)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      {/* Main Result */}
      <main className="container max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Character Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-6xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-3 sm:mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm sm:text-base px-3 py-1"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                  {character.name}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium px-2">
                  "{character.summary}"
                </p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
                <Button
                  size="lg"
                  onClick={handleShare}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 h-12 sm:h-auto text-base sm:text-lg"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  친구들에게 공유하기
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="h-12 sm:h-auto text-base sm:text-lg bg-transparent"
                >
                  <Link href="/tests/alarm-habit/test">
                    <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-6 sm:mb-8">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <span>⏰</span>
              <span>당신의 아침 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {character.description.map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-6 sm:mb-8">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <span>💡</span>
              <span>맞춤 기상 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {character.tips.map((tip, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg"
                >
                  <span className="text-sm sm:text-base font-medium">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-6 sm:mb-8">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <span>💕</span>
              <span>잘 맞는 아침 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = alarmCharacters[type as keyof typeof alarmCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg text-center"
                  >
                    <div className="text-2xl sm:text-3xl mb-2">{compatibleChar.emoji}</div>
                    <div className="font-medium text-sm sm:text-base">{compatibleChar.name}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{type}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Other Tests */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <span>🎯</span>
              <span>다른 습관 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  slug: "ramen-mbti",
                  title: "라면 끓일 때 MBTI",
                  emoji: "🍜",
                  description: "라면 조리법으로 알아보는 성격",
                  participants: "25.8K",
                },
                {
                  slug: "coffee-mbti",
                  title: "커피 취향 MBTI",
                  emoji: "☕",
                  description: "좋아하는 커피로 알아보는 성격",
                  participants: "15.2K",
                },
                {
                  slug: "study-mbti",
                  title: "공부 스타일 MBTI",
                  emoji: "📚",
                  description: "학습 방법으로 보는 당신의 유형",
                  participants: "6.7K",
                },
              ].map((test) => (
                <Card key={test.slug} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{test.emoji}</div>
                    <h3 className="font-bold mb-2 text-sm sm:text-base">{test.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{test.description}</p>
                    <p className="text-xs text-muted-foreground mb-3 sm:mb-4">{test.participants}명 참여</p>
                    <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm bg-transparent">
                      <Link href={`/${test.slug}`}>테스트 하기</Link>
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

export default function AlarmHabitResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
