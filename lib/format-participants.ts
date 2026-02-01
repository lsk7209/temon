/**
 * 참여자 수를 사용자 친화적으로 포맷팅
 * "0", "50" 같은 낮은 숫자는 신뢰도를 떨어뜨리므로 자연스러운 표현으로 변환
 */
export function formatParticipants(participants: string): string {
    // 숫자 추출
    const numericPart = participants.replace(/[^0-9.]/g, "")
    const num = parseFloat(numericPart)

    // 이미 K가 붙어있는 경우 (1.2K, 7.8K 등)
    if (participants.includes("K")) {
        return participants
    }

    // 0~100 미만인 경우 비표시 또는 기본값
    if (isNaN(num) || num < 100) {
        return null as unknown as string // null 반환 시 표시하지 않음
    }

    // 100~999
    if (num < 1000) {
        return `${num}+`
    }

    // 1000 이상
    const k = (num / 1000).toFixed(1)
    return `${k}K`
}

/**
 * 참여자 수를 UI에 표시할지 여부 결정
 * 100명 미만인 경우 표시하지 않음
 */
export function shouldShowParticipants(participants: string): boolean {
    const numericPart = participants.replace(/[^0-9.]/g, "")
    const num = parseFloat(numericPart)

    // K 단위가 붙어있으면 무조건 표시
    if (participants.includes("K")) {
        return true
    }

    // 100명 이상일 때만 표시
    return !isNaN(num) && num >= 100
}
