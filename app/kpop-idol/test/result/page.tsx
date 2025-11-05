"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Share2, RotateCcw, Home, Sparkles, TrendingUp, Users, Star, Heart } from "lucide-react"
import { Suspense } from "react"

const results = {
  leader: {
    title: "카리스마 리더",
    emoji: "🫡✨",
    subtitle: '"내가 없으면 이 팀은 흩어진다!"',
    description: "상황이 꼬여도 책임지고 정리하는 든든한 리더",
    keywords: ["리더십", "책임감", "카리스마", "중재"],
    characteristic:
      "상황이 꼬여도 책임지고 정리하는 든든한 리더. 무대 위에서는 강렬하지만, 사실 숙소에서는 잔소리 담당.",
    scene: "연습실에서 땀 뻘뻘 흘리며 모두를 다잡는 모습. 팬들이 '리더님 덕분에 안심돼요~'라고 말할 때 은근 뿌듯.",
    meme: "🥘 연습 끝나고 팀원들한테 국밥 사주는 모습 → '리더는 결국 밥 리더!'",
    reality: "당신은 실제 모임이나 직장에서도 사람들이 은근히 기댈 만한 사람! (단, 너무 책임지려다 지치지 않게 주의)",
    strengths: [
      "위기 상황에서 빛나는 판단력과 결단력",
      "팀원들의 의견을 조율하고 하나로 모으는 능력",
      "무대 위에서 팀 전체를 이끄는 카리스마",
      "책임감 있게 끝까지 해내는 추진력",
    ],
    weaknesses: [
      "모든 걸 혼자 책임지려다 번아웃 위험",
      "팀원들 챙기느라 정작 자신은 소홀히 할 수 있음",
      "완벽주의 성향으로 스트레스 받기 쉬움",
    ],
    compatibility: {
      best: "메인 보컬",
      reason: "리더의 든든함과 메인 보컬의 열정이 만나면 무대를 완벽하게 장악할 수 있어요!",
      good: "4차원 막내",
      goodReason: "리더의 진지함을 막내의 엉뚱함이 풀어주면서 팀 분위기가 최고가 됩니다.",
    },
    similarIdols: [
      "방탄소년단 RM - 지적이고 카리스마 넘치는 리더십",
      "블랙핑크 지수 - 따뜻하면서도 책임감 있는 언니",
      "세븐틴 에스쿱스 - 13명을 하나로 모으는 든든한 리더",
      "레드벨벳 아이린 - 완벽한 프로페셔널리즘",
    ],
    advice:
      "리더는 혼자 모든 걸 짊어지는 사람이 아니라, 팀원들의 강점을 끌어내는 사람입니다. 가끔은 내려놓고 팀을 믿어보세요!",
    motto: '"함께 가면 더 멀리 갈 수 있다"',
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-indigo-100",
  },
  vocal: {
    title: "메인 보컬",
    emoji: "🎤🔥",
    subtitle: '"노래 한 소절이면 무대 씹어먹는다!"',
    description: "감정 표현력 끝판왕, 마이크 잡는 순간 모두 집중",
    keywords: ["고음", "감정표현", "집중력", "열정"],
    characteristic: "감정 표현력 끝판왕. 마이크 잡는 순간 모두 집중. 하지만 가끔은 고음 욕심 때문에 목 나가는 스타일.",
    scene: "드라마틱한 조명 속에서 고음 지르는 순간, 팬들이 눈물 터뜨림.",
    meme: "🎶 노래방 가면 꼭 '사랑과 전쟁 OST' 부르면서 과몰입.",
    reality: "발표, PT, 스피치에서 카리스마 뿜뿜. (단, 과하게 몰입하면 오그라들 수 있음 😆)",
    strengths: [
      "감정을 목소리로 완벽하게 전달하는 표현력",
      "무대 위에서 관객을 사로잡는 집중력",
      "끊임없이 연습하고 발전하려는 열정",
      "하이라이트 파트에서 무대를 장악하는 능력",
    ],
    weaknesses: [
      "완벽주의 때문에 자신에게 너무 가혹할 수 있음",
      "고음 욕심으로 목 관리 소홀하기 쉬움",
      "감정 과몰입으로 에너지 소진 빠름",
    ],
    compatibility: {
      best: "카리스마 리더",
      reason: "리더의 안정감 속에서 메인 보컬의 실력이 더욱 빛을 발합니다!",
      good: "비주얼",
      goodReason: "보컬의 감성과 비주얼의 존재감이 만나면 완벽한 무대가 완성됩니다.",
    },
    similarIdols: [
      "태연 (소녀시대) - 감정 표현의 정석",
      "정국 (방탄소년단) - 만능 황금 보컬",
      "로제 (블랙핑크) - 독보적인 음색과 감성",
      "도겸 (세븐틴) - 무대를 휘어잡는 파워 보컬",
    ],
    advice:
      "당신의 목소리는 사람들의 마음을 움직이는 힘이 있어요. 하지만 완벽함보다 진심이 더 중요하다는 걸 기억하세요!",
    motto: '"노래는 기술이 아니라 마음을 전하는 것"',
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-100",
  },
  dancer: {
    title: "메인 댄서",
    emoji: "🕺💥",
    subtitle: '"무대 위의 중심은 나다!"',
    description: "음악 나오면 자동 반사, 댄스 브레이크만 오면 시선 싹쓸이",
    keywords: ["춤", "에너지", "카리스마", "중심"],
    characteristic: "음악 나오면 자동 반사. 댄스 브레이크만 오면 시선 싹쓸이.",
    scene: "콘서트에서 솔로 댄스 중, 바닥에 드라마틱하게 구르는 장면.",
    meme: "🕺 가족 모임에서도 음악만 나오면 춤추다가 혼남.",
    reality: "에너지 넘치고 분위기 주도 잘함. (단, 너무 오버하면 주변에서 당황 가능 😂)",
    strengths: [
      "음악만 나오면 몸이 자동으로 반응하는 타고난 리듬감",
      "댄스 브레이크에서 무대를 완전히 장악하는 존재감",
      "끊임없는 연습으로 완벽한 칼군무 완성",
      "에너지 넘치는 퍼포먼스로 관객 열광시키기",
    ],
    weaknesses: [
      "춤에 집중하다 보면 표정 관리 놓치기 쉬움",
      "과한 에너지로 체력 소진 빠름",
      "완벽한 동작에 집착해서 스트레스 받을 수 있음",
    ],
    compatibility: {
      best: "4차원 막내",
      reason: "댄서의 에너지와 막내의 엉뚱함이 만나면 무대가 더욱 재미있어집니다!",
      good: "메인 보컬",
      goodReason: "댄서의 퍼포먼스와 보컬의 감성이 조화를 이루면 완벽한 무대가 됩니다.",
    },
    similarIdols: [
      "제이홉 (방탄소년단) - 에너지 폭발 댄스 머신",
      "리사 (블랙핑크) - 무대를 찢는 파워풀한 댄서",
      "호시 (세븐틴) - 퍼포먼스 팀의 중심",
      "효연 (소녀시대) - 카리스마 넘치는 메인 댄서",
    ],
    advice:
      "당신의 춤은 사람들에게 에너지를 전달합니다. 하지만 완벽한 동작보다 즐기는 모습이 더 멋있다는 걸 잊지 마세요!",
    motto: '"춤은 몸으로 말하는 언어다"',
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100",
  },
  visual: {
    title: "비주얼",
    emoji: "✨📸",
    subtitle: '"카메라는 결국 나를 찾는다!"',
    description: "무대 위 1초 등장만으로 팬덤 들썩, 뭘 해도 그림이 됨",
    keywords: ["비주얼", "존재감", "화보", "매력"],
    characteristic: "무대 위 1초 등장만으로 팬덤 들썩. 뭘 해도 그림이 됨.",
    scene: "무대 끝나고 땀 닦는 모습조차 화보처럼 보임.",
    meme: "📸 지하철 셀카 찍었는데 우연히 광고판보다 잘 나옴.",
    reality: "어디서든 주목 받는 존재감. (단, 자기애 폭발하면 '자아도취형' 소리 들을 수도 있음 🤭)",
    strengths: [
      "어디서든 시선을 사로잡는 타고난 존재감",
      "카메라 앞에서 자연스럽게 빛나는 능력",
      "패션과 스타일링 감각이 뛰어남",
      "첫인상으로 팬들의 마음을 사로잡는 힘",
    ],
    weaknesses: [
      "외모에만 집중되어 실력이 저평가될 수 있음",
      "과도한 관심으로 인한 부담감",
      "자기 관리 압박이 스트레스가 될 수 있음",
    ],
    compatibility: {
      best: "메인 보컬",
      reason: "비주얼의 존재감과 보컬의 실력이 만나면 완벽한 조합이 됩니다!",
      good: "카리스마 리더",
      goodReason: "리더의 안정감 속에서 비주얼이 더욱 빛을 발할 수 있습니다.",
    },
    similarIdols: [
      "진 (방탄소년단) - 월드와이드 핸섬",
      "지수 (블랙핑크) - 우아하고 완벽한 비주얼",
      "차은우 (아스트로) - 화보 찢는 비주얼",
      "윈터 (에스파) - 독보적인 청순 비주얼",
    ],
    advice: "외모는 당신의 무기지만 전부가 아닙니다. 내면의 매력과 실력을 함께 키워나가면 진정한 스타가 될 수 있어요!",
    motto: '"진정한 아름다움은 자신감에서 나온다"',
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-gradient-to-br from-rose-50 to-pink-100",
  },
  maknae: {
    title: "4차원 막내",
    emoji: "🐣🤣",
    subtitle: '"내가 바로 팀의 비타민이자 골칫덩이!"',
    description: "무슨 말 할지 아무도 모름, 팬들은 귀여워 미치고 멤버들은 속 터짐",
    keywords: ["4차원", "귀여움", "엉뚱함", "비타민"],
    characteristic: "무슨 말 할지 아무도 모름. 팬들은 귀여워 미치고, 멤버들은 속 터짐.",
    scene: "팬사인회에서 팬한테 갑자기 '오늘 저녁 뭐 드셨어요?' 하고 혼자 빵 터짐.",
    meme: "🐣 인터뷰 중 갑자기 국밥 얘기 꺼내는 캐릭터.",
    reality: "사람들 웃게 만들고 분위기 풀어주는 능력자. (단, 너무 엉뚱하면 진지한 자리에서 민망할 수 있음 😅)",
    strengths: [
      "어떤 분위기도 순식간에 풀어버리는 능력",
      "예상 못한 행동으로 사람들을 웃게 만듦",
      "순수하고 솔직한 매력으로 팬들 사로잡기",
      "팀의 긴장감을 해소하는 비타민 같은 존재",
    ],
    weaknesses: [
      "진지한 상황에서도 장난치다가 혼날 수 있음",
      "엉뚱한 행동이 오해를 불러일으킬 수 있음",
      "막내라는 이유로 실력이 저평가될 수 있음",
    ],
    compatibility: {
      best: "카리스마 리더",
      reason: "리더의 진지함과 막내의 엉뚱함이 만나면 팀 밸런스가 완벽해집니다!",
      good: "메인 댄서",
      goodReason: "댄서의 에너지와 막내의 재미가 만나면 무대가 더욱 즐거워집니다.",
    },
    similarIdols: [
      "정국 (방탄소년단) - 황금막내의 정석",
      "아이유 - 국민 여동생에서 아티스트로",
      "니키 (엔하이픈) - 4차원 매력 폭발",
      "해린 (뉴진스) - 고양이상 4차원 막내",
    ],
    advice: "당신의 엉뚱함은 팀의 소중한 자산입니다. 하지만 때로는 진지함도 필요하다는 걸 기억하세요. 균형이 중요해요!",
    motto: '"웃음은 세상에서 가장 강력한 무기"',
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-100",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "leader"
  const result = results[type as keyof typeof results]

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${result.title}!`,
          text: `K-팝 아이돌 포지션 테스트 결과: ${result.title} - ${result.subtitle}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("공유 취소됨")
      }
    } else {
      alert("이 브라우저는 공유 기능을 지원하지 않습니다.")
    }
  }

  return (
    <div className={`min-h-screen ${result.bgColor} py-12`}>
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 md:p-12 shadow-xl border-2 border-purple-200 bg-white/90 backdrop-blur">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4 animate-bounce">{result.emoji}</div>
            <h1
              className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}
            >
              {result.title}
            </h1>
            <p className="text-xl text-gray-700 font-medium mb-2">{result.description}</p>
            <p className="text-lg text-gray-600 italic">{result.subtitle}</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">🎯 키워드</h3>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-purple-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg border border-pink-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">💫 특징</h3>
              <p className="text-gray-700 leading-relaxed">{result.characteristic}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">🌟 대표 장면</h3>
              <p className="text-gray-700 leading-relaxed">{result.scene}</p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">😂 병맛 밈</h3>
              <p className="text-gray-700 leading-relaxed">{result.meme}</p>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg border border-rose-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800">🎯 현실 적용</h3>
              <p className="text-gray-700 leading-relaxed">{result.reality}</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-lg text-gray-800">장점</h3>
              </div>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <h3 className="font-bold text-lg text-gray-800">보완할 점</h3>
              </div>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-orange-500 mt-1">!</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-purple-600" />
                <h3 className="font-bold text-lg text-gray-800">궁합</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-purple-100">
                  <p className="font-semibold text-purple-700 mb-1">최고의 궁합: {result.compatibility.best}</p>
                  <p className="text-sm text-gray-600">{result.compatibility.reason}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-100">
                  <p className="font-semibold text-purple-700 mb-1">좋은 궁합: {result.compatibility.good}</p>
                  <p className="text-sm text-gray-600">{result.compatibility.goodReason}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg border border-pink-200">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-pink-600" />
                <h3 className="font-bold text-lg text-gray-800">비슷한 아이돌</h3>
              </div>
              <ul className="space-y-2">
                {result.similarIdols.map((idol, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-pink-500">★</span>
                    <span>{idol}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-lg text-gray-800">조언</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">{result.advice}</p>
              <div className="bg-white p-4 rounded-lg border border-blue-100">
                <p className="text-center font-semibold text-blue-700 italic">{result.motto}</p>
              </div>
            </div>

            <div className={`bg-gradient-to-r ${result.color} p-6 rounded-lg text-white text-center`}>
              <p className="text-2xl font-bold mb-2">당신의 포지션</p>
              <p className="text-xl italic">{result.subtitle}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Share2 className="mr-2 h-5 w-5" />
              결과 공유하기
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/kpop-idol/test" className="block">
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
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function KpopIdolResult() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎤</div>
            <p className="text-xl text-gray-600">결과 분석 중...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
