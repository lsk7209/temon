export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const PARENT_COMM_STYLE_QUESTIONS: Question[] = [
  { id: 1, text: "부모님과 통화 빈도는?", options: [
    { label: "매주 또는 일주일에 여러 번", tag: "E" },
    { label: "필요할 때나 한 달에 1~2번", tag: "I" } ] },
  { id: 2, text: "부모님께 일상 공유는?", options: [
    { label: "사소한 것까지 자주 이야기", tag: "E" },
    { label: "특별한 일 있을 때만 짧게", tag: "I" } ] },
  { id: 3, text: "부모님과 대면 대화는?", options: [
    { label: "마주 앉아 길게 이야기 나눔", tag: "E" },
    { label: "짧고 간결하게, 글이나 메시지 선호", tag: "I" } ] },
  { id: 4, text: "부모님께 보고하는 내용은?", options: [
    { label: "구체적 사실·일정·결과 위주", tag: "S" },
    { label: "전체 맥락·의미·계획 위주", tag: "N" } ] },
  { id: 5, text: "부모님 안부 묻는 방식은?", options: [
    { label: "건강·식사·날씨 같은 실생활", tag: "S" },
    { label: "기분·요즘 관심사·생각", tag: "N" } ] },
  { id: 6, text: "부모님께 진로·미래 이야기는?", options: [
    { label: "구체적 단계·실현 가능성 중심", tag: "S" },
    { label: "큰 그림·꿈·가치관 중심", tag: "N" } ] },
  { id: 7, text: "부모님과 의견 충돌 시?", options: [
    { label: "논리적으로 설명해서 설득", tag: "T" },
    { label: "감정 상하지 않게 절충", tag: "F" } ] },
  { id: 8, text: "부모님께 칭찬 받았을 때?", options: [
    { label: "객관적 사실로 받아들임", tag: "T" },
    { label: "기분 좋고 더 잘하고 싶어짐", tag: "F" } ] },
  { id: 9, text: "부모님이 잔소리하실 때?", options: [
    { label: "내용 중심으로 듣고 합리적이면 수용", tag: "T" },
    { label: "마음이 상하고 거리감 느껴짐", tag: "F" } ] },
  { id: 10, text: "부모님 생신·기념일은?", options: [
    { label: "캘린더에 등록, 미리 선물 준비", tag: "J" },
    { label: "당일 또는 며칠 전 즉흥 챙김", tag: "P" } ] },
  { id: 11, text: "부모님과 약속·계획은?", options: [
    { label: "미리 일정 잡고 변경 없이 진행", tag: "J" },
    { label: "그때그때 상황 보고 유연하게", tag: "P" } ] },
  { id: 12, text: "부모님과 명절·집안 행사는?", options: [
    { label: "참석 일정 미리 확정", tag: "J" },
    { label: "당일 컨디션 보고 결정", tag: "P" } ] },
];
