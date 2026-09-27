import { createHash } from "node:crypto";

/**
 * IP 식별자 해시. 원본 IP는 절대 저장하지 않음 (개인정보보호법 제19조 최소수집 원칙).
 * - salt(IP_HASH_SALT env)와 결합 → SHA-256 → 16자 prefix만 보관
 * - salt가 없으면 "anonymous" 상수 반환 (추적성 포기하고 안전 우선)
 */
export function hashIp(ip: string | null | undefined): string {
  if (!ip || ip === "unknown") return "anonymous";
  const salt = process.env.IP_HASH_SALT;
  if (!salt) return "anonymous";
  // 프록시 체인의 첫 IP만 사용
  const first = ip.split(",")[0]?.trim() || "unknown";
  return createHash("sha256")
    .update(`${salt}|${first}`)
    .digest("hex")
    .slice(0, 16);
}
