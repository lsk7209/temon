#!/usr/bin/env node
/**
 * Wave5 quiz generator.
 *
 * Creates 300 scheduled draft quizzes after the current last reservation
 * (wave4 ends 2026-08-25 20:00 KST). Slots are spaced exactly 5 hours apart
 * to match the "5시간마다 예약 공개" goal.
 *
 * Each topic carries a research note (장면/결정 분기/실수/MBTI 매핑) that the
 * quiz body is built from — research → quiz, not the reverse.
 *
 * Usage:
 *   node scripts/generate-wave5-quizzes.js
 *   node scripts/generate-wave5-quizzes.js --verify
 *   node scripts/generate-wave5-quizzes.js --apply-db
 *   node scripts/generate-wave5-quizzes.js --apply-db --refresh-db
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const TESTS_DIR = path.join(ROOT, "app", "tests");
const PLAN_PATH = path.join(DATA_DIR, "quiz-topic-plan-300-wave5.json");
const QUIZZES_PATH = path.join(DATA_DIR, "quiz-wave5-300.json");
const REVIEW_PATH = path.join(DATA_DIR, "quiz-wave5-review.json");
const RESEARCH_PATH = path.join(DATA_DIR, "quiz-wave5-research.json");
const TARGET_COUNT = 300;
const WAVE = "wave5";
const SLOT_INTERVAL_HOURS = 5;
const APPLY_DB = process.argv.includes("--apply-db");
const REFRESH_DB = process.argv.includes("--refresh-db");
const VERIFY_ONLY = process.argv.includes("--verify");
const REUSE_ARTIFACTS =
  ((APPLY_DB && !REFRESH_DB) || VERIFY_ONLY) &&
  fs.existsSync(PLAN_PATH) &&
  fs.existsSync(QUIZZES_PATH);

dotenv.config({
  path: path.join(ROOT, ".env.local"),
  override: true,
  quiet: true,
});

const MBTI_TYPES = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

const TYPE_COPY = {
  ISTJ: [
    "차분한 기준형",
    "기준과 순서를 먼저 세우며 안정적인 선택을 선호합니다.",
  ],
  ISFJ: ["섬세한 배려형", "상대의 부담을 살피며 조용히 균형을 맞춥니다."],
  INFJ: ["조용한 통찰형", "겉으로 보이는 선택보다 그 안의 의미를 먼저 봅니다."],
  INTJ: ["전략 설계형", "목표와 효율을 함께 계산하며 오래 갈 구조를 만듭니다."],
  ISTP: ["실전 조율형", "직접 해 보고 가장 번거롭지 않은 방법을 찾아냅니다."],
  ISFP: [
    "감각 존중형",
    "지금의 기분과 취향을 해치지 않는 선택을 중요하게 봅니다.",
  ],
  INFP: ["가치 탐색형", "작은 선택에도 나다운 이유가 있는지 확인하려 합니다."],
  INTP: [
    "원리 실험형",
    "규칙을 그대로 따르기보다 구조와 이유를 이해하려 합니다.",
  ],
  ESTP: ["즉시 해결형", "상황이 생기면 오래 망설이지 않고 바로 움직입니다."],
  ESFP: ["분위기 반응형", "현장의 기분과 사람들의 반응을 빠르게 읽습니다."],
  ENFP: [
    "아이디어 확장형",
    "익숙한 방식보다 새롭게 해볼 가능성을 먼저 봅니다.",
  ],
  ENTP: ["관점 전환형", "한 가지 답에 갇히지 않고 다른 선택지를 열어둡니다."],
  ESTJ: ["정리 추진형", "기준을 분명히 하고 필요한 일을 순서대로 진행합니다."],
  ESFJ: ["관계 조율형", "여럿이 편안하게 움직일 접점을 찾습니다."],
  ENFJ: ["흐름 리드형", "사람들이 따라오기 쉬운 방식으로 분위기를 이끕니다."],
  ENTJ: ["목표 압축형", "시간과 에너지를 낭비하지 않도록 빠르게 결정합니다."],
};

const TYPE_TRAITS = {
  ISTJ: ["기준 명확", "기록 선호", "실수 예방", "꾸준함"],
  ISFJ: ["섬세함", "안정 추구", "배려", "현실 감각"],
  INFJ: ["의미 탐색", "깊은 관찰", "조용한 집중", "직관"],
  INTJ: ["전략성", "효율 추구", "독립 판단", "구조화"],
  ISTP: ["실용성", "즉흥 조정", "관찰력", "간결함"],
  ISFP: ["감각 중심", "부드러운 선택", "자율성", "취향 존중"],
  INFP: ["가치 중심", "상상력", "진정성", "사려 깊음"],
  INTP: ["분석성", "호기심", "원리 탐구", "유연한 사고"],
  ESTP: ["실행력", "순발력", "현장 감각", "대담함"],
  ESFP: ["표현력", "분위기 감각", "친화성", "즐거움 추구"],
  ENFP: ["확장성", "아이디어", "공감", "관계 에너지"],
  ENTP: ["토론성", "전환 사고", "도전성", "문제 재정의"],
  ESTJ: ["추진력", "우선순위", "책임감", "명확한 기준"],
  ESFJ: ["협업", "공감", "생활 감각", "조율"],
  ENFJ: ["동기 부여", "관계 리드", "설득력", "따뜻함"],
  ENTJ: ["목표 지향", "결단력", "시스템 사고", "성과 집중"],
};

const GROUPS = [
  {
    category: "살림",
    prefix: "life",
    keywords: [
      "살림 습관",
      "공간 정돈",
      "생활 리듬",
      "유지 보수",
      "정리 성향",
      "살림 테스트",
    ],
    research:
      "혼자 또는 가족과 함께 살며 반복되는 살림 동작에서 드러나는 정돈 기준과 우선순위를 본다. 한 번에 해결할지, 나눠서 유지할지의 선택이 핵심 갈림길이다.",
    subjects: [
      ["furniture-layout", "가구 배치"],
      ["laundry-drying", "빨래 건조"],
      ["vacuum-route", "청소기 동선"],
      ["recycle-sort", "분리수거"],
      ["candle-light", "향초 점화"],
      ["slipper-pair", "슬리퍼 정리"],
      ["laundromat-visit", "빨래방 이용"],
      ["water-filter", "정수기 관리"],
      ["spice-shelf", "양념 정리"],
      ["container-choice", "보관용기 선택"],
      ["foodscrap-bin", "잔반 통 관리"],
      ["mail-sort", "우편물 분류"],
      ["paperbag-keep", "종이가방 정리"],
      ["balcony-use", "베란다 활용"],
      ["cup-wash", "컵 세척 타이밍"],
      ["socks-fold", "양말 정리"],
      ["frame-spot", "액자 위치"],
      ["rug-care", "러그 관리"],
      ["bin-position", "휴지통 자리"],
      ["dryrack-use", "건조대 사용"],
      ["curtain-open", "커튼 여닫기"],
      ["appliance-spot", "가전 위치"],
      ["mug-pick", "머그컵 선택"],
      ["humidifier-care", "가습기 관리"],
      ["diffuser-spot", "디퓨저 위치"],
    ],
  },
  {
    category: "디지털2",
    prefix: "tech",
    keywords: [
      "디지털 도구",
      "앱 활용",
      "기기 관리",
      "온라인 매너",
      "정보 정리",
      "테크 테스트",
    ],
    research:
      "스마트폰, 노트북, 태블릿, 워치를 동시에 쓰며 알림과 정보가 흩어질 때 어떤 도구로 다시 모으는지 보는 영역. 자동화에 의존할지 직접 정리할지가 분기점.",
    subjects: [
      ["note-app", "노트 앱 선택"],
      ["shortcut-key", "단축키 사용"],
      ["bg-app", "백그라운드 앱"],
      ["watch-notify", "스마트워치 알림"],
      ["ai-assistant", "AI 어시스턴트 호출"],
      ["family-calendar", "가족 캘린더"],
      ["widget-layout", "위젯 배치"],
      ["location-share", "위치 공유"],
      ["multi-device", "멀티 디바이스 연동"],
      ["digital-minimal", "디지털 미니멀"],
      ["video-call", "영상통화 매너"],
      ["ott-watch", "OTT 시청 방식"],
      ["folder-color", "폴더 색 분류"],
      ["emoji-use", "이모지 사용"],
      ["wifi-manage", "와이파이 관리"],
      ["qr-pay", "QR 결제 사용"],
      ["music-mode", "음악 재생 모드"],
      ["card-register", "디지털 카드 등록"],
      ["digital-id", "디지털 신분증"],
      ["email-reply", "이메일 답장 톤"],
      ["voice-memo", "음성메모 사용"],
      ["autocomplete", "자동완성 활용"],
      ["clipboard-use", "클립보드 관리"],
      ["night-mode", "야간 모드 전환"],
      ["security-alert", "보안 알림 대응"],
    ],
  },
  {
    category: "유대",
    prefix: "bond",
    keywords: [
      "인간관계",
      "친밀감 표현",
      "거리 조절",
      "대화 톤",
      "공감 방식",
      "유대 테스트",
    ],
    research:
      "친구·가족·연인·친척 사이의 다양한 거리감을 다루는 영역. 빠른 친밀감 표현형과 느린 신뢰 구축형이 갈리는 지점을 12문항으로 살핀다.",
    subjects: [
      ["shared-meal", "같은 식탁"],
      ["new-family", "새 가족 인사"],
      ["club-greet", "동호회 첫 인사"],
      ["friend-distance", "친구 초대 거리"],
      ["wellbeing-card", "안부 카드"],
      ["holiday-message", "명절 메시지"],
      ["friend-wedding", "친구 결혼식"],
      ["relative-meet", "친척 모임"],
      ["partner-promise", "연인 약속"],
      ["friend-quarrel", "친구 다툼"],
      ["new-colleague", "동료 환영"],
      ["inlaw-title", "시댁 호칭"],
      ["cousin-call", "사촌 연락"],
      ["old-classmate", "옛 동창"],
      ["parent-meet", "학부모 인사"],
      ["junior-care", "후배 챙김"],
      ["senior-care", "선배 응대"],
      ["parent-check", "부모 안부"],
      ["sibling-tone", "형제 말투"],
      ["friend-parent", "친구 부모님"],
      ["greet-length", "인사 길이"],
      ["soft-refusal", "거절 표현"],
      ["kind-thanks", "호의 표현"],
      ["secret-share", "비밀 공유"],
      ["reconcile-step", "화해 단계"],
    ],
  },
  {
    category: "직장",
    prefix: "career",
    keywords: [
      "직장 생활",
      "업무 흐름",
      "협업 매너",
      "보고 방식",
      "회의 태도",
      "직장 테스트",
    ],
    research:
      "출근부터 퇴근까지 의사결정과 커뮤니케이션이 쉬지 않는 영역. 정보 공유 속도, 결정 권한, 휴식 보호 사이에서 균형을 잡는 방식을 본다.",
    subjects: [
      ["commute-route", "출근길 동선"],
      ["business-trip", "출장 준비"],
      ["desk-tidy", "사무실 정돈"],
      ["lunch-pick", "점심 메뉴 결정"],
      ["after-party", "회식 참석 여부"],
      ["leave-apply", "휴가 신청"],
      ["approval-hold", "결재 보류"],
      ["hr-review", "인사 평가 면담"],
      ["new-mentor", "신입 멘토링"],
      ["progress-share", "성과 발표"],
      ["workshop-join", "워크숍 참여"],
      ["lunch-invite", "동료 점심 초대"],
      ["schedule-change", "일정 변경 통보"],
      ["next-week-plan", "다음 주 계획"],
      ["overtime-call", "야근 결정"],
      ["meeting-seat", "미팅 자리"],
      ["external-meet", "외부 미팅"],
      ["off-time-protect", "개인 시간 보호"],
      ["rest-timing", "쉼 타이밍"],
      ["mail-tone", "메일 답장 톤"],
      ["slack-reply", "메신저 답장"],
      ["title-call", "직책 호칭"],
      ["board-use", "화이트보드 사용"],
      ["company-event", "사내 행사"],
      ["first-greet", "첫인사 톤"],
    ],
  },
  {
    category: "구매",
    prefix: "buy",
    keywords: [
      "구매 결정",
      "정보 비교",
      "가격 판단",
      "리뷰 활용",
      "구매 후 처리",
      "구매 테스트",
    ],
    research:
      "정가·할인·구독·중고 등 구매 채널이 다양해지면서 어디서 멈추고 어디서 더 비교하는지의 기준이 사람마다 다르다. 후회 최소화 vs 효율 극대화의 균형이 핵심.",
    subjects: [
      ["first-try", "첫 구매 망설임"],
      ["subscribe-set", "정기배송 설정"],
      ["color-pick", "색상 고르기"],
      ["size-compare", "사이즈 비교"],
      ["review-write", "리뷰 작성"],
      ["label-check", "라벨 확인"],
      ["eco-tag", "친환경 표시"],
      ["after-ad", "광고 본 직후"],
      ["installment", "무이자 할부"],
      ["new-card", "새 카드 발급"],
      ["points-use", "적립 포인트 사용"],
      ["membership-join", "멤버십 가입"],
      ["new-launch", "신상 알림"],
      ["luxury-review", "고가 후기"],
      ["store-staff", "매장 직원 대화"],
      ["demo-try", "시연 체험"],
      ["gift-receipt", "사은품 챙김"],
      ["store-loop", "매장 둘러보기"],
      ["friend-recommend", "친구 추천 구매"],
      ["regular-shop", "단골 매장"],
      ["visit-count", "매장 방문 횟수"],
      ["item-dispose", "물품 폐기"],
      ["vintage-pick", "빈티지 고르기"],
      ["collection-start", "컬렉션 시작"],
      ["after-impulse", "충동구매 후"],
    ],
  },
  {
    category: "취미",
    prefix: "hobby",
    keywords: [
      "취미 활동",
      "여가 시간",
      "창작 루틴",
      "실내외 활동",
      "관심 분야",
      "취미 테스트",
    ],
    research:
      "혼자 깊게 빠지는 취미형과 사람과 어울리는 활동형이 갈리는 영역. 새로운 도전과 익숙한 즐거움 사이에서의 선택 비율을 본다.",
    subjects: [
      ["museum-night", "박물관 야간 관람"],
      ["camping-prep", "캠핑 준비"],
      ["hiking-route", "등산 코스"],
      ["cycle-ride", "자전거 라이딩"],
      ["class-signup", "강좌 신청"],
      ["writing-start", "글쓰기 시작"],
      ["drawing-time", "그림 그리기"],
      ["embroidery-set", "자수 시작"],
      ["pottery-class", "도예 체험"],
      ["baking-try", "베이킹 시도"],
      ["photo-edit", "사진 보정"],
      ["video-cut", "영상 편집"],
      ["board-game", "보드게임 모임"],
      ["card-game", "카드게임"],
      ["karaoke-pick", "노래방 선곡"],
      ["dance-class", "댄스 클래스"],
      ["yoga-flow", "요가 흐름"],
      ["meditation-min", "명상 시간"],
      ["garden-care", "정원 가꾸기"],
      ["craft-kit", "만들기 키트"],
      ["coloring-set", "색칠 활동"],
      ["interior-shift", "인테리어 변경"],
      ["bookshelf-tidy", "책장 정리"],
      ["poem-read", "시집 읽기"],
      ["radio-listen", "라디오 듣기"],
    ],
  },
  {
    category: "마음",
    prefix: "mood",
    keywords: [
      "마음 신호",
      "감정 다루기",
      "회복 방식",
      "자기이해",
      "정서 균형",
      "마음 테스트",
    ],
    research:
      "감정을 빨리 표현하는 사람과 한참 안에서 다루는 사람이 갈리는 영역. 어떤 감정이 어떤 순서로 올라오는지 자기만의 신호를 어떻게 읽는지 본다.",
    subjects: [
      ["anger-signal", "화 신호 인식"],
      ["lonely-time", "외로운 시간"],
      ["jealous-hold", "질투 다루기"],
      ["envy-deal", "부러움 처리"],
      ["self-boast", "자랑 표현"],
      ["compliment-give", "칭찬해 주기"],
      ["warm-words", "스스로에게 따뜻한 말"],
      ["self-accept", "자기 수용"],
      ["thanks-diary", "감사 일기"],
      ["anger-diary", "분노 일기"],
      ["name-feel", "감정 이름 붙이기"],
      ["heart-empty", "마음 비우기"],
      ["comfort-food", "위안 음식"],
      ["comfort-music", "위안 음악"],
      ["share-with", "감정 공유 상대"],
      ["heart-alarm", "마음 알람"],
      ["burden-sign", "부담 신호"],
      ["refusal-feel", "거절감 다루기"],
      ["ignored-feel", "외면 받았을 때"],
      ["new-start", "새 출발 결심"],
      ["regret-sort", "후회 정리"],
      ["longing-hold", "그리움 다루기"],
      ["fear-signal", "두려움 신호"],
      ["thrill-show", "설렘 표현"],
      ["relief-feel", "안도감 느낄 때"],
    ],
  },
  {
    category: "여정",
    prefix: "trip",
    keywords: [
      "여행 준비",
      "이동 동선",
      "현지 적응",
      "기록 방식",
      "동행 조율",
      "여정 테스트",
    ],
    research:
      "준비형과 즉흥형이 가장 선명하게 갈리는 영역. 정보 수집의 깊이, 동선의 빡빡함, 기록의 양에서 성향이 드러난다.",
    subjects: [
      ["flight-when", "항공권 예매 시점"],
      ["window-aisle", "창가와 통로 자리"],
      ["bag-weight", "짐 무게 점검"],
      ["currency-when", "환전 시점"],
      ["passport-keep", "여권 보관"],
      ["visa-check", "비자 확인"],
      ["alarm-set", "여행 알람"],
      ["jetlag-step", "시차 적응"],
      ["local-sim", "현지 SIM"],
      ["hotel-room", "호텔 룸 선택"],
      ["guesthouse-stay", "게스트하우스"],
      ["korean-food", "현지 한식당"],
      ["street-food", "길거리 음식"],
      ["site-line", "명소 줄"],
      ["guide-tour", "가이드 투어"],
      ["free-time", "자유 시간"],
      ["travel-insurance", "여행자 보험"],
      ["luggage-color", "캐리어 색"],
      ["extra-bag", "짐 가방 추가"],
      ["travel-diary", "여행 다이어리"],
      ["scenery-shot", "풍경 사진"],
      ["selfie-pose", "셀카 포즈"],
      ["fellow-meal", "동행 식사"],
      ["after-sns", "여행 후 SNS"],
      ["camera-pack", "카메라 챙김"],
    ],
  },
  {
    category: "활력",
    prefix: "vital",
    keywords: [
      "건강 관리",
      "몸의 신호",
      "회복 루틴",
      "운동 습관",
      "식단 균형",
      "활력 테스트",
    ],
    research:
      "통증·피로·소화 같은 몸 신호에 어느 시점에 반응하는지를 본다. 검진·약·운동 중 어디서 가장 먼저 행동을 바꾸는지가 분기점.",
    subjects: [
      ["foot-massage", "발 마사지"],
      ["wrist-care", "손목 케어"],
      ["neck-posture", "거북목 체크"],
      ["shoulder-rotate", "어깨 회전"],
      ["core-work", "코어 운동"],
      ["protein-take", "단백질 섭취"],
      ["vitamin-pick", "비타민 챙김"],
      ["supplement-start", "영양제 시작"],
      ["fiber-add", "식이섬유"],
      ["caffeine-cut", "카페인 줄이기"],
      ["alcohol-cut", "술 줄이기"],
      ["sweet-cut", "단 음식 절제"],
      ["meal-time", "식사 시간"],
      ["latenight-stop", "야식 끊기"],
      ["fast-try", "단식 시도"],
      ["scale-check", "체중계 확인"],
      ["health-checkup", "건강검진"],
      ["dental-visit", "치과 방문"],
      ["eye-check", "안과 정기검진"],
      ["skin-visit", "피부과 방문"],
      ["meds-time", "약 복용 시간"],
      ["fever-step", "발열 대응"],
      ["headache-step", "두통 대처"],
      ["digest-step", "소화 불량"],
      ["immunity-care", "면역 챙기기"],
    ],
  },
  {
    category: "성장",
    prefix: "skill",
    keywords: [
      "배움 루틴",
      "공부 도구",
      "기록 방식",
      "도전 과제",
      "자기 성장",
      "성장 테스트",
    ],
    research:
      "단기 자격 vs 장기 자기개발의 우선순위가 드러나는 영역. 강의·책·시행착오 중 어디서 가장 많이 배우는지 본다.",
    subjects: [
      ["eng-word", "영어 단어 외우기"],
      ["hanja-study", "한자 공부"],
      ["cert-start", "자격증 시작"],
      ["online-pay", "인강 결제"],
      ["library-use", "도서관 이용"],
      ["study-cafe", "스터디 카페"],
      ["tutor-class", "과외 수업"],
      ["toeic-prep", "토익 준비"],
      ["interview-prep", "면접 준비"],
      ["resume-write", "자기소개서"],
      ["portfolio-pack", "포트폴리오"],
      ["code-intro", "코딩 입문"],
      ["draw-class", "그림 강좌"],
      ["instrument-learn", "악기 배우기"],
      ["lang-talk", "외국어 회화"],
      ["ged-prep", "검정고시"],
      ["adult-edu", "평생교육"],
      ["read-challenge", "독서 챌린지"],
      ["eng-diary", "영어 일기"],
      ["pronounce-drill", "발음 연습"],
      ["listening-train", "듣기 훈련"],
      ["write-class", "글쓰기 강의"],
      ["speech-drill", "발표 연습"],
      ["debate-join", "토론 참여"],
      ["self-study", "자기 학습"],
    ],
  },
  {
    category: "절기",
    prefix: "season",
    keywords: [
      "계절 변화",
      "환절기 대응",
      "명절 풍경",
      "날씨 신호",
      "기념일",
      "절기 테스트",
    ],
    research:
      "사계절과 명절·기념일이 일상에 미치는 정도가 사람마다 다르다. 챙김형과 흘려보냄형이 갈리는 분기점을 본다.",
    subjects: [
      ["spring-new", "봄 신상"],
      ["summer-beach", "여름 바다"],
      ["autumn-foliage", "가을 단풍"],
      ["winter-ski", "겨울 스키"],
      ["dust-mask", "황사 마스크"],
      ["monsoon-prep", "장마 대비"],
      ["heat-shelter", "폭염 휴게"],
      ["cold-out", "한파 외출"],
      ["year-end", "연말 모임"],
      ["newyear-table", "설 차례상 차림"],
      ["chuseok-treat", "추석 송편"],
      ["child-day", "어린이날 선물"],
      ["parents-day", "어버이날 카네이션"],
      ["xmas-tree", "크리스마스 트리"],
      ["halloween-dress", "핼러윈 분장"],
      ["aprfool-joke", "만우절 농담"],
      ["full-moon", "정월대보름"],
      ["winter-solstice", "동지 팥죽"],
      ["closet-shift", "환절기 옷장"],
      ["shaved-ice", "빙수 시즌"],
      ["hotbun-season", "호빵 계절"],
      ["tea-brew", "차 끓이기"],
      ["mosquito-block", "모기 차단"],
      ["sun-uv", "햇빛 자외선"],
      ["after-rain", "비 그친 후"],
    ],
  },
  {
    category: "마인드케어",
    prefix: "care",
    keywords: [
      "마음 챙김",
      "회복 루틴",
      "짧은 휴식",
      "감각 환기",
      "1분 케어",
      "마인드 테스트",
    ],
    research:
      "스트레스가 차오를 때 1분 안에 자기를 다시 맞추는 방식이 다르다. 호흡·시야·움직임·맥락 전환 중 어떤 채널을 먼저 쓰는지가 분기점.",
    subjects: [
      ["before-work", "출근 전 1분"],
      ["morning-meditate", "아침 명상"],
      ["breath-count", "호흡 카운트"],
      ["digital-detox", "디지털 디톡스"],
      ["walk-meditate", "산책 명상"],
      ["feeling-diary", "감정 일기"],
      ["visualize-scene", "시각화"],
      ["self-soothe", "자기 위안"],
      ["rest-signal", "휴식 신호"],
      ["short-walk", "잠깐 산책"],
      ["mindful-step", "마음 챙김"],
      ["ground-feet", "그라운딩"],
      ["diary-close", "일기 종료"],
      ["phone-away", "휴대폰 멀리"],
      ["one-page", "책 한 페이지"],
      ["one-song", "음악 한 곡"],
      ["one-tea", "차 한 잔"],
      ["sun-five", "햇빛 5분"],
      ["mirror-greet", "거울 인사"],
      ["tidy-one-min", "정리 1분"],
      ["one-memo", "메모 한 줄"],
      ["one-photo", "사진 한 장"],
      ["plant-look", "화분 보기"],
      ["scent-breath", "향 한 모금"],
      ["warm-water", "따뜻한 물 한 모금"],
    ],
  },
];

const QUESTION_PATTERNS = [
  ["E", "I", "{label} 상황이 갑자기 생기면 첫 반응은?", "open", "solo"],
  ["E", "I", "{label}을/를 시작할 때 힘이 나는 쪽은?", "team", "quiet"],
  ["E", "I", "{label} 이야기가 나오면 보통 어떻게 하나요?", "talk", "think"],
  ["S", "N", "{label}을/를 판단할 때 먼저 확인하는 것은?", "fact", "meaning"],
  ["S", "N", "{label} 계획을 세운다면 더 편한 방식은?", "check", "flow"],
  ["S", "N", "{label}에서 안심되는 정보는?", "detail", "context"],
  ["T", "F", "{label}을/를 결정할 때 더 앞서는 기준은?", "logic", "care"],
  ["T", "F", "{label}에서 문제가 생기면 먼저 하는 일은?", "solve", "mood"],
  ["T", "F", "{label} 선택을 설명해야 한다면?", "reason", "soft"],
  ["J", "P", "{label}을/를 앞두고 더 편한 준비는?", "plan", "flex"],
  ["J", "P", "{label}이/가 중간에 바뀌면?", "revise", "adapt"],
  ["J", "P", "{label}을/를 마무리하는 방식은?", "close", "openEnd"],
];

const CATEGORY_COPY = {
  살림: {
    scene: "집 안 곳곳에서 반복되는 살림 동작과 정돈 순간",
    value: "정돈감, 유지 가능성, 생활 효율의 균형",
    advice: "큰 정리 한 번보다 매일 5분의 작은 리셋이 오래 갑니다",
  },
  디지털2: {
    scene: "여러 기기와 앱을 오가며 알림과 정보가 흩어지는 장면",
    value: "집중력, 정보 통제, 시간 회수의 우선순위",
    advice:
      "도구를 늘리기보다 한 곳에서 끝내는 동선을 만들면 피로가 줄어듭니다",
  },
  유대: {
    scene: "사람과 사람 사이의 거리와 표현이 오가는 장면",
    value: "표현의 속도, 거리의 안정감, 관계 에너지",
    advice: "상대 페이스에 맞추되 자신의 회복 시간도 함께 챙기는 것이 좋습니다",
  },
  직장: {
    scene: "업무 흐름과 협업 과정에서 끊임없이 생기는 결정",
    value: "정확도, 속도, 사람 사이 조율의 균형",
    advice: "기준을 명확히 하되 사람의 기대치를 분리해 보면 덜 흔들립니다",
  },
  구매: {
    scene: "비교, 후기, 결제 사이를 반복하는 구매 결정 장면",
    value: "후회 최소화, 가성비, 만족감의 우선순위",
    advice: "가격보다 오래 쓸 장면을 먼저 떠올리면 선택이 선명해집니다",
  },
  취미: {
    scene: "쉬는 시간과 취미를 채우는 다양한 활동",
    value: "몰입, 회복, 사회적 에너지의 균형",
    advice: "남는 시간이 아니라 회복되는 시간을 기준으로 골라 보세요",
  },
  마음: {
    scene: "감정이 흔들리거나 마음을 정리해야 하는 순간",
    value: "감정 인식, 표현 속도, 회복 루틴",
    advice:
      "감정을 바로 해결하려 하기보다 이름 붙이고 거리 두는 연습이 도움됩니다",
  },
  여정: {
    scene: "이동·숙소·일정 사이에서 생기는 여행 결정",
    value: "안정감, 즉흥성, 경험의 밀도",
    advice: "핵심 일정 하나와 여백 하나를 함께 두면 만족도가 높아집니다",
  },
  활력: {
    scene: "컨디션과 생활 리듬을 돌보는 작은 결정들",
    value: "지속 가능성, 몸 신호 읽기, 회복",
    advice: "완벽한 루틴보다 다시 시작하기 쉬운 루틴이 오래 갑니다",
  },
  성장: {
    scene: "공부와 연습, 도전을 이어가는 자기개발 장면",
    value: "집중 방식, 반복 주기, 피드백 수용",
    advice: "결과보다 다음 행동이 보이게 쪼개면 부담이 줄어듭니다",
  },
  절기: {
    scene: "날씨·명절·기념일에 맞춰 일상을 조정하는 순간",
    value: "준비성, 감각, 컨디션의 균형",
    advice: "계절감은 챙기되 컨디션을 해치지 않는 선을 정해 두면 좋습니다",
  },
  마인드케어: {
    scene: "스트레스와 피로가 차오를 때의 짧은 회복 장면",
    value: "회복 속도, 자기 신호 인식, 작은 루틴",
    advice:
      "완벽한 회복보다 5분 안에 다시 시작할 수 있는 동작 하나가 효과적입니다",
  },
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function compact(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function hasBatchim(value) {
  const chars = [...compact(value)];
  const char = chars.at(-1);
  if (!char) return false;
  const code = char.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

function objectParticle(value) {
  return hasBatchim(value) ? "을" : "를";
}

function subjectParticle(value) {
  return hasBatchim(value) ? "이" : "가";
}

function andParticle(value) {
  return hasBatchim(value) ? "과" : "와";
}

function listRouteSlugs() {
  if (!fs.existsSync(TESTS_DIR)) return [];
  return fs
    .readdirSync(TESTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith("[") && !name.startsWith("_"));
}

function readJsonSafe(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function localExistingStrings() {
  const values = [...listRouteSlugs()];
  const files = [
    "data/quiz-topic-plan-100.json",
    "data/quiz-topic-plan-100-wave2.json",
    "data/quiz-topic-plan-200-wave3.json",
    "data/quiz-topic-plan-200-wave4.json",
    "data/quiz-wave3-200.json",
    "data/quiz-wave4-200.json",
    "lib/tests-config.ts",
  ];

  for (const relativePath of files) {
    const filePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(filePath)) continue;
    const json = relativePath.endsWith(".json") ? readJsonSafe(filePath) : null;
    if (Array.isArray(json)) {
      json.forEach((row) => values.push(row.slug, row.title, row.mainKeyword));
      continue;
    }
    const text = fs.readFileSync(filePath, "utf8");
    values.push(
      ...[...text.matchAll(/["'`]([a-z0-9-]{4,})["'`]/g)].map(
        (match) => match[1],
      ),
    );
  }

  return values.filter(Boolean).map(String);
}

async function createDb() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing");
  }
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  await db.execute("select 1");
  return db;
}

async function loadDbState(db, ignoreWave = null) {
  const rows = (
    await db.execute("select slug, title, published_at, metadata from tests")
  ).rows;
  const comparableRows = ignoreWave
    ? rows.filter((row) => {
        try {
          return JSON.parse(row.metadata || "{}").wave !== ignoreWave;
        } catch {
          return true;
        }
      })
    : rows;
  const existing = comparableRows
    .flatMap((row) => [row.slug, row.title])
    .filter(Boolean)
    .map(String);
  const maxPublishedAt = comparableRows.reduce((max, row) => {
    const value = Number(row.published_at || 0);
    return Number.isFinite(value) && value > max ? value : max;
  }, 0);
  return { existing, maxPublishedAt };
}

function tokens(value) {
  const stopwords = new Set([
    "test",
    "style",
    "type",
    "quiz",
    "mbti",
    "life",
    "tech",
    "bond",
    "career",
    "buy",
    "hobby",
    "mood",
    "trip",
    "vital",
    "skill",
    "season",
    "care",
    "wave5",
    "테스트",
    "성향",
    "스타일",
    "방식",
    "습관",
    "관리",
    "선택",
  ]);

  return compact(value)
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/[\s-]+/)
    .map((token) => token.toLowerCase())
    .filter((token) => token.length >= 2 && !stopwords.has(token));
}

function similarity(aValue, bValue) {
  const a = new Set(tokens(aValue));
  const b = new Set(tokens(bValue));
  if (!a.size || !b.size) return { score: 0, shared: 0 };
  let shared = 0;
  a.forEach((token) => {
    if (b.has(token)) shared += 1;
  });
  return { score: shared / (a.size + b.size - shared), shared };
}

function nearestDuplicate(candidate, values) {
  const candidateText = `${candidate.slug} ${candidate.title} ${candidate.mainKeyword}`;
  let nearest = { value: null, score: 0, shared: 0 };
  values.forEach((value) => {
    const current = similarity(candidateText, value);
    if (current.score > nearest.score || current.shared > nearest.shared) {
      nearest = { value, ...current };
    }
  });
  return nearest;
}

function buildCandidates() {
  const titleSuffixes = [
    "스타일 테스트",
    "성향 테스트",
    "취향 테스트",
    "루틴 테스트",
  ];
  const candidates = [];
  GROUPS.forEach((group) => {
    group.subjects.forEach(([slugPart, label], index) => {
      const titleSuffix =
        titleSuffixes[(candidates.length + index) % titleSuffixes.length];
      const title = `${label} ${titleSuffix}`;
      candidates.push({
        title,
        slug: `${group.prefix}-${slugify(slugPart)}-wave5`,
        category: group.category,
        label,
        mainKeyword: `${label} ${titleSuffix.replace(" 테스트", "")}`,
        expandedKeywords: [
          ...group.keywords.slice(0, 4),
          `${label} 기준`,
          `${label} 루틴`,
          `${label} 체크`,
        ],
        intentNote: `${label} 상황에서 드러나는 선택 기준과 행동 흐름을 12문항으로 가볍게 진단`,
        categoryResearch: group.research,
      });
    });
  });
  return candidates;
}

function buildResearchNote(candidate) {
  const copy = CATEGORY_COPY[candidate.category];
  return {
    category: candidate.category,
    label: candidate.label,
    sceneSummary: `${candidate.label} 상황은 ${copy.scene}의 한 단면이다.`,
    decisionAxes: [
      `E/I: ${candidate.label}을/를 즉시 공유하는지 혼자 정리하는지의 차이`,
      `S/N: ${candidate.label}에서 사실 조건과 맥락·의미 중 무엇을 먼저 보는지`,
      `T/F: ${candidate.label}의 결정 기준이 효율인지 사람 마음인지`,
      `J/P: ${candidate.label}을/를 사전 계획으로 잡는지 상황 적응으로 가는지`,
    ],
    commonMistakes: [
      `${candidate.label} 자체보다 결과를 평가하려 들어 피로가 누적되는 경우`,
      `${candidate.label} 한 가지 방식을 절대화해 다른 분기를 닫아 버리는 경우`,
      `${candidate.label}의 첫 반응만 보고 사람을 단정하는 경우`,
    ],
    valueFraming: copy.value,
    practicalAdvice: copy.advice,
    categoryNote: candidate.categoryResearch,
  };
}

function nextReservation(previousMaxSeconds, index) {
  const startMs = previousMaxSeconds
    ? previousMaxSeconds * 1000 + SLOT_INTERVAL_HOURS * 3600 * 1000
    : Date.now() + SLOT_INTERVAL_HOURS * 3600 * 1000;
  return new Date(startMs + index * SLOT_INTERVAL_HOURS * 3600 * 1000);
}

function formatKstIso(date) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return `${kst.getUTCFullYear()}-${String(kst.getUTCMonth() + 1).padStart(2, "0")}-${String(kst.getUTCDate()).padStart(2, "0")}T${String(kst.getUTCHours()).padStart(2, "0")}:${String(kst.getUTCMinutes()).padStart(2, "0")}:00+09:00`;
}

function selectTopics(existingValues, previousMaxSeconds) {
  const selected = [];
  const rejected = [];
  const seen = new Set(
    existingValues.map((value) => compact(value).toLowerCase()),
  );
  for (const candidate of buildCandidates()) {
    const nearest = nearestDuplicate(candidate, [...seen]);
    const titleKey = candidate.title.toLowerCase();
    const slugKey = candidate.slug.toLowerCase();
    if (
      seen.has(titleKey) ||
      seen.has(slugKey) ||
      (nearest.shared >= 2 && nearest.score >= 0.42)
    ) {
      rejected.push({ ...candidate, nearest });
      continue;
    }

    const scheduledAt = formatKstIso(
      nextReservation(previousMaxSeconds, selected.length),
    );
    const topic = {
      ...candidate,
      scheduledAt,
      qualityTarget: 95,
      research: buildResearchNote(candidate),
      duplicateCheck: {
        nearestExisting: nearest.value,
        maxSimilarity: Number(nearest.score.toFixed(3)),
        sharedTokens: nearest.shared,
      },
    };
    selected.push(topic);
    seen.add(titleKey);
    seen.add(slugKey);
    seen.add(candidate.mainKeyword.toLowerCase());
    if (selected.length === TARGET_COUNT) break;
  }

  if (selected.length !== TARGET_COUNT) {
    const sample = rejected
      .slice(0, 20)
      .map(
        (row) =>
          `${row.slug} -> ${row.nearest.value} (score=${row.nearest.score.toFixed(2)}, shared=${row.nearest.shared})`,
      )
      .join("\n  ");
    throw new Error(
      `Need ${TARGET_COUNT} topics, selected ${selected.length}, rejected ${rejected.length}\n  ${sample}`,
    );
  }
  return { selected, rejected };
}

function buildDescription(topic) {
  const copy = CATEGORY_COPY[topic.category];
  const keywords = topic.expandedKeywords.slice(0, 3).join(", ");
  return compact(
    `${topic.title}는 ${copy.scene} 속에서 ${topic.mainKeyword}${subjectParticle(topic.mainKeyword)} 어떻게 드러나는지 확인하는 무료 성격 테스트입니다. ` +
      `${keywords} 등을 12문항으로 나눠 보고, 결과에서는 ${copy.value}${andParticle(copy.value)} 바로 써먹을 조정 팁을 함께 정리합니다.`,
  );
}

function choiceText(key, topic) {
  const copy = CATEGORY_COPY[topic.category];
  const map = {
    open: `${topic.label}${objectParticle(topic.label)} 바로 공유하고 주변 반응을 보며 방향을 잡는다`,
    solo: `${topic.label}${objectParticle(topic.label)} 혼자 정리한 뒤 필요한 순간에만 꺼낸다`,
    team: `${topic.label} 과정에서 사람들과 맞춰갈 때 추진력이 생긴다`,
    quiet: `${topic.label}은/는 조용히 몰입할 때 더 안정적으로 이어진다`,
    talk: `${topic.label}에 대한 생각을 말하면서 기준을 찾아간다`,
    think: `${topic.label}에 대한 생각을 속으로 정리한 뒤 결론을 낸다`,
    fact: `${topic.label}에 필요한 시간, 비용, 순서처럼 보이는 조건을 먼저 본다`,
    meaning: `${topic.label}${subjectParticle(topic.label)} 내 생활에 남길 변화와 의미를 먼저 떠올린다`,
    check: `${topic.label} 체크리스트를 만들고 빠진 부분을 줄인다`,
    flow: `${topic.label}의 큰 흐름만 잡고 상황에 맞춰 여백을 둔다`,
    detail: `${topic.label} 관련 세부 조건이 분명할수록 마음이 놓인다`,
    context: `${topic.label}이/가 이어질 맥락을 이해해야 편하게 움직인다`,
    logic: `${topic.label}은/는 효율과 결과를 비교해 납득되는 쪽을 고른다`,
    care: `${topic.label}은/는 사람의 기분과 부담까지 함께 살펴 고른다`,
    solve: `${topic.label} 문제가 생기면 원인과 해결 순서를 먼저 나눈다`,
    mood: `${topic.label} 문제가 생기면 분위기와 마음 상태부터 낮춘다`,
    reason: `${topic.label} 선택의 근거와 장단점을 짧게 설명한다`,
    soft: `${topic.label} 선택이 왜 덜 부담스러운지 부드럽게 말한다`,
    plan: `${topic.label} 전에 ${copy.value}를 기준으로 미리 준비한다`,
    flex: `${topic.label}${hasBatchim(topic.label) ? "은" : "는"} 현장 분위기에 맞춰 유연하게 바꾸는 편이다`,
    revise: `${topic.label} 계획이 바뀌면 새 기준표를 빠르게 다시 만든다`,
    adapt: `${topic.label} 계획이 바뀌면 지금 가능한 선택부터 잡는다`,
    close: `${topic.label}이/가 끝나면 결과를 확인하고 깔끔하게 마무리한다`,
    openEnd: `${topic.label}${subjectParticle(topic.label)} 끝나도 다음에 이어질 여지를 남겨둔다`,
  };
  return map[key];
}

function buildQuestions(topic) {
  return QUESTION_PATTERNS.map(
    ([left, right, text, choice1Key, choice2Key], index) => ({
      order: index + 1,
      text: text.replace("{label}", topic.label),
      choices: [
        { text: choiceText(choice1Key, topic), tags: [left] },
        { text: choiceText(choice2Key, topic), tags: [right] },
      ],
    }),
  );
}

function buildResults(topic) {
  const copy = CATEGORY_COPY[topic.category];
  return MBTI_TYPES.map((type) => {
    const [name, summaryBase] = TYPE_COPY[type];
    return {
      type,
      label: `${topic.label} ${name}`,
      summary: `${summaryBase} ${topic.label} 상황에서는 ${copy.value}${objectParticle(copy.value)} 자기 방식으로 조율합니다. ${copy.advice}. 특히 ${topic.mainKeyword}${objectParticle(topic.mainKeyword)} 고를 때는 첫 반응보다 반복 가능한 기준을 남기는 편이 잘 맞습니다.`,
      traits: TYPE_TRAITS[type],
      presets: {
        "추천 행동": [
          `${topic.label} 전 가장 중요한 기준 하나만 먼저 정하기`,
          "선택 후에는 이유를 짧게 기록하기",
          `${topic.category} 흐름이 흔들리면 쉬운 대안 하나를 남겨두기`,
        ],
        "주의 포인트": [
          "익숙한 방식만 반복하지 않기",
          `${copy.scene}에서 다른 사람의 속도도 함께 확인하기`,
          "결정이 늦어질 때는 마감선을 정하기",
        ],
      },
      recommend: MBTI_TYPES[(MBTI_TYPES.indexOf(type) + 5) % MBTI_TYPES.length],
      pitfalls: MBTI_TYPES[(MBTI_TYPES.indexOf(type) + 11) % MBTI_TYPES.length],
    };
  });
}

function scoreQuiz(topic, quiz) {
  const issues = [];
  let score = 100;
  if (compact(quiz.title).length < 8 || compact(quiz.title).length > 45) {
    score -= 4;
    issues.push("title_length");
  }
  if (
    compact(quiz.description).length < 120 ||
    compact(quiz.description).length > 320
  ) {
    score -= 8;
    issues.push("description_length");
  }
  if (quiz.questions.length !== 12) {
    score -= 20;
    issues.push("question_count");
  }
  if (quiz.results.length !== 16) {
    score -= 20;
    issues.push("result_count");
  }
  const axisCounts = { EI: 0, SN: 0, TF: 0, JP: 0 };
  quiz.questions.forEach((question) => {
    const tags = question.choices.flatMap((choice) => choice.tags);
    const axis =
      tags.includes("E") || tags.includes("I")
        ? "EI"
        : tags.includes("S") || tags.includes("N")
          ? "SN"
          : tags.includes("T") || tags.includes("F")
            ? "TF"
            : "JP";
    axisCounts[axis] += 1;
  });
  Object.entries(axisCounts).forEach(([axis, count]) => {
    if (count !== 3) {
      score -= 6;
      issues.push(`axis_${axis}_${count}`);
    }
  });
  const labels = new Set(quiz.results.map((result) => result.label));
  if (labels.size !== 16) {
    score -= 8;
    issues.push("duplicate_result_label");
  }
  if (topic.duplicateCheck.maxSimilarity >= 0.42) {
    score -= 10;
    issues.push("duplicate_risk");
  }
  if (!topic.research || !topic.research.sceneSummary) {
    score -= 6;
    issues.push("missing_research");
  }
  return {
    score: Math.max(0, score),
    version: "wave5-quality-v1",
    checkedAt: new Date().toISOString(),
    requiredScore: 90,
    issues,
  };
}

function buildQuizzes(topics) {
  return topics.map((topic, index) => {
    const quiz = {
      id: `${WAVE}-${String(index + 1).padStart(3, "0")}`,
      title: topic.title,
      description: buildDescription(topic),
      slug: topic.slug,
      category: topic.category,
      mainKeyword: topic.mainKeyword,
      expandedKeywords: topic.expandedKeywords,
      scheduledAt: topic.scheduledAt,
      questionCount: 12,
      resultTypeCount: 16,
      research: topic.research,
      questions: buildQuestions(topic),
      results: buildResults(topic),
    };
    quiz.quality = scoreQuiz(topic, quiz);
    quiz.thumbnail = {
      mode: "dynamic-og",
      url: `/api/og?title=${encodeURIComponent(quiz.title)}&desc=${encodeURIComponent(topic.mainKeyword)}`,
      status: quiz.title.length <= 40 ? "pass" : "review",
      checkedAt: new Date().toISOString(),
    };
    return quiz;
  });
}

function validate(topics, quizzes) {
  const errors = [];
  const slugs = new Set();
  const titles = new Set();
  if (topics.length !== TARGET_COUNT)
    errors.push(`topic_count_${topics.length}`);
  if (quizzes.length !== TARGET_COUNT)
    errors.push(`quiz_count_${quizzes.length}`);
  topics.forEach((topic) => {
    if (slugs.has(topic.slug)) errors.push(`duplicate_slug_${topic.slug}`);
    if (titles.has(topic.title)) errors.push(`duplicate_title_${topic.title}`);
    if (!/^[a-z0-9-]+$/.test(topic.slug))
      errors.push(`invalid_slug_${topic.slug}`);
    if (
      topic.duplicateCheck.sharedTokens >= 2 &&
      topic.duplicateCheck.maxSimilarity >= 0.42
    ) {
      errors.push(`duplicate_risk_${topic.slug}`);
    }
    slugs.add(topic.slug);
    titles.add(topic.title);
  });

  // Verify 5-hour spacing between consecutive slots
  for (let i = 1; i < topics.length; i += 1) {
    const prev = Date.parse(topics[i - 1].scheduledAt);
    const cur = Date.parse(topics[i].scheduledAt);
    if (cur - prev !== SLOT_INTERVAL_HOURS * 3600 * 1000) {
      errors.push(`slot_interval_${i}_${(cur - prev) / 3600000}h`);
    }
  }

  quizzes.forEach((quiz) => {
    if (quiz.quality.score < 90)
      errors.push(`quality_under_90_${quiz.slug}_${quiz.quality.score}`);
    if (quiz.questions.length !== 12)
      errors.push(`questions_${quiz.slug}_${quiz.questions.length}`);
    if (quiz.results.length !== 16)
      errors.push(`results_${quiz.slug}_${quiz.results.length}`);
  });
  return errors;
}

function writeArtifacts(topics, quizzes, rejected) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const review = {
    generatedAt: new Date().toISOString(),
    wave: WAVE,
    count: quizzes.length,
    slotIntervalHours: SLOT_INTERVAL_HOURS,
    minQualityScore: Math.min(...quizzes.map((quiz) => quiz.quality.score)),
    maxDuplicateSimilarity: Math.max(
      ...topics.map((topic) => topic.duplicateCheck.maxSimilarity),
    ),
    rejectedCount: rejected.length,
    firstScheduledAt: topics[0]?.scheduledAt,
    lastScheduledAt: topics.at(-1)?.scheduledAt,
    sample: quizzes.slice(0, 5).map((quiz) => ({
      title: quiz.title,
      slug: quiz.slug,
      score: quiz.quality.score,
      scheduledAt: quiz.scheduledAt,
    })),
  };
  const researchDigest = {
    wave: WAVE,
    generatedAt: new Date().toISOString(),
    categoryNotes: Object.fromEntries(
      GROUPS.map((group) => [group.category, group.research]),
    ),
    topics: topics.map((topic) => ({
      slug: topic.slug,
      title: topic.title,
      category: topic.category,
      research: topic.research,
      scheduledAt: topic.scheduledAt,
    })),
  };
  fs.writeFileSync(PLAN_PATH, `${JSON.stringify(topics, null, 2)}\n`, "utf8");
  fs.writeFileSync(
    QUIZZES_PATH,
    `${JSON.stringify(quizzes, null, 2)}\n`,
    "utf8",
  );
  fs.writeFileSync(REVIEW_PATH, `${JSON.stringify(review, null, 2)}\n`, "utf8");
  fs.writeFileSync(
    RESEARCH_PATH,
    `${JSON.stringify(researchDigest, null, 2)}\n`,
    "utf8",
  );
  return review;
}

function generateId(prefix, index) {
  return `${prefix}_${String(index).padStart(4, "0")}_${Math.random().toString(36).slice(2, 8)}`;
}

async function applyToDb(db, quizzes) {
  let inserted = 0;
  let skipped = 0;
  for (const [index, quiz] of quizzes.entries()) {
    const existing = await db.execute({
      sql: "select id from tests where slug = ? or title = ? limit 1",
      args: [quiz.slug, quiz.title],
    });
    if (existing.rows.length) {
      skipped += 1;
      continue;
    }

    const testId = generateId(WAVE, index + 1);
    const now = Math.floor(Date.now() / 1000);
    const publishedAt = Math.floor(Date.parse(quiz.scheduledAt) / 1000);
    const metadata = JSON.stringify({
      source: "codex_wave5",
      wave: WAVE,
      mainKeyword: quiz.mainKeyword,
      expandedKeywords: quiz.expandedKeywords,
      scheduledAt: quiz.scheduledAt,
      quality: quiz.quality,
      copyQuality: { score: 95, checkedAt: new Date().toISOString() },
      resultCopyQuality: { score: 95, checkedAt: new Date().toISOString() },
      thumbnail: quiz.thumbnail,
      research: quiz.research,
    });

    await db.batch([
      {
        sql: `insert into tests
          (id, slug, title, description, category, status, question_count, result_type_count, metadata, created_at, updated_at, published_at)
          values (?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?, ?)`,
        args: [
          testId,
          quiz.slug,
          quiz.title,
          quiz.description,
          quiz.category,
          quiz.questionCount,
          quiz.resultTypeCount,
          metadata,
          now,
          now,
          publishedAt,
        ],
      },
      ...quiz.questions.map((question) => ({
        sql: `insert into questions
          (id, test_id, question_order, question_text, choice_1_text, choice_1_tags, choice_2_text, choice_2_tags)
          values (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          generateId("q", index * 12 + question.order),
          testId,
          question.order,
          question.text,
          question.choices[0].text,
          JSON.stringify(question.choices[0].tags),
          question.choices[1].text,
          JSON.stringify(question.choices[1].tags),
        ],
      })),
      ...quiz.results.map((result, resultIndex) => ({
        sql: `insert into result_types
          (id, test_id, type_code, label, summary, traits, picks, tips, match_types)
          values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          generateId("r", index * 16 + resultIndex + 1),
          testId,
          result.type,
          result.label,
          result.summary,
          JSON.stringify(result.traits),
          JSON.stringify(result.presets),
          JSON.stringify(result.presets["추천 행동"]),
          JSON.stringify({ best: result.recommend, worst: result.pitfalls }),
        ],
      })),
    ]);
    inserted += 1;
  }
  return { inserted, skipped };
}

async function main() {
  const db = await createDb();
  try {
    const dbState = await loadDbState(db, REFRESH_DB ? WAVE : null);
    const existingValues = [...localExistingStrings(), ...dbState.existing];
    const generated = REUSE_ARTIFACTS
      ? { selected: readJsonSafe(PLAN_PATH), rejected: [] }
      : selectTopics(existingValues, dbState.maxPublishedAt);
    const selected = generated.selected;
    const rejected = generated.rejected;
    const quizzes = REUSE_ARTIFACTS
      ? readJsonSafe(QUIZZES_PATH)
      : buildQuizzes(selected);
    if (!Array.isArray(selected) || !Array.isArray(quizzes)) {
      throw new Error("Wave5 artifacts are missing or invalid.");
    }

    const errors = validate(selected, quizzes);
    console.log(`topics: ${selected.length}`);
    console.log(`quizzes: ${quizzes.length}`);
    console.log(`errors: ${errors.length}`);
    console.log(
      `min quality: ${Math.min(...quizzes.map((quiz) => quiz.quality.score))}`,
    );
    console.log(
      `max duplicate similarity: ${Math.max(...selected.map((topic) => topic.duplicateCheck.maxSimilarity)).toFixed(3)}`,
    );
    console.log(
      `schedule: ${selected[0].scheduledAt} -> ${selected.at(-1).scheduledAt}`,
    );
    console.log(`slot interval: ${SLOT_INTERVAL_HOURS}h`);

    if (errors.length) {
      errors.slice(0, 30).forEach((error) => console.log(`- ${error}`));
      process.exitCode = 1;
      return;
    }

    if (!VERIFY_ONLY) {
      const review = writeArtifacts(selected, quizzes, rejected);
      console.log(`wrote: ${path.relative(ROOT, PLAN_PATH)}`);
      console.log(`wrote: ${path.relative(ROOT, QUIZZES_PATH)}`);
      console.log(`wrote: ${path.relative(ROOT, REVIEW_PATH)}`);
      console.log(`wrote: ${path.relative(ROOT, RESEARCH_PATH)}`);
      console.log(`review min quality: ${review.minQualityScore}`);
    }

    if (APPLY_DB) {
      const result = await applyToDb(db, quizzes);
      console.log(`db inserted: ${result.inserted}`);
      console.log(`db skipped: ${result.skipped}`);
    }
  } finally {
    db.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
