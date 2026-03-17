// src/inference/component-inference.ts

import type { SectionPlan, SectionType, UIBlueprint } from "../types/blueprint";
import type { NodeType } from "../types/dsl";

export interface ComponentInferenceInput {
  section: SectionPlan;
  blueprint?: UIBlueprint;
  prompt?: string;
}

export interface ComponentInferenceResult {
  componentType: NodeType;
  confidence: number;
  reason: string;
}

function normalizeText(value?: string): string {
  return (value ?? "").trim().toLowerCase();
}

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function inferFromSectionType(sectionType: SectionType): ComponentInferenceResult {
  switch (sectionType) {
    case "navbar":
      return {
        componentType: "navbar",
        confidence: 0.98,
        reason: "section.type directly maps to navbar",
      };

    case "hero":
      return {
        componentType: "hero",
        confidence: 0.98,
        reason: "section.type directly maps to hero",
      };

    case "feature_grid":
      return {
        componentType: "feature_grid",
        confidence: 0.97,
        reason: "section.type directly maps to feature_grid",
      };

    case "feature_list":
      return {
        componentType: "list",
        confidence: 0.9,
        reason: "feature_list is currently rendered by list",
      };

    case "pricing":
      return {
        componentType: "pricing",
        confidence: 0.97,
        reason: "section.type directly maps to pricing",
      };

    case "testimonial":
      return {
        componentType: "testimonial",
        confidence: 0.97,
        reason: "section.type directly maps to testimonial",
      };

    case "faq":
      return {
        componentType: "list",
        confidence: 0.86,
        reason: "faq is currently downgraded to list representation",
      };

    case "cta":
      return {
        componentType: "cta",
        confidence: 0.97,
        reason: "section.type directly maps to cta",
      };

    case "contact_form":
      return {
        componentType: "form",
        confidence: 0.96,
        reason: "section.type directly maps to form",
      };

    case "footer":
      return {
        componentType: "footer",
        confidence: 0.98,
        reason: "section.type directly maps to footer",
      };

    case "custom":
    default:
      return {
        componentType: "container",
        confidence: 0.4,
        reason: "unknown custom section falls back to container",
      };
  }
}

function inferFromPurpose(section: SectionPlan): ComponentInferenceResult | null {
  const purpose = normalizeText(section.purpose);
  const name = normalizeText(section.name);

  const combined = `${purpose} ${name}`.trim();

  if (!combined) return null;

  if (includesAny(combined, ["pricing", "plan", "subscription", "tier"])) {
    return {
      componentType: "pricing",
      confidence: 0.84,
      reason: "purpose/name suggests pricing content",
    };
  }

  if (includesAny(combined, ["testimonial", "review", "customer", "social proof"])) {
    return {
      componentType: "testimonial",
      confidence: 0.84,
      reason: "purpose/name suggests testimonial content",
    };
  }

  if (includesAny(combined, ["hero", "headline", "banner", "intro"])) {
    return {
      componentType: "hero",
      confidence: 0.82,
      reason: "purpose/name suggests hero section",
    };
  }

  if (includesAny(combined, ["faq", "question", "answer"])) {
    return {
      componentType: "list",
      confidence: 0.8,
      reason: "purpose/name suggests faq-like content",
    };
  }

  if (includesAny(combined, ["contact", "lead", "demo request", "form"])) {
    return {
      componentType: "form",
      confidence: 0.82,
      reason: "purpose/name suggests form interaction",
    };
  }

  if (includesAny(combined, ["feature", "benefit", "capability"])) {
    return {
      componentType: "feature_grid",
      confidence: 0.8,
      reason: "purpose/name suggests feature section",
    };
  }

  if (includesAny(combined, ["call to action", "signup", "sign up", "start now", "get started"])) {
    return {
      componentType: "cta",
      confidence: 0.81,
      reason: "purpose/name suggests CTA section",
    };
  }

  return null;
}

function inferFromBlueprintContext(
  section: SectionPlan,
  blueprint?: UIBlueprint
): ComponentInferenceResult | null {
  if (!blueprint) return null;

  const intent = normalizeText(blueprint.intent);
  const pageType = normalizeText(blueprint.pageType);

  if (section.type === "custom") {
    if (intent === "saas" || intent === "product_promo") {
      return {
        componentType: "container",
        confidence: 0.55,
        reason: "custom section in SaaS/product promo page defaults to generic container",
      };
    }

    if (pageType === "portfolio") {
      return {
        componentType: "container",
        confidence: 0.52,
        reason: "custom section in portfolio page defaults to generic container",
      };
    }
  }

  return null;
}

function inferFromPrompt(prompt?: string): ComponentInferenceResult | null {
  const text = normalizeText(prompt);
  if (!text) return null;

  if (includesAny(text, ["pricing", "subscription", "monthly", "annual"])) {
    return {
      componentType: "pricing",
      confidence: 0.68,
      reason: "prompt mentions pricing-related intent",
    };
  }

  if (includesAny(text, ["testimonial", "customer story", "reviews"])) {
    return {
      componentType: "testimonial",
      confidence: 0.67,
      reason: "prompt mentions testimonial-related intent",
    };
  }

  if (includesAny(text, ["hero", "headline", "landing page banner"])) {
    return {
      componentType: "hero",
      confidence: 0.66,
      reason: "prompt mentions hero-like section",
    };
  }

  if (includesAny(text, ["faq", "questions", "answers"])) {
    return {
      componentType: "list",
      confidence: 0.63,
      reason: "prompt mentions faq-like content",
    };
  }

  if (includesAny(text, ["contact form", "book a demo", "lead form"])) {
    return {
      componentType: "form",
      confidence: 0.66,
      reason: "prompt mentions form-like interaction",
    };
  }

  return null;
}

export function inferComponentType(
  input: ComponentInferenceInput
): ComponentInferenceResult {
  const direct = inferFromSectionType(input.section.type);
  if (direct.confidence >= 0.95) {
    return direct;
  }

  const purposeBased = inferFromPurpose(input.section);
  if (purposeBased && purposeBased.confidence > direct.confidence) {
    return purposeBased;
  }

  const blueprintBased = inferFromBlueprintContext(input.section, input.blueprint);
  if (blueprintBased && blueprintBased.confidence > direct.confidence) {
    return blueprintBased;
  }

  const promptBased = inferFromPrompt(input.prompt);
  if (promptBased && promptBased.confidence > direct.confidence) {
    return promptBased;
  }

  return direct;
}