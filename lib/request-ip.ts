/** Only trust forwarding headers behind a verified, overwriting ingress. */
export function requestIp(headers: Headers): string {
  if (process.env.VERCEL !== '1' && process.env.TEMON_TRUST_PROXY !== 'true') return 'unknown';
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
}
