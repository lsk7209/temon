export interface ResultType {
  mbti: string
  name: string
  summary: string
  traits: string[]
  presets: {
    level: string[]
    coping: string[]
    warning: string[]
  }
  pitfalls: string[]
  recommend: string[]
}

const SPICE_LABELS: Record<string, { name: string; summary: string }> = {
  ISTJ: { name: "맵기 기준형", summary: "정해진 맵기 기준 안에서 안정적으로 즐기는 타입" },
  ISFJ: { name: "배려 시식형", summary: "함께 먹는 사람의 맵기 허용치를 먼저 생각하는 타입" },
  INFJ: { name: "의미 탐색형", summary: "매운맛의 스토리와 경험 가치를 찾는 타입" },
  INTJ: { name: "전략 도전형", summary: "맵기 단계와 컨디션을 계산해 도전하는 타입" },
  ISTP: { name: "실전 적응형", summary: "상황에 맞게 조용히 대응하며 끝까지 먹는 타입" },
  ISFP: { name: "감각 균형형", summary: "맛·향·자극의 밸런스를 중요하게 보는 타입" },
  INFP: { name: "무드 선택형", summary: "기분과 분위기에 따라 맵기를 고르는 타입" },
  INTP: { name: "원인 분석형", summary: "왜 맵게 느껴지는지 원인을 파고드는 타입" },
  ESTP: { name: "한계 돌파형", summary: "강한 자극을 즐기며 빠르게 적응하는 타입" },
  ESFP: { name: "텐션 상승형", summary: "매운맛 챌린지를 즐겁게 즐기는 타입" },
  ENFP: { name: "모험 확장형", summary: "새로운 매운 메뉴를 계속 발굴하는 타입" },
  ENTP: { name: "실험 창의형", summary: "색다른 조합으로 맵기 경험을 확장하는 타입" },
  ESTJ: { name: "루틴 관리형", summary: "소화·컨디션까지 고려해 체계적으로 즐기는 타입" },
  ESFJ: { name: "동행 조율형", summary: "모두가 즐길 수 있는 맵기를 조율하는 타입" },
  ENFJ: { name: "분위기 리드형", summary: "모임 분위기를 살리며 맵기를 리드하는 타입" },
  ENTJ: { name: "효율 컨트롤형", summary: "최적의 맵기와 만족도를 빠르게 찾아내는 타입" },
}

export const SPICE_TOLERANCE_RESULTS: Record<string, ResultType> = Object.fromEntries(
  Object.entries(SPICE_LABELS).map(([mbti, label]) => [
    mbti,
    {
      mbti,
      name: label.name,
      summary: label.summary,
      traits: [
        mbti.includes("N") ? "새로운 매운 메뉴 선호" : "검증된 맵기 선호",
        mbti.includes("T") ? "맵기 수치/근거 중심" : "경험/기분 중심 선택",
        mbti.includes("P") ? "즉흥적 도전" : "계획적 섭취",
      ],
      presets: {
        level: [
          mbti.includes("P") ? "컨디션 보고 단계 조절" : "정해둔 안전 단계 유지",
          mbti.includes("E") ? "함께 도전형" : "혼자 천천히 즐김",
        ],
        coping: ["물/우유/사이드 조합으로 완급 조절", "속도 조절하며 식사"],
        warning: ["무리한 챌린지 주의", "결과는 재미로 참고"],
      },
      pitfalls: [mbti.includes("T") ? "감정 우선 즉흥형" : "수치 집착 계획형"],
      recommend: [mbti.includes("E") ? "I 균형형" : "E 균형형"],
    },
  ]),
)
