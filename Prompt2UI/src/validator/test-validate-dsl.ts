// src/validator/test-validate-dsl.ts

import { compileBlueprintToDSL } from "../compiler/blueprint-to-dsl";
import { validateDSL } from "./validate-dsl";
import type { UIBlueprint } from "../types/blueprint";

const blueprint: UIBlueprint = {
  version: "1.0",
  pageType: "landing",
  intent: "saas",
  theme: {
    mode: "light",
    style: "modern",
  },
  sections: [
    { id: "sec_navbar", type: "navbar", priority: 1, required: true },
    { id: "sec_hero", type: "hero", priority: 2, required: true },
    { id: "sec_features", type: "feature_grid", priority: 3, required: true },
    { id: "sec_cta", type: "cta", priority: 4, required: true },
    { id: "sec_footer", type: "footer", priority: 5, required: true },
  ],
};

const dsl = compileBlueprintToDSL(blueprint, {
  documentId: "doc_test_001",
  documentName: "Test Landing Page",
  sourcePrompt: "Build a modern landing page for an AI website generator",
});

const result = validateDSL(dsl);

if (!result.valid) {
  console.error("Validation failed:");
  console.error(result.errors);
} else {
  console.log("Validation passed.");
  console.log(JSON.stringify(result.data, null, 2));
}