// T10 회귀 테스트: 코드 레벨로 확인 가능한 접근성/성능 계측 안전장치.
// 실제 브라우저 캡처, 키보드 조작 실측, CrUX/Lighthouse 측정값은 이 테스트의
// 범위 밖이며 별도로 MANUAL_REQUIRED로 보고한다 (도구 제약).
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

// 1) NTRP 질문 화면이 질문 전환을 스크린리더에 알려야 한다 (aria-live).
{
  const source = fs.readFileSync(path.join(root, "app/tests/ntrp-test/test/page.tsx"), "utf8");
  assert.ok(/aria-live="polite"/.test(source), "question page must announce question changes via aria-live");
  assert.ok(/sr-only/.test(source), "the aria-live announcement should be visually hidden, not duplicate visible text");
}

// 2) CSP 헤더의 광범위한 https:/unsafe-eval/unsafe-inline을 이번 패스에서 임의로 제거하지
// 않았어야 한다 (스펙이 삭제를 금지하고 Report-Only 검증 먼저 요구함).
{
  const source = fs.readFileSync(path.join(root, "proxy.ts"), "utf8");
  assert.ok(/Content-Security-Policy/.test(source), "CSP header must still be set");
  assert.ok(/unsafe-inline/.test(source) && /unsafe-eval/.test(source), "CSP directives must not be silently tightened without a Report-Only verification pass first");
}

// 3) Core Web Vitals 수집이 동의 게이트를 거쳐야 한다 (수집 자체가 동의 정책을 우회하지 않는지).
{
  const source = fs.readFileSync(path.join(root, "components/web-vitals.tsx"), "utf8");
  assert.ok(/isAnalyticsAllowed/.test(source), "web vitals reporting must check analytics consent before sending");
}

// 4) 보안 헤더(X-Content-Type-Options, X-Frame-Options 등)가 여전히 설정되어 있어야 한다.
{
  const source = fs.readFileSync(path.join(root, "proxy.ts"), "utf8");
  for (const header of ["X-Content-Type-Options", "X-Frame-Options", "Strict-Transport-Security"]) {
    assert.ok(source.includes(header), `${header} security header must remain set`);
  }
}

console.log("PASS a11y-perf-security-baseline: aria-live added for NTRP question flow, CSP/security headers untouched, web-vitals respects consent");
console.log("MANUAL_REQUIRED: real browser viewport capture (320/390/768/1440px), keyboard-only walkthrough, CrUX/Lighthouse p75 measurement were not performed (no browser automation tool available in this session).");
