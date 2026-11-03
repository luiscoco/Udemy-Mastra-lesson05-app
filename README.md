# Mastra · Lesson 05 · Models Providers and LLM Configuration

Check provider/model alignment, bounded generation settings and credential presence before making an actual model request.

![Lesson 05 application](docs/application-preview.png)

## What this application does

The lab validates the candidate and constructs the real Agent configuration. It does not benchmark models or assume every provider supports the same parameters.

**Practical mode:** Configuration validation and Agent construction · no model call.

Local validation makes zero model calls. It cannot prove account access or model-specific parameter support. The live path uses the selected configuration and is required to check those operational properties.

## Run the application

Use **Node.js 24+**. Each lesson is an independent repository with its own dependency lockfile.

```powershell
git clone https://github.com/luiscoco/Udemy-Mastra-lesson05-app.git
cd Udemy-Mastra-lesson05-app
npm ci
npm start
```

Open **http://127.0.0.1:3205** and choose **Run practical lab**. The practical operation requires no model key. Starting the server does not make a provider request. Keep the terminal open; Ctrl+C stops it. To change the port, set PORT in the environment or local .env file.

## Application pages

| Page | Content |
| --- | --- |
| Application lab | Editable JSON cases, actual execution, formatted result, event log and structured metadata |
| What you will learn | Lesson objectives, comprehension checks and a concrete exercise |
| How to run | Installation, local/live modes, commands and troubleshooting |
| Architecture & workflow | The practical execution sequence and the actual request runner |
| Code walkthrough | Source-derived excerpts with GitHub line references |

The application supports light/dark themes, mobile layouts, sanitized Markdown, syntax-highlighted code and copy-code controls.

## Practical execution workflow

| Stage | Source | Actual behavior |
| --- | --- | --- |
| Validate settings | [src/lab.ts](src/lab.ts) | Check provider enum, model route, output-token bounds and optional temperature. |
| Compare provider route | [src/lab.ts](src/lab.ts) | Require the provider field to agree with the provider/model prefix. |
| Construct Agent | [src/mastra/agents.ts](src/mastra/agents.ts) | Construct an actual agent only for a valid route. |
| Report readiness | [src/lab.ts](src/lab.ts) | Expose credential presence and the exact settings without making a provider call. |

The browser posts JSON to **POST /api/lab**. The host validates the envelope, runs the lesson implementation and sends NDJSON events. The UI renders the actual result and a separate application outcome. **GET /api/config** exposes public lesson metadata and credential-presence readiness, never credential values.

## Classroom cases and expected outcomes

### 1. OpenAI classroom configuration

```json
{
  "provider": "openai",
  "model": "openai/gpt-4.1-mini",
  "maxOutputTokens": 800,
  "temperature": 0.3
}
```

**Expected:** A valid bounded configuration and a credential-presence boolean.

### 2. Provider/model mismatch

```json
{
  "provider": "anthropic",
  "model": "openai/gpt-4.1-mini",
  "maxOutputTokens": 800
}
```

**Expected:** A mismatch finding; no provider call is attempted.

## Interpreting the result

- A provider/model mismatch produces Needs attention and no agent construction.
- Local validity does not verify account access or model-specific parameter support.
- No price, benchmark or cross-model quality claim is made.

**Complete** means the operation met its implemented completion checks. **Needs attention** exposes a business, format or validation finding. **Could not finish** is an execution/request failure. **Cancelled** is a separate user action. Read the evidence before treating any runtime status as task correctness.

## Optional live-agent workflow

1. The candidate configuration is checked again; mismatch blocks generation.
2. The agent uses the selected model, maxOutputTokens and optional temperature in a real generate() call.

The live button uses **POST /api/query** and a real provider, and may incur API usage. Tests use an explicit SDK model adapter; no paid provider call is claimed by the test evidence.

Configure your own credentials locally, preserving any existing .env:

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

```dotenv
# Set your own provider credential locally. No credential is copied from another app.
OPENAI_API_KEY=your_api_key
MASTRA_MODEL=openai/gpt-4.1-mini
PORT=3205
# Optional, only for the provider you select:
ANTHROPIC_API_KEY=your_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key
```

Choose a model your account can access and restart the server. Credentials remain on the host and are ignored by Git. Existing shell values take precedence over the optional .env file. Provider/model availability and supported parameters must be checked for your selected model.

## Build, samples and verification

```powershell
npm run sample
npm run build
npm test
npm run test:browser
```

- **sample:** executes the default practical case without a provider key.
- **sample:live:** runs an actual provider request after configuration; invoke separately with npm run sample:live.
- **build:** regenerates all five pages, actual-source excerpts, architecture SVG, this README and the browser bundle.
- **test:** typechecks and runs offline local-operation, invalid-input, cancellation, real-SDK adapter, generated-content and HTTP-boundary checks, plus lesson-specific regression cases.
- **test:browser:** uses isolated headless Chrome to execute the real practical lab and its failure case, verify all five pages and mobile layout, check theme persistence, syntax colors and safe Markdown, and save [browser evidence](docs/browser-qa.json). The live-renderer fixture makes no provider request.

Set BROWSER_EXECUTABLE if Chrome/Chromium is not installed at the platform’s standard path. Browser tests are local; GitHub Actions runs npm ci, build and the offline test suite.

## Dependencies

| Runtime package | Pinned version |
| --- | --- |
| @mastra/core | 1.81.0 |
| dompurify | 3.4.17 |
| marked | 18.1.3 |
| zod | 4.6.7 |

The committed package-lock.json fixes the installed dependency tree. A remote model alias is independent of the JavaScript lockfile.

## Student exercise

Compare a configuration with temperature omitted to one that supplies it. Check your model's current provider documentation before making the live call.

Rebuild after a source change so the explanation pages, line references and README remain consistent with the running code.

## Source and references

- [src/lab.ts](src/lab.ts)
- [src/mastra/index.ts](src/mastra/index.ts)
- [src/mastra/agents.ts](src/mastra/agents.ts)
- [HTTP host](src/server.ts)
- [Execution envelope](src/runner.ts)
- [Page and README generator](scripts/build-pages.ts)
- [Model providers](https://mastra.ai/docs/models/overview)
- [Generation settings](https://mastra.ai/reference/agents/generate)

Prism’s license is included in [public/prism-LICENSE.txt](public/prism-LICENSE.txt).
