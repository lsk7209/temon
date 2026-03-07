"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share2, RotateCcw, Heart, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useResolvedResultType } from "@/hooks/use-resolved-result-type"

const petCharacters = {
  ENFP: {
    name: "모험 러버",
    emoji: "🎉",
    pet: "활달한 중·대형견",
    petEmoji: "🐕",
    summary: "에너지 넘치는 산책 메이트",
    description: [
      "당신과 같은 활발하고 호기심 많은 성격에는 에너지가 넘치는 중·대형견이 완벽한 파트너예요! 매일 새로운 산책 코스를 탐험하고, 함께 뛰어놀며 서로의 에너지를 나눌 수 있어요.",
      "골든 리트리버, 래브라도, 보더 콜리 같은 견종들이 당신의 활동적인 라이프스타일과 잘 맞을 거예요. 이들은 사람과의 교감을 좋아하고 새로운 경험을 즐기는 성격이에요.",
      "함께 하이킹을 가거나 공원에서 프리스비를 하며, 서로에게 최고의 운동 파트너가 되어줄 수 있을 거예요.",
    ],
    goodReasons: [
      "🏃‍♂️ 활동적인 라이프스타일에 완벽 매칭",
      "🤝 높은 사회성으로 친구들과도 잘 어울림",
      "🎾 다양한 야외 활동을 함께 즐길 수 있음",
    ],
    cautions: [
      "⚠️ 충분한 운동량과 관심이 필요해요",
      "⚠️ 혼자 두면 분리불안을 느낄 수 있어요",
      "⚠️ 털 관리와 정기적인 건강검진 필수",
    ],
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "힐링 드리머",
    emoji: "🌙",
    pet: "장모종 고양이",
    petEmoji: "🐈",
    summary: "조용히 곁 지켜주는 공감 요정",
    description: [
      "감성적이고 내향적인 당신에게는 조용하고 우아한 장모종 고양이가 완벽한 동반자예요. 페르시안, 메인쿤, 라그돌 같은 온순한 성격의 고양이들이 당신의 평온한 일상에 따뜻함을 더해줄 거예요.",
      "이들은 강요하지 않는 선에서 조용한 위로를 주고, 당신이 책을 읽거나 음악을 들을 때 옆에서 함께 시간을 보내는 것을 좋아해요.",
      "서로의 공간을 존중하면서도 필요할 때는 따뜻한 교감을 나눌 수 있는 이상적인 관계를 만들어갈 수 있어요.",
    ],
    goodReasons: [
      "🧘‍♀️ 조용하고 평화로운 분위기 조성",
      "💝 강요하지 않는 자연스러운 교감",
      "🏠 실내 생활에 완벽하게 적응",
    ],
    cautions: [
      "⚠️ 털 관리에 시간과 노력이 많이 필요해요",
      "⚠️ 건강 관리에 세심한 주의가 필요해요",
      "⚠️ 초기 적응 기간이 필요할 수 있어요",
    ],
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "케어 캡틴",
    emoji: "🤝",
    pet: "골든리트리버",
    petEmoji: "🐕‍🦺",
    summary: "가족·친구 챙기는 사교 만렙",
    description: [
      "배려심 많고 사교적인 당신에게는 골든 리트리버가 최고의 선택이에요! 이들은 사람을 좋아하고 가족 모두와 잘 어울리며, 당신처럼 다른 이들을 돌보는 것을 좋아해요.",
      "방문객들을 반갑게 맞이하고, 아이들과도 잘 놀아주며, 가족 구성원 모두에게 사랑받는 완벽한 가족견이 될 거예요.",
      "당신의 따뜻한 성격과 골든 리트리버의 친화적인 성격이 만나면, 집안이 항상 따뜻하고 활기찬 분위기로 가득할 거예요.",
    ],
    goodReasons: [
      "👨‍👩‍👧‍👦 가족 모두와 완벽한 조화",
      "🎉 사교적 성격으로 손님 맞이도 완벽",
      "💖 높은 충성심과 애정 표현",
    ],
    cautions: [
      "⚠️ 많은 관심과 상호작용이 필요해요",
      "⚠️ 털 빠짐이 많아 청소가 필요해요",
      "⚠️ 충분한 운동량 확보가 중요해요",
    ],
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "사색 라운지",
    emoji: "🔮",
    pet: "샴/러시안블루",
    petEmoji: "😺",
    summary: "눈빛 대화 가능한 묘연인",
    description: [
      "직관적이고 신비로운 당신에게는 샴이나 러시안 블루 같은 우아하고 지적인 고양이가 완벽해요. 이들은 마치 당신의 마음을 읽는 듯한 깊은 눈빛으로 교감할 수 있어요.",
      "조용하지만 강한 유대감을 형성하며, 당신이 혼자만의 시간이 필요할 때는 적당한 거리를 유지하고, 위로가 필요할 때는 곁에 다가와 줄 거예요.",
      "서로의 감정을 이해하고 존중하는 깊이 있는 관계를 만들어갈 수 있는 이상적인 파트너예요.",
    ],
    goodReasons: ["🧠 높은 지능으로 깊은 교감 가능", "🤫 조용하고 차분한 성격", "👁️ 직관적인 감정 교류"],
    cautions: [
      "⚠️ 예민한 성격으로 환경 변화에 민감해요",
      "⚠️ 충분한 관심과 이해가 필요해요",
      "⚠️ 건강 관리에 세심한 주의 필요",
    ],
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "호기심 박사",
    emoji: "🧪",
    pet: "앵무새/코뉴어",
    petEmoji: "🦜",
    summary: "토크·트릭 연구 재미 폭발",
    description: [
      "창의적이고 호기심 많은 당신에게는 똑똑하고 재미있는 앵무새나 코뉴어가 완벽한 파트너예요! 이들은 말을 배우고 다양한 트릭을 익히며 당신과 함께 새로운 도전을 즐길 거예요.",
      "매일 새로운 단어를 가르치거나 재미있는 놀이를 개발하며, 서로에게 지적 자극을 주는 특별한 관계를 만들어갈 수 있어요.",
      "당신의 창의성과 새들의 학습 능력이 만나면, 예상치 못한 재미있는 상황들이 계속 벌어질 거예요.",
    ],
    goodReasons: ["🧠 높은 지능으로 다양한 학습 가능", "🎭 재미있는 상호작용과 놀이", "🗣️ 대화 상대로서의 역할"],
    cautions: [
      "⚠️ 많은 관심과 정신적 자극이 필요해요",
      "⚠️ 소음에 민감한 이웃이 있다면 주의",
      "⚠️ 장기간 외출 시 스트레스 받을 수 있어요",
    ],
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "관찰 학자",
    emoji: "📐",
    pet: "열대어/수생테라리움",
    petEmoji: "🐠",
    summary: "조용히 바라보며 마음 정화",
    description: [
      "논리적이고 관찰력이 뛰어난 당신에게는 아름다운 열대어나 수생 테라리움이 완벽한 선택이에요. 조용히 수족관을 바라보며 사색에 잠기는 시간이 당신에게 큰 평안을 줄 거예요.",
      "다양한 어종의 생태를 관찰하고 연구하며, 완벽한 수중 생태계를 만들어가는 과정에서 큰 만족감을 느낄 수 있어요.",
      "소음 없이도 시각적 아름다움과 평온함을 주는 이상적인 반려 생물이 될 거예요.",
    ],
    goodReasons: ["🧘‍♂️ 조용하고 평화로운 환경 조성", "🔬 생태 관찰과 연구의 즐거움", "🎨 아름다운 시각적 효과"],
    cautions: [
      "⚠️ 수질 관리와 정기적인 청소 필요",
      "⚠️ 초기 설치 비용이 높을 수 있어요",
      "⚠️ 정전이나 장비 고장 시 대처 필요",
    ],
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "리더십 챔프",
    emoji: "🚀",
    pet: "복서/도베르만",
    petEmoji: "🐕‍🦺",
    summary: "훈련 루틴·액티비티 완벽 실행",
    description: [
      "리더십이 강하고 목표 지향적인 당신에게는 복서나 도베르만 같은 똑똑하고 훈련 가능한 견종이 완벽해요. 이들은 체계적인 훈련을 통해 놀라운 성과를 보여줄 거예요.",
      "규칙적인 운동과 훈련 스케줄을 통해 서로 발전해나가며, 당신의 리더십 아래에서 최고의 파트너가 될 수 있어요.",
      "보호 본능이 강해 가족을 지키는 든든한 수호자 역할도 해줄 거예요.",
    ],
    goodReasons: ["🎯 높은 훈련 가능성과 학습 능력", "🛡️ 뛰어난 보호 본능", "💪 활동적인 라이프스타일에 적합"],
    cautions: ["⚠️ 충분한 운동과 정신적 자극 필요", "⚠️ 사회화 훈련이 중요해요", "⚠️ 강한 성격으로 일관된 훈련 필요"],
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "전략 마스터",
    emoji: "🧊",
    pet: "레오파드게코",
    petEmoji: "🦎",
    summary: "손 안 타는 스마트 펫 관리",
    description: [
      "전략적이고 독립적인 당신에게는 레오파드 게코 같은 관리가 체계적이고 예측 가능한 파충류가 완벽해요. 이들은 적절한 환경만 제공하면 스스로 잘 지내는 독립적인 성격이에요.",
      "온도, 습도, 조명 등을 과학적으로 관리하며 완벽한 사육 환경을 만들어가는 과정에서 큰 만족감을 느낄 수 있어요.",
      "조용하고 차분하며, 당신의 개인 공간을 침해하지 않으면서도 독특한 매력을 선사해줄 거예요.",
    ],
    goodReasons: ["🔧 체계적이고 예측 가능한 관리", "🤫 조용하고 독립적인 성격", "🧪 과학적 사육의 재미"],
    cautions: [
      "⚠️ 정확한 온습도 관리가 필수예요",
      "⚠️ 초기 설치 비용과 장비 필요",
      "⚠️ 응급상황 시 전문 병원 찾기 어려움",
    ],
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFP: {
    name: "파티 메이커",
    emoji: "📸",
    pet: "퍼그/프렌치불독",
    petEmoji: "📷",
    summary: "사진·SNS 스타 탄생",
    description: [
      "활발하고 사교적인 당신에게는 퍼그나 프렌치 불독 같은 귀엽고 사진 찍기 좋은 견종이 완벽해요! 이들의 독특하고 사랑스러운 표정은 SNS에서 인기 폭발할 거예요.",
      "어디를 가든 사람들의 관심을 받으며, 당신과 함께 파티나 모임의 중심이 되어줄 거예요.",
      "장난기 많고 애교가 넘치는 성격으로 매일매일이 즐거운 일상이 될 거예요.",
    ],
    goodReasons: ["📱 SNS용 사진과 영상 촬영에 완벽", "🎉 사교적 모임에서 인기 만점", "😄 유쾌하고 재미있는 성격"],
    cautions: ["⚠️ 호흡기 문제에 주의가 필요해요", "⚠️ 더위에 약해 온도 관리 중요", "⚠️ 비만 관리와 적절한 운동 필요"],
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ISFP: {
    name: "감성 아틀리에",
    emoji: "🌷",
    pet: "스코티쉬폴드",
    petEmoji: "🐾",
    summary: "포근한 비주얼·조용한 교감",
    description: [
      "감성적이고 예술적인 당신에게는 스코티쉬 폴드 같은 온순하고 아름다운 고양이가 완벽해요. 이들의 독특한 접힌 귀와 둥근 얼굴은 마치 살아있는 인형 같은 매력을 선사해요.",
      "조용하고 차분한 성격으로 당신의 창작 활동을 방해하지 않으면서도, 필요할 때는 따뜻한 위로를 줄 거예요.",
      "함께 있는 것만으로도 마음이 평온해지는 힐링 파트너가 되어줄 거예요.",
    ],
    goodReasons: ["🎨 아름다운 외모와 포토제닉함", "🤗 온순하고 애정 표현이 풍부", "🏠 실내 생활에 완벽 적응"],
    cautions: ["⚠️ 유전적 관절 문제 주의 필요", "⚠️ 정기적인 건강검진 중요", "⚠️ 털 관리와 그루밍 필요"],
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ESTP: {
    name: "액션 스프린터",
    emoji: "⚡",
    pet: "보더콜리",
    petEmoji: "🥏",
    summary: "스포츠·훈련·프리스비 만능",
    description: [
      "활동적이고 즉흥적인 당신에게는 보더 콜리 같은 에너지 넘치고 운동 능력이 뛰어난 견종이 완벽해요! 이들은 당신과 함께 다양한 스포츠와 야외 활동을 즐길 수 있어요.",
      "프리스비, 아질리티, 하이킹 등 어떤 활동이든 함께 도전하며, 서로의 체력과 기술을 향상시켜나갈 수 있어요.",
      "높은 지능과 학습 능력으로 새로운 트릭이나 기술을 빠르게 익혀 당신을 놀라게 할 거예요.",
    ],
    goodReasons: ["🏃‍♂️ 뛰어난 운동 능력과 체력", "🧠 높은 지능과 빠른 학습 능력", "🎾 다양한 스포츠 활동 가능"],
    cautions: [
      "⚠️ 매우 많은 운동량과 정신적 자극 필요",
      "⚠️ 지루하면 문제 행동 보일 수 있어요",
      "⚠️ 털 관리와 정기적인 그루밍 필요",
    ],
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISTP: {
    name: "솔로 플레이",
    emoji: "🥷",
    pet: "햄스터/슈가글라이더",
    petEmoji: "🐹",
    summary: "최소 관리, 망중한 힐링",
    description: [
      "독립적이고 실용적인 당신에게는 햄스터나 슈가글라이더 같은 작고 관리가 간편한 소동물이 완벽해요. 이들은 많은 관심을 요구하지 않으면서도 나름의 매력을 선사해요.",
      "조용히 자신만의 공간에서 활동하는 모습을 지켜보는 것만으로도 힐링이 되고, 필요할 때만 간단한 케어를 해주면 되어 부담이 적어요.",
      "당신의 개인 시간을 존중하면서도 소소한 즐거움을 주는 이상적인 반려동물이에요.",
    ],
    goodReasons: ["🏠 작은 공간에서도 사육 가능", "⏰ 간단하고 예측 가능한 관리", "🤫 조용하고 독립적인 성격"],
    cautions: ["⚠️ 수명이 상대적으로 짧아요", "⚠️ 온도와 환경 관리 중요", "⚠️ 응급상황 시 전문 병원 찾기 어려움"],
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
  ESFJ: {
    name: "홈 파티 셰프",
    emoji: "🍪",
    pet: "비글",
    petEmoji: "🎈",
    summary: "시끌벅적 가족·친구 케미 담당",
    description: [
      "따뜻하고 사교적인 당신에게는 비글 같은 친화적이고 활발한 견종이 완벽해요! 이들은 가족 모두와 잘 어울리고, 방문객들을 반갑게 맞이하는 천성적인 호스트예요.",
      "아이들과도 잘 놀아주고, 가족 모임이나 파티에서 분위기를 한층 더 즐겁게 만들어줄 거예요.",
      "당신처럼 다른 이들을 돌보고 챙기는 것을 좋아하는 성격으로, 서로 완벽한 케미를 보여줄 거예요.",
    ],
    goodReasons: ["👨‍👩‍👧‍👦 가족 친화적이고 사교적", "🎉 활발하고 즐거운 성격", "🤗 높은 충성심과 애정 표현"],
    cautions: ["⚠️ 많은 관심과 상호작용 필요", "⚠️ 짖음이 많을 수 있어요", "⚠️ 충분한 운동량 확보 중요"],
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ISFJ: {
    name: "든든 수호자",
    emoji: "🧸",
    pet: "코기/포메라니안",
    petEmoji: "🧸",
    summary: "집콕러에겐 포근한 푸근함",
    description: [
      "배려심 많고 안정을 추구하는 당신에게는 코기나 포메라니안 같은 충성스럽고 애정 깊은 소형견이 완벽해요. 이들은 당신의 곁을 지키며 든든한 동반자가 되어줄 거예요.",
      "집에서 보내는 시간을 더욱 따뜻하고 포근하게 만들어주며, 당신이 힘들 때는 위로를, 기쁠 때는 함께 기뻐해줄 거예요.",
      "크기는 작지만 용감하고 가족을 지키려는 마음이 큰 진정한 수호자 역할을 해줄 거예요.",
    ],
    goodReasons: ["🏠 실내 생활에 완벽 적응", "💝 높은 충성심과 보호 본능", "🤗 포근하고 따뜻한 교감"],
    cautions: ["⚠️ 털 관리와 정기적인 그루밍 필요", "⚠️ 분리불안 주의", "⚠️ 적절한 사회화 훈련 중요"],
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ESTJ: {
    name: "체계 모범",
    emoji: "📊",
    pet: "슈나우저",
    petEmoji: "📅",
    summary: "규칙적인 산책·훈련에 강점",
    description: [
      "체계적이고 책임감 강한 당신에게는 슈나우저 같은 규칙을 잘 따르고 훈련 가능한 견종이 완벽해요. 이들은 일정한 루틴을 좋아하고 체계적인 관리에 잘 적응해요.",
      "정해진 시간에 산책하고, 규칙적인 식사와 훈련을 통해 서로 발전해나가며, 당신의 계획적인 성격과 완벽하게 맞아떨어질 거예요.",
      "충성스럽고 보호 본능이 강해 가족을 지키는 든든한 파트너가 되어줄 거예요.",
    ],
    goodReasons: ["📋 규칙적인 루틴을 잘 따름", "🎯 높은 훈련 가능성", "🛡️ 뛰어난 경계심과 보호 본능"],
    cautions: ["⚠️ 정기적인 그루밍과 털 관리 필요", "⚠️ 충분한 정신적 자극 필요", "⚠️ 사회화 훈련 중요"],
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ISTJ: {
    name: "원칙 지킴이",
    emoji: "🏛️",
    pet: "거북이/토끼",
    petEmoji: "🐢",
    summary: "루틴·장기 케어에 최적",
    description: [
      "신중하고 전통을 중시하는 당신에게는 거북이나 토끼 같은 오래 함께할 수 있고 관리가 예측 가능한 동물이 완벽해요. 이들은 급작스러운 변화 없이 안정적인 케어가 가능해요.",
      "장기간에 걸친 꾸준한 관리와 루틴을 통해 깊은 유대감을 형성할 수 있고, 당신의 인내심과 책임감을 발휘할 수 있는 이상적인 파트너예요.",
      "조용하고 차분한 성격으로 당신의 평온한 일상에 안정감을 더해줄 거예요.",
    ],
    goodReasons: ["⏰ 예측 가능하고 규칙적인 관리", "🕰️ 장기간 함께할 수 있는 수명", "🤫 조용하고 안정적인 성격"],
    cautions: ["⚠️ 장기적인 책임감과 인내심 필요", "⚠️ 적절한 환경 설정 중요", "⚠️ 응급상황 시 전문 지식 필요"],
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const resultId = searchParams.get("id")
  const { resolvedType, loading } = useResolvedResultType(Object.keys(petCharacters), type, resultId)
  const mbtiType = (resolvedType as keyof typeof petCharacters) || "ENFP"
  const character = petCharacters[mbtiType]

  if (loading) {
    return <div>Loading...</div>
  }

  const handleShare = async () => {
    const shareText = `나는 ${character.emoji} ${character.name}! 나와 찰떡인 반려동물은 ${character.petEmoji} ${character.pet}이래요!`
    const shareUrl = `${window.location.origin}/tests/pet-mbti/test`

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 text-pink-200 dark:text-pink-800 text-xl animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          🐾
        </div>
        <div
          className="absolute bottom-32 right-20 text-purple-200 dark:text-purple-800 text-lg animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          🐾
        </div>
        <div
          className="absolute top-1/2 left-20 text-blue-200 dark:text-blue-800 text-lg animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🐾
        </div>
      </div>

      {/* Main Result */}
      <main className="container max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 relative z-10">
        {/* Character Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="text-6xl sm:text-7xl lg:text-8xl">{character.emoji}</div>
                <div className="text-6xl sm:text-7xl lg:text-8xl">{character.petEmoji}</div>
              </div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-3 sm:mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 text-sm sm:text-base px-3 py-1"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                  {character.name}
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                  추천 펫: {character.pet}
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium px-2">
                  "{character.summary}"
                </p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
                <Button
                  size="lg"
                  onClick={handleShare}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 h-12 sm:h-auto text-base sm:text-lg"
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
                  <Link href="/tests/pet-mbti/test">
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
              <span>💝</span>
              <span>왜 이 펫이 당신과 찰떡일까요?</span>
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

        {/* Good Reasons */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-6 sm:mb-8">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <Heart className="h-6 w-6 text-green-500" />
              <span>잘 맞는 이유</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {character.goodReasons.map((reason, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg"
                >
                  <span className="text-sm sm:text-base font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cautions */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-6 sm:mb-8">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <span>주의할 점</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {character.cautions.map((caution, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-lg"
                >
                  <span className="text-sm sm:text-base font-medium">{caution}</span>
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
              <span>잘 맞는 펫 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = petCharacters[type as keyof typeof petCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 rounded-lg text-center"
                  >
                    <div className="flex justify-center space-x-2 text-2xl sm:text-3xl mb-2">
                      <span>{compatibleChar.emoji}</span>
                      <span>{compatibleChar.petEmoji}</span>
                    </div>
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
              <span>다른 MBTI 테스트도 해보세요!</span>
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
                  participants: "18.5K",
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

export default function PetMBTIResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
