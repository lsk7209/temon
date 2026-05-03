export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const COURSE_COMPLETION_QUESTIONS: Question[] = [
  { id: 1, text: "온라인 강의 신청 후 첫 행동은?", options: [
    { label: "스터디 그룹·동료 찾기", tag: "E" },
    { label: "혼자 조용히 진행 시작", tag: "I" } ] },
  { id: 2, text: "강의 토론·Q&A 참여는?", options: [
    { label: "댓글·질문으로 활발히 참여", tag: "E" },
    { label: "다른 사람 질문 보며 학습", tag: "I" } ] },
  { id: 3, text: "강의 후 인증·공유?", options: [
    { label: "수료증·인증샷 SNS 공유", tag: "E" },
    { label: "혼자 만족, 공유 안 함", tag: "I" } ] },
  { id: 4, text: "강의를 고를 때?", options: [
    { label: "실용 스킬·구체적 결과물", tag: "S" },
    { label: "큰 그림·새로운 관점", tag: "N" } ] },
  { id: 5, text: "강의 노트 방식은?", options: [
    { label: "단계별 사실·코드·예시 정리", tag: "S" },
    { label: "개념 연결·내 식대로 재해석", tag: "N" } ] },
  { id: 6, text: "강의 진도는?", options: [
    { label: "강사 순서 그대로 따라가기", tag: "S" },
    { label: "관심 부분 먼저 파고들기", tag: "N" } ] },
  { id: 7, text: "강의가 기대 이하일 때?", options: [
    { label: "객관적으로 평가 후 환불·중단", tag: "T" },
    { label: "비용 아까워서 끝까지 들음", tag: "F" } ] },
  { id: 8, text: "강의 과제·테스트?", options: [
    { label: "정답·점수에 집중", tag: "T" },
    { label: "과정·배움에 집중", tag: "F" } ] },
  { id: 9, text: "강사·강의 평가는?", options: [
    { label: "내용 품질 객관적으로", tag: "T" },
    { label: "강사 인성·전달력 위주", tag: "F" } ] },
  { id: 10, text: "강의 일정 관리는?", options: [
    { label: "매주 정해진 일정에 진행", tag: "J" },
    { label: "여유 있을 때 몰아보기", tag: "P" } ] },
  { id: 11, text: "여러 강의를 동시에?", options: [
    { label: "하나 끝내고 다음", tag: "J" },
    { label: "여러 개 동시에 진행", tag: "P" } ] },
  { id: 12, text: "수료까지 도달률은?", options: [
    { label: "신청한 강의 90% 이상 완강", tag: "J" },
    { label: "흥미 떨어지면 자연스럽게 중단", tag: "P" } ] },
];
