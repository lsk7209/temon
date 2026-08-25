# Status | 마지막: 2026-08-25

## 현재 작업
애드센스 수익 개선 검토. 결과 페이지 광고는 **라이브 테스트 후 롤백**해서 현재 꺼진 상태 — AdSense 콘솔에서 Auto Ads URL 제외 설정 대기 중.

## 최근 변경 (최근 5개만)
- 08-25: 결과 페이지 광고 슬롯(9293409342) 실제 라이브 배포 → 페이지당 광고 7개(FAQ 안쪽 삽입 포함) + 전면 인터스티셜(vignette) 확인 → **즉시 롤백**(env var 제거, 재배포). 코드는 그대로, env var만 뺌.
- 08-25: 레거시 정적 결과 페이지 212개(전체 결과 트래픽의 94%)에도 같은 광고 유닛 확장 — `app/tests/layout.tsx`에서 경로 감지로 주입, 파일 개별 수정 없음.
- 08-25: `hono` 미사용 의존성 제거 + `npm audit fix`(비파괴)로 취약점 18→10건.
- 08-25: 로컬 main이 origin보다 25커밋 뒤처져 있던 것 동기화, DB 저CTR 테스트 2건 제목 수정.
- 08-19: AdSense Better Ads(모바일) 리뷰 통과 후 프로덕션 딜리버리 재활성화.

## TODO
- [ ] **AdSense 콘솔에서 Auto Ads → URL 제외에 `temon.kr/tests/*/test/result/*` 등록 (필수, 재시도 전 선행)**
- [ ] 제외 설정 확인 후 `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID=9293409342` 다시 설정 + 재배포 (요청 시 클코가 처리)
- [ ] 재배포 후 반드시 실제 라이브에서 브라우저로 광고 개수/vignette 여부 재확인 (로컬 가짜 슬롯 테스트로는 이 문제를 못 잡았음)
- [ ] 슬롯 라이브 후 결과 페이지 CWV(CLS) 재점검

## 결정사항
- 결과 페이지는 `robots: noindex`가 의도적(세션별 resultId URL 중복 방지)이라 광고 게이트에서 indexable 체크는 제외.
- 이 계정은 Auto Ads가 이미 켜져 있어 `enable_page_level_ads:false`로 코드에서 끌 수 없음 확인(충돌 에러). 콘솔 URL 제외가 유일한 통제 수단.
- 로컬에서 가짜 슬롯 ID로 테스트했을 때는 문제가 안 보였음(Google이 미승인 슬롯엔 실제 광고를 안 채움) — 실제 슬롯으로 라이브 배포해서야 Auto Ads 과다 삽입이 드러남. **다음에도 실제 슬롯 라이브 테스트를 반드시 거칠 것.**

## 주의
- `.bkit`, `.omc`, `.omx`, `local.db` 변경은 로컬 상태/cache로 보고 작업 대상에서 제외.
- 로컬 git과 origin이 다시 벌어지지 않도록, 세션 시작 시 `git fetch` + `git status -sb`로 ahead/behind 확인 습관화 권장.
- Vercel CLI가 `lsk7209` 계정으로 로컬에 로그인되어 있어 `vercel env`/`vercel --prod`로 직접 배포 가능함을 확인.
