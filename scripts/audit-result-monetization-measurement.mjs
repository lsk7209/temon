import { readFile } from "node:fs/promises";

const [analytics, page, tracker] = await Promise.all([
  readFile(new URL("../lib/analytics.ts", import.meta.url), "utf8"),
  readFile(
    new URL("../components/redesign/redesigned-result-page.tsx", import.meta.url),
    "utf8",
  ),
  readFile(
    new URL("../components/redesign/result-engagement-tracker.tsx", import.meta.url),
    "utf8",
  ),
]);

const checks = [
  [
    "result views wait for GA4 readiness",
    /export function trackResultView[\s\S]*?runWhenGtagReady\(\(\) =>/m.test(analytics),
  ],
  [
    "result tracker emits one view event per result identity",
    /useEffect\(\(\) => \{\s*trackResultView\(testId, resultType\);\s*\}, \[resultType, testId\]\);/m.test(tracker),
  ],
  [
    "result page mounts the measurement tracker",
    /<ResultEngagementTracker\s+testId=\{data\.testId\}\s+resultType=\{data\.resultCode\}/m.test(page),
  ],
  [
    "result footer retake CTA is measurable",
    /trackCTAClick\("result_retake", "result_footer"\)/.test(page),
  ],
  [
    "result footer discovery CTA is measurable",
    /trackCTAClick\("result_more_tests", "result_footer"\)/.test(page),
  ],
];

for (const [label, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}: ${label}`);
}

if (checks.some(([, passed]) => !passed)) process.exitCode = 1;
