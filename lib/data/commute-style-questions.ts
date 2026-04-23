/**
 * 출퇴근 스타일 테스트 질문 데이터.
 * 12문항, MBTI E/I · S/N · T/F · J/P 축 각 3문항.
 */

export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const COMMUTE_STYLE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "출근 대중교통 안에서 나는?",
    options: [
      { label: "눈 마주치는 사람이랑도 가볍게 인사", tag: "E" },
      { label: "이어폰 꽂고 아무도 안 보이게 차단", tag: "I" },
    ],
  },
  {
    id: 2,
    text: "사무실 도착 후 가장 먼저 하는 일?",
    options: [
      { label: "동료들에게 굿모닝 인사부터", tag: "E" },
      { label: "자리 정돈 먼저, 인사는 마주칠 때만", tag: "I" },
    ],
  },
  {
    id: 3,
    text: "엘리베이터에서 상사와 단둘이 있으면?",
    options: [
      { label: "주말 뭐 하셨어요? 먼저 말걺", tag: "E" },
      { label: "폰 보는 척하며 조용히 도착 대기", tag: "I" },
    ],
  },
  {
    id: 4,
    text: "출근 시간은 보통?",
    options: [
      { label: "매일 같은 시간 같은 버스/지하철", tag: "S" },
      { label: "그날 기분·날씨 보고 루트 바꿈", tag: "N" },
    ],
  },
  {
    id: 5,
    text: "출퇴근길 BGM 선택",
    options: [
      { label: "익숙한 플레이리스트 반복", tag: "S" },
      { label: "새 앨범·새 팟캐스트 먼저 탐색", tag: "N" },
    ],
  },
  {
    id: 6,
    text: "퇴근길에 자주 생각하는 것",
    options: [
      { label: "오늘 남은 할 일·내일 일정", tag: "S" },
      { label: "이번 프로젝트 끝나면 뭐 해볼까", tag: "N" },
    ],
  },
  {
    id: 7,
    text: "만원 지하철에서 가장 먼저 드는 생각",
    options: [
      { label: "빠져나갈 동선·환승 타이밍 계산", tag: "T" },
      { label: "다들 힘드시겠다, 내리실 때 양보해야지", tag: "F" },
    ],
  },
  {
    id: 8,
    text: "출근 버스 지연으로 지각할 때",
    options: [
      { label: "원인·책임을 메시지로 깔끔히 정리해 보고", tag: "T" },
      { label: "죄송하다는 사과 먼저, 마음이 더 급함", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "동료가 출퇴근길 힘들다고 말하면",
    options: [
      { label: "대안 루트·통근 보조 제도 공유", tag: "T" },
      { label: "진짜 힘들지, 공감 먼저 해줌", tag: "F" },
    ],
  },
  {
    id: 10,
    text: "전날 밤 출근 준비?",
    options: [
      { label: "옷·가방·교통카드까지 전부 세팅", tag: "J" },
      { label: "아침에 눈뜨면서 즉흥 결정", tag: "P" },
    ],
  },
  {
    id: 11,
    text: "환승 앱 알림이 울리면",
    options: [
      { label: "정해진 시간표대로 이미 움직이는 중", tag: "J" },
      { label: "어? 더 빠른 길 있나 체크", tag: "P" },
    ],
  },
  {
    id: 12,
    text: "퇴근 후 저녁 약속 제안 들어오면",
    options: [
      { label: "캘린더 확인 후 답 확정", tag: "J" },
      { label: "일단 좋아요, 시간은 당일에 맞추자", tag: "P" },
    ],
  },
];
