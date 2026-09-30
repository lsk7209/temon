// T08 회귀 테스트: 홈 FAQ 정합성, 카드 내 버튼 중첩 제거, 미검증 별점 표시 제거.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith("@/")) request = path.join(root, request.slice(2));
  return resolveFilename.call(this, request, parent, ...rest);
};
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(
    ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
      fileName: filename,
    }).outputText,
    filename,
  );
};
require.extensions[".tsx"] = require.extensions[".ts"];

const { getHomeFAQs } = require(path.join(root, "lib/quiz-seo-utils.ts"));

// 1) getHomeFAQs()가 실제로 존재하고 비어있지 않아야 한다.
const faqs = getHomeFAQs();
assert.ok(Array.isArray(faqs) && faqs.length > 0, "getHomeFAQs must return a non-empty array");
for (const item of faqs) {
  assert.ok(typeof item.question === "string" && item.question.length > 0);
  assert.ok(typeof item.answer === "string" && item.answer.length > 0);
}

// 2) app/page.tsx(JSON-LD)와 app/home-client.tsx(화면)가 모두 getHomeFAQs()를 단일 소스로 사용해야 한다.
{
  const pageSource = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
  assert.ok(/getHomeFAQs\(\)/.test(pageSource), "app/page.tsx must call getHomeFAQs()");
  assert.ok(!/const homeFaqs = \[/.test(pageSource), "app/page.tsx must not redefine its own local FAQ array");

  const clientSource = fs.readFileSync(path.join(root, "app/home-client.tsx"), "utf8");
  assert.ok(/getHomeFAQs\(\)/.test(clientSource), "app/home-client.tsx must call getHomeFAQs()");
  assert.ok(!/const faqs = \[/.test(clientSource), "app/home-client.tsx must not redefine its own local FAQ array");
}

// 3) 홈 카드에서 test.rating을 화면에 표시하지 않아야 한다 (근거 없는 별점, F11).
// tests-config.ts는 이 필드를 "editorial placeholder metrics"로 명시하고 있고
// DB에 rating/review 집계 컬럼이 없으므로 실제 평점이 아니다.
{
  const clientSource = fs.readFileSync(path.join(root, "app/home-client.tsx"), "utf8");
  assert.ok(!/\{test\.rating\}/.test(clientSource), "home-client.tsx must not render unverified test.rating");
  assert.ok(!/Star,/.test(clientSource.split("\n").slice(0, 15).join("\n")), "Star icon import should be removed if rating display is removed");
}

// 4) 홈 카드 안에서 <Link>가 <Button>을 중첩하지 않아야 한다 (링크 안 버튼 중첩, F12).
// 카드 전체가 이미 하나의 Link이므로 내부에는 상호작용 요소(button) 대신 장식용 span만 있어야 한다.
{
  const clientSource = fs.readFileSync(path.join(root, "app/home-client.tsx"), "utf8");
  // "시작하기" CTA는 button이 아닌 span(aria-hidden)이어야 한다.
  const startButtonMatch = clientSource.match(/시작하기\s*<\/(span|Button)>/);
  assert.ok(startButtonMatch, "expected to find the '시작하기' CTA element");
  assert.equal(startButtonMatch[1], "span", "'시작하기' CTA inside a card Link must be a non-interactive span, not a nested Button");
}

console.log("PASS home-content-contract: FAQ single source (screen==JSON-LD), no unverified rating, no button-in-link nesting");
