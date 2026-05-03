export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const OFFICE_SNACK_HABIT_QUESTIONS: Question[] = [
  // E/I
  {
    id: 1,
    text: "사무실에서 간식을 꺼낼 때 나는?",
    options: [
      { label: "주변 동료에게 먼저 권하고 함께 먹음", tag: "E" },
      { label: "조용히 혼자 먹거나 몰래 먹음", tag: "I" },
    ],
  },
  {
    id: 2,
    text: "동료가 간식을 가져왔을 때?",
    options: [
      { label: "바로 반응하고 이야기 나누며 분위기 띄움", tag: "E" },
      { label: "감사히 받지만 대화는 짧게", tag: "I" },
    ],
  },
  {
    id: 3,
    text: "간식 타임이 짧은 팀 소통 창구가 되는 것에 대해?",
    options: [
      { label: "오히려 좋아 — 가볍게 친해지는 기회", tag: "E" },
      { label: "부담스러움 — 그냥 먹고 일하고 싶음", tag: "I" },
    ],
  },
  // S/N
  {
    id: 4,
    text: "간식 선호 스타일은?",
    options: [
      { label: "자주 먹어본 익숙한 맛·브랜드 고집", tag: "S" },
      { label: "새로운 맛이나 아직 안 먹어본 것 도전", tag: "N" },
    ],
  },
  {
    id: 5,
    text: "회사 근처 편의점이나 카페에 들를 때?",
    options: [
      { label: "가기 전에 이미 뭘 살지 정해져 있음", tag: "S" },
      { label: "가서 보고 그때 기분대로 고름", tag: "N" },
    ],
  },
  {
    id: 6,
    text: "간식 먹는 타이밍은?",
    options: [
      { label: "오전 10시 반, 오후 3시 등 거의 고정", tag: "S" },
      { label: "배고프거나 스트레스 받을 때 즉흥 투입", tag: "N" },
    ],
  },
  // T/F
  {
    id: 7,
    text: "다이어트 중 간식이 먹고 싶을 때?",
    options: [
      { label: "칼로리 계산 후 가능한 양 계획적으로 먹음", tag: "T" },
      { label: "스트레스 해소가 더 중요해서 일단 먹음", tag: "F" },
    ],
  },
  {
    id: 8,
    text: "간식을 고를 때 중요한 것은?",
    options: [
      { label: "영양 성분, 칼로리, 가성비 등 정보 기반", tag: "T" },
      { label: "지금 당기는 맛, 기분이 올라가는지 여부", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "간식을 다른 사람과 나눠 먹을 때?",
    options: [
      { label: "공평하게 분배하는 게 맞다고 생각함", tag: "T" },
      { label: "더 좋아하는 사람에게 더 주는 게 자연스러움", tag: "F" },
    ],
  },
  // J/P
  {
    id: 10,
    text: "간식 서랍·가방 속 간식 재고는?",
    options: [
      { label: "일정하게 채워두고 다 떨어지기 전에 보충", tag: "J" },
      { label: "생각날 때 사거나 없으면 없는 대로 그냥 삼", tag: "P" },
    ],
  },
  {
    id: 11,
    text: "점심 식사 후 디저트·간식 계획은?",
    options: [
      { label: "점심 때 이미 오후 간식까지 챙겨옴", tag: "J" },
      { label: "생각날 때 나가서 사거나 그냥 넘어감", tag: "P" },
    ],
  },
  {
    id: 12,
    text: "새로 생긴 카페·편의점 신제품이 나왔을 때?",
    options: [
      { label: "계획적으로 언제 사볼지 정해둠", tag: "J" },
      { label: "지나치다 보이면 바로 구매", tag: "P" },
    ],
  },
];
