// src/validator/validate-dsl.ts

import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";

import schema from "../../schemas/ui-dsl.schema.json";
import type { UIDSLDocument } from "../types/dsl";

const ajv = new Ajv({
  allErrors: true,
  strict: false,
});

addFormats(ajv);

const validate = ajv.compile<UIDSLDocument>(schema);

export interface ValidationSuccess {
  valid: true;
  data: UIDSLDocument;
}

export interface ValidationFailure {
  valid: false;
  errors: string[];
}

export type ValidationResult = ValidationSuccess | ValidationFailure;

function formatAjvErrors(errors: ErrorObject[] | null | undefined): string[] {
  if (!errors || errors.length === 0) {
    return ["Unknown schema validation error"];
  }

  return errors.map((error) => {
    const path = error.instancePath || "/";
    const message = error.message || "invalid value";
    return `${path} ${message}`;
  });
}

export function validateDSL(document: unknown): ValidationResult {
  const valid = validate(document);

  if (!valid) {
    return {
      valid: false,
      errors: formatAjvErrors(validate.errors),
    };
  }

  return {
    valid: true,
    data: document as UIDSLDocument,
  };
}

export function assertValidDSL(document: unknown): UIDSLDocument {
  const result = validateDSL(document);

  if (!result.valid) {
    throw new Error(
      `DSL validation failed:\n${result.errors.map((e) => `- ${e}`).join("\n")}`
    );
  }

  return result.data;
}