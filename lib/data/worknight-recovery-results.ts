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

export const WORKNIGHT_RECOVERY_RESULTS: Record<string, ResultType> = {
  ISTJ: {
    mbti: "ISTJ",
    name: "고정 루틴 회복 장인",
    summary: "퇴근 후 정해진 시간에 운동하고 샤워하면 세상 모든 스트레스가 녹는 타입",
    traits: ["루틴 사수", "혼자 조용히", "계획적 마무리"],
    presets: {
      status: ["취침 전 내일 할 일 체크리스트 작성", "야식보다 정해진 시간 식사"],
      recovery: ["일주일 단위 저녁 루틴 고정하기", "주말 같은 기상 시간 유지"],
      warning: ["루틴이 깨지면 하루 전체가 무너진 느낌, 유연성 연습 필요"],
    },
    pitfalls: ["ESFP"],
    recommend: ["ISFJ"],
    ogTitle: "ISTJ 고정 루틴 회복 장인",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "따뜻한 저녁 준비형",
    summary: "퇴근 후 집에서 좋아하는 음식 만들면서 가족·반려동물 챙기는 게 최고 힐링",
    traits: ["가정 중심 회복", "세심한 준비", "조용한 돌봄"],
    presets: {
      status: ["집 깨끗이 정돈 후 비로소 릴랙스 가능", "가족 안부 챙기고 내 시간"],
      recovery: ["좋아하는 음식 직접 요리하기", "취침 전 따뜻한 음료 한 잔"],
      warning: ["남 챙기다 자기 회복 시간 0에 수렴, 퇴근 후 혼자 30분은 확보"],
    },
    pitfalls: ["ENTP"],
    recommend: ["ISTJ"],
    ogTitle: "ISFJ 따뜻한 저녁 준비형",
  },
  INFJ: {
    mbti: "INFJ",
    name: "심층 정리 사색가",
    summary: "하루를 글이나 독서로 '소화'해야 진짜 쉬는 느낌이 나는 타입",
    traits: ["내면 정리 우선", "독서·글쓰기 힐링", "조용한 성찰"],
    presets: {
      status: ["일기나 메모로 오늘 감정 정리", "팟캐스트 들으며 혼자 산책"],
      recovery: ["주 2회 이상 독서 시간 확보", "디지털 디톡스 1시간 확보"],
      warning: ["생각을 너무 오래 붙잡고 있어서 수면 지연, 취침 30분 전 메모 마감"],
    },
    pitfalls: ["ESTP"],
    recommend: ["INFP"],
    ogTitle: "INFJ 심층 정리 사색가",
  },
  INTJ: {
    mbti: "INTJ",
    name: "효율 재충전 전략가",
    summary: "퇴근 후 시간을 낭비 없이 써야 직성이 풀리는 자기계발형 야간 타입",
    traits: ["시간 최적화", "혼자 집중", "내일 준비"],
    presets: {
      status: ["퇴근 후 독학·사이드 프로젝트 1시간", "내일 우선순위 3개 정해두기"],
      recovery: ["일주일에 한 번은 완전한 여유 저녁 허용", "조용한 카페나 도서관 환경 변화"],
      warning: ["항상 '생산적'이어야 한다는 압박 — 아무것도 안 하는 시간도 투자"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["INTP"],
    ogTitle: "INTJ 효율 재충전 전략가",
  },
  ISTP: {
    mbti: "ISTP",
    name: "혼자 고요 탱크형",
    summary: "퇴근 후 혼자서 취미에 완전히 빠져드는 시간이 가장 큰 에너지 충전",
    traits: ["독립적 회복", "손으로 하는 취미", "조용한 몰입"],
    presets: {
      status: ["게임·악기·DIY 혼자 취미 타임", "아무도 건드리지 않는 시간 확보"],
      recovery: ["몸을 쓰는 활동(운동·요리·수리)으로 머리 비우기", "기기 알림 전부 끄기"],
      warning: ["완전 고립 모드 장기화 시 관계 단절감, 주 1회 사람 만나는 일정 유지"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ISFP"],
    ogTitle: "ISTP 혼자 고요 탱크형",
  },
  ISFP: {
    mbti: "ISFP",
    name: "감각 힐링 탐험가",
    summary: "퇴근 후 맛있는 거 먹고, 좋아하는 음악 틀고, 좋은 향초 켜면 세상 부러울 게 없는 타입",
    traits: ["오감 충전", "즉흥 여유", "조용한 감성"],
    presets: {
      status: ["기분 따라 다른 음악·영상·음식으로 분위기 전환", "혼자만의 감성 시간"],
      recovery: ["좋아하는 카페 산책 또는 공원 걷기", "새로운 메뉴·플레이리스트 시도"],
      warning: ["기분 따라 너무 들쭉날쭉, 다음날 컨디션 관리 위해 수면 시간만 고정"],
    },
    pitfalls: ["ENTJ"],
    recommend: ["ISTP"],
    ogTitle: "ISFP 감각 힐링 탐험가",
  },
  INFP: {
    mbti: "INFP",
    name: "감정 소화 몽상가",
    summary: "퇴근 후 오늘 하루를 멍하니 되짚으며 감정을 충분히 '느끼는' 시간이 필요한 타입",
    traits: ["감정 정화", "창작 힐링", "느린 회복"],
    presets: {
      status: ["좋아하는 곡 틀고 감성에 잠기는 시간", "그림·글·일기로 감정 표현"],
      recovery: ["억지로 뭔가 하지 않는 '멍 때리기' 허용", "취침 전 감사 일기 3줄"],
      warning: ["감정 소화가 너무 길어져 수면 방해, 생각 마감 시간 정하기"],
    },
    pitfalls: ["ESTJ"],
    recommend: ["INFJ"],
    ogTitle: "INFP 감정 소화 몽상가",
  },
  INTP: {
    mbti: "INTP",
    name: "야간 딥다이브 분석가",
    summary: "퇴근 후가 진짜 집중 시간 — 궁금한 걸 새벽까지 파고드는 야행성 지식 탐험가",
    traits: ["야간 집중", "지식 탐구", "자유로운 흐름"],
    presets: {
      status: ["관심 주제 유튜브·위키 딥다이브", "코딩·퍼즐·분석 혼자 타임"],
      recovery: ["뇌를 완전히 끄는 시간 의도적으로 만들기", "운동으로 머리 환기"],
      warning: ["새벽 4시까지 깨어 있다가 다음날 폭망 — 수면 알람 필수"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["INTJ"],
    ogTitle: "INTP 야간 딥다이브 분석가",
  },
  ESTP: {
    mbti: "ESTP",
    name: "즉흥 에너지 폭발형",
    summary: "퇴근 후 계획 없이 전화 한 통으로 약속 잡고 밖으로 나가야 진짜 재충전",
    traits: ["즉흥 약속", "활동적 회복", "사람 에너지"],
    presets: {
      status: ["퇴근 직후 동료 또는 친구에게 연락 쏘기", "새로운 장소·음식 탐험"],
      recovery: ["주 2~3회 운동 또는 야외 활동", "새로운 경험 의도적으로 넣기"],
      warning: ["과도한 야외 활동 후 수면 부족, 주 1~2회는 일찍 귀가 계획"],
    },
    pitfalls: ["INFJ"],
    recommend: ["ESFP"],
    ogTitle: "ESTP 즉흥 에너지 폭발형",
  },
  ESFP: {
    mbti: "ESFP",
    name: "신나는 저녁 파티형",
    summary: "퇴근 후 맛집·모임·유흥이 최고 — 사람들과 함께일 때 배터리가 풀충전",
    traits: ["모임 에너지", "즉흥 맛집", "함께 재충전"],
    presets: {
      status: ["SNS 공유하고 댓글 소통", "좋아하는 사람들과 대화·공연·외식"],
      recovery: ["활동적이고 즐거운 약속으로 에너지 채우기", "음악·춤·놀이 타임"],
      warning: ["매일 약속으로 혼자 있는 시간이 없어지면 감정 과부하, 주 1일 홈 데이"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["ESTP"],
    ogTitle: "ESFP 신나는 저녁 파티형",
  },
  ENFP: {
    mbti: "ENFP",
    name: "산발적 에너지 방전형",
    summary: "퇴근 후 열 가지 하고 싶은 게 동시에 생기는데 결국 소파에서 유튜브",
    traits: ["아이디어 과부하", "즉흥 전환", "감성 충전"],
    presets: {
      status: ["새로운 취미 찾기, 친구에게 갑자기 연락", "아이디어 메모 쏟아내기"],
      recovery: ["좋아하는 사람들과 의미 있는 대화", "창작 활동으로 감정 표현"],
      warning: ["에너지 분산으로 아무것도 못 마치는 느낌, 저녁 한 가지만 집중 목표"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["ENTP"],
    ogTitle: "ENFP 산발적 에너지 방전형",
  },
  ENTP: {
    mbti: "ENTP",
    name: "밤샘 토론 에너자이저",
    summary: "퇴근 후 흥미로운 주제로 누군가와 대화를 나눠야 진짜 하루가 마무리되는 타입",
    traits: ["토론 힐링", "아이디어 교환", "야간 활동가"],
    presets: {
      status: ["흥미로운 기사·논쟁 주제 공유", "친구·커뮤니티와 심층 대화"],
      recovery: ["관심 분야 깊이 파기", "새로운 관점 자극하는 콘텐츠"],
      warning: ["흥분해서 수면 타이밍 놓침 — 취침 1시간 전 디지털 마감"],
    },
    pitfalls: ["ISFJ"],
    recommend: ["ENFP"],
    ogTitle: "ENTP 밤샘 토론 에너자이저",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "퇴근 후도 생산형",
    summary: "집에 와도 내일 일정 확인하고, 운동하고, 내일 아침 준비까지 해야 마음이 놓이는 타입",
    traits: ["저녁 생산성", "루틴 실행", "내일 대비"],
    presets: {
      status: ["운동·집안일·내일 준비 실행", "수면 전 일정 최종 확인"],
      recovery: ["주말에는 완전히 오프 모드 실험", "가족·친구와 저녁 식사 시간"],
      warning: ["퇴근 후에도 일 모드 유지로 번아웃, 하루 30분 '비생산적' 시간 허용"],
    },
    pitfalls: ["INFP"],
    recommend: ["ISTJ"],
    ogTitle: "ESTJ 퇴근 후도 생산형",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "가족 중심 저녁 허브",
    summary: "퇴근 후 가족·친구 챙기고 같이 밥 먹을 때 가장 충전이 잘 되는 따뜻한 타입",
    traits: ["관계 충전", "함께 식사", "돌봄 에너지"],
    presets: {
      status: ["가족 저녁 식사 준비·함께 먹기", "친구 안부 연락"],
      recovery: ["좋아하는 사람들과 이야기 나누기", "따뜻한 분위기에서 편안한 저녁"],
      warning: ["남 걱정하느라 자기 스트레스 놓침, 일주일에 한 번은 혼자만의 저녁"],
    },
    pitfalls: ["INTP"],
    recommend: ["ISFJ"],
    ogTitle: "ESFJ 가족 중심 저녁 허브",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "관계 에너지 리더",
    summary: "퇴근 후에도 의미 있는 연결이 있어야 하루가 완성되는 인간 관계 충전 타입",
    traits: ["관계 우선", "감정 나눔", "따뜻한 마무리"],
    presets: {
      status: ["지인 격려·응원 메시지 보내기", "의미 있는 대화로 하루 정리"],
      recovery: ["가까운 사람과 깊은 대화 시간", "공동체·모임에서 에너지 충전"],
      warning: ["남의 감정 받아주다 정작 자신이 방전, 일주일에 이틀은 연락 차단 저녁"],
    },
    pitfalls: ["ISTP"],
    recommend: ["ESFJ"],
    ogTitle: "ENFJ 관계 에너지 리더",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "야간 성장 드라이버",
    summary: "퇴근 후에도 뭔가 이루고 있어야 직성이 풀리는 진짜 야망 있는 야간 전략가",
    traits: ["목표 지향", "야간 자기계발", "효율 극대화"],
    presets: {
      status: ["사이드 프로젝트·독서·운동으로 저녁 채우기", "내일 목표 명문화"],
      recovery: ["성과 없이 쉬는 연습 — 의도적 여가 일정 추가", "신뢰하는 사람과 대화"],
      warning: ["쉬는 것도 비효율로 느껴지는 완벽주의, 주 1회 '아무것도 안 하기' 챌린지"],
    },
    pitfalls: ["ISFP"],
    recommend: ["INTJ"],
    ogTitle: "ENTJ 야간 성장 드라이버",
  },
};
