"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useResolvedResultType } from "@/hooks/use-resolved-result-type"
import { ResultFaqSchema } from "@/components/quiz/result-faq-schema"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { getTopicResultFAQs, getTopicResultUseCases } from "@/lib/quiz-topic-copy"

const studyCharacters = {
  ENFP: {
    name: "아이디어 폭주러",
    emoji: "🎨",
    summary: "공부도 콘텐츠! 밈‧영상‧비유로 기억",
    description: [
      "공부를 하나의 창작 활동으로 접근하는 당신! 딱딱한 교과서보다는 유튜브 강의, 밈, 비유를 활용해서 재미있게 학습하는 것을 선호해요.",
      "노트 필기도 하나의 예술 작품처럼 만들어내고, 친구들과 함께 스터디하면서 아이디어를 나누는 것을 좋아해요.",
      "때로는 집중력이 흩어지기도 하지만, 창의적인 방법으로 기억에 오래 남는 학습을 하는 특별한 능력을 가지고 있어요.",
    ],
    studyTips: ["🎥 유튜브·영상 강의 활용", "🎨 마인드맵·그림 노트", "👥 스터디 그룹 참여", "🎵 배경음악과 함께 학습"],
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "감성 몰입러",
    emoji: "🎧",
    summary: "음악+무드등 켜고 감정이입 학습",
    description: [
      "공부할 때도 감성과 분위기를 중요하게 생각하는 당신! 좋아하는 음악을 들으며, 예쁜 조명 아래에서 천천히 몰입하는 스타일이에요.",
      "단순 암기보다는 내용에 감정이입하고 스토리를 만들어서 기억하는 것을 선호하며, 혼자만의 공간에서 집중하는 것을 좋아해요.",
      "자신만의 페이스로 꾸준히 학습하며, 깊이 있는 이해를 통해 오래 기억에 남는 공부를 하는 능력을 가지고 있어요.",
    ],
    studyTips: ["🎧 Lo-fi 음악과 함께", "💡 무드등·캔들 조명", "📖 스토리텔링 학습법", "🌙 밤 시간 집중 활용"],
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "팀플 캡틴",
    emoji: "🗂️",
    summary: "자료 취합·분배 완벽, 모두 성적 챙김",
    description: [
      "스터디 그룹의 천연 리더! 모든 사람의 학습 진도를 챙기고, 자료를 정리해서 나눠주는 것을 자연스럽게 하는 당신이에요.",
      "혼자 공부하는 것보다는 함께 학습하면서 서로 도움을 주고받는 것을 선호하며, 모든 팀원이 목표를 달성할 수 있도록 도와줘요.",
      "당신이 있는 스터디 그룹은 항상 체계적이고 따뜻한 분위기를 유지하며, 모든 사람이 성장할 수 있는 환경이 만들어져요.",
    ],
    studyTips: ["👥 스터디 그룹 운영", "📋 학습 계획 공유", "🤝 동료 멘토링", "📊 진도 체크 시스템"],
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "통찰 정리러",
    emoji: "🧠",
    summary: "큰 그림→디테일, 심층 질문 메모",
    description: [
      "학습 내용의 본질과 큰 그림을 먼저 파악한 후 세부사항으로 들어가는 체계적인 학습자! 단순 암기보다는 깊이 있는 이해를 추구해요.",
      "공부하면서 떠오르는 질문들을 메모해두고, 나중에 하나씩 해결해나가는 탐구적인 자세를 가지고 있어요.",
      "자신만의 학습 철학과 방법론을 가지고 있으며, 한 번 이해한 내용은 오래도록 기억하는 놀라운 능력을 보여줘요.",
    ],
    studyTips: ["🗺️ 전체 구조 파악 먼저", "❓ 질문 리스트 작성", "🔍 심화 학습 추가", "📝 개념 연결 노트"],
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "토론 실험러",
    emoji: "💬",
    summary: "'왜?'를 100번, 반박하며 개념 장악",
    description: [
      "모든 것에 '왜?'라고 질문하며 토론을 통해 학습하는 당신! 일방적인 강의보다는 상호작용이 있는 학습 환경을 선호해요.",
      "친구들과 토론하면서 서로 다른 관점을 나누고, 때로는 반박하면서 개념을 더 깊이 이해하는 특별한 능력을 가지고 있어요.",
      "새로운 학습 방법을 실험해보는 것을 좋아하며, 창의적인 접근으로 어려운 개념도 쉽게 이해하는 모습이 인상적이에요.",
    ],
    studyTips: ["💭 토론 스터디 참여", "❓ 질문 중심 학습", "🔄 다양한 방법 실험", "🧩 개념 연결 게임"],
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "논리 설계러",
    emoji: "📑",
    summary: "도식·수식·알고리즘으로 완벽 구조화",
    description: [
      "모든 학습 내용을 논리적으로 구조화하고 체계화하는 것을 좋아하는 당신! 복잡한 개념도 도식과 수식으로 정리해서 완벽하게 이해해요.",
      "암기보다는 원리와 논리를 파악하는 것을 중요하게 생각하며, 한 번 이해한 내용은 다양하게 응용할 수 있는 능력을 가지고 있어요.",
      "혼자서 깊이 있게 사고하는 시간을 소중히 여기며, 자신만의 학습 시스템을 구축하는 데 탁월한 재능을 보여줘요.",
    ],
    studyTips: ["📊 논리 구조 다이어그램", "🔢 수식·공식 정리", "🧮 원리 중심 학습", "🔍 심화 분석 시간"],
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "프로 플래너",
    emoji: "📅",
    summary: "D-day 역산, 목표→실행 OK",
    description: [
      "목표를 설정하고 역산해서 완벽한 학습 계획을 세우는 전략가! D-day부터 역산해서 일일 학습량까지 정확하게 계산해요.",
      "효율성을 최우선으로 생각하며, 시간 관리와 우선순위 설정에 탁월한 능력을 보여주는 학습의 CEO예요.",
      "목표 달성을 위해서는 어떤 어려움도 극복하는 강한 의지력을 가지고 있으며, 다른 사람들에게도 동기부여를 주는 리더십을 발휘해요.",
    ],
    studyTips: ["📋 역산 학습 계획", "⏰ 시간 블록 관리", "🎯 목표 세분화", "📈 진도율 체크"],
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "전략 솔버",
    emoji: "🗜️",
    summary: "기출·패턴 분석 후 최단 루트만 공략",
    description: [
      "기출문제와 출제 패턴을 철저히 분석해서 가장 효율적인 학습 루트를 찾아내는 전략가! 불필요한 공부는 하지 않고 핵심만 공략해요.",
      "장기적인 관점에서 학습 계획을 세우며, 자신만의 완벽한 시스템을 구축해서 일관되게 실행하는 능력이 뛰어나요.",
      "한 번 정한 방법은 끝까지 고수하며, 체계적이고 논리적인 접근으로 최고의 효율을 달성하는 모습이 정말 인상적이에요.",
    ],
    studyTips: ["📊 기출 패턴 분석", "🎯 핵심 개념 집중", "🗓️ 장기 계획 수립", "⚡ 효율성 최우선"],
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFP: {
    name: "브이로그 학습러",
    emoji: "📱",
    summary: "요약 필기·복습 과정을 리얼타임 업로드",
    description: [
      "공부 과정을 브이로그처럼 기록하고 공유하는 것을 좋아하는 당신! 예쁜 필기와 학습 과정을 SNS에 올리며 동기부여를 받아요.",
      "혼자 공부하는 것보다는 친구들과 함께 하거나, 온라인에서 학습 인증을 하면서 재미있게 공부하는 것을 선호해요.",
      "시각적으로 예쁘고 재미있는 학습 자료를 만드는 데 탁월하며, 다른 사람들에게도 공부에 대한 긍정적인 에너지를 전달해줘요.",
    ],
    studyTips: ["📸 학습 과정 기록", "🌈 컬러풀한 필기", "👥 온라인 스터디", "✨ 예쁜 문구 활용"],
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ISFP: {
    name: "아틀리에 암기러",
    emoji: "✍️",
    summary: "색감·손글씨·스티커로 예술 노트",
    description: [
      "노트 필기를 하나의 예술 작품처럼 만들어내는 당신! 아름다운 색감과 손글씨, 스티커로 세상에서 가장 예쁜 노트를 만들어요.",
      "시각적인 아름다움을 통해 학습 동기를 얻으며, 자신만의 감성적인 학습 공간을 만드는 것을 중요하게 생각해요.",
      "천천히 자신만의 페이스로 학습하며, 아름다운 노트를 만드는 과정에서 자연스럽게 내용을 기억하는 특별한 능력을 가지고 있어요.",
    ],
    studyTips: ["🎨 예술적 노트 필기", "🌈 색깔별 정리법", "✨ 스티커·데코 활용", "🕯️ 감성적 학습 공간"],
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ESTP: {
    name: "스퍼트 실행러",
    emoji: "⏱️",
    summary: "벼락치기 집중력 극강, 실전 문제로 승부",
    description: [
      "마감이 임박했을 때 발휘되는 극강의 집중력으로 단기간에 많은 것을 흡수하는 당신! 벼락치기의 달인이면서도 놀라운 성과를 내요.",
      "이론보다는 실전 문제를 풀면서 학습하는 것을 선호하며, 실제 시험 상황에서 강한 모습을 보여주는 실전형 학습자예요.",
      "압박감 속에서도 침착함을 유지하며, 짧은 시간 안에 핵심을 파악하는 놀라운 순발력을 가지고 있어요.",
    ],
    studyTips: ["⚡ 단기 집중 학습", "📝 실전 문제 위주", "⏰ 타이머 활용", "🎯 핵심 요약 정리"],
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISTP: {
    name: "독학 스나이퍼",
    emoji: "📚",
    summary: "최소 자료, 핵심만 저격 후 사라짐",
    description: [
      "불필요한 자료는 모두 제거하고 핵심만 골라서 효율적으로 학습하는 저격수 같은 당신! 최소한의 노력으로 최대한의 효과를 내요.",
      "혼자서 조용히 집중하는 것을 선호하며, 복잡한 설명보다는 간단명료한 핵심 정리를 좋아해요.",
      "자신만의 학습 방식을 고수하며, 다른 사람의 방해 없이 독립적으로 목표를 달성하는 놀라운 집중력을 가지고 있어요.",
    ],
    studyTips: ["🎯 핵심 요점 정리", "🤫 조용한 독학 환경", "📖 최소 자료 활용", "⚡ 효율성 극대화"],
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
  ESFJ: {
    name: "케어 스터디러",
    emoji: "🍩",
    summary: "간식·프린트 챙겨오며 모두 분위기 살림",
    description: [
      "스터디 그룹의 분위기 메이커! 맛있는 간식과 필요한 자료를 챙겨와서 모든 사람이 편안하게 공부할 수 있는 환경을 만들어줘요.",
      "다른 사람들의 학습 진도를 챙기고, 어려워하는 친구가 있으면 자연스럽게 도움을 주는 따뜻한 마음을 가지고 있어요.",
      "함께 공부하는 것을 좋아하며, 모든 사람이 목표를 달성할 수 있도록 응원하고 지원하는 팀워크의 달인이에요.",
    ],
    studyTips: ["🍪 간식으로 분위기 조성", "📋 자료 공유 시스템", "🤝 동료 학습 지원", "💝 격려와 응원"],
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ISFJ: {
    name: "안정 루틴러",
    emoji: "🕰️",
    summary: "같은 시간·같은 자리·같은 교재 습관",
    description: [
      "매일 같은 시간, 같은 장소에서 같은 방식으로 공부하는 안정적인 루틴의 소유자! 일관된 패턴을 통해 꾸준한 학습을 유지해요.",
      "급작스러운 변화보다는 예측 가능한 환경에서 최고의 집중력을 발휘하며, 차근차근 단계별로 학습을 진행해요.",
      "성실하고 꾸준한 노력으로 목표를 달성하며, 다른 사람들에게도 안정감을 주는 믿음직한 학습 파트너예요.",
    ],
    studyTips: ["⏰ 고정 학습 시간", "📍 전용 학습 공간", "📚 체계적 교재 활용", "📝 꾸준한 복습"],
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ESTJ: {
    name: "체계 모범러",
    emoji: "📈",
    summary: "표·그래프·리포트형 요약, 피드백 즉시 반영",
    description: [
      "모든 학습 내용을 표와 그래프로 체계화하고, 학습 진도를 리포트 형태로 관리하는 완벽주의자! 데이터 기반의 학습을 추구해요.",
      "피드백을 받으면 즉시 반영해서 개선하는 능력이 뛰어나며, 목표 달성을 위한 구체적인 실행 계획을 세우는 데 탁월해요.",
      "다른 사람들에게도 체계적인 학습 방법을 제안하고, 함께 성장할 수 있는 환경을 만드는 리더십을 발휘해요.",
    ],
    studyTips: ["📊 데이터 기반 관리", "📋 체계적 계획 수립", "📈 진도율 시각화", "🔄 피드백 즉시 반영"],
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ISTJ: {
    name: "원리 수호러",
    emoji: "📖",
    summary: "교과서적 방법 고수, 예외 없이 착실",
    description: [
      "검증된 교과서적 학습 방법을 고수하며, 예외 없이 착실하게 공부하는 전통적인 학습자! 기본기를 가장 중요하게 생각해요.",
      "새로운 방법보다는 오랫동안 효과가 입증된 학습법을 선호하며, 그 안에서 완벽함을 추구하는 장인 정신을 가지고 있어요.",
      "꾸준하고 성실한 노력으로 확실한 성과를 내며, 다른 사람들에게도 신뢰할 수 있는 학습 모델이 되어줘요.",
    ],
    studyTips: ["📚 교과서 중심 학습", "📝 기본기 반복 연습", "⏰ 규칙적인 학습", "🎯 착실한 진도 관리"],
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const resultId = searchParams.get("id")
  const { resolvedType, loading } = useResolvedResultType(Object.keys(studyCharacters), type, resultId)
  const mbtiType = (resolvedType as keyof typeof studyCharacters) || "ENFP"
  const character = studyCharacters[mbtiType]
  const faqItems = getTopicResultFAQs("Study MBTI Test", character.name)
  const resultUseCases = getTopicResultUseCases("Study MBTI Test", character.name)

  if (loading) {
    return <div>Loading...</div>
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${character.emoji} ${character.name}!`,
          text: `공부 스타일로 보는 MBTI 테스트 결과: ${character.summary}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 복사되었습니다!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <ResultFaqSchema quizTitle="Study MBTI Test" resultName={character.name} />
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
                  className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex justify-center space-x-4">
                <Button
                  size="lg"
                  onClick={handleShare}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  친구들에게 공유하기
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/study-mbti/test">
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
              <span>📚</span>
              <span>당신의 학습 스타일</span>
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

        {/* Study Tips */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💡</span>
              <span>나에게 맞는 공부법 TIP</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {character.studyTips.map((tip, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg"
                >
                  <span className="text-base font-medium">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🤝</span>
              <span>찰떡 스터디 메이트</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = studyCharacters[type as keyof typeof studyCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg text-center"
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

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🧭</span>
              <span>학습 스타일 결과를 활용하는 법</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              이 결과는 머리가 좋고 나쁨을 가르는 것이 아니라, 정보를 받아들이고 반복하고 정리하는 방식이 어디에 맞는지
              보여주는 학습 선호 해석입니다.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              지금까지 잘 풀렸던 과목이나 공부 루틴을 떠올렸을 때 비슷한 패턴이 반복된다면 이 결과는 실제 습관과 맞닿아
              있을 가능성이 큽니다.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              중요한 것은 결과를 그대로 따르기보다, 공부법 팁 중 바로 적용 가능한 한두 개만 먼저 실험해보는 것입니다.
              그렇게 해야 결과가 생산적인 루틴 개선으로 이어집니다.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Where This Result Becomes Useful</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resultUseCases.map((item) => (
              <p key={item} className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                {item}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">FAQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{item.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Other Tests */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🎯</span>
              <span>다른 MBTI 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  description: "커피 선택으로 보는 당신의 유형",
                  participants: "15.2K",
                },
                {
                  slug: "alarm-habit",
                  title: "알람 습관 MBTI",
                  emoji: "⏰",
                  description: "기상 패턴으로 알아보는 성격",
                  participants: "8.9K",
                },
              ].map((test) => (
                <Card key={test.slug} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{test.emoji}</div>
                    <h3 className="font-bold mb-2">{test.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                    <p className="text-xs text-muted-foreground mb-4">{test.participants}명 참여</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/${test.slug}`}>테스트 하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 다른 테스트하기 버튼 */}
        <div className="mb-6 sm:mb-8">
          <RelatedTestsSection testId="study-mbti" title="공부 습관과 함께 보면 좋은 퀴즈" />
        </div>

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

export default function StudyMBTIResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
