# GOAL

## Final Deliverable

`docs/temon_codex_handoff_v2`의 M0(T001-T006) 기준선을 실제 저장소 증거로 완성하고, 확인된 R1 로컬 개선을 M1부터 작은 단위로 구현·검증한다.

## User Value

기존 URL, 테스트 결과 의미, 광고 자산과 사용자 작업을 보존하면서 Temon의 콘텐츠 신뢰성, 검색 구조, 테스트 완주 경험과 유지보수성을 검증 가능한 방식으로 개선한다.

## Required Features

- T001-T006 각각의 현재 상태, 근거 파일, 실행 명령과 결과 기록
- 기존 빌드·콘텐츠 감사·SEO/HTTP·광고/분석/개인정보 기준선 확보
- EV01-EV10을 confirmed, stale, unknown으로 재분류
- 근거가 확인된 M1 R1 항목에 회귀 테스트를 먼저 추가하고 최소 수정
- 모든 변경과 미실행 경계를 durable handoff에 기록

## Non-Goals

- 운영 배포, Git push, 운영 DB 쓰기
- 광고 계정/Auto Ads/슬롯 설정 변경 또는 광고 클릭
- 운영 URL·canonical·robots·색인 정책 반영
- 채점 결과 의미 변경, 대량 콘텐츠 수정, 개인정보 수집 확대
- Next.js/Drizzle 대규모 업그레이드

## Done Conditions

- M0 T001-T006 acceptance가 실제 증거와 함께 PASS 또는 명시적 UNKNOWN으로 기록됨
- 선택한 M1 로컬 개선의 회귀 테스트와 관련 audit/typecheck/build가 통과함
- 기존 dirty 파일이 보존되고 작업 범위 diff가 구분됨
- 운영 미적용 및 외부 미확인 상태가 명확히 보고됨

## User-Visible Result

Temon 개선의 검증된 기준선과 첫 번째 안전한 개선 묶음이 로컬에서 준비되고, 다음 단계가 하나의 구체적 작업으로 남는다.
