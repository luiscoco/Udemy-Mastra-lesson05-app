import { z } from "zod";
import { createTutor } from "./mastra/agents.js";
import { assertActive, credentialReady, generateAnswer, modelId, type AgentModel, type Emit, type LabResult } from "./core.js";
export const inputSchema = z.object({ provider: z.enum(["openai", "anthropic", "google"]), model: z.string().min(3).max(100), maxOutputTokens: z.number().int().min(64).max(2000), temperature: z.number().min(0).max(1).optional() }).strict();
export function review(raw: unknown) {
  const input = inputSchema.parse(raw);
  let validRoute = false;
  try { validRoute = modelId(input.model).split("/")[0] === input.provider; } catch { /* Finding below. */ }
  return { input, validRoute };
}
export async function executeLab(raw: unknown, emit: Emit, signal: AbortSignal): Promise<LabResult> {
  assertActive(signal); const { input, validRoute } = review(raw);
  const agent = validRoute ? createTutor(modelId(input.model)) : undefined;
  emit({ type: "stage", text: validRoute ? "Validated the route and constructed a real Agent; no provider request yet." : "Provider/model mismatch; construction and generation skipped." });
  return { status: validRoute ? "pass" : "needs-attention", summary: validRoute ? "The classroom configuration is valid. Account access and parameter support still require a live request." : "Choose a provider that agrees with the model prefix.",
    data: { ...input, providerMatchesModel: validRoute, agentId: agent?.id || null, credentialPresent: validRoute && credentialReady(input.model), providerAccessVerified: false, modelSupportVerified: false } };
}
export function liveModel(raw?: unknown) { return raw === undefined ? modelId() : modelId(review(raw).input.model); }
export async function executeLive(raw: unknown, question: string, emit: Emit, signal: AbortSignal, model?: AgentModel) {
  const { input, validRoute } = review(raw);
  if (!validRoute) return { finished: false, steps: 0, details: { finding: "Provider/model mismatch; no model call." } };
  const result = await generateAnswer(createTutor(model || modelId(input.model)), question, emit, signal, input);
  return { ...result, details: { selectedModel: input.model, maxOutputTokens: input.maxOutputTokens, temperature: input.temperature ?? "omitted", finishReason: result.finishReason } };
}
export async function dispose() {}
