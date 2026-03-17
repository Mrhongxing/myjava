import React from "react";
import { DSLNode } from "../../types/dsl";

export function Button({ node }: { node: DSLNode }) {
  const props = (node.props ?? {}) as { label?: string };
  const label = props.label ?? "Button";

  const handleClick = () => {
    const action = node.events?.onClick;

    if (!action) return;

    if (action.action === "navigate" && action.target) {
      window.location.href = action.target;
    }
  };

  return <button onClick={handleClick}>{label}</button>;
}