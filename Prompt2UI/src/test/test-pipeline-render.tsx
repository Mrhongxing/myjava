import React from "react";
import ReactDOM from "react-dom/client";

import { generateBlueprintFromLLM } from "../llm/generate-blueprint";
import { compileBlueprintToDSL } from "../compiler/blueprint-to-dsl";
import { normalizeDSL } from "../validator/normalize-dsl";
import { validateDSL } from "../validator/validate-dsl";
import RenderNode from "../renderer/RenderNode";

async function main() {
  const userPrompt =
    "Build a minimal SaaS landing page for developers with navbar, hero, feature grid, pricing, testimonial, CTA, and footer.";

  console.log("[pipeline] generating blueprint via LLM...");
  const blueprint = await generateBlueprintFromLLM(userPrompt);

  console.log("[pipeline] compiling blueprint to DSL...");
  const dsl = compileBlueprintToDSL(blueprint);

  console.log("[pipeline] normalizing DSL...");
  const normalizedDsl = normalizeDSL(dsl);

  console.log("[pipeline] validating DSL...");
  const validation = validateDSL(normalizedDsl);

  console.log("[pipeline] validation result:", validation);

  if (!validation.valid) {
    throw new Error("DSL validation failed");
  }

  const root = document.getElementById("root");
  if (!root) {
    throw new Error('Missing root element "#root"');
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RenderNode node={normalizedDsl.page} />
    </React.StrictMode>
  );
}

main().catch((error) => {
  console.error("[pipeline-render] failed");
  console.error(error);
});