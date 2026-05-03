/**
 * 첫 데이트 긴장 테스트 결과 데이터 (16 MBTI 유형).
 * 첫 만남에서 드러나는 긴장 관리·표현 방식·다음 단계 의사결정 패턴 해석.
 */

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

export const FIRST_DATE_NERVES_RESULTS: Record<string, ResultType> = {
  ISTJ: {
    mbti: "ISTJ",
    name: "철저 준비형 신중파",
    summary: "예약·동선·플랜B까지 정리해야 마음이 놓이는 타입",
    traits: ["사전 조사", "약속 정확", "감정 표현 자제"],
    presets: {
      status: ["맛집 리뷰 30분 정독", "지하철 환승 시간까지 계산"],
      recovery: ["데이트 전 1시간 혼자 정리", "끝나고 짧은 회고 메모"],
      warning: ["계획 어긋나면 굳어버림 주의"],
    },
    pitfalls: ["ENFP"],
    recommend: ["ESTJ"],
    ogTitle: "ISTJ 철저 준비형 신중파",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "조용한 배려 모드",
    summary: "상대가 편하기를 가장 먼저 살피는 타입",
    traits: ["섬세한 배려", "경청", "안정감"],
    presets: {
      status: ["메뉴 알레르기 미리 확인", "동선 짧게 잡아 부담 줄이기"],
      recovery: ["헤어진 후 따뜻한 차 한 잔", "일기에 오늘 감정 기록"],
      warning: ["내 의견을 말 못하고 다 맞춰주다 지침"],
    },
    pitfalls: ["ENTP"],
    recommend: ["ESFP"],
    ogTitle: "ISFJ 조용한 배려 모드",
  },
  INFJ: {
    mbti: "INFJ",
    name: "직감으로 읽는 관찰자",
    summary: "상대 말투 한 번에 가치관까지 추리하는 타입",
    traits: ["깊은 관찰", "의미 부여", "신중한 거리감"],
    presets: {
      status: ["상대 표정 0.5초 단위로 분석", "가벼운 질문 뒤 깊은 질문 한 방"],
      recovery: ["혼자 산책하며 인상 정리", "오늘의 통찰을 메모"],
      warning: ["과해석으로 작은 신호 부풀리기"],
    },
    pitfalls: ["ESTP"],
    recommend: ["ENFP"],
    ogTitle: "INFJ 직감으로 읽는 관찰자",
  },
  INTJ: {
    mbti: "INTJ",
    name: "관계 시뮬레이터",
    summary: "이 사람과 6개월 후를 미리 모델링하는 타입",
    traits: ["전략적", "장기 시야", "감정 표현 절제"],
    presets: {
      status: ["호환성 체크리스트 머릿속 가동", "상대의 가치관 질문 한 방씩"],
      recovery: ["혼자 분석 시간 확보", "조용한 환경에서 결론 정리"],
      warning: ["분석 우선이라 그 순간 즐기기를 놓침"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ENTJ"],
    ogTitle: "INTJ 관계 시뮬레이터",
  },
  ISTP: {
    mbti: "ISTP",
    name: "쿨한 관찰러",
    summary: "긴장 안 한 척하지만 사실 모든 디테일 보고 있는 타입",
    traits: ["담백한 표현", "유연 대응", "거리감 유지"],
    presets: {
      status: ["과한 칭찬 자제, 실용적 코멘트", "상대 행동 관찰로 페이스 맞춤"],
      recovery: ["데이트 후 혼자 시간으로 충전", "취미 시간 회복"],
      warning: ["감정 표현 부족으로 무관심해 보일 위험"],
    },
    pitfalls: ["ENFJ"],
    recommend: ["ESTP"],
    ogTitle: "ISTP 쿨한 관찰러",
  },
  ISFP: {
    mbti: "ISFP",
    name: "감각적 무드 메이커",
    summary: "분위기·향·조명까지 챙기는 디테일 로맨틱",
    traits: ["감각적", "온화함", "현재 몰입"],
    presets: {
      status: ["옷·향수에 힘 줌", "자연스러운 미소와 짧은 코멘트"],
      recovery: ["좋아하는 음악으로 마무리", "조용한 곳에서 회상"],
      warning: ["갈등 회피로 본심을 못 전함"],
    },
    pitfalls: ["ENTJ"],
    recommend: ["ESFP"],
    ogTitle: "ISFP 감각적 무드 메이커",
  },
  INFP: {
    mbti: "INFP",
    name: "마음 시인",
    summary: "한 마디 말 뒤의 결을 길게 곱씹는 타입",
    traits: ["풍부한 내면", "의미 추구", "수줍음"],
    presets: {
      status: ["깊은 질문 한 번씩 슬쩍", "상대의 진심을 알아채려 노력"],
      recovery: ["글로 마음 정리", "혼자 음악 들으며 마무리"],
      warning: ["이상화로 현실 신호를 놓치기 쉬움"],
    },
    pitfalls: ["ESTJ"],
    recommend: ["ENFJ"],
    ogTitle: "INFP 마음 시인",
  },
  INTP: {
    mbti: "INTP",
    name: "호기심 인터뷰어",
    summary: "상대가 어떤 방식으로 사고하는지가 가장 궁금한 타입",
    traits: ["질문 많음", "지적 호기심", "감정 표현 어색"],
    presets: {
      status: ["관심사·문제 풀이 방식 캐묻기", "재미있는 가설 던져보기"],
      recovery: ["혼자 사색하며 데이트 분석", "심야 독서"],
      warning: ["스몰토크 약하고 감정 신호를 못 읽음"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ENTJ"],
    ogTitle: "INTP 호기심 인터뷰어",
  },
  ESTP: {
    mbti: "ESTP",
    name: "현장 즉흥러",
    summary: "분위기 좋으면 그 자리에서 다음 코스로 직진하는 타입",
    traits: ["현실 감각", "즉흥성", "에너지"],
    presets: {
      status: ["즉석에서 다음 장소 제안", "분위기 살리는 농담"],
      recovery: ["스포츠·운동으로 텐션 발산", "친구와 후기 공유"],
      warning: ["진중한 신호를 가볍게 받아넘김"],
    },
    pitfalls: ["INFJ"],
    recommend: ["ESFP"],
    ogTitle: "ESTP 현장 즉흥러",
  },
  ESFP: {
    mbti: "ESFP",
    name: "분위기 폭발 다정러",
    summary: "긴장은 5분 만에 풀리고 30분 후엔 절친 모드",
    traits: ["친근함", "표현력", "현재 즐기기"],
    presets: {
      status: ["적극적 리액션과 미소", "셀카·기록 좋아함"],
      recovery: ["친구·가족과 데이트 공유", "맛있는 후식으로 마무리"],
      warning: ["과한 표현으로 상대 부담 줄 수 있음"],
    },
    pitfalls: ["INTJ"],
    recommend: ["ESTP"],
    ogTitle: "ESFP 분위기 폭발 다정러",
  },
  ENFP: {
    mbti: "ENFP",
    name: "공감 폭주 매력러",
    summary: "5분 만에 인생사 다 들어주고 또 다 말해주는 타입",
    traits: ["열린 마음", "공감 능력", "낙천"],
    presets: {
      status: ["눈빛으로 \"네 이야기 다 듣고 싶어\" 표현", "자기 이야기도 솔직히 공유"],
      recovery: ["사람 만나서 데이트 후기 풀기", "새로운 자극 찾기"],
      warning: ["감정 과몰입 후 빠른 식음 위험"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["INFJ"],
    ogTitle: "ENFP 공감 폭주 매력러",
  },
  ENTP: {
    mbti: "ENTP",
    name: "지적 도발러",
    summary: "재미있는 토론거리 던지며 상대를 시험하는 타입",
    traits: ["대화 주도", "유머", "새로운 관점"],
    presets: {
      status: ["가벼운 도발성 질문", "익숙한 답변에 \"근데 만약\" 추가"],
      recovery: ["새로운 사람·아이디어 자극", "지적 콘텐츠 소비"],
      warning: ["놀리는 톤이 진심으로 들릴 수 있음"],
    },
    pitfalls: ["ISFJ"],
    recommend: ["INTJ"],
    ogTitle: "ENTP 지적 도발러",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "리드형 매니저",
    summary: "예약·결제·다음 약속까지 매끄럽게 진행하는 타입",
    traits: ["주도적", "신뢰감", "명확함"],
    presets: {
      status: ["예약·체크인 미리 처리", "다음 일정 그 자리에서 합의"],
      recovery: ["깔끔한 마무리에서 만족", "다음 데이트 계획"],
      warning: ["주도가 강해 상대가 따라오는 느낌"],
    },
    pitfalls: ["INFP"],
    recommend: ["ISTJ"],
    ogTitle: "ESTJ 리드형 매니저",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "다정한 호스트",
    summary: "상대를 손님처럼 챙기는 따뜻 모드",
    traits: ["배려심", "친근함", "조화 추구"],
    presets: {
      status: ["메뉴·온도까지 챙김", "상대 관심사를 미리 알아두고 활용"],
      recovery: ["가까운 사람과 후기 공유", "정성스러운 마무리 메시지"],
      warning: ["과한 호의가 부담될 수 있음"],
    },
    pitfalls: ["INTP"],
    recommend: ["ISFJ"],
    ogTitle: "ESFJ 다정한 호스트",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "공감 큐레이터",
    summary: "상대 마음을 그 자리에서 정리해주는 코치 같은 타입",
    traits: ["통찰력", "비전 제시", "헌신적"],
    presets: {
      status: ["상대 가치관·꿈 자연스럽게 끌어냄", "응원과 격려 표현"],
      recovery: ["1on1 대화 곱씹기", "혼자 사색 시간"],
      warning: ["상담사 모드 과해 데이트 무드 잃을 수 있음"],
    },
    pitfalls: ["ISTP"],
    recommend: ["INFP"],
    ogTitle: "ENFJ 공감 큐레이터",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "전략 캡틴 리더",
    summary: "관계의 단계와 방향을 명확히 제시하는 타입",
    traits: ["주도", "장기 시야", "결단"],
    presets: {
      status: ["분명한 호감 표현", "관계 진도에 대한 솔직한 대화"],
      recovery: ["성공적 데이트는 짧은 회고로 마무리", "다음 단계 액션"],
      warning: ["속도가 빨라 상대가 따라오기 힘듦"],
    },
    pitfalls: ["ISFP"],
    recommend: ["INTJ"],
    ogTitle: "ENTJ 전략 캡틴 리더",
  },
};
