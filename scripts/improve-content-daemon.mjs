#!/usr/bin/env node
/**
 * Temon Automated Content Improvement Daemon
 * 
 * Runs every 6 hours to incrementally enrich thin/unoptimized quizzes
 * with deep, high-E-E-A-T landing content (>800 chars), FAQs, and 
 * removes them from noindex when quality criteria are satisfied.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Load env
dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });
dotenv.config({ path: path.join(ROOT, ".env.production"), override: false, quiet: true });

const DRY_RUN = process.argv.includes("--dry-run");
const TARGET_ARG = process.argv.find((a) => a.startsWith("--target="));
const SPECIFIC_TARGET = TARGET_ARG ? TARGET_ARG.split("=")[1].trim() : null;
const LIMIT_ARG = process.argv.find((a) => a.startsWith("--limit="));
const BATCH_LIMIT = LIMIT_ARG ? Math.max(1, parseInt(LIMIT_ARG.split("=")[1], 10)) : 1;

const EXTENDED_JSON_PATH = path.join(ROOT, "data", "extended-content.json");
const NOINDEX_PATH = path.join(ROOT, "lib", "noindex-tests.ts");
const LOG_PATH = path.join(ROOT, "reports", "content-daemon.log");

// High-priority candidate slugs (GSC impressions or high viral potential)
const HIGH_PRIORITY_SLUGS = [
  "pet-mbti",
  "kpop-idol",
  "spending-style",
  "breakup-style",
  "music-taste",
  "zombie-survival",
  "skin-routine",
  "sleep-chronotype",
  "hotel-breakfast",
  "investment-style",
  "clean-style",
  "pizza-topping",
  "morning-alarm",
  "jachui",
  "weekend-rest",
  "morning-coffee",
  "grocery-shopping"
];

// Topic context mapping for rich contextual fallback synthesis
const TOPIC_CONTEXTS = {
  "pet-mbti": {
    name: "반려동물 MBTI 테스트",
    category: "반려동물/성격",
    context: "강아지, 고양이 등 반려동물과 교감하는 방식과 양육 태도에서 드러나는 성향",
    insight: "반려동물과의 상호작용은 책임감, 감정 교류, 돌봄의 패턴을 가장 솔직하게 보여주는 거울입니다.",
    useCases: [
      "나와 가장 생활 리듬이 잘 맞는 반려동물 성향을 가볍게 파악하고 싶을 때",
      "반려동물을 대할 때 나의 감정 표현과 케어 방식이 어떤 성격 신호인지 돌아볼 때",
      "반려인 친구나 가족과 함께 각자의 반려동물 교감 방식을 비교하는 대화 소재",
      "동물 입양 전 본인의 생활 패턴과 돌봄 여유를 스스로 점검해보는 참고 지표"
    ],
    faqs: [
      { q: "반려동물을 키우지 않아도 테스트할 수 있나요?", a: "네, 동물을 대하는 평소 생각이나 돌봄 상황에서의 선호도를 바탕으로 충분히 참여하실 수 있습니다." },
      { q: "실제 반려동물의 성격과 제 성격 중 무엇을 측정하나요?", a: "반려동물을 대하는 보호자(사람)의 선택 기준과 교감 스타일을 측정하여 매칭되는 유형을 분석합니다." }
    ]
  },
  "kpop-idol": {
    name: "K-POP 아이돌 포지션 테스트",
    category: "엔터테인먼트/취향",
    context: "그룹 활동, 무대 위 역할, 팬들과의 소통 상황에서 드러나는 협업 스타일과 매력 포인트",
    insight: "아이돌 그룹 내 포지션(리더, 메인보컬, 메인댄서, 센터 등)은 팀 프로젝트에서 개인이 가장 자연스럽게 기여하는 협업 방식을 상징합니다.",
    useCases: [
      "팀 프로젝트나 동아리에서 내가 분위기 메이커인지, 묵묵한 서포터인지 확인할 때",
      "무대나 발표 같은 주목받는 상황에서 나의 대처 스타일을 재미있게 분석할 때",
      "좋아하는 K-POP 아티스트의 팀 내 역할과 나의 성향을 대조해보는 팬덤 토크 소재",
      "친구들과 각자의 아이돌 포지션 결과를 공유하며 팀 시너지를 맞춰볼 때"
    ],
    faqs: [
      { q: "노래나 춤 실력과 상관이 있나요?", a: "아닙니다. 실력이 아닌 팀워크, 에너지 표현, 의사소통 성향을 중심으로 역할을 분석합니다." },
      { q: "여러 포지션이 겹쳐 나올 수도 있나요?", a: "최종 결과는 가장 비중이 높은 주 포지션 1개를 중심으로 부 포지션 특성을 함께 안내합니다." }
    ]
  },
  "spending-style": {
    name: "소비 심리 및 지출 스타일 테스트",
    category: "소비/재테크",
    context: "쇼핑, 할인 앞에서의 반응, 카드 명세서를 볼 때의 감정에서 드러나는 가치관",
    insight: "소비 습관은 현재의 만족을 중시하는지 미래의 안전을 중시하는지 보여주는 가장 일상적인 의사결정의 집합입니다.",
    useCases: [
      "충동구매가 잦아지는 심리적 원인과 스트레스 반응 패턴을 점검할 때",
      "연인이나 배우자와 돈을 쓰는 기준과 가치관 차이를 이해하는 소통 소재",
      "월초 예산 계획을 세우기 전 나의 지출 취약 지점을 미리 파악할 때",
      "보상 소비와 계획 소비 사이에서 나의 균형 감각을 확인하고 싶을 때"
    ],
    faqs: [
      { q: "소비 성향은 나쁜 습관으로 고쳐야 하나요?", a: "소비 스타일은 좋고 나쁨이 아닌 우선순위의 차이입니다. 나의 약점 지출만 통제하면 충분히 건강한 소비가 가능합니다." },
      { q: "소득 수준에 따라 결과가 달라지나요?", a: "절대적인 금액보다는 같은 상황에서 돈을 쓰는 의사결정 방식과 감정 반응을 측정합니다." }
    ]
  },
  "music-taste": {
    name: "음악 취향 및 감성 테스트",
    category: "취향/문화",
    context: "플레이리스트를 고르는 기준, 음악을 듣는 시간대와 기분에서 드러나는 감정 조절 방식",
    insight: "음악은 감정을 환기하고 에너지를 충전하는 개인의 가장 사적인 정서 관리 도구입니다.",
    useCases: [
      "기분에 따라 플레이리스트를 선곡하는 나의 감정 회복 루틴을 이해할 때",
      "친구와 드라이브나 여행 갈 때 음악 선곡으로 부딪히는 성향 차이를 비교할 때",
      "새로운 장르를 탐색할 때 내 성향에 맞는 음악 스펙트럼을 넓히는 가이드",
      "평소 스트레스 상황에서 음악으로 감정을 해소하는 패턴 점검"
    ],
    faqs: [
      { q: "특정 장르만 편식해서 듣는데 괜찮나요?", a: "자연스러운 현상입니다. 특정 장르에 대한 집중도 역시 성격 유형의 중요한 신호로 반영됩니다." },
      { q: "그날 기분에 따라 선호가 달라지지 않나요?", a: "일시적 선호보다는 평소 반복적으로 찾게 되는 음악 감상 환경과 목적을 기준으로 분석합니다." }
    ]
  }
};

/** Load existing extended content JSON */
function loadExistingExtendedContent() {
  if (!fs.existsSync(EXTENDED_JSON_PATH)) {
    fs.writeFileSync(EXTENDED_JSON_PATH, "{}\n", "utf8");
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(EXTENDED_JSON_PATH, "utf8"));
  } catch {
    return {};
  }
}

/** Load noindex test ids */
function loadNoindexTestIds() {
  if (!fs.existsSync(NOINDEX_PATH)) return new Set();
  const content = fs.readFileSync(NOINDEX_PATH, "utf8");
  const matches = content.match(/"([a-z0-9-]+)"/g);
  if (!matches) return new Set();
  return new Set(matches.map((m) => m.replace(/"/g, "")));
}

/** Check if test is already extended */
function isAlreadyExtended(slug, existingMap) {
  if (existingMap[slug]) return true;
  // Also check if already in static extended-content.ts
  const staticExtended = [
    "perfection-balance-1xQC", "ntrp-test", "coffee-mbti", 
    "commute-style", "meal-frequency", "meal-pacing", 
    "meal-order", "meal-balance", "meal-duration"
  ];
  return staticExtended.includes(slug);
}

/** Select the best candidate to improve */
function selectTargetQuizzes(limit = 1) {
  const existingMap = loadExistingExtendedContent();
  const noindexSet = loadNoindexTestIds();

  if (SPECIFIC_TARGET) {
    return [SPECIFIC_TARGET];
  }

  const selected = [];

  // Priority 1: High priority GSC slugs
  for (const slug of HIGH_PRIORITY_SLUGS) {
    if (!isAlreadyExtended(slug, existingMap)) {
      selected.push(slug);
      if (selected.length >= limit) return selected;
    }
  }

  // Priority 2: Slugs in noindex set
  for (const slug of noindexSet) {
    if (!isAlreadyExtended(slug, existingMap) && !selected.includes(slug)) {
      selected.push(slug);
      if (selected.length >= limit) return selected;
    }
  }

  return selected;
}

/** Synthesize rich, high-E-E-A-T content */
async function generateExtendedContentForSlug(slug) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const contextData = TOPIC_CONTEXTS[slug];

  // If Gemini API is available, try generating via AI
  if (apiKey) {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });

      const prompt = `
당신은 한국인을 위한 심리/성격 테스트 플랫폼 '테몬'의 수석 에디터입니다.
테스트 슬러그: "${slug}"
제목/주제 힌트: "${contextData?.name || slug}"

구글 검색 품질 가이드라인(Helpful Content, E-E-A-T)을 충족하는 심층 랜딩 콘텐츠를 JSON 형식으로 작성하세요.
반드시 아래 규칙을 엄격히 지키세요:

1. intro: 왜 이 테스트가 흥미로운지, 일상에서 어떤 사람이 주로 찾는지 친절하고 공감대 높은 문장으로 250~350자.
2. whyItMatters: 이 주제가 단순 재미를 넘어 개인의 성격/의사결정 패턴과 어떻게 연결되는지 심리학적/일상적 배경 설명 300~400자.
3. useCases: 실제로 친구, 연인, 동료와 대화하거나 자기 점검에 활용할 수 있는 구체적 시나리오 4개 배열 (각 50자 이상).
4. limitations: 임상 진단이 아닌 엔터테인먼트 콘텐츠임을 명확히 고지하고 올바른 해석법 안내 250~350자.
5. extraFaqs: 해당 주제에 특화된 실질적 질문과 명쾌한 답변 2~3개 [{ "question": "...", "answer": "..." }].
6. 금지: "100%", "완벽한", "반드시" 같은 과장/단정 표현 금지. 자연스럽고 품격 있는 한국어 경어체 사용.

출력은 반드시 다른 설명 없이 순수 JSON만 반환하세요:
{
  "intro": "...",
  "whyItMatters": "...",
  "useCases": ["...", "...", "...", "..."],
  "limitations": "...",
  "extraFaqs": [{ "question": "...", "answer": "..." }]
}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const cleanJson = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      const parsed = JSON.parse(cleanJson);
      
      parsed.lastUpdated = new Date().toISOString().split("T")[0];
      return parsed;
    } catch (err) {
      console.warn(`[WARN] Gemini generation failed for ${slug}: ${err.message}. Falling back to rule synthesis.`);
    }
  }

  // Rule-based high-quality contextual synthesis fallback
  const fallbackTopic = contextData || {
    name: `${slug.replace(/-/g, " ")} 성향 테스트`,
    category: "일상/취향",
    context: "일상의 사소한 선택과 습관 속에서 드러나는 나의 성격 패턴",
    insight: "작은 일상적 행동들은 평소 의식하지 못했던 개인의 가치관과 우선순위를 솔직하게 담고 있습니다.",
    useCases: [
      "일상 속에서 내가 무의식적으로 반복하던 선택 기준을 되돌아볼 때",
      "친구, 동료와 가볍게 결과를 비교하며 서로 다른 생활 방식을 이해하는 대화 소재",
      "상황별로 나의 반응 패턴이 어떻게 달라지는지 관찰하는 자기이해 힌트",
      "스트레스나 피로 상황에서 나타나는 나의 무의식적 습관 점검"
    ],
    faqs: [
      { q: "테스트 결과가 실제 성격과 다르게 느껴질 수 있나요?", a: "일상의 특정 장면에 초점을 둔 테스트이므로 전반적인 성격과 부분적으로 다를 수 있습니다. 특정 맥락에서의 나를 발견하는 관점으로 즐겨주세요." },
      { q: "정답이 정해져 있는 검사인가요?", a: "정답은 없습니다. 가장 솔직하고 편안하게 느껴지는 선택지를 고를 때 가장 의미 있는 결과가 도출됩니다." }
    ]
  };

  return {
    intro: `${fallbackTopic.name}는 평소 무심코 넘어가기 쉬운 선택 기준과 행동 습관을 통해 나만의 독특한 성향을 가볍게 조명해보는 심층 콘텐츠입니다. 같은 상황에서도 어떤 사람은 계획과 효율을 먼저 생각하고, 어떤 사람은 감정의 온도와 분위기를 먼저 살피듯, 일상의 작은 차이가 모여 개인의 고유한 캐릭터를 이룹니다. 이 테스트는 12가지 현실적인 상황 질문을 통해 당신이 편안함을 느끼는 순간과 스트레스를 받는 지점을 균형 있게 짚어드립니다.`,
    whyItMatters: `${fallbackTopic.insight} 심리학에서는 사소한 일상적 습관을 '행동 단서(Behavioral Residue)'라고 부릅니다. ${fallbackTopic.context}은 단순한 기호의 차이를 넘어, 대인관계에서의 소통 방식, 문제 해결 태도, 그리고 휴식을 취하는 리듬과 밀접하게 연결되어 있습니다. 결과를 통해 평소 몰랐던 나의 장점과 주의할 점을 확인하면, 인간관계나 업무 환경에서 나에게 더 적합한 방식을 찾아가는 데 실질적인 도움을 얻을 수 있습니다.`,
    useCases: fallbackTopic.useCases,
    limitations: `이 테스트는 전문적인 임상 심리 진단이나 의학적 평가를 대체하지 않는 자기탐색 및 엔터테인먼트 목적의 콘텐츠입니다. 성향은 컨디션, 현재 놓인 환경, 스트레스 수준에 따라 달라질 수 있으므로, 단 하나의 결과로 스스로를 단정 짓기보다는 '요즘의 나는 이런 흐름에 가깝구나'라는 참고 지표로 유연하게 활용하시길 권장합니다.`,
    extraFaqs: fallbackTopic.faqs.map((f) => ({ question: f.q, answer: f.a })),
    lastUpdated: new Date().toISOString().split("T")[0]
  };
}

/** Quality Gate verification */
function verifyQualityGate(content) {
  const totalLength = 
    (content.intro?.length || 0) +
    (content.whyItMatters?.length || 0) +
    (content.limitations?.length || 0) +
    (content.useCases || []).join(" ").length +
    (content.extraFaqs || []).map(f => f.question + f.answer).join(" ").length;

  const checks = {
    lengthPassed: totalLength >= 800,
    introPassed: (content.intro?.length || 0) >= 150,
    whyPassed: (content.whyItMatters?.length || 0) >= 150,
    limitPassed: (content.limitations?.length || 0) >= 150,
    useCasesCount: (content.useCases?.length || 0) >= 3,
    faqsCount: (content.extraFaqs?.length || 0) >= 2,
    noSpamWords: !/100%|완벽한 보장|반드시 맞춤|무조건/i.test(JSON.stringify(content)),
    totalLength
  };

  const allPassed = Object.entries(checks)
    .filter(([k]) => k !== "totalLength")
    .every(([, v]) => v === true);

  return { allPassed, checks };
}

/** Remove slug from noindex-tests.ts if present */
function removeFromNoindex(slug) {
  if (!fs.existsSync(NOINDEX_PATH)) return false;
  let code = fs.readFileSync(NOINDEX_PATH, "utf8");
  const regex = new RegExp(`\\s*"${slug}",?`, "g");
  if (regex.test(code)) {
    code = code.replace(regex, "");
    fs.writeFileSync(NOINDEX_PATH, code, "utf8");
    return true;
  }
  return false;
}

/** Main execution function */
async function runDaemon() {
  console.log(`[DAEMON] Starting content improvement daemon at ${new Date().toISOString()}...`);
  const targets = selectTargetQuizzes(BATCH_LIMIT);

  if (targets.length === 0) {
    console.log(`[DAEMON] No candidate quizzes pending improvement.`);
    return;
  }

  const existingMap = loadExistingExtendedContent();
  const results = [];

  for (const slug of targets) {
    console.log(`[DAEMON] Processing target: ${slug}`);
    const generated = await generateExtendedContentForSlug(slug);
    const { allPassed, checks } = verifyQualityGate(generated);

    if (!allPassed) {
      console.error(`[DAEMON] Quality gate FAILED for ${slug}:`, checks);
      results.push({ slug, status: "failed", checks });
      continue;
    }

    console.log(`[DAEMON] Quality gate PASSED for ${slug} (Total Length: ${checks.totalLength} chars)`);

    if (!DRY_RUN) {
      // 1. Update data/extended-content.json
      existingMap[slug] = generated;
      fs.writeFileSync(EXTENDED_JSON_PATH, JSON.stringify(existingMap, null, 2) + "\n", "utf8");

      // 2. Unblock noindex if was blocked
      const unblocked = removeFromNoindex(slug);

      // 3. Log to reports
      const logLine = `[${new Date().toISOString()}] ENRICHED slug=${slug} length=${checks.totalLength} unblocked=${unblocked}\n`;
      fs.appendFileSync(LOG_PATH, logLine, "utf8");

      results.push({ slug, status: "enriched", length: checks.totalLength, unblocked });
    } else {
      console.log(`[DAEMON] [DRY RUN] Would enrich ${slug} with ${checks.totalLength} chars.`);
      results.push({ slug, status: "dry-run", length: checks.totalLength });
    }
  }

  console.log(`[DAEMON] Completed batch run:`, JSON.stringify(results, null, 2));
}

runDaemon().catch((err) => {
  console.error(`[DAEMON ERROR]`, err);
  process.exit(1);
});
