/**
 * 피부 루틴 성향 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
  id: number
  text: string
  options: { label: string; tag: OptionTag }[]
}

export const SKIN_ROUTINE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "저녁 세안은",
    options: [
      { label: "고정된 단계대로", tag: "J" },
      { label: "그날 컨디션에 맞춰", tag: "P" },
    ],
  },
  {
    id: 2,
    text: "토너 사용",
    options: [
      { label: "규칙적으로 루틴 준수", tag: "S" },
      { label: "필요할 때만 직관적으로", tag: "N" },
    ],
  },
  {
    id: 3,
    text: "새로운 성분을 볼 때",
    options: [
      { label: "성분표·리뷰 꼼꼼 확인", tag: "T" },
      { label: "피부 느낌 먼저 테스트", tag: "F" },
    ],
  },
  {
    id: 4,
    text: "마스크팩 빈도",
    options: [
      { label: "주 2회 일정하게", tag: "J" },
      { label: "건조할 때만 유동적", tag: "P" },
    ],
  },
  {
    id: 5,
    text: "트러블이 났을 때",
    options: [
      { label: "원인 추적·로그 기록", tag: "T" },
      { label: "스트레스·수면부터 조절", tag: "F" },
    ],
  },
  {
    id: 6,
    text: "아침 스킨케어",
    options: [
      { label: "최소 단계로 바로 활동", tag: "E" },
      { label: "조용히 천천히 준비", tag: "I" },
    ],
  },
  {
    id: 7,
    text: "자외선 차단제",
    options: [
      { label: "시간 맞춰 재도포", tag: "S" },
      { label: "상황 봐서 필요 시", tag: "N" },
    ],
  },
  {
    id: 8,
    text: "각질 관리",
    options: [
      { label: "주기·도구를 정확히", tag: "T" },
      { label: "피부 신호 위주로", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "세럼 선택",
    options: [
      { label: "목표별로 카테고리 정리", tag: "J" },
      { label: "오늘 피부 상태에 맞춤", tag: "P" },
    ],
  },
  {
    id: 10,
    text: "성분 충돌 의심 시",
    options: [
      { label: "자료 찾아 루틴 수정", tag: "T" },
      { label: "며칠 쉬며 반응 관찰", tag: "F" },
    ],
  },
  {
    id: 11,
    text: "여행 중 루틴",
    options: [
      { label: "파우치에 미니 규격 풀세트", tag: "J" },
      { label: "멀티제품 위주 간소화", tag: "P" },
    ],
  },
  {
    id: 12,
    text: "피부 정보 습득",
    options: [
      { label: "커뮤니티·소통으로 빠르게", tag: "E" },
      { label: "조용히 아카이브·연구", tag: "I" },
    ],
  },
]

