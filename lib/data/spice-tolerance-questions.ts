export type MBTITag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P"

export interface SpiceToleranceQuestion {
  id: number
  text: string
  options: [
    { label: string; tag: MBTITag },
    { label: string; tag: MBTITag },
  ]
}

export const SPICE_TOLERANCE_QUESTIONS: SpiceToleranceQuestion[] = [
  { id: 1, text: "메뉴에 '아주 매움' 표시가 있다면?", options: [{ label: "도전해본다", tag: "E" }, { label: "안전한 맛으로 간다", tag: "I" }] },
  { id: 2, text: "매운 음식을 먹고 땀이 나면?", options: [{ label: "끝까지 먹는다", tag: "T" }, { label: "바로 쉬면서 조절한다", tag: "F" }] },
  { id: 3, text: "새로운 매운 소스를 보면?", options: [{ label: "바로 맛본다", tag: "N" }, { label: "후기부터 확인한다", tag: "S" }] },
  { id: 4, text: "친구가 엄청 매운 집을 추천하면?", options: [{ label: "함께 가자고 한다", tag: "E" }, { label: "내 기준 맵기부터 물어본다", tag: "I" }] },
  { id: 5, text: "매운맛을 고르는 이유는?", options: [{ label: "짜릿한 자극이 좋아서", tag: "N" }, { label: "적당히 맛있게 먹고 싶어서", tag: "S" }] },
  { id: 6, text: "매운맛 실패 경험이 있어도?", options: [{ label: "다시 도전한다", tag: "P" }, { label: "검증된 메뉴로 간다", tag: "J" }] },
  { id: 7, text: "라면에 고추를 넣을 때", options: [{ label: "계량 없이 감으로", tag: "P" }, { label: "정해진 양으로", tag: "J" }] },
  { id: 8, text: "매운 음식을 먹는 분위기", options: [{ label: "여럿이 함께 도전", tag: "E" }, { label: "혼자 집중해서 먹기", tag: "I" }] },
  { id: 9, text: "맵기 단계를 고를 때", options: [{ label: "중간 이상으로", tag: "N" }, { label: "기본 단계로", tag: "S" }] },
  { id: 10, text: "매운 메뉴를 추천할 때", options: [{ label: "맛 포인트를 강조", tag: "F" }, { label: "맵기 수치부터 설명", tag: "T" }] },
  { id: 11, text: "속이 쓰릴 것 같다면", options: [{ label: "괜찮다며 밀어붙임", tag: "P" }, { label: "미리 대비한다", tag: "J" }] },
  { id: 12, text: "다음에도 매운맛을 먹을까?", options: [{ label: "컨디션 좋으면 먹는다", tag: "P" }, { label: "상황 보고 신중히", tag: "J" }] },
]
