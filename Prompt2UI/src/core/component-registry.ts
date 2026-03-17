import type { ComponentType, ReactNode } from "react";
import type { DSLNode } from "../types/dsl";

export interface RendererComponentProps {
  node: DSLNode;
  children?: ReactNode;
}

export type ComponentRenderer = ComponentType<RendererComponentProps>;

export interface ComponentRegistryEntry {
  type: string;
  component: ComponentRenderer;
  semantic?: boolean;
}

export interface ComponentRegistry {
  register: (entry: ComponentRegistryEntry) => this;
  get: (type: string) => ComponentRenderer | undefined;
  has: (type: string) => boolean;
  list: () => string[];
  entries: () => Array<[string, ComponentRenderer]>;
  size: () => number;
}

class Registry implements ComponentRegistry {
  private readonly components = new Map<string, ComponentRenderer>();

  register(entry: ComponentRegistryEntry): this {
    const normalizedType = entry.type.trim();

    if (!normalizedType) {
      throw new Error('[component-registry] component type cannot be empty.');
    }

    if (process.env.NODE_ENV !== "production" && this.components.has(normalizedType)) {
      console.warn(
        `[component-registry] component "${normalizedType}" is already registered and will be overwritten.`
      );
    }

    this.components.set(normalizedType, entry.component);
    return this;
  }

  get(type: string): ComponentRenderer | undefined {
    return this.components.get(type.trim());
  }

  has(type: string): boolean {
    return this.components.has(type.trim());
  }

  list(): string[] {
    return Array.from(this.components.keys()).sort();
  }

  entries(): Array<[string, ComponentRenderer]> {
    return Array.from(this.components.entries());
  }

  size(): number {
    return this.components.size;
  }
}

export const componentRegistry = new Registry();