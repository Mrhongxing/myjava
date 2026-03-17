// src/validator/test-normalize-dsl.ts

import { normalizeDSL } from "./normalize-dsl";
import { validateDSL } from "./validate-dsl";

const raw = {
  version: "1.1",
  kind: "ui_document",
  document: {
    id: "doc_messy_001",
    name: "Messy Input Example",
  },
  page: {
    id: "root",
    type: "page",
    children: [
      {
        id: "hero_1",
        type: "hero",
        props: {
          headline: "Build websites with structure",
        },
      },
      {
        type: "cta",
        props: {
          headline: "Start now",
        },
        events: {
          onClick: {
            action: "navigate",
            target: "/signup",
          },
        },
      },
      "this is invalid child"
    ],
  },
};

const normalized = normalizeDSL(raw);
console.log("Normalized:");
console.log(JSON.stringify(normalized, null, 2));

const result = validateDSL(normalized);

if (!result.valid) {
  console.error("Validation failed:");
  console.error(result.errors);
} else {
  console.log("Validation passed.");
}