// src/repair/repair-dsl.ts

import type { UIDSLDocument, DSLNode, NodeType, NodeRole } from "../types/dsl";

function ensureArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value === undefined || value === null) return [];
  return [value as T];
}

function ensureObject(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function generateId(prefix = "node"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

const NODE_TYPES = [
  "page",
  "section",
  "container",
  "text",
  "button",
  "image",
  "input",
  "textarea",
  "card",
  "navbar",
  "footer",
  "hero",
  "feature_grid",
  "feature_item",
  "pricing",
  "pricing_card",
  "testimonial",
  "testimonial_card",
  "cta",
  "form",
  "list",
  "list_item",
  "icon",
  "divider",
  "badge",
  "avatar",
  "link",
  "grid",
  "stack",
  "unknown",
] as const satisfies readonly NodeType[];

const NODE_ROLES = [
  "root",
  "navbar",
  "hero",
  "features",
  "pricing",
  "testimonials",
  "cta",
  "footer",
  "content",
  "sidebar",
  "form",
  "unknown",
] as const satisfies readonly NodeRole[];

function asEnum<T extends string>(
  value: unknown,
  allowed: readonly T[]
): T | undefined {
  return typeof value === "string" && allowed.includes(value as T)
    ? (value as T)
    : undefined;
}

function repairNode(node: unknown): DSLNode | null {
  if (typeof node !== "object" || node === null) return null;

  const n = node as Record<string, unknown>;

  const id =
    typeof n.id === "string" && n.id.length > 0 ? n.id : generateId();

  const type = asEnum(n.type, NODE_TYPES) ?? "container";
  const props = ensureObject(n.props);

  const children = ensureArray(n.children)
    .map((child) => repairNode(child))
    .filter((v): v is DSLNode => v !== null);

  const repaired: DSLNode = {
    id,
    type,
    props,
    children,
  };

  if (typeof n.name === "string") {
    repaired.name = n.name;
  }

  const role = asEnum(n.role, NODE_ROLES);
  if (role) {
    repaired.role = role;
  }

  if (typeof n.style === "object" && n.style !== null && !Array.isArray(n.style)) {
    repaired.style = n.style as DSLNode["style"];
  }

  if (typeof n.events === "object" && n.events !== null && !Array.isArray(n.events)) {
    repaired.events = n.events as DSLNode["events"];
  }

  if (typeof n.bindings === "object" && n.bindings !== null && !Array.isArray(n.bindings)) {
    repaired.bindings = n.bindings as DSLNode["bindings"];
  }

  if (typeof n.meta === "object" && n.meta !== null && !Array.isArray(n.meta)) {
    repaired.meta = n.meta as DSLNode["meta"];
  }

  return repaired;
}

function repairPageNode(page: unknown): UIDSLDocument["page"] {
  const repaired = repairNode(page);

  if (!repaired) {
    return {
      id: "page_root",
      type: "page",
      role: "root",
      props: {},
      children: [],
    };
  }

  if (repaired.type !== "page") {
    return {
      id: "page_root",
      type: "page",
      role: "root",
      props: {},
      children: [repaired],
    };
  }

  return {
    ...repaired,
    type: "page",
  };
}

export function repairDSL(input: unknown): UIDSLDocument {
  const doc =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  const docInfo =
    typeof doc.document === "object" && doc.document !== null
      ? (doc.document as Record<string, unknown>)
      : {};

  const repaired: UIDSLDocument = {
    version: "1.1",
    kind: "ui_document",

    document: {
      id:
        typeof docInfo.id === "string" && docInfo.id.length > 0
          ? docInfo.id
          : "doc_repaired",

      name:
        typeof docInfo.name === "string" && docInfo.name.length > 0
          ? docInfo.name
          : "Repaired Document",
    },

    page: repairPageNode(doc.page),
  };

  if (typeof doc.sourcePrompt === "string") {
    repaired.sourcePrompt = doc.sourcePrompt;
  }

  if (typeof doc.designSystem === "object" && doc.designSystem !== null && !Array.isArray(doc.designSystem)) {
    repaired.designSystem = doc.designSystem as UIDSLDocument["designSystem"];
  }

  if (typeof doc.blueprint === "object" && doc.blueprint !== null && !Array.isArray(doc.blueprint)) {
    repaired.blueprint = doc.blueprint as UIDSLDocument["blueprint"];
  }

  if (typeof doc.timestamps === "object" && doc.timestamps !== null && !Array.isArray(doc.timestamps)) {
    repaired.timestamps = doc.timestamps as UIDSLDocument["timestamps"];
  }

  if (typeof doc.responsive === "object" && doc.responsive !== null && !Array.isArray(doc.responsive)) {
    repaired.responsive = doc.responsive as UIDSLDocument["responsive"];
  }

  if (typeof doc.editing === "object" && doc.editing !== null && !Array.isArray(doc.editing)) {
    repaired.editing = doc.editing as UIDSLDocument["editing"];
  }

  if (typeof doc.validation === "object" && doc.validation !== null && !Array.isArray(doc.validation)) {
    repaired.validation = doc.validation as UIDSLDocument["validation"];
  }

  if (typeof doc.meta === "object" && doc.meta !== null && !Array.isArray(doc.meta)) {
    repaired.meta = doc.meta as UIDSLDocument["meta"];
  }

  return repaired;
}