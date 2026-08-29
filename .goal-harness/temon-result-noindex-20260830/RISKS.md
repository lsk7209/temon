# Risks and boundaries

- A parent metadata policy can be overridden by child metadata; live HTTP probes are required.
- `/results/*` is already disallowed in `robots.txt`, but robots.txt alone does not guarantee
  deindexing; the HTML directive is the required repair.
- Do not change the approximately 800 test pages, content, canonical URLs, AdSense configuration,
  DB data, or Vercel account/environment state.
- Deploy only through Git push and the repository's existing Git-connected production flow.
- Rollback is a single commit reverting the top-level metadata and audit additions.
