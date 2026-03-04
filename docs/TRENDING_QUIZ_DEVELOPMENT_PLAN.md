# Trending Quiz Development Plan (2026)

이 문서는 `lib/data/trending-quiz-seeds.ts`의 30개 후보를 실제 퀴즈로 제작하기 위한 1차 계획입니다.

## 목표
- 기존 `ALL_TESTS`와 slug/주제 충돌 없이 트렌드형 신규 퀴즈를 빠르게 출시
- 제작 난이도와 검색/공유 확산성을 기준으로 우선순위 운영

## 1차 우선 개발 TOP 10
1. `ai-prompt-style`
2. `shortform-hook-style`
3. `algorithm-bubble-type`
4. `career-pivot-type`
5. `sideproject-drive-type`
6. `runclub-style`
7. `sleepmaxxing-type`
8. `ticketing-mental-type`
9. `secondhand-negotiation-type`
10. `personal-brand-content-type`

## 제작 체크리스트
- [ ] 테스트별 질문 12개 작성 (A/B 선택형)
- [ ] 결과 타입 16개 구성
- [ ] 메타 타이틀/설명/OG 문구 작성
- [ ] `lib/tests-config.ts`에 카드 등록
- [ ] `app/tests/<slug>/` 라우트 생성
- [ ] 내부 QA (질문 흐름, 결과 분포, 공유 문구)
- [ ] 발행 후 IndexNow ping (publish cron 또는 admin ping API)

## 운영 메모
- 퀴즈 배치 발행 시 주 3~5개 단위로 노출 테스트
- 발행 24시간/72시간 기준으로 CTR, 공유율, 완료율 비교


## TOP 10 브리프 데이터
- 구현용 초안 데이터 파일: `lib/data/trending-quiz-briefs.ts`
- 포함 항목: one-liner, target keywords, sample questions(4), result archetypes(4)
- 목적: 기획→질문 작성→결과 카피 작성의 제작 리드타임 단축
