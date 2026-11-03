import type { LessonMetadata } from "./core.js";

export const LESSON = {
  "number": 5,
  "title": "Models Providers and LLM Configuration",
  "shortTitle": "Model configuration",
  "eyebrow": "PROVIDER · MODEL · PARAMETERS",
  "hero": "Inspect a model",
  "accent": "configuration.",
  "description": "Check provider/model alignment, bounded generation settings and credential presence before making an actual model request.",
  "labTitle": "Review the generation configuration",
  "labDescription": "The lab validates the candidate and constructs the real Agent configuration. It does not benchmark models or assume every provider supports the same parameters.",
  "localMode": "Configuration validation and Agent construction · no model call",
  "defaultQuestion": "Explain one practical difference between an agent framework and its model provider.",
  "objectives": [
    {
      "title": "Separate provider and model",
      "text": "A provider account supplies access; a model identifier selects a model. A single provider can offer multiple models."
    },
    {
      "title": "Validate the selected route",
      "text": "The provider field must agree with the provider/model identifier. The configured credential must belong to that selected provider."
    },
    {
      "title": "Bound classroom generation",
      "text": "The application checks its own output-token and temperature ranges. These are lab policies, not universal provider capability guarantees."
    },
    {
      "title": "Treat temperature carefully",
      "text": "Temperature does not guarantee truth or determinism. Omit it when the selected model does not support the setting."
    },
    {
      "title": "Record what is pinned",
      "text": "The package lockfile pins installed packages. A model alias may still change remotely; record the exact identifier used."
    },
    {
      "title": "Measure rather than invent",
      "text": "Inspect real errors and task outcomes. This app makes no unsupported claims about comparative model quality, price or latency."
    }
  ],
  "workflow": [
    "Validate the proposed options",
    "Compare provider and model prefix",
    "Check credential presence without its value",
    "Construct the actual Agent",
    "Optionally generate with those settings",
    "Inspect the provider outcome"
  ],
  "scope": "Local validation makes zero model calls. It cannot prove account access or model-specific parameter support. The live path uses the selected configuration and is required to check those operational properties.",
  "examples": [
    {
      "name": "OpenAI classroom configuration",
      "input": {
        "provider": "openai",
        "model": "openai/gpt-4.1-mini",
        "maxOutputTokens": 800,
        "temperature": 0.3
      },
      "expected": "A valid bounded configuration and a credential-presence boolean."
    },
    {
      "name": "Provider/model mismatch",
      "input": {
        "provider": "anthropic",
        "model": "openai/gpt-4.1-mini",
        "maxOutputTokens": 800
      },
      "expected": "A mismatch finding; no provider call is attempted."
    }
  ],
  "sourceFiles": [
    "src/lab.ts",
    "src/mastra/index.ts",
    "src/mastra/agents.ts"
  ],
  "exercise": "Compare a configuration with temperature omitted to one that supplies it. Check your model's current provider documentation before making the live call.",
  "checks": [
    {
      "question": "Does a valid local config prove the model is available?",
      "answer": "No. Actual account access and parameter support require the provider request and its observed result."
    },
    {
      "question": "Does a lockfile pin a remote model alias?",
      "answer": "No. It stabilizes package versions, not the remote behavior of an alias."
    },
    {
      "question": "Can high temperature guarantee creative, correct answers?",
      "answer": "No. It is a sampling setting whose support and behavior depend on the selected model."
    }
  ],
  "docs": [
    {
      "title": "Model providers",
      "url": "https://mastra.ai/docs/models/overview"
    },
    {
      "title": "Generation settings",
      "url": "https://mastra.ai/reference/agents/generate"
    }
  ],
  "readmeWorkflow": [
    {
      "step": "Validate settings",
      "component": "src/lab.ts",
      "behavior": "Check provider enum, model route, output-token bounds and optional temperature."
    },
    {
      "step": "Compare provider route",
      "component": "src/lab.ts",
      "behavior": "Require the provider field to agree with the provider/model prefix."
    },
    {
      "step": "Construct Agent",
      "component": "src/mastra/agents.ts",
      "behavior": "Construct an actual agent only for a valid route."
    },
    {
      "step": "Report readiness",
      "component": "src/lab.ts",
      "behavior": "Expose credential presence and the exact settings without making a provider call."
    }
  ],
  "liveWorkflow": [
    "The candidate configuration is checked again; mismatch blocks generation.",
    "The agent uses the selected model, maxOutputTokens and optional temperature in a real generate() call."
  ],
  "outcomeNotes": [
    "A provider/model mismatch produces Needs attention and no agent construction.",
    "Local validity does not verify account access or model-specific parameter support.",
    "No price, benchmark or cross-model quality claim is made."
  ]
} satisfies LessonMetadata;
