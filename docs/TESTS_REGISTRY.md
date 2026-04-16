# 테스트 목록 레지스트리

이 문서는 테몬 프로젝트에 개발된 모든 퀴즈/테스트 목록을 관리합니다. 중복 개발을 방지하기 위해 신규 테스트 개발 전 반드시 확인하세요.

## 📋 전체 테스트 목록 (총 36개)

### 🍔 음식 관련 테스트 (12개)
1. **bungeoppang-style** - 붕어빵 취향 테스트
2. **chicken-style** - 치킨 주문 스타일 테스트
3. **coffee-mbti** - 커피 MBTI 테스트
4. **convenience-snack** - 편의점 간식 루틴 테스트
5. **cvs-combo** - 편의점 조합 스타일 테스트
6. **cvs-snack-routine** - 편의점 간식 루틴 테스트 ⚠️ 중복
7. **dessert-style** - 디저트 취향 성격 테스트
8. **food-delivery** - 배달 음식 스타일 테스트
9. **jachui** - 자취 밥상 스타일 테스트
10. **lunch-decider** - 회사 점심 뭐 먹지 테스트
11. **lunch-style** - 회사 점심 성격 테스트
12. **ramen-mbti** - 라면 MBTI 테스트

### 📱 디지털/라이프스타일 테스트 (10개)
13. **alarm-habit** - 알람 습관 MBTI 테스트
14. **kakao-reply-style** - 카톡 답장 스타일 테스트
15. **love-texting-style** - 연애 연락 텐션 테스트
16. **phone-style** - 스마트폰 사용 스타일 테스트
17. **phone-usage** - 스마트폰 사용 스타일 테스트 ⚠️ 중복
18. **sleep-chronotype** - 수면 크로노타입 테스트
19. **youtube-habit** - 유튜브 시청 습관 테스트
20. **cafe-style** - 카페 스타일 성격 테스트
21. **cstore-routine** - 편의점 루틴 테스트
22. **evening-routine** - 퇴근 후 루틴 테스트

### 🎬 엔터테인먼트 테스트 (4개)
23. **kdrama-mbti** - K-드라마 클리셰 테스트
24. **kpop-idol** - K-팝 아이돌 포지션 테스트
25. **movie-theater-style** - 영화관 관람 스타일 테스트
26. **music-taste** - 음악 취향 성격 테스트

### 💰 소비/생활 테스트 (4개)
27. **shopping-style** - 쇼핑 스타일 성격 테스트
28. **spend-style** - 소비 성향 테스트
29. **spending-style** - 소비 성향 테스트 ⚠️ 중복
30. **travel-style** - 여행 짐 스타일 테스트

### 🎓 학습/성격 테스트 (4개)
31. **study-mbti** - 공부 MBTI 테스트
32. **clean-style** - 방청소 성격 테스트
33. **skin-routine** - 피부 루틴 성향 테스트
34. **pet-mbti** - 반려동물 MBTI 테스트

### 🎮 기타 테스트 (2개)
35. **ntrp-test** - NTRP 테스트 (테니스 실력 측정)
36. **snowwhite-mbti** - 백설공주 에겐테토 테스트

## ⚠️ 중복 발견 항목

다음 테스트들은 유사한 주제로 중복 개발되었습니다:

1. **편의점 간식 루틴 테스트**
   - `convenience-snack` (편의점 간식 루틴 테스트)
   - `cvs-snack-routine` (편의점 간식 루틴 테스트)

2. **스마트폰 사용 스타일 테스트**
   - `phone-style` (스마트폰 사용 스타일 테스트)
   - `phone-usage` (스마트폰 사용 스타일 테스트)

3. **소비 성향 테스트**
   - `spend-style` (소비 성향 테스트)
   - `spending-style` (소비 성향 테스트)

## 📝 신규 테스트 개발 가이드

### 개발 전 체크리스트
- [ ] `tests-registry.json` 파일 확인
- [ ] `docs/TESTS_REGISTRY.md` 파일 확인
- [ ] 유사한 주제의 기존 테스트가 있는지 검색
- [ ] 테스트 slug가 고유한지 확인

### 테스트 등록 방법
1. 테스트 개발 완료 후 `scripts/list-tests.js` 실행
2. `tests-registry.json` 파일이 자동 업데이트됨
3. 이 문서(`TESTS_REGISTRY.md`)도 수동으로 업데이트 권장

### 테스트 명명 규칙
- **slug**: kebab-case 사용 (예: `chicken-style`)
- **title**: 한글 제목 사용 (예: "치킨 주문 스타일 테스트")
- **카테고리**: 음식, 디지털/라이프스타일, 엔터테인먼트, 소비/생활, 학습/성격, 기타

## 🔄 업데이트 이력

- 2025-11-13: 초기 목록 생성 (36개 테스트)
- 중복 항목 3건 발견 및 기록

