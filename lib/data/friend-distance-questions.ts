export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const FRIEND_DISTANCE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "친구가 갑자기 만나자고 연락 왔을 때?",
    options: [
      { label: "약속 없으면 바로 OK, 만남 자체가 에너지 충전", tag: "E" },
      { label: "갑작스러운 약속은 부담, 미리 잡힌 게 편함", tag: "I" },
    ],
  },
  {
    id: 2,
    text: "단톡방에서 평소 내 모습은?",
    options: [
      { label: "활발히 대답하고 분위기 띄우는 편", tag: "E" },
      { label: "조용히 보다가 가끔 짧게 반응", tag: "I" },
    ],
  },
  {
    id: 3,
    text: "친구 모임에서 처음 보는 친구의 친구가 있을 때?",
    options: [
      { label: "먼저 다가가서 말 걸고 분위기 풀어줌", tag: "E" },
      { label: "친한 친구 옆에 머물면서 적응 시간 필요", tag: "I" },
    ],
  },
  {
    id: 4,
    text: "친구와 약속 잡을 때?",
    options: [
      { label: "장소·시간·메뉴까지 구체적으로 정해두는 편", tag: "S" },
      { label: "큰 그림만 잡고 그날 분위기 따라 결정", tag: "N" },
    ],
  },
  {
    id: 5,
    text: "오랜만에 만난 친구와 대화 주제는?",
    options: [
      { label: "최근 일어난 구체적 일상·근황 공유", tag: "S" },
      { label: "꿈·가치관·미래 계획 같은 추상적 주제", tag: "N" },
    ],
  },
  {
    id: 6,
    text: "친구가 새로운 취미·관심사를 이야기할 때?",
    options: [
      { label: "구체적으로 어떻게 시작했는지 사실 위주로 질문", tag: "S" },
      { label: "어떤 의미가 있는지, 어떤 변화를 주는지 물어봄", tag: "N" },
    ],
  },
  {
    id: 7,
    text: "친구가 인간관계 고민을 털어놓을 때?",
    options: [
      { label: "객관적으로 상황 분석하고 해결책 제시", tag: "T" },
      { label: "감정에 공감해주고 위로 먼저 건넴", tag: "F" },
    ],
  },
  {
    id: 8,
    text: "친구가 잘못된 결정을 했다고 느낄 때?",
    options: [
      { label: "솔직하게 문제점 지적해줌 — 그게 진짜 친구", tag: "T" },
      { label: "감정 상하지 않게 조심스럽게 의견 제시", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "친구와 의견이 다를 때?",
    options: [
      { label: "논리적으로 토론하며 결론 내는 게 좋음", tag: "T" },
      { label: "관계 깨지지 않게 조심스럽게 다룸", tag: "F" },
    ],
  },
  {
    id: 10,
    text: "친구와 만날 약속 빈도는?",
    options: [
      { label: "정기적으로 일정 잡아두고 꾸준히 만남", tag: "J" },
      { label: "필요할 때 즉흥적으로 연락하고 만남", tag: "P" },
    ],
  },
  {
    id: 11,
    text: "단톡방 알림을 보면?",
    options: [
      { label: "그때그때 확인하고 답장도 빠르게", tag: "J" },
      { label: "여유 생길 때 몰아서 확인", tag: "P" },
    ],
  },
  {
    id: 12,
    text: "친구 생일·기념일을 챙기는 방식은?",
    options: [
      { label: "캘린더에 미리 등록하고 선물·축하 준비", tag: "J" },
      { label: "당일이나 며칠 지난 후 즉흥적으로 챙김", tag: "P" },
    ],
  },
];
