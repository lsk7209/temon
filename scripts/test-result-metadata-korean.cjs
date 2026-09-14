const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const expected = {
  "alarm-habit": {
    quizTitle: "알람 습관 MBTI 테스트",
    title: "아침 알람 습관",
    canonical: "/results/alarm-habit",
  },
  "kdrama-mbti": {
    quizTitle: "K-드라마 클리셰 테스트",
    title: "K-드라마 캐릭터",
    canonical: "/results/kdrama-mbti",
  },
  "kpop-idol": {
    quizTitle: "아이돌 포지션 테스트",
    title: "K-팝 아이돌 포지션",
    canonical: "/results/kpop-idol",
  },
  "pet-mbti": {
    quizTitle: "반려동물 MBTI 테스트",
    title: "나와 잘 맞는 반려동물 추천",
    canonical: "/results/pet-mbti",
  },
  "phone-usage": {
    quizTitle: "스마트폰 사용 스타일 테스트",
    title: "스마트폰 사용 습관과 관리 팁",
    canonical: "/results/phone-usage",
  },
  "ramen-mbti": {
    quizTitle: "라면 테스트",
    title: "라면 취향과 성격 유형",
    canonical: "/results/ramen-mbti",
  },
  "snowwhite-mbti": {
    quizTitle: "백설공주 에겐테토 테스트",
    title: "나와 닮은 동화 캐릭터",
    canonical: "/results/snowwhite-mbti",
  },
  "study-mbti": {
    quizTitle: "공부 MBTI 테스트",
    title: "공부 스타일과 추천 공부법",
    canonical: "/results/study-mbti",
  },
};

for (const [slug, contract] of Object.entries(expected)) {
  const source = fs.readFileSync(
    path.resolve(__dirname, `../app/results/${slug}/layout.tsx`),
    "utf8",
  );
  assert.match(source, new RegExp(`quizTitle: "${contract.quizTitle}"`), `${slug} quizTitle`);
  assert.match(source, new RegExp(`title: "${contract.title}"`), `${slug} title`);
  assert.match(source, /description:\s*\n?\s*"[^"\n]*[가-힣][^"\n]*"/, `${slug} Korean description`);
  assert.match(source, new RegExp(`canonical: "${contract.canonical}"`), `${slug} canonical`);
  assert.match(source, /generateGenericResultMetadata/, `${slug} metadata helper`);
}

console.log(`result metadata Korean contract: PASS (${Object.keys(expected).length}/8)`);
