# Status | 마지막: 2026-05-04
## 현재 작업
추가 개선 검토 완료: 동적 퀴즈 메타와 AI 인덱스 운영 검증 완료
## 최근 변경 (최근 5개만)
- 05-04: sitemap 날짜 최신 확인, DB published 퀴즈 누락 발견 후 포함 로직 보강
- 05-04: AdSense API에서 temon.kr READY/Auto ads true/URL channel 확인
- 05-04: GSC에 sitemap.xml/sitemap-index.xml 제출, IndexNow로 sitemap 전체 306개 URL 제출
- 05-04: 홈 콘텐츠 보강 섹션과 FAQ/FAQPage JSON-LD 추가
- 05-04: /tests 목록 페이지 메타·히어로·활용법·FAQ 한국어 보강
- 05-04: 동적 퀴즈 메타 영어 노출 제거, ai-index/llms 동적 최신화 적용
## TODO
- [ ] GSC에서 신규 공개 후 2~4주 CTR/노출 변화 확인
- [ ] AdSense 리포트에 temon.kr 페이지뷰/노출이 잡히는지 24시간 후 재확인
## 결정사항
- GA4: 공개 Measurement ID는 비밀값이 아니므로 env 누락 대비 코드 fallback 허용
- ads.txt: public/ads.txt와 운영 URL이 이미 정상이라 재크롤링 대기
- 홈 SEO: GSC 저CTR 키워드 `MBTI 테스트 모음`, `테스트 모음`을 H1/CTA에 반영
- AdSense: Auto ads 활성 상태라 신규 광고 슬롯 추가보다 수집 안정화 후 리포트 확인 우선
## 주의
- 기존 미완료 변경 파일은 되돌리지 않음
- npm run build가 Next 시작 단계에서 장시간 멈춰 lint/tsc와 운영 배포 검증을 우선 사용
