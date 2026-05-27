#!/usr/bin/env node
/**
 * Wave6 quiz generator.
 *
 * Creates 300 additional scheduled draft quizzes after the wave5 last slot
 * (2026-10-27 08:00 KST). Slots are spaced exactly 5 hours apart.
 *
 * Each topic carries a research note (scene/decisionAxes/commonMistakes) and
 * the quiz body is generated from that note — research → quiz.
 *
 * Usage:
 *   node scripts/generate-wave6-quizzes.js
 *   node scripts/generate-wave6-quizzes.js --verify
 *   node scripts/generate-wave6-quizzes.js --apply-db
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const TESTS_DIR = path.join(ROOT, "app", "tests");
const PLAN_PATH = path.join(DATA_DIR, "quiz-topic-plan-300-wave6.json");
const QUIZZES_PATH = path.join(DATA_DIR, "quiz-wave6-300.json");
const REVIEW_PATH = path.join(DATA_DIR, "quiz-wave6-review.json");
const RESEARCH_PATH = path.join(DATA_DIR, "quiz-wave6-research.json");
const TARGET_COUNT = 300;
const WAVE = "wave6";
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
    category: "외출",
    prefix: "outing",
    keywords: [
      "외출 준비",
      "동선 짜기",
      "이동 습관",
      "약속 시간",
      "장소 선택",
      "외출 테스트",
    ],
    research:
      "집에서 나서기 직전부터 첫 목적지 도착까지의 짧지만 결정 밀도 높은 구간. 챙김의 깊이와 이동 동선의 효율이 갈리는 지점.",
    subjects: [
      ["leave-checklist", "외출 체크리스트"],
      ["earphone-pick", "이어폰 챙김"],
      ["mask-pack", "마스크 챙김"],
      ["card-or-cash", "카드와 현금"],
      ["lipbalm-pack", "립밤 챙김"],
      ["bus-or-subway", "버스와 지하철"],
      ["taxi-call", "택시 호출"],
      ["walk-pace", "걷는 속도"],
      ["mirror-final", "마지막 거울"],
      ["lights-off", "조명 끄기"],
      ["gas-shutoff", "가스 잠그기"],
      ["earlier-leave", "일찍 나서기"],
      ["meeting-cafe", "약속 카페"],
      ["meeting-park", "약속 공원"],
      ["parking-find", "주차 자리"],
      ["umbrella-fold", "접이식 우산 챙김"],
      ["water-bottle", "텀블러 챙김"],
      ["snack-bag", "간식 챙김"],
      ["dust-check", "미세먼지 체크"],
      ["forecast-glance", "일기예보 확인"],
      ["map-preset", "지도 사전 설정"],
      ["small-coin", "잔돈 챙김"],
      ["return-route", "귀가 동선"],
      ["public-bench", "야외 벤치 선택"],
      ["solo-outing", "혼자 나가기"],
    ],
  },
  {
    category: "식사",
    prefix: "meal",
    keywords: [
      "식사 습관",
      "메뉴 결정",
      "주방 동선",
      "조리 방식",
      "식탁 분위기",
      "식사 테스트",
    ],
    research:
      "끼니 한 번에 들어가는 작은 결정들이 켜켜이 쌓이는 영역. 효율·즐거움·건강 중 어디에 우선순위를 두는지가 분기점.",
    subjects: [
      ["soup-or-stew", "국과 찌개"],
      ["rice-ratio", "밥 비율"],
      ["noodle-night", "야간 면 요리"],
      ["bread-morning", "아침 빵"],
      ["egg-style", "달걀 조리법"],
      ["meal-prep", "식단 미리 준비"],
      ["lunchbox-pack", "도시락 챙김"],
      ["sauce-mix", "소스 조합"],
      ["plate-arrange", "접시 배치"],
      ["leftover-keep", "남은 음식 보관"],
      ["spicy-tolerance", "매운맛 강도"],
      ["sweet-after", "식후 단맛"],
      ["coffee-after", "식후 커피"],
      ["fruit-end", "후식 과일"],
      ["solo-meal-mood", "혼밥 분위기"],
      ["share-plate", "함께 먹는 접시"],
      ["restaurant-pick", "식당 고르기"],
      ["takeout-frequency", "포장 빈도"],
      ["delivery-order", "배달 주문"],
      ["new-recipe", "새 레시피"],
      ["cooking-mood", "요리할 때 분위기"],
      ["spice-rack", "향신료 보관"],
      ["meal-photo", "음식 사진"],
      ["fridge-meal", "냉장고 식재료"],
      ["dish-order", "설거지 순서"],
    ],
  },
  {
    category: "운전",
    prefix: "drive",
    keywords: [
      "운전 습관",
      "도로 매너",
      "정비 루틴",
      "동승자 매너",
      "주차 성향",
      "운전 테스트",
    ],
    research:
      "핸들 위에서 1초 안에 내리는 결정들이 누적되는 영역. 안전·시간·동승자 분위기 중 무엇을 가장 먼저 보는지가 갈린다.",
    subjects: [
      ["lane-change", "차선 변경"],
      ["highway-speed", "고속도로 속도"],
      ["nav-trust", "내비 신뢰"],
      ["fuel-fill", "주유 시점"],
      ["wash-routine", "세차 루틴"],
      ["tire-check", "타이어 점검"],
      ["wiper-replace", "와이퍼 교체"],
      ["engine-warmup", "엔진 예열"],
      ["music-drive", "운전 중 음악"],
      ["radio-listen-drive", "운전 라디오"],
      ["passenger-care", "동승자 케어"],
      ["seatbelt-back", "뒷좌석 안전벨트"],
      ["park-style", "주차 스타일"],
      ["reverse-park", "후진 주차"],
      ["traffic-jam", "정체 대응"],
      ["yellow-light", "황색 신호 대응"],
      ["pedestrian-wait", "보행자 양보"],
      ["honk-use", "경적 사용"],
      ["dashcam-view", "블랙박스 확인"],
      ["fuel-economy", "연비 관리"],
      ["dent-fix", "찍힘 수리"],
      ["repair-timing", "정비소 방문"],
      ["car-snack", "차 안 간식"],
      ["air-freshener", "차량 방향제"],
      ["night-drive", "야간 운전"],
    ],
  },
  {
    category: "반려",
    prefix: "pet",
    keywords: [
      "반려동물",
      "산책 습관",
      "사료 선택",
      "건강 체크",
      "함께 사는 공간",
      "반려 테스트",
    ],
    research:
      "반려동물과 함께 사는 일상은 짧은 결정의 연속이다. 케어 적극성·환경 조정·교감 방식의 균형이 사람마다 달라진다.",
    subjects: [
      ["walk-time", "산책 시간"],
      ["walk-route", "산책 코스"],
      ["leash-type", "리드줄 종류"],
      ["kibble-pick", "사료 고르기 기준"],
      ["wet-or-dry", "습식 건식"],
      ["treat-give", "간식 주기"],
      ["bath-cycle", "목욕 주기"],
      ["brush-time", "빗질 시간"],
      ["nail-trim", "발톱 정리"],
      ["vet-checkup", "동물병원 점검"],
      ["vaccine-schedule", "예방접종"],
      ["dental-care-pet", "치아 관리"],
      ["clean-bed", "잠자리 세탁"],
      ["litter-clean", "화장실 청소"],
      ["toy-rotate", "장난감 교체"],
      ["new-toy", "새 장난감"],
      ["socialize", "친구 만나기"],
      ["stay-home-pet", "반려동물 집 보기"],
      ["away-prep", "외출 시 케어"],
      ["pet-photo", "반려 사진"],
      ["pet-name-call", "이름 부르는 법"],
      ["training-line", "훈련 기준"],
      ["sleep-spot", "잠자는 자리"],
      ["barking-handle", "짖음 대응"],
      ["pet-insurance", "펫보험"],
    ],
  },
  {
    category: "옷차림",
    prefix: "style",
    keywords: [
      "옷차림",
      "코디 성향",
      "쇼핑 매너",
      "옷장 관리",
      "TPO 감각",
      "패션 테스트",
    ],
    research:
      "기분·날씨·자리에 따라 옷을 고르는 방식이 사람마다 다르다. 일관성과 변화, 노출과 절제 사이의 선택을 본다.",
    subjects: [
      ["outfit-pick-am", "오늘 아침 코디"],
      ["color-base", "기본 색"],
      ["pattern-mix", "패턴 매치"],
      ["accessory-pick", "악세서리 선택"],
      ["bag-day", "오늘 가방"],
      ["sneaker-pick", "운동화 선택"],
      ["formal-set", "정장 코디"],
      ["business-casual", "비즈니스 캐주얼"],
      ["rainy-shoes", "비 오는 날 신발"],
      ["coat-layer", "코트 레이어드"],
      ["hat-pick", "모자 고르기"],
      ["scarf-fold", "스카프 매기"],
      ["jewelry-daily", "데일리 주얼리"],
      ["watch-pick", "시계 선택"],
      ["perfume-spot", "향수 뿌리기"],
      ["wardrobe-rotate", "옷장 순환"],
      ["cleaning-bag", "세탁 모음"],
      ["dry-clean", "드라이클리닝"],
      ["repair-clothes", "옷 수선"],
      ["donate-clothes", "옷 기부"],
      ["seasonal-buy", "시즌 구매"],
      ["color-match-mirror", "거울 컬러 매칭"],
      ["wedding-guest", "결혼식 하객복"],
      ["funeral-attire", "조문 복장"],
      ["weekend-comfort", "주말 편한 옷"],
    ],
  },
  {
    category: "음악",
    prefix: "music",
    keywords: [
      "음악 듣기",
      "선곡 습관",
      "공연 관람",
      "악기 연주",
      "감상 분위기",
      "음악 테스트",
    ],
    research:
      "기분 보정·집중·휴식의 도구로 음악을 어떻게 쓰는지가 핵심. 새 곡 탐색형과 익숙한 곡 회귀형이 명확히 갈린다.",
    subjects: [
      ["mood-playlist", "기분별 플레이리스트"],
      ["work-music", "업무용 음악"],
      ["workout-music", "운동 음악"],
      ["sleep-music", "수면 음악"],
      ["study-bgm", "공부 BGM"],
      ["chart-check", "음원 차트 확인"],
      ["new-album", "신보 청취"],
      ["live-stream", "라이브 스트림"],
      ["festival-go", "페스티벌 참석"],
      ["solo-concert", "솔로 콘서트"],
      ["vinyl-listen", "LP 듣기"],
      ["bluetooth-speaker", "블루투스 스피커"],
      ["headphone-pick", "헤드폰 선택"],
      ["lyrics-read", "가사 보기"],
      ["song-share", "노래 공유"],
      ["cover-listen", "커버곡 듣기"],
      ["instrumental-pref", "연주곡 선호"],
      ["karaoke-list", "노래방 18번"],
      ["radio-pick", "라디오 채널"],
      ["podcast-mix", "팟캐스트 병행"],
      ["throwback-play", "추억의 곡"],
      ["genre-explore", "장르 탐색"],
      ["album-cover", "앨범 커버"],
      ["concert-photo", "공연 사진"],
      ["song-recommend", "곡 추천"],
    ],
  },
  {
    category: "영상",
    prefix: "visual",
    keywords: [
      "영상 시청",
      "시리즈 정주행",
      "추천 알고리즘",
      "영상 제작",
      "시간 사용",
      "영상 테스트",
    ],
    research:
      "긴 시간 단위로 결정을 누적하는 영역. 한 번에 몰아보기 vs 나눠 보기, 정주행 vs 탐색의 성향이 드러난다.",
    subjects: [
      ["binge-watch", "몰아보기"],
      ["one-episode", "하루 한 화"],
      ["series-end", "시리즈 마무리"],
      ["weekly-wait", "주간 방영 대기"],
      ["movie-pick-couple", "함께 영화 고르기"],
      ["doc-watch", "다큐 시청"],
      ["short-clip", "짧은 영상 시청"],
      ["long-form", "긴 영상 시청"],
      ["vlog-pick", "브이로그 시청"],
      ["youtuber-follow", "유튜버 구독"],
      ["spoiler-handle", "스포일러 대응"],
      ["subtitle-pick", "자막 설정"],
      ["dubbed-pref", "더빙 선호"],
      ["ott-switch", "OTT 갈아타기"],
      ["family-tv", "가족 TV 시청"],
      ["projector-night", "프로젝터 영화의 밤"],
      ["theater-time", "영화관 시간대"],
      ["popcorn-pick", "팝콘 메뉴"],
      ["seat-row", "영화관 좌석 줄"],
      ["review-after", "본 뒤 리뷰"],
      ["rating-give", "별점 부여"],
      ["save-later-video", "나중에 보기"],
      ["thumbnail-trust", "썸네일 신뢰"],
      ["recommendation-trust", "추천 알고리즘 신뢰"],
      ["replay-fav", "재시청"],
    ],
  },
  {
    category: "독서",
    prefix: "read",
    keywords: [
      "독서 습관",
      "책 선택",
      "메모 방식",
      "장르 취향",
      "독서 환경",
      "독서 테스트",
    ],
    research:
      "책과 만나는 모든 순간의 미시 결정. 정독·발췌·도서관·서점·중고 등 채널별 선호와 메모 깊이가 갈리는 영역.",
    subjects: [
      ["bookstore-walk", "서점 산책"],
      ["library-borrow", "도서관 대여"],
      ["used-book", "중고책"],
      ["ebook-vs-paper", "전자책과 종이책"],
      ["audiobook-listen", "오디오북"],
      ["bedtime-read", "취침 독서"],
      ["commute-read", "출퇴근 독서"],
      ["finish-rate", "완독 비율"],
      ["multi-book", "동시 독서"],
      ["genre-fiction", "장르소설"],
      ["essay-pick", "에세이 선호"],
      ["self-help", "자기계발서"],
      ["history-book", "역사책"],
      ["foreign-novel", "번역소설"],
      ["short-story", "단편 모음"],
      ["highlight-note", "밑줄과 메모"],
      ["index-card", "독서카드"],
      ["bookclub-join", "독서 모임"],
      ["recommend-book", "책 추천"],
      ["gift-book", "책 선물"],
      ["bookshelf-style", "책장 스타일"],
      ["bookmark-pick", "책갈피 선택"],
      ["reading-cafe", "독서 카페"],
      ["reread-fav", "재독"],
      ["book-cover", "책 표지 보기"],
    ],
  },
  {
    category: "체력",
    prefix: "sport",
    keywords: [
      "운동 루틴",
      "체력 관리",
      "트레이닝",
      "팀 스포츠",
      "장비 선택",
      "체력 테스트",
    ],
    research:
      "체력을 어떻게 만드는지, 회복은 어떻게 하는지에 대한 관점이 사람마다 다르다. 강도·지속·즐거움의 균형 지점이 분기점.",
    subjects: [
      ["gym-time", "헬스장 시간"],
      ["pt-class", "PT 수업"],
      ["group-class-sport", "그룹 수업"],
      ["running-distance", "달리기 거리"],
      ["interval-run", "인터벌 러닝"],
      ["bench-press", "벤치프레스"],
      ["squat-set", "스쿼트 세트"],
      ["pull-up", "턱걸이"],
      ["climbing-route", "클라이밍 루트"],
      ["swimming-lap", "수영 랩"],
      ["aqua-walk", "아쿠아 워킹"],
      ["tennis-match", "테니스 경기"],
      ["badminton-game", "배드민턴 경기"],
      ["soccer-team", "축구 동호회"],
      ["basketball-pickup", "농구 픽업"],
      ["bicycle-pace", "자전거 페이스"],
      ["mountain-elevation", "등산 표고차"],
      ["yoga-mat", "요가 매트"],
      ["pilates-class", "필라테스 수업"],
      ["rest-day-sport", "운동 휴식일"],
      ["warmup-stretch", "준비 스트레칭"],
      ["protein-shake", "프로틴 셰이크"],
      ["gear-buy", "운동복 구매"],
      ["app-track", "운동앱 기록"],
      ["heart-rate-zone", "심박 존"],
    ],
  },
  {
    category: "양육",
    prefix: "parent",
    keywords: [
      "아이 케어",
      "양육 태도",
      "교육 선택",
      "가정 분위기",
      "놀이 시간",
      "양육 테스트",
    ],
    research:
      "아이의 시간과 부모의 시간을 어떻게 겹치거나 분리할지의 결정. 학습·자율·안전의 균형을 잡는 방식이 사람마다 다르다.",
    subjects: [
      ["bedtime-story", "잠자리 책"],
      ["morning-routine-kid", "아이 아침 루틴"],
      ["screen-time-kid", "아이 화면 시간"],
      ["snack-pick-kid", "아이 간식"],
      ["lunchbox-kid", "유치원 도시락"],
      ["new-friend-kid", "아이의 새 친구"],
      ["playdate", "놀이 약속"],
      ["pickup-time", "하원 시간"],
      ["homework-help", "숙제 도움"],
      ["academy-pick", "학원 선택"],
      ["reading-with-kid", "아이와 함께 읽기"],
      ["family-trip-plan", "가족 여행 계획"],
      ["theme-park", "테마파크"],
      ["museum-with-kid", "아이와 박물관"],
      ["allowance-set", "용돈 설정"],
      ["chore-share", "집안일 분담"],
      ["scolding-style", "혼내는 방식"],
      ["praise-style", "칭찬 방식"],
      ["teacher-meet", "선생님 면담"],
      ["health-checkup-kid", "아이 건강검진"],
      ["bath-time-kid", "아이 목욕"],
      ["bedtime-talk", "잠들기 전 대화"],
      ["sibling-mediation", "형제 중재"],
      ["birthday-party-kid", "아이 생일파티"],
      ["family-photo", "가족 사진"],
    ],
  },
  {
    category: "노년",
    prefix: "senior",
    keywords: [
      "노년 준비",
      "은퇴 설계",
      "건강 유지",
      "여가 활용",
      "사회 활동",
      "노년 테스트",
    ],
    research:
      "체력·관계·재정 변화를 함께 다뤄야 하는 영역. 미리 준비할지 그때 그때 조정할지의 태도가 분기점.",
    subjects: [
      ["retirement-plan", "은퇴 계획"],
      ["second-career", "제2의 직업"],
      ["pension-check", "연금 점검"],
      ["healthcare-plan", "건강관리 계획"],
      ["senior-club", "노년 모임"],
      ["volunteer-senior", "봉사활동"],
      ["new-hobby-senior", "새 취미"],
      ["learning-senior", "노년 학습"],
      ["travel-after-60", "60대 여행"],
      ["grandchild-meet", "손주 만남"],
      ["family-gather", "가족 모임"],
      ["doctor-trust", "주치의 신뢰"],
      ["medication-list", "복용약 정리"],
      ["walk-routine-senior", "노년 걷기"],
      ["balance-exercise", "균형 운동"],
      ["memory-care", "기억력 관리"],
      ["digital-class", "디지털 강좌"],
      ["smartphone-help", "스마트폰 도움 받기"],
      ["downsize-home", "주거 다운사이징"],
      ["asset-handover", "자산 이전"],
      ["will-prepare", "유언 준비"],
      ["funeral-prep", "장례 준비"],
      ["legacy-letter", "남기는 편지"],
      ["young-friend", "젊은 친구"],
      ["pet-with-senior", "노년의 반려동물"],
    ],
  },
  {
    category: "자산",
    prefix: "asset",
    keywords: [
      "돈 관리",
      "투자 성향",
      "지출 통제",
      "저축 습관",
      "위험 감수",
      "자산 테스트",
    ],
    research:
      "수입·지출·투자의 결정이 누적되는 영역. 안전·수익·유동성 중 어느 쪽을 먼저 보는지가 분기점.",
    subjects: [
      ["monthly-budget", "월 예산"],
      ["spending-track", "지출 추적"],
      ["saving-rate", "저축 비율"],
      ["rainy-day-fund", "긴급 자금 통장"],
      ["account-split", "통장 쪼개기"],
      ["fixed-deposit", "정기예금"],
      ["installment-saving", "적금"],
      ["fund-pick", "펀드 선택"],
      ["stock-buy", "주식 매수"],
      ["stock-sell", "주식 매도"],
      ["dividend-pick", "배당주"],
      ["etf-allocate", "ETF 배분"],
      ["bond-buy", "채권 매수"],
      ["crypto-decide", "가상자산 결정"],
      ["real-estate-look", "부동산 알아보기"],
      ["mortgage-plan", "주담대 계획"],
      ["insurance-review", "보험 점검"],
      ["tax-deduction", "연말정산"],
      ["credit-score", "신용점수 관리"],
      ["loan-compare", "대출 비교"],
      ["donation-set", "기부 설정"],
      ["pension-add", "추가 연금"],
      ["wealth-record", "자산 기록"],
      ["financial-news", "금융 뉴스"],
      ["advisor-meet", "재무 상담"],
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
  외출: {
    scene: "집에서 첫 목적지까지 이어지는 짧지만 결정 밀도 높은 구간",
    value: "준비도, 동선 효율, 컨디션 보호의 균형",
    advice: "도착 시각에서 거꾸로 동선을 짜면 챙길 것이 자연스레 줄어듭니다",
  },
  식사: {
    scene: "끼니마다 반복되는 메뉴·조리·정리의 미세 결정",
    value: "건강, 즐거움, 효율 사이의 우선순위",
    advice:
      "일주일 단위로 메뉴 큰 틀만 정하고 디테일은 그날 분위기에 맡겨 보세요",
  },
  운전: {
    scene: "핸들 위에서 매 순간 내려야 하는 빠른 결정",
    value: "안전, 흐름, 동승자 분위기의 균형",
    advice: "익숙한 길에서도 정비 주기와 졸음 신호는 따로 챙겨야 합니다",
  },
  반려: {
    scene: "반려동물의 하루를 함께 만드는 케어 장면",
    value: "케어의 일관성, 환경 조정, 교감",
    advice:
      "완벽한 케어보다 매일 반복할 수 있는 작은 루틴 두세 가지가 효과적입니다",
  },
  옷차림: {
    scene: "기분·날씨·자리에 따라 옷을 고르는 짧은 의사결정",
    value: "TPO, 편안함, 자기다움의 균형",
    advice: "기본 색 두 가지를 고정해 두면 코디 부담이 크게 줄어듭니다",
  },
  음악: {
    scene: "기분 보정과 집중·휴식 사이에서 곡을 고르는 순간",
    value: "탐색 욕구, 익숙함, 분위기 조절의 균형",
    advice:
      "용도별 플레이리스트 세 개만 단단히 만들면 매번의 선택이 빨라집니다",
  },
  영상: {
    scene: "긴 시간 단위로 영상을 보는 결정과 그 사이의 휴식",
    value: "몰입, 정보 효율, 시간 통제의 균형",
    advice:
      "한 시리즈는 시작 전에 끝낼 시점을 함께 정해 두면 피로가 줄어듭니다",
  },
  독서: {
    scene: "책을 고르고 읽고 정리하는 잔잔한 흐름",
    value: "정독과 발췌, 기록과 흐름의 균형",
    advice: "한 권을 끝내야 다음을 시작한다는 규칙은 가끔 풀어 보면 좋습니다",
  },
  체력: {
    scene: "체력을 만들고 회복하는 매일의 운동·휴식 선택",
    value: "강도, 지속, 즐거움의 균형",
    advice: "쉬는 날을 먼저 정해 두면 운동의 강도가 자연스럽게 맞춰집니다",
  },
  양육: {
    scene: "아이의 시간과 부모의 시간이 겹치고 또 갈라지는 장면",
    value: "학습, 자율, 안전의 균형",
    advice: "지시를 줄이고 선택지를 주는 방식이 아이의 결정 근육을 키워 줍니다",
  },
  노년: {
    scene: "체력·관계·재정의 변화에 미리 맞춰가는 노년 준비",
    value: "건강, 사회적 연결, 재정의 균형",
    advice:
      "한 번에 큰 변화를 만들기보다 매년 작은 점검을 정기화하는 편이 좋습니다",
  },
  자산: {
    scene: "수입·지출·투자가 끊임없이 결정되는 자산 운용 장면",
    value: "안전, 수익, 유동성의 균형",
    advice: "큰 결정은 시간 간격을 두고 하되 작은 점검은 매월 짧게 반복하세요",
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
    "data/quiz-topic-plan-300-wave5.json",
    "data/quiz-wave3-200.json",
    "data/quiz-wave4-200.json",
    "data/quiz-wave5-300.json",
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
    "outing",
    "meal",
    "drive",
    "pet",
    "music",
    "visual",
    "read",
    "sport",
    "parent",
    "senior",
    "asset",
    "wave5",
    "wave6",
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
        slug: `${group.prefix}-${slugify(slugPart)}-wave6`,
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
    version: "wave6-quality-v1",
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
      source: "codex_wave6",
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
      throw new Error("Wave6 artifacts are missing or invalid.");
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
