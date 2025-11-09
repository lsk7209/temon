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
    text: "아침 세안은 어떻게 시작하나요?",
    options: [
      { label: "미리 정해둔 순서대로 진행", tag: "J" },
      { label: "그날 피부 컨디션 보며 유동적", tag: "P" },
    ],
  },
  {
    id: 2,
    text: "신제품 앰풀을 봤을 때",
    options: [
      { label: "성분표와 후기부터 확인", tag: "S" },
      { label: "콘셉트와 기대효과에 끌림", tag: "N" },
    ],
  },
  {
    id: 3,
    text: "여행 중 스킨케어",
    options: [
      { label: "같이 간 사람과 상의하며 조정", tag: "E" },
      { label: "혼자 조용히 내 루틴대로", tag: "I" },
    ],
  },
  {
    id: 4,
    text: "자극이 느껴질 때",
    options: [
      { label: "원인을 논리적으로 추적, 단계별 배제", tag: "T" },
      { label: "당분간 진정케어로 감정적 안정을 택함", tag: "F" },
    ],
  },
  {
    id: 5,
    text: "선크림 사용",
    options: [
      { label: "정해둔 용량·시간 엄수", tag: "J" },
      { label: "상황 따라 대충 바를 때도", tag: "P" },
    ],
  },
  {
    id: 6,
    text: "제품 선택 기준",
    options: [
      { label: "임상데이터·성분 농도", tag: "S" },
      { label: "브랜드 철학·스토리", tag: "N" },
    ],
  },
  {
    id: 7,
    text: "루틴 공유 방식",
    options: [
      { label: "지인에게 팁을 먼저 건넴", tag: "E" },
      { label: "요청 있을 때만 조용히 공유", tag: "I" },
    ],
  },
  {
    id: 8,
    text: "갑작스런 트러블",
    options: [
      { label: "원인 리스트업·체크리스트 적용", tag: "T" },
      { label: "휴식·수면·마음 진정 우선", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "저녁 루틴 길이",
    options: [
      { label: "체크리스트대로 고정", tag: "J" },
      { label: "피부 상태에 따라 축소/확장", tag: "P" },
    ],
  },
  {
    id: 10,
    text: "패드/토너 선택",
    options: [
      { label: "텍스처·피부타입 적합성 중심", tag: "S" },
      { label: "사용감 이미지·무드 중심", tag: "N" },
    ],
  },
  {
    id: 11,
    text: "신제품 추천 받았을 때",
    options: [
      { label: "테스트 요청·교환 시도", tag: "E" },
      { label: "조용히 써보고 판단", tag: "I" },
    ],
  },
  {
    id: 12,
    text: "각질케어 빈도",
    options: [
      { label: "표준 주기 준수", tag: "T" },
      { label: "그날 감각에 따름", tag: "F" },
    ],
  },
]

