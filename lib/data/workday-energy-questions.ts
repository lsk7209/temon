/**
 * 업무 에너지 테스트 질문 데이터.
 * 12문항, MBTI E/I · S/N · T/F · J/P 축 각 3문항.
 */

export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const WORKDAY_ENERGY_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "오전 팀 스탠드업 회의 직후 내 컨디션은?",
    options: [
      { label: "대화로 시동 걸려서 일이 잘 풀림", tag: "E" },
      { label: "에너지 빠져서 혼자 정리 시간이 필요함", tag: "I" },
    ],
  },
  {
    id: 2,
    text: "점심시간, 주로 누구와 보내?",
    options: [
      { label: "동료와 같이 가서 수다도 나눔", tag: "E" },
      { label: "혼밥하며 폰 보는 게 가장 쉼", tag: "I" },
    ],
  },
  {
    id: 3,
    text: "예고 없이 협업 미팅이 잡히면",
    options: [
      { label: "오히려 신선함, 일단 들어가서 흐름 따라가기", tag: "E" },
      { label: "일정 깨져서 부담, 미리 자료라도 받고 싶음", tag: "I" },
    ],
  },
  {
    id: 4,
    text: "신규 프로젝트 킥오프 자료를 받으면 먼저 보는 곳은?",
    options: [
      { label: "일정·범위·체크리스트 같은 구체 항목부터", tag: "S" },
      { label: "프로젝트가 그리는 큰 그림·미래 시나리오부터", tag: "N" },
    ],
  },
  {
    id: 5,
    text: "보고서 마감 직전 가장 많이 점검하는 것?",
    options: [
      { label: "오타·표 정렬·숫자 단위 등 디테일", tag: "S" },
      { label: "결론이 메시지로 잘 전달되는지 흐름", tag: "N" },
    ],
  },
  {
    id: 6,
    text: "동료가 새로운 툴 도입을 제안하면?",
    options: [
      { label: "지금 워크플로우에서 어떻게 동작하는지 먼저 확인", tag: "S" },
      { label: "이게 1년 뒤 일하는 방식을 어떻게 바꿀지 상상부터", tag: "N" },
    ],
  },
  {
    id: 7,
    text: "팀원이 같은 실수를 반복하면 내 첫 반응?",
    options: [
      { label: "원인·해결 절차를 글로 정리해 공유", tag: "T" },
      { label: "왜 자꾸 이러는지 마음 상태부터 살펴봄", tag: "F" },
    ],
  },
  {
    id: 8,
    text: "리뷰 미팅에서 내 산출물에 비판이 나오면?",
    options: [
      { label: "타당한 지점은 빠르게 수긍하고 다음 액션", tag: "T" },
      { label: "맞는 말이라도 말투에 따라 종일 마음 쓰임", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "동료가 일이 너무 많다고 토로할 때",
    options: [
      { label: "우선순위 정리·위임 가능 항목 같이 분석", tag: "T" },
      { label: "진짜 힘들었겠다, 공감을 먼저 표현", tag: "F" },
    ],
  },
  {
    id: 10,
    text: "월요일 아침 책상 앞에 앉으면",
    options: [
      { label: "이번 주 to-do를 정리하고 시작", tag: "J" },
      { label: "메일·메신저부터 열고 흐름에 맡김", tag: "P" },
    ],
  },
  {
    id: 11,
    text: "업무 중 집중 흐름이 끊기는 알림이 오면",
    options: [
      { label: "정해둔 답변 시간대까지 미루고 일 마무리", tag: "J" },
      { label: "내용 보고 흥미로우면 바로 처리해버림", tag: "P" },
    ],
  },
  {
    id: 12,
    text: "퇴근 직전 갑자기 추가 요청이 들어오면",
    options: [
      { label: "오늘·내일 일정에 맞춰 데드라인 협상", tag: "J" },
      { label: "일단 대략 받아 두고 분량 보고 결정", tag: "P" },
    ],
  },
];
