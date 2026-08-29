#!/usr/bin/env node

const baseUrl = new URL(process.argv[2] || "https://temon.kr");
const requestedPaths = process.argv.slice(3);
const paths = requestedPaths.length
  ? requestedPaths
  : ["/results/ntrp-test", "/results/music-taste"];

function attribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"),
  );
  return match?.[1] ?? match?.[2] ?? "";
}

function htmlRobotsDirectives(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map(([tag]) => ({
      name: attribute(tag, "name").trim().toLowerCase(),
      content: attribute(tag, "content").trim().toLowerCase(),
    }))
    .filter(({ name }) => name === "robots" || name === "googlebot")
    .flatMap(({ content }) => content.split(","))
    .map((directive) => directive.trim())
    .filter(Boolean);
}

async function inspect(pathname) {
  const url = new URL(pathname, baseUrl);
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
  });
  const html = await response.text();
  const finalUrl = new URL(response.url);
  const headerDirectives = (response.headers.get("x-robots-tag") || "")
    .toLowerCase()
    .split(",")
    .map((directive) => directive.trim())
    .filter(Boolean);
  const directives = [...new Set([...headerDirectives, ...htmlRobotsDirectives(html)])];

  return {
    requestedUrl: url.href,
    finalUrl: response.url,
    status: response.status,
    directives,
    sameRoute:
      finalUrl.origin === baseUrl.origin && finalUrl.pathname === url.pathname,
    pass:
      response.ok &&
      finalUrl.origin === baseUrl.origin &&
      finalUrl.pathname === url.pathname &&
      directives.includes("noindex") &&
      directives.includes("follow") &&
      !directives.includes("index") &&
      !directives.includes("nofollow"),
  };
}

const results = [];
for (const pathname of paths) {
  results.push(await inspect(pathname));
}

console.log(JSON.stringify({ baseUrl: baseUrl.href, results }, null, 2));

const failures = results.filter((result) => !result.pass);
if (failures.length) {
  console.error(
    `Result indexability audit failed for ${failures.length}/${results.length} route(s).`,
  );
  process.exitCode = 1;
}
