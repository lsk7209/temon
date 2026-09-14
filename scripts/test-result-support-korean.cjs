const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const helperPath = path.resolve(__dirname, "../lib/quiz-topic-copy.ts");
const helperSource = fs.readFileSync(helperPath, "utf8");
const compiled = ts.transpileModule(helperSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const moduleBox = { exports: {} };
vm.runInNewContext(compiled, {
  module: moduleBox,
  exports: moduleBox.exports,
  require,
});

const { getTopicResultFAQs, getTopicResultUseCases } = moduleBox.exports;
const cases = {
  "alarm-habit": ["Alarm Habit Test", "알람 습관 MBTI 테스트"],
  "kdrama-mbti": ["K-Drama MBTI Test", "K-드라마 클리셰 테스트"],
  "kpop-idol": ["K-Pop Idol Test", "아이돌 포지션 테스트"],
  "pet-mbti": ["Pet MBTI Test", "반려동물 MBTI 테스트"],
  "phone-usage": ["Phone Usage Style Test", "스마트폰 사용 스타일 테스트"],
  "ramen-mbti": ["Ramen MBTI Test", "라면 테스트"],
  "snowwhite-mbti": ["Snow White MBTI Test", "백설공주 에겐테토 테스트"],
  "study-mbti": ["Study MBTI Test", "공부 MBTI 테스트"],
};

for (const [slug, [englishTitle, koreanTitle]] of Object.entries(cases)) {
  const pagePath = path.resolve(__dirname, `../app/results/${slug}/page.tsx`);
  const source = fs.readFileSync(pagePath, "utf8");
  assert.doesNotMatch(source, new RegExp(`getTopicResultFAQs\\(\"${englishTitle}`), `${slug} FAQ title`);
  assert.doesNotMatch(source, new RegExp(`getTopicResultUseCases\\(\"${englishTitle}`), `${slug} use-case title`);
  assert.doesNotMatch(source, new RegExp(`quizTitle=\"${englishTitle}`), `${slug} schema title`);
  assert.match(source, new RegExp(`getTopicResultFAQs\\(\"${koreanTitle}`), `${slug} Korean FAQ title`);
  assert.match(source, new RegExp(`getTopicResultUseCases\\(\"${koreanTitle}`), `${slug} Korean use-case title`);
  assert.match(source, new RegExp(`quizTitle=\"${koreanTitle}`), `${slug} Korean schema title`);

  const englishFaqs = JSON.parse(JSON.stringify(getTopicResultFAQs(englishTitle, "테스트 결과")))
    .map((item) => ({ ...item, question: item.question.replace(englishTitle, koreanTitle) }));
  const koreanFaqs = JSON.parse(JSON.stringify(getTopicResultFAQs(koreanTitle, "테스트 결과")));
  assert.deepEqual(koreanFaqs, englishFaqs, `${slug} FAQ branch equivalence`);
  assert.deepEqual(
    JSON.parse(JSON.stringify(getTopicResultUseCases(koreanTitle, "테스트 결과"))),
    JSON.parse(JSON.stringify(getTopicResultUseCases(englishTitle, "테스트 결과"))),
    `${slug} use-case branch equivalence`,
  );
}

for (const slug of ["kdrama-mbti", "kpop-idol"]) {
  const source = fs.readFileSync(path.resolve(__dirname, `../app/results/${slug}/page.tsx`), "utf8");
  assert.doesNotMatch(source, />Interpretation Notes</, `${slug} English visible heading`);
  assert.match(source, />해석 참고사항</, `${slug} Korean visible heading`);
}

const visibleCopyContracts = {
  "kdrama-mbti": ["works best as a pattern explanation", "패턴을 설명하는 도구로 볼 때"],
  "kpop-idol": ["is less about fantasy casting", "가상의 배역을 정하는 결과라기보다"],
  "phone-usage": ["The fastest way to use this result", "이 결과를 가장 빠르게 활용하려면"],
};

for (const [slug, [englishText, koreanText]] of Object.entries(visibleCopyContracts)) {
  const source = fs.readFileSync(path.resolve(__dirname, `../app/results/${slug}/page.tsx`), "utf8");
  assert.doesNotMatch(source, new RegExp(englishText), `${slug} English support paragraph`);
  assert.match(source, new RegExp(koreanText), `${slug} Korean support paragraph`);
}

console.log(`result support Korean contract: PASS (${Object.keys(cases).length}/8)`);
