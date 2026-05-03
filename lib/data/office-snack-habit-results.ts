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

export const OFFICE_SNACK_HABIT_RESULTS: Record<string, ResultType> = {
  ISTJ: {
    mbti: "ISTJ",
    name: "정해진 간식 수호자",
    summary: "매일 같은 시간에 같은 간식을 꺼내는 완벽한 규칙형 — 서랍 속 간식 재고도 항상 일정",
    traits: ["고정 루틴", "익숙한 맛 선호", "계획적 보충"],
    presets: {
      status: ["오전 10시 반, 오후 3시 정각에 간식 타임", "자주 먹던 제품만 구매"],
      recovery: ["간식 변수 없이 일상 리듬 유지", "규칙적 혈당 관리"],
      warning: ["새로운 간식 나눔 문화에 당황 — 가끔 새 제품 시도해보기"],
    },
    pitfalls: ["ESFP"],
    recommend: ["ISFJ"],
    ogTitle: "ISTJ 정해진 간식 수호자",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "조용한 간식 나눔 요정",
    summary: "혼자 먹기 미안해서 동료 것까지 챙겨오는데 정작 본인 몫은 맨 나중에",
    traits: ["배려형 나눔", "조용한 공유", "타인 우선"],
    presets: {
      status: ["출근길 편의점에서 동료 몫까지 구매", "간식 먹는 자리에서 분위기 챙기기"],
      recovery: ["간식 타임에 가벼운 소통으로 하루 리셋", "나만의 작은 간식 루틴 확보"],
      warning: ["자기 간식 못 먹고 남 챙기다 허기짐 — 내 몫 먼저 확보"],
    },
    pitfalls: ["ENTP"],
    recommend: ["ISTJ"],
    ogTitle: "ISFJ 조용한 간식 나눔 요정",
  },
  INFJ: {
    mbti: "INFJ",
    name: "의미 있는 당 충전형",
    summary: "간식 하나도 그냥 먹지 않음 — 마음에 걸리는 일 있을 때 '이유 있는 단 것'을 찾는 타입",
    traits: ["감정 연동 간식", "혼자 섭취", "의미 부여"],
    presets: {
      status: ["업무 집중 전후 정해진 간식으로 심리 안전감", "혼자 조용히 분위기 즐기기"],
      recovery: ["스트레스 해소에 좋은 간식 패턴 의도적으로 만들기", "간식 나눔으로 관계 연결"],
      warning: ["감정 먹기 주의 — 스트레스 때마다 간식 찾는 패턴 점검"],
    },
    pitfalls: ["ESTP"],
    recommend: ["INFP"],
    ogTitle: "INFJ 의미 있는 당 충전형",
  },
  INTJ: {
    mbti: "INTJ",
    name: "칼로리 계산 전략가",
    summary: "간식도 식단의 일부 — 영양 성분표 보고 최적 간식을 선택하는 이성적 당 투입형",
    traits: ["영양 기반 선택", "계획적 섭취", "감성 차단"],
    presets: {
      status: ["단백질바·견과류 등 기능성 간식 위주", "칼로리 예산 안에서 최적화"],
      recovery: ["간식으로 오후 집중력 회복", "계획된 당 충전으로 업무 효율 유지"],
      warning: ["'맛'을 즐기는 시간도 필요함 — 가끔은 맛있는 것 그냥 먹기"],
    },
    pitfalls: ["ESFP"],
    recommend: ["INTP"],
    ogTitle: "INTJ 칼로리 계산 전략가",
  },
  ISTP: {
    mbti: "ISTP",
    name: "조용한 혼자 간식 탱크",
    summary: "주변 신경 안 쓰고 혼자 조용히 꺼내 먹고 사라지는 타입",
    traits: ["독립적 섭취", "나눔 불필요", "실용적 선택"],
    presets: {
      status: ["가방 속에 항상 본인 간식 구비", "대화 없이 먹고 일로 복귀"],
      recovery: ["간식 타임으로 짧은 리셋", "효율적인 당 보충"],
      warning: ["동료 나눔에 무반응 — 가끔 받거나 나눔으로 관계 온도 유지"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ISFP"],
    ogTitle: "ISTP 조용한 혼자 간식 탱크",
  },
  ISFP: {
    mbti: "ISFP",
    name: "감성 간식 큐레이터",
    summary: "예쁜 패키지, 새로운 맛, 계절 한정 — 간식 하나에도 감성이 넘치는 타입",
    traits: ["감성 소비", "신제품 탐험", "분위기 중시"],
    presets: {
      status: ["편의점 신상 발견 시 바로 구매", "간식 인증샷 찍기"],
      recovery: ["예쁜 간식으로 기분 전환", "감성 카페 메뉴 탐방"],
      warning: ["충동 구매 주의 — 가끔 구매 전 '진짜 먹고 싶은지' 체크"],
    },
    pitfalls: ["ENTJ"],
    recommend: ["ISTP"],
    ogTitle: "ISFP 감성 간식 큐레이터",
  },
  INFP: {
    mbti: "INFP",
    name: "감정 위로 당 보충형",
    summary: "기분이 가라앉을 때 무심결에 단 것 손이 가는 — 간식이 감정 온도계인 타입",
    traits: ["감정 연동", "위로 음식 선호", "나눔 감수성"],
    presets: {
      status: ["힘든 날 좋아하는 간식이 유일한 위로", "기분 좋을 때 동료와 나눔"],
      recovery: ["의도적으로 좋아하는 간식 확보해두기", "간식 타임에 짧은 감성 충전"],
      warning: ["기분 먹기 과의존 주의 — 감정 해소 다른 방법도 병행"],
    },
    pitfalls: ["ESTJ"],
    recommend: ["INFJ"],
    ogTitle: "INFP 감정 위로 당 보충형",
  },
  INTP: {
    mbti: "INTP",
    name: "간식 분석 연구소장",
    summary: "새로운 맛 조합을 탐구하거나 '이게 왜 맛있는지' 생각하며 먹는 분석형",
    traits: ["맛 탐구", "조용한 몰입", "논리적 선택"],
    presets: {
      status: ["낯선 조합 시도 후 내부 분석", "간식보다 커피·차 집중"],
      recovery: ["새로운 맛 발견으로 작은 즐거움 채우기", "머리 쓸 때 당 공급"],
      warning: ["간식 생각하다 일 놓치기 — 미리 챙겨두고 집중 모드"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["INTJ"],
    ogTitle: "INTP 간식 분석 연구소장",
  },
  ESTP: {
    mbti: "ESTP",
    name: "즉흥 간식 탐험대장",
    summary: "지나가다 신제품 보이면 바로 구매 — 오늘의 간식은 오늘 사무실에서 결정",
    traits: ["즉흥 구매", "공유형", "활동적 탐험"],
    presets: {
      status: ["편의점·카페 신상 즉흥 구매", "사무실에 간식 뿌리기"],
      recovery: ["간식 공유로 팀 분위기 업", "새로운 맛 도전으로 작은 재미"],
      warning: ["충동 구매 비용 누적 — 주간 간식 예산 정해두기"],
    },
    pitfalls: ["INFJ"],
    recommend: ["ESFP"],
    ogTitle: "ESTP 즉흥 간식 탐험대장",
  },
  ESFP: {
    mbti: "ESFP",
    name: "사무실 간식 파티 플래너",
    summary: "간식 먹을 때 혼자 먹으면 맛없음 — 동료 불러모아 간식 타임을 이벤트로 만드는 타입",
    traits: ["함께 나눔", "분위기 메이커", "공유 적극형"],
    presets: {
      status: ["간식 사오면 팀 전체에 공지", "간식 타임을 짧은 팀 소통으로 활용"],
      recovery: ["나눔으로 팀 에너지 업", "재미있는 간식으로 하루 활력"],
      warning: ["매일 간식 나눔 비용 과다 — 번갈아가며 당번 만들기"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["ESTP"],
    ogTitle: "ESFP 사무실 간식 파티 플래너",
  },
  ENFP: {
    mbti: "ENFP",
    name: "무계획 간식 스프린터",
    summary: "배고플 때마다 갑자기 편의점 뛰어가는 즉흥형 — 그때그때 느낌이 간식을 결정",
    traits: ["즉흥 충동", "다양성 추구", "나눔 열정"],
    presets: {
      status: ["갑자기 '간식 타임' 선언 후 편의점 투어", "요즘 관심 있는 음식 계속 시도"],
      recovery: ["새로운 맛 탐험으로 기분 전환", "동료와 나눔으로 연결감"],
      warning: ["간식 충동 구매 잦음 — 주간 간식 예산 박스 만들어 두기"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["ENTP"],
    ogTitle: "ENFP 무계획 간식 스프린터",
  },
  ENTP: {
    mbti: "ENTP",
    name: "간식 토론 도발러",
    summary: "간식 하나로 '이게 진짜 맛있냐'부터 시작해 팀 음식 토론을 이끄는 사무실 활성화제",
    traits: ["토론 유발", "의견 교환", "즉흥 공유"],
    presets: {
      status: ["신제품 먹어보고 바로 리뷰 공유", "맛 토론으로 사무실 활기"],
      recovery: ["대화로 에너지 충전", "재미있는 간식 발굴"],
      warning: ["간식 타임이 장시간 토론으로 변질 — 시간 인식 필요"],
    },
    pitfalls: ["ISFJ"],
    recommend: ["ENFP"],
    ogTitle: "ENTP 간식 토론 도발러",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "간식도 시스템형",
    summary: "팀 공용 간식함 관리하고 보충 순서까지 정해두는 — 간식에도 규칙이 필요한 타입",
    traits: ["규칙 기반", "체계적 관리", "공정 분배"],
    presets: {
      status: ["공용 간식 떨어지면 보충 지시 또는 직접 구매", "나눔 공정성 챙기기"],
      recovery: ["정해진 간식 루틴으로 업무 리듬 유지", "팀 간식 문화 만들기"],
      warning: ["간식에도 규칙 적용하다 분위기 경직 — 자유로운 나눔 문화 허용"],
    },
    pitfalls: ["INFP"],
    recommend: ["ISTJ"],
    ogTitle: "ESTJ 간식도 시스템형",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "전 직원 간식 케어러",
    summary: "동료 취향 기억해서 선물처럼 사다주는 — 간식 나눔이 관계 언어인 배려형",
    traits: ["취향 기억", "관계 중심 나눔", "따뜻한 배려"],
    presets: {
      status: ["'어제 좋아한다던 거' 기억해서 사다줌", "생일·이벤트 때 간식으로 챙기기"],
      recovery: ["나눔으로 관계 에너지 충전", "간식 대화로 팀 분위기 관리"],
      warning: ["남 챙기느라 자기 간식 예산 초과 — 본인 예산 따로 설정"],
    },
    pitfalls: ["INTP"],
    recommend: ["ISFJ"],
    ogTitle: "ESFJ 전 직원 간식 케어러",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "간식 나눔 팀빌딩 리더",
    summary: "간식 타임을 팀 결속의 기회로 만드는 타입 — 간식 하나에도 의미와 스토리가 담겨있음",
    traits: ["팀빌딩 활용", "의미 부여", "따뜻한 나눔"],
    presets: {
      status: ["간식 나눔으로 팀 분위기 체크", "새 팀원에게 간식 챙겨주기"],
      recovery: ["간식 대화에서 팀원 감정 파악", "간식 타임을 정기 소통 채널로"],
      warning: ["간식 나눔에 너무 큰 의미 부여 — 가벼운 즐거움으로도 OK"],
    },
    pitfalls: ["ISTP"],
    recommend: ["ESFJ"],
    ogTitle: "ENFJ 간식 나눔 팀빌딩 리더",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "간식도 최적화 전략가",
    summary: "혈당 관리, 집중력 유지를 위한 최적 간식 타이밍을 계산하는 성과형",
    traits: ["성과 연동", "최적화 사고", "실용 우선"],
    presets: {
      status: ["오후 2시 집중력 저하 전에 전략적 당 투입", "간식도 목표 달성 도구"],
      recovery: ["계획된 간식 루틴으로 생산성 유지", "동료 간식 타임 활용한 네트워킹"],
      warning: ["간식도 성과로 연결짓는 강박 — 가끔은 그냥 맛으로 먹기"],
    },
    pitfalls: ["ISFP"],
    recommend: ["INTJ"],
    ogTitle: "ENTJ 간식도 최적화 전략가",
  },
};
