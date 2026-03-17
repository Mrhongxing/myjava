import { compileBlueprintToDSL } from "./blueprint-to-dsl";
import type { UIBlueprint } from "../types/blueprint";

const blueprint: UIBlueprint = {
  version: "1.0",
  pageType: "landing",
  intent: "saas",
  theme: {
    mode: "light",
    style: "modern",
    primaryColor: "blue.600",
    radius: "xl",
    density: "spacious",
  },
  content: {
    tone: "technical",
    audience: "developers and product teams",
    primaryGoal: "convert visitors into signups",
    callToAction: "Start building",
  },
  sections: [
    { id: "sec_navbar", type: "navbar", priority: 1, required: true },
    { id: "sec_hero", type: "hero", priority: 2, required: true },
    { id: "sec_features", type: "feature_grid", priority: 3, required: true },
    { id: "sec_pricing", type: "pricing", priority: 4, required: false },
    { id: "sec_cta", type: "cta", priority: 5, required: true },
    { id: "sec_footer", type: "footer", priority: 6, required: true },
  ],
};

const dsl = compileBlueprintToDSL(blueprint, {
  documentId: "doc_001",
  documentName: "AI Landing Page",
  sourcePrompt: "Build a modern SaaS landing page",
});

console.log(JSON.stringify(dsl, null, 2));