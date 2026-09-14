# PLAN

## Phase 1 — M0 project and architecture baseline

- Objective: T001-T003을 현재 저장소에서 증명한다.
- Tasks: Git/권한/스택 확인, 라우트·콘텐츠·채점·DB·캐시·배포 계보 작성, 실행 가능한 기준선 명령 수행.
- Expected Files: `FILEMAP.md`, `EVIDENCE.md`, `STATUS.md`.
- Completion Criteria: AC001-AC003에 명령과 파일 근거가 연결됨.
- Test Point: package validation, targeted scripts, typecheck/build discovery.
- Rollback/Recovery: 읽기 전용 조사와 문서 기록만 수행.

## Phase 2 — M0 web, SEO, ads/privacy baseline

- Objective: T004-T006과 EV01-EV10의 현재 상태를 판정한다.
- Tasks: 대표 URL, sitemap/robots/canonical/HTTP, 광고·SDK·CMP·분석·로그 정적/공개 검사.
- Expected Files: `EVIDENCE.md`, `RISKS.md`, `FILEMAP.md`.
- Completion Criteria: AC004-AC006과 모든 EV 항목이 evidence-backed status를 가짐.
- Test Point: 기존 audit 스크립트와 안전한 공개 HTTP probe; 광고 클릭 금지.
- Rollback/Recovery: 운영 변경 없음.

## Phase 3 — First safe M1 slice

- Objective: confirmed P0 R1 결함 중 가장 작고 검증 가능한 묶음을 수정한다.
- Tasks: 회귀 테스트 추가, 최소 구현, diff review.
- Expected Files: 결함에 필요한 앱/테스트 파일과 harness 문서.
- Completion Criteria: 해당 acceptance PASS, 기존 기능 회귀 없음.
- Test Point: targeted test → audit/typecheck → build → local smoke when feasible.
- Rollback/Recovery: 범위별 일반 revert 가능; 기존 사용자 변경에 손대지 않음.

## Phase 4 — Review and durable handoff

- Objective: 증거, 한계, 다음 단계와 운영 승인 경계를 정리한다.
- Tasks: acceptance/review/evidence/handoff 갱신.
- Expected Files: `ACCEPTANCE.md`, `REVIEW.md`, `docs/HANDOFF.md`.
- Completion Criteria: 완료 주장과 증거가 일치하고 미실행 항목이 명시됨.
- Test Point: `git diff --check`, Git divergence/dirty preservation 확인.
- Rollback/Recovery: 문서 변경은 일반 revert 가능.
