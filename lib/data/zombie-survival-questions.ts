/**
 * 좀비 아포칼립스 생존 유형 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
    id: number
    text: string
    options: { label: string; tag: OptionTag }[]
}

export const ZOMBIE_SURVIVAL_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "좀비 바이러스 뉴스 속보가 떴다!",
        options: [
            { label: "가족, 친구들에게 당장 전화해서 알림", tag: "E" },
            { label: "조용히 필요한 물품 리스트부터 작성", tag: "I" },
        ],
    },
    {
        id: 2,
        text: "피난처를 선택해야 한다면?",
        options: [
            { label: "튼튼하고 방어하기 좋은 지하 벙커", tag: "S" },
            { label: "좀비가 못 올 것 같은 높은 산이나 무인도", tag: "N" },
        ],
    },
    {
        id: 3,
        text: "식량이 얼마 남지 않았을 때",
        options: [
            { label: "정확히 n등분해서 효율적으로 배분", tag: "T" },
            { label: "노약자와 아이들에게 먼저 양보", tag: "F" },
        ],
    },
    {
        id: 4,
        text: "낯선 생존자 무리를 만났을 때",
        options: [
            { label: "함께 힘을 합치자고 제안 (인원=힘)", tag: "E" },
            { label: "일단 거리를 두고 경계하며 관찰", tag: "I" },
        ],
    },
    {
        id: 5,
        text: "좀비가 입구를 뚫고 들어오려 한다!",
        options: [
            { label: "눈앞의 도구로 일단 막고 본다", tag: "S" },
            { label: "탈출 루트와 대안을 빠르게 스캔", tag: "N" },
        ],
    },
    {
        id: 6,
        text: "생존 계획을 세울 때",
        options: [
            { label: "시간별 보초 순번과 규칙 확립", tag: "J" },
            { label: "상황 봐서 유동적으로 대처", tag: "P" },
        ],
    },
    {
        id: 7,
        text: "일행 중 한 명이 물린 것 같다...",
        options: [
            { label: "규칙대로 격리하거나 처단 (대의를 위해)", tag: "T" },
            { label: "확실해질 때까지 일단 숨겨주고 돌봄", tag: "F" },
        ],
    },
    {
        id: 8,
        text: "무기를 고를 수 있다면?",
        options: [
            { label: "내 손에 익숙하고 구하기 쉬운 야구방망이", tag: "S" },
            { label: "무한 동력이 가능한 태양열 레이저 건 (상상)", tag: "N" },
        ],
    },
    {
        id: 9,
        text: "아포칼립스 세상에서의 멘탈 관리",
        options: [
            { label: "함께 이야기하며 서로 응원하기", tag: "E" },
            { label: "혼자만의 사색으로 마음 다잡기", tag: "I" },
        ],
    },
    {
        id: 10,
        text: "좀비의 약점을 파악할 때",
        options: [
            { label: "행동 패턴과 물리적 특징 관찰", tag: "S" },
            { label: "바이러스의 기원과 변이 가능성 추론", tag: "N" },
        ],
    },
    {
        id: 11,
        text: "탈출을 위해 위험한 작전을 수행해야 한다",
        options: [
            { label: "성공 확률 계산 후 실행 여부 결정", tag: "T" },
            { label: "누군가는 해야 하니 내가 총대 멤", tag: "F" },
        ],
    },
    {
        id: 12,
        text: "마지막 구조 헬기가 온다는 소식",
        options: [
            { label: "도착 지점까지 최단 경로와 시간 계산", tag: "J" },
            { label: "일단 헬기 소리 나는 쪽으로 전력 질주", tag: "P" },
        ],
    },
]
