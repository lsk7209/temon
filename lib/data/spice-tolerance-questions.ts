export interface SpiceToleranceQuestion {
  id: number
  text: string
  options: {
    label: string
    tag: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P"
  }[]
}

export const SPICE_TOLERANCE_QUESTIONS: SpiceToleranceQuestion[] = [
  { id: 1, text: "매운 음식 메뉴를 고를 때", options: [{ label: "검증된 순한 맛으로 간다", tag: "S" }, { label: "신상 극매운 메뉴를 도전한다", tag: "N" }] },
  { id: 2, text: "매운맛 단계 선택 기준은", options: [{ label: "몸 상태와 일정까지 계산한다", tag: "J" }, { label: "그날 기분 따라 정한다", tag: "P" }] },
  { id: 3, text: "친구가 '진짜 안 맵다'고 할 때", options: [{ label: "후기와 재료를 먼저 확인한다", tag: "T" }, { label: "친구 말 믿고 같이 먹는다", tag: "F" }] },
  { id: 4, text: "매워서 눈물이 날 때", options: [{ label: "말없이 물 찾고 회복한다", tag: "I" }, { label: "실황 중계하며 주변을 웃긴다", tag: "E" }] },
  { id: 5, text: "매운 라면에 토핑을 넣는다면", options: [{ label: "치즈·우유로 매운맛을 조절", tag: "S" }, { label: "청양고추 추가로 화력 업", tag: "N" }] },
  { id: 6, text: "다음날 약속이 많은 날", options: [{ label: "속 편한 메뉴로 리스크 관리", tag: "J" }, { label: "그래도 매운 건 못 참지", tag: "P" }] },
  { id: 7, text: "매운맛 챌린지 제안을 받으면", options: [{ label: "규칙·실패 조건부터 확인", tag: "T" }, { label: "분위기 좋으면 바로 참가", tag: "F" }] },
  { id: 8, text: "매운맛을 즐기는 이유는", options: [{ label: "집중력 올라가고 개운해서", tag: "T" }, { label: "스트레스가 풀리고 짜릿해서", tag: "F" }] },
  { id: 9, text: "매운맛 맛집에 가면", options: [{ label: "대표 메뉴 하나씩 나눠먹기", tag: "E" }, { label: "내 페이스대로 천천히 먹기", tag: "I" }] },
  { id: 10, text: "매운맛 실패 경험이 있어도", options: [{ label: "같은 실수 안 하게 기록한다", tag: "J" }, { label: "다음엔 다르겠지 하고 도전", tag: "P" }] },
  { id: 11, text: "맵기 조절 가능한 식당에서", options: [{ label: "중간 단계부터 단계적 업", tag: "S" }, { label: "처음부터 최고 단계로 시작", tag: "N" }] },
  { id: 12, text: "매운 음식을 먹고 남길 때", options: [{ label: "원인 분석 후 다음 계획 세움", tag: "T" }, { label: "아쉽지만 그날 컨디션 탓", tag: "F" }] },
]
