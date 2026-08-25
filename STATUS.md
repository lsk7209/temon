# Status | 마지막: 2026-08-25

## 현재 작업
애드센스 수익 개선 검토 완료. 결과 페이지 광고 유닛은 코드 배포까지 완료, 실제 노출은 AdSense 콘솔 작업(슬롯 생성) 대기.

## 최근 변경 (최근 5개만)
- 08-25: 로컬 main이 origin보다 25커밋 뒤처져 있던 것 동기화(리셋+재적용), 측정 코드 커밋/푸시.
- 08-25: DB 저CTR 테스트 2건(perfection-balance-1xQC, daily-umbrella-check-wave4) 제목/설명 수정.
- 08-25: 결과 페이지(`RedesignedResultPage`, DB 기반 전체 결과 라우트) 전용 광고 유닛 1개 추가 — `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID` 미설정 시 완전 비활성.
- 08-25: GSC 신선 리포트, CWV(PSI) 재점검 완료(`reports/gsc-opportunities-2026-08-25.md`, `reports/cwv-check-2026-08-25.md`).
- 08-19: AdSense Better Ads(모바일) 리뷰 통과 후 프로덕션 딜리버리 재활성화(origin에 이미 반영됨).

## TODO
- [ ] AdSense 콘솔에서 결과 페이지용 디스플레이 광고 유닛 생성 → 슬롯 ID를 Vercel Production `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID`에 입력.
- [ ] (선택) AdSense 콘솔 Auto Ads URL 제외 목록에 `temon.kr/tests/*/test/result/*` 등록 — 완전한 "광고 1개만" 보장하려면 필요.
- [ ] 슬롯 라이브 후 결과 페이지 CWV(CLS) 재점검.

## 결정사항
- 결과 페이지는 `robots: noindex`가 의도적(세션별 resultId URL 중복 방지)이라 광고 게이트에서 indexable 체크는 제외.
- `enable_page_level_ads:false`로 코드에서 Auto Ads를 끄려 했으나 실제 계정에서 이미 Auto Ads가 켜져 있어 충돌(에러) 확인 — 코드만으론 100% 차단 불가, 콘솔 URL 제외가 필요함을 사용자에게 공유하고 수동 유닛만 우선 배포.
- 레거시 정적 결과 페이지(212개, 개별 하드코딩) 광고 확장은 이번 범위 밖 — 대규모 리팩토링 필요.

## 주의
- `.bkit`, `.omc`, `.omx`, `local.db` 변경은 로컬 상태/cache로 보고 작업 대상에서 제외.
- 로컬 git과 origin이 다시 벌어지지 않도록, 세션 시작 시 `git fetch` + `git status -sb`로 ahead/behind 확인 습관화 권장.
