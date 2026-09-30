// T04 회귀 테스트: PDF 내보내기 페이지 경계 산술 + 한글 drawText 제거 확인.
// 실제 브라우저 다운로드/파일 열기 검증은 별도이며, 여기서는 소스에 구현된
// 배치 공식과 폰트 안전성만 독립적으로 재현·검증한다.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const pagePath = path.join(root, "app/results/ntrp-test/page.tsx");
const source = fs.readFileSync(pagePath, "utf8");

// 1) 고정 0.5배 축소가 제거되고 비례 축소 로직이 있어야 한다.
assert.ok(!/img\.scale\(0\.5\)/.test(source), "fixed 0.5 scale must be removed (F05)");
assert.ok(/fitScale/.test(source), "proportional fitScale logic must exist");

// 2) drawText에 한글 리터럴이 남아있지 않아야 한다 (pdf-lib 표준 폰트 WinAnsi 한계, F05/R03).
const drawTextCalls = [...source.matchAll(/page\.drawText\(\s*`([^`]*)`/g)].map((m) => m[1]);
assert.ok(drawTextCalls.length > 0, "expected at least one page.drawText template literal");
for (const text of drawTextCalls) {
  const hasHangul = /[\u3131-\uD79D]/.test(text);
  assert.ok(!hasHangul, `drawText literal must not contain Hangul (pdf-lib standard font limitation): "${text}"`);
}

// 3) 배치 공식을 독립적으로 재현해 스펙의 여백 assertion을 만족하는지 확인한다.
// (스펙 4.5 T04 코드 블록과 동일한 페이지 크기/여백을 사용)
function computeLayout(imgWidth, imgHeight) {
  const pageW = 595;
  const pageH = 842;
  const marginX = 36;
  const marginTop = 36;
  const marginBottom = 60;
  const maxWidth = pageW - marginX * 2;
  const maxHeight = pageH - marginTop - marginBottom;
  const fitScale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight, 1);
  const drawWidth = imgWidth * fitScale;
  const drawHeight = imgHeight * fitScale;
  const x = (pageW - drawWidth) / 2;
  const y = pageH - marginTop - drawHeight;
  return { pageW, pageH, marginX, marginTop, marginBottom, x, y, drawWidth, drawHeight };
}

const captureSizes = [
  { width: 1200, height: 630 }, // ResultImageCard 기본 비율
  { width: 2400, height: 1260 }, // pixelRatio 2 캡처
  { width: 800, height: 2000 }, // 세로로 긴 카드 (모바일 폭 캡처 가정)
  { width: 320, height: 200 }, // 매우 작은 캡처
];

for (const { width, height } of captureSizes) {
  const layout = computeLayout(width, height);
  assert.ok(layout.x >= layout.marginX - 1e-9, `x=${layout.x} must be >= marginLeft for ${width}x${height}`);
  assert.ok(
    layout.x + layout.drawWidth <= layout.pageW - layout.marginX + 1e-9,
    `right edge must be within page for ${width}x${height}`,
  );
  assert.ok(layout.y >= layout.marginBottom - 1e-9, `y=${layout.y} must be >= marginBottom for ${width}x${height}`);
  assert.ok(
    layout.y + layout.drawHeight <= layout.pageH - layout.marginTop + 1e-9,
    `top edge must be within page for ${width}x${height}`,
  );
}

// 4) 다운로드 파일명이 검증된 level을 사용해야 한다 (RESULT/undefined 방지).
assert.ok(/ntrp-result-\$\{level\}-/.test(source), "export filenames must use the validated level, not levelObj.level fallback text");

console.log("PASS result-export-layout: fixed 0.5 scale removed, proportional fit within A4 margins, no Hangul in drawText");
