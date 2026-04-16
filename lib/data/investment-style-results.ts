/**
 * 주식 투자 스타일 테스트 결과 데이터 (16유형)
 */

export interface ResultType {
    mbti: string
    name: string
    summary: string
    traits: string[]
    presets: {
        style: string[] // 투자 방식
        symbol: string[] // 상징 종목(?)
        habit: string[] // 투자 습관
    }
    pitfalls: string[] // 조심해야 할 것
    recommend: string[] // 찰떡 파트너
    ogTitle: string
}

export const INVESTMENT_STYLE_RESULTS: Record<string, ResultType> = {
    ISTJ: {
        mbti: "ISTJ",
        name: "인간 ETF",
        summary: "검증된 우량주만 산다. 잃지 않는 것이 목표.",
        traits: ["안전 제일", "장기 투자", "분산 투자"],
        presets: {
            style: ["적립식 매수", "배당주 위주"],
            symbol: ["S&P500", "삼성전자"],
            habit: ["재무제표 정독"],
        },
        pitfalls: ["급등주 추격 매수"],
        recommend: ["ESTJ"],
        ogTitle: "ISTJ 인간 ETF",
    },
    ISFJ: {
        mbti: "ISFJ",
        name: "소심한 개미",
        summary: "남들 다 산다고? 그럼 나도 조금만... (1주 매수)",
        traits: ["불안함", "눈치", "안정 추구"],
        presets: {
            style: ["소액 투자", "적금 선호"],
            symbol: ["채권", "예금"],
            habit: ["하루에 100번 시세 확인"],
        },
        pitfalls: ["팔랑귀"],
        recommend: ["ESFJ"],
        ogTitle: "ISFJ 소심한 개미",
    },
    INFJ: {
        mbti: "INFJ",
        name: "존버의 화신",
        summary: "이 회사의 가치를 믿으니까요. 10년 뒤에 뵙겠습니다.",
        traits: ["통찰력", "신념", "인내심"],
        presets: {
            style: ["가치 투자", "성장주"],
            symbol: ["친환경", "ESG"],
            habit: ["CEO 인터뷰 찾아보기"],
        },
        pitfalls: ["손절 타이밍 놓침"],
        recommend: ["INFP"],
        ogTitle: "INFJ 존버의 화신",
    },
    INTJ: {
        mbti: "INTJ",
        name: "차트 설계자",
        summary: "시장의 흐름은 이미 내 계산 안에 있다.",
        traits: ["전략적", "분석적", "냉철함"],
        presets: {
            style: ["시스템 트레이딩", "퀀트"],
            symbol: ["기술주", "반도체"],
            habit: ["엑셀로 수익률 관리"],
        },
        pitfalls: ["과도한 확신"],
        recommend: ["ENTJ"],
        ogTitle: "INTJ 차트 설계자",
    },
    ISTP: {
        mbti: "ISTP",
        name: "스나이퍼",
        summary: "조용히 있다가 한 방에 쏜다. (단타 고수)",
        traits: ["타이밍", "감각", "리스크 감수"],
        presets: {
            style: ["스윙", "단타"],
            symbol: ["테마주", "선물/옵션"],
            habit: ["뉴스 뜨자마자 매수"],
        },
        pitfalls: ["뇌동매매"],
        recommend: ["ESTP"],
        ogTitle: "ISTP 스나이퍼",
    },
    ISFP: {
        mbti: "ISFP",
        name: "감성 투자자",
        summary: "로고가 예뻐서 샀는데 상한가? (운이 좋음)",
        traits: ["직관", "소소함", "귀차니즘"],
        presets: {
            style: ["좋아하는 브랜드 투자", "쇼핑하듯 매수"],
            symbol: ["엔터주", "패션"],
            habit: ["수익 나면 바로 출금"],
        },
        pitfalls: ["묻지마 투자"],
        recommend: ["ESFP"],
        ogTitle: "ISFP 감성 투자자",
    },
    INTP: {
        mbti: "INTP",
        name: "블록체인 신봉자",
        summary: "화폐의 미래는 여기에 있어. (다소 난해함)",
        traits: ["신기술", "논리", "혁신"],
        presets: {
            style: ["코인", "스타트업"],
            symbol: ["비트코인", "AI"],
            habit: ["백서(Whitepaper) 읽기"],
        },
        pitfalls: ["현실 감각 부족"],
        recommend: ["ENTP"],
        ogTitle: "INTP 블록체인 신봉자",
    },
    INFP: {
        mbti: "INFP",
        name: "행복회로 풀가동",
        summary: "떨어져도 괜찮아... 언젠간 오를 거야... (눈물)",
        traits: ["희망", "로망", "현실 도피"],
        presets: {
            style: ["팬심 투자", "장기 보유(강제)"],
            symbol: ["바이오", "게임"],
            habit: ["기도 매매법"],
        },
        pitfalls: ["상장 폐지"],
        recommend: ["ENFJ"],
        ogTitle: "INFP 행복회로 풀가동",
    },
    ESTP: {
        mbti: "ESTP",
        name: "야수의 심장",
        summary: "인생은 한방! 풀매수 가즈아!!",
        traits: ["고위험", "고수익", "승부사"],
        presets: {
            style: ["레버리지", "급등주"],
            symbol: ["밈 코인", "작전주"],
            habit: ["상따(상한가 따라잡기)"],
        },
        pitfalls: ["강제 청산"],
        recommend: ["ISTP"],
        ogTitle: "ESTP 야수의 심장",
    },
    ESFP: {
        mbti: "ESFP",
        name: "따라쟁이",
        summary: "친구가 이거 좋대! 나도 살래!",
        traits: ["유행 민감", "즉흥적", "즐거움"],
        presets: {
            style: ["유행하는 주식", "방송 추천주"],
            symbol: ["소비재", "여행"],
            habit: ["주식방 리딩 따라하기"],
        },
        pitfalls: ["설거지 당함"],
        recommend: ["ISFP"],
        ogTitle: "ESFP 따라쟁이",
    },
    ENFP: {
        mbti: "ENFP",
        name: "문어발 주주",
        summary: "이것도 좋아 보이고 저것도 좋아 보이고 (백화점 계좌)",
        traits: ["호기심", "분산(너무 많이)", "낙관"],
        presets: {
            style: ["다이소 매매법", "소액 다수"],
            symbol: ["전 세계 주식", "모든 섹터"],
            habit: ["종목 까먹음"],
        },
        pitfalls: ["수수료 과다"],
        recommend: ["INFJ"],
        ogTitle: "ENFP 문어발 주주",
    },
    ENTP: {
        mbti: "ENTP",
        name: "역발상 투기꾼",
        summary: "남들이 공포에 떨 때 나는 산다.",
        traits: ["청개구리", "분석", "도전"],
        presets: {
            style: ["저점 매수", "공매도"],
            symbol: ["구조조정 기업", "변동성"],
            habit: ["시장과 싸움"],
        },
        pitfalls: ["지하실 구경"],
        recommend: ["INTP"],
        ogTitle: "ENTP 역발상 투기꾼",
    },
    ESTJ: {
        mbti: "ESTJ",
        name: "펀드매니저",
        summary: "목표 수익률 달성 시 기계적 매도.",
        traits: ["계획", "규칙", "냉정"],
        presets: {
            style: ["자산 배분", "리밸런싱"],
            symbol: ["우량주", "리츠"],
            habit: ["수익률 엑셀 정리"],
        },
        pitfalls: ["융통성 부족"],
        recommend: ["ISTJ"],
        ogTitle: "ESTJ 펀드매니저",
    },
    ESFJ: {
        mbti: "ESFJ",
        name: "정보 공유왕",
        summary: "좋은 정보 있으면 단톡방에 뿌림",
        traits: ["친목", "안정", "나눔"],
        presets: {
            style: ["안전 마진", "배당"],
            symbol: ["생활 소비재", "통신"],
            habit: ["주주 총회 참석(?)"],
        },
        pitfalls: ["정보의 홍수"],
        recommend: ["ISFJ"],
        ogTitle: "ESFJ 정보 공유왕",
    },
    ENFJ: {
        mbti: "ENFJ",
        name: "착한 투자자",
        summary: "세상을 바꾸는 기업에 투자합니다.",
        traits: ["비전", "가치", "리더십"],
        presets: {
            style: ["ESG 투자", "임팩트 투자"],
            symbol: ["신재생 에너지", "교육"],
            habit: ["기업 윤리 확인"],
        },
        pitfalls: ["수익률 무시"],
        recommend: ["INFP"],
        ogTitle: "ENFJ 착한 투자자",
    },
    ENTJ: {
        mbti: "ENTJ",
        name: "기업 사냥꾼",
        summary: "이 회사는 내가 인수하고 싶군.",
        traits: ["대담함", "큰 손", "지배"],
        presets: {
            style: ["집중 투자", "M&A 관심"],
            symbol: ["독점 기업", "플랫폼"],
            habit: ["사업 보고서 분석"],
        },
        pitfalls: ["과도한 레버리지"],
        recommend: ["INTJ"],
        ogTitle: "ENTJ 기업 사냥꾼",
    },
}
