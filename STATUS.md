# Status | 마지막: 2026-05-04
## 현재 작업
속도/SEO/AdSense/GSC/GA4 추가 점검 완료: 운영 반영 및 API 확인 완료
## 최근 변경 (최근 5개만)
- 05-04: 100개 신규 퀴즈 published 전환 및 샘플 URL 브라우저 검증
- 05-04: 26개 약점 퀴즈 문항 재작성, 결과 tips 1600개 보강
- 05-04: GA4 스크립트를 afterInteractive로 변경하고 G-L167CCPS8E fallback 추가
- 05-04: ads.txt 운영 URL 200 및 AdSense 코드 일치 확인
- 05-04: temon.kr 운영 배포 후 gtag/GA4 collect 204 브라우저 검증
- 05-04: AdSense env fallback, 중복 viewport 제거, 홈 H1/브랜드 SEO 보강
- 05-04: sitemap 날짜 최신 확인, DB published 퀴즈 누락 발견 후 포함 로직 보강
- 05-04: AdSense API에서 temon.kr READY/Auto ads true/URL channel 확인
- 05-04: GSC에 sitemap.xml/sitemap-index.xml 제출, IndexNow로 sitemap 전체 306개 URL 제출
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
