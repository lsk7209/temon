export interface ResultType {
  mbti: string;
  name: string;
  summary: string;
  traits: string[];
  presets: {
    status: string[];
    recovery: string[];
    warning: string[];
  };
  pitfalls: string[];
  recommend: string[];
  ogTitle: string;
}

export const FRIEND_DISTANCE_RESULTS: Record<string, ResultType> = {
  ISTJ: {
    mbti: "ISTJ",
    name: "정해진 거리 수호자",
    summary: "친구와 적당한 거리를 일정하게 유지하는 신뢰형 친구",
    traits: ["예측 가능한 관계", "약속 철저", "조용한 신뢰"],
    presets: {
      status: ["정기적으로 안부 묻기", "약속 시간·장소 미리 확정"],
      recovery: ["일주일에 한 번 정도 안부 메시지", "예측 가능한 만남 패턴"],
      warning: ["새로운 친구 사귀는 데 시간 오래 걸림"],
    },
    pitfalls: ["ENFP"],
    recommend: ["ISFJ"],
    ogTitle: "ISTJ 정해진 거리 수호자",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "조용히 챙기는 케어러",
    summary: "친구의 작은 변화도 알아채고 조용히 챙기는 따뜻한 친구",
    traits: ["세심한 관찰", "조용한 챙김", "안정적 관계"],
    presets: {
      status: ["친구 안부 먼저 묻기", "기념일 빠짐없이 챙김"],
      recovery: ["친구와 깊은 대화로 충전", "함께 보내는 시간 의미 부여"],
      warning: ["남 챙기다 자기 시간 부족"],
    },
    pitfalls: ["ENTP"],
    recommend: ["ISTJ"],
    ogTitle: "ISFJ 조용히 챙기는 케어러",
  },
  INFJ: {
    mbti: "INFJ",
    name: "깊이 연결되는 사색가",
    summary: "친구 수는 적지만 한 명 한 명과 깊이 연결되는 친밀형",
    traits: ["깊은 연결 추구", "선별적 친구", "감정 공명"],
    presets: {
      status: ["선택된 소수와 깊은 대화", "감정 흐름 민감하게 감지"],
      recovery: ["혼자만의 시간으로 관계 에너지 회복", "의미 있는 대화로 충전"],
      warning: ["친구 감정 과도하게 흡수해 번아웃"],
    },
    pitfalls: ["ESTP"],
    recommend: ["INFP"],
    ogTitle: "INFJ 깊이 연결되는 사색가",
  },
  INTJ: {
    mbti: "INTJ",
    name: "선별적 거리 전략가",
    summary: "친구 수에 욕심 없고, 의미 있는 소수와 효율적 관계 유지하는 타입",
    traits: ["선별적 관계", "독립성 우선", "효율적 소통"],
    presets: {
      status: ["꼭 필요한 대화에만 시간 투자", "혼자 시간이 친구 시간만큼 중요"],
      recovery: ["혼자 사색하며 관계 정리", "의미 있는 만남 1회 > 가벼운 만남 5회"],
      warning: ["과도하게 거리 두면 친구가 멀어졌다 느낌"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["INTP"],
    ogTitle: "INTJ 선별적 거리 전략가",
  },
  ISTP: {
    mbti: "ISTP",
    name: "쿨한 거리감 마스터",
    summary: "필요할 때만 만나도 어색하지 않은 적당한 거리 유지하는 자유형",
    traits: ["독립적 관계", "쿨한 거리", "활동 중심"],
    presets: {
      status: ["오랜만에 만나도 어제 본 듯 자연스러움", "공통 활동·취미 중심으로 만남"],
      recovery: ["혼자 취미 시간으로 에너지 충전", "필요할 때 친구 호출"],
      warning: ["연락 안 한 사이 친구가 서운해할 수 있음"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ISFP"],
    ogTitle: "ISTP 쿨한 거리감 마스터",
  },
  ISFP: {
    mbti: "ISFP",
    name: "감성 공유 친구",
    summary: "친구와 감정·분위기를 함께 느끼고 나누는 따뜻한 감성형",
    traits: ["감정 공유", "분위기 메이커", "조용한 따뜻함"],
    presets: {
      status: ["친구와 카페·전시 등 감성 시간 공유", "선물·메시지로 마음 표현"],
      recovery: ["친구와 함께 좋아하는 음악·영화 감상", "감성적 대화로 위로"],
      warning: ["갈등 회피 경향, 솔직한 의견 표현 어려움"],
    },
    pitfalls: ["ENTJ"],
    recommend: ["ISTP"],
    ogTitle: "ISFP 감성 공유 친구",
  },
  INFP: {
    mbti: "INFP",
    name: "이상적 친구 꿈꾸는 몽상가",
    summary: "친구와 진정한 영혼의 연결을 꿈꾸는 이상주의 친구",
    traits: ["깊은 연결 갈망", "이상적 우정", "감성 충실"],
    presets: {
      status: ["가치관 공유하는 친구 소중히 여김", "오랜만에 만나도 깊은 대화 추구"],
      recovery: ["친구와 의미 있는 시간 보내기", "감정 솔직하게 나누기"],
      warning: ["이상적 친구상에 못 미치면 실망감 큼"],
    },
    pitfalls: ["ESTJ"],
    recommend: ["INFJ"],
    ogTitle: "INFP 이상적 친구 꿈꾸는 몽상가",
  },
  INTP: {
    mbti: "INTP",
    name: "지적 토론 파트너",
    summary: "친구와 흥미로운 주제로 토론하는 게 가장 즐거운 지식형",
    traits: ["지적 호기심", "토론 즐김", "독립적 거리"],
    presets: {
      status: ["관심 분야 깊이 공유", "혼자 시간이 친구만큼 중요"],
      recovery: ["흥미로운 주제로 친구와 대화", "혼자 사색하며 정리"],
      warning: ["감정적 위로보다 분석 우선이라 차갑게 느껴질 수 있음"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["INTJ"],
    ogTitle: "INTP 지적 토론 파트너",
  },
  ESTP: {
    mbti: "ESTP",
    name: "즉흥 활동 친구",
    summary: "갑자기 연락해서 같이 놀자고 하는 액티브한 친구",
    traits: ["즉흥 만남", "활동 중심", "에너지 폭발"],
    presets: {
      status: ["갑자기 연락 후 즉흥 약속", "함께 새로운 경험 추구"],
      recovery: ["친구들과 활동적 만남으로 충전", "야외·새 장소 함께 탐험"],
      warning: ["깊은 대화보다 활동 중심이라 친밀함 부족 느낌"],
    },
    pitfalls: ["INFJ"],
    recommend: ["ESFP"],
    ogTitle: "ESTP 즉흥 활동 친구",
  },
  ESFP: {
    mbti: "ESFP",
    name: "분위기 메이커 친구",
    summary: "친구 모임의 활기를 책임지는 분위기 메이커형 친구",
    traits: ["분위기 메이커", "활발한 소통", "감정 풍부"],
    presets: {
      status: ["모임 분위기 띄우기", "친구 감정 즉각 반응"],
      recovery: ["친구들과 활발한 시간 보내기", "함께 즐거운 추억 쌓기"],
      warning: ["혼자 있으면 외로움 빠르게 느낌"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["ESTP"],
    ogTitle: "ESFP 분위기 메이커 친구",
  },
  ENFP: {
    mbti: "ENFP",
    name: "친구 부자 에너자이저",
    summary: "다양한 친구 그룹과 두루두루 잘 지내는 인싸형 친구",
    traits: ["폭넓은 관계", "에너지 폭발", "감정 풍부"],
    presets: {
      status: ["여러 그룹 친구와 두루 만남", "친구마다 다른 매력 발견"],
      recovery: ["친구들과 새로운 경험 공유", "깊은 대화로 영감 충전"],
      warning: ["친구 너무 많아 약속 관리 어려움"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["ENTP"],
    ogTitle: "ENFP 친구 부자 에너자이저",
  },
  ENTP: {
    mbti: "ENTP",
    name: "토론 즐기는 도발러",
    summary: "친구와 신선한 주제로 토론하며 자극받는 게 즐거운 친구",
    traits: ["토론 즐김", "도전적 의견", "에너지 자극"],
    presets: {
      status: ["흥미로운 주제 던지기", "친구 의견에 도전하며 자극"],
      recovery: ["새로운 친구 사귀기", "지적 자극 추구"],
      warning: ["도발적 농담이 친구에게 상처될 수 있음"],
    },
    pitfalls: ["ISFJ"],
    recommend: ["ENFP"],
    ogTitle: "ENTP 토론 즐기는 도발러",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "모임 주최 리더 친구",
    summary: "친구 모임을 주도하고 약속을 깔끔하게 정리하는 책임형 친구",
    traits: ["모임 리더", "체계적 약속", "신뢰 구축"],
    presets: {
      status: ["모임 일정·장소 직접 정함", "친구들 약속 빠짐없이 챙김"],
      recovery: ["친구들과 정기적 만남 유지", "관계도 체계적으로 관리"],
      warning: ["주도성 강해서 다른 친구 의견 묻지 않을 때 있음"],
    },
    pitfalls: ["INFP"],
    recommend: ["ISTJ"],
    ogTitle: "ESTJ 모임 주최 리더 친구",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "관계 허브 따뜻이",
    summary: "친구들 사이의 다리 역할을 자처하는 따뜻한 관계 허브",
    traits: ["관계 중재", "따뜻한 배려", "모임 조율"],
    presets: {
      status: ["친구 갈등 중재", "기념일·생일 빠짐없이 챙김"],
      recovery: ["친구들과 함께하는 시간으로 충전", "모임 통해 소속감 강화"],
      warning: ["친구들 감정 다 챙기다 자기 감정 놓침"],
    },
    pitfalls: ["INTP"],
    recommend: ["ISFJ"],
    ogTitle: "ESFJ 관계 허브 따뜻이",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "친구 성장 응원단장",
    summary: "친구의 꿈과 성장을 진심으로 응원하는 든든한 멘토형 친구",
    traits: ["친구 성장 응원", "감정 깊이 공명", "리더십"],
    presets: {
      status: ["친구 고민 진심으로 들어주기", "성장 위한 조언 아낌없이"],
      recovery: ["의미 있는 대화로 친구와 깊이 연결", "함께 성장하는 관계"],
      warning: ["친구 감정 너무 받아주다 본인 에너지 소진"],
    },
    pitfalls: ["ISTP"],
    recommend: ["ESFJ"],
    ogTitle: "ENFJ 친구 성장 응원단장",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "전략적 네트워크 매니저",
    summary: "친구 관계도 전략적으로 관리하는 비전 있는 리더형 친구",
    traits: ["전략적 관계", "성장 추구", "효율적 만남"],
    presets: {
      status: ["의미 있는 친구와 정기 만남", "관계 통해 서로 성장 자극"],
      recovery: ["성공한 친구들과 비전 공유", "도전 통해 함께 성장"],
      warning: ["효율 중시로 가벼운 우정 지나칠 때 있음"],
    },
    pitfalls: ["ISFP"],
    recommend: ["INTJ"],
    ogTitle: "ENTJ 전략적 네트워크 매니저",
  },
};
