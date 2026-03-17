// src/validator/normalize-dsl.ts

import type {
  UIBlueprint,
  SectionPlan,
  PageType as BlueprintPageType,
  PageIntent,
  SectionType,
} from "../types/blueprint";

import type {
  DSLNode,
  NodeEvents,
  NodeMeta,
  NodeProps,
  NodeStyle,
  UIDSLDocument,
  LayoutMode,
  Direction,
  WrapMode,
  AlignItems,
  JustifyContent,
  Overflow,
  FontWeight,
  LineHeight,
  TextAlign,
  BorderStyleType,
  EventAction,
  NodeType,
  NodeRole,
  UIDocumentInfo,
  UIDocumentTimestamps,
  DesignSystemRef,
  ResponsiveRule,
  EditingConfig,
  ValidationConfig,
  ThemeMode,
} from "../types/dsl";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  return isObject(value) ? value : undefined;
}

function asArray<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function asEnum<T extends string>(
  value: unknown,
  allowed: readonly T[]
): T | undefined {
  return typeof value === "string" && allowed.includes(value as T)
    ? (value as T)
    : undefined;
}

function cleanUndefined<T extends object>(obj: T): T {
  const entries = Object.entries(obj).filter(([, v]) => v !== undefined);
  return Object.fromEntries(entries) as T;
}

const BLUEPRINT_PAGE_TYPES = [
  "landing",
  "dashboard",
  "form",
  "blog",
  "portfolio",
  "marketing",
  "unknown",
] as const satisfies readonly BlueprintPageType[];

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

const THEME_MODES = ["light", "dark"] as const satisfies readonly ThemeMode[];

const THEME_STYLES = [
  "minimal",
  "modern",
  "playful",
  "enterprise",
  "editorial",
] as const;

const THEME_DENSITIES = ["compact", "comfortable", "spacious"] as const;

const CONTENT_TONES = [
  "professional",
  "friendly",
  "bold",
  "technical",
] as const;

const NODE_UPDATE_MODES = ["replace", "patch"] as const;

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

const LAYOUT_MODES = [
  "flex",
  "grid",
  "stack",
  "none",
] as const satisfies readonly LayoutMode[];

const DIRECTIONS = ["row", "column"] as const satisfies readonly Direction[];

const WRAPS = ["wrap", "nowrap"] as const satisfies readonly WrapMode[];

const ALIGN_ITEMS = [
  "start",
  "center",
  "end",
  "stretch",
] as const satisfies readonly AlignItems[];

const JUSTIFY_CONTENT = [
  "start",
  "center",
  "end",
  "spaceBetween",
  "spaceAround",
  "spaceEvenly",
] as const satisfies readonly JustifyContent[];

const OVERFLOWS = [
  "visible",
  "hidden",
  "scroll",
] as const satisfies readonly Overflow[];

const FONT_WEIGHTS = [
  "regular",
  "medium",
  "semibold",
  "bold",
] as const satisfies readonly FontWeight[];

const LINE_HEIGHTS = [
  "tight",
  "normal",
  "relaxed",
] as const satisfies readonly LineHeight[];

const TEXT_ALIGNS = [
  "left",
  "center",
  "right",
] as const satisfies readonly TextAlign[];

const BORDER_STYLES = [
  "solid",
  "dashed",
  "none",
] as const satisfies readonly BorderStyleType[];

const POSITION_VALUES = [
  "relative",
  "absolute",
  "sticky",
] as const;

const EVENT_ACTIONS = [
  "navigate",
  "submit_form",
  "scroll_to",
  "open_modal",
  "toggle",
  "custom",
] as const satisfies readonly EventAction[];

function normalizeStyle(style: unknown): NodeStyle | undefined {
  if (!isObject(style)) return undefined;

  const normalized: NodeStyle = {};

  if (isObject(style.layout)) {
    normalized.layout = cleanUndefined({
      mode: asEnum(style.layout.mode, LAYOUT_MODES),
      direction: asEnum(style.layout.direction, DIRECTIONS),
      gap: asString(style.layout.gap) || undefined,
      columns:
        typeof style.layout.columns === "number" ? style.layout.columns : undefined,
      wrap: asEnum(style.layout.wrap, WRAPS),
      alignItems: asEnum(style.layout.alignItems, ALIGN_ITEMS),
      justifyContent: asEnum(style.layout.justifyContent, JUSTIFY_CONTENT),
    });
  }

  if (isObject(style.box)) {
    normalized.box = cleanUndefined({
      width: asString(style.box.width) || undefined,
      height: asString(style.box.height) || undefined,
      minHeight: asString(style.box.minHeight) || undefined,
      maxHeight: asString(style.box.maxHeight) || undefined,
      minWidth: asString(style.box.minWidth) || undefined,
      maxWidth: asString(style.box.maxWidth) || undefined,
      overflow: asEnum(style.box.overflow, OVERFLOWS),
    });
  }

  if (isObject(style.spacing)) {
    normalized.spacing = cleanUndefined({
      padding: asString(style.spacing.padding) || undefined,
      paddingX: asString(style.spacing.paddingX) || undefined,
      paddingY: asString(style.spacing.paddingY) || undefined,
      paddingTop: asString(style.spacing.paddingTop) || undefined,
      paddingRight: asString(style.spacing.paddingRight) || undefined,
      paddingBottom: asString(style.spacing.paddingBottom) || undefined,
      paddingLeft: asString(style.spacing.paddingLeft) || undefined,
      margin: asString(style.spacing.margin) || undefined,
      marginX: asString(style.spacing.marginX) || undefined,
      marginY: asString(style.spacing.marginY) || undefined,
      marginTop: asString(style.spacing.marginTop) || undefined,
      marginRight: asString(style.spacing.marginRight) || undefined,
      marginBottom: asString(style.spacing.marginBottom) || undefined,
      marginLeft: asString(style.spacing.marginLeft) || undefined,
    });
  }

  if (isObject(style.typography)) {
    normalized.typography = cleanUndefined({
      fontSize: asString(style.typography.fontSize) || undefined,
      fontWeight: asEnum(style.typography.fontWeight, FONT_WEIGHTS),
      lineHeight: asEnum(style.typography.lineHeight, LINE_HEIGHTS),
      textAlign: asEnum(style.typography.textAlign, TEXT_ALIGNS),
      color: asString(style.typography.color) || undefined,
    });
  }

  if (isObject(style.background)) {
    normalized.background = cleanUndefined({
      color: asString(style.background.color) || undefined,
      image: asString(style.background.image) || undefined,
    });
  }

  if (isObject(style.border)) {
    normalized.border = cleanUndefined({
      radius: asString(style.border.radius) || undefined,
      width: asString(style.border.width) || undefined,
      color: asString(style.border.color) || undefined,
      style: asEnum(style.border.style, BORDER_STYLES),
    });
  }

  if (isObject(style.effects)) {
    normalized.effects = cleanUndefined({
      shadow: asString(style.effects.shadow) || undefined,
      opacity:
        typeof style.effects.opacity === "number"
          ? style.effects.opacity
          : undefined,
    });
  }

  if (isObject(style.position)) {
    normalized.position = cleanUndefined({
      position: asEnum(style.position.position, POSITION_VALUES),
      top: asString(style.position.top) || undefined,
      right: asString(style.position.right) || undefined,
      bottom: asString(style.position.bottom) || undefined,
      left: asString(style.position.left) || undefined,
      zIndex:
        typeof style.position.zIndex === "number"
          ? style.position.zIndex
          : undefined,
    });
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

function normalizeEvents(events: unknown): NodeEvents | undefined {
  if (!isObject(events)) return undefined;

  const normalizeEvent = (value: unknown) => {
    if (!isObject(value)) return undefined;

    const action = asEnum(value.action, EVENT_ACTIONS);
    if (!action) return undefined;

    return cleanUndefined({
      action,
      target: asString(value.target) || undefined,
      payload: asObject(value.payload),
    });
  };

  const normalized = cleanUndefined({
    onClick: normalizeEvent(events.onClick),
    onSubmit: normalizeEvent(events.onSubmit),
  });

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

function normalizeProps(props: unknown): NodeProps | undefined {
  return asObject(props);
}

function normalizeMeta(meta: unknown): NodeMeta | undefined {
  return asObject(meta);
}

function normalizeBindings(bindings: unknown): Record<string, string> | undefined {
  if (!isObject(bindings)) return undefined;

  const normalized: Record<string, string> = {};

  for (const [key, value] of Object.entries(bindings)) {
    if (typeof value === "string") {
      normalized[key] = value;
    }
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

function normalizeChildren(children: unknown): DSLNode[] | undefined {
  const arr = asArray(children)
    .map((child) => normalizeNode(child))
    .filter((child): child is DSLNode => child !== null);

  return arr.length > 0 ? arr : undefined;
}

function normalizeNode(node: unknown): DSLNode | null {
  if (!isObject(node)) return null;

  const id =
    typeof node.id === "string" && node.id.trim()
      ? node.id
      : `node_${Math.random().toString(36).slice(2, 10)}`;

  const type = asEnum(node.type, NODE_TYPES) ?? "container";
  const role = asEnum(node.role, NODE_ROLES);

  const normalized: DSLNode = cleanUndefined({
    id,
    type,
    name: asString(node.name) || undefined,
    role,
    props: normalizeProps(node.props),
    style: normalizeStyle(node.style),
    events: normalizeEvents(node.events),
    bindings: normalizeBindings(node.bindings),
    meta: normalizeMeta(node.meta),
    children: normalizeChildren(node.children),
  });

  return normalized;
}

function normalizeDocumentInfo(document: unknown): UIDocumentInfo {
  const doc = asObject(document) ?? {};

  return cleanUndefined({
    id:
      typeof doc.id === "string" && doc.id.trim()
        ? doc.id
        : "doc_normalized",
    name:
      typeof doc.name === "string" && doc.name.trim()
        ? doc.name
        : "Normalized UI Document",
    description: asString(doc.description) || undefined,
  });
}

function normalizeTimestamps(
  timestamps: unknown
): UIDocumentTimestamps | undefined {
  const ts = asObject(timestamps);
  if (!ts) return undefined;

  const normalized = cleanUndefined({
    createdAt: asString(ts.createdAt) || undefined,
    updatedAt: asString(ts.updatedAt) || undefined,
  });

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

function normalizeBlueprint(blueprint: unknown): UIBlueprint | undefined {
  const bp = asObject(blueprint);
  if (!bp) return undefined;

  const sections: SectionPlan[] = asArray<Record<string, unknown>>(bp.sections)
    .map((section, index): SectionPlan => {
      const type = asEnum(section.type, SECTION_TYPES) ?? "custom";

      return cleanUndefined({
        id:
          typeof section.id === "string" && section.id.trim()
            ? section.id
            : `section_${index + 1}`,
        type,
        name: asString(section.name) || undefined,
        purpose: asString(section.purpose) || undefined,
        priority:
          typeof section.priority === "number" ? section.priority : undefined,
        required:
          typeof section.required === "boolean" ? section.required : undefined,
        constraints: isObject(section.constraints)
          ? cleanUndefined({
              preserveOrder:
                typeof section.constraints.preserveOrder === "boolean"
                  ? section.constraints.preserveOrder
                  : undefined,
              preserveLayout:
                typeof section.constraints.preserveLayout === "boolean"
                  ? section.constraints.preserveLayout
                  : undefined,
            })
          : undefined,
      });
    });

  const notes = asArray(bp.notes).filter(
    (v): v is string => typeof v === "string"
  );

  const theme = isObject(bp.theme)
    ? cleanUndefined({
        mode: asEnum(bp.theme.mode, THEME_MODES),
        style: asEnum(bp.theme.style, THEME_STYLES),
        primaryColor: asString(bp.theme.primaryColor) || undefined,
        radius: asString(bp.theme.radius) || undefined,
        density: asEnum(bp.theme.density, THEME_DENSITIES),
      })
    : undefined;

  const content = isObject(bp.content)
    ? cleanUndefined({
        tone: asEnum(bp.content.tone, CONTENT_TONES),
        audience: asString(bp.content.audience) || undefined,
        primaryGoal: asString(bp.content.primaryGoal) || undefined,
        callToAction: asString(bp.content.callToAction) || undefined,
      })
    : undefined;

  const result: UIBlueprint = {
    version: "1.0",
    pageType: asEnum(bp.pageType, BLUEPRINT_PAGE_TYPES) ?? "unknown",
    intent: asEnum(bp.intent, PAGE_INTENTS) ?? "unknown",
    sections,
    ...(theme ? { theme } : {}),
    ...(content ? { content } : {}),
    ...(notes.length > 0 ? { notes } : {}),
  };

  return result;
}

function normalizeDesignSystem(
  designSystem: unknown
): DesignSystemRef | undefined {
  const ds = asObject(designSystem);
  if (!ds) return undefined;

  return cleanUndefined({
    tokensRef: asString(ds.tokensRef) || undefined,
    theme: isObject(ds.theme)
      ? cleanUndefined({
          mode: asEnum(ds.theme.mode, THEME_MODES),
          preset: asString(ds.theme.preset) || undefined,
        })
      : undefined,
    overrides: asObject(ds.overrides) as
      | Record<string, string | number | boolean>
      | undefined,
  });
}

function normalizeResponsive(
  responsive: unknown
): { breakpointsRef?: string; rules?: ResponsiveRule[] } | undefined {
  const rs = asObject(responsive);
  if (!rs) return undefined;

  const rules: ResponsiveRule[] = asArray<Record<string, unknown>>(rs.rules)
    .map((rule): ResponsiveRule => {
      const mobile = normalizeStyle(rule.mobile);
      const tablet = normalizeStyle(rule.tablet);
      const desktop = normalizeStyle(rule.desktop);

      return {
        target: asString(rule.target),
        ...(mobile ? { mobile } : {}),
        ...(tablet ? { tablet } : {}),
        ...(desktop ? { desktop } : {}),
      };
    })
    .filter((rule) => Boolean(rule.target));

  const result = {
    ...(asString(rs.breakpointsRef)
      ? { breakpointsRef: asString(rs.breakpointsRef) }
      : {}),
    ...(rules.length > 0 ? { rules } : {}),
  };

  return Object.keys(result).length > 0 ? result : undefined;
}

function normalizeEditing(editing: unknown): EditingConfig | undefined {
  const ed = asObject(editing);
  if (!ed) return undefined;

  return cleanUndefined({
    editable: typeof ed.editable === "boolean" ? ed.editable : undefined,
    nodeUpdateMode: asEnum(ed.nodeUpdateMode, NODE_UPDATE_MODES),
  });
}

function normalizeValidation(validation: unknown): ValidationConfig | undefined {
  const v = asObject(validation);
  if (!v) return undefined;

  return cleanUndefined({
    schema: asString(v.schema) || undefined,
    strict: typeof v.strict === "boolean" ? v.strict : undefined,
  });
}

export function normalizeDSL(input: unknown): UIDSLDocument {
  const obj = asObject(input) ?? {};

  const pageNode = normalizeNode(obj.page);

  const page: UIDSLDocument["page"] =
    pageNode && pageNode.type === "page"
      ? (pageNode as UIDSLDocument["page"])
      : {
          id: "page_root",
          type: "page",
          role: "root",
          props: {
            title: "Normalized Page",
          },
          children: pageNode ? [pageNode] : [],
        };

  const document = normalizeDocumentInfo(obj.document);
  const timestamps = normalizeTimestamps(obj.timestamps);
  const sourcePrompt = asString(obj.sourcePrompt) || undefined;
  const blueprint = normalizeBlueprint(obj.blueprint);
  const designSystem = normalizeDesignSystem(obj.designSystem);
  const responsive = normalizeResponsive(obj.responsive);
  const editing = normalizeEditing(obj.editing);
  const validation = normalizeValidation(obj.validation);
  const meta = normalizeMeta(obj.meta);

  const result: UIDSLDocument = {
    version: "1.1",
    kind: "ui_document",
    document,
    page,
    ...(timestamps ? { timestamps } : {}),
    ...(sourcePrompt ? { sourcePrompt } : {}),
    ...(blueprint ? { blueprint } : {}),
    ...(designSystem ? { designSystem } : {}),
    ...(responsive ? { responsive } : {}),
    ...(editing ? { editing } : {}),
    ...(validation ? { validation } : {}),
    ...(meta ? { meta } : {}),
  };

  return result;
}