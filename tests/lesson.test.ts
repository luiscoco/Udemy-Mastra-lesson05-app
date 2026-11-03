import assert from "node:assert/strict";
import { test, after } from "node:test";
import { executeLab, dispose } from "../src/lab.js";
import { LESSON } from "../src/lesson.js";
const run = (input: unknown) => executeLab(input, () => {}, new AbortController().signal);
after(async () => { await dispose(); });

test("provider mismatch prevents agent construction", async () => {
  const result = await run(LESSON.examples[1].input);
  const data = result.data as { providerMatchesModel: boolean; agentId: unknown; providerAccessVerified: boolean };
  assert.equal(result.status, "needs-attention"); assert.equal(data.providerMatchesModel, false);
  assert.equal(data.agentId, null); assert.equal(data.providerAccessVerified, false);
});
