// src/types/blueprint.ts

export type BlueprintVersion = "1.0";

export const PAGE_TYPES = [
  "landing",
  "dashboard",
  "form",
  "blog",
  "portfolio",
  "marketing",
  "unknown",
] as const;

export type PageType = (typeof PAGE_TYPES)[number];

export const PAGE_INTENTS = [
  "product_promo",
  "saas",
  "personal_brand",
  "content",
  "ecommerce",
  "unknown",
] as const;

export type PageIntent = (typeof PAGE_INTENTS)[number];

export const SECTION_TYPES = [
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
] as const;

export type SectionType = (typeof SECTION_TYPES)[number];

export const THEME_MODES = ["light", "dark"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export const THEME_STYLES = [
  "minimal",
  "modern",
  "playful",
  "enterprise",
  "editorial",
] as const;
export type ThemeStyle = (typeof THEME_STYLES)[number];

export const THEME_DENSITIES = [
  "compact",
  "comfortable",
  "spacious",
] as const;
export type ThemeDensity = (typeof THEME_DENSITIES)[number];

export const CONTENT_TONES = [
  "professional",
  "friendly",
  "bold",
  "technical",
] as const;
export type ContentTone = (typeof CONTENT_TONES)[number];

export interface SectionConstraints {
  preserveOrder?: boolean;
  preserveLayout?: boolean;
}

export interface SectionPlan {
  id: string;
  type: SectionType;
  name?: string;
  purpose?: string;
  priority?: number;
  required?: boolean;
  constraints?: SectionConstraints;
}

export interface ThemePlan {
  mode?: ThemeMode;
  style?: ThemeStyle;
  primaryColor?: string;
  radius?: string;
  density?: ThemeDensity;
}

export interface ContentPlan {
  tone?: ContentTone;
  audience?: string;
  primaryGoal?: string;
  callToAction?: string;
}

export interface UIBlueprint {
  version: BlueprintVersion;
  pageType: PageType;
  intent: PageIntent;
  theme?: ThemePlan;
  content?: ContentPlan;
  sections: SectionPlan[];
  notes?: string[];
}

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
  "pageType": "landing | dashboard | form | blog | portfolio | marketing | unknown",
  "intent": "product_promo | saas | personal_brand | content | ecommerce | unknown",
  "theme": {
    "mode": "light | dark",
    "style": "minimal | modern | playful | enterprise | editorial",
    "primaryColor": "string",
    "radius": "string",
    "density": "compact | comfortable | spacious"
  },
  "content": {
    "tone": "professional | friendly | bold | technical",
    "audience": "string",
    "primaryGoal": "string",
    "callToAction": "string"
  },
  "sections": [
    {
      "id": "string",
      "type": "navbar | hero | feature_grid | feature_list | pricing | testimonial | faq | cta | contact_form | footer | custom",
      "priority": 1,
      "required": true
    }
  ],
  "notes": ["string"]
}

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

function asNonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const arr = value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);

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

function asOptionalEnum<T extends string>(
  value: unknown,
  allowed: readonly T[]
): T | undefined {
  if (value === undefined) return undefined;
  return asEnum(value, allowed, allowed[0]);
}

function normalizeSectionPlan(section: unknown, index: number): SectionPlan {
  const s = isObject(section) ? section : {};

  const id = asNonEmptyString(s.id) ?? `sec_${index + 1}`;
  const type = asEnum(s.type, SECTION_TYPES, "custom");

  const constraints = isObject(s.constraints)
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
    : undefined;

  return {
    id,
    type,
    name: asNonEmptyString(s.name),
    purpose: asNonEmptyString(s.purpose),
    priority: typeof s.priority === "number" ? s.priority : index + 1,
    required: typeof s.required === "boolean" ? s.required : true,
    constraints,
  };
}

function normalizeThemePlan(theme: unknown): ThemePlan | undefined {
  if (!isObject(theme)) return undefined;

  return {
    mode:
      theme.mode !== undefined
        ? asEnum(theme.mode, THEME_MODES, "light")
        : undefined,
    style:
      theme.style !== undefined
        ? asEnum(theme.style, THEME_STYLES, "modern")
        : undefined,
    primaryColor: asNonEmptyString(theme.primaryColor),
    radius: asNonEmptyString(theme.radius),
    density:
      theme.density !== undefined
        ? asEnum(theme.density, THEME_DENSITIES, "comfortable")
        : undefined,
  };
}

function normalizeContentPlan(content: unknown): ContentPlan | undefined {
  if (!isObject(content)) return undefined;

  return {
    tone:
      content.tone !== undefined
        ? asEnum(content.tone, CONTENT_TONES, "professional")
        : undefined,
    audience: asNonEmptyString(content.audience),
    primaryGoal: asNonEmptyString(content.primaryGoal),
    callToAction: asNonEmptyString(content.callToAction),
  };
}

export function normalizeBlueprint(input: unknown): UIBlueprint {
  const obj = isObject(input) ? input : {};

  const rawSections = Array.isArray(obj.sections) ? obj.sections : [];
  const sections = rawSections.map(normalizeSectionPlan);

  sections.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

  return {
    version: "1.0",
    pageType: asEnum(obj.pageType, PAGE_TYPES, "unknown"),
    intent: asEnum(obj.intent, PAGE_INTENTS, "unknown"),
    theme: normalizeThemePlan(obj.theme),
    content: normalizeContentPlan(obj.content),
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