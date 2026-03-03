import type { MbtiResultData } from "@/components/quiz/mbti-result-page"

const MBTI_TYPES = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
] as const

function toTrait(mbti: string, topic: string) {
  const traits: string[] = []
  traits.push(mbti.includes("E") ? "표현이 적극적" : "신중하고 내향적")
  traits.push(mbti.includes("N") ? `새로운 ${topic} 시도를 즐김` : `검증된 ${topic} 선택 선호`)
  traits.push(mbti.includes("T") ? "논리적 판단" : "감정/경험 중심 판단")
  traits.push(mbti.includes("J") ? "계획적인 선택" : "즉흥적인 선택")
  return traits
}

export function buildGenericMbtiResults(topic: string): Record<string, MbtiResultData> {
  return Object.fromEntries(
    MBTI_TYPES.map((mbti) => [
      mbti,
      {
        mbti,
        name: `${mbti} ${topic} 스타일`,
        summary: `${topic} 상황에서 ${mbti} 성향이 강하게 나타나는 타입`,
        traits: toTrait(mbti, topic),
        presets: {
          "선택 패턴": [
            mbti.includes("J") ? "일정한 기준으로 선택" : "상황에 맞춰 유연하게 선택",
            mbti.includes("S") ? "현실적 요소를 먼저 확인" : "가능성과 아이디어를 먼저 고려",
          ],
          "강점": [
            mbti.includes("E") ? "주변과 빠르게 공유" : "혼자서도 안정적으로 진행",
            mbti.includes("T") ? "객관적인 비교 판단" : "관계와 만족감을 고려한 판단",
          ],
          "주의 포인트": [
            mbti.includes("P") ? "결정 지연을 줄이기" : "유연성을 너무 잃지 않기",
            "결과를 재미 요소로 받아들이기",
          ],
        },
        pitfalls: [mbti.includes("T") ? "F 성향 극단 타입" : "T 성향 극단 타입"],
        recommend: [mbti.includes("E") ? "I 균형 타입" : "E 균형 타입"],
      },
    ]),
  )
}
