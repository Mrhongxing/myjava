// src/renderer/RenderNode.tsx

import React, { memo, ReactNode } from "react";
import type { DSLNode } from "../types/dsl";
import { componentRegistry } from "../core/component-registry";

export interface RenderNodeProps {
  node: DSLNode;
}

interface BaseRendererProps {
  node: DSLNode;
  children?: ReactNode;
}

function UnknownNodeRenderer({ node, children }: BaseRendererProps) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[renderer] Unsupported component type "${node.type}" for node "${node.id}".`,
      node
    );
  }

  return (
    <div
      data-renderer="unknown-node"
      data-node-id={node.id}
      data-node-type={node.type}
      style={{
        border: "1px solid #f59e0b",
        background: "#fff7ed",
        color: "#9a3412",
        borderRadius: 8,
        padding: 12,
        margin: "8px 0",
        fontSize: 14,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>
        Unsupported component type: {node.type}
      </div>
      <div style={{ opacity: 0.85, marginBottom: children ? 8 : 0 }}>
        node id: {node.id}
      </div>
      {children}
    </div>
  );
}

function renderChildren(children?: DSLNode[]): ReactNode {
  if (!children || children.length === 0) {
    return null;
  }

  return children.map((child) => (
    <MemoizedRenderNode key={child.id} node={child} />
  ));
}

function RenderNodeImpl({ node }: RenderNodeProps) {
  const Component =
    componentRegistry.get(node.type) ?? UnknownNodeRenderer;

  const renderedChildren = renderChildren(node.children);

  return <Component node={node}>{renderedChildren}</Component>;
}

const MemoizedRenderNode = memo(RenderNodeImpl);

MemoizedRenderNode.displayName = "RenderNode";

export default MemoizedRenderNode;