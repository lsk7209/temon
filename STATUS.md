# Status | 마지막: 2026-05-27
## 현재 작업
사이트 속도/SEO/콘텐츠/AdSense/GSC/GA4/반응형 1차 종합 최적화 완료. 운영 배포 및 PSI/브라우저 검증 완료.
## 최근 변경 (최근 5개만)
- 05-27: 최종 Vercel production 배포 `dpl_5z3Aa6xaGPxmcsDVSce5JSohdxwz`, `https://temon.kr` alias 연결 확인.
- 05-27: AdSense 로딩을 사용자 입력 또는 8초 지연 방식으로 변경하고 GA4 외부 스크립트를 `lazyOnload`로 조정.
- 05-27: 운영 PSI 최종 측정 완료. `/blog` 95/96, `/tests` 95/96, `/tests/ntrp-test` 모바일 52→85 개선.
- 05-27: `/blog`, `/tests`, 대표 결과페이지, 피드/RSS/AI 인덱스/robots/sitemap 운영 200 및 모바일 가로 넘침 0 확인.
- 05-27: GSC/GA4/AdSense API 지표 수집 완료. 리포트는 `reports/site-optimizer-2026-05-27-*.md`.
## TODO
- [ ] 홈(`/`) 전역 메타 SEO 92 → 100 보강은 별도 작업으로 처리.
- [ ] `/tests/ntrp-test` 모바일 성능 95+ 목표 시 애니메이션/클라이언트 JS 추가 축소.
## 결정사항
- 광고 로딩: 초기 CWV 보호를 위해 AdSense는 지연 로드하되 사용자 입력 시 즉시 로드.
- 배포 제외: `.vercelignore`로 로컬 상태/리포트/DB/로그는 Vercel 업로드에서 제외.
## 주의
- 운영 검증 리포트: `reports/site-optimizer-2026-05-27-production-verification.md`.
- PageSpeed API 키는 `D:\env\키파일.txt`에서 사용했으며 출력하지 않음.
