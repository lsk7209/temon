# Status | 마지막: 2026-05-03
## 현재 작업
콘텐츠 최적화 1차 완료, 검증 완료
## 최근 변경 (최근 5개만)
- 05-03: meal-frequency/pacing/order/balance/duration 랜딩에 심층 본문 섹션 추가
- 05-03: lib/extended-content에 식사 습관 5개 테스트 고유 본문/FAQ/한계 문구 추가
- 05-03: GA4 측정 ID G-L167CCPS8E 확인 및 관리자 표시값 갱신
- 05-03: 홈 메타 title/description을 GSC 키워드 중심으로 정리
- 05-03: NTRP 결과 페이지 Recharts/PDF/이미지 저장 라이브러리 지연 로딩 적용
## TODO
- [ ] Vercel Env에 TURSO_DATABASE_URL, TURSO_AUTH_TOKEN 등 DB env 누락 여부 확인
- [ ] GSC에서 `mbti 테스트 모음`, `무료 mbti 테스트` CTR 변화를 2~4주 후 확인
- [ ] 남은 얇은 콘텐츠 페이지를 CONTENT_AUDIT.md 기준으로 순차 보강
## 결정사항
- AdSense: Next Script 대신 직접 script 삽입으로 경고 제거
- NTRP 결과: 차트/내보내기 라이브러리는 첫 로드가 아닌 사용 시점에 로드
- Analytics: GA4/WebVitals는 유지, Cloudflare 전용 `/analytics.js` 호출은 제거
- 콘텐츠: 얇은 페이지는 공통 템플릿 반복보다 slug별 고유 본문을 우선 추가
## 주의
- build 시 TURSO_DATABASE_URL 미설정 경고가 남음. 런타임 DB 기능에는 env 필요
- 작업 전부터 존재한 미완료 변경 파일은 되돌리지 않음
