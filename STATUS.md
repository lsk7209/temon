# Status | 마지막: 2026-05-28
## 현재 작업
사이트 종합 최적화 마감 검증 완료. 최신 배포와 프로덕션 전수 검사까지 통과.
## 최근 변경 (최근 5개만)
- 05-28: 최신 프로덕션 배포 `dpl_B4R68H6JSixMxrui8U1ekAzZE3Kz`, `temon.kr` alias 완료.
- 05-28: 프로덕션 212개 정적 `/tests/*` URL 200 및 GSC 보강 섹션 3종 전수 검사 통과.
- 05-28: 모바일 대표 페이지 `cooking-style` 브라우저 검증 통과: H1 1개, 관련 링크 3개, overflow 없음, 콘솔 오류 없음.
- 05-28: Lighthouse 모바일 `food-aroma` 접근성/Best Practices/SEO/Agentic 100, LCP 426ms, CLS 0.00 확인.
- 05-28: robots/sitemap/rss/feed/llms/ai-index/ads.txt, GA4, AdSense 지연 로딩, IndexNow, GSC sitemap/Indexing API 실검증 완료.
## TODO
- [ ] 커밋 전 변경 범위 최종 리뷰 및 로컬 cache 파일 분리.
## 결정사항
- GSC 보강: 모든 정적 테스트 랜딩에 검색 의도, 실행 가이드, 관련 테스트 섹션을 노출.
- AEO/GEO: 전역 WebPage schema에 `h1`, `.article-summary`, `.key-takeaways`, `#gsc-search-intent`를 speakable 후보로 노출.
- AdSense 지연: 스크립트는 랜딩에서만 허용하고 테스트 진행 화면은 계속 제외.
## 주의
- Google Search: sitemap 제출 204, Indexing API `food-aroma` URL_UPDATED 200 확인.
- IndexNow: api.indexnow/Bing/Naver 200, Yandex 202 확인.
- `.bkit`, `.omc`, `.omx`, `local.db` 변경은 로컬 상태/cache로 보고 작업 대상에서 제외.
