import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { hashIp } from "@/lib/hash-ip";

describe("hashIp", () => {
  const originalEnv = process.env.IP_HASH_SALT;

  beforeEach(() => {
    process.env.IP_HASH_SALT = "test-secret-salt-1234";
  });

  afterEach(() => {
    process.env.IP_HASH_SALT = originalEnv;
  });

  it("정상 IP에 대해 16자리 hex 해시를 생성해야 한다", () => {
    const hash = hashIp("192.168.1.1");
    expect(hash).toHaveLength(16);
    expect(/^[0-9a-f]{16}$/.test(hash)).toBe(true);
  });

  it("동일한 IP와 salt는 항상 동일한 해시를 반환해야 한다 (결정론적)", () => {
    const hash1 = hashIp("10.0.0.1");
    const hash2 = hashIp("10.0.0.1");
    expect(hash1).toBe(hash2);
  });

  it("서로 다른 IP는 서로 다른 해시를 반환해야 한다", () => {
    const hash1 = hashIp("10.0.0.1");
    const hash2 = hashIp("10.0.0.2");
    expect(hash1).not.toBe(hash2);
  });

  it("salt가 없으면 안전하게 'anonymous'를 반환해야 한다", () => {
    delete process.env.IP_HASH_SALT;
    expect(hashIp("192.168.1.1")).toBe("anonymous");
  });

  it("IP가 null, undefined, 빈 문자열, 'unknown'일 때 'anonymous'를 반환해야 한다", () => {
    expect(hashIp(null)).toBe("anonymous");
    expect(hashIp(undefined)).toBe("anonymous");
    expect(hashIp("")).toBe("anonymous");
    expect(hashIp("unknown")).toBe("anonymous");
  });

  it("X-Forwarded-For 등의 프록시 체인 IP 중 첫 번째 IP만 사용해야 한다", () => {
    const singleIpHash = hashIp("203.0.113.195");
    const forwardedHash = hashIp("203.0.113.195, 70.41.3.18, 150.172.238.178");
    expect(forwardedHash).toBe(singleIpHash);
  });
});
