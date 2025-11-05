"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Share2, RotateCcw, Home, Heart, TrendingUp, Users, Sparkles } from "lucide-react"
import { Suspense } from "react"

const results = {
  chaebol: {
    title: "재벌남/여 클리셰",
    emoji: "🏢💸",
    description: "카리스마 넘치고 상황을 주도하는 당신!",
    keywords: ["카리스마", "리더십", "쿨함", "주도적"],
    personality:
      "당신은 드라마 속 재벌 캐릭터처럼 강한 카리스마와 리더십을 가지고 있습니다. 어떤 상황에서도 주도권을 잡고, 쿨하게 문제를 해결하는 스타일이에요. 결정을 내릴 때 망설임이 없고, 자신의 선택에 책임을 지는 모습이 매력적입니다.",
    daily:
      '일상에서도 결정을 빠르게 내리고, 주변 사람들을 이끄는 역할을 자주 맡습니다. "내가 해결할게"라는 말을 자주 하는 편이죠. 친구들이 고민할 때 명쾌한 해결책을 제시하고, 그룹 프로젝트에서는 자연스럽게 리더 역할을 맡게 됩니다.',
    drama:
      "드라마에서는 주인공을 구하고, 멋진 대사를 날리며, 슬로모션으로 등장하는 그 캐릭터! 바로 당신입니다. 헬기를 타고 나타나거나, 검은 카드를 꺼내며 모든 문제를 해결하는 장면이 딱 어울려요.",
    meme: '"내 카드 줄게, 마음도 줄까?"',
    strengths: [
      "빠른 의사결정 능력으로 위기 상황을 돌파해요",
      "강한 책임감으로 맡은 일을 완벽하게 처리해요",
      "자신감 있는 태도로 주변 사람들에게 신뢰를 줘요",
      "목표 지향적이고 성취욕이 강해요",
    ],
    weaknesses: [
      "가끔 너무 독단적으로 보일 수 있어요",
      "감정 표현이 서툴러 차갑게 느껴질 수 있어요",
      "완벽주의 성향으로 스트레스를 받기도 해요",
    ],
    compatibility: {
      best: { type: "pure", reason: "순수한 첫사랑 타입이 당신의 차가운 면을 녹여줘요" },
      good: { type: "gukbap", reason: "현실적인 조언으로 당신의 결정을 뒷받침해줘요" },
    },
    famousCharacters: ["김탄 (상속자들)", "이영준 (김비서가 왜 그럴까)", "구준표 (꽃보다 남자)"],
    advice:
      "가끔은 완벽함을 내려놓고 주변 사람들의 의견에 귀 기울여보세요. 당신의 강한 카리스마도 좋지만, 부드러운 모습을 보여줄 때 더 매력적이에요. 감정 표현을 조금만 더 해보면 인간관계가 더욱 풍요로워질 거예요.",
    color: "from-slate-500 to-gray-700",
    bgColor: "bg-gradient-to-br from-slate-50 to-gray-100",
  },
  pure: {
    title: "첫사랑 순정파",
    emoji: "💕😭",
    description: "감정적이고 순수한 당신!",
    keywords: ["순수함", "감성적", "로맨틱", "진심"],
    personality:
      "당신은 드라마 속 첫사랑 캐릭터처럼 순수하고 감정이 풍부합니다. 사랑에 진심이고, 작은 것에도 감동하는 감성적인 스타일이에요. 사람들과의 관계에서 진정성을 가장 중요하게 생각하며, 한번 마음을 주면 오래도록 기억하는 타입입니다.",
    daily:
      "일상에서도 감정 표현이 솔직하고, 사람들과의 관계에서 진심을 다합니다. 눈물도 많고, 웃음도 많은 편이죠. 친구의 작은 선물에도 감동받고, 영화나 드라마를 보면 주인공의 감정에 완전히 몰입해요.",
    drama:
      "드라마에서는 비 오는 날 우산 아래서 심쿵하고, 첫사랑을 평생 기억하는 그 캐릭터! 바로 당신입니다. 운명적인 만남을 믿고, 사랑을 위해서라면 모든 것을 포기할 수 있는 순수한 마음의 소유자예요.",
    meme: '"우리 다시 만난 것도 운명일까?"',
    strengths: [
      "진심 어린 태도로 사람들에게 신뢰를 받아요",
      "공감 능력이 뛰어나 좋은 친구가 되어줘요",
      "순수한 마음으로 세상을 아름답게 바라봐요",
      "한번 시작한 관계를 소중히 여기고 오래 유지해요",
    ],
    weaknesses: [
      "감정 기복이 심해 힘들어할 때가 있어요",
      "너무 순수해서 상처받기 쉬워요",
      "현실적인 판단보다 감정에 치우칠 수 있어요",
    ],
    compatibility: {
      best: { type: "chaebol", reason: "강한 카리스마가 당신을 지켜주고 안정감을 줘요" },
      good: { type: "comic", reason: "밝은 에너지로 당신의 우울함을 날려줘요" },
    },
    famousCharacters: ["은채영 (도깨비)", "천송이 (별에서 온 그대)", "고하니 (장난스런 키스)"],
    advice:
      "당신의 순수함은 큰 장점이지만, 가끔은 현실적인 판단도 필요해요. 모든 사람에게 마음을 열기보다는 진짜 소중한 사람들에게 집중해보세요. 감정에 휘둘리지 않도록 자신만의 중심을 잡는 것도 중요해요.",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-100",
  },
  comic: {
    title: "코믹 서브",
    emoji: "😂🎭",
    description: "드라마의 분위기 메이커!",
    keywords: ["유머", "밝음", "긍정적", "재치"],
    personality:
      "당신은 드라마 속 코믹 서브 캐릭터처럼 분위기를 밝게 만드는 재치있는 사람입니다. 어떤 상황에서도 웃음을 잃지 않는 긍정적인 스타일이에요. 힘든 순간에도 유머로 상황을 반전시키고, 주변 사람들에게 에너지를 주는 특별한 능력이 있어요.",
    daily:
      "일상에서도 주변 사람들을 웃게 만들고, 무거운 분위기를 가볍게 만드는 역할을 합니다. 친구들 사이에서 인기가 많죠. 모임에서 빠지면 '재미없다'는 말이 나올 정도로 분위기 메이커 역할을 톡톡히 해내요.",
    drama:
      "드라마에서는 주인공의 든든한 친구로, 웃긴 상황을 만들어내고, 시청자들에게 웃음을 선사하는 그 캐릭터! 바로 당신입니다. 진지한 장면에서도 한마디로 분위기를 바꾸는 타이밍의 달인이에요.",
    meme: '"난 네 옆에서 웃겨주는 게 행복해~"',
    strengths: [
      "긍정적인 에너지로 주변을 밝게 만들어요",
      "사교성이 좋아 누구와도 잘 어울려요",
      "스트레스 상황에서도 유머로 극복해요",
      "눈치가 빨라 분위기를 잘 파악해요",
    ],
    weaknesses: [
      "진지한 대화가 필요할 때도 농담으로 넘기려 해요",
      "자신의 진짜 감정을 숨기는 경향이 있어요",
      "가끔 과한 장난으로 오해를 살 수 있어요",
    ],
    compatibility: {
      best: { type: "crying", reason: "감성적인 타입에게 웃음과 위로를 동시에 줘요" },
      good: { type: "pure", reason: "순수한 타입과 함께하면 더 밝은 에너지가 나와요" },
    },
    famousCharacters: ["봉순 (힘쎈여자 봉순)", "최애라 (응답하라 1988)", "공기봉 (쌈 마이웨이)"],
    advice:
      "당신의 밝은 에너지는 정말 소중해요. 하지만 가끔은 진지한 모습도 보여주세요. 항상 웃고 있을 필요는 없어요. 힘들 때는 힘들다고 말하고, 진심을 나누는 것도 관계를 더 깊게 만드는 방법이에요.",
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-100",
  },
  crying: {
    title: "눈물 폭발형",
    emoji: "😭💧",
    description: "사소한 일에도 오열하는 당신!",
    keywords: ["감성", "공감", "눈물", "진정성"],
    personality:
      "당신은 드라마 속 눈물 많은 캐릭터처럼 감정이 풍부하고 공감 능력이 뛰어납니다. 사소한 일에도 눈물이 나고, 다른 사람의 아픔에 함께 울어주는 스타일이에요. 감정을 숨기지 않고 솔직하게 표현하는 것이 당신의 가장 큰 매력입니다.",
    daily:
      "일상에서도 영화나 드라마를 보면 쉽게 울고, 친구의 고민을 들으면 함께 눈물을 흘립니다. 감정 표현이 솔직한 편이죠. 감동적인 광고만 봐도 눈물이 나고, 길에서 귀여운 강아지를 봐도 울컥해요.",
    drama:
      "드라마에서는 매 회마다 울고, 시청자들의 눈물샘을 자극하는 그 캐릭터! 바로 당신입니다. 슬픈 장면에서는 물론이고, 행복한 장면에서도 감동의 눈물을 흘리는 감성 충만한 타입이에요.",
    meme: '"울고 또 울고 또 울고…"',
    strengths: [
      "공감 능력이 뛰어나 좋은 상담자가 되어줘요",
      "감정 표현이 솔직해서 진정성이 느껴져요",
      "다른 사람의 아픔을 이해하고 위로해줘요",
      "감수성이 풍부해 예술적 재능이 있어요",
    ],
    weaknesses: [
      "감정 기복이 심해 힘들어할 때가 많아요",
      "작은 일에도 크게 상처받을 수 있어요",
      "눈물이 많아 오해를 받기도 해요",
    ],
    compatibility: {
      best: { type: "comic", reason: "밝은 에너지로 당신의 눈물을 웃음으로 바꿔줘요" },
      good: { type: "gukbap", reason: "현실적인 조언으로 당신을 안정시켜줘요" },
    },
    famousCharacters: ["고은찬 (커피프린스 1호점)", "김미소 (그녀는 예뻤다)", "나봉선 (오 나의 귀신님)"],
    advice:
      "당신의 풍부한 감성은 큰 장점이에요. 하지만 모든 감정에 휘둘릴 필요는 없어요. 가끔은 한 발짝 물러서서 상황을 객관적으로 바라보는 연습을 해보세요. 눈물도 좋지만, 웃음도 함께 나누면 더 행복해질 거예요.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
  },
  gukbap: {
    title: "국밥 든든 조연",
    emoji: "🍲🤝",
    description: "현실적이고 든든한 당신!",
    keywords: ["현실적", "든든함", "실용적", "충성"],
    personality:
      "당신은 드라마 속 든든한 조연 캐릭터처럼 현실적이고 실용적입니다. 화려한 것보다는 실속을 챙기고, 주변 사람들을 든든하게 지켜주는 스타일이에요. 로맨스보다는 우정을, 환상보다는 현실을 중요하게 생각하는 믿음직한 사람입니다.",
    daily:
      '일상에서도 실용적인 선택을 하고, 친구들에게 현실적인 조언을 해줍니다. "국밥이나 먹자"는 말을 자주 하죠. 비싼 레스토랑보다는 맛있는 국밥집을, 화려한 선물보다는 실용적인 선물을 선호해요.',
    drama:
      "드라마에서는 주인공의 든든한 친구로, 현실적인 조언을 해주고, 위기 상황에서 실질적인 도움을 주는 그 캐릭터! 바로 당신입니다. 주인공이 사랑 때문에 고민할 때 '밥이나 먹자'며 현실로 돌려놓는 역할이에요.",
    meme: '"국밥 한 그릇이면 다 된다."',
    strengths: [
      "현실적인 판단력으로 실수를 줄여요",
      "실용적인 해결책을 잘 찾아내요",
      "믿음직하고 의리가 있어요",
      "검소하고 알뜰한 생활 습관을 가지고 있어요",
    ],
    weaknesses: [
      "가끔 너무 현실적이라 재미없어 보일 수 있어요",
      "로맨틱한 상황에서 분위기를 깰 수 있어요",
      "새로운 시도보다는 안전한 선택을 선호해요",
    ],
    compatibility: {
      best: { type: "chaebol", reason: "당신의 현실적인 조언이 리더에게 큰 도움이 돼요" },
      good: { type: "crying", reason: "감성적인 타입에게 안정감을 줘요" },
    },
    famousCharacters: ["라미란 (응답하라 1988)", "성동일 (응답하라 시리즈)", "김성균 (슬기로운 의사생활)"],
    advice:
      "당신의 현실적인 태도는 정말 소중해요. 하지만 가끔은 로맨틱한 순간도 즐겨보세요. 모든 것을 실용성으로만 판단하지 말고, 때로는 감성적인 선택도 해보면 인생이 더 풍요로워질 거예요.",
    color: "from-amber-600 to-orange-700",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-100",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "chaebol"
  const result = results[type as keyof typeof results]

  const handleShare = async () => {
    const shareText = `나는 ${result.emoji} ${result.title}! K-드라마 클리셰 테스트 결과: ${result.description}`
    const shareUrl = window.location.href
    const fullShareText = `${shareText}

${shareUrl}`

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(fullShareText)
        alert("공유 메시지가 복사되었습니다! 친구들에게 붙여넣기 해보세요 📋✨")
      } else {
        // Fallback: textarea 사용
        const textarea = document.createElement('textarea')
        textarea.value = fullShareText
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        alert("공유 메시지가 복사되었습니다! 친구들에게 붙여넣기 해보세요 📋✨")
      }
    } catch (err) {
      console.error('복사 실패:', err)
      alert('복사에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className={`min-h-screen ${result.bgColor} py-12`}>
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 md:p-12 shadow-xl border-2 border-pink-200 bg-white/90 backdrop-blur">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4 animate-bounce">{result.emoji}</div>
            <h1
              className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}
            >
              {result.title}
            </h1>
            <p className="text-xl text-gray-700 font-medium mb-6">{result.description}</p>
            
            {/* 상단 공유 버튼 */}
            <Button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
            >
              <Share2 className="mr-2 h-5 w-5" />
              친구들에게 공유하기
            </Button>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">🎯 키워드</h3>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-pink-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">💫 성격</h3>
              <p className="text-gray-700 leading-relaxed">{result.personality}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-pink-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">🌟 일상</h3>
              <p className="text-gray-700 leading-relaxed">{result.daily}</p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg border border-rose-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">🎬 드라마 속 나</h3>
              <p className="text-gray-700 leading-relaxed">{result.drama}</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                장점
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                보완할 점
              </h3>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg border border-rose-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                궁합
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-rose-100">
                  <p className="font-semibold text-rose-600 mb-1">
                    최고의 궁합: {results[result.compatibility.best.type as keyof typeof results].title}
                  </p>
                  <p className="text-sm text-gray-600">{result.compatibility.best.reason}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-pink-100">
                  <p className="font-semibold text-pink-600 mb-1">
                    좋은 궁합: {results[result.compatibility.good.type as keyof typeof results].title}
                  </p>
                  <p className="text-sm text-gray-600">{result.compatibility.good.reason}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-lg border border-violet-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                <Users className="h-5 w-5" />
                비슷한 드라마 캐릭터
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.famousCharacters.map((character, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-violet-200"
                  >
                    {character}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">💡 조언</h3>
              <p className="text-gray-700 leading-relaxed">{result.advice}</p>
            </div>

            <div className={`bg-gradient-to-r ${result.color} p-6 rounded-lg text-white text-center`}>
              <p className="text-2xl font-bold mb-2">대표 밈</p>
              <p className="text-xl italic">{result.meme}</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* 하단 공유 버튼 */}
            <Button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Share2 className="mr-2 h-5 w-5" />
              친구들에게 공유하기
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/tests/kdrama-mbti/test" className="block">
                <Button
                  variant="outline"
                  className="w-full border-2 border-purple-300 hover:bg-purple-50 font-medium py-6 bg-transparent"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  다시 하기
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button
                  variant="outline"
                  className="w-full border-2 border-pink-300 hover:bg-pink-50 font-medium py-6 bg-transparent"
                >
                  <Home className="mr-2 h-4 w-4" />
                  홈으로
                </Button>
              </Link>
            </div>

            <Link href="/tests" className="block">
              <Button
                variant="outline"
                className="w-full border-2 border-cyan-300 hover:bg-cyan-50 font-medium py-6 bg-transparent mt-3"
              >
                다른 테스트하기
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function KDramaMBTIResult() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎬</div>
            <p className="text-xl text-gray-600">결과 분석 중...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
