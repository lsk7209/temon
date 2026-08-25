# 테몬 콘텐츠 보강 및 검토 리포트

검토일: 2026-06-02

## 5인팀 역할

- 콘텐츠 PM: 사이트 주제, 얇은 콘텐츠, 보강 우선순위 점검
- SEO 리뷰어: canonical, RSS/Feed, OG/Twitter, 색인 노출 경로 점검
- 페르소나 에디터: 테몬 전용 작성자 페르소나와 글 검수 기준 수립
- UX/모바일 리뷰어: 블로그 글 영역, TOC 이동, 모바일 가독성 점검
- 검증 담당: 타입체크와 프로덕션 빌드로 변경 검증

## 반영 완료

- 동적 테스트 상세 URL을 slug 기준 canonical로 고정했다.
- `/tests/{id}`로 접근되는 공개 테스트는 `/tests/{slug}`로 리다이렉트하게 정리했다.
- JSON-LD, TestIntro, 확장 소개 컴포넌트에 slug 기준 id를 전달하도록 맞췄다.
- 블로그 상세 메타데이터에 Twitter 이미지 정보를 추가했다.
- RSS(`/rss.xml`)와 Atom Feed(`/feed.xml`)에 블로그 글을 포함했다.
- RSS/Feed의 사이트 URL을 공통 `site-url` 유틸로 통일했다.
- 블로그 메인 TOC 대상 섹션에 `scroll-mt-24`를 적용해 고정 헤더에 제목이 가리지 않게 했다.
- 테몬 전용 콘텐츠 페르소나와 검수 체크리스트를 `personas/temon/persona.md`에 추가했다.
- `scripts/content-audit.js`를 최신 코드 기준으로 재실행해 `CONTENT_AUDIT.md`를 갱신했다.
- 본문 prose 150자 미만 랜딩 33개를 noindex 정책에 반영했다.
- noindex 테스트가 sitemap뿐 아니라 RSS, Atom Feed, AI index discovery 채널에서도 제외되도록 정렬했다.

## 2026-06-02 추가 감사 결과

- `node scripts/content-audit.js`: 전체 212개 테스트 랜딩 중 prose <150 33개, prose <300 141개.
- `npm run audit:results`: 정적 결과 페이지 212개 중 P2 191개, Pass 21개.
- `npm run audit:results` 적용 전: DB published thin/broken 92개, DB draft thin/broken 167개.
- `scripts/enrich-published-thin-results.js --apply`로 published 결과 타입 1,472행을 보강했다.
- 적용 전 원본은 `reports/published-thin-results-backup-2026-06-01T23-04-20-254Z.json`에 백업했다.
- `npm run audit:results` 적용 후: DB published thin/broken 0개, DB published 254개 전부 Pass.
- 결과 페이지 robots 차단 패턴을 `/tests/*/test/result`와 `/tests/*/test/result/*`로 명확히 확장했다.
- 결과 페이지 감사 스크립트가 robots 비색인 정책을 인식하도록 수정했다.
- 재감사 결과: static result page 212개 전부 Pass, static thin/broken 0개.
- `node scripts/score-due-drafts.js --apply`로 발행 예정 draft 1개의 quality score 0 차단 상태를 metadata에 기록했다.
- `scripts/enrich-published-thin-results.js`를 `--status=published|draft`로 확장하고 상태별 백업 파일명을 쓰도록 수정했다.
- draft result type 보강을 적용해 DB draft thin/broken 167개를 0개로 줄였다.
- draft 보강 전 원본 백업:
  - `reports/draft-thin-results-backup-2026-06-01T23-19-15-406Z.json`
  - `reports/draft-thin-results-backup-2026-06-01T23-24-39-690Z.json`
- 최종 `npm run audit:results`: static 212개 Pass, DB published 254개 Pass, DB draft 967개 Pass, Wave JSON 1000개 thin 0.
- 단, 발행 예정 draft `jjimdak-vs-chicken-mbti-test-KN2X`는 결과 thin이 아니라 문항 수/축 분배/메타 품질 문제로 quality score 0 차단 상태를 유지한다.

## 콘텐츠 보강 우선순위

1. 얇거나 깨진 결과 페이지 정리
   - 정적 결과 페이지는 비색인 정책과 감사 기준을 정렬해 Pass 상태로 회복했다.
   - DB published 결과는 보강 후 Pass 상태로 회복했다.
   - DB draft 결과도 보강 후 Pass 상태로 회복했다.
   - 결과 thin과 별개로 구조 품질이 낮은 due draft는 quality gate에서 계속 차단한다.

2. 테스트 소개 본문 강화
   - 각 테스트 소개에 "알 수 있는 것", "추천 대상", "결과 유형 예고", FAQ, 관련 테스트 링크를 포함한다.
   - 같은 템플릿 문장을 반복하지 않고 주제별 예시를 넣는다.

3. 블로그 글 연결 강화
   - 블로그 글마다 관련 테스트 또는 관련 글 링크를 최소 1개 이상 둔다.
   - 비교표, 체크리스트, 예시 문장 중 하나를 포함해 검색자의 즉시 이해를 돕는다.

4. 색인 정책 정렬
   - `CONTENT_AUDIT.md`, `lib/noindex-tests.ts`, 실제 sitemap 노출 상태를 같은 기준으로 맞춘다.
   - 공개 가치가 있는 테스트는 slug URL만 색인 대상으로 유지한다.

5. 광고와 본문 레이아웃 점검
   - 광고 슬롯은 높이를 예약해 CLS를 줄인다.
   - 모바일 본문에서 CTA, TOC, 광고, 본문 제목이 겹치지 않는지 배포 전 확인한다.

## 추가 권장 작업

- GSC에서 `temon.kr` sitemap 제출 상태와 새 URL 색인 상태를 확인한다.
- GA4에서 블로그 글별 유입, 참여 시간, 다음 테스트 클릭률을 확인해 내부 링크를 조정한다.
- AdSense에서 모바일 상단 광고가 테스트 시작 CTA를 밀어내는지 확인한다.
- 새 콘텐츠 발행 파이프라인에서 GSC sitemap ping, IndexNow, RSS/Feed 갱신이 동시에 동작하는지 운영 로그를 남긴다.

## 검수 기준

- 검색 유입자가 첫 화면에서 페이지 목적을 이해할 수 있어야 한다.
- 테스트/글 URL은 canonical과 sitemap, RSS/Feed에서 같은 slug를 사용해야 한다.
- 블로그 글은 모바일에서 TOC 이동 후 H2 제목이 헤더에 가리지 않아야 한다.
- 색인할 페이지는 고유 본문과 내부 링크를 가져야 한다.
- 색인하지 않을 페이지는 sitemap, canonical, robots 정책이 서로 충돌하지 않아야 한다.

## 2026-06-02 추가 보강: 발행 대기 초안 품질 복구

- `jjimdak-vs-chicken-mbti-test-KN2X` 초안의 원본 DB 행을 `reports/due-draft-quality-backup-2026-06-01T23-30-56-802Z.json`에 백업했다.
- 해당 초안은 질문 8개, 결과 15개, 혼합 축 문항, SEO 메타 누락 때문에 quality score 0으로 차단되어 있었다.
- `scripts/repair-due-draft-quality.js`를 추가해 해당 slug 한 건만 12문항, 16결과, SEO 메타, 설명문 기준에 맞게 복구했다.
- `node scripts/score-due-drafts.js --apply` 결과: due drafts 1개, publishable 1개, blocked 0개, min score 100.
- `npm run audit:results` 결과: static result page 212개 Pass, DB published 254개 Pass, DB draft 967개 Pass, result thin/broken 0.
