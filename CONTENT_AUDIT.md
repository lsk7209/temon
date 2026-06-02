# 콘텐츠 전수 조사 리포트 (v2 — prose 기준)

- 생성일: 2026-06-01
- 대상: 212개 테스트 랜딩 (app/tests/{id}/page.tsx)

## 요약 지표

- 전체 페이지: **212**
- 본문(prose) 매우 얇음 <150자: **33**
- 본문(prose) 얇음 <300자: **141**
- 본문(prose) 양호 >=600자: **1**
- 의심 중복/유사 페어 (score >= 0.55): **63**

> 본문 prose는 JSX <p>/<h1-h3>/<li>/<span>의 실제 표시 텍스트.
> metadata.description은 검색 결과용이며 페이지 본문에는 나타나지 않음.

## 카테고리 클러스터 Top 10

- `food-*`: 42개
- `cooking-*`: 21개
- `meal-*`: 16개
- `phone-*`: 12개
- `evening-*`: 11개
- `morning-*`: 10개
- `weekend-*`: 10개
- `restaurant-*`: 6개
- `breakfast-*`: 2개
- `chicken-*`: 2개

## 중복/유사 페어 — 상위 30 (score DESC)

| # | A | B | score | slug | title | desc |
|---|---|---|---:|---:|---:|---:|
| 1 | food-aroma | food-portion | 0.71 | 0.33 | 1.00 | 0.92 |
| 2 | food-dipping | food-scooping | 0.65 | 0.33 | 0.75 | 0.96 |
| 3 | noodle-eating | rice-eating | 0.65 | 0.33 | 1.00 | 0.71 |
| 4 | food-layering | food-mixing | 0.60 | 0.33 | 0.67 | 0.89 |
| 5 | food-color-preference | food-temperature-preference | 0.60 | 0.50 | 0.50 | 0.82 |
| 6 | food-aroma | food-color-preference | 0.59 | 0.25 | 0.75 | 0.88 |
| 7 | food-aroma | food-garnishing-style | 0.59 | 0.25 | 0.75 | 0.88 |
| 8 | food-color-preference | food-portion | 0.59 | 0.25 | 0.75 | 0.88 |
| 9 | food-garnishing-style | food-portion | 0.59 | 0.25 | 0.75 | 0.88 |
| 10 | food-mixing | food-scooping | 0.59 | 0.33 | 0.60 | 0.92 |
| 11 | breakfast-preference | dinner-preference | 0.59 | 0.33 | 0.60 | 0.91 |
| 12 | breakfast-preference | lunch-preference | 0.59 | 0.33 | 0.60 | 0.91 |
| 13 | cooking-cleanup | cooking-experiment | 0.59 | 0.33 | 0.60 | 0.91 |
| 14 | cooking-cleanup | cooking-improvise | 0.59 | 0.33 | 0.60 | 0.91 |
| 15 | cooking-cleanup | cooking-share | 0.59 | 0.33 | 0.60 | 0.91 |
| 16 | cooking-cleanup | cooking-shared | 0.59 | 0.33 | 0.60 | 0.91 |
| 17 | cooking-cleanup | cooking-solo | 0.59 | 0.33 | 0.60 | 0.91 |
| 18 | cooking-cleanup | cooking-timing | 0.59 | 0.33 | 0.60 | 0.91 |
| 19 | cooking-cleanup | meal-cleanup | 0.59 | 0.33 | 0.60 | 0.91 |
| 20 | cooking-create | cooking-follow | 0.59 | 0.33 | 0.60 | 0.91 |
| 21 | cooking-create | cooking-modify | 0.59 | 0.33 | 0.60 | 0.91 |
| 22 | cooking-create | cooking-recipe | 0.59 | 0.33 | 0.60 | 0.91 |
| 23 | cooking-experiment | cooking-improvise | 0.59 | 0.33 | 0.60 | 0.91 |
| 24 | cooking-experiment | cooking-share | 0.59 | 0.33 | 0.60 | 0.91 |
| 25 | cooking-experiment | cooking-shared | 0.59 | 0.33 | 0.60 | 0.91 |
| 26 | cooking-experiment | cooking-solo | 0.59 | 0.33 | 0.60 | 0.91 |
| 27 | cooking-experiment | cooking-timing | 0.59 | 0.33 | 0.60 | 0.91 |
| 28 | cooking-follow | cooking-modify | 0.59 | 0.33 | 0.60 | 0.91 |
| 29 | cooking-follow | cooking-recipe | 0.59 | 0.33 | 0.60 | 0.91 |
| 30 | cooking-improvise | cooking-share | 0.59 | 0.33 | 0.60 | 0.91 |

## Kill List 후보 (본문 <150자) — 상위 40

| id | title | prose | meta |
|---|---|---:|---:|
| commute-style | 출퇴근 스타일 테스트 | 40 | 177 |
| meal-frequency | 식사 빈도 테스트 | 115 | 114 |
| meal-pacing | 식사 속도 테스트 | 115 | 114 |
| meal-order | 식사 순서 테스트 | 116 | 114 |
| meal-balance | 식사 균형 테스트 | 117 | 115 |
| meal-duration | 식사 시간 테스트 | 117 | 115 |
| clean-style | 청소 테스트 검색 | 126 | 128 |
| pizza-topping | 피자 테스트 검색 | 129 | 150 |
| weekend-rest | 주말 휴식 테스트 검색 | 129 | 136 |
| meal-planning | 식사 계획 스타일 테스트 | 132 | 126 |
| meal-sharing | 음식 공유 스타일 테스트 | 132 | 126 |
| morning-alarm | 아침 알람 테스트 검색 | 132 | 143 |
| jachui | 자취생 테스트 검색 | 133 | 138 |
| morning-energy | 아침 에너지 테스트 검색 | 133 | 138 |
| chair-sitting | 의자 테스트 검색 | 134 | 132 |
| meal-preparation | 식사 준비 스타일 테스트 | 135 | 126 |
| salad-dressing | 샐러드 테스트 검색 | 136 | 134 |
| evening-social | 저녁 약속 테스트 검색 | 137 | 147 |
| meal-serving | 음식 나누기 스타일 테스트 | 137 | 129 |
| meal-social | 식사 사회성 테스트 | 137 | 118 |
| morning-coffee | 아침 커피 테스트 검색 | 137 | 133 |
| food-scooping | 떠 먹기 스타일 테스트 | 139 | 127 |
| cooking-shared | 공동 요리 스타일 테스트 | 140 | 126 |
| meal-solo | 혼밥 스타일 테스트 | 140 | 117 |
| cooking-solo | 혼자 요리 스타일 테스트 | 143 | 126 |
| food-dipping | 찍어 먹기 스타일 테스트 | 143 | 130 |
| cooking-measurement | 계량 스타일 테스트 | 144 | 117 |
| meal-leftover | 남은 음식 처리 스타일 테스트 | 144 | 135 |
| food-layering | 음식 층별 먹기 스타일 테스트 | 148 | 137 |
| restaurant-ambiance | 분위기 선호도 테스트 | 148 | 120 |
| coffee-mbti | 커피 MBTI 테스트 | 149 | 149 |
| grocery-shopping | 장보기 스타일 테스트 | 149 | 120 |
| restaurant-service | 서비스 선호도 테스트 | 149 | 120 |

## Save List (본문 prose Top 15)

| id | title | prose | meta |
|---|---|---:|---:|
| kdrama-character | K-드라마 인물 매칭 테스트 | 613 | 134 |

## 전체 순위 — prose 본문 기준 ASC

<details><summary>펼치기</summary>

| id | prose | meta |
|---|---:|---:|
| commute-style | 40 | 177 |
| meal-frequency | 115 | 114 |
| meal-pacing | 115 | 114 |
| meal-order | 116 | 114 |
| meal-balance | 117 | 115 |
| meal-duration | 117 | 115 |
| clean-style | 126 | 128 |
| pizza-topping | 129 | 150 |
| weekend-rest | 129 | 136 |
| meal-planning | 132 | 126 |
| meal-sharing | 132 | 126 |
| morning-alarm | 132 | 143 |
| jachui | 133 | 138 |
| morning-energy | 133 | 138 |
| chair-sitting | 134 | 132 |
| meal-preparation | 135 | 126 |
| salad-dressing | 136 | 134 |
| evening-social | 137 | 147 |
| meal-serving | 137 | 129 |
| meal-social | 137 | 118 |
| morning-coffee | 137 | 133 |
| food-scooping | 139 | 127 |
| cooking-shared | 140 | 126 |
| meal-solo | 140 | 117 |
| cooking-solo | 143 | 126 |
| food-dipping | 143 | 130 |
| cooking-measurement | 144 | 117 |
| meal-leftover | 144 | 135 |
| food-layering | 148 | 137 |
| restaurant-ambiance | 148 | 120 |
| coffee-mbti | 149 | 149 |
| grocery-shopping | 149 | 120 |
| restaurant-service | 149 | 120 |
| food-mixing | 150 | 136 |
| restaurant-price | 150 | 120 |
| food-plating | 151 | 137 |
| cooking-garnishing | 152 | 134 |
| cooking-music | 152 | 135 |
| cooking-timing | 152 | 129 |
| meal-etiquette | 152 | 126 |
| cooking-presentation | 153 | 123 |
| cooking-seasoning | 154 | 126 |
| meal-cleanup | 154 | 132 |
| cooking-experiment | 156 | 126 |
| cooking-share | 156 | 126 |
| market-choice | 156 | 126 |
| midnight-snack | 156 | 117 |
| restaurant-menu | 156 | 126 |
| snack-preference | 156 | 117 |
| store-choice | 156 | 126 |
| cooking-improvise | 157 | 126 |
| cooking-complexity | 159 | 129 |
| cooking-recipe | 159 | 129 |
| cooking-time | 159 | 126 |
| restaurant-reservation | 159 | 126 |
| cooking-cleanup | 161 | 132 |
| cooking-create | 162 | 129 |
| cooking-follow | 162 | 132 |
| cooking-method | 162 | 126 |
| cooking-modify | 162 | 129 |
| investment-style | 163 | 154 |
| meal-group | 163 | 126 |
| food-bitterness | 166 | 127 |
| food-delivery-app | 166 | 132 |
| food-saltiness | 167 | 127 |
| food-sourness | 167 | 127 |
| food-sweetness | 167 | 127 |
| food-aroma | 169 | 133 |
| food-budget | 169 | 135 |
| kpop-idol | 172 | 145 |
| food-new | 173 | 148 |
| food-sale | 173 | 135 |
| food-umami | 173 | 130 |
| breakfast-preference | 174 | 126 |
| dinner-preference | 174 | 126 |
| food-chewy | 174 | 130 |
| food-crispy | 174 | 130 |
| food-crunchy | 174 | 130 |
| food-spiciness | 174 | 114 |
| lunch-preference | 174 | 126 |
| online-food | 176 | 138 |
| ramen-mbti | 177 | 148 |
| food-color-preference | 178 | 136 |
| food-portion | 178 | 133 |
| food-garnishing-style | 179 | 136 |
| food-creamy | 180 | 133 |
| hotel-breakfast | 180 | 156 |
| food-temperature-preference | 181 | 142 |
| food-brand | 186 | 135 |
| meeting-villain | 188 | 175 |
| snowwhite-mbti | 194 | 121 |
| breakup-style | 202 | 140 |
| cooking-multitask | 202 | 141 |
| zombie-survival | 216 | 144 |
| laundry-habit | 240 | 130 |
| leftover-handling | 243 | 136 |
| food-ordering | 244 | 137 |
| taste-preference | 244 | 136 |
| food-photography | 245 | 134 |
| food-sharing | 245 | 138 |
| cooking-style | 246 | 134 |
| mirror-habit | 246 | 136 |
| noodle-eating | 247 | 134 |
| spice-tolerance | 248 | 142 |
| food-seasoning | 249 | 132 |
| book-reading | 250 | 132 |
| rice-eating | 251 | 142 |
| bag-organizing | 252 | 133 |
| water-drinking | 252 | 134 |
| food-label | 253 | 134 |
| food-review | 253 | 134 |
| food-presentation | 255 | 138 |
| subway-vs-bus | 255 | 138 |
| meal-prep | 256 | 156 |
| snack-time | 257 | 138 |
| food-garnishing | 258 | 136 |
| restaurant-choice | 258 | 144 |
| food-texture | 260 | 144 |
| food-timing | 260 | 124 |
| soup-eating | 261 | 142 |
| door-closing | 262 | 138 |
| food-waste | 262 | 144 |
| clothing-order | 263 | 132 |
| game-play-style | 264 | 131 |
| chicken-vs-jjimdak | 265 | 132 |
| drink-preference | 265 | 138 |
| food-reheating | 266 | 138 |
| food-combination | 267 | 144 |
| food-temperature | 269 | 133 |
| bed-making | 272 | 140 |
| food-storage | 273 | 138 |
| breakfast-style | 274 | 140 |
| shower-habit | 275 | 152 |
| gift-choosing | 276 | 160 |
| kimbap-ingredient | 276 | 131 |
| sock-wearing | 278 | 136 |
| lunchbox-style | 284 | 162 |
| meat-grilling | 285 | 146 |
| gift-wrapping | 287 | 156 |
| cake-cutting | 289 | 163 |
| food-allergy | 298 | 150 |
| karaoke-song | 300 | 162 |
| stew-vs-soup | 306 | 152 |
| instagram-story | 308 | 170 |
| soup-vs-bibim | 312 | 165 |
| bathroom-habit | 371 | 146 |
| ntrp-test | 379 | 164 |
| alarm-habit | 421 | 163 |
| hamburger-combo | 448 | 164 |
| pet-mbti | 451 | 122 |
| cafe-style | 454 | 137 |
| shopping-style | 457 | 156 |
| dessert-style | 458 | 138 |
| travel-style | 461 | 142 |
| food-delivery | 468 | 150 |
| phone-notification | 474 | 129 |
| evening-routine | 475 | 154 |
| study-mbti | 476 | 138 |
| morning-commute | 477 | 140 |
| phone-photo | 478 | 152 |
| phone-app-organization | 482 | 124 |
| phone-backup | 482 | 127 |
| phone-search | 483 | 110 |
| movie-theater-style | 484 | 169 |
| phone-message | 484 | 130 |
| morning-rush | 492 | 137 |
| evening-cleaning | 496 | 154 |
| evening-wind-down | 496 | 146 |
| evening-exercise | 497 | 158 |
| evening-entertainment | 498 | 156 |
| evening-sleep-prep | 500 | 156 |
| cstore-routine | 501 | 114 |
| weekend-social | 501 | 156 |
| evening-snack | 502 | 152 |
| sleep-chronotype | 502 | 135 |
| evening-work | 504 | 161 |
| kakao-reply-style | 505 | 126 |
| morning-breakfast | 505 | 152 |
| weekend-chore | 505 | 158 |
| love-texting-style | 506 | 128 |
| skin-routine | 506 | 138 |
| morning-outfit | 508 | 124 |
| weekend-lazy | 508 | 129 |
| phone-payment | 511 | 130 |
| weekend-travel | 511 | 162 |
| music-taste | 512 | 123 |
| phone-social-media | 512 | 145 |
| weekend-shopping | 513 | 163 |
| weekend-planning | 514 | 132 |
| phone-battery | 516 | 163 |
| phone-usage | 516 | 110 |
| phone-storage | 517 | 160 |
| evening-reflection | 519 | 162 |
| morning-phone | 520 | 168 |
| bungeoppang | 523 | 196 |
| weekend-balance | 523 | 123 |
| evening-meal | 525 | 144 |
| morning-mood | 527 | 131 |
| weekend-hobby | 527 | 166 |
| love-reaction | 529 | 154 |
| chicken-style | 531 | 147 |
| morning-shower | 532 | 142 |
| phone-style | 533 | 143 |
| youtube-habit | 534 | 108 |
| convenience-snack | 538 | 128 |
| cvs-combo | 540 | 108 |
| weekend-food | 541 | 164 |
| ott-habits | 561 | 156 |
| spending-style | 562 | 134 |
| kdrama-mbti | 566 | 133 |
| lunch-decider | 590 | 144 |
| kdrama-character | 613 | 134 |

</details>