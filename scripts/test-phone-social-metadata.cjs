const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(
  path.resolve(__dirname, "../app/tests/phone-social-media/page.tsx"),
  "utf8",
);

assert.doesNotMatch(source, /phone social media/i, "English placeholder must be removed");
assert.doesNotMatch(source, /[\d,]+명 참여/, "unsourced participant count must be removed");
assert.match(source, /회원가입 없이 참여/, "truthful participation copy is required");
assert.match(source, /const quizTitle = "SNS 사용 습관 테스트"/, "one Korean title source is required");
assert.match(source, /title: quizTitle/g, "metadata and schema must share the Korean title");
assert.match(source, /getTopicQuizFAQs\(quizTitle\)/, "FAQ topic must use the Korean title");
assert.match(source, /AnswerEngineSection quizTitle=\{quizTitle\}/, "answer section must use the Korean title");
assert.match(source, /LandingConversionSection quizTitle=\{quizTitle\}/, "conversion section must use the Korean title");
assert.match(source, /<FAQSection faqs=\{faqs\} title=\{`\$\{quizTitle\} 자주 묻는 질문`\}/, "FAQ heading must use the Korean title");

console.log("phone social metadata contract: PASS");
