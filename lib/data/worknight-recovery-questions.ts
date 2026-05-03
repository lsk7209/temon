export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const WORKNIGHT_RECOVERY_QUESTIONS: Question[] = [
  // E/I
  {
    id: 1,
    text: "퇴근길, 오늘 하루를 마무리하는 기분은?",
    options: [
      { label: "누군가랑 수다 떨거나 약속이 있으면 더 개운함", tag: "E" },
      { label: "혼자 조용히 이어폰 끼고 걷는 게 최고의 전환", tag: "I" },
    ],
  },
  {
    id: 2,
    text: "집에 들어오자마자 제일 먼저 하는 행동은?",
    options: [
      { label: "가족이나 룸메에게 말 걸고 오늘 일 털어놓기", tag: "E" },
      { label: "방에 들어가 불 끄고 잠깐 멍 때리기", tag: "I" },
    ],
  },
  {
    id: 3,
    text: "금요일 저녁, 이상적인 퇴근 후 일정은?",
    options: [
      { label: "동료·친구와 가볍게 한잔하거나 외식", tag: "E" },
      { label: "아무 약속 없이 집에서 내 시간 즐기기", tag: "I" },
    ],
  },
  // S/N
  {
    id: 4,
    text: "저녁 식사 메뉴를 고를 때 나는?",
    options: [
      { label: "그날 먹고 싶은 구체적인 음식이 바로 떠오름", tag: "S" },
      { label: "이것저것 검색하다 결국 새로운 걸 시도함", tag: "N" },
    ],
  },
  {
    id: 5,
    text: "퇴근 후 유튜브나 넷플릭스를 켠다면?",
    options: [
      { label: "자주 보던 채널·시리즈의 다음 편 이어 보기", tag: "S" },
      { label: "알고리즘 타거나 전혀 다른 장르 클릭", tag: "N" },
    ],
  },
  {
    id: 6,
    text: "회복에 가장 도움이 되는 활동은?",
    options: [
      { label: "샤워·스트레칭·산책 등 몸으로 느끼는 루틴", tag: "S" },
      { label: "독서·팟캐스트·글쓰기 등 머릿속 환기", tag: "N" },
    ],
  },
  // T/F
  {
    id: 7,
    text: "오늘 업무 중 실수가 있었다. 퇴근 후 기분은?",
    options: [
      { label: "원인 분석하고 내일 어떻게 고칠지 메모", tag: "T" },
      { label: "자책하다가 위로가 필요해서 누군가에게 연락", tag: "F" },
    ],
  },
  {
    id: 8,
    text: "상사에게 예상 못한 피드백을 받은 날 저녁은?",
    options: [
      { label: "냉정하게 피드백 내용을 복기하고 개선안 구상", tag: "T" },
      { label: "그 말이 계속 마음에 걸려서 한동안 기분이 처짐", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "오늘 칭찬이나 좋은 성과가 있었다. 퇴근 후?",
    options: [
      { label: "다음 단계나 개선 여지를 바로 생각함", tag: "T" },
      { label: "기쁜 마음을 가까운 사람과 나누고 싶음", tag: "F" },
    ],
  },
  // J/P
  {
    id: 10,
    text: "평일 저녁 시간 계획은?",
    options: [
      { label: "운동·요리·공부 등 고정 루틴이 있음", tag: "J" },
      { label: "그날 기분에 따라 달라지고 즉흥이 편함", tag: "P" },
    ],
  },
  {
    id: 11,
    text: "취침 시간에 대해 나는?",
    options: [
      { label: "거의 정해진 시간에 자고 다음날을 대비함", tag: "J" },
      { label: "재미있으면 새벽까지 있다가 자연스럽게 잠듦", tag: "P" },
    ],
  },
  {
    id: 12,
    text: "다음 주 일정이 생기는 것에 대해?",
    options: [
      { label: "미리 캘린더에 등록해야 마음이 편함", tag: "J" },
      { label: "그냥 당일 되면 움직이면 됨, 자유롭게", tag: "P" },
    ],
  },
];
