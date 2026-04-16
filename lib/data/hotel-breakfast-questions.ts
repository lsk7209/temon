/**
 * 호텔 조식 공략법 테스트 질문 데이터
 */

export type OptionTag = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export interface Question {
    id: number
    text: string
    options: { label: string; tag: OptionTag }[]
}

export const HOTEL_BREAKFAST_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "조식 뷔페에 입장했을 때",
        options: [
            { label: "와! 뭐부터 먹지? (눈이 휘둥그레짐)", tag: "E" },
            { label: "조용한 자리부터 찾아서 앉음", tag: "I" },
        ],
    },
    {
        id: 2,
        text: "음식을 담는 순서",
        options: [
            { label: "샐러드 -> 수프 -> 메인 (정석대로)", tag: "S" },
            { label: "맛있어 보이는 것부터 일단 담고 봄", tag: "N" },
        ],
    },
    {
        id: 3,
        text: "접시에 음식을 담을 때",
        options: [
            { label: "섞이지 않게 예쁘게 플레이팅", tag: "S" },
            { label: "쌓을 수 있을 만큼 최대한 많이", tag: "N" },
        ],
    },
    {
        id: 4,
        text: "같이 온 친구가 늦잠을 잔다면?",
        options: [
            { label: "조식 시간 끝나기 전에 깨워서 데려감", tag: "J" },
            { label: "피곤한가 보네, 나 혼자 먹고 올게 (혹은 포장)", tag: "P" },
        ],
    },
    {
        id: 5,
        text: "맛없는 메뉴를 가져왔을 때",
        options: [
            { label: "남기면 아까우니까 꾸역꾸역 먹음", tag: "T" },
            { label: "맛없으면 바로 손절, 다른 거 가져옴", tag: "F" },
        ],
    },
    {
        id: 6,
        text: "직원이 '더 필요한 거 없으세요?'라고 물으면",
        options: [
            { label: "'괜찮습니다' (짧고 간결하게)", tag: "I" },
            { label: "'커피 리필 되나요? 오믈렛은요?' (적극 문의)", tag: "E" },
        ],
    },
    {
        id: 7,
        text: "조식 먹으러 가는 복장",
        options: [
            { label: "세수만 하고 모자 쓰고 나감 (편안함 추구)", tag: "T" },
            { label: "인증샷 찍어야 하니까 어느 정도 꾸밈", tag: "F" },
        ],
    },
    {
        id: 8,
        text: "조식 시간 관리",
        options: [
            { label: "오픈 시간에 맞춰 1등으로 입장 (여유)", tag: "J" },
            { label: "마감 30분 전 세이프 (잠이 더 중요)", tag: "P" },
        ],
    },
    {
        id: 9,
        text: "새로운 퓨전 메뉴를 봤을 때",
        options: [
            { label: "먹던 거나 먹자 (안전한 맛 선호)", tag: "S" },
            { label: "오! 이게 뭐지? 도전해봄", tag: "N" },
        ],
    },
    {
        id: 10,
        text: "식사 중 대화 주제",
        options: [
            { label: "오늘 여행 일정과 동선 체크", tag: "T" },
            { label: "음식 맛 평가와 어제 있었던 일 수다", tag: "F" },
        ],
    },
    {
        id: 11,
        text: "뷔페 한 바퀴 다 돌고 나서",
        options: [
            { label: "배불러도 디저트는 필수 (빵, 과일, 커피)", tag: "J" },
            { label: "배부르면 그만 먹고 나옴", tag: "P" },
        ],
    },
    {
        id: 12,
        text: "옆 테이블 커플이 싸우는 것 같다면?",
        options: [
            { label: "무슨 일이지? (귀 쫑긋, 흥미진진)", tag: "E" },
            { label: "못 본 척, 내 밥 먹는 데 집중", tag: "I" },
        ],
    },
]
