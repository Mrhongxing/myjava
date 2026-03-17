import React from "react";
import { DSLNode } from "../../types/dsl";

export function Container({
  node,
  children,
}: {
  node: DSLNode;
  children?: React.ReactNode;
}) {
  const props = (node.props ?? {}) as {
    direction?: "row" | "column";
    gap?: string;
    padding?: string;
  };

  const direction = props.direction ?? "column";
  const gap = props.gap ?? "12px";
  const padding = props.padding ?? "12px";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap,
        padding,
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      {children}
    </div>
  );
}