import { GscLandingBoost } from "@/components/gsc-landing-boost";

type AutoGscLandingBoostProps = {
  testId: string;
};

type BoostData = {
  title: string;
  summary: string;
  guides: { title: string; description: string }[];
  relatedLinks: { href: string; label: string }[];
  tone?: "orange" | "green" | "indigo" | "red" | "pink" | "blue";
};

const boostData: Record<string, BoostData> = {
  "perfection-balance-1xQC": {
    title: "완벽주의 테스트, 어떤 균형을 보나요?",
    summary:
      "완벽주의 테스트는 기준을 높게 세우는 성향이 장점으로 작동하는 순간과 부담으로 바뀌는 순간을 함께 살펴봅니다. 실수 확인, 마감 전 점검, 피드백 반응, 시작을 미루는 패턴을 12문항으로 비교해 나의 완벽주의 균형점을 가볍게 확인할 수 있습니다.",
    guides: [
      {
        title: "완벽주의 성향 확인",
        description:
          "높은 기준, 자기검열, 마감 압박, 반복 확인처럼 일상에서 자주 나타나는 선택 신호를 기준으로 결과를 해석합니다.",
      },
      {
        title: "꼼꼼함과 부담 구분",
        description:
          "꼼꼼함이 품질을 높이는지, 아니면 시작과 마무리를 늦추는 압박으로 이어지는지 구분해 볼 수 있습니다.",
      },
      {
        title: "무료 심리테스트로 활용",
        description:
          "전문 진단이 아니라 자기 이해와 대화 소재를 위한 무료 성향 테스트로, 결과는 생활 패턴을 돌아보는 참고 신호로 활용하세요.",
      },
    ],
    relatedLinks: [
      { href: "/tests/spending-style", label: "소비성향 테스트" },
      { href: "/tests/study-mbti", label: "공부 스타일 테스트" },
      { href: "/tests/weekend-balance", label: "주말 균형 테스트" },
    ],
    tone: "indigo",
  },
  bungeoppang: {
    title: "붕어빵 취향 테스트는 무엇을 보여주나요?",
    summary:
      "붕어빵을 고르는 기준은 단맛, 식감, 익숙한 선택과 새 메뉴를 대하는 태도를 함께 보여줍니다. 이 테스트는 팥과 슈크림의 우열보다 겨울 간식을 고를 때 내가 어떤 기준을 먼저 보는지 해석합니다.",
    guides: [
      { title: "속 재료 기준", description: "팥, 슈크림, 새로운 맛 중 어떤 선택을 편하게 느끼는지로 안정형과 탐색형 단서를 봅니다." },
      { title: "식감 취향 확인", description: "바삭한 겉면과 부드러운 속 중 무엇을 더 중시하는지에 따라 결과의 분위기가 달라집니다." },
      { title: "간식 테스트 연결", description: "붕어빵 결과는 디저트, 간식 시간, 단맛 선호 테스트와 같이 보면 취향 흐름을 더 쉽게 읽을 수 있습니다." },
    ],
    relatedLinks: [
      { href: "/tests/dessert-style", label: "디저트 스타일 테스트" },
      { href: "/tests/snack-time", label: "간식 시간 테스트" },
      { href: "/tests/food-sweetness", label: "단맛 선호 테스트" },
    ],
    tone: "orange",
  },
  "chicken-style": {
    title: "치킨 주문 스타일로 보는 선택 성향",
    summary:
      "치킨을 주문할 때 메뉴, 소스, 사이드, 나눠 먹는 방식을 정하는 과정에는 익숙함과 모험심, 공유 성향이 드러납니다. 이 테스트는 어떤 치킨이 더 좋은지보다 주문 순간의 판단 기준을 보여줍니다.",
    guides: [
      { title: "메뉴 선택 기준", description: "후라이드, 양념, 매운맛, 신메뉴 중 무엇을 먼저 고르는지로 안정형과 도전형 단서를 확인합니다." },
      { title: "공유 방식 해석", description: "혼자 먹을 메뉴를 고르는지, 함께 먹는 사람의 취향까지 보는지에 따라 결과 해석이 달라집니다." },
      { title: "음식 취향 확장", description: "치킨 주문 결과는 매운맛, 음식 공유, 배달앱 테스트와 함께 보면 더 자연스럽게 연결됩니다." },
    ],
    relatedLinks: [
      { href: "/tests/chicken-vs-jjimdak", label: "치킨 vs 찜닭 테스트" },
      { href: "/tests/food-spiciness", label: "매운맛 취향 테스트" },
      { href: "/tests/food-sharing", label: "음식 공유 테스트" },
    ],
    tone: "red",
  },
  "commute-style": {
    title: "출퇴근 스타일 테스트 활용법",
    summary:
      "출퇴근길을 보내는 방식은 시간 관리, 체력 배분, 혼잡한 상황을 대하는 태도와 연결됩니다. 이 테스트는 이동수단의 정답을 찾기보다 하루의 시작과 마무리를 어떤 리듬으로 가져가는지 보여줍니다.",
    guides: [
      { title: "이동수단 성향", description: "버스, 지하철, 도보, 자가용 중 어떤 방식을 편하게 느끼는지로 안정감과 효율 기준을 봅니다." },
      { title: "이동 시간 사용법", description: "음악, 영상, 업무 정리, 멍 때리기 중 무엇을 고르는지에 따라 회복형과 준비형 단서가 달라집니다." },
      { title: "아침 루틴 연결", description: "출퇴근 결과는 아침 준비, 대중교통 선택, 출근길 테스트와 같이 보면 하루 루틴을 더 입체적으로 읽을 수 있습니다." },
    ],
    relatedLinks: [
      { href: "/tests/subway-vs-bus", label: "지하철 vs 버스 테스트" },
      { href: "/tests/morning-commute", label: "출근길 테스트" },
      { href: "/tests/morning-rush", label: "아침 준비 테스트" },
    ],
    tone: "blue",
  },
  "cooking-cleanup": {
    title: "요리 후 정리 스타일로 보는 생활 루틴",
    summary:
      "요리 후 바로 정리하는지, 식사 뒤에 몰아서 치우는지는 집안일을 다루는 리듬과 완성 기준을 보여줍니다. 이 테스트는 깔끔함을 평가하기보다 나에게 맞는 정리 흐름을 확인하게 합니다.",
    guides: cookingGuides("정리 순서", "설거지, 조리대, 남은 재료 중 무엇을 먼저 처리하는지로 루틴의 안정감을 봅니다."),
    relatedLinks: cookingRelated("cooking-timing", "요리 타이밍 테스트"),
    tone: "green",
  },
  "cooking-complexity": {
    title: "요리 복잡도 선호도 테스트 사용법",
    summary:
      "간단한 조리를 선호하는지, 손이 많이 가는 과정을 즐기는지는 집중 방식과 만족 기준을 보여줍니다. 이 테스트는 요리 실력보다 과정에서 편안함을 느끼는 지점을 해석합니다.",
    guides: cookingGuides("과정 선호 확인", "재료 손질, 조리 단계, 플레이팅 중 어느 과정에 부담이나 재미를 느끼는지 확인합니다."),
    relatedLinks: cookingRelated("cooking-method", "조리 방법 테스트"),
    tone: "indigo",
  },
  "cooking-create": {
    title: "레시피 창조 스타일 테스트는 무엇을 보여주나요?",
    summary:
      "레시피를 새로 만드는 방식은 감각적 조합, 실험성, 실패를 받아들이는 태도와 연결됩니다. 이 테스트는 창의력을 평가하지 않고 내가 어떤 방식으로 맛을 만들어 가는지 보여줍니다.",
    guides: cookingGuides("아이디어 출발점", "냉장고 재료, 먹고 싶은 맛, 본 적 있는 레시피 중 어디서 출발하는지 살펴봅니다."),
    relatedLinks: cookingRelated("cooking-experiment", "요리 실험 테스트"),
    tone: "pink",
  },
  "cooking-follow": {
    title: "레시피 따르기 스타일로 보는 실행 성향",
    summary:
      "레시피를 그대로 따르는지, 중간에 바꾸는지는 정보 신뢰도와 실행 방식의 차이를 보여줍니다. 이 테스트는 꼼꼼함의 우열보다 조리 과정에서 편한 기준을 확인합니다.",
    guides: cookingGuides("따르는 정도", "분량, 시간, 순서를 얼마나 지키는지로 계획형과 유연형 단서를 봅니다."),
    relatedLinks: cookingRelated("cooking-measurement", "계량 스타일 테스트"),
    tone: "blue",
  },
  "cooking-improvise": {
    title: "즉흥 요리 스타일 테스트 활용법",
    summary:
      "즉흥 요리는 재료를 보고 바로 판단하는 감각, 대체 재료를 쓰는 유연함, 결과를 즐기는 태도와 연결됩니다. 이 테스트는 계획 없이 요리할 때의 강점과 주의점을 가볍게 보여줍니다.",
    guides: cookingGuides("즉흥 판단 기준", "남은 재료, 냄새, 색감, 예상 식감 중 무엇을 믿고 조리하는지 확인합니다."),
    relatedLinks: cookingRelated("cooking-create", "레시피 창조 테스트"),
    tone: "orange",
  },
  "cooking-measurement": {
    title: "계량 스타일 테스트로 보는 요리 기준",
    summary:
      "정확히 계량하는지, 눈대중으로 맞추는지는 안정적인 결과와 감각적인 조절 사이의 선호를 보여줍니다. 이 테스트는 계량 습관을 통해 나에게 맞는 요리 방식을 해석합니다.",
    guides: cookingGuides("분량 기준 확인", "숟가락, 컵, 저울, 눈대중 중 어떤 기준을 쓰는지에 따라 결과 성향이 달라집니다."),
    relatedLinks: cookingRelated("cooking-seasoning", "간 맞추기 테스트"),
    tone: "green",
  },
  "cooking-method": {
    title: "조리 방법 선호도 테스트 사용법",
    summary:
      "굽기, 삶기, 볶기, 찌기처럼 자주 고르는 조리법은 맛과 식감에 대한 기대, 준비 시간, 실패를 줄이는 방식을 함께 보여줍니다. 이 테스트는 익숙한 조리 선택의 이유를 정리해 줍니다.",
    guides: cookingGuides("조리법 선택 기준", "빠른 조리, 깊은 맛, 바삭한 식감, 건강한 느낌 중 무엇을 먼저 보는지 확인합니다."),
    relatedLinks: cookingRelated("cooking-time", "요리 시간 테스트"),
    tone: "indigo",
  },
};

const keywordLabels: Record<string, string> = {
  alarm: "알람",
  breakfast: "아침식사",
  chicken: "치킨",
  cleaning: "청소",
  commute: "출퇴근",
  cooking: "요리",
  cstore: "편의점",
  cvs: "편의점 조합",
  dinner: "저녁식사",
  door: "문 닫기",
  drink: "음료",
  evening: "저녁 루틴",
  food: "음식 취향",
  gift: "선물",
  grocery: "장보기",
  hamburger: "햄버거",
  hotel: "호텔 조식",
  instagram: "인스타그램",
  investment: "투자",
  kakao: "카카오톡",
  karaoke: "노래방",
  lunch: "점심",
  meal: "식사",
  meat: "고기",
  midnight: "야식",
  mirror: "거울",
  morning: "아침 루틴",
  movie: "영화관",
  noodle: "면 요리",
  online: "온라인 주문",
  ott: "OTT",
  phone: "휴대폰",
  restaurant: "식당 선택",
  rice: "밥",
  shopping: "쇼핑",
  shower: "샤워",
  skin: "스킨케어",
  snack: "간식",
  sock: "양말",
  soup: "국물 요리",
  spice: "매운맛",
  stew: "찌개",
  subway: "대중교통",
  taste: "맛 취향",
  travel: "여행",
  water: "물 마시기",
  weekend: "주말 루틴",
  youtube: "유튜브",
};

const toneByPrefix: Record<string, NonNullable<BoostData["tone"]>> = {
  cooking: "green",
  food: "orange",
  evening: "indigo",
  morning: "blue",
  phone: "indigo",
  restaurant: "red",
  weekend: "green",
};

function cookingGuides(firstTitle: string, firstDescription: string) {
  return [
    { title: firstTitle, description: firstDescription },
    { title: "실패 대응 방식", description: "간이 맞지 않거나 과정이 꼬였을 때 바로 수정하는지, 계획을 다시 세우는지로 유연성을 봅니다." },
    { title: "요리 테스트 연결", description: "요리 결과는 조리법, 계량, 간 맞추기 테스트와 함께 보면 주방 루틴을 더 자연스럽게 읽을 수 있습니다." },
  ];
}

function cookingRelated(extraHref: string, extraLabel: string) {
  return [
    { href: "/tests/cooking-style", label: "요리 스타일 테스트" },
    { href: `/tests/${extraHref}`, label: extraLabel },
    { href: "/tests/cooking-recipe", label: "레시피 테스트" },
  ];
}

export function hasAutoGscLandingBoost(testId: string) {
  return Object.prototype.hasOwnProperty.call(boostData, testId);
}

export function AutoGscLandingBoost({ testId }: AutoGscLandingBoostProps) {
  const data = boostData[testId] ?? createFallbackBoostData(testId);

  return <GscLandingBoost {...data} />;
}

function createFallbackBoostData(testId: string): BoostData {
  const label = getReadableLabel(testId);
  const prefix = testId.split("-")[0] ?? testId;
  const tone = toneByPrefix[prefix] ?? "blue";

  return {
    title: `${label} 테스트는 무엇을 보여주나요?`,
    summary: `${label} 테스트는 일상에서 자주 하는 선택을 바탕으로 취향, 루틴, 판단 기준을 가볍게 정리해 줍니다. 정답을 맞히는 검사가 아니라 내가 어떤 상황에서 무엇을 먼저 보는지 확인하는 성향 테스트입니다.`,
    guides: [
      {
        title: "선택 기준 확인",
        description: `${label} 상황에서 익숙함, 효율, 재미, 안정감 중 무엇을 먼저 고르는지 살펴봅니다.`,
      },
      {
        title: "결과 해석 방법",
        description:
          "결과는 좋고 나쁨을 나누기보다 반복되는 선택 패턴과 편안하게 느끼는 흐름을 설명하는 데 초점을 둡니다.",
      },
      {
        title: "비슷한 테스트와 비교",
        description:
          "같은 생활 루틴 안의 다른 테스트와 함께 보면 취향의 공통점과 차이를 더 자연스럽게 확인할 수 있습니다.",
      },
    ],
    relatedLinks: relatedLinksByPrefix(prefix, testId),
    tone,
  };
}

function getReadableLabel(testId: string) {
  const parts = testId.split("-");
  const matched = parts.map((part) => keywordLabels[part]).filter(Boolean);

  if (matched.length > 0) {
    return [...new Set(matched)].join(" ");
  }

  return testId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function relatedLinksByPrefix(prefix: string, currentId: string) {
  const fallbackLinks = [
    { href: "/tests/taste-preference", label: "취향 테스트" },
    { href: "/tests/lunch-decider", label: "점심 선택 테스트" },
    { href: "/tests/weekend-rest", label: "주말 휴식 테스트" },
    { href: "/tests/morning-energy", label: "아침 에너지 테스트" },
    { href: "/tests/phone-style", label: "휴대폰 사용 스타일 테스트" },
  ];
  const grouped: Record<string, { href: string; label: string }[]> = {
    cooking: [
      { href: "/tests/cooking-style", label: "요리 스타일 테스트" },
      { href: "/tests/cooking-recipe", label: "레시피 테스트" },
      { href: "/tests/cooking-seasoning", label: "간 맞추기 테스트" },
    ],
    food: [
      { href: "/tests/taste-preference", label: "맛 취향 테스트" },
      { href: "/tests/food-texture", label: "식감 취향 테스트" },
      { href: "/tests/food-sharing", label: "음식 공유 테스트" },
    ],
    evening: [
      { href: "/tests/evening-routine", label: "저녁 루틴 테스트" },
      { href: "/tests/evening-meal", label: "저녁 식사 테스트" },
      { href: "/tests/evening-sleep-prep", label: "잠들기 준비 테스트" },
    ],
    morning: [
      { href: "/tests/morning-rush", label: "아침 준비 테스트" },
      { href: "/tests/morning-energy", label: "아침 에너지 테스트" },
      { href: "/tests/morning-coffee", label: "아침 커피 테스트" },
    ],
    phone: [
      { href: "/tests/phone-style", label: "휴대폰 사용 스타일 테스트" },
      { href: "/tests/phone-notification", label: "알림 습관 테스트" },
      { href: "/tests/phone-storage", label: "휴대폰 정리 테스트" },
    ],
    restaurant: [
      { href: "/tests/restaurant-choice", label: "식당 선택 테스트" },
      { href: "/tests/restaurant-menu", label: "메뉴 선택 테스트" },
      { href: "/tests/restaurant-price", label: "가격 기준 테스트" },
    ],
    weekend: [
      { href: "/tests/weekend-rest", label: "주말 휴식 테스트" },
      { href: "/tests/weekend-planning", label: "주말 계획 테스트" },
      { href: "/tests/weekend-social", label: "주말 약속 테스트" },
    ],
  };

  const links = grouped[prefix] ?? fallbackLinks;
  const currentHref = `/tests/${currentId}`;
  const uniqueLinks = [...links, ...fallbackLinks].filter(
    (link, index, allLinks) =>
      link.href !== currentHref &&
      allLinks.findIndex((candidate) => candidate.href === link.href) === index,
  );

  return uniqueLinks.slice(0, 3);
}
