export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const LANGUAGE_LEARNER_TYPE_QUESTIONS: Question[] = [
  { id: 1, text: "외국어 학습 방식은?", options: [
    { label: "언어 교환·그룹 수업으로 말하기", tag: "E" },
    { label: "혼자 책·앱으로 공부", tag: "I" } ] },
  { id: 2, text: "새 단어 외울 때?", options: [
    { label: "친구와 대화하며 사용해보기", tag: "E" },
    { label: "혼자 반복해서 외우기", tag: "I" } ] },
  { id: 3, text: "외국인과 만나면?", options: [
    { label: "적극적으로 말 걸어 연습", tag: "E" },
    { label: "들으면서 적응 시간 필요", tag: "I" } ] },
  { id: 4, text: "선호하는 학습 방법은?", options: [
    { label: "단어·문법·구조 차근차근", tag: "S" },
    { label: "전체 맥락·상황으로 자연스럽게", tag: "N" } ] },
  { id: 5, text: "회화 vs 문법?", options: [
    { label: "정확한 문법·발음 우선", tag: "S" },
    { label: "의미 전달이 우선, 디테일은 나중", tag: "N" } ] },
  { id: 6, text: "교재 선택은?", options: [
    { label: "정통 교재·문법책", tag: "S" },
    { label: "드라마·영화·노래 활용", tag: "N" } ] },
  { id: 7, text: "실수했을 때?", options: [
    { label: "왜 틀렸는지 분석", tag: "T" },
    { label: "부끄럽고 자신감 떨어짐", tag: "F" } ] },
  { id: 8, text: "학습 동기는?", options: [
    { label: "취업·시험 등 객관적 목표", tag: "T" },
    { label: "외국 친구·문화 사랑", tag: "F" } ] },
  { id: 9, text: "외국어 영상 볼 때?", options: [
    { label: "표현·구조 분석하며", tag: "T" },
    { label: "감정·문화 즐기며", tag: "F" } ] },
  { id: 10, text: "학습 일정은?", options: [
    { label: "매일 정해진 시간 학습", tag: "J" },
    { label: "기분 따라 자유롭게", tag: "P" } ] },
  { id: 11, text: "학습 진도 점검은?", options: [
    { label: "정기 시험·체크포인트", tag: "J" },
    { label: "자연스러운 능력 향상 감지", tag: "P" } ] },
  { id: 12, text: "한 언어를 깊이 vs 여러 언어?", options: [
    { label: "한 언어 마스터 후 다음", tag: "J" },
    { label: "여러 언어 동시에 자유롭게", tag: "P" } ] },
];
