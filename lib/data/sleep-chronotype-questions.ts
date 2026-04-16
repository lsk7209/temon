/**
 * 수면 크로노타입 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
  id: number
  text: string
  options: { label: string; tag: OptionTag }[]
}

export const SLEEP_CHRONOTYPE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "이상적인 기상 시간은",
    options: [
      { label: "해 뜰 때쯤 일찍", tag: "E" },
      { label: "해가 높이 떠도 늦게", tag: "I" },
    ],
  },
  {
    id: 2,
    text: "잠들기 전 루틴",
    options: [
      { label: "정해진 루틴 그대로", tag: "J" },
      { label: "그날 기분에 따라", tag: "P" },
    ],
  },
  {
    id: 3,
    text: "아침 컨디션",
    options: [
      { label: "물·스트레칭으로 바로 활성", tag: "S" },
      { label: "천천히 감각이 깨어남", tag: "N" },
    ],
  },
  {
    id: 4,
    text: "낮 시간 집중",
    options: [
      { label: "일정·체크리스트로 밀어붙임", tag: "T" },
      { label: "몰입 오는 흐름을 기다림", tag: "F" },
    ],
  },
  {
    id: 5,
    text: "오후 권태감",
    options: [
      { label: "산책·수분으로 조절", tag: "S" },
      { label: "짧은 낮잠으로 리셋", tag: "N" },
    ],
  },
  {
    id: 6,
    text: "운동 타이밍",
    options: [
      { label: "아침 운동 선호", tag: "J" },
      { label: "저녁 운동 선호", tag: "P" },
    ],
  },
  {
    id: 7,
    text: "카페인 사용",
    options: [
      { label: "정량·정시 섭취", tag: "T" },
      { label: "필요 시 그때그때", tag: "F" },
    ],
  },
  {
    id: 8,
    text: "주말 취침·기상",
    options: [
      { label: "평일과 비슷", tag: "J" },
      { label: "자유롭게 바뀜", tag: "P" },
    ],
  },
  {
    id: 9,
    text: "일정 변경",
    options: [
      { label: "계획 유지가 우선", tag: "T" },
      { label: "수면·컨디션에 맞춰 조정", tag: "F" },
    ],
  },
  {
    id: 10,
    text: "밤 시간",
    options: [
      { label: "23시 이전 취침 선호", tag: "S" },
      { label: "자정 이후 취침도 괜찮음", tag: "N" },
    ],
  },
  {
    id: 11,
    text: "알람 반응",
    options: [
      { label: "한 번에 기상", tag: "J" },
      { label: "스누즈로 점진 기상", tag: "P" },
    ],
  },
  {
    id: 12,
    text: "최고의 업무 시간대",
    options: [
      { label: "오전 9–12시", tag: "E" },
      { label: "오후 8–11시", tag: "I" },
    ],
  },
]

