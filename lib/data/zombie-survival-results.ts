/**
 * 좀비 아포칼립스 생존 유형 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
    mbti: string
    name: string
    summary: string
    traits: string[]
    presets: {
        role: string[] // 생존 그룹 내 역할
        item: string[] // 필수 생존템
        fate: string[] // 예상 결말
    }
    pitfalls: string[] // 같이 다니면 위험한 유형
    recommend: string[] // 생존 파트너
    ogTitle: string
}

export const ZOMBIE_SURVIVAL_RESULTS: Record<string, ResultType> = {
    ISTJ: {
        mbti: "ISTJ",
        name: "보급관",
        summary: "식량 재고 파악 완료. 하루 2끼 통조림 1/2개씩 배급합니다.",
        traits: ["철저함", "현실적", "규칙 준수"],
        presets: {
            role: ["물자 관리", "경계 근무"],
            item: ["통조림", "장부", "지도"],
            fate: ["끝까지 살아남아 재건에 참여"],
        },
        pitfalls: ["ENFP"],
        recommend: ["ESTJ"],
        ogTitle: "ISTJ 보급관",
    },
    ISFJ: {
        mbti: "ISFJ",
        name: "의무병",
        summary: "다친 데 없어요? 여기 밴드라도 붙이세요...",
        traits: ["헌신", "배려", "꼼꼼함"],
        presets: {
            role: ["치료", "멘탈 케어"],
            item: ["구급상자", "비상식량"],
            fate: ["타인을 구하려다 위험에 빠짐"],
        },
        pitfalls: ["ENTP"],
        recommend: ["ESFJ"],
        ogTitle: "ISFJ 의무병",
    },
    INFJ: {
        mbti: "INFJ",
        name: "예언자",
        summary: "저쪽 길은 느낌이 안 좋아요. 돌아가죠.",
        traits: ["직관", "통찰", "리더십(숨겨진)"],
        presets: {
            role: ["전략 조언", "정신적 지주"],
            item: ["나침반", "일기장"],
            fate: ["미래를 예측하고 새로운 문명 건설"],
        },
        pitfalls: ["ESTP"],
        recommend: ["INFP"],
        ogTitle: "INFJ 예언자",
    },
    INTJ: {
        mbti: "INTJ",
        name: "전략 사령관",
        summary: "이 벙커의 구조적 결함을 발견했습니다. 보수 작업 시작하죠.",
        traits: ["계획", "분석", "냉철"],
        presets: {
            role: ["기지 구축", "작전 설계"],
            item: ["청사진", "무전기"],
            fate: ["철옹성 같은 요새 구축 후 군림"],
        },
        pitfalls: ["ESFP"],
        recommend: ["ENTJ"],
        ogTitle: "INTJ 전략 사령관",
    },
    ISTP: {
        mbti: "ISTP",
        name: "만능 엔지니어",
        summary: "차 고장 났어? 비켜봐. (뚝딱뚝딱)",
        traits: ["기술", "도구", "임기응변"],
        presets: {
            role: ["운전", "수리", "제작"],
            item: ["맥가이버칼", "공구 세트"],
            fate: ["혼자 오토바이 타고 유유히 떠남"],
        },
        pitfalls: ["ENFJ"],
        recommend: ["ESTP"],
        ogTitle: "ISTP 만능 엔지니어",
    },
    ISFP: {
        mbti: "ISFP",
        name: "평화주의자",
        summary: "무서워... 우리 그냥 여기 숨어 있으면 안 될까?",
        traits: ["유순함", "눈치", "생존 본능"],
        presets: {
            role: ["수색 보조", "요리"],
            item: ["편안한 신발", "담요"],
            fate: ["뜻밖의 행운으로 끝까지 생존"],
        },
        pitfalls: ["ENTJ"],
        recommend: ["ESFP"],
        ogTitle: "ISFP 평화주의자",
    },
    INTP: {
        mbti: "INTP",
        name: "좀비 연구원",
        summary: "흥미롭군. 이 좀비는 시각보다 청각에 예민해.",
        traits: ["호기심", "분석", "개인주의"],
        presets: {
            role: ["약점 분석", "백신 연구"],
            item: ["노트북", "현미경(?)"],
            fate: ["연구하다가 실험체 될 뻔함"],
        },
        pitfalls: ["ESFJ"],
        recommend: ["ENTP"],
        ogTitle: "INTP 좀비 연구원",
    },
    INFP: {
        mbti: "INFP",
        name: "기록가",
        summary: "세상이 멸망해도 우리의 이야기는 남아야 해.",
        traits: ["감성", "이타심", "신념"],
        presets: {
            role: ["역사 기록", "아이 돌보기"],
            item: ["필기구", "가족 사진"],
            fate: ["인류애를 지키며 희망 전파"],
        },
        pitfalls: ["ESTJ"],
        recommend: ["ENFJ"],
        ogTitle: "INFP 기록가",
    },
    ESTP: {
        mbti: "ESTP",
        name: "좀비 슬레이어",
        summary: "야! 덤벼! 스트레스 풀리네!",
        traits: ["대담함", "액션", "순발력"],
        presets: {
            role: ["최전방 전투", "수색"],
            item: ["야구방망이", "오토바이"],
            fate: ["전설의 좀비 헌터로 등극"],
        },
        pitfalls: ["INFJ"],
        recommend: ["ISTP"],
        ogTitle: "ESTP 좀비 슬레이어",
    },
    ESFP: {
        mbti: "ESFP",
        name: "분위기 메이커",
        summary: "다들 너무 우울해하지 마! 내가 노래 불러줄게!",
        traits: ["낙천적", "에너지", "즉흥"],
        presets: {
            role: ["사기 진작", "엔터테이너"],
            item: ["악기", "스피커"],
            fate: ["좀비도 춤추게 만듦(?)"],
        },
        pitfalls: ["INTJ"],
        recommend: ["ISFP"],
        ogTitle: "ESFP 분위기 메이커",
    },
    ENFP: {
        mbti: "ENFP",
        name: "희망 전도사",
        summary: "우린 할 수 있어! 저 산 넘어에 분명 파라다이스가 있을 거야!",
        traits: ["열정", "긍정", "소통"],
        presets: {
            role: ["동기 부여", "협상"],
            item: ["확성기", "지도"],
            fate: ["새로운 생존자 그룹 규합"],
        },
        pitfalls: ["ISTJ"],
        recommend: ["INFJ"],
        ogTitle: "ENFP 희망 전도사",
    },
    ENTP: {
        mbti: "ENTP",
        name: "미친 과학자",
        summary: "좀비를 길들여서 썰매를 끌게 하면 어떨까?",
        traits: ["창의력", "도전", "위험"],
        presets: {
            role: ["발명", "함정 설치"],
            item: ["각종 잡동사니", "화학 약품"],
            fate: ["세상을 구할 뻔하거나 멸망시킴"],
        },
        pitfalls: ["ISFJ"],
        recommend: ["INTP"],
        ogTitle: "ENTP 미친 과학자",
    },
    ESTJ: {
        mbti: "ESTJ",
        name: "생존 그룹 리더",
        summary: "A조는 식량 탐색, B조는 바리케이드 보수. 실시!",
        traits: ["통솔", "질서", "책임감"],
        presets: {
            role: ["총괄 지휘", "규율 확립"],
            item: ["호루라기", "무전기"],
            fate: ["가장 강력한 생존 그룹 구축"],
        },
        pitfalls: ["INFP"],
        recommend: ["ISTJ"],
        ogTitle: "ESTJ 생존 그룹 리더",
    },
    ESFJ: {
        mbti: "ESFJ",
        name: "살림꾼",
        summary: "다들 밥은 챙겨 먹어야죠. 주먹밥 만들었어요.",
        traits: ["협동", "봉사", "친화력"],
        presets: {
            role: ["식사 당번", "갈등 중재"],
            item: ["조리 도구", "비타민"],
            fate: ["모든 생존자가 의지하는 엄마/아빠"],
        },
        pitfalls: ["INTP"],
        recommend: ["ISFJ"],
        ogTitle: "ESFJ 살림꾼",
    },
    ENFJ: {
        mbti: "ENFJ",
        name: "정의로운 용사",
        summary: "약한 사람을 두고 갈 순 없습니다! 다 같이 살아야죠!",
        traits: ["정의감", "카리스마", "사랑"],
        presets: {
            role: ["구조 대장", "정신적 지주"],
            item: ["확성기", "깃발"],
            fate: ["영웅으로 칭송받음"],
        },
        pitfalls: ["ISTP"],
        recommend: ["INFP"],
        ogTitle: "ENFJ 정의로운 용사",
    },
    ENTJ: {
        mbti: "ENTJ",
        name: "제국 건설자",
        summary: "이 혼란을 기회로 삼아 새로운 질서를 만든다.",
        traits: ["야망", "지배", "효율"],
        presets: {
            role: ["대장", "전략가"],
            item: ["지도", "권총"],
            fate: ["뉴 월드의 통치자가 됨"],
        },
        pitfalls: ["ISFP"],
        recommend: ["INTJ"],
        ogTitle: "ENTJ 제국 건설자",
    },
}
