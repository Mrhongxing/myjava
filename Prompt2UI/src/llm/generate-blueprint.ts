// src/llm/generate-blueprint.ts

import type {
  UIBlueprint,
  PageType,
  PageIntent,
  SectionType,
  SectionPlan,
} from "../types/blueprint";

const MODEL_URL =
  "https://uu896842-a9aa-ae4cd053.westc.seetacloud.com:8443/v1/chat/completions";

const MODEL_NAME = "/root/autodl-tmp/qwen-7B";

const BLUEPRINT_SYSTEM_PROMPT = `
You are a UI planning model.

Your task:
Convert the user's website request into a valid JSON blueprint.

Hard rules:
1. Output JSON only.
2. Do not wrap the JSON in markdown.
3. Do not add explanations.
4. Follow this schema exactly:
{
  "version": "1.0",
  "pageType": "string",
  "intent": "string",
  "theme": {
    "mode": "light",
    "style": "string",
    "primaryColor": "string",
    "radius": "string",
    "density": "string"
  },
  "content": {
    "tone": "string",
    "audience": "string",
    "primaryGoal": "string",
    "callToAction": "string"
  },
  "sections": [
    {
      "id": "string",
      "type": "string",
      "priority": 1,
      "required": true
    }
  ],
  "notes": ["string"]
}

Allowed section types:
navbar, hero, feature_grid, feature_list, pricing, faq, testimonial, cta, contact_form, footer

Constraints:
- version must be "1.0"
- sections must be sorted by priority ascending
- ids must be simple and stable, such as "sec_navbar", "sec_hero"
- required should usually be true for core sections
- keep output practical and concise
`;

function extractJson(text: string): string {
  const trimmed = text.trim();

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  return trimmed;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const arr = value.filter((v): v is string => typeof v === "string");
  return arr.length > 0 ? arr : undefined;
}

function asEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T
): T {
  return typeof value === "string" && allowed.includes(value as T)
    ? (value as T)
    : fallback;
}

const PAGE_TYPES = [
  "landing",
  "dashboard",
  "form",
  "blog",
  "portfolio",
  "marketing",
  "unknown",
] as const satisfies readonly PageType[];

const PAGE_INTENTS = [
  "product_promo",
  "saas",
  "personal_brand",
  "content",
  "ecommerce",
  "unknown",
] as const satisfies readonly PageIntent[];

const SECTION_TYPES = [
  "navbar",
  "hero",
  "feature_grid",
  "feature_list",
  "pricing",
  "testimonial",
  "faq",
  "cta",
  "contact_form",
  "footer",
  "custom",
] as const satisfies readonly SectionType[];

const THEME_MODES = ["light", "dark"] as const;
const THEME_STYLES = [
  "minimal",
  "modern",
  "playful",
  "enterprise",
  "editorial",
] as const;
const THEME_DENSITIES = ["compact", "comfortable", "spacious"] as const;
const CONTENT_TONES = ["professional", "friendly", "bold", "technical"] as const;

export function normalizeBlueprint(input: unknown): UIBlueprint {
  const obj = isObject(input) ? input : {};

  const rawTheme = isObject(obj.theme) ? obj.theme : undefined;
  const rawContent = isObject(obj.content) ? obj.content : undefined;

  const rawSections = Array.isArray(obj.sections) ? obj.sections : [];
  const sections: SectionPlan[] = rawSections.map((section, index) => {
    const s = isObject(section) ? section : {};

    return {
      id:
        typeof s.id === "string" && s.id.trim()
          ? s.id
          : `sec_${index + 1}`,
      type: asEnum(s.type, SECTION_TYPES, "custom"),
      name: typeof s.name === "string" ? s.name : undefined,
      purpose: typeof s.purpose === "string" ? s.purpose : undefined,
      priority: typeof s.priority === "number" ? s.priority : index + 1,
      required: typeof s.required === "boolean" ? s.required : true,
      constraints: isObject(s.constraints)
        ? {
            preserveOrder:
              typeof s.constraints.preserveOrder === "boolean"
                ? s.constraints.preserveOrder
                : undefined,
            preserveLayout:
              typeof s.constraints.preserveLayout === "boolean"
                ? s.constraints.preserveLayout
                : undefined,
          }
        : undefined,
    };
  });

  sections.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

  return {
    version: "1.0",
    pageType: asEnum(obj.pageType, PAGE_TYPES, "unknown"),
    intent: asEnum(obj.intent, PAGE_INTENTS, "unknown"),
    theme: rawTheme
      ? {
          mode:
            rawTheme.mode !== undefined
              ? asEnum(rawTheme.mode, ["light", "dark"] as const, "light")
              : undefined,
          style:
            rawTheme.style !== undefined
              ? asEnum(rawTheme.style, THEME_STYLES, "modern")
              : undefined,
          primaryColor: asString(rawTheme.primaryColor) || undefined,
          radius: asString(rawTheme.radius) || undefined,
          density:
            rawTheme.density !== undefined
              ? asEnum(rawTheme.density, THEME_DENSITIES, "comfortable")
              : undefined,
        }
      : undefined,
    content: rawContent
      ? {
          tone:
            rawContent.tone !== undefined
              ? asEnum(rawContent.tone, CONTENT_TONES, "professional")
              : undefined,
          audience: asString(rawContent.audience) || undefined,
          primaryGoal: asString(rawContent.primaryGoal) || undefined,
          callToAction: asString(rawContent.callToAction) || undefined,
        }
      : undefined,
    sections,
    notes: asStringArray(obj.notes),
  };
}

export async function generateBlueprintFromLLM(
  userPrompt: string
): Promise<UIBlueprint> {
  const response = await fetch(MODEL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: BLUEPRINT_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`LLM request failed: ${response.status} ${errText}`);
  }

  const data = await response.json();
  const rawContent = data?.choices?.[0]?.message?.content;

  if (!rawContent || typeof rawContent !== "string") {
    throw new Error("LLM returned empty or invalid message content");
  }

  const jsonText = extractJson(rawContent);

  try {
    const parsed = JSON.parse(jsonText) as unknown;
    return normalizeBlueprint(parsed);
  } catch (err) {
    throw new Error(
      `Failed to parse blueprint JSON.\nRaw content:\n${rawContent}\n\nError: ${String(err)}`
    );
  }
}