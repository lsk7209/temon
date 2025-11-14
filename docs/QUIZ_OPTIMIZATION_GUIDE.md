# 퀴즈 코드 최적화 가이드

## 개선 사항 요약

### 1. 접근성 개선 ✅
- `aria-label` 추가: 버튼에 명확한 라벨 제공
- `aria-pressed` 추가: 선택 상태 표시
- `role="radiogroup"` 추가: 라디오 그룹 의미 전달
- 키보드 이벤트 핸들러: Enter/Space 키 지원
- `focus-visible` 스타일: 키보드 포커스 시각화
- `aria-hidden="true"`: 장식용 요소 숨김

### 2. 성능 최적화 ✅
- `isProcessing` 상태 추가: 중복 클릭 방지
- `isSaving` 상태 활용: 로딩 상태 표시
- `disabled` 속성: 처리 중 버튼 비활성화
- 컴포넌트 언마운트 시 상태 정리

### 3. 사용자 경험 개선 ✅
- 로딩 상태 메시지: "결과 저장 중..." 표시
- 버튼 비활성화 피드백: opacity 및 cursor 변경
- 중복 선택 방지: 처리 중일 때 클릭 무시

## 적용된 퀴즈

✅ `food-temperature` - 최적화 완료

## 적용 필요 퀴즈

다음 퀴즈들에 동일한 최적화를 적용해야 합니다:
- `food-texture`
- `food-presentation`
- `food-combination`
- `food-timing`
- `food-waste`
- `food-allergy`

## 적용 방법

각 퀴즈의 `test/page.tsx` 파일에서:

1. `isProcessing` 상태 추가
2. `handleChoiceSelect`에 중복 방지 로직 추가
3. 버튼에 접근성 속성 추가
4. 로딩 상태 표시 추가
5. useEffect cleanup 추가

## 코드 예시

```typescript
// 상태 추가
const [isProcessing, setIsProcessing] = useState(false)

// handleChoiceSelect 수정
const handleChoiceSelect = useCallback(
  async (tags: string[]) => {
    if (isProcessing || isSaving) return
    
    setIsProcessing(true)
    // ... 기존 로직
  },
  [currentQuestion, answers, questions.length, saveResult, isProcessing, isSaving]
)

// 버튼에 접근성 속성 추가
<button
  type="button"
  disabled={isProcessing || isSaving}
  aria-label={`선택지 1: ${currentQ.a1.text}`}
  aria-pressed={selectedChoice === currentQ.a1.tags.join(",")}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleChoiceSelect(currentQ.a1.tags)
    }
  }}
  className="... focus-visible:outline-none focus-visible:ring-2 ..."
>
```

## 체크리스트

- [x] 접근성 속성 추가
- [x] 키보드 이벤트 핸들러
- [x] 중복 선택 방지
- [x] 로딩 상태 표시
- [x] 메모리 누수 방지
- [ ] 나머지 퀴즈 적용

