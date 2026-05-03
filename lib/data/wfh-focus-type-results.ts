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

export const WFH_FOCUS_TYPE_RESULTS: Record<string, ResultType> = {
  ISTJ: {
    mbti: "ISTJ",
    name: "재택 루틴 철벽 수호자",
    summary: "출근 시간, 점심 시간, 퇴근 시간이 사무실보다 더 정확한 집 속의 직장인",
    traits: ["고정 스케줄", "혼자 집중", "루틴 철수"],
    presets: {
      status: ["같은 자리, 같은 시간 시작", "체크리스트 없으면 불안"],
      recovery: ["퇴근 시간 명확히 끊기", "주간 루틴 점검 후 다음 주 준비"],
      warning: ["루틴 방해 요소(가족·택배·알림)에 극도로 예민해지기 쉬움"],
    },
    pitfalls: ["ESFP"],
    recommend: ["ISFJ"],
    ogTitle: "ISTJ 재택 루틴 철벽 수호자",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "집 속 성실 지원군",
    summary: "집에서도 팀원 체크인하고 회의 전 자료 미리 준비하는 조용한 헌신형",
    traits: ["세심한 준비", "팀 지원 우선", "안정 추구"],
    presets: {
      status: ["회의 전 메모·자료 준비 완벽 완료", "동료 업무 도움 요청 항상 수락"],
      recovery: ["점심 휴식 충분히 챙기기", "혼자만의 조용한 집중 시간"],
      warning: ["재택 중에도 팀 요청 전부 받다가 내 업무 밀림 — 경계 설정 필요"],
    },
    pitfalls: ["ENTP"],
    recommend: ["ISTJ"],
    ogTitle: "ISFJ 집 속 성실 지원군",
  },
  INFJ: {
    mbti: "INFJ",
    name: "심층 집중 은둔 창작형",
    summary: "집이야말로 진짜 나의 공간 — 방해 없이 깊이 파고들 때 최고 퍼포먼스",
    traits: ["심층 몰입", "은둔 집중", "창의 흐름"],
    presets: {
      status: ["방해 금지 모드 켜놓고 2~3시간 딥 포커스", "작업 결과물 퀄리티 높음"],
      recovery: ["집중 후 산책으로 뇌 환기", "조용한 음악으로 전환 신호"],
      warning: ["너무 깊이 파서 회의 놓치기 — 알람 설정 필수"],
    },
    pitfalls: ["ESTP"],
    recommend: ["INFP"],
    ogTitle: "INFJ 심층 집중 은둔 창작형",
  },
  INTJ: {
    mbti: "INTJ",
    name: "재택 효율 극대화 설계자",
    summary: "재택이 오히려 사무실보다 생산성 높다는 것을 데이터로 증명하는 타입",
    traits: ["효율 최적화", "자율 관리", "목표 집중"],
    presets: {
      status: ["방해 없이 집중 구간 극대화", "포모도로·타임블로킹 활용"],
      recovery: ["성과 측정 후 다음 날 개선", "운동으로 뇌 전환"],
      warning: ["재택 고립으로 협업·피드백 부재 — 정기 체크인 의도적으로 유지"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["INTP"],
    ogTitle: "INTJ 재택 효율 극대화 설계자",
  },
  ISTP: {
    mbti: "ISTP",
    name: "완전 자율 집중 조종사",
    summary: "누가 없을 때 제일 잘 됨 — 재택이 최고의 업무 환경인 독립형",
    traits: ["완전 자율", "방해 배제", "실용적 집중"],
    presets: {
      status: ["화상 회의 카메라 끄고 일 집중", "자기 방식대로 빠르게 처리"],
      recovery: ["집중 후 취미 활동으로 전환", "조용한 개인 시간으로 재충전"],
      warning: ["소통 단절 주의 — 중간 중간 상황 공유해야 신뢰 유지"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ISFP"],
    ogTitle: "ISTP 완전 자율 집중 조종사",
  },
  ISFP: {
    mbti: "ISFP",
    name: "분위기 따라 집중 부유형",
    summary: "날씨 좋으면 창가에서, 비 오면 이불 속에서 — 집중 공간이 그날 감성 따라 달라지는 타입",
    traits: ["감성 공간 전환", "즉흥 집중", "환경 민감"],
    presets: {
      status: ["자리 바꾸며 기분 전환", "좋은 음악·향으로 집중 환경 만들기"],
      recovery: ["감성적인 공간 꾸미기", "산책으로 기분 리셋"],
      warning: ["공간 세팅에 너무 많은 에너지 소비 — 일단 시작하는 습관 만들기"],
    },
    pitfalls: ["ENTJ"],
    recommend: ["ISTP"],
    ogTitle: "ISFP 분위기 따라 집중 부유형",
  },
  INFP: {
    mbti: "INFP",
    name: "영감 폭발 재택 몽상가",
    summary: "재택 중 갑자기 아이디어 쏟아지는데 정작 해야 할 업무는 저녁으로 밀리는 타입",
    traits: ["아이디어 폭발", "자유로운 흐름", "의미 추구"],
    presets: {
      status: ["창의적 작업에 몰입", "영감 메모가 업무 노트보다 길어짐"],
      recovery: ["좋아하는 음악·분위기로 집중 진입", "의미 있는 업무 먼저 배치"],
      warning: ["해야 할 일 미루다 마감 직전 몰아치기 — 시간 블로킹으로 규율 만들기"],
    },
    pitfalls: ["ESTJ"],
    recommend: ["INFJ"],
    ogTitle: "INFP 영감 폭발 재택 몽상가",
  },
  INTP: {
    mbti: "INTP",
    name: "딥다이브 야간 재택 연구자",
    summary: "낮에는 딴 생각하다가 밤에 몰아서 집중하는 야행성 재택 천재",
    traits: ["야간 집중", "지식 탐구", "자유 흐름"],
    presets: {
      status: ["밤 10시 이후 집중력 최고조", "관심 주제 파고들다 업무 연결"],
      recovery: ["낮 동안 뇌 준비 시간으로 활용", "산책·운동으로 아이디어 정리"],
      warning: ["밤샘 후 다음날 업무 지장 — 마감 알람과 수면 루틴 병행"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["INTJ"],
    ogTitle: "INTP 딥다이브 야간 재택 연구자",
  },
  ESTP: {
    mbti: "ESTP",
    name: "재택 불가 에너지형",
    summary: "집에서 일하면 자꾸 딴 것 손이 가는 — 사무실이나 카페가 절대적으로 더 잘 되는 타입",
    traits: ["외부 에너지 의존", "즉흥 처리", "활동적 집중"],
    presets: {
      status: ["카페·공유오피스 자주 이동", "마감 압박 있을 때 집중 폭발"],
      recovery: ["업무 장소 변경으로 자극 유지", "짧게 집중 후 빠른 전환"],
      warning: ["재택 시 집중 환경 별도 세팅 — 업무 전용 구역 만들기"],
    },
    pitfalls: ["INFJ"],
    recommend: ["ESFP"],
    ogTitle: "ESTP 재택 불가 에너지형",
  },
  ESFP: {
    mbti: "ESFP",
    name: "소통 없이 집중 불가형",
    summary: "팀 채팅이나 통화가 오히려 동기부여 — 혼자 조용히 일하면 집중이 안 되는 활발형",
    traits: ["소통 기반 집중", "팀 에너지 의존", "즉흥 활동"],
    presets: {
      status: ["동료와 화상 통화 켜두고 작업", "채팅 알림으로 자극 유지"],
      recovery: ["짧은 팀 소통으로 에너지 충전", "재택 중 친구·동료 커피챗 활용"],
      warning: ["소통에 집중 에너지 소비 — 딥워크 구간 정해두기"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["ESTP"],
    ogTitle: "ESFP 소통 없이 집중 불가형",
  },
  ENFP: {
    mbti: "ENFP",
    name: "재택 산만 에너지 폭발형",
    summary: "재택이라 자유롭게 일하다가 저녁 6시에 '오늘 뭐 했지?' 되는 타입",
    traits: ["자유로운 흐름", "다방면 관심", "즉흥 전환"],
    presets: {
      status: ["업무 중 새 아이디어 5개 생김", "마감 있을 때 집중력 폭발"],
      recovery: ["타이머로 25분 집중 구간 만들기", "아이디어 메모 분리해두기"],
      warning: ["아이디어 메모하다 정작 업무 안 함 — 메모 시간 따로 정해두기"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["ENTP"],
    ogTitle: "ENFP 재택 산만 에너지 폭발형",
  },
  ENTP: {
    mbti: "ENTP",
    name: "재택 아이디어 폭격기",
    summary: "집에서 혼자 일하다 동료에게 갑자기 '이렇게 하면 어떨까?' 메시지 쏟아내는 타입",
    traits: ["아이디어 공세", "토론 요청", "창의 집중"],
    presets: {
      status: ["집중하다 갑자기 팀 채팅에 아이디어 투척", "문제 발견 시 즉시 개선안 공유"],
      recovery: ["아이디어 타임 따로 정해두기", "딥워크 시 알림 차단"],
      warning: ["집중 중 아이디어 산발로 본인·팀원 모두 산만 — 아이디어 노트에 저장 후 나중에 공유"],
    },
    pitfalls: ["ISFJ"],
    recommend: ["ENFP"],
    ogTitle: "ENTP 재택 아이디어 폭격기",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "재택도 사무실처럼",
    summary: "재택이라도 복장 갖추고 책상 정돈하고 스케줄 따라 일하는 — 집이 곧 사무실인 타입",
    traits: ["구조적 관리", "규율 유지", "생산성 고수"],
    presets: {
      status: ["정시 시작·종료, 중간 체크인 정기적", "재택 복장·환경 사무실 수준"],
      recovery: ["퇴근 후 업무 기기 끄기 의례", "주간 성과 정리 후 마무리"],
      warning: ["재택 팀원 성과 의심 경향 — 결과 중심 신뢰로 전환 필요"],
    },
    pitfalls: ["INFP"],
    recommend: ["ISTJ"],
    ogTitle: "ESTJ 재택도 사무실처럼",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "팀 온기 없이 집중 불가형",
    summary: "동료 없이 집에서만 일하면 외롭고 동기부여가 안 되는 따뜻한 협력형",
    traits: ["관계 기반 동기", "팀 소통 의존", "배려형 업무"],
    presets: {
      status: ["재택 중에도 팀 채팅 활발히 참여", "동료 상태 확인하며 도움 제공"],
      recovery: ["팀 온라인 커피챗으로 연결감 보충", "화상 회의 카메라 켜기"],
      warning: ["소통에 에너지 쏟다 자기 업무 밀림 — 집중 시간 명확히 지정"],
    },
    pitfalls: ["INTP"],
    recommend: ["ISFJ"],
    ogTitle: "ESFJ 팀 온기 없이 집중 불가형",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "재택 팀 관리 매니저형",
    summary: "집에서도 팀원 챙기는 메시지 보내고 체크인하는 — 재택이라도 팀 리더 역할 자동 수행",
    traits: ["팀 케어", "연결 유지", "감정 챙김"],
    presets: {
      status: ["팀원 업무 지원·격려 메시지 정기 발송", "팀 화상 회의 분위기 이끌기"],
      recovery: ["자기 업무 집중 구간 지정", "팀 케어와 개인 집중 시간 분리"],
      warning: ["남 챙기느라 자기 업무 집중 부족 — 개인 딥워크 시간 보호"],
    },
    pitfalls: ["ISTP"],
    recommend: ["ESFJ"],
    ogTitle: "ENFJ 재택 팀 관리 매니저형",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "재택 성과 극대화 CEO형",
    summary: "집에서 일하면 오히려 방해 없이 전략적 업무 집중 — 결과로 증명하는 자율 관리형",
    traits: ["성과 집중", "자기 주도", "전략적 우선순위"],
    presets: {
      status: ["핵심 업무 집중 구간 최우선", "팀에 명확한 지시 후 자율 집중"],
      recovery: ["운동으로 에너지 관리", "전략적 사고를 위한 독서·학습"],
      warning: ["재택 팀원에게 지나친 성과 요구 — 과정과 맥락도 고려하기"],
    },
    pitfalls: ["ISFP"],
    recommend: ["INTJ"],
    ogTitle: "ENTJ 재택 성과 극대화 CEO형",
  },
};
