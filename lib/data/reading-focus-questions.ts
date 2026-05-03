export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const READING_FOCUS_QUESTIONS: Question[] = [
  { id: 1, text: "독서 환경 선호는?", options: [
    { label: "카페·도서관 등 사람 있는 곳", tag: "E" },
    { label: "조용한 내 방·완전 혼자", tag: "I" } ] },
  { id: 2, text: "책을 읽고 나서?", options: [
    { label: "독서 모임·토론으로 공유", tag: "E" },
    { label: "혼자 곱씹으며 정리", tag: "I" } ] },
  { id: 3, text: "오디오북 vs 종이책?", options: [
    { label: "오디오북·낭독 — 다른 일 하면서 함께", tag: "E" },
    { label: "종이책 — 깊이 몰입 가능", tag: "I" } ] },
  { id: 4, text: "선호하는 책 장르는?", options: [
    { label: "실용서·자기계발·전문 지식", tag: "S" },
    { label: "철학·소설·인문학·이상", tag: "N" } ] },
  { id: 5, text: "책을 고를 때?", options: [
    { label: "구체적 정보·실용성 위주", tag: "S" },
    { label: "메시지·관점·영감 위주", tag: "N" } ] },
  { id: 6, text: "독서 노트 작성은?", options: [
    { label: "핵심 사실·요점 정리", tag: "S" },
    { label: "느낌·연결되는 생각 자유롭게", tag: "N" } ] },
  { id: 7, text: "책의 내용을 평가할 때?", options: [
    { label: "논리적 구성·근거의 타당성", tag: "T" },
    { label: "감동·공감·내 마음에 닿는 정도", tag: "F" } ] },
  { id: 8, text: "어려운 책을 읽을 때?", options: [
    { label: "끝까지 분석하며 이해", tag: "T" },
    { label: "감정적 반응 따라 읽고 멈춤", tag: "F" } ] },
  { id: 9, text: "재미없는 책은?", options: [
    { label: "객관적으로 가치 있으면 끝까지", tag: "T" },
    { label: "재미없으면 과감히 중단", tag: "F" } ] },
  { id: 10, text: "독서 일정은?", options: [
    { label: "매일 정해진 시간 독서 루틴", tag: "J" },
    { label: "마음 끌릴 때 자유롭게", tag: "P" } ] },
  { id: 11, text: "한 권을 읽는 방식은?", options: [
    { label: "처음부터 끝까지 순서대로", tag: "J" },
    { label: "관심 챕터부터 자유롭게", tag: "P" } ] },
  { id: 12, text: "동시에 여러 책 읽기?", options: [
    { label: "한 권을 다 읽고 다음", tag: "J" },
    { label: "여러 권 동시에 기분 따라", tag: "P" } ] },
];
