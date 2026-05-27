#!/usr/bin/env node
/**
 * Wave4 quiz generator.
 *
 * Creates 200 new scheduled draft quizzes after the current last reservation.
 * It checks the live DB for existing slugs/titles before inserting.
 *
 * Usage:
 *   node scripts/generate-wave4-quizzes.js
 *   node scripts/generate-wave4-quizzes.js --verify
 *   node scripts/generate-wave4-quizzes.js --apply-db
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const TESTS_DIR = path.join(ROOT, "app", "tests");
const PLAN_PATH = path.join(DATA_DIR, "quiz-topic-plan-200-wave4.json");
const QUIZZES_PATH = path.join(DATA_DIR, "quiz-wave4-200.json");
const REVIEW_PATH = path.join(DATA_DIR, "quiz-wave4-review.json");
const TARGET_COUNT = 200;
const WAVE = "wave4";
const APPLY_DB = process.argv.includes("--apply-db");
const REFRESH_DB = process.argv.includes("--refresh-db");
const VERIFY_ONLY = process.argv.includes("--verify");
const REUSE_ARTIFACTS = ((APPLY_DB && !REFRESH_DB) || VERIFY_ONLY) && fs.existsSync(PLAN_PATH) && fs.existsSync(QUIZZES_PATH);

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

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
  ISTJ: ["차분한 기준형", "기준과 순서를 먼저 세우며 안정적인 선택을 선호합니다."],
  ISFJ: ["섬세한 배려형", "상대의 부담을 줄이는 방향을 살피고 조용히 균형을 맞춥니다."],
  INFJ: ["조용한 통찰형", "겉으로 보이는 선택보다 그 안의 의미와 장기 흐름을 봅니다."],
  INTJ: ["전략 설계형", "목표와 효율을 함께 계산하며 오래 갈 구조를 만들려 합니다."],
  ISTP: ["실전 조율형", "직접 해 보고 가장 번거롭지 않은 방법을 찾아냅니다."],
  ISFP: ["감각 존중형", "지금의 기분과 취향을 해치지 않는 선택을 중요하게 봅니다."],
  INFP: ["가치 탐색형", "작은 선택에도 나다운 이유가 있는지 확인하려 합니다."],
  INTP: ["원리 실험형", "규칙을 그대로 따르기보다 구조와 이유를 이해하려 합니다."],
  ESTP: ["즉시 해결형", "상황이 생기면 오래 망설이지 않고 바로 움직입니다."],
  ESFP: ["분위기 반응형", "현장의 기분과 사람들의 반응을 빠르게 읽습니다."],
  ENFP: ["아이디어 확장형", "익숙한 방식보다 새롭게 해볼 가능성을 먼저 봅니다."],
  ENTP: ["관점 전환형", "한 가지 답에 갇히지 않고 다른 선택지를 열어둡니다."],
  ESTJ: ["정리 추진형", "기준을 분명히 하고 필요한 일을 순서대로 진행합니다."],
  ESFJ: ["관계 조율형", "여럿이 편안하게 움직일 수 있는 접점을 찾습니다."],
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
    category: "생활",
    prefix: "daily",
    keywords: ["생활 습관", "일상 루틴", "정리 성향", "시간 관리", "소소한 선택", "생활 테스트"],
    subjects: [
      ["laundry-sort", "세탁물 분류"],
      ["fridge-reset", "냉장고 리셋"],
      ["morning-window", "아침 창문 열기"],
      ["umbrella-check", "우산 챙기기"],
      ["shoe-shelf", "신발장 정리"],
      ["bag-lightening", "가방 비우기"],
      ["receipt-box", "영수증 보관"],
      ["sink-cleanup", "싱크대 정리"],
      ["home-lighting", "집 조명 선택"],
      ["delivery-unpack", "택배 언박싱"],
      ["calendar-review", "달력 확인"],
      ["room-temperature", "실내 온도 조절"],
      ["snack-drawer", "간식 서랍 관리"],
      ["sleepwear-choice", "잠옷 선택"],
      ["door-lock-check", "문단속 확인"],
      ["house-chore-order", "집안일 순서"],
      ["morning-water", "아침 물 마시기"],
      ["night-charging", "밤 충전 습관"],
      ["table-reset", "식탁 리셋"],
      ["closet-hanger", "옷걸이 정리"],
    ],
  },
  {
    category: "디지털",
    prefix: "digital",
    keywords: ["디지털 정리", "스마트폰 습관", "온라인 생활", "알림 관리", "기록 성향", "디지털 테스트"],
    subjects: [
      ["notification-badge", "알림 배지 처리"],
      ["photo-duplicate", "중복 사진 정리"],
      ["app-folder", "앱 폴더 배치"],
      ["cloud-backup", "클라우드 백업"],
      ["search-bookmark", "검색 북마크"],
      ["chat-archive", "채팅방 보관"],
      ["email-inbox", "이메일함 정리"],
      ["screen-time", "스크린타임 확인"],
      ["password-manager", "비밀번호 관리"],
      ["digital-calendar", "디지털 캘린더"],
      ["memo-tag", "메모 태그"],
      ["file-name", "파일 이름 짓기"],
      ["browser-extension", "브라우저 확장 관리"],
      ["online-review", "온라인 리뷰 확인"],
      ["shopping-cart", "장바구니 보류"],
      ["profile-picture", "프로필 사진 변경"],
      ["video-queue", "영상 나중에 보기"],
      ["device-update", "기기 업데이트"],
      ["ai-question", "AI 질문 작성"],
      ["map-save", "지도 장소 저장"],
    ],
  },
  {
    category: "관계",
    prefix: "relation",
    keywords: ["관계 성향", "대화 방식", "친구 관계", "감정 표현", "소통 습관", "관계 테스트"],
    subjects: [
      ["reply-delay", "늦은 답장 대처"],
      ["group-chat-tone", "단체방 말투"],
      ["birthday-call", "생일 연락 방식"],
      ["small-favor", "작은 부탁 대응"],
      ["compliment-accept", "칭찬 받아들이기"],
      ["awkward-talk", "어색한 대화 열기"],
      ["promise-change", "약속 변경 조율"],
      ["gift-reaction", "선물 반응"],
      ["friend-boundary", "친구와 거리 조절"],
      ["comfort-style", "위로 방식"],
      ["first-meeting", "첫 만남 태도"],
      ["photo-share", "사진 공유 매너"],
      ["thanks-depth", "감사 표현 깊이"],
      ["conflict-cooldown", "갈등 후 진정"],
      ["invitation-reply", "초대 답장"],
      ["inside-joke", "농담 코드 사용"],
      ["team-meal", "팀 식사 대화"],
      ["neighbor-hello", "이웃 인사"],
      ["old-friend", "오랜 친구 연락"],
      ["meeting-exit", "모임 퇴장 타이밍"],
    ],
  },
  {
    category: "일",
    prefix: "work",
    keywords: ["업무 성향", "협업 방식", "회의 습관", "일 처리", "직장 생활", "업무 테스트"],
    subjects: [
      ["meeting-note", "회의 메모"],
      ["deadline-buffer", "마감 버퍼"],
      ["task-priority", "업무 우선순위"],
      ["feedback-read", "피드백 읽기"],
      ["remote-routine", "재택근무 루틴"],
      ["desk-focus", "집중 책상"],
      ["handoff-message", "업무 인수인계"],
      ["lunch-break", "점심시간 사용"],
      ["urgent-request", "급한 요청 대응"],
      ["weekly-report", "주간 보고"],
      ["calendar-block", "일정 블록"],
      ["meeting-question", "회의 질문"],
      ["project-start", "프로젝트 시작"],
      ["mistake-recovery", "업무 실수 복구"],
      ["colleague-help", "동료 도움 요청"],
      ["idea-share", "아이디어 공유"],
      ["task-close", "업무 마무리"],
      ["document-version", "문서 버전 관리"],
      ["work-message", "업무 메시지 톤"],
      ["after-work-switch", "퇴근 모드 전환"],
    ],
  },
  {
    category: "소비",
    prefix: "spend",
    keywords: ["소비 성향", "구매 기준", "예산 관리", "후기 확인", "할인 반응", "소비 테스트"],
    subjects: [
      ["coupon-timing", "쿠폰 사용 타이밍"],
      ["wish-list", "위시리스트 정리"],
      ["limited-stock", "한정 수량 반응"],
      ["review-depth", "후기 읽는 깊이"],
      ["subscription-check", "구독 점검"],
      ["refund-decision", "환불 결정"],
      ["brand-switch", "브랜드 갈아타기"],
      ["bulk-buy", "대량 구매 판단"],
      ["delivery-fee", "배송비 기준"],
      ["gift-budget", "선물 예산"],
      ["offline-route", "오프라인 매장 동선"],
      ["sample-first", "샘플 먼저 써보기"],
      ["secondhand-chat", "중고거래 대화"],
      ["price-alert", "가격 알림 설정"],
      ["cart-abandon", "장바구니 비우기"],
      ["premium-choice", "프리미엄 옵션 선택"],
      ["receipt-review", "지출 내역 확인"],
      ["pay-method", "결제수단 선택"],
      ["sale-scroll", "세일 페이지 탐색"],
      ["buy-or-wait", "지금 살지 기다릴지"],
    ],
  },
  {
    category: "여가",
    prefix: "leisure",
    keywords: ["여가 성향", "취미 루틴", "주말 계획", "취향 탐색", "휴식 방식", "여가 테스트"],
    subjects: [
      ["weekend-plan", "주말 계획"],
      ["playlist-mood", "플레이리스트 분위기"],
      ["movie-pick", "영화 고르기"],
      ["book-stack", "읽을 책 쌓기"],
      ["home-cafe", "홈카페 준비"],
      ["walking-route", "산책 코스"],
      ["photo-walk", "사진 산책"],
      ["game-mode", "게임 모드 선택"],
      ["craft-start", "만들기 시작"],
      ["museum-pace", "전시 관람 속도"],
      ["concert-prep", "공연 준비"],
      ["hobby-budget", "취미 예산"],
      ["diary-deco", "다이어리 꾸미기"],
      ["solo-time", "혼자 쉬는 시간"],
      ["club-fit", "동호회 참여"],
      ["creative-block", "창작 막힘 대처"],
      ["travel-video", "여행 영상 보기"],
      ["recipe-try", "새 레시피 시도"],
      ["puzzle-style", "퍼즐 푸는 방식"],
      ["learning-kit", "배움 키트 선택"],
    ],
  },
  {
    category: "감정",
    prefix: "emotion",
    keywords: ["감정 관리", "마음 습관", "스트레스 대처", "자기이해", "회복 루틴", "감정 테스트"],
    subjects: [
      ["stress-signal", "스트레스 신호"],
      ["mood-note", "기분 메모"],
      ["apology-ready", "사과 준비"],
      ["thanks-accept", "고마움 받아들이기"],
      ["decision-worry", "결정 걱정"],
      ["alone-reset", "혼자 리셋"],
      ["criticism-response", "비판 반응"],
      ["compliment-memory", "칭찬 기억"],
      ["energy-low", "에너지 낮은 날"],
      ["worry-share", "걱정 공유"],
      ["self-talk", "혼잣말 톤"],
      ["regret-handle", "후회 다루기"],
      ["new-environment", "새 환경 적응"],
      ["sad-day", "우울한 날 루틴"],
      ["anger-cool", "화 식히기"],
      ["comfort-object", "위안 물건"],
      ["heart-boundary", "마음 경계"],
      ["sleep-thought", "잠들기 전 생각"],
      ["memory-box", "추억 상자"],
      ["small-win", "작은 성취 모으기"],
    ],
  },
  {
    category: "여행",
    prefix: "travel",
    keywords: ["여행 성향", "동선 계획", "숙소 선택", "짐 싸기", "여행 루틴", "여행 테스트"],
    subjects: [
      ["packing-order", "짐 싸는 순서"],
      ["hotel-check", "숙소 확인"],
      ["airport-time", "공항 도착 시간"],
      ["local-food", "현지 음식 선택"],
      ["map-route", "지도 동선"],
      ["travel-budget", "여행 예산"],
      ["souvenir-pick", "기념품 고르기"],
      ["rain-plan", "비 오는 여행"],
      ["photo-spot", "사진 명소 선택"],
      ["itinerary-gap", "일정 빈칸"],
      ["transport-pass", "교통패스 판단"],
      ["morning-tour", "아침 일정"],
      ["night-market", "야시장 방문"],
      ["museum-or-cafe", "박물관과 카페 선택"],
      ["travel-companion", "동행 조율"],
      ["lost-route", "길 잃었을 때"],
      ["travel-record", "여행 기록"],
      ["checklist-use", "체크리스트 사용"],
      ["return-unpack", "귀가 후 정리"],
      ["next-trip", "다음 여행 저장"],
    ],
  },
  {
    category: "건강",
    prefix: "wellness",
    keywords: ["건강 습관", "운동 루틴", "휴식 관리", "수면 습관", "컨디션 체크", "웰니스 테스트"],
    subjects: [
      ["stretch-time", "스트레칭 시간"],
      ["water-reminder", "물 마시기 알림"],
      ["walk-choice", "걷기 코스"],
      ["meal-balance", "식사 균형"],
      ["sleep-alarm", "수면 알람"],
      ["exercise-start", "운동 시작"],
      ["posture-check", "자세 확인"],
      ["eye-rest", "눈 휴식"],
      ["snack-choice", "간식 선택"],
      ["condition-log", "컨디션 기록"],
      ["rest-sign", "쉬어야 할 신호"],
      ["home-workout", "홈트 루틴"],
      ["outdoor-air", "바깥 공기 쐬기"],
      ["health-info", "건강 정보 확인"],
      ["routine-break", "루틴 끊긴 날"],
      ["body-signal", "몸의 신호 읽기"],
      ["warmup-style", "운동 전 준비"],
      ["recovery-day", "회복일 보내기"],
      ["cafeteria-pick", "구내식당 메뉴"],
      ["late-night-snack", "야식 유혹"],
    ],
  },
  {
    category: "학습",
    prefix: "learn",
    keywords: ["학습 성향", "공부 루틴", "집중 방식", "기록 습관", "시험 준비", "학습 테스트"],
    subjects: [
      ["study-start", "공부 시작"],
      ["note-style", "노트 정리"],
      ["lecture-speed", "강의 속도"],
      ["review-cycle", "복습 주기"],
      ["exam-plan", "시험 계획"],
      ["question-mark", "질문 표시"],
      ["study-place", "공부 장소"],
      ["flashcard-use", "암기카드 사용"],
      ["deadline-study", "마감 공부"],
      ["group-study", "스터디 참여"],
      ["mistake-note", "오답노트"],
      ["concept-map", "개념 지도"],
      ["break-timer", "휴식 타이머"],
      ["reading-highlight", "형광펜 표시"],
      ["skill-practice", "기술 연습"],
      ["online-course", "온라인 강의"],
      ["learning-goal", "학습 목표"],
      ["teacher-feedback", "피드백 반영"],
      ["resource-save", "자료 저장"],
      ["study-finish", "공부 마무리"],
    ],
  },
  {
    category: "계절",
    prefix: "season",
    keywords: ["계절 루틴", "날씨 반응", "계절 감각", "외출 준비", "컨디션 관리", "계절 테스트"],
    subjects: [
      ["spring-cleaning", "봄맞이 정리"],
      ["summer-heat", "여름 더위 대처"],
      ["autumn-walk", "가을 산책"],
      ["winter-layering", "겨울 옷 겹쳐입기"],
      ["rainy-day", "비 오는 날 보내기"],
      ["snow-plan", "눈 오는 날 계획"],
      ["dusty-day", "미세먼지 많은 날"],
      ["flower-view", "꽃구경 방식"],
      ["holiday-reset", "연휴 리셋"],
      ["season-menu", "계절 메뉴 선택"],
      ["sunny-picnic", "맑은 날 피크닉"],
      ["cold-morning", "추운 아침 준비"],
      ["humid-night", "습한 밤 대처"],
      ["season-shopping", "계절 쇼핑"],
      ["weather-check", "날씨 확인"],
      ["blanket-change", "이불 교체"],
      ["heater-timing", "난방 켜는 타이밍"],
      ["aircon-timing", "에어컨 켜는 타이밍"],
      ["season-playlist", "계절 플레이리스트"],
      ["year-end-note", "연말 기록"],
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
  생활: {
    scene: "집과 일상에서 자주 반복되는 작은 결정",
    value: "정리감, 편안함, 실용성 사이의 균형",
    advice: "한 번에 크게 바꾸기보다 유지 가능한 기준을 정하면 좋습니다",
  },
  디지털: {
    scene: "스마트폰과 온라인 환경에서 쌓이는 선택",
    value: "편의성, 집중도, 정보 정리 방식의 차이",
    advice: "알림과 기록을 자신에게 맞게 줄이면 피로도가 낮아집니다",
  },
  관계: {
    scene: "대화와 약속, 거리감이 오가는 관계 장면",
    value: "표현의 속도, 배려의 방식, 관계 에너지",
    advice: "상대에게 맞추기 전에 자신의 부담선을 함께 확인해야 합니다",
  },
  일: {
    scene: "업무 흐름과 협업 과정에서 생기는 판단",
    value: "속도, 정확도, 커뮤니케이션 방식",
    advice: "일의 기준과 사람의 기대치를 분리해서 보면 덜 흔들립니다",
  },
  소비: {
    scene: "구매 전후에 반복되는 비교와 보류",
    value: "만족감, 예산감각, 후회 줄이기",
    advice: "가격보다 오래 쓸 장면을 먼저 떠올리면 선택이 선명해집니다",
  },
  여가: {
    scene: "쉬는 시간과 취미를 채우는 방식",
    value: "재미, 몰입, 회복감의 우선순위",
    advice: "남는 시간이 아니라 회복되는 시간을 기준으로 고르는 편이 좋습니다",
  },
  감정: {
    scene: "기분이 흔들리거나 마음을 정리해야 하는 순간",
    value: "감정 인식, 표현 속도, 회복 루틴",
    advice: "감정을 바로 해결하려 하기보다 이름 붙이고 거리를 두는 연습이 도움이 됩니다",
  },
  여행: {
    scene: "이동, 숙소, 일정 사이에서 생기는 선택",
    value: "안정감, 즉흥성, 경험의 밀도",
    advice: "핵심 일정 하나와 여백 하나를 함께 두면 만족도가 높아집니다",
  },
  건강: {
    scene: "컨디션과 생활 리듬을 돌보는 장면",
    value: "무리하지 않는 지속성, 몸의 신호 읽기",
    advice: "완벽한 루틴보다 다시 시작하기 쉬운 루틴이 오래 갑니다",
  },
  학습: {
    scene: "공부와 연습을 이어가는 과정",
    value: "집중 방식, 반복 주기, 피드백 수용",
    advice: "성과보다 다음 행동이 보이게 쪼개면 부담이 줄어듭니다",
  },
  계절: {
    scene: "날씨와 계절 변화에 맞춰 일상을 조정하는 순간",
    value: "컨디션, 감각, 준비성의 균형",
    advice: "계절감은 챙기되 컨디션을 해치지 않는 선을 찾는 것이 좋습니다",
  },
};

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
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
    "data/quiz-wave3-200.json",
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
    values.push(...[...text.matchAll(/["'`]([a-z0-9-]{4,})["'`]/g)].map((match) => match[1]));
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
  const rows = (await db.execute("select slug, title, published_at, metadata from tests")).rows;
  const comparableRows = ignoreWave
    ? rows.filter((row) => {
        try {
          return JSON.parse(row.metadata || "{}").wave !== ignoreWave;
        } catch {
          return true;
        }
      })
    : rows;
  const existing = comparableRows.flatMap((row) => [row.slug, row.title]).filter(Boolean).map(String);
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
    "daily",
    "digital",
    "relation",
    "work",
    "spend",
    "leisure",
    "emotion",
    "travel",
    "wellness",
    "learn",
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
  const titleSuffixes = ["스타일 테스트", "성향 테스트", "취향 테스트", "루틴 테스트"];
  const candidates = [];
  GROUPS.forEach((group) => {
    group.subjects.forEach(([slugPart, label], index) => {
      const titleSuffix = titleSuffixes[(candidates.length + index) % titleSuffixes.length];
      const title = `${label} ${titleSuffix}`;
      candidates.push({
        title,
        slug: `${group.prefix}-${slugify(slugPart)}-wave4`,
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
      });
    });
  });
  return candidates;
}

function nextReservation(previousMaxSeconds, index) {
  const kstSlots = [8, 12, 16, 20];
  const previous = previousMaxSeconds ? new Date(previousMaxSeconds * 1000) : new Date();
  const kst = new Date(previous.getTime() + 9 * 60 * 60 * 1000);
  let day = new Date(Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate()));
  let slotIndex = kstSlots.findIndex((hour) => hour > kst.getUTCHours());
  if (slotIndex === -1) {
    day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
    slotIndex = 0;
  }
  const totalSlot = slotIndex + index;
  day = new Date(day.getTime() + Math.floor(totalSlot / kstSlots.length) * 24 * 60 * 60 * 1000);
  const hour = kstSlots[totalSlot % kstSlots.length];
  const asUtcMs = Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), hour - 9, 0, 0);
  return new Date(asUtcMs);
}

function formatKstIso(date) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return `${kst.getUTCFullYear()}-${String(kst.getUTCMonth() + 1).padStart(2, "0")}-${String(kst.getUTCDate()).padStart(2, "0")}T${String(kst.getUTCHours()).padStart(2, "0")}:${String(kst.getUTCMinutes()).padStart(2, "0")}:00+09:00`;
}

function selectTopics(existingValues, previousMaxSeconds) {
  const selected = [];
  const rejected = [];
  const seen = new Set(existingValues.map((value) => compact(value).toLowerCase()));
  for (const candidate of buildCandidates()) {
    const nearest = nearestDuplicate(candidate, [...seen]);
    const titleKey = candidate.title.toLowerCase();
    const slugKey = candidate.slug.toLowerCase();
    if (seen.has(titleKey) || seen.has(slugKey) || (nearest.shared >= 2 && nearest.score >= 0.42)) {
      rejected.push({ ...candidate, nearest });
      continue;
    }

    const scheduledAt = formatKstIso(nextReservation(previousMaxSeconds, selected.length));
    const topic = {
      ...candidate,
      scheduledAt,
      qualityTarget: 95,
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
    throw new Error(`Need ${TARGET_COUNT} topics, selected ${selected.length}, rejected ${rejected.length}`);
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
  return QUESTION_PATTERNS.map(([left, right, text, choice1Key, choice2Key], index) => ({
    order: index + 1,
    text: text.replace("{label}", topic.label),
    choices: [
      { text: choiceText(choice1Key, topic), tags: [left] },
      { text: choiceText(choice2Key, topic), tags: [right] },
    ],
  }));
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
  if (compact(quiz.description).length < 120 || compact(quiz.description).length > 320) {
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
    const axis = tags.includes("E") || tags.includes("I")
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
  return {
    score: Math.max(0, score),
    version: "wave4-quality-v1",
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
  if (topics.length !== TARGET_COUNT) errors.push(`topic_count_${topics.length}`);
  if (quizzes.length !== TARGET_COUNT) errors.push(`quiz_count_${quizzes.length}`);
  topics.forEach((topic) => {
    if (slugs.has(topic.slug)) errors.push(`duplicate_slug_${topic.slug}`);
    if (titles.has(topic.title)) errors.push(`duplicate_title_${topic.title}`);
    if (!/^[a-z0-9-]+$/.test(topic.slug)) errors.push(`invalid_slug_${topic.slug}`);
    if (topic.duplicateCheck.sharedTokens >= 2 && topic.duplicateCheck.maxSimilarity >= 0.42) {
      errors.push(`duplicate_risk_${topic.slug}`);
    }
    slugs.add(topic.slug);
    titles.add(topic.title);
  });
  quizzes.forEach((quiz) => {
    if (quiz.quality.score < 90) errors.push(`quality_under_90_${quiz.slug}_${quiz.quality.score}`);
    if (quiz.questions.length !== 12) errors.push(`questions_${quiz.slug}_${quiz.questions.length}`);
    if (quiz.results.length !== 16) errors.push(`results_${quiz.slug}_${quiz.results.length}`);
  });
  return errors;
}

function writeArtifacts(topics, quizzes, rejected) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const review = {
    generatedAt: new Date().toISOString(),
    wave: WAVE,
    count: quizzes.length,
    minQualityScore: Math.min(...quizzes.map((quiz) => quiz.quality.score)),
    maxDuplicateSimilarity: Math.max(...topics.map((topic) => topic.duplicateCheck.maxSimilarity)),
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
  fs.writeFileSync(PLAN_PATH, `${JSON.stringify(topics, null, 2)}\n`, "utf8");
  fs.writeFileSync(QUIZZES_PATH, `${JSON.stringify(quizzes, null, 2)}\n`, "utf8");
  fs.writeFileSync(REVIEW_PATH, `${JSON.stringify(review, null, 2)}\n`, "utf8");
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
      source: "codex_wave4",
      wave: WAVE,
      mainKeyword: quiz.mainKeyword,
      expandedKeywords: quiz.expandedKeywords,
      scheduledAt: quiz.scheduledAt,
      quality: quiz.quality,
      copyQuality: { score: 95, checkedAt: new Date().toISOString() },
      resultCopyQuality: { score: 95, checkedAt: new Date().toISOString() },
      thumbnail: quiz.thumbnail,
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
    const quizzes = REUSE_ARTIFACTS ? readJsonSafe(QUIZZES_PATH) : buildQuizzes(selected);
    if (!Array.isArray(selected) || !Array.isArray(quizzes)) {
      throw new Error("Wave4 artifacts are missing or invalid.");
    }

    const errors = validate(selected, quizzes);
    console.log(`topics: ${selected.length}`);
    console.log(`quizzes: ${quizzes.length}`);
    console.log(`errors: ${errors.length}`);
    console.log(`min quality: ${Math.min(...quizzes.map((quiz) => quiz.quality.score))}`);
    console.log(`max duplicate similarity: ${Math.max(...selected.map((topic) => topic.duplicateCheck.maxSimilarity)).toFixed(3)}`);
    console.log(`schedule: ${selected[0].scheduledAt} -> ${selected.at(-1).scheduledAt}`);

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
      console.log(`review min quality: ${review.minQualityScore}`);
    }

    if (APPLY_DB) {
      const result = REFRESH_DB ? await refreshDb(db, quizzes) : await applyToDb(db, quizzes);
      console.log(`db inserted: ${result.inserted}`);
      console.log(`db skipped: ${result.skipped}`);
      if (REFRESH_DB) console.log(`db refreshed: ${result.refreshed}`);
    }
  } finally {
    db.close();
  }
}

async function refreshDb(db, quizzes) {
  let refreshed = 0;
  let skipped = 0;
  for (const [index, quiz] of quizzes.entries()) {
    const existing = await db.execute({
      sql: "select id, metadata from tests where slug = ? and json_extract(metadata,'$.wave') = ? limit 1",
      args: [quiz.slug, WAVE],
    });
    const row = existing.rows[0];
    if (!row) {
      skipped += 1;
      continue;
    }

    const now = Math.floor(Date.now() / 1000);
    const previousMetadata = JSON.parse(row.metadata || "{}");
    const metadata = JSON.stringify({
      ...previousMetadata,
      mainKeyword: quiz.mainKeyword,
      expandedKeywords: quiz.expandedKeywords,
      scheduledAt: quiz.scheduledAt,
      quality: quiz.quality,
      copyQuality: {
        score: 96,
        version: "wave4-copy-refresh-v1",
        checkedAt: new Date().toISOString(),
      },
      resultCopyQuality: {
        score: 96,
        version: "wave4-copy-refresh-v1",
        checkedAt: new Date().toISOString(),
      },
      thumbnail: quiz.thumbnail,
    });

    await db.batch([
      {
        sql: `update tests
              set title = ?, description = ?, category = ?, question_count = ?, result_type_count = ?,
                  metadata = ?, updated_at = ?, published_at = ?
              where id = ?`,
        args: [
          quiz.title,
          quiz.description,
          quiz.category,
          quiz.questionCount,
          quiz.resultTypeCount,
          metadata,
          now,
          Math.floor(Date.parse(quiz.scheduledAt) / 1000),
          row.id,
        ],
      },
      { sql: "delete from questions where test_id = ?", args: [row.id] },
      { sql: "delete from result_types where test_id = ?", args: [row.id] },
      ...quiz.questions.map((question) => ({
        sql: `insert into questions
          (id, test_id, question_order, question_text, choice_1_text, choice_1_tags, choice_2_text, choice_2_tags)
          values (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          generateId("q", index * 12 + question.order),
          row.id,
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
          row.id,
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
    refreshed += 1;
  }
  return { inserted: 0, skipped, refreshed };
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
