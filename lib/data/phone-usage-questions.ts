/**
 * 스마트폰 사용 스타일 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
  id: number
  text: string
  options: { label: string; tag: OptionTag }[]
}

export const PHONE_USAGE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "아침에 휴대폰을 집자마자 하는 일",
    options: [
      { label: "오늘 일정·할 일 먼저 확인", tag: "J" },
      { label: "밤새 온 메시지·피드 먼저", tag: "P" },
    ],
  },
  {
    id: 2,
    text: "앱 폴더 구성",
    options: [
      { label: "카테고리별로 질서 있게", tag: "S" },
      { label: "자주 쓰는 것만 전면, 나머지는 검색", tag: "N" },
    ],
  },
  {
    id: 3,
    text: "새 앱 설치 전",
    options: [
      { label: "기능·리뷰·권한을 검토", tag: "T" },
      { label: "일단 써보며 체감으로 판단", tag: "F" },
    ],
  },
  {
    id: 4,
    text: "알림 관리",
    options: [
      { label: "중요 알림만 허용하고 나머지는 차단", tag: "J" },
      { label: "기본값 유지, 필요 시 그때그때", tag: "P" },
    ],
  },
  {
    id: 5,
    text: "단체 채팅창",
    options: [
      { label: "바로 참여하며 소통 주도", tag: "E" },
      { label: "읽고 필요한 때만 반응", tag: "I" },
    ],
  },
  {
    id: 6,
    text: "배터리 10% 상황",
    options: [
      { label: "절전 모드와 사용량 정리", tag: "T" },
      { label: "필요한 앱만 직감적으로 유지", tag: "F" },
    ],
  },
  {
    id: 7,
    text: "화면 맞춤",
    options: [
      { label: "밝기·폰트·위젯을 표준대로", tag: "S" },
      { label: "손맛대로 커스텀·제스처 중심", tag: "N" },
    ],
  },
  {
    id: 8,
    text: "집중 모드 사용",
    options: [
      { label: "일정·업무에 맞춰 자동화", tag: "J" },
      { label: "집중 흐름이 올 때 수동으로", tag: "P" },
    ],
  },
  {
    id: 9,
    text: "사진 정리",
    options: [
      { label: "수시로 정리·중복 삭제", tag: "S" },
      { label: "한 번에 몰아서 대청소", tag: "N" },
    ],
  },
  {
    id: 10,
    text: "길 찾기",
    options: [
      { label: "경로·옵션 비교 후 최적 선택", tag: "T" },
      { label: "대략 찍고 상황 보며 수정", tag: "F" },
    ],
  },
  {
    id: 11,
    text: "통화 vs 메시지",
    options: [
      { label: "급하면 전화로 바로 해결", tag: "E" },
      { label: "웬만하면 메시지로 비동기", tag: "I" },
    ],
  },
  {
    id: 12,
    text: "야간 사용",
    options: [
      { label: "수면 루틴에 맞춰 컷오프", tag: "J" },
      { label: "흐름 타면 새벽까지 사용", tag: "P" },
    ],
  },
]

