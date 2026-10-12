// Runs through `docker exec -i ... node --input-type=module -` from a host
// systemd unit. The bearer secret stays in the container environment.
const secret = process.env.CRON_SECRET;
if (!secret?.trim()) {
  process.stdout.write(JSON.stringify({ event: 'temon_publish', outcome: 'failure', httpStatus: null }) + '\n');
  process.exit(1);
}

try {
  const response = await fetch('http://127.0.0.1:3000/api/cron/publish', {
    headers: { authorization: `Bearer ${secret}` },
    signal: AbortSignal.timeout(45000),
  });
  let body = {};
  try { body = await response.json(); } catch { /* response remains a failure */ }
  const success = response.status === 200 && body.success === true;
  const submission = body.searchSubmission?.status;
  process.stdout.write(JSON.stringify({
    event: 'temon_publish',
    outcome: success ? 'success' : 'failure',
    httpStatus: response.status,
    published: typeof body.publishedTest?.id === 'string',
    submission: ['completed', 'failed', 'submitting'].includes(submission) ? submission : null,
    idle: success && !body.publishedTest,
  }) + '\n');
  process.exit(success ? 0 : 1);
} catch {
  process.stdout.write(JSON.stringify({ event: 'temon_publish', outcome: 'failure', httpStatus: null }) + '\n');
  process.exit(1);
}
