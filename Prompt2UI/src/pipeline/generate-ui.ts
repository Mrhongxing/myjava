// src/pipeline/generate-ui.ts

import { generateBlueprintFromLLM } from "../llm/generate-blueprint";
import { compileBlueprintToDSL } from "../compiler/blueprint-to-dsl";

import { normalizeDSL } from "../validator/normalize-dsl";
import { validateDSL } from "../validator/validate-dsl";

import { repairDSL } from "../repair/repair-dsl";

import type { UIDSLDocument } from "../types/dsl";
import type { UIBlueprint } from "../types/blueprint";

export interface GenerateUIOptions {
  documentId?: string;
  documentName?: string;
  repairAttempts?: number;
  rebuildAttempts?: number;
}

export interface GenerateUIResult {
  blueprint: UIBlueprint;
  dsl: UIDSLDocument;
}

async function rebuildDSLFromBlueprint(
  blueprint: UIBlueprint,
  prompt: string,
  options: GenerateUIOptions,
  attempt: number
): Promise<UIDSLDocument> {
  console.warn(`[pipeline] attempting DSL rebuild (attempt ${attempt})`);

  const compiled = compileBlueprintToDSL(blueprint, {
    documentId: options.documentId,
    documentName: options.documentName,
    sourcePrompt: prompt,
  });

  return normalizeDSL(compiled);
}

export async function generateUI(
  prompt: string,
  options: GenerateUIOptions = {}
): Promise<GenerateUIResult> {

  const repairAttempts = Math.max(0, options.repairAttempts ?? 1);
  const rebuildAttempts = Math.max(0, options.rebuildAttempts ?? 1);

  console.log("[pipeline] generating blueprint...");
  const blueprint = await generateBlueprintFromLLM(prompt);

  console.log("[pipeline] compiling blueprint to DSL...");
  const compiled = compileBlueprintToDSL(blueprint, {
    documentId: options.documentId,
    documentName: options.documentName,
    sourcePrompt: prompt,
  });

  console.log("[pipeline] normalizing DSL...");
  let currentDSL = normalizeDSL(compiled);

  console.log("[pipeline] validating DSL...");
  let validation = validateDSL(currentDSL);

  // -------- Repair Stage --------
  for (let attempt = 1; !validation.valid && attempt <= repairAttempts; attempt++) {

    console.warn(`[pipeline] validation failed → attempting repair (${attempt})`);
    console.warn(validation.errors);

    currentDSL = repairDSL(currentDSL);
    validation = validateDSL(currentDSL);
  }

  // -------- Rebuild Stage --------
  for (let attempt = 1; !validation.valid && attempt <= rebuildAttempts; attempt++) {

    console.warn(`[pipeline] repair failed → attempting rebuild (${attempt})`);

    currentDSL = await rebuildDSLFromBlueprint(
      blueprint,
      prompt,
      options,
      attempt
    );

    validation = validateDSL(currentDSL);
  }

  if (!validation.valid) {
    console.error("[pipeline] DSL validation failed completely");
    console.error(validation.errors);

    throw new Error(
      "DSL validation failed after repair and rebuild attempts:\n" +
        validation.errors.join("\n")
    );
  }

  console.log("[pipeline] UI generation complete");

  return {
    blueprint,
    dsl: validation.data,
  };
}