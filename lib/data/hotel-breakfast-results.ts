/**
 * 호텔 조식 공략법 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
    mbti: string
    name: string
    summary: string
    traits: string[]
    presets: {
        plate: string[] // 접시 스타일
        mustEat: string[] // 필수 메뉴
        habit: string[] // 식사 습관
    }
    pitfalls: string[] // 같이 먹으면 체하는 유형
    recommend: string[] // 조식 메이트 추천
    ogTitle: string
}

export const HOTEL_BREAKFAST_RESULTS: Record<string, ResultType> = {
    ISTJ: {
        mbti: "ISTJ",
        name: "정석의 정석",
        summary: "샐러드부터 커피까지, 순서 뒤바뀌면 불편한 유형",
        traits: ["순서 중시", "깔끔한 접시", "남기지 않음"],
        presets: {
            plate: ["섹션별 분리", "여백의 미"],
            mustEat: ["베이컨", "스크램블", "토스트"],
            habit: ["천천히 꼭꼭 씹어먹기"],
        },
        pitfalls: ["ENFP"],
        recommend: ["ESTJ"],
        ogTitle: "ISTJ 정석의 정석",
    },
    ISFJ: {
        mbti: "ISFJ",
        name: "가족 챙김이",
        summary: "내 밥보다 일행 숟가락 먼저 챙기는 배려왕",
        traits: ["물 떠다 줌", "휴지 챙김", "세심함"],
        presets: {
            plate: ["나보다 남 챙기는 접시", "골고루"],
            mustEat: ["따뜻한 수프", "죽"],
            habit: ["맛있냐고 계속 물어봄"],
        },
        pitfalls: ["ENTP"],
        recommend: ["ESFJ"],
        ogTitle: "ISFJ 가족 챙김이",
    },
    INFJ: {
        mbti: "INFJ",
        name: "우아한 미식가",
        summary: "조용한 구석 자리에서 음미하는 고독한 미식가",
        traits: ["소식", "분위기", "건강식"],
        presets: {
            plate: ["조금씩 예쁘게", "색감 조화"],
            mustEat: ["요거트", "과일", "허브티"],
            habit: ["창밖 보며 사색"],
        },
        pitfalls: ["ESTP"],
        recommend: ["INFP"],
        ogTitle: "INFJ 우아한 미식가",
    },
    INTJ: {
        mbti: "INTJ",
        name: "효율적 사냥꾼",
        summary: "동선 최소화, 영양 밸런스 최적화 완료.",
        traits: ["전략적 담기", "시간 단축", "분석"],
        presets: {
            plate: ["단백질 위주", "탄단지 균형"],
            mustEat: ["계란", "고기", "블랙커피"],
            habit: ["먹는 데만 집중"],
        },
        pitfalls: ["ESFP"],
        recommend: ["ENTJ"],
        ogTitle: "INTJ 효율적 사냥꾼",
    },
    ISTP: {
        mbti: "ISTP",
        name: "육식 공룡",
        summary: "풀은 장식일 뿐. 고기만 공략한다.",
        traits: ["편식", "고기 러버", "심플"],
        presets: {
            plate: ["소시지 산", "베이컨"],
            mustEat: ["고기", "고기", "또 고기"],
            habit: ["빠르게 먹고 나감"],
        },
        pitfalls: ["ENFJ"],
        recommend: ["ESTP"],
        ogTitle: "ISTP 육식 공룡",
    },
    ISFP: {
        mbti: "ISFP",
        name: "느긋한 브런처",
        summary: "잠옷 바람으로 내려와서 세월아 네월아~",
        traits: ["늦잠", "여유", "디저트 사랑"],
        presets: {
            plate: ["빵 가득", "달달한 거"],
            mustEat: ["와플", "팬케이크", "주스"],
            habit: ["먹다가 졸음"],
        },
        pitfalls: ["ENTJ"],
        recommend: ["ESFP"],
        ogTitle: "ISFP 느긋한 브런처",
    },
    INTP: {
        mbti: "INTP",
        name: "퓨전 실험실",
        summary: "이거랑 이거 섞으면 무슨 맛일까? (괴식 제조)",
        traits: ["호기심", "도전", "괴짜"],
        presets: {
            plate: ["정체불명 혼종", "실험작"],
            mustEat: ["처음 보는 메뉴"],
            habit: ["음식 분해해 봄"],
        },
        pitfalls: ["ESFJ"],
        recommend: ["ENTP"],
        ogTitle: "INTP 퓨전 실험실",
    },
    INFP: {
        mbti: "INFP",
        name: "감성 플레이터",
        summary: "먹는 것보다 사진 찍는 게 더 중요한 예술가",
        traits: ["인증샷", "예쁨 주의", "소녀 감성"],
        presets: {
            plate: ["카페 스타일", "알록달록"],
            mustEat: ["시리얼", "베이커리"],
            habit: ["사진 100장 찍기"],
        },
        pitfalls: ["ESTJ"],
        recommend: ["ENFJ"],
        ogTitle: "INFP 감성 플레이터",
    },
    ESTP: {
        mbti: "ESTP",
        name: "가성비 파이터",
        summary: "뽕을 뽑아야지! 비싼 것만 골라 담는 승부사",
        traits: ["본전 생각", "폭식", "스피드"],
        presets: {
            plate: ["훈제 연어", "스테이크"],
            mustEat: ["제일 비싼 거"],
            habit: ["접시 쌓기 신공"],
        },
        pitfalls: ["INFJ"],
        recommend: ["ISTP"],
        ogTitle: "ESTP 가성비 파이터",
    },
    ESFP: {
        mbti: "ESFP",
        name: "수다쟁이",
        summary: "입은 먹느라 바쁘고 말하느라 바쁘고",
        traits: ["시끄러움", "즐거움", "친화력"],
        presets: {
            plate: ["다양하게 조금씩", "디저트"],
            mustEat: ["즉석 요리"],
            habit: ["옆 테이블 구경"],
        },
        pitfalls: ["INTJ"],
        recommend: ["ISFP"],
        ogTitle: "ESFP 수다쟁이",
    },
    ENFP: {
        mbti: "ENFP",
        name: "뷔페 탐험가",
        summary: "우와! 이것도 있다! 저것도 있다! (접시 난장판)",
        traits: ["산만함", "신기함", "행복"],
        presets: {
            plate: ["뒤죽박죽", "넘침"],
            mustEat: ["키즈 코너 메뉴(?)"],
            habit: ["흘리고 먹음"],
        },
        pitfalls: ["ISTJ"],
        recommend: ["INFJ"],
        ogTitle: "ENFP 뷔페 탐험가",
    },
    ENTP: {
        mbti: "ENTP",
        name: "쉐프 빙의",
        summary: "샌드위치는 이렇게 만들어야지. 나만의 레시피 창조",
        traits: ["창의적", "커스텀", "만족감"],
        presets: {
            plate: ["DIY 샌드위치", "비빔밥"],
            mustEat: ["재료 조합"],
            habit: ["남들에게 레시피 전파"],
        },
        pitfalls: ["ISFJ"],
        recommend: ["INTP"],
        ogTitle: "ENTP 쉐프 빙의",
    },
    ESTJ: {
        mbti: "ESTJ",
        name: "조식 사령관",
        summary: "자, 8시까지 다 먹고 8시 10분에 로비 집합.",
        traits: ["시간 엄수", "통제", "계획"],
        presets: {
            plate: ["필수 영양소", "한식 위주"],
            mustEat: ["밥", "국", "김치"],
            habit: ["시계 계속 봄"],
        },
        pitfalls: ["INFP"],
        recommend: ["ISTJ"],
        ogTitle: "ESTJ 조식 사령관",
    },
    ESFJ: {
        mbti: "ESFJ",
        name: "토스트 요정",
        summary: "OO아, 너 이거 좋아하지? 내가 가져왔어!",
        traits: ["챙겨주기", "공유", "다정"],
        presets: {
            plate: ["나눔용 접시", "푸짐"],
            mustEat: ["과일", "빵"],
            habit: ["서로 먹여주기"],
        },
        pitfalls: ["INTP"],
        recommend: ["ISFJ"],
        ogTitle: "ESFJ 토스트 요정",
    },
    ENFJ: {
        mbti: "ENFJ",
        name: "조식 예찬론자",
        summary: "아침을 든든하게 먹어야 여행이 즐겁죠! (연설)",
        traits: ["분위기 주도", "감탄", "긍정"],
        presets: {
            plate: ["건강식", "비건"],
            mustEat: ["신선한 주스", "샐러드"],
            habit: ["직원에게 감사 인사"],
        },
        pitfalls: ["ISTP"],
        recommend: ["INFP"],
        ogTitle: "ENFJ 조식 예찬론자",
    },
    ENTJ: {
        mbti: "ENTJ",
        name: "에너지 충전기",
        summary: "오늘 일정 빡세니까 확실하게 열량 채웁니다.",
        traits: ["목적 지향", "전투적", "든든함"],
        presets: {
            plate: ["고칼로리", "에너지바"],
            mustEat: ["오믈렛", "소시지"],
            habit: ["먹으면서 일정 브리핑"],
        },
        pitfalls: ["ISFP"],
        recommend: ["INTJ"],
        ogTitle: "ENTJ 에너지 충전기",
    },
}
