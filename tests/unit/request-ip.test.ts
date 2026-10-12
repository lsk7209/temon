import { afterEach, expect, it, vi } from 'vitest';
import { requestIp } from '@/lib/request-ip';
afterEach(() => vi.unstubAllEnvs());
it('ignores spoofed IP headers without trusted ingress', () => {
  vi.stubEnv('VERCEL', undefined); vi.stubEnv('TEMON_TRUST_PROXY', undefined);
  expect(requestIp(new Headers({'x-forwarded-for':'attacker','x-real-ip':'attacker'}))).toBe('unknown');
});
it('preserves the established Vercel forwarding contract', () => {
  vi.stubEnv('VERCEL','1');
  expect(requestIp(new Headers({'x-forwarded-for':'192.0.2.1, 192.0.2.2'}))).toBe('192.0.2.1');
});
