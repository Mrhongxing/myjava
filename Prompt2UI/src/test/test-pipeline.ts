import { generateBlueprintFromLLM } from "../llm/generate-blueprint";
import { compileBlueprintToDSL } from "../compiler/blueprint-to-dsl";
import { normalizeDSL } from "../validator/normalize-dsl";
import { validateDSL } from "../validator/validate-dsl";

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

  console.log("\n===== BLUEPRINT =====\n");
  console.log(JSON.stringify(blueprint, null, 2));

  console.log("\n===== DSL =====\n");
  console.log(JSON.stringify(normalizedDsl, null, 2));
}

main().catch((err) => {
  console.error("[pipeline] failed");
  console.error(err);
  process.exit(1);
});