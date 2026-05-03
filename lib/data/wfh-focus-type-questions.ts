export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const WFH_FOCUS_TYPE_QUESTIONS: Question[] = [
  // E/I
  {
    id: 1,
    text: "재택근무 중 화상 회의가 끝나면?",
    options: [
      { label: "대화로 에너지 올라서 다음 작업도 잘 됨", tag: "E" },
      { label: "화면에서 해방돼서 진짜 집중 시간이 시작됨", tag: "I" },
    ],
  },
  {
    id: 2,
    text: "집에서 일할 때 배경 소리는?",
    options: [
      { label: "유튜브·라디오 등 사람 목소리 있는 배경음", tag: "E" },
      { label: "완전 조용하거나 자연 소리·화이트노이즈", tag: "I" },
    ],
  },
  {
    id: 3,
    text: "재택 중 집중이 잘 안 될 때 해결 방법은?",
    options: [
      { label: "동료에게 연락하거나 잠깐 통화로 자극 받기", tag: "E" },
      { label: "카페나 도서관으로 자리 바꾸거나 방 정리", tag: "I" },
    ],
  },
  // S/N
  {
    id: 4,
    text: "재택 업무 공간 세팅은?",
    options: [
      { label: "항상 같은 자리, 정해진 배치 — 익숙해야 집중", tag: "S" },
      { label: "책상·거실·카페 등 그날 기분에 따라 바꿈", tag: "N" },
    ],
  },
  {
    id: 5,
    text: "재택 근무 중 업무 처리 방식은?",
    options: [
      { label: "구체적인 체크리스트 중심으로 하나씩 처리", tag: "S" },
      { label: "큰 그림 그리다가 우선순위 순으로 움직임", tag: "N" },
    ],
  },
  {
    id: 6,
    text: "새로운 업무 지시가 왔을 때?",
    options: [
      { label: "단계적으로 세분화해서 즉시 착수", tag: "S" },
      { label: "전체 맥락과 목적을 먼저 파악한 후 시작", tag: "N" },
    ],
  },
  // T/F
  {
    id: 7,
    text: "재택 중 집중이 안 되는 날 자책하는가?",
    options: [
      { label: "환경이나 컨디션 문제를 분석하고 개선책 찾음", tag: "T" },
      { label: "스스로 게으른 것 같아서 죄책감이 생김", tag: "F" },
    ],
  },
  {
    id: 8,
    text: "팀원이 화상 회의에 지각했을 때?",
    options: [
      { label: "특별한 감정 없이 늦은 이유를 파악 후 진행", tag: "T" },
      { label: "상대방이 힘든 일이 있나 걱정되거나 신경 쓰임", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "재택 업무 피드백을 받았을 때?",
    options: [
      { label: "내용을 분석하고 개선 방향 바로 정리", tag: "T" },
      { label: "피드백 내용보다 전달 방식이 더 마음에 걸림", tag: "F" },
    ],
  },
  // J/P
  {
    id: 10,
    text: "재택 근무 하루 스케줄은?",
    options: [
      { label: "오전 시작 시간, 점심 시간, 마감 시간 고정", tag: "J" },
      { label: "그날 컨디션·업무량에 따라 유동적으로 조정", tag: "P" },
    ],
  },
  {
    id: 11,
    text: "퇴근(업무 종료) 기준은?",
    options: [
      { label: "정해진 종료 시간에 끊거나 할 일 목록 완료 시", tag: "J" },
      { label: "하던 것 마무리되는 느낌이 올 때 자연스럽게", tag: "P" },
    ],
  },
  {
    id: 12,
    text: "재택 중 예상 외 업무가 중간에 생겼을 때?",
    options: [
      { label: "기존 일정을 재조정하고 우선순위 재설정", tag: "J" },
      { label: "그냥 맞닥뜨리면서 유연하게 처리", tag: "P" },
    ],
  },
];
