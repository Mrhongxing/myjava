// src/renderer/types.ts
import type { ReactNode, ComponentType } from "react";
import type { DSLNode } from "../types/dsl";

export interface RendererComponentProps {
  node: DSLNode;
  children?: ReactNode;
}

export type RendererComponent = ComponentType<RendererComponentProps>;