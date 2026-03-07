"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, RotateCcw, Heart, TrendingUp, Users, Sparkles, Home } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useResolvedResultType } from "@/hooks/use-resolved-result-type"

const characters = {
  princess: {
    name: "백설 에겐공주",
    emoji: "🍎💖",
    summary: "다정, 순수, 웃음, 공감",
    description: [
      "예쁜 건 그냥 좋아하는 순수파. 친구 울면 같이 울고, 웃으면 더 크게 웃음.",
      "분위기 메이커지만 가끔 속기 쉬움. '우리 그냥 같이 놀자~'로 싸움 중재.",
      "가족 모임에서 '사랑해요!' 제일 먼저 외침. 난장이 집에서 먼저 청소하고 '같이 먹자~'",
    ],
    dailyLife: [
      "친구들과 함께 있을 때 가장 행복해요",
      "작은 것에도 감동받고 기뻐해요",
      "다른 사람의 기분을 잘 알아채요",
      "갈등이 생기면 먼저 화해를 시도해요",
    ],
    strengths: [
      "순수한 마음으로 사람들에게 사랑받아요",
      "긍정적인 에너지로 분위기를 밝게 만들어요",
      "공감 능력이 뛰어나 좋은 친구가 되어줘요",
      "누구와도 쉽게 친해지는 친화력이 있어요",
    ],
    growthTips: [
      "가끔은 자신의 의견을 더 확실하게 표현해보세요",
      "모든 사람을 기쁘게 할 필요는 없어요",
      "순수함도 좋지만 현실적인 판단도 필요해요",
    ],
    compatibility: {
      best: { type: "prince", reason: "서로를 배려하고 이해하는 완벽한 조합이에요" },
      good: { type: "dwarf", reason: "체계적인 성향이 당신의 순수함을 잘 보완해줘요" },
    },
    famousCharacters: ["백설공주 (동화)", "신데렐라 (동화)", "라푼젤 (동화)"],
    lifeMotto: "세상은 아름답고, 사람들은 모두 좋은 마음을 가지고 있어요!",
    bgColor: "from-pink-100 to-rose-100",
    borderColor: "border-pink-300",
  },
  prince: {
    name: "에겐왕자",
    emoji: "🌹💙",
    summary: "착함, 배려, 든든, 다정",
    description: [
      "친구 먼저 챙기는 따뜻한 왕자님. 남을 도와주다 자기 일은 뒤로 밀림.",
      "무거운 짐 대신 들어줌. 친구 공부 도와주느라 자기 공부는 뒷전.",
      "숲속을 헤매며 끝까지 찾아주는 왕자. 항상 다른 사람을 먼저 생각하는 따뜻한 마음.",
    ],
    dailyLife: [
      "친구가 힘들어하면 가장 먼저 달려가요",
      "다른 사람을 돕는 것에서 보람을 느껴요",
      "자신보다 남을 먼저 배려해요",
      "조용하지만 든든한 존재감이 있어요",
    ],
    strengths: [
      "배려심이 깊어 주변 사람들에게 신뢰받아요",
      "책임감이 강해 맡은 일을 끝까지 해내요",
      "인내심이 있어 어려운 상황도 잘 견뎌요",
      "따뜻한 마음으로 사람들을 감동시켜요",
    ],
    growthTips: [
      "가끔은 자신을 먼저 챙기는 것도 필요해요",
      "모든 것을 혼자 해결하려 하지 마세요",
      "도움을 요청하는 것도 용기예요",
    ],
    compatibility: {
      best: { type: "princess", reason: "서로의 순수함과 따뜻함이 완벽하게 어울려요" },
      good: { type: "queen", reason: "강한 리더십이 당신의 배려심을 잘 이끌어줘요" },
    },
    famousCharacters: ["왕자님 (백설공주)", "야수 (미녀와 야수)", "알라딘 (알라딘)"],
    lifeMotto: "다른 사람을 돕는 것이 나의 행복이에요!",
    bgColor: "from-blue-100 to-cyan-100",
    borderColor: "border-blue-300",
  },
  queen: {
    name: "테토여왕",
    emoji: "👑⚡",
    summary: "결단력, 추진력, 리더십, 카리스마",
    description: [
      "결정 빠른 리더 타입. 친구들이 망설이면 먼저 '이렇게 하자!'",
      "놀이터에서 놀이 먼저 정함. 프로젝트 시작 전에 역할 먼저 나눔.",
      "거울에게도 '빨리 말해!'라고 다그치는 여왕. 효율적이고 추진력 있는 리더.",
    ],
    dailyLife: [
      "빠른 결정력으로 일을 추진해요",
      "목표가 생기면 바로 실행에 옮겨요",
      "그룹에서 자연스럽게 리더 역할을 해요",
      "명확한 기준과 원칙을 가지고 있어요",
    ],
    strengths: [
      "강한 리더십으로 팀을 이끌어요",
      "빠른 의사결정으로 효율을 높여요",
      "자신감 있는 태도로 신뢰를 얻어요",
      "목표 지향적이고 성취욕이 강해요",
    ],
    growthTips: [
      "가끔은 다른 사람의 의견도 들어보세요",
      "완벽함을 추구하다 스트레스받지 마세요",
      "부드러운 소통도 리더십의 일부예요",
    ],
    compatibility: {
      best: { type: "dwarf", reason: "체계적인 실행력이 당신의 비전을 현실로 만들어줘요" },
      good: { type: "prince", reason: "따뜻한 배려가 당신의 강한 면을 부드럽게 해줘요" },
    },
    famousCharacters: ["여왕 (백설공주)", "말레피센트 (잠자는 숲속의 공주)", "우르술라 (인어공주)"],
    lifeMotto: "최고가 되기 위해서는 최선을 다해야 해요!",
    bgColor: "from-purple-100 to-violet-100",
    borderColor: "border-purple-300",
  },
  dwarf: {
    name: "난장이 테토남",
    emoji: "📋💪",
    summary: "리더십, 책임, 실행, 분담",
    description: [
      "모임 시작하면 '너는 이거, 나는 이거!' 역할 분담. 일이 빨리 굴러가지만 가끔 너무 성급.",
      "청소할 때 '너 바닥, 나는 창문'. 블록 놀이 때도 역할 나눔.",
      "난장이들 앞에서 화이트보드 꺼내며 '분담표 만들자!' 체계적이고 실행력 있는 조직가.",
    ],
    dailyLife: [
      "일을 시작하기 전에 계획을 세워요",
      "역할 분담과 시스템을 중요하게 생각해요",
      "효율적인 방법을 찾는 것을 좋아해요",
      "책임감 있게 맡은 일을 완수해요",
    ],
    strengths: [
      "체계적인 계획으로 일을 효율적으로 처리해요",
      "팀워크를 중요하게 생각하고 협력을 이끌어내요",
      "실행력이 뛰어나 계획을 현실로 만들어요",
      "책임감이 강해 신뢰받는 사람이에요",
    ],
    growthTips: [
      "가끔은 즉흥적인 것도 즐겨보세요",
      "완벽한 계획이 아니어도 괜찮아요",
      "유연성을 가지고 상황에 대처해보세요",
    ],
    compatibility: {
      best: { type: "queen", reason: "강한 리더십과 실행력이 완벽한 시너지를 만들어요" },
      good: { type: "princess", reason: "순수한 에너지가 당신의 체계적인 면을 부드럽게 해줘요" },
    },
    famousCharacters: ["일곱 난장이 (백설공주)", "지니 (알라딘)", "티몬과 품바 (라이온 킹)"],
    lifeMotto: "계획과 실행, 그리고 팀워크가 성공의 열쇠예요!",
    bgColor: "from-yellow-100 to-amber-100",
    borderColor: "border-yellow-300",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const resultId = searchParams.get("id")
  const { resolvedType, loading } = useResolvedResultType(Object.keys(characters), type, resultId)
  const resultType = (resolvedType as keyof typeof characters) || "princess"
  const character = characters[resultType]

  if (loading) {
    return <div>Loading...</div>
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${character.emoji} ${character.name}!`,
          text: `백설공주 에겐테토 테스트 결과: ${character.summary}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 복사되었습니다!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Character Card */}
        <Card className={`border-0 shadow-2xl bg-gradient-to-br ${character.bgColor} mb-8`}>
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4 animate-bounce">{character.emoji}</div>

              <div>
                <Badge variant="secondary" className={`mb-4 ${character.bgColor} ${character.borderColor} border-2`}>
                  {resultType.toUpperCase()}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-gray-700 font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  size="lg"
                  onClick={handleShare}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  친구들에게 공유하기
                </Button>
                <Button variant="outline" size="lg" asChild className="bg-white">
                  <Link href="/tests/snowwhite-mbti/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="bg-white">
                  <Link href="/">
                    <Home className="h-5 w-5 mr-2" />
                    홈으로
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>✨</span>
              <span>당신의 성격</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.description.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Daily Life */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🌟</span>
              <span>일상 속 모습</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {character.dailyLife.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 bg-gradient-to-br ${character.bgColor} rounded-lg border-2 ${character.borderColor}`}
                >
                  <span className="text-base font-medium text-gray-800">• {item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <span>당신의 장점</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {character.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-500 text-xl mt-0.5">✓</span>
                  <span className="text-base leading-relaxed">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-orange-600" />
              <span>성장 포인트</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {character.growthTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="text-orange-500 text-xl mt-0.5">💡</span>
                  <span className="text-base leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-600" />
              <span>궁합</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`p-5 bg-gradient-to-br ${character.bgColor} rounded-lg border-2 ${character.borderColor}`}>
              <p className="font-bold text-lg text-gray-800 mb-2">
                💕 최고의 궁합: {characters[character.compatibility.best.type as keyof typeof characters].name}
              </p>
              <p className="text-gray-700">{character.compatibility.best.reason}</p>
            </div>
            <div className={`p-5 bg-gradient-to-br ${character.bgColor} rounded-lg border-2 ${character.borderColor}`}>
              <p className="font-bold text-lg text-gray-800 mb-2">
                💖 좋은 궁합: {characters[character.compatibility.good.type as keyof typeof characters].name}
              </p>
              <p className="text-gray-700">{character.compatibility.good.reason}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Users className="h-6 w-6 text-violet-600" />
              <span>비슷한 동화 캐릭터</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {character.famousCharacters.map((char, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 bg-gradient-to-br ${character.bgColor} rounded-full text-base font-medium text-gray-800 border-2 ${character.borderColor}`}
                >
                  {char}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-xl bg-gradient-to-br ${character.bgColor} mb-8`}>
          <CardContent className="p-8 text-center">
            <p className="text-xl md:text-2xl font-bold text-gray-800 mb-2">💬 인생 좌우명</p>
            <p className="text-lg md:text-xl text-gray-700 italic">"{character.lifeMotto}"</p>
          </CardContent>
        </Card>

        {/* Meme Phrase */}
        <Card className={`border-0 shadow-xl bg-gradient-to-br ${character.bgColor} mb-8`}>
          <CardContent className="p-8 text-center">
            <p className="text-2xl md:text-3xl font-bold text-gray-800">
              나는 {character.name}래 {character.emoji}
            </p>
          </CardContent>
        </Card>

        {/* Other Tests */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
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
                  slug: "kdrama-mbti",
                  title: "K-드라마 클리셰",
                  emoji: "🎬",
                  description: "드라마 속 나는 어떤 캐릭터?",
                  participants: "15.3K",
                },
                {
                  slug: "kpop-idol",
                  title: "K-팝 아이돌 포지션",
                  emoji: "🎤",
                  description: "아이돌 그룹에서 나의 포지션은?",
                  participants: "18.7K",
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

export default function SnowWhiteMBTIResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
