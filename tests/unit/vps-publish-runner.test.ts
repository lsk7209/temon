import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("../../scripts/run-vps-publish.mjs", import.meta.url), "utf8");
async function run(status: number, body: unknown, invalidJson = false) {
  let exitCode: number | undefined;
  let output = "";
  await runInNewContext(`(async () => {${source}\n})()`, {
    AbortSignal,
    fetch: async () => ({ status, json: async () => {
      if (invalidJson) throw new SyntaxError("Invalid JSON");
      return body;
    } }),
    process: {
      env: { CRON_SECRET: "isolated-test-secret" },
      stdout: { write: (value: string) => { output += value; } },
      exit: (value: number) => { exitCode = value; },
    },
  });
  return { exitCode, output: JSON.parse(output) };
}

describe("VPS publisher job response validation", () => {
  it("accepts a confirmed idle publisher response", async () => {
    expect((await run(200, { success: true })).exitCode).toBe(0);
  });
  it("fails the job when a proxy returns 200 HTML or malformed JSON", async () => {
    expect((await run(200, undefined, true)).exitCode).toBe(1);
  });
  it("rejects JSON without an explicit successful publisher contract", async () => {
    expect((await run(200, {})).exitCode).toBe(1);
  });
  it("does not report authentication errors as successful jobs", async () => {
    const result = await run(401, { error: "Unauthorized" });
    expect(result.exitCode).toBe(1);
    expect(result.output.httpStatus).toBe(401);
    expect(JSON.stringify(result.output)).not.toContain("isolated-test-secret");
  });
});
