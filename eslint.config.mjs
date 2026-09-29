import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // 기존 .eslintrc.json에서 유지하던 프로젝트 규칙
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "warn",
      // eslint-config-next@16 / React 19에서 새로 error로 승격된 규칙들.
      // 기존 코드에 선반영된 위반이 있어(약 29건) 일단 warn으로 두어 가시화하고,
      // 개별 검토가 필요한 후속 작업으로 남긴다. 마이그레이션 자체(flat config,
      // ESLint 9, Next 16 정합성)를 블로킹하지 않기 위함.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "@next/next/no-location-assign-relative-destination": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 기존 tsconfig/lint 제외 대상과 일치
    "_archive/**",
    "scripts/**",
    "node_modules/**",
    // 앱 빌드에 포함되지 않는 디자인 프로토타입/정적 자산 (린트 대상 아님)
    "테몬리디자인/**",
    "public/**",
    "workers/**",
    "functions/**",
    "drizzle/**",
    "data/**",
    "reports/**",
  ]),
]);

export default eslintConfig;
