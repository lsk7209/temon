const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const expected = {
  "alarm-habit": "알람 습관 MBTI 테스트",
  "kdrama-mbti": "K-드라마 클리셰 테스트",
  "kpop-idol": "아이돌 포지션 테스트",
  "pet-mbti": "반려동물 MBTI 테스트",
  "phone-usage": "스마트폰 사용 스타일 테스트",
  "ramen-mbti": "라면 테스트",
  "snowwhite-mbti": "백설공주 에겐테토 테스트",
  "study-mbti": "공부 MBTI 테스트",
};

const englishPlaceholders = [
  "Alarm Habit Test",
  "Kdrama Mbti Test",
  "Kpop Idol Test",
  "Pet Mbti Test",
  "Phone Usage Style Test",
  "Phone Usage Test",
  "Ramen MBTI",
  "Snowwhite Mbti Test",
  "Study Mbti Test",
];

for (const [slug, koreanTitle] of Object.entries(expected)) {
  const source = fs.readFileSync(
    path.resolve(__dirname, `../app/tests/${slug}/page.tsx`),
    "utf8",
  );
  for (const englishTitle of englishPlaceholders) {
    assert.doesNotMatch(
      source,
      new RegExp(`<(?:AnswerEngineSection|LandingConversionSection) quizTitle="${englishTitle}"`),
      `${slug} English support title: ${englishTitle}`,
    );
  }
  for (const component of ["AnswerEngineSection", "LandingConversionSection"]) {
    assert.match(
      source,
      new RegExp(`<${component} quizTitle="${koreanTitle}"`),
      `${slug} ${component} Korean title`,
    );
  }
}

const boostSource = fs.readFileSync(
  path.resolve(__dirname, "../components/gsc-auto-landing-boost.tsx"),
  "utf8",
);
assert.match(boostSource, /pet:\s*"반려동물"/, "pet fallback label");
assert.match(boostSource, /study:\s*"공부"/, "study fallback label");
assert.match(boostSource, /mbti:\s*"MBTI"/, "MBTI fallback label");

const petSource = fs.readFileSync(
  path.resolve(__dirname, "../app/tests/pet-mbti/page.tsx"),
  "utf8",
);
assert.doesNotMatch(petSource, /NEW 테스트/, "unsupported NEW badge");

console.log(`intro placeholder Korean contract: PASS (${Object.keys(expected).length}/8)`);
