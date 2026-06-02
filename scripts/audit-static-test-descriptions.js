#!/usr/bin/env node
/**
 * Audits static test card descriptions in lib/tests-config.ts.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const TARGET_FILE = path.join(ROOT, "lib", "tests-config.ts");
const MIN_DESCRIPTION_LENGTH = 110;
const MAX_DESCRIPTION_LENGTH = 170;
const BAD_PATTERNS = [/ai-generated/i, /\?{2,}/, /undefined/i, /null/i];
const AWKWARD_PATTERNS = [
  /상황 상황/,
  /반응 패턴 상황/,
  /일상 선택/,
  /[가-힣]+에 상황/,
  /[가-힣]+하 상황/,
  /나만의 상황/,
  /야수의/,
  /심장일까/,
  /영화관에서도/,
  /보인다고/,
  /오늘도 상황/,
  /뭐하지 상황/,
  /떠나기 상황/,
  /달콤한 상황/,
  /뜯기 상황/,
];

function decodeStringLiteral(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return raw.slice(1, -1);
  }
}

function readField(block, key) {
  const match = block.match(new RegExp(`${key}:\\s*("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*')`, "s"));
  return match ? decodeStringLiteral(match[1]) : "";
}

function findAllTestsSource(source) {
  const markerIndex = source.indexOf("export const ALL_TESTS");
  if (markerIndex < 0) throw new Error("ALL_TESTS export not found");
  const assignmentIndex = source.indexOf("=", markerIndex);
  if (assignmentIndex < 0) throw new Error("ALL_TESTS assignment not found");
  const start = source.indexOf("[", assignmentIndex);
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "[") depth += 1;
    else if (ch === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(start + 1, i);
    }
  }
  throw new Error("ALL_TESTS array end not found");
}

function splitObjectBlocks(arraySource) {
  const blocks = [];
  let depth = 0;
  let quote = null;
  let escaped = false;
  let blockStart = -1;
  for (let i = 0; i < arraySource.length; i += 1) {
    const ch = arraySource[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "{") {
      if (depth === 0) blockStart = i;
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0 && blockStart >= 0) {
        blocks.push(arraySource.slice(blockStart, i + 1));
        blockStart = -1;
      }
    }
  }
  return blocks;
}

function hasBadCopy(value) {
  return BAD_PATTERNS.some((pattern) => pattern.test(String(value || "")));
}

function hasAwkwardCopy(value) {
  return AWKWARD_PATTERNS.some((pattern) => pattern.test(String(value || "")));
}

function main() {
  const source = fs.readFileSync(TARGET_FILE, "utf8");
  const blocks = splitObjectBlocks(findAllTestsSource(source));
  const rows = blocks.map((block) => ({
    id: readField(block, "id"),
    title: readField(block, "title"),
    description: readField(block, "description"),
  }));

  const seenDescriptions = new Map();
  const issues = [];
  for (const row of rows) {
    const description = String(row.description || "");
    const rowIssues = [];
    if (!row.id || !row.title || !description) rowIssues.push("missing-field");
    if (description.length < MIN_DESCRIPTION_LENGTH) rowIssues.push(`too-short:${description.length}`);
    if (description.length > MAX_DESCRIPTION_LENGTH) rowIssues.push(`too-long:${description.length}`);
    if (hasBadCopy(description)) rowIssues.push("bad-copy");
    if (hasAwkwardCopy(description)) rowIssues.push("awkward-copy");
    if (seenDescriptions.has(description)) {
      rowIssues.push(`duplicate-description:${seenDescriptions.get(description)}`);
    } else {
      seenDescriptions.set(description, row.id);
    }
    if (rowIssues.length > 0) {
      issues.push({
        id: row.id,
        title: row.title,
        length: description.length,
        issues: rowIssues,
        description,
      });
    }
  }

  const summary = {
    staticTests: rows.length,
    pass: issues.length === 0,
    minLength: Math.min(...rows.map((row) => row.description.length)),
    maxLength: Math.max(...rows.map((row) => row.description.length)),
    issues: issues.length,
    issueSample: issues.slice(0, 20),
  };
  console.log(JSON.stringify(summary, null, 2));
  if (issues.length > 0) process.exit(1);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
