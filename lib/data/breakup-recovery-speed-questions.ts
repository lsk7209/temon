export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const BREAKUP_RECOVERY_SPEED_QUESTIONS: Question[] = [
  { id: 1, text: "이별 직후 가장 먼저 한 행동은?", options: [
    { label: "친구들에게 연락해서 만남 잡기", tag: "E" },
    { label: "혼자 방에서 조용히 정리", tag: "I" } ] },
  { id: 2, text: "이별 후 회복 방식은?", options: [
    { label: "사람들과 어울리며 잊으려 함", tag: "E" },
    { label: "혼자만의 시간에서 깊이 정리", tag: "I" } ] },
  { id: 3, text: "이별 슬픔을 SNS에 표현?", options: [
    { label: "감정 솔직하게 게시물·스토리로 공유", tag: "E" },
    { label: "절대 안 함, 혼자만의 영역", tag: "I" } ] },
  { id: 4, text: "이별 원인 분석은?", options: [
    { label: "구체적 사건·말 하나하나 떠올림", tag: "S" },
    { label: "전체 관계 패턴·의미 분석", tag: "N" } ] },
  { id: 5, text: "이별 후 회상하는 것은?", options: [
    { label: "함께한 장소·날짜·구체적 추억", tag: "S" },
    { label: "그 사람의 가치관·꿈·이상", tag: "N" } ] },
  { id: 6, text: "다음 사람을 생각할 때?", options: [
    { label: "구체적 조건·외모·직업 등 현실적", tag: "S" },
    { label: "잘 맞을 것 같은 가치관·분위기", tag: "N" } ] },
  { id: 7, text: "이별 슬픔 처리 방식은?", options: [
    { label: "원인 분석하고 다음 관계 위해 정리", tag: "T" },
    { label: "충분히 슬퍼한 후 자연스럽게 회복", tag: "F" } ] },
  { id: 8, text: "이별 후 자책감은?", options: [
    { label: "팩트 기반으로 합리적으로 분석", tag: "T" },
    { label: "내가 부족했나 깊이 자책", tag: "F" } ] },
  { id: 9, text: "친구가 위로할 때?", options: [
    { label: "객관적 조언·해결책이 도움됨", tag: "T" },
    { label: "감정에 공감해주는 게 가장 위로됨", tag: "F" } ] },
  { id: 10, text: "이별 후 일상은?", options: [
    { label: "최대한 빨리 일상 루틴 회복", tag: "J" },
    { label: "당분간은 흐트러진 채로", tag: "P" } ] },
  { id: 11, text: "회복 기간 계획은?", options: [
    { label: "마음먹은 시점에 다음 단계로", tag: "J" },
    { label: "회복되는 대로 자연스럽게", tag: "P" } ] },
  { id: 12, text: "이별 후 새로운 관계는?", options: [
    { label: "확실히 정리되면 적극적으로 시작", tag: "J" },
    { label: "끌리는 사람 나타나면 자연스럽게", tag: "P" } ] },
];
