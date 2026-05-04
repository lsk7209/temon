# Status | 마지막: 2026-05-04
## 현재 작업
GA4 운영 미노출 원인 수정 중: 운영 사이트에 gtag 미삽입 확인, env 누락 대비 fallback 적용
## 최근 변경 (최근 5개만)
- 05-04: 100개 신규 퀴즈 published 전환 및 샘플 URL 브라우저 검증
- 05-04: 26개 약점 퀴즈 문항 재작성, 결과 tips 1600개 보강
- 05-04: GA4 스크립트를 afterInteractive로 변경하고 G-L167CCPS8E fallback 추가
- 05-04: ads.txt 운영 URL 200 및 AdSense 코드 일치 확인
## TODO
- [ ] GA4 수정 커밋/푸시 후 https://temon.kr에서 gtag/collect 재확인
- [ ] GSC에서 신규 공개 후 2~4주 CTR/노출 변화 확인
- [ ] 신규 공개 URL 사이트맵/색인 제출 자동화 확인
## 결정사항
- GA4: 공개 Measurement ID는 비밀값이 아니므로 env 누락 대비 코드 fallback 허용
- ads.txt: public/ads.txt와 운영 URL이 이미 정상이라 재크롤링 대기
## 주의
- 기존 미완료 변경 파일은 되돌리지 않음
- npm run build가 Next 시작 단계에서 장시간 멈춰 lint/tsc와 운영 브라우저 검증을 우선 사용
