// src/pipeline/test-generate-ui.ts

import { generateUI } from "./generate-ui";

async function main() {
  const prompt =
    "Build a modern landing page for an AI website generator with features, pricing, and call to action.";

  const result = await generateUI(prompt, {
    documentId: "doc_pipeline_test",
    documentName: "Pipeline Test Page",
  });

  console.log("\n==== BLUEPRINT ====\n");

  console.log(JSON.stringify(result.blueprint, null, 2));

  console.log("\n==== DSL ====\n");

  console.log(JSON.stringify(result.dsl, null, 2));
}

main().catch((err) => {
  console.error(err);
});