import { afterEach, describe, expect, it, vi } from 'vitest';
import { authorizeCron } from '@/lib/cron-auth';

afterEach(() => vi.unstubAllEnvs());
describe('cron fail-closed authentication', () => {
  it('rejects missing secret including the literal undefined bearer', () => {
    vi.stubEnv('CRON_SECRET', undefined);
    expect(authorizeCron(new Request('http://localhost', { headers: { authorization: 'Bearer undefined' } }))).toBe(false);
  });
  it('rejects blank secret and absent credentials', () => {
    vi.stubEnv('CRON_SECRET', ' ');
    expect(authorizeCron(new Request('http://localhost'))).toBe(false);
  });
  it('accepts only the exact configured bearer', () => {
    vi.stubEnv('CRON_SECRET', 'isolated-test-secret');
    for (const value of ['', 'Bearer wrong', 'bearer isolated-test-secret']) {
      expect(authorizeCron(new Request('http://localhost', { headers: { authorization: value } }))).toBe(false);
    }
    expect(authorizeCron(new Request('http://localhost', { headers: { authorization: 'Bearer isolated-test-secret' } }))).toBe(true);
  });
});
