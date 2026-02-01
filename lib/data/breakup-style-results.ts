/**
 * 이별 후유증 유형 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
    mbti: string
    name: string
    summary: string
    traits: string[]
    presets: {
        status: string[] // 현재 상태
        recovery: string[] // 극복 방법
        warning: string[] // 주의할 점
    }
    pitfalls: string[] // 안 맞는 유형
    recommend: string[] // 잘 맞는 유형
    ogTitle: string
}

export const BREAKUP_STYLE_RESULTS: Record<string, ResultType> = {
    ISTJ: {
        mbti: "ISTJ",
        name: "기억 소거 로봇",
        summary: "데이터 삭제 완료. 시스템 정상 가동 중.",
        traits: ["흔적 즉시 삭제", "일상 복귀 빠름", "이성적"],
        presets: {
            status: ["사진/번호 삭제 완료", "업무로 도피 중"],
            recovery: ["바쁘게 일하기", "규칙적인 생활"],
            warning: ["감정 억누르다 폭발 주의"],
        },
        pitfalls: ["ENFP"],
        recommend: ["ESTJ"],
        ogTitle: "ISTJ 기억 소거 로봇",
    },
    ISFJ: {
        mbti: "ISFJ",
        name: "추억 보관소장",
        summary: "겉으론 괜찮은 척, 속으론 100년치 추억 회상 중",
        traits: ["혼자 앓음", "미련 뚝뚝", "겉모습 평온"],
        presets: {
            status: ["카톡 프사 염탐", "추억 물건 못 버림"],
            recovery: ["시간이 약이다", "친구들과 잔잔한 수다"],
            warning: ["전 애인 미화 금지"],
        },
        pitfalls: ["ENTP"],
        recommend: ["ESFJ"],
        ogTitle: "ISFJ 추억 보관소장",
    },
    INFJ: {
        mbti: "INFJ",
        name: "도어 슬래머",
        summary: "마음의 문을 닫았습니다. 출입 금지.",
        traits: ["손절 확실", "심오한 고찰", "조용한 정리"],
        presets: {
            status: ["연락처 차단", "인간관계 정리"],
            recovery: ["혼자만의 여행", "일기 쓰기"],
            warning: ["스스로 고립 주의"],
        },
        pitfalls: ["ESTP"],
        recommend: ["INFP"],
        ogTitle: "INFJ 도어 슬래머",
    },
    INTJ: {
        mbti: "INTJ",
        name: "이별 분석가",
        summary: "우리가 헤어진 원인은 A, B, C 때문이야.",
        traits: ["분석적", "자기 발전", "냉정"],
        presets: {
            status: ["이별 원인 연구", "자기계발 몰두"],
            recovery: ["새로운 목표 설정", "독서/공부"],
            warning: ["지나친 자기 검열"],
        },
        pitfalls: ["ESFP"],
        recommend: ["ENTJ"],
        ogTitle: "INTJ 이별 분석가",
    },
    ISTP: {
        mbti: "ISTP",
        name: "쿨내 진동",
        summary: "끝났어? ㅇㅇ 알겠어. (겜하러 감)",
        traits: ["무덤덤", "귀찮음", "마이웨이"],
        presets: {
            status: ["잠", "게임/취미 몰두"],
            recovery: ["혼자만의 시간", "취미 생활"],
            warning: ["감정 회피"],
        },
        pitfalls: ["ENFJ"],
        recommend: ["ESTP"],
        ogTitle: "ISTP 쿨내 진동",
    },
    ISFP: {
        mbti: "ISFP",
        name: "방구석 작사가",
        summary: "이 노래 가사... 완전 내 얘기잖아... (울컥)",
        traits: ["이불 속", "감성 폭발", "소극적"],
        presets: {
            status: ["슬픈 노래 플레이리스트", "누워 있기"],
            recovery: ["맛있는 거 먹기", "잠자기"],
            warning: ["밤샘 연락 충동"],
        },
        pitfalls: ["ENTJ"],
        recommend: ["ESFP"],
        ogTitle: "ISFP 방구석 작사가",
    },
    INTP: {
        mbti: "INTP",
        name: "사랑의 철학자",
        summary: "사랑이란 도대체 무엇일까? (논문 검색)",
        traits: ["멍때리기", "분석", "둔감함"],
        presets: {
            status: ["사랑 관련 다큐 시청", "무념무상"],
            recovery: ["관심 분야 덕질", "혼자 놀기"],
            warning: ["현실 도피"],
        },
        pitfalls: ["ESFJ"],
        recommend: ["ENTP"],
        ogTitle: "INTP 사랑의 철학자",
    },
    INFP: {
        mbti: "INFP",
        name: "비련의 주인공",
        summary: "세상의 모든 슬픔은 다 내 거야...",
        traits: ["눈물", "망상", "감정 과잉"],
        presets: {
            status: ["새벽 감성 SNS", "무한 상상"],
            recovery: ["예술 활동", "영화 보기"],
            warning: ["우울감 중독 주의"],
        },
        pitfalls: ["ESTJ"],
        recommend: ["ENFJ"],
        ogTitle: "INFP 비련의 주인공",
    },
    ESTP: {
        mbti: "ESTP",
        name: "환승 이별러",
        summary: "세상에 반이 여자(남자)인데 뭐! 놀자!",
        traits: ["단순함", "활동적", "새로운 만남"],
        presets: {
            status: ["소개팅 어플", "친구들과 파티"],
            recovery: ["운동", "술자리"],
            warning: ["성급한 새 출발"],
        },
        pitfalls: ["INFJ"],
        recommend: ["ISTP"],
        ogTitle: "ESTP 환승 이별러",
    },
    ESFP: {
        mbti: "ESFP",
        name: "파티 피플",
        summary: "외로우니까 사람들 만나서 놀래 ㅠㅠ (근데 웃고 있음)",
        traits: ["관종", "수다", "충동적"],
        presets: {
            status: ["매일 약속 있음", "쇼핑/지름신"],
            recovery: ["여행", "클럽/노래방"],
            warning: ["텅장 주의"],
        },
        pitfalls: ["INTJ"],
        recommend: ["ISFP"],
        ogTitle: "ESFP 파티 피플",
    },
    ENFP: {
        mbti: "ENFP",
        name: "감정 롤러코스터",
        summary: "낮엔 웃고 밤엔 울고, 조울증 아님 주의",
        traits: ["기복 심함", "말 많음", "쉽게 빠짐"],
        presets: {
            status: ["새벽 전화 시도", "친구 붙잡고 하소연"],
            recovery: ["새로운 취미", "여행"],
            warning: ["흑역사 생성 주의"],
        },
        pitfalls: ["ISTJ"],
        recommend: ["INFJ"],
        ogTitle: "ENFP 감정 롤러코스터",
    },
    ENTP: {
        mbti: "ENTP",
        name: "자기 합리화 장인",
        summary: "어차피 헤어질 거였어. 오히려 좋아!",
        traits: ["합리화", "새로운 재미", "쿨함"],
        presets: {
            status: ["다른 이성 탐색", "토론/논쟁"],
            recovery: ["새로운 프로젝트", "친구들과 놀기"],
            warning: ["상대방 디스 주의"],
        },
        pitfalls: ["ISFJ"],
        recommend: ["INTP"],
        ogTitle: "ENTP 자기 합리화 장인",
    },
    ESTJ: {
        mbti: "ESTJ",
        name: "일상 복귀 머신",
        summary: "슬퍼할 시간이 어디 있어? 내일 출근해야지.",
        traits: ["현실적", "책임감", "감정 절제"],
        presets: {
            status: ["업무/학업 열중", "스케줄 가득"],
            recovery: ["성취감 느끼기", "운동"],
            warning: ["번아웃 주의"],
        },
        pitfalls: ["INFP"],
        recommend: ["ISTJ"],
        ogTitle: "ESTJ 일상 복귀 머신",
    },
    ESFJ: {
        mbti: "ESFJ",
        name: "관계 의존형",
        summary: "친구들아 나 좀 위로해줘 ㅠㅠ (하루종일 징징)",
        traits: ["위로 갈구", "대화", "관계 중시"],
        presets: {
            status: ["친구들과의 모임", "카톡방 테러"],
            recovery: ["수다 떨기", "쇼핑"],
            warning: ["친구 피로도 주의"],
        },
        pitfalls: ["INTP"],
        recommend: ["ISFJ"],
        ogTitle: "ESFJ 관계 의존형",
    },
    ENFJ: {
        mbti: "ENFJ",
        name: "성장통 겪는 리더",
        summary: "이 아픔도 나를 성장시키는 거름이 되겠지...",
        traits: ["의미 부여", "긍정적", "사람 좋음"],
        presets: {
            status: ["자아 성찰", "봉사 활동(?)"],
            recovery: ["모임 주도", "운동"],
            warning: ["지나친 긍정 회로"],
        },
        pitfalls: ["ISTP"],
        recommend: ["INFP"],
        ogTitle: "ENFJ 성장통 겪는 리더",
    },
    ENTJ: {
        mbti: "ENTJ",
        name: "인생 리셋터",
        summary: "연애 끝. 다음 챕터 로딩 중.",
        traits: ["효율", "미래 지향", "삭제"],
        presets: {
            status: ["대청소", "연락처 삭제"],
            recovery: ["커리어 집중", "새 계획 수립"],
            warning: ["감정 무시"],
        },
        pitfalls: ["ISFP"],
        recommend: ["INTJ"],
        ogTitle: "ENTJ 인생 리셋터",
    },
}
