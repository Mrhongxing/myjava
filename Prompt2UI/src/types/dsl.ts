import type { UIBlueprint } from "./blueprint";
export type DSLVersion = "1.1";

export type DocumentKind = "ui_document";

export type ThemeMode = "light" | "dark";

export type PageType =
  | "landing"
  | "dashboard"
  | "form"
  | "blog"
  | "portfolio"
  | "marketing"
  | "unknown";

export type IntentType =
  | "product_promo"
  | "saas"
  | "personal_brand"
  | "content"
  | "ecommerce"
  | "unknown";

export type NodeType =
  | "page"
  | "section"
  | "container"
  | "text"
  | "button"
  | "image"
  | "input"
  | "textarea"
  | "card"
  | "navbar"
  | "footer"
  | "hero"
  | "feature_grid"
  | "feature_item"
  | "pricing"
  | "pricing_card"
  | "testimonial"
  | "testimonial_card"
  | "cta"
  | "form"
  | "list"
  | "list_item"
  | "icon"
  | "divider"
  | "badge"
  | "avatar"
  | "link"
  | "grid"
  | "stack"
  | "unknown";

export type NodeRole =
  | "root"
  | "navbar"
  | "hero"
  | "features"
  | "pricing"
  | "testimonials"
  | "cta"
  | "footer"
  | "content"
  | "sidebar"
  | "form"
  | "unknown";

export type LayoutMode = "flex" | "grid" | "stack" | "none";
export type Direction = "row" | "column";
export type WrapMode = "wrap" | "nowrap";
export type AlignItems = "start" | "center" | "end" | "stretch";
export type JustifyContent =
  | "start"
  | "center"
  | "end"
  | "spaceBetween"
  | "spaceAround"
  | "spaceEvenly";

export type FontWeight = "regular" | "medium" | "semibold" | "bold";
export type LineHeight = "tight" | "normal" | "relaxed";
export type TextAlign = "left" | "center" | "right";
export type BorderStyleType = "solid" | "dashed" | "none";
export type Overflow = "visible" | "hidden" | "scroll";

export type EventAction =
  | "navigate"
  | "submit_form"
  | "scroll_to"
  | "open_modal"
  | "toggle"
  | "custom";

export type NodeBindings = Record<string, string>;
export type NodeMeta = Record<string, unknown>;
export type NodeProps = Record<string, unknown>;

export interface UIDocumentInfo {
  id: string;
  name: string;
  description?: string;
}

export interface UIDocumentTimestamps {
  createdAt?: string;
  updatedAt?: string;
}

export interface PageBlueprint {
  pageType?: PageType;
  intent?: IntentType;
  sections?: string[];
}

export type ThemeStyle =
  | "minimal"
  | "modern"
  | "playful"
  | "enterprise"
  | "editorial";

export type ThemeDensity = "compact" | "comfortable" | "spacious";

export interface ThemeConfig {
  mode?: ThemeMode;
  preset?: string;
  style?: ThemeStyle;
  primaryColor?: string;
  radius?: string;
  density?: ThemeDensity;
}

export interface DesignSystemRef {
  tokensRef?: string;
  theme?: ThemeConfig;
  overrides?: Record<string, string | number | boolean>;
}

export interface LayoutStyle {
  mode?: LayoutMode;
  direction?: Direction;
  gap?: string;
  columns?: number;
  wrap?: WrapMode;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
}

export interface BoxStyle {
  width?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  overflow?: Overflow;
}

export interface SpacingStyle {
  padding?: string;
  paddingX?: string;
  paddingY?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginX?: string;
  marginY?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
}

export interface TypographyStyle {
  fontSize?: string;
  fontWeight?: FontWeight;
  lineHeight?: LineHeight;
  textAlign?: TextAlign;
  color?: string;
}

export interface BackgroundStyle {
  color?: string;
  image?: string;
}

export interface BorderStyle {
  radius?: string;
  width?: string;
  color?: string;
  style?: BorderStyleType;
}

export interface EffectsStyle {
  shadow?: string;
  opacity?: number;
}

export interface PositionStyle {
  position?: "relative" | "absolute" | "sticky";
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
}

export interface NodeStyle {
  layout?: LayoutStyle;
  box?: BoxStyle;
  spacing?: SpacingStyle;
  typography?: TypographyStyle;
  background?: BackgroundStyle;
  border?: BorderStyle;
  effects?: EffectsStyle;
  position?: PositionStyle;
}

export interface ResponsiveRule {
  target: string;
  mobile?: Partial<NodeStyle>;
  tablet?: Partial<NodeStyle>;
  desktop?: Partial<NodeStyle>;
}

export interface NodeEvent {
  action: EventAction;
  target?: string;
  payload?: Record<string, unknown>;
}

export interface NodeEvents {
  onClick?: NodeEvent;
  onSubmit?: NodeEvent;
}

export interface BaseNode {
  id: string;
  type: NodeType;
  name?: string;
  role?: NodeRole;
  props?: NodeProps;
  style?: NodeStyle;
  events?: NodeEvents;
  bindings?: NodeBindings;
  meta?: NodeMeta;
  children?: DSLNode[];
}

export interface PageNode extends BaseNode {
  type: "page";
}

export type DSLNode = BaseNode | PageNode;

export interface EditingConfig {
  editable?: boolean;
  nodeUpdateMode?: "replace" | "patch";
}

export interface ValidationConfig {
  schema?: string;
  strict?: boolean;
}

export interface UIDSLDocument {
  version: DSLVersion;
  kind: DocumentKind;

  document: UIDocumentInfo;

  timestamps?: UIDocumentTimestamps;

  sourcePrompt?: string;

  blueprint?: UIBlueprint;

  designSystem?: DesignSystemRef;

  page: PageNode;

  responsive?: {
    breakpointsRef?: string;
    rules?: ResponsiveRule[];
  };

  editing?: EditingConfig;

  validation?: ValidationConfig;

  meta?: Record<string, unknown>;
}