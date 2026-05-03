export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const GOAL_PERSISTENCE_QUESTIONS: Question[] = [
  { id: 1, text: "새 목표를 세우면 누구에게 먼저 알리는가?", options: [
    { label: "친구·동료에게 선언해서 약속 만들기", tag: "E" },
    { label: "혼자 조용히 시작하고 결과로 보여줌", tag: "I" } ] },
  { id: 2, text: "목표 진행 상황을 공유할 때?", options: [
    { label: "SNS·블로그에 적극 공유", tag: "E" },
    { label: "혼자 일기·메모로만 기록", tag: "I" } ] },
  { id: 3, text: "동기부여가 안 될 때?", options: [
    { label: "스터디 그룹·운동 메이트 찾기", tag: "E" },
    { label: "혼자 다시 마음 다잡고 진행", tag: "I" } ] },
  { id: 4, text: "목표를 세울 때?", options: [
    { label: "구체적 수치·기한 명확히 정함", tag: "S" },
    { label: "큰 방향·이상적 모습 그림", tag: "N" } ] },
  { id: 5, text: "목표 진행 점검은?", options: [
    { label: "체크리스트·습관 트래커 활용", tag: "S" },
    { label: "전체 진행도 직관적으로 감지", tag: "N" } ] },
  { id: 6, text: "목표 달성 방법은?", options: [
    { label: "단계별 구체적 실행 계획", tag: "S" },
    { label: "유연한 접근으로 다양한 길 시도", tag: "N" } ] },
  { id: 7, text: "목표가 어려워 보일 때?", options: [
    { label: "객관적으로 가능성 분석 후 결정", tag: "T" },
    { label: "포기하면 자책감, 마음의 부담", tag: "F" } ] },
  { id: 8, text: "실패했을 때?", options: [
    { label: "원인 분석하고 개선안 도출", tag: "T" },
    { label: "감정 정리 후 다음 시도", tag: "F" } ] },
  { id: 9, text: "성취했을 때?", options: [
    { label: "다음 목표 바로 설정", tag: "T" },
    { label: "충분히 기쁨 만끽", tag: "F" } ] },
  { id: 10, text: "목표 일정은?", options: [
    { label: "마감일·중간 점검일 명확히 설정", tag: "J" },
    { label: "유동적으로 진행하며 조정", tag: "P" } ] },
  { id: 11, text: "매일 진행 루틴은?", options: [
    { label: "정해진 시간에 매일 실행", tag: "J" },
    { label: "그날 컨디션 따라 유동적", tag: "P" } ] },
  { id: 12, text: "여러 목표를 다룰 때?", options: [
    { label: "우선순위 정하고 하나씩 완료", tag: "J" },
    { label: "여러 개 동시에 자유롭게", tag: "P" } ] },
];
