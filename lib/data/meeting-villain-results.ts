/**
 * 회의 빌런 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
    mbti: string
    name: string
    summary: string
    traits: string[]
    presets: {
        role: string[] // 회의 내 역할
        skill: string[] // 보유 스킬 (재미 요소)
        weakness: string[] // 주의할 점
    }
    pitfalls: string[] // 최악의 파트너
    recommend: string[] // 최고의 파트너
    ogTitle: string
}

export const MEETING_VILLAIN_RESULTS: Record<string, ResultType> = {
    ISTJ: {
        mbti: "ISTJ",
        name: "인간 녹음기",
        summary: "토시 하나 틀리지 않는 완벽한 회의록",
        traits: ["팩트 체크 집착", "절차 준수", "침묵의 기록자"],
        presets: {
            role: ["서기", "타임키퍼"],
            skill: ["속기 1급", "Ctrl+F"],
            weakness: ["융통성 없음"],
        },
        pitfalls: ["ENFP"],
        recommend: ["ESTJ"],
        ogTitle: "ISTJ 인간 녹음기",
    },
    ISFJ: {
        mbti: "ISFJ",
        name: "평화지킴이",
        summary: "네네... 다 맞아요... (속으론 딴생각)",
        traits: ["무한 긍정", "갈등 회피", "조용한 서포터"],
        presets: {
            role: ["간식 담당", "분위기 메이커(조용한)"],
            skill: ["영혼 없는 리액션", "눈치 보기"],
            weakness: ["거절 못함"],
        },
        pitfalls: ["ENTP"],
        recommend: ["ESFJ"],
        ogTitle: "ISFJ 평화지킴이",
    },
    INFJ: {
        mbti: "INFJ",
        name: "예언가",
        summary: "조용히 있다가 뼈 때리는 한 마디",
        traits: ["통찰력", "큰 그림", "조용한 카리스마"],
        presets: {
            role: ["정신적 지주", "마무리 발언"],
            skill: ["미래 예측", "팩트 폭격"],
            weakness: ["현실 감각 부족"],
        },
        pitfalls: ["ESTP"],
        recommend: ["ENTP"],
        ogTitle: "INFJ 예언가",
    },
    INTJ: {
        mbti: "INTJ",
        name: "비판적 설계자",
        summary: "그거 확실한 데이터인가요? (팔짱)",
        traits: ["냉철한 분석", "전략가", "비판적 사고"],
        presets: {
            role: ["전략 기획", "악역 담당"],
            skill: ["허점 찾기", "구조화"],
            weakness: ["싸가지 부족"],
        },
        pitfalls: ["ESFP"],
        recommend: ["ENTJ"],
        ogTitle: "INTJ 비판적 설계자",
    },
    ISTP: {
        mbti: "ISTP",
        name: "효율 봇",
        summary: "그래서 결론이 뭐죠? 빨리 끝내죠",
        traits: ["핵심만", "귀찮음", "무표정"],
        presets: {
            role: ["해결사", "조기 퇴근 요정"],
            skill: ["요점 정리", "칼퇴각 재기"],
            weakness: ["공감 능력 제로"],
        },
        pitfalls: ["ENFJ"],
        recommend: ["ESTP"],
        ogTitle: "ISTP 효율 봇",
    },
    ISFP: {
        mbti: "ISFP",
        name: "투명 인간",
        summary: "있는 듯 없는 듯... 시키면 잘함",
        traits: ["온화함", "눈에 안 띔", "예술적 감각"],
        presets: {
            role: ["PPT 디자인", "배려 담당"],
            skill: ["은신술", "경청"],
            weakness: ["의견 피력 약함"],
        },
        pitfalls: ["ENTJ"],
        recommend: ["ESFP"],
        ogTitle: "ISFP 투명 인간",
    },
    INTP: {
        mbti: "INTP",
        name: "아이디어 뱅크",
        summary: "혼자 딴생각하다가 기발한 아이디어 투척",
        traits: ["창의적", "논리적", "마이웨어"],
        presets: {
            role: ["브레인", "질문봇"],
            skill: ["무한 상상", "논리 비약"],
            weakness: ["실행력 부족"],
        },
        pitfalls: ["ESFJ"],
        recommend: ["ENTP"],
        ogTitle: "INTP 아이디어 뱅크",
    },
    INFP: {
        mbti: "INFP",
        name: "몽상가",
        summary: "회의 주제와 상관없는 이상적인 이야기",
        traits: ["감성적", "이상주의", "진정성"],
        presets: {
            role: ["가치 수호자", "눈물 담당"],
            skill: ["감성 호소", "의미 부여"],
            weakness: ["유리 멘탈"],
        },
        pitfalls: ["ESTJ"],
        recommend: ["ENFJ"],
        ogTitle: "INFP 몽상가",
    },
    ESTP: {
        mbti: "ESTP",
        name: "행동 대장",
        summary: "일단 해보자! (뒷일은 모름)",
        traits: ["추진력", "즉흥적", "현실적"],
        presets: {
            role: ["영업", "협상"],
            skill: ["임기응변", "밀어붙이기"],
            weakness: ["마무리 부족"],
        },
        pitfalls: ["INFJ"],
        recommend: ["ISTP"],
        ogTitle: "ESTP 행동 대장",
    },
    ESFP: {
        mbti: "ESFP",
        name: "분위기 메이커",
        summary: "회의 시간이 파티 시간인 줄 앎",
        traits: ["사교적", "에너지", "관종"],
        presets: {
            role: ["엔터테이너", "아이스브레이킹"],
            skill: ["무대 장악", "드립"],
            weakness: ["산만함"],
        },
        pitfalls: ["INTJ"],
        recommend: ["ISFP"],
        ogTitle: "ESFP 분위기 메이커",
    },
    ENFP: {
        mbti: "ENFP",
        name: "스파크",
        summary: "이것도 좋고 저것도 좋고! (수습 불가)",
        traits: ["열정", "창의력", "사람 좋음"],
        presets: {
            role: ["아이디어 발상", "응원 단장"],
            skill: ["무한 긍정", "영감"],
            weakness: ["집중력 난조"],
        },
        pitfalls: ["ISTJ"],
        recommend: ["INFJ"],
        ogTitle: "ENFP 스파크",
    },
    ENTP: {
        mbti: "ENTP",
        name: "반론 제기자",
        summary: "근데 그게 정말 최선일까요? (논쟁 즐김)",
        traits: ["논쟁", "다각도", "똑똑함"],
        presets: {
            role: ["혁신가", "딴지 걸기"],
            skill: ["말싸움", "새로운 관점"],
            weakness: ["적을 만듦"],
        },
        pitfalls: ["ISFJ"],
        recommend: ["INTP"],
        ogTitle: "ENTP 반론 제기자",
    },
    ESTJ: {
        mbti: "ESTJ",
        name: "현실적 관리자",
        summary: "자, 시간 없으니 본론만 얘기하죠.",
        traits: ["체계적", "효율", "지도력"],
        presets: {
            role: ["진행자", "총대"],
            skill: ["정리 정돈", "지시"],
            weakness: ["독불장군"],
        },
        pitfalls: ["INFP"],
        recommend: ["ISTJ"],
        ogTitle: "ESTJ 현실적 관리자",
    },
    ESFJ: {
        mbti: "ESFJ",
        name: "친목 도모자",
        summary: "다들 밥은 먹고 하시는 거죠? ^^",
        traits: ["친절", "화합", "오지랖"],
        presets: {
            role: ["엄마/아빠", "복지 부장"],
            skill: ["간식 챙기기", "안부 묻기"],
            weakness: ["객관성 부족"],
        },
        pitfalls: ["INTP"],
        recommend: ["ISFJ"],
        ogTitle: "ESFJ 친목 도모자",
    },
    ENFJ: {
        mbti: "ENFJ",
        name: "열정 리더",
        summary: "우리 팀 할 수 있습니다! 믿습니다!",
        traits: ["카리스마", "언변", "설득"],
        presets: {
            role: ["동기 부여", "발표자"],
            skill: ["가스라이팅(?)", "연설"],
            weakness: ["감정 과잉"],
        },
        pitfalls: ["ISTP"],
        recommend: ["INFP"],
        ogTitle: "ENFJ 열정 리더",
    },
    ENTJ: {
        mbti: "ENTJ",
        name: "불도저",
        summary: "제 의견대로 진행하겠습니다. 이의 없죠?",
        traits: ["결단력", "통솔력", "목표 지향"],
        presets: {
            role: ["CEO", "결정권자"],
            skill: ["카리스마", "추진력"],
            weakness: ["타인 무시"],
        },
        pitfalls: ["ISFP"],
        recommend: ["INTJ"],
        ogTitle: "ENTJ 불도저",
    },
}
