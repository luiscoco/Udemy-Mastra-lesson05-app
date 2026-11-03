import { makeAgent, type AgentModel } from "../core.js";
export const instructions = "Explain agent frameworks and providers clearly. Do not invent prices, benchmark results or parameter support. Use Markdown with fenced code.";
export function createTutor(model?: AgentModel) { return makeAgent("lesson-5-tutor", "Lesson 5 tutor", instructions, model); }
export const tutor = createTutor();
