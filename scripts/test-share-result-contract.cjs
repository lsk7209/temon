// T02 회귀 테스트: 공유 URL 일관성, 공통 자동 장식 제외, NTRP 결과 메타데이터.
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

const { parseNtrpResult, buildNtrpResultUrl } = require(path.join(root, "lib/ntrp-result.ts"));

// 1) 같은 결과를 가리키는 값이면 buildNtrpResultUrl과 결과 화면의 parser가 서로
// 일치해야 한다: 공유한 링크를 새 컨텍스트에서 열어도 같은 레벨을 유지한다.
for (const level of ["1.5", "2.0", "3.5", "5.0"]) {
  const url = buildNtrpResultUrl(level, "https://temon.kr");
  const parsedUrl = new URL(url);
  assert.equal(parsedUrl.pathname, "/results/ntrp-test");
  const parsed = parseNtrpResult(parsedUrl.searchParams);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.level, level, `round trip for ${level} failed: got ${parsed.level}`);
}

// 2) 공유 URL에 불필요한 매개변수(개인정보·원본 답변)가 없어야 한다.
{
  const url = new URL(buildNtrpResultUrl("3.5", "https://temon.kr"));
  const keys = [...url.searchParams.keys()].sort();
  assert.deepEqual(keys, ["level", "v"]);
}

// 3) ResultRouteAutoEnhancements가 ntrp-test를 skip 목록에 포함해야 한다 (F03).
{
  const source = fs.readFileSync(path.join(root, "components/result-route-auto-enhancements.tsx"), "utf8");
  const match = source.match(/AUTO_ENHANCEMENT_SKIP_SLUGS\s*=\s*\[([^\]]+)\]/);
  assert.ok(match, "AUTO_ENHANCEMENT_SKIP_SLUGS array not found");
  const slugs = match[1].match(/"([^"]+)"/g).map((s) => s.replace(/"/g, ""));
  assert.ok(slugs.includes("ntrp-test"), "ntrp-test must be excluded from common auto-enhancement (F03)");
}

// 4) NTRP 결과에 전용 layout.tsx metadata가 있어야 한다 (F06: 홈 canonical/OG 상속 방지).
{
  const layoutPath = path.join(root, "app/results/ntrp-test/layout.tsx");
  assert.ok(fs.existsSync(layoutPath), "app/results/ntrp-test/layout.tsx must exist");
  const { metadata } = require(layoutPath);
  assert.ok(metadata, "layout must export metadata");
  assert.ok(!/^MBTI 테스트 - 무료 성격 테스트 모음/.test(String(metadata.title)), "title must not be the home page title");
  assert.equal(metadata.alternates.canonical, "/results/ntrp-test");
  assert.notEqual(metadata.alternates.canonical, "/"); // 홈 canonical 상속 방지 (F06)
  assert.equal(metadata.robots.index, false); // noindex 유지
  assert.equal(metadata.robots.follow, true);
  assert.ok(metadata.openGraph.title.includes("NTRP"), "OG title must describe NTRP, not the home page");
}

// 5) ShareButtons가 shareUrl prop을 지원하고, 지정 시 createShareLink()로 덮어쓰지 않아야 한다.
{
  const source = fs.readFileSync(path.join(root, "components/share-buttons.tsx"), "utf8");
  assert.ok(/shareUrl\?:\s*string/.test(source), "ShareButtons must declare optional shareUrl prop");
  assert.ok(/shareUrlProp\s*\?\?\s*createShareLink/.test(source), "shareUrl prop must take precedence over createShareLink()");
}

// 6) NTRP 결과 페이지가 ShareButtons에 검증된 shareUrl을 전달해야 한다 (공유 계약 일치).
{
  const source = fs.readFileSync(path.join(root, "app/results/ntrp-test/page.tsx"), "utf8");
  assert.ok(/<ShareButtons[\s\S]*?shareUrl=\{/.test(source), "NTRP result page must pass shareUrl to ShareButtons");
  assert.ok(/buildNtrpResultUrl\(/.test(source), "NTRP result page must use buildNtrpResultUrl for its own links");
}

console.log("PASS share-result-contract: URL round trip, no PII params, auto-enhancement skip, NTRP-specific metadata");
